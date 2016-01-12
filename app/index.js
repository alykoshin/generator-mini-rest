'use strict';

var yeoman = require('yeoman-generator');

var util = require('util');
var chalk = require('chalk');
var slug = require('slug');
var gitconfig = require('git-config');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var npmName = require('npm-name');
var GithubApi = require('github');
var shell = require('shelljs');
var path = require('path');
//var git = require('simple-git');


var _copy = function(fromFilename, toFilename) {
  this.fs.copy(
    this.templatePath(fromFilename),
    this.destinationPath(toFilename)
  );
};

var copyFile = function(fileName) {
  _copy.call(this, fileName, fileName);
};

var copyDotFile = function(fileName) {
  var baseName = path.basename(fileName);
  var dirName  = path.dirname(fileName);
  _copy.call(this, path.join(dirName, '_' + baseName), path.join(dirName, '.' + baseName));
  //_copy('_' + fileName, '.' + fileName);
};

var copyTemplate = function(fileName) {
  this.fs.copyTpl(
    this.templatePath('_' + fileName),
    this.destinationPath(fileName),
    this.props
  );
};


var MiniNpmGenerator = yeoman.Base.extend({
  initializing: function () {
    this.pkg       = require('../package.json');
    this.gitconfig = gitconfig.sync();

    //this.on('end', function () {
    //  if (!this.options[ 'skip-install' ]) {
    //    this.installDependencies();
    //  }
    //});
  },
  prompting:  function () {
    var done = this.async();
    this.log(chalk.magenta('This Yeoman generator will scaffold new rest api application for you.'));
    this.log('Make sure you \'mkdir <app-name>; cd <app-name>\'.');

    this._promptPkgName();
  },
  _promptPkgName: function () {
    var done    = this.async();
    var prompts = [{
      name:     'pkgName',
      message:  'What is the name of the application?',
      default:  slug(this.appname),
      validate: function (str) {
        return str.length > 0;
      }
      //}, {
      //  type:    'confirm',
      //  name:    'pkgName',
      //  message: 'The name above already exists on npm, choose another?',
      //  default: true,
      //  when:    function (answers) {
      //    var done = this.async();
      //    process.stdout.write(chalk.yellow('Checking if name is available on NPM...'));
      //    npmName(answers.pkgName)
      //      .then(function (available) {
      //        process.stdout.clearLine();
      //        process.stdout.cursorTo(0);
      //        if (!available) {
      //          done(true);
      //        }
      //        done(false);
      //      });
      //  }
    }];
    this.prompt(prompts, function (props) {
      this.pkgName    = slug(props.pkgName);
      this.pkgVarName = _.camelCase(props.pkgName);

      return this._promptOther();

      //done();

    }.bind(this));
  },
  _promptOther: function () {
    var done = this.async();

    var prompts = [{
      name:     'githubName',
      message:  'What is your github username (git config --global github.user)?',
      default:  (this.gitconfig.github && this.gitconfig.github.user) || '',
      validate: function (str) {
        return str.length > 0;
      }
    }, {
      name:     'githubToken',
      message:  'What is your github oauth token (git config --global github.token)?',
      default:  (this.gitconfig.github && this.gitconfig.github.token) || '',
      validate: function (str) {
        return str.length > 0;
      }
    }, {
      name:    'pkgDesc',
      message: 'Package description?',
      store   : true
    }, {
      type:    'input',
      name:    'keywords',
      message: 'Package keywords?',
      store   : true,
      filter:  function (value) {
        if (typeof value === 'string') {
          value = value.split(',');
        }
        value = value
          .map(function (val) {
            val = val.replace(/[\s'"]/g,''); // Remove spaces, single and double quotes
            return val;//.trim();
          })
          .filter(function (val) {
            return val.length > 0;
          })
          //.map(function (val) {              // Add double quotes
          //  return '"' + val + '"';
          //})
        ;
        console.log('keywords:', value);
        return value;
      }
    }, {
      name:     'fullName',
      message:  'What is your name?',
      default:  (this.gitconfig.user && this.gitconfig.user.name) || '',
      validate: function (str) {
        return str.length > 0;
      }
    }, {
      name:     'emailAddress',
      message:  'What is your email address?',
      default:  (this.gitconfig.user && this.gitconfig.user.email) || '',
      validate: function (str) {
        return str.length > 0;
      }
    }, {
      type: 'confirm',
      name: 'git',
      message: 'Create new GitHub repository for this project?',
      default: false
    }, {
      type: 'confirm',
      name: 'cli',
      message: 'Support CLI?',
      default: false
    }];

    this.prompt(prompts, function (props) {

      this.pkgDesc      = props.pkgDesc;
      this.keywords     = props.keywords;
      this.githubName   = props.githubName;
      this.githubToken  = props.githubToken;
      this.fullName     = props.fullName;
      this.emailAddress = props.emailAddress;
      this.git          = props.git;
      this.cli          = props.cli;

      this.currentYear = new Date().getFullYear();

      done();
    }.bind(this));
  },

  writing: function () {
    this._write();
  },

  _write: function() {
    var self = this;

    mkdirp('test');


    this.template('index.js',   'index.js');
    this.template('LICENSE',       'LICENSE');
    if (this.cli) {
      this.template('cli.js',   'cli.js');
    }
    this.template('package.json',  'package.json');
    this.template('README.md',     'README.md');

    this.template('test/index.js', 'test/index.js');

    [
      //'app/index.js',

      'lib/dumpInfo.js',
      'lib/express.js',
      'lib/index.js',
      'lib/init.js',
      'lib/server.js',

      'middlewares/pre-route/debug.js',
      //'middlewares/pre-route/https-redirect.js',
      'middlewares/pre-route/index.js',
      'middlewares/pre-route/parsers.js',
      'middlewares/pre-route/security.js',
      'middlewares/pre-route/static.js',

      'middlewares/post-route/errors.js',
      'middlewares/post-route/index.js',
      'middlewares/post-route/notFound404.js',

      'middlewares/nocache.js',

      'public/index.html',

      'routes/api/demo.js',
      'routes/api/index.js',

      'routes/index.js',
    ].forEach(function(filename, idx, arr) {
      //copyFile(filename);
      copyFile.call(self, filename);
    }, self);

    this.copy('_editorconfig',  '.editorconfig');
    this.copy('_eslintignore',  '.eslintignore');
    this.copy('_eslintrc',      '.eslintrc');
    this.copy('_gitattributes', '.gitattributes');
    this.copy('_gitignore',     '.gitignore');
    this.copy('_jshintrc',      '.jshintrc');
    this.copy('_jsinspectrc',   '.jsinspectrc');
    this.copy('_npmignore',     '.npmignore');
    this.copy('_travis.yml',    '.travis.yml');

    this.copy('gulpfile.js',    'gulpfile.js');
    this.copy('inch.json',      'inch.json');

    if (this.git) {
      this._createRepo();
    }
  },

  _createRepo: function () {
    var self = this;

    var github = new GithubApi({
      version: '3.0.0' // required
    });

    github.authenticate({
      type:  'oauth',
      token: this.githubToken,
    });

    github.repos.create({
      user:        this.githubName,
      name:        this.pkgName,
      description: this.pkgDesc
    }, function (err, res) {
      console.log('github.repos.create(): err:', err, 'res:', JSON.stringify(res));

      self._gitInitAndPush(self.githubName, self.pkgName);
    });
  },

  _gitInitAndPush: function(githubName, pkgName) {
    var self = this;

    var commands = [
      'git init',
      util.format('git remote add origin https://github.com/%s/%s.git', githubName, pkgName),
      'git add --all',
      'git commit -am "First commit"',
      'git push --set-upstream origin master'
    ];

    commands.forEach(function(cmd) {
      self.log(cmd);
      shell.exec(cmd);
    });
    self.log('git done');
  },

  install: function() {
    if (!this.options[ 'skip-install' ]) {
      //this.installDependencies();
      this.npmInstall();
    }
  }
});

module.exports = MiniNpmGenerator;
