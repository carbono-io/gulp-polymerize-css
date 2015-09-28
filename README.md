# Gulp polimerize css
Gulp plugin that transforms css files into .html files
with a dom-module with the styles.

It was written to convert css into style modules, as specified 
by [polymer docs](https://www.polymer-project.org/1.0/docs/devguide/styling.html#style-modules).

Makes life easier for those who want to use css preprocessors AND Polymer :)

## Usage

Install it with npm
    
    npm install gulp-polymerize-css

In your <code>gulpfile.js</code>:

```javascript
var polymerizeCss = require('gulp-polymerize-css'),
    rename = require('gulp-rename');

gulp.task('styles', function(){
  return gulp.src('app/styles/style.css')
    .pipe($.polymerizeCss({styleId:'custom-style'}))
    .pipe(rename('style.html'))
    .pipe(gulp.dest('dist/styles'));
});
```

It results in:
```html
<dom-module id="custom-style">
  <template>
    <style>
     <!-- YOUR STYLE HERE -->
    </style>
  </template>
</dom-module>
```

## Options
* _styleId_ (String): the id that you will use for importing the style
