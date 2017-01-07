"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    clean: {
      build: ["build"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      },
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif}"]
        }]
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.css": ["css/style.css"]
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("precss")(),
            require("autoprefixer")({browsers: [
              "last 2 versions"
            ]})
          ]
        },
        src: "postcss/style.css",
        dest: "css/style.css"
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "*.html",
            "css/*.css"
          ]
        },
        options: {
          server: ".",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      style: {
        files: ["postcss/**/*.css"],
        tasks: ["postcss"]
      }
    }
  });

  grunt.registerTask("serve", ["postcss", "browserSync", "watch"]);
  grunt.registerTask("build", [
    "clean",
    "postcss",
    "copy",
    "csso",
    "imagemin"
  ]);
};
