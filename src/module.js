/* global
    UALog: false,
    UAModule: true
*/
'use strict';

// ------------------------------------------
//  Logs the start of execution for this file
// ------------------------------------------
UALog.trace('Loading module.js');


// ------------------------
//  Module Base Class Declaration
// ------------------------

UAModule = function() {
  this._id = null;
  this.visible = true;
  this.skins = {};
};


_.extend(UAModule.prototype, {

  _id: 'UAModule',
  template: null,
  texts: {},
  visible: false,

  _configure: function(options) {
    UALog.trace('_configure ' + this._id);
    var
      self = self,
      moduleOptions = options[self._id]
    ;

    if (self.configure && moduleOptions) {
      self.configure(moduleOptions);
    }
    return _.omit(options, self._id);
  },

  getText: function(key) {
    var
      self = this,
      uaTmpl = Template.currentData().instance,
      state = uaTmpl.getState();

    var texts = self.texts[state] || self.texts.default;
    return texts[key] || '';
  },

  skinClasses: function(element) {
    UALog.trace('module ' + this._id + ': skinClasses - ' + element);
    var
      self = this,
      framework = Template.currentData().instance.framework
    ;

    if (_.has(self.skins, framework)) {
      var classes = self.skins[framework][element];
      if (_.isFunction(classes)) {
        classes = classes();
      }
      return classes || '';
    }

    return '';
  },
});
