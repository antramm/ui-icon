/* jshint node: true */
'use strict';
var merge = require('merge');

module.exports = {
  name: 'ui-icon',
	description: 'Ember flare for FontAwesome love',
	included: function(app) {
		this._super.included(app);
    var o = merge(
      { fa: true, animate: 'default', quiet: false, animateOperation: 'override' },
      app.options['ui-icon']
    );
    var defaultAnimations = [
      'attention_seekers/bounce.css',
      'attention_seekers/flash.css',
      'attention_seekers/pulse.css',
      'attention_seekers/rubberBand.css',
      'attention_seekers/shake.css',
      'attention_seekers/swing.css',
      'attention_seekers/tada.css',
      'attention_seekers/wobble.css'
    ];
    // specific to this addon
    app.import('vendor/ui-icon/ui-icon.css');
    var faMessage = 'font-awesome not referenced explicitly';
    if(o.fa) {
      // font-awesome
      faMessage = 'fa fonts/css added';
      app.import('bower_components/fontawesome/css/font-awesome.css', {overwrite: true});
      app.import('bower_components/fontawesome/fonts/fontawesome-webfont.eot',{destDir: 'fonts', overwrite: true});
      app.import('bower_components/fontawesome/fonts/fontawesome-webfont.svg',{destDir: 'fonts', overwrite: true});
      app.import('bower_components/fontawesome/fonts/fontawesome-webfont.ttf',{destDir: 'fonts', overwrite: true});
      app.import('bower_components/fontawesome/fonts/fontawesome-webfont.woff',{destDir: 'fonts', overwrite: true});
      app.import('bower_components/fontawesome/fonts/fontawesome-webfont.woff2',{destDir: 'fonts', overwrite: true});
      app.import('bower_components/fontawesome/fonts/FontAwesome.otf',{destDir: 'fonts', overwrite: true});      
    }
    var animations = [];
    var animateRoot = 'bower_components/animate.css/source/';
    var animateMessage = 'no animations loaded';
    if(o.animate) {
      // annimate.css
      app.import(animateRoot + '_base.css');
      
      if(o.animate === 'default') {
         animations = defaultAnimations;
         animateMessage = 'default animations loaded';
      } else {
        if(o.animateOperation === 'append' ) {
          animateMessage = 'adding configured animations to default';
          animations = o.animate.concat(defaultAnimations);
        } else {
          animateMessage = 'replace default animations with configured';
          animations = o.animate;
        }
        if(! animations instanceof array) {
          animateMessage = 'tried to use config for animation but ran into problems!';
          animations = [];
        }
      }
      
      animations.forEach(function(cssFile) {
        if(cssFile.slice(0,1) === '/' ) {
          cssFile = 'app/ui-icon/' + cssFile;
        } else {
          cssFile = animateRoot + cssFile;
        }
        app.import(cssFile);
      });      
  	}
    if(!o.quiet) {
      console.log('ui-icon: %s, %s', faMessage, animateMessage); 
    }

  }
};
