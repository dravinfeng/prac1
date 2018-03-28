window.TDT = {};

TDT.Controls = {};

TDT.controls = {};


TDT.Control = (function() { function Control() {} return Control; })()
var _ref, __hasProp = {}.hasOwnProperty,
	__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
;



var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TDT.Controls.Baidu_video = (function(_super) {
  __extends(Baidu_video, _super);

  function Baidu_video() {
    return Baidu_video.__super__.constructor.apply(this, arguments);
  }

  Baidu_video.group = '视频类';

  Baidu_video.prototype.cbody = function() {
    var player, size, v_info;
    this.$v_panel = this.$cbody.find('.baidu-video-panel');
    size = this.data("size");
    this.$v_panel.css({
      'width': size.width,
      'height': size.height
    });
    v_info = this.get_v_info();
    player = cyberplayer(this.$v_panel[0]).setup({
      width: size.width,
      height: size.height,
      stretching: "uniform",
      file: v_info.file,
      autostart: v_info.autoPlay,
      repeat: false,
      volume: 100,
      controls: true,
      ak: '9eadea16f3424e94b7086e33ce283040'
    });
  };

  Baidu_video.prototype.get_v_info = function() {
    return {
      file: this.data("file"),
      size: this.data("size"),
      autoPlay: this.data("auto-play")
    };
  };

  return Baidu_video;

})(TDT.Control);



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
