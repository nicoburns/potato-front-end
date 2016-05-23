# Potato Front-End Coding Task

I based my project on the [Modern Backbone Starter-kit](https://github.com/sabarasaba/modern-backbone-starterkit), which seems to contain a lot of sensible defaults for a modern backbone project (webpack, babel, marionette, karma, etc). I made the following changes: 

- Replaced Stylus with SASS
- Changed directory structure so that is organised by 'module'.
- Changed rendering code to take advantage of Marionette's `Region`

###Issues to flag up

- The API is not CORS enabled (workaround enabled for development)
- The API doesn't provide a description suitable for use on the detail page: I have left it as Lorem Ipsum text
- The wireframes don't specify which list view design to use at exactly 800px.
- I have implemented the layout but haven't bothered making things pretty

### Additional notes

- The CSS is organised according to the [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) methodology, with components from the [Inuit.CSS](https://github.com/inuitcss) project. I like inuit because it gives you reusable library code without getting in your way like bootstrap/foundation.
- Marionette enforces a 1:1 relationship between controller and router. For this reason, I have ignored the controllers and simply used the router as a controller. For a larger project I would probably want a better controller/router implementation.



## Documentation from Modern Backbone Starter-kit

> This project provides a prepared development environment based on [Gulp](http://gulpjs.com/), [Backbone](http://backbonejs.org/), [Babel](https://babeljs.io/) and [Webpack](http://webpack.github.io/). You can  use it to quickly bootstrap your web application projects. All the parts of this project template are easily replaceable.


### Development
Builds the application and starts a webserver with livereload. By default the webserver starts at port 3000.

```shell
$ gulp
```

By default, it builds in debug mode.

* If you need to build in release mode, add `--type production` flag.
* You can define a port with `--port 3333` flag.


### Build
Builds a minified version of the application in the dist folder.

```shell
$ gulp build --type production
```

### How to Test

Run unit tests and integration tests are powered by [Karma](http://karma-runner.github.io/0.12/index.html), [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/):

```shell
$ karma start
```

### Learn More

 * [Backbone.js](http://backbonejs.org/)
 * [Handlebars](http://handlebarsjs.com/)
 * [Marionette.js](http://marionettejs.com/)
 * [Karma - Spectacular test runner](http://karma-runner.github.io/0.12/index.html)
 * [Webpack](http://webpack.github.io/)
 * [Babel - Use next generation JavaScript, today](https://babeljs.io/)
