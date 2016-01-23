module.exports = function (grunt) {

    function generateBuildNumber() {
        var d = new Date();
        return d.getUTCFullYear() + ('0' + (d.getUTCMonth() + 1)).slice(-2) + ('0' + d.getUTCDate()).slice(-2) + ('0' + d.getUTCHours()).slice(-2) + ('0' + d.getUTCMinutes()).slice(-2) + ('0' + d.getUTCSeconds()).slice(-2);
    }

    var buildNumber = generateBuildNumber();

    grunt.initConfig({

        less: {
            'build-less': {
                options: {
                    compress: true,
                    yuicompress: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'stickable.min.css.map',
                    sourceMapFilename: 'public/assets/build/' + buildNumber + '/css/stickable.min.css.map',
                    sourceMapBasepath: 'src/less'
                },
                src: [
                    'src/less/stickable.less'
                ],
                dest: 'public/assets/build/' + buildNumber + '/css/stickable.min.css'
            },
        },

        concat: {
            options: {
                separator: "\n",
            },
            'build-libraries': {
                /**
                 * Combines angular and all the modules into one file.
                 */
                src: [
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
                    'bower_components/angular-modal-service/dst/angular-modal-service.min.js',
                    'bower_components/angular-resource/angular-resource.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/fastclick/lib/fastclick.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/md5/index.js',
                    'bower_components/messenger/build/js/messenger.min.js',
                    'bower_components/messenger/build/js/messenger-theme-flat.min.js',
                    'src/lib/stickerjs/sticker.js',
                ],
                dest: 'public/assets/build/' + buildNumber + '/js/lib.min.js'
            },
        },

        uglify: {
            options: {
                mangle: false,
                sourceMap: true,
                sourceMapIncludeSources: true
            },
            'build-js': {
                src: [
                    'src/js/app.js',
                    'src/js/templates.js',
                    'src/js/**/*.js'
                ],
                dest: 'public/assets/build/' + buildNumber + '/js/stickable.min.js'
            },
        },

        clean: {
            'pre-build': {
                // Remove existing build files
                src: [
                    'public/assets/build/',
                    'src/js/templates.js',
                ]
            },
            'post-build': {
                src: []
            }
        },

        watch: {
            'build': {
                files: [
                    'src/**/*.*',
                    '!src/js/templates.js'
                ],
                tasks: ['build']
            }
        },

        // Display a notification when the build is ready
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5, // maximum number of notifications from jshint output
                title: "Stickable Build", // defaults to the name in package.json, or will use project directory's name
                success: true, // whether successful grunt executions should be notified automatically
                duration: 2 // the duration of notification in seconds, for `notify-send only
            }
        },

        config: {
            'dev': {
                options: {
                    variables: {
                        env: 'dev',
                        assetUrl: '/assets/build/' + buildNumber,
                        apiUrl: '/api/',
                    }
                }
            },
            'prod': {
                options: {
                    variables: {
                        env: 'prod',
                        assetUrl: '/assets/build/' + buildNumber,
                        apiUrl: '/api/',
                    }
                }
            }
        },

        replace: {
            'html': {
                options: {
                    expand: true,
                    flatten: true,
                    patterns: [
                        {
                            json: {
                                'env': '<%= grunt.config.get("env") %>',
                                'assetUrl': '<%= grunt.config.get("assetUrl") %>',
                                'assetVersion': buildNumber,
                                'apiUrl': '<%= grunt.config.get("apiUrl") %>',
                            }
                        }
                    ]
                },
                files: {
                    'public/index.html': 'src/html/index.html'
                }
            }
        },

        ngtemplates: {
            stickable: {
                cwd: 'src/html',
                src: 'views/**/*.html',
                dest: 'src/js/templates.js',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true, // Only if you don't use comment directives!
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-config');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-shell');

    grunt.task.run('notify_hooks');

    grunt.registerTask('build', function () {

        // Set environment
        var env = 'prod';
        if (grunt.option('dev')) {
            env = 'dev';
        }
        grunt.task.run([
            'config:' + env
        ]);

        // Clean build folder
        grunt.task.run(['clean:pre-build']);

        grunt.task.run(['ngtemplates:stickable']);

        // Less -> minified css
        grunt.task.run(['less:build-less']);

        grunt.task.run(['concat:build-libraries']);

        // JS -> minified js
        grunt.task.run(['uglify:build-js']);

        // Replace variables in HTML
        grunt.task.run(['replace:html']);

        grunt.task.run(['clean:post-build']);

    });
};


