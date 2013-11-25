/*
 * grunt-init-assemble
 * https://github.com/assemble/assemble
 *
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT license.
 */

'use strict';

var path  = require('path');

// Basic template description.
exports.description = 'Create a project with Assemble and Grunt, including starter templates, helpers and data.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'For more information about creating Assemble projects, ' +
  'please see the docs at http://assemble.io/docs/';

// Template-specific notes to be displayed after question prompts.
exports.after = 'Now install project dependencies with "npm install".' +
  'After that, you may execute project tasks with "grunt assemble". For ' +
  'more information about installing and configuring Assemble, please ' +
  'visit:' +
  '\n\n' +
  'http://assemble.io/docs/';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = ['*'];

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'node'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('username', 'assemble'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('author_name'),
    init.prompt('author_url'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses'),
    init.prompt('main'),
    init.prompt('grunt_version', '~0.4.2'),
    {
      name: 'assemble_version',
      message: 'What versions of Assemble does it require?',
      default: '~0.4.12',
      warning: 'Must be a valid semantic version range descriptor.'
    },
    {
      name: 'travis',
      message: 'Will this project be tested with Travis CI?',
      default: 'Y/n',
      warning: 'If selected, you must enable Travis support for this project in https://travis-ci.org/profile'
    },
  ], function(err, props) {

    // Set a few grunt-plugin-specific properties.
    props.homepage   = 'https://github.com/' + props.username + '/' + props.name;
    props.author_url = 'https://github.com/' + props.username;
    props.repository = 'https://github.com/' + props.username + '/' + props.name + '.git';
    props.bugs       = 'https://github.com/' + props.username + '/' + props.name + '/issues';
    props.devDependencies = {
      'assemble': props.assemble_version,
      'assemble-less': '~0.5.0',
      'grunt-contrib-clean': '~0.5.0',
      'grunt-contrib-jshint': '~0.6.0',
      'grunt-contrib-watch': '~0.5.1',
      'grunt-readme': '~0.1.0'
    };
    props.keywords = [
      'static site generator',
      'yeoman static site generator',
      'grunt static site generator',
      'site generator',
      'component generator',
      'blog generator',
      'handlebars',
      'templates'
    ];
    props.travis = /y/i.test(props.travis);
    props.travis_node_version = '0.8';

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    if (!props.travis) { delete files['.travis.yml']; }

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};