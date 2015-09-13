module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      bower: {
        files: [
          { expand: true,
            src: ['**/*'],
            dest: 'dist/assets/bower',
            cwd: 'app/assets/bower' }
        ]
      }
    },
    less: {
      dist: {
        options: {
          paths: ["app/assets/css"],
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
            // new (require('less-plugin-clean-css'))(cleanCssOptions)
          ],
          modifyVars: {
            imgPath: '"http://mycdn.com/path/to/images"',
            bgColor: 'red'
          }
        },
        files: {
          "dist/assets/css/style.css": "app/assets/css/*.less"
        }
      }
    },
    watch: {
      assemble: {
        files: [
          // 'app/content/blog/*.hbs',
          'app/content/pages/*.hbs',
          'app/content/pages/**/*.hbs',
          'app/layouts/*.hbs',
          'app/partials/*.hbs'
        ],
        tasks: ['assemble']
      },
      bower: {
        files: [
          'app/assets/bower/*'
        ],
        tasks: ['copy:bower']
      },
      less: {
        files: [
          'app/assets/css/*.less'
        ],
        tasks: ['less']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          './dist/*',
          './dist/assets/css/*.css'
        ]
      },
    },
    assemble: {
      options:{
        layoutdir: 'app/layouts',
        flatten: true,
        layout: 'default.hbs',
        partials: 'app/partials/*.hbs'
      },
      page: {
        files: [
            { expand: true, cwd: 'app/content/pages/', src: ['**/*.hbs'], dest: 'dist/' }
        ]
      },
      // blog: {
      //     files: {
      //         'dist/': ['app/content/blog/*.hbs']
      //     }
      // }
    },
    connect: {
      options: {
        port: 8800,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost',
        livereload: 35728
      },
      livereload: {
        options: {
          open: true,
          base: './dist'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['connect:livereload','assemble', 'copy', 'less', 'watch']);
};
