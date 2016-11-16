

module.exports = function (grunt) {
  // Load grunt tasks automatically, when needed
  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Define the configuration for all the tasks
  grunt.initConfig({
    clean: {
      heroku: ['heroku/build', 'heroku_server'],
    },
    copy: {
      heroku: {
        files: [
          // includes files within path and its sub-directories
          { expand: true, src: ['build/**', 'server/**'], dest: 'heroku/' },
        ],
      },
    },
    buildcontrol: {
      options: {
        dir: 'heroku',
        commit: true,
        push: true,
        connectCommits: false,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%',
      },
      heroku: {
        options: {
          remote: 'git@heroku.com:novio-ats.git',
          branch: 'dev',
          remoteBranch: 'master',
        },
      },
    },

  });

  grunt.registerTask('heroku', [
    'clean:heroku',
    'copy:heroku',
    'buildcontrol:heroku',
  ]);
};
