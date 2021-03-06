'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				includePaths: [
					'app/bower_components/foundation/scss',
					'app/bower_components/bourbon/app/assets/stylesheets',
					'app/bower_components/font-awesome/fonts/',
					'app/bower_components/font-awesome/scss/'
				]
			},
			dist: {
				options: {
					outputStyle: 'extended'
				},
				files: {
					'app/css/app.css': 'app/scss/app.scss'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'app/js/{,*/}*.js'
			]
		},

		clean: {
			dist: {
				src: ['dist/*']
			},
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'app/',
					src: ['css/**', 'js/**', 'images/**', 'fonts/**', '**/*.html', '!**/*.scss', '!bower_components/**'],
					dest: 'dist/'
				}, {
					expand: true,
					flatten: true,
					src: ['app/bower_components/jquery/jquery.min.js', 'app/bower_components/modernizr/modernizr.js'],
					dest: 'dist/js/vendor/',
					filter: 'isFile'
				}, {
					expand: true,
					flatten: true,
					src: ['app/bower_components/foundation/js/foundation.min.js'],
					dest: 'dist/js/foundation/',
					filter: 'isFile'
				}]
			},
		},

		useminPrepare: {
			html: 'app/*.html',
			options: {
				dest: 'dist'
			}
		},

		usemin: {
			html: ['dist/*.html'],
			css: ['dist/css/*.css'],
			options: {
				dirs: ['dist']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {
				files: ['app/scss/{,*/}*.scss'],
				tasks: ['sass']
			},
			livereload: {
				files: ['app/*.html', 'app/{,*/}*.html', 'app/js/{,*/}*.js', 'app/css/{,*/}*.css', 'app/images/{,*/}*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: true
				}
			}
		},

		connect: {
			app: {
				options: {
					port: 3333,
					base: 'app/',
					livereload: true
				}
			},
			dist: {
				options: {
					port: 3334,
					base: 'dist/',
					keepalive: true,
					livereload: false
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-usemin');

	grunt.registerTask('build', ['sass']);
	grunt.registerTask('default', ['build', 'connect:app', 'watch']);
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('server-dist', ['connect:dist']);
	grunt.registerTask('publish', ['clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'usemin']);

};