window.TDT = {};

TDT.Controls = {};

TDT.controls = {};


TDT.Control = (function() { function Control() {} return Control; })()
var _ref, __hasProp = {}.hasOwnProperty,
	__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
;



TDT.Tpage = (function() {
  function Tpage() {
    this.init_control_class();
    this.init_controls();
  }

  Tpage.prototype.init_control_class = function() {
    TDT.Control.prototype.cbody = function() {};
    return TDT.Control.prototype.data = function(key) {
      var str;
      str = this.$cbody.attr('tdt-data-' + key);
      if (str) {
        if (JSON) {
          return JSON.parse(str);
        } else {
          return str;
        }
      } else {
        return null;
      }
    };
  };

  Tpage.prototype.init_controls = function() {
    var $el, all_doms, ctrl, e, el, self, tbody, type, _i, _len;
    self = this;
    this.controls = [];
    tbody = document.getElementById('tdt-body');
    all_doms = (function() {
      var _i, _len, _ref, _results;
      _ref = tbody.getElementsByTagName('div');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        _results.push(el);
      }
      return _results;
    })();
    for (_i = 0, _len = all_doms.length; _i < _len; _i++) {
      el = all_doms[_i];
      if (el.getAttribute('tdt-cbody')) {
        $el = this.warp_dom_element(el);
        type = $el.attr('tdt-cbody');
        type = type.substring(0, 1).toUpperCase() + type.slice(1);
        try {
          ctrl = new TDT.Controls[type];
          ctrl.$cbody = $el;
          ctrl.id = $el.attr('id');
          ctrl.cbody();
          self.controls.push(ctrl);
        } catch (_error) {
          e = _error;
          if (typeof console !== "undefined" && console !== null) {
            console.error('Control class: ' + type + '\n' + e);
          }
        }
      }
    }
  };

  Tpage.prototype.warp_dom_element = function(el) {
    if (window.jQuery) {
      return $(el);
    } else {
      el.attr = function(k, v) {
        if (v) {
          return el.setAttribute(k, v);
        } else {
          return el.getAttribute(k);
        }
      };
      return el;
    }
  };

  return Tpage;

})();

TDT.tpage = new TDT.Tpage;
