﻿/*pub-1|2013-08-29 11:30:48*/
KSLITE.declare("tkapi-main", ["tkapi-bindclick", "tkapi-load", "tkapi-boot", "tkapi-config", "tkapi-plugin"], function(d, c) {
	var b = d("tkapi-bindclick").Def;
	var g = d("tkapi-load").Def;
	var e = d("tkapi-boot").Def;
	var f = d("tkapi-plugin").Def;
	var a = d("tkapi-config");
	c.run = function(h) {
		a.ready(function() {
			a.createFixed(h);
			b();
			g();
			setTimeout(function() {
				e();
				f(h.plugins)
			}, 200)
		})
	}
});
KSLITE.declare("tkapi-config", ["tkapi-util"], function(b, f) {
	var e = KSLITE;
	var a = {}, d = {};
	var h = b("tkapi-util");
	var g = false;
	a.ali = ["taobao.com", "alimama.com", "alibaba.com", "alipay.com", "alisoft.com", "linezing.com", "tanx.com", "mmstat.com", "etao.com", "tmall.com"];
	a.kws = ["wd", "p", "q", "keyword", "kw", "w", "key", "word", "query", "name"];
	a.alimama = "http://s.click.taobao.com/";
	a.cookieKey = "amvid";
	a.linkAttr = ["data-itemid", "data-sellerid", "data-keyword", "data-unid", "data-pid", "data-other", "data-rd", "_tkworked"];
	a.para = ["appkey", "unid", "pid", "evid"];
	a.queryOrder = ["ak", "pid", "unid", "eid", "wt", "wi", "ti", "tl", "ct", "st", "rf", "et", "pgid", "other", "tc"];
	a.oldAttr = ["&", "itemid", "sellerid", "keyword", "bucketid", "count", "cid"].join("&");
	d.cache = undefined;
	d.win = window;
	d.d = document;
	d.maxwin = null;
	d._maxwin = function(k) {
		if (k) {
			d.maxwin = k;
			return
		}
		k = d.win;
		if (top != k) {
			if (top.location && top.location.href) {
				k = top
			}
		}
		d.maxwin = k
	};
	d.ali = (function() {
		var l, m = d.d.domain.split("."), n = a.ali, k;
		if (m.length > 1) {
			k = "@" + m[m.length - 2] + "." + m[m.length - 1];
			if (("@" + n.join("@")).indexOf(k) > -1) {
				return true
			}
		}
		return false
	})();
	d.frm = (function() {
		return (top != window)
	})();
	d.ref_url = null;
	d.getRef_url = function() {
		if (d.ref_url) {
			return d.ref_url
		}
		var k = location.href;
		if (d.frm) {
			if (d.win == d.maxwin) {
				k = d.d.referrer
			} else {
				k = top.location.href
			}
		}
		d.ref_url = k;
		return k
	};
	f.queryData = function(l, q) {
		q = q || {};
		var o = l.data, m;
		for (m in o) {
			if (o.hasOwnProperty(m) && a.oldAttr.indexOf("&" + m) > 0) {
				l.biz[m] = o[m];
				try {
					delete o[m]
				} catch(p) {
					o[m] = undefined
				}
			}
		}
		var n = d.cache;
		o.pid = o.pid || n.pid;
		o.rd = o.rd || n.rd;
		o.pgid = n.pgid;
		o.rf = n.ref;
		o.et = n.et || n.clicktime.et();
		o.v = q.v || "2.0";
		if (!o.unid && n.unid) {
			o.unid = n.unid
		}
		if (n.ak) {
			o.ak = n.ak
		}
		if (n.evid) {
			o.eid = n.evid
		}
		l.data.ct = h.buildQuery(l.biz);
		return l.data
	};
	f.getConfig = function(k) {
		return d.cache[k] || null
	};
	var c = {};
	var j = {};
	c.getPageUrl = function() {
		return h.encode(d.getRef_url())
	};
	c.getCbhAndCbw = function() {
		var l, k = 1, m = -1;
		l = d.maxwin.document;
		k = l.documentElement.clientHeight || l.body.clientHeight;
		m = l.documentElement.clientWidth || l.body.clientWidth;
		return "cbh=" + k + "&cbw=" + m
	};
	c.getScreenInfo = function() {
		var m = d.maxwin.screen, k = 0, q = 0, l = 0, o = 0, p = 0;
		try {
			k = m.width;
			q = m.height;
			l = m.availHeight;
			o = m.availWidth;
			p = m.colorDepth
		} catch(n) {
			KSLITE.log(n)
		}
		return "re=" + k + "x" + q + "&cah=" + l + "&caw=" + o + "&ccd=" + p
	};
	c.getFlashVersion = function() {
		var k = "-1", p = navigator, m, l;
		if (p.plugins && p.plugins.length) {
			for ( m = 0; m < p.plugins.length; m++) {
				if (p.plugins[m].name.indexOf("Shockwave Flash") != -1) {
					k = p.plugins[m].description.split("Shockwave Flash ")[1];
					break
				}
			}
		} else {
			if (window.ActiveXObject) {
				for ( l = 10; l >= 2; l--) {
					try {
						var n = new Function("return new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + l + "');");
						if (n) {
							k = l + ".0";
							break
						}
					} catch(o) {
						KSLITE.log(o)
					}
				}
			}
		}
		if (k != "-1") {
			k = k.substring(0, k.indexOf(".") + 2)
		}
		return "cf=" + k
	};
	c.getBrowserInfo = function() {
		var k = [], l = navigator;
		k.push("ctz=" + (-((new Date()).getTimezoneOffset() / 60)));
		k.push("chl=" + history.length);
		k.push("cja=" + (l.javaEnabled() ? "1" : "0"));
		k.push("cpl=" + (l.plugins ? l.plugins.length : 0));
		k.push("cmm=" + (l.mimeTypes ? l.mimeTypes.length : 0));
		k.push(c.getFlashVersion());
		return k.join("&")
	};
	c.pageid = function() {
		var l = "", k = "", n, o, t, u, s = location, m = "", q = Math;
		function r(x, z) {
			var y = "", v = 1, w;
			v = Math.floor(x.length / z);
			if (v == 1) {
				y = x.substr(0, z)
			} else {
				for ( w = 0; w < z; w++) {
					y += x.substr(w * v, 1)
				}
			}
			return y
		}

		if (d.ali) {
			n = (" " + d.d.cookie).split(";");
			for ( o = 0; o < n.length; o++) {
				if (n[o].indexOf(" cna=") === 0) {
					k = n[o].substr(5, 24);
					break
				}
			}
		}
		if (k === "") {
			cu = (s.search.length > 9) ? s.search : ((s.pathname.length > 9) ? s.pathname : s.href).substr(1);
			n = document.cookie.split(";");
			for ( o = 0; o < n.length; o++) {
				if (n[o].split("=").length > 1) {
					m += n[o].split("=")[1]
				}
			}
			if (m.length < 16) {
				m += "abcdef0123456789"
			}
			k = r(cu, 8) + r(m, 16)
		}
		for ( o = 1; o <= 32; o++) {
			t = q.floor(q.random() * 16);
			if (k && o <= k.length) {
				u = k.charCodeAt(o - 1);
				t = (t + u) % 16
			}
			l += t.toString(16)
		}
		if (!d.frm) {
			h.setCookie(a.cookieKey, l)
		}
		var p = h.getCookie(a.cookieKey);
		if (p) {
			return p
		}
		return l
	};
	j.et = function() {
		var s = new Date(), l = +s / 1000 | 0, r = s.getTimezoneOffset() * 60, p = l + r, m = p + (3600 * 8), q = m.toString().substr(2, 8).split(""), o = [6, 3, 7, 1, 5, 2, 0, 4], n = [];
		for (var k = 0; k < o.length; k++) {
			n.push(q[o[k]])
		}
		n[2] = 9 - n[2];
		n[4] = 9 - n[4];
		n[5] = 9 - n[5];
		return n.join("")
	};
	function i(l) {
		var m = e.mix({}, l);
		for (var k = a.para.length - 1; k > -1; k--) {
			m[a.para[k]] = l[a.para[k]] || ""
		}
		return m
	}
	f.createFixed = function(m) {
		var l = i(m);
		var k = d;
		k.cache = k.cache ? k.cache : {
			pgid : c.pageid(),
			pid : l.pid,
			ref : k.getRef_url(),
			unid : l.unid,
			ak : l.appkey,
			rd : (l.rd == 1) ? l.rd : 2,
			link_profit : l.link_profit == "off" ? 0 : 1,
			evid : l.evid,
			pp : [c.getCbhAndCbw(), c.getScreenInfo(), c.getBrowserInfo()].join("&")
		};
		k.cache.clicktime = j
	};
	f.ready = function(k) {
		if (g) {
			return k()
		}
		var l = setTimeout(function() {
			d._maxwin(window);
			g = true;
			k()
		}, 50);
		d._maxwin();
		clearTimeout(l);
		g = true;
		k()
	};
	f.c = a;
	f.r = d
});
KSLITE.declare("tkapi-util", function(a, c) {
	var b = KSLITE;
	var d = c;
	d.encode = function(j) {
		return encodeURIComponent(j.toString())
	};
	d.decode = function(j) {
		return decodeURIComponent(j.toString())
	};
	d.getAttr = function(k, j) {
		return d.trim(k.getAttribute(j.toLowerCase(), 2) || "") || ""
	};
	d.setAttr = function(l, j, k) {
		l.setAttribute(j.toLowerCase(), d.trim(k + ""))
	};
	d.getCookie = function(l) {
		var m = (" " + document.cookie).split(";"), j = "";
		l = l ? l : config.cookieKey;
		for (var k = 0; k < m.length; k++) {
			if (m[k].indexOf(" " + l + "=") === 0) {
				j = d.decode(m[k].split("=")[1]);
				break
			}
		}
		return j
	};
	d.css = function(k, j, l) {
		if (l) {
			k.style[j] = l;
			return
		}
		if (window.getComputedStyle) {
			return window.getComputedStyle(k, null).getPropertyValue(j)
		} else {
			if (k.currentStyle) {
				return k.currentStyle[j]
			}
		}
	};
	d.show = function(j) {
		var k = d.getAttr(j, "_tk_old_display") || "";
		d.css(j, "display", k)
	};
	d.hide = function(j) {
		if (!j) {
			return
		}
		d.setAttr(j, "_tk_old_display", d.css(j, "display"));
		d.css(j, "display", "none")
	};
	d.nodeList2Array = function(l) {
		var m = [];
		for (var k = 0, j = l.length; k < j; k++) {
			m[k] = l[k]
		}
		return m
	};
	d.getElClientRect = function(j) {
		var k = j.getBoundingClientRect();
		if (k.height === undefined || k.width === undefined) {
			k = KSLITE.mix({}, k);
			k.height = j.offsetHeight;
			k.width = j.offsetWidth
		}
		return k
	};
	d.each = function(n, m) {
		if (n.length && n.slice) {
			for (var l = 0, j = n.length; l < j; l++) {
				m(n[l], l)
			}
		} else {
			for (var k in n) {
				if (n.hasOwnProperty(k)) {
					m(n[k], k)
				}
			}
		}
	};
	d.setCookie = function(j, k) {
		j = arguments.length == 1 ? config.cookieKey : j;
		document.cookie = j + "=" + d.encode(k) + "; path=/"
	};
	d.trim = function(l) {
		var j = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
		for (var k = 0; k < l.length; k++) {
			if (j.indexOf(l.charAt(k)) === -1) {
				l = l.substring(k);
				break
			}
		}
		for ( k = l.length - 1; k >= 0; k--) {
			if (j.indexOf(l.charAt(k)) === -1) {
				l = l.substring(0, k + 1);
				break
			}
		}
		return j.indexOf(l.charAt(0)) === -1 ? l : ""
	};
	(function(r, t) {
		if (t.addEventListener) {
			d.addEvent = function(w, v, x) {
				w.addEventListener(v, x, false)
			};
			d.removeEvent = function(w, v, x) {
				w.removeEventListener(v, x, false)
			}
		} else {
			if (t.attachEvent) {
				d.addEvent = function(y, x, z) {
					if (y[x + z]) {
						return
					}
					var w, v;
					y["e" + x + z] = z;
					y[x + z] = function() {
						y["e"+x+z](window.event)
					};
					y.attachEvent("on" + x, y[x + z])
				};
				d.removeEvent = function(w, v, x) {
					w.detachEvent("on" + v, w[v + x]);
					w[v + x] = null
				}
			} else {
				d.addEvent = function(w, v, x) {
					w["on" + v] = x.call(w, r.event)
				};
				d.removeEvent = function(w, v, x) {
					w["on" + v] = null
				}
			}
		}
		var m = t && t.documentElement, n = m && m.doScroll, k = n ? "readystatechange" : "DOMContentLoaded", s = false, j = [], q = "complete", u = 40, l = function() {
			s = true;
			var v = j.shift();
			while (v) {
				try {
					v()
				} catch(w) {
					KSLITE.log(w)
				}
				v = j.shift()
			}
		};
		function o() {
			try {
				m.doScroll("left");
				l()
			} catch(v) {
				KSLITE.log(v);
				setTimeout(o, u)
			}
		}

		function p() {
			if (/complete/.test(t.readyState)) {
				l()
			} else {
				setTimeout(p, u)
			}
		}

		if (n) {
			o()
		} else {
			p()
		}
		d.domReady = function(v) {
			if (s) {
				v()
			} else {
				j.push(v)
			}
		}
	})(window, document);
	d.tagName = function(j) {
		return j && j.tagName ? j.tagName.toLowerCase() : null
	};
	d.cssSupports = (function() {
		var l = document.createElement("div"), k = "Khtml Ms O Moz Webkit".split(" "), j = k.length;
		return function(m) {
			if ( m in l.style) {
				return true
			}
			m = m.replace(/^[a-z]/, function(n) {
				return n.toUpperCase()
			});
			while (j--) {
				if (k[j] + m in l.style) {
					return true
				}
			}
			return false
		}
	})();
	d.findMatchEl = function(l) {
		var j = d;
		try {
			if (l && j.tagName(l) != "a") {
				for (var k = 5; k > 0; k--) {
					if (l) {
						l = l.parentNode;
						if (j.tagName(l) == "a") {
							break
						}
					}
				}
				if (j.tagName(l) != "a") {
					l = 0
				}
			}
			return l
		} catch(m) {
			KSLITE.log(m);
			return null
		}
	};
	var f = d.buildQuery = function(p, j, m) {
		m = m || [];
		var l, n;
		if (j && b.iA(j)) {
			d.each(j, function(q, o) {
				if (p[q] !== n) {
					m.push(q + "=" + d.encode(p[q]))
				}
			})
		} else {
			for (l in p) {
				if (p.hasOwnProperty(l)) {
					m.push(l + "=" + d.encode(p[l]))
				}
			}
		}
		return m.join("&")
	};
	d.jsonpGet = function(k, o, w) {
		var v = w.cbKey || "callback";
		var r = w.timeout || 60000;
		var m = 0, p = 0, s = 0;
		var l;
		var n;
		if (window.null_data) {
			n = window.null_data
		}
		window.null_data = function() {
			if (n) {
				n()
			}
		};
		var u = !!w.testing ? jsonp_callback : "jsonp_callback_" + Math.random().toString().replace(".", "");
		window[u] = function(y, x) {
			if (p) {
				return
			}
			clearTimeout(m);
			if (w.onCallback && b.iF(w.onCallback)) {
				w.onCallback(y, x)
			}
			t()
		};
		var j = {
			success : function() {
				s = 1
			}
		};
		var q = f(o, w.queryOrder, [v + "=" + u]);
		if (k.indexOf("?") < 0) {
			l = b.getScript(k + "?" + q, j)
		} else {
			l = b.getScript(k + "&" + q, j)
		}
		function t() {
			try {
				l.parentNode.removeChild(l);
				delete window[u]
			} catch(x) {
				window[u] = undefined
			}
		}

		m = setTimeout(function() {
			window[u](null, "Timeout");
			window[u] = function() {
				t()
			};
			p = 1
		}, r)
	};
	function h(k) {
		if (!k || !k.tagName) {
			return ""
		}
		if (k.outerHTML) {
			return k.outerHTML
		}
		var j, l = document.createElement("div");
		l.appendChild(k.cloneNode(true));
		j = el.innerHTML;
		el = null;
		return j
	}
	d.getAttrs = function(m) {
		var l = m.attributes;
		var q = l.length - 1;
		var k = {
			data : {},
			biz : {}
		};
		if (q < 15) {
			var j;
			while (q + 1) {
				j = l[q].name;
				if (j.indexOf("data-") === 0) {
					k.data[j.substr(5)] = l[q].value
				} else {
					if (j.indexOf("biz-") === 0) {
						k.biz[j.substr(4)] = l[q].value
					}
				}
				q--
			}
		} else {
			var p = h(m);
			p = p.replace(m.innerHTML, "");
			var o = /(data|biz)-(.+?)=("|').*?\3/g;
			while (!!( q = o.exec(p))) {
				k[q[1]][q[2].toLowerCase()] = l[q[1] + "-" + q[2]].value;
				if (q[5] === "") {
					break
				}
			}
		}
		return k
	};
	var i = function(j, k, l) {
		switch(j.toLowerCase()) {
			case"beforebegin":
				l.parentNode.insertBefore(k, l);
				break;
			case"afterbegin":
				l.insertBefore(k, l.firstChild);
				break;
			case"beforeend":
				l.appendChild(k);
				break;
			case"afterend":
				if (l.nextSibling) {
					l.parentNode.insertBefore(k, l.nextSibling)
				} else {
					l.parentNode.appendChild(k)
				}
				break
		}
	};
	var e = function(n, l, j) {
		if (!l) {
			l = document.body;
			j = "beforeend"
		} else {
			if (!j) {
				j = "beforeend"
			}
		}
		if (l.insertAdjacentHTML) {
			return l.insertAdjacentHTML(j, n)
		}
		var m = l.ownerDocument.createRange();
		m.setStartBefore(l);
		var k = m.createContextualFragment(n);
		i(j, k, l);
		return k
	};
	var g = 0;
	d._iframe_document_domain = false;
	d.buildWriteableIframe = function(l) {
		var j = {};
		l.id = l.id || "writeable_iframe_" + g++;
		(function k(p) {
			if (p > 20) {
				return false
			}
			var o = '<iframe id="' + l.id + '" width="' + l.width + '" height="' + l.height + '" style="display:none"';
			var n = " src=\"javascript:document.write('<script>document.domain=\\'" + document.domain + "\\';<\/script>');\"";
			var m = ' border="0" frameborder="0" scrolling="no" marginwidth="0" allowTransparency="true" marginheight="0"  style="border: 0pt none;"></iframe>';
			var q = o;
			if (d._iframe_document_domain) {
				document.domain = document.domain;
				q += n
			}
			q += m;
			e(q, l.holder, l.position);
			setTimeout(function() {
				try {
					var w = document.getElementById(l.id);
					var u = w.contentWindow;
					var t = u.document;
					t.open("text/html", "replace");
					if (q.indexOf("document.domain") > 0) {
						t.domain = document.domain
					}
					if (l.data && b.iA(l.data)) {
						var v = l.data;
						for (var s = 0; s < v.length; s++) {
							u[v[s].key] = v[s].value
						}
					}
					t.write(l.content);
					w.style.display = "";
					if (l.complete) {
						l.complete(w)
					}
					if (w.style.display == "none") {
						setTimeout(function() {
							w.style.display = ""
						}, 200)
					}
				} catch(r) {
					w.parentNode.removeChild(w);
					if (!p) {
						p = 1
					} else {
						p++
					}
					if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
						d._iframe_document_domain = true
					}
					k(p)
				}
			}, 20)
		})()
	}
});
KSLITE.declare("tkapi-bindclick", ["tkapi-util", "tkapi-config"], function(e, c) {
	var b = e("tkapi-config"), d = e("tkapi-util");
	var g = "http://g.click.taobao.com/q?";
	var f = function(m) {
		var r, s;
		var i,l;
		if(typeof m=='string'){
			//改造后的 fengxinglong
			l=i=m;
			var j = {biz:{},data:{}};
			if (l) {
				j.biz.url = l
			}
			var q = b.queryData(j, {
				v : "1.1"
			});
			var h = g + d.buildQuery(q, b.c.queryOrder);
			return h;
		}
		
		//原始代码
		var i = d.getAttr(m, "href");
		var l = d.getAttr(m, "_orighref");
		if (!l && !d.getAttr(m, "_tkworked")) {
			d.setAttr(m, "_orighref", i);
			d.setAttr(m, "_tkworked", "true");
			l = i
		}
		var j = d.getAttrs(m);
		var n = (l.match(/(?:http:)?\/\/([^\/]+)/i)||["",""])[1], p = !!n.match(/.+(\.taobao\.com|\.tmall\.com)$/ig), k = !!n.match(/.+(\.click\.taobao\.com)$/ig), o = !!(j.biz.itemid || j.biz.sellerid || j.biz.keyword || j.data.itemid || j.data.sellerid || j.data.keyword);
		if (!o) {
			if (k) {
				return undefined
			}
			if (!p) {
				return undefined
			}
			if (!b.getConfig("link_profit") && /item\.taobao|detail\.tmall/.test(n)) {
				return undefined
			}
		}
		if (l) {
			j.biz.url = l
		}
		var q = b.queryData(j, {
			v : "1.1"
		});
		var h = g + d.buildQuery(q, b.c.queryOrder);
		return h
	};
	
	window.convert=f
	function a(k) {
		var h = k, j = h.srcElement || h.target;
		j = d.findMatchEl(j);
		if (j) {
			var i = f(j), l = j.innerText || "";
			if (d.trim(l) != d.trim(j.href)) {
				l = null
			}
			if (i) {
				d.setAttr(j, "href", i);
				if (l) {
					j.innerText = l
				}
			}
		}
	}
	c.Def = function() {
		d.addEvent(document, "mousedown", a)
	}
});

KSLITE.declare("tkapi-box-helper", ["tkapi-util", "tkapi-config"], function(c, d) {
	var e = c("tkapi-config"), h = c("tkapi-util");
	var f = 0, g = document;
	g.createElement("tkbox");
	d.uniqId = function() {
		return ++f
	};
	d.checkParams = function(j) {
		if (!j.data.type) {
			return 0
		}
		return 1
	};
	d.isInView = function(k) {
		var j = (g.documentElement.clientHeight || g.body.clientHeight) * 2, l = h.getElClientRect(k);
		return l.top > 0 && (j - l.top > l.height)
	};
	d.tplParser = function(j, k) {
		h.each(k, function(l, m) {
			j = j.replace(new RegExp("{" + m + "}", "g"), l)
		});
		return j
	};
	d.styleTplParser = function(j, m) {
		var k = KSLITE.mix({}, m), l = "";
		k = KSLITE.mix(k, j, false);
		h.each(k, function(n, o) {
			if ((n - 0) == n) {
				n = n + "px"
			}
			l = l += o + ":" + n + ";"
		});
		return l
	};
	var b = "http://g.click.taobao.com/display";
	d.fetchData = function(j, k) {
		j.wt = j.type;
		if (j.index) {
			j.wi = j.index
		}
		if (j.tmplid) {
			j.ti = j.tmplid
		}
		if (j.tmpl) {
			j.tl = j.tmpl
		}
		if (j.style) {
			j.st = j.style
		}
		h.jsonpGet(b, j, {
			cbKey : "cb",
			queryOrder : e.c.queryOrder,
			onCallback : function(m, l) {
				if (l) {
					m = {
						code : -1
					}
				}
				if (m.code) {
					if (Math.floor(m.code / 100) != 2) {
						return
					}
				}
				k(m)
			}
		})
	};
	var i = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"><html><head> <title> GOLDEN TAOKE > ARBITER > ArbiterEntityView - Powered By Arbiter </title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/></head><body style="margin: 0"><script type="text/javascript" src="{template}"><\/script></body></html>';
	var a = '<iframe frameborder="0" style="border:none;width:{width}px;height:{height}px;overflow:hidden" scrolling="no" src="{src}" ></iframe>';
	d.render = function(n, k) {
		if (n.pattern && n.pattern == "tms") {
			var j = d.tplParser(a, {
				width : n.box.width,
				height : n.box.height,
				src : n.templet
			});
			k.innerHTML = j
		} else {
			var m = {
				width : n.box.width,
				height : n.box.height,
				data : [{
					key : "UP_DATA",
					value : n.data
				}],
				content : d.tplParser(i, {
					template : n.templet
				}),
				holder : k,
				position : "beforeend"
			};
			var l = h.buildWriteableIframe(m)
		}
	}
});
KSLITE.declare("tkapi-tipbox", ["tkapi-util", "tkapi-config", "tkapi-box-helper"], function(f, s) {
	var c = f("tkapi-config"), a = f("tkapi-box-helper"), h = f("tkapi-util");
	var v = "_tk_box_index", n = "http://g.click.taobao.com/display", t = document;
	var e = h.cssSupports("transform");
	var g = navigator.userAgent.toLowerCase();
	var k = (g.indexOf("msie") != -1 ? parseInt(g.split("msie")[1], 10) == 6 : false);
	var i = "http://img01.taobaocdn.com/tps/i1/T1WPlHXr4aXXXDSPLj-60-34.png";
	var w = 7, m = 12, p = {
		box : {
			position : "absolute",
			"text-indent" : "0px",
			left : "0px",
			top : "0px",
			"z-index" : "1000;"
		},
		inner : {
			border : "1px solid #d9d9d9",
			margin : "{margin}",
			padding : "5px",
			background : "#FFF",
			height : "{height}px",
			"box-shadow" : "-1px 2px 4px #CCC",
			width : "{width}px"
		},
		arrowInner : {
			border : "solid 1px #CCC",
			height : "10px",
			background : "white",
			"box-shadow" : "#CCC -1px 3px 3px",
			position : "relative"
		},
		arrowOuter : {
			overflow : "hidden",
			height : "12px",
			width : "18px",
			position : "absolute",
			border : "none"
		},
		arrowImage : "background: url(" + i + ") no-repeat",
		arrowImage_ie6 : "width:60px;height:34px;position:relative;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + i + "', sizingMethod='crop');"
	}, b = {
		topleft : function(u) {
			return {
				box : a.styleTplParser(p.box, {
					top : u.top,
					left : u.left
				}),
				inner : a.styleTplParser(p.inner, KSLITE.mix({
					margin : "0 0 7px 0"
				}, u)),
				arrowInner : a.styleTplParser(p.arrowInner, {
					"-webkit-transform" : "matrix(1,-0.6,0,1,0,3)",
					"-moz-transform" : "matrix(1,-0.6,0,1,0px,3px)",
					"-ms-transform" : "matrix(1,-0.6,0,1,0,3)",
					"-o-transform" : "matrix(1,-0.6,0,1,0,3)",
					transform : "matrix(1,-0.6,0,1,0,3)",
					bottom : "10px",
					left : "3px"
				}),
				arrowOuter : a.styleTplParser(p.arrowOuter, {
					bottom : "-3px",
					left : "-3px"
				}),
				arrowImage : p.arrowImage + " -33px -22px;",
				arrowImage_ie6 : p.arrowImage_ie6 + "left:-33px;top:-22px;"
			}
		},
		topright : function(u) {
			return {
				box : a.styleTplParser(p.box, {
					top : u.top,
					left : u.left
				}),
				inner : a.styleTplParser(p.inner, KSLITE.mix({
					margin : "0 0 7px 0"
				}, u)),
				arrowInner : a.styleTplParser(p.arrowInner, {
					"-webkit-transform" : "matrix(1,0.6,0,1,0,3)",
					"-moz-transform" : "matrix(1,0.6,0,1,0px,3px)",
					"-ms-transform" : "matrix(1,0.6,0,1,0,3)",
					"-o-transform" : "matrix(1,0.6,0,1,0,3)",
					transform : "matrix(1,0.6,0,1,0,3)",
					bottom : "10px",
					right : "3px"
				}),
				arrowOuter : a.styleTplParser(p.arrowOuter, {
					bottom : "-3px",
					right : "-3px"
				}),
				arrowImage : p.arrowImage + " -9px -22px;",
				arrowImage_ie6 : p.arrowImage_ie6 + "left:-9px;top:-22px;"
			}
		},
		bottomleft : function(u) {
			return {
				box : a.styleTplParser(p.box, {
					top : u.top,
					left : u.left
				}),
				inner : a.styleTplParser(p.inner, KSLITE.mix({
					margin : "7px 0 0 0"
				}, u)),
				arrowInner : a.styleTplParser(p.arrowInner, {
					"-webkit-transform" : "matrix(1,0.6,0,1,0,3)",
					"-moz-transform" : "matrix(1,0.6,0,1,0px,3px)",
					"-ms-transform" : "matrix(1,0.6,0,1,0,3)",
					"-o-transform" : "matrix(1,0.6,0,1,0,3)",
					transform : "matrix(1,0.6,0,1,0,3)",
					top : "3px",
					left : "3px"
				}),
				arrowOuter : a.styleTplParser(p.arrowOuter, {
					top : "-3px",
					left : "-3px"
				}),
				arrowImage : p.arrowImage + " 3px 0px;",
				arrowImage_ie6 : p.arrowImage_ie6 + "left:3px;top:0px;"
			}
		},
		bottomright : function(u) {
			return {
				box : a.styleTplParser(p.box, {
					top : u.top,
					left : u.left
				}),
				inner : a.styleTplParser(p.inner, KSLITE.mix({
					margin : "7px 0 0 0"
				}, u)),
				arrowInner : a.styleTplParser(p.arrowInner, {
					"-webkit-transform" : "matrix(1,-0.6,0,1,0,3)",
					"-moz-transform" : "matrix(1,-0.6,0,1,0px,3px)",
					"-ms-transform" : "matrix(1,-0.6,0,1,0,3)",
					"-o-transform" : "matrix(1,-0.6,0,1,0,3)",
					transform : "matrix(1,-0.6,0,1,0,3)",
					top : "3px",
					right : "3px"
				}),
				arrowOuter : a.styleTplParser(p.arrowOuter, {
					top : "-3px",
					right : "-3px"
				}),
				arrowImage : p.arrowImage + " -45px 0px;",
				arrowImage_ie6 : p.arrowImage_ie6 + "left:-45px;top:0px;"
			}
		}
	};
	function j(y) {
		var z = a.uniqId(), x = t.createElement("tkbox"), u = '                <div id="tk_box_inner_{uniqId}"></div>                <div id="tk_box_arrow_outer_{uniqId}">                    <div id="tk_box_arrow_inner_{uniqId}"></div>                </div>';
		x.id = "tk_box_" + z;
		x.innerHTML = u.replace(/\{uniqId\}/g, z);
		t.body.appendChild(x);
		h.setAttr(x, v, z);
		return {
			box : x,
			holder : t.getElementById("tk_box_inner_" + z),
			uniqId : z
		}
	}

	var d = 0;
	var o = [];
	s.onMouseover = function(u) {
		s.clearHideTimer.call(u);
		var z = h.getAttr(u, v);
		if (z === "0") {
			return false
		} else {
			if (z && d == z) {
				return false
			} else {
				h.hide(document.getElementById("tk_box_" + d))
			}
		}
		var x = document.getElementById("tk_box_" + z);
		if (x) {
			return r(x, u)
		}
		var y = h.getAttrs(u);
		h.setAttr(u, v, "0");
		if (!a.checkParams(y)) {
			return false
		}
		y = c.queryData(y);
		a.fetchData(y, function(B) {
			var A = j(B);
			a.render(B, A.holder);
			h.setAttr(u, v, A.uniqId);
			A.box.size = B.box;
			A.box.uniqId = A.uniqId;
			r(A.box, u)
		})
	};
	function l(E, A) {
		var y = t.documentElement, B = t.body, D = (y.clientHeight || B.clientHeight), F = (y.clientWidth || B.clientWidth), z = (y.scrollTop || B.scrollTop), J = h.getElClientRect(A), I = 0, C = 0, G = "";
		var K = E.size.height, x = E.size.width, H = E.uniqId;
		if (D > J.top && J.top > (w + K)) {
			G = "top";
			I = J.top + z - K - w - 12
		} else {
			G = "bottom";
			I = J.top + J.height + z
		}
		if (J.left + x < F) {
			G += "left";
			C = J.left
		} else {
			G += "right";
			C = Math.min(J.left + J.width, F) - (x + 12) - 2
		}
		var u = b[G]({
			top : I,
			left : C,
			height : K,
			width : x
		});
		t.getElementById("tk_box_" + H).style.cssText = u.box;
		t.getElementById("tk_box_inner_" + H).style.cssText = u.inner;
		if (e) {
			t.getElementById("tk_box_arrow_outer_" + H).style.cssText = u.arrowOuter;
			t.getElementById("tk_box_arrow_inner_" + H).style.cssText = u.arrowInner
		} else {
			if (k) {
				t.getElementById("tk_box_arrow_outer_" + H).style.cssText = u.arrowOuter;
				t.getElementById("tk_box_arrow_inner_" + H).style.cssText = u.arrowImage_ie6
			} else {
				t.getElementById("tk_box_arrow_outer_" + H).style.cssText = u.arrowOuter + u.arrowImage
			}
		}
	}

	var q = {};
	function r(x, u) {
		l(x, u);
		h.addEvent(u, "mouseout", s.hide);
		h.addEvent(x, "mouseover", s.clearHideTimer);
		h.addEvent(x, "mouseout", s.hide);
		x.tklink_element = u
	}
	s.hide = function(x) {
		var u = this;
		var y = h.getAttr(this, v);
		if (q[y]) {
			window.clearTimeout(q[y])
		}
		q[y] = setTimeout(function() {
			var A = u;
			d = 0;
			var z = document.getElementById("tk_box_" + y);
			h.hide(z);
			if (u == z && z.tklink_element) {
				h.removeEvent(z.tklink_element, "mouseout", s.hide)
			} else {
				h.removeEvent(A, "mouseout", s.hide)
			}
			h.removeEvent(z, "mouseout", s.hide);
			h.removeEvent(z, "mouseover", s.clearHideTimer)
		}, 250)
	};
	s.clearHideTimer = function() {
		var u = h.getAttr(this, v);
		window.clearTimeout(q[u])
	}
});
KSLITE.declare("tkapi-replacebox", ["tkapi-util", "tkapi-config", "tkapi-box-helper"], function(d, b) {
	var a = d("tkapi-config"), f = d("tkapi-box-helper"), c = d("tkapi-util");
	var e = "_tk_rb_index", h = document, g = "http://g.click.taobao.com/display";
	b.scrollHandle = function() {
		var i = [];
		if (document.querySelectorAll) {
			i = c.nodeList2Array(document.querySelectorAll('a[data-style="2"]'))
		} else {
			var j = c.nodeList2Array(document.getElementsByTagName("a"));
			c.each(j, function(k, l) {
				if (c.getAttr(k, "data-style") == 2) {
					i.push(k)
				}
			})
		}
		c.each(i, function(k, l) {
			if (c.getAttr(k, e)) {
				return false
			}
			var m = c.getAttr(k, "data-notlazy");
			if (m || f.isInView(k)) {
				b.show(k)
			}
		})
	};
	b.show = function(j) {
		if (c.getAttr(j, e)) {
			return
		}
		var i = c.getAttrs(j);
		c.setAttr(j, e, "0");
		if (!f.checkParams(i)) {
			return false
		}
		var k = a.queryData(i);
		f.fetchData(k, function(m) {
			var l = h.createElement("tkbox"), n = f.uniqId();
			l.id = "tk_box_" + n;
			l.style.cssText = f.styleTplParser({
				border : "1px solid #d9d9d9",
				"text-indent" : "0px",
				display : "block",
				width : m.box.width,
				height : m.box.height
			});
			if (j.getAttribute("data-border") == "0") {
				l.style.border = "none"
			}
			j.parentNode.insertBefore(l, j);
			c.hide(j);
			c.setAttr(j, e, n);
			f.render(m, l)
		})
	}
});
KSLITE.declare("tkapi-boot", ["tkapi-util", "tkapi-config", "tkapi-tipbox", "tkapi-replacebox"], function(d, b) {
	var a = d("tkapi-config"), f = d("tkapi-tipbox"), e = d("tkapi-replacebox"), c = d("tkapi-util");
	b.Def = function() {
		c.addEvent(document, "mouseover", function(i) {
			var h = i.target || i.srcElement;
			if (h.tagName.toLowerCase() !== "a") {
				return
			}
			if (c.getAttr(h, "_hover-ignore")) {
				return
			}
			if (c.getAttr(h, "data-style") == 1) {
				f.onMouseover(h)
			} else {
				c.setAttr(h, "_hover-ignore", "1")
			}
		});
		var g;
		c.addEvent(window, "scroll", function() {
			if (g) {
				window.clearTimeout(g)
			}
			g = setTimeout(e.scrollHandle, 80)
		});
		c.domReady(e.scrollHandle)
	}
});
KSLITE.declare("tkapi-load", ["tkapi-util", "tkapi-config"], function(d, b) {
	var a = d("tkapi-config"), e = a.r, c = d("tkapi-util");
	b.Def = function() {
		var f = [];
		function g(i, h) {
			if (!!h) {
				f.push(i + ( i ? "=" : "") + h)
			}
		}

		g("rf", c.encode(e.cache.ref));
		g("pid", e.cache.pid);
		g("pgid", e.cache.pgid);
		g("ak", e.cache.ak);
		g("", e.cache.pp);
		c.jsonpGet(a.c.alimama + "load?" + f.join("&"), {}, {
			cbKey : "cb",
			onCallback : function(i, h) {
				if (h) {
					i = {
						code : -1
					}
				}
				if (String(i.code).length != 8) {
					return
				}
				e.cache.et = i.code
			}
		});
		(new Image()).src = "http://acookie.taobao.com/1.gif"
	}
});
KSLITE.declare("tkapi-plugin", ["tkapi-util", "tkapi-config", "tkapi-replacebox"], function(c, k) {
	var j = KSLITE;
	var o = c("tkapi-config");
	var n = c("tkapi-util");
	var f = c("tkapi-replacebox");
	var a;
	var b = {};
	b.tklink = function(u, t, s) {
		if (!j.iPO(t)) {
			return null
		}
		var r, q = document.createElement("a");
		t.tc = this.getPluginName();
		q.href = t.href;
		q.appendChild(document.createTextNode(u));
		for (r in t) {
			if (t.hasOwnProperty(r) && r != "href") {
				q.setAttribute("data-" + r, t[r])
			}
		}
		if (s) {
			if (!a) {
				a = document.createElement("div")
			}
			a.innerHTML = "";
			a.appendChild(q);
			return a.innerHTML
		} else {
			return q
		}
	};
	b.showReplaceBox = f.show;
	var p;
	b.getElementsFor = function(s) {
		var r = {};
		var u = [];
		p = p || document.getElementsByTagName("*");
		var q;
		for (var t = 0; t < p.length; t++) {
			q = p[t].getAttribute("data-plugin");
			if (q) {
				if (q.indexOf(",")) {
					q = q.split(",")[0]
				}
				if (!r[q]) {
					r[q] = []
				}
				r[q].push(p[t])
			}
		}
		return r[s] || []
	};
	b.util = n;
	var m = {};
	var e = function(r) {
		if (m[r]) {
			return m[r]
		}
		var q = function() {
		};
		q.prototype = b;
		var s = new q();
		s.getPluginName = function() {
			return r
		};
		m[r] = s;
		return s
	};
	var i = undefined, h = -1, d = 0;
	var g = k.taskQueue = {
		queue : [],
		waiting : 0,
		onLoad : function() {
			var q = g;
			var r = -1;
			var t = q.queue[q.waiting];
			var s = function(v) {
				if (r === 0) {
					return
				}
				q.waiting++;
				clearTimeout(r);
				setTimeout(q.onLoad)
			};
			if (t) {
				q.queue[q.waiting] = d;
				if (t === h || !(t.Def && j.iF(t.Def))) {
					return s()
				}
				r = setTimeout(function() {
					s();
					r = 0
				}, 2000);
				if (t.Def.length) {
					try {
						t.Def(s)
					} catch(u) {
					}
				} else {
					try {
						t.Def()
					} catch(u) {
					}
					s()
				}
			}
		},
		attachPlugin : function(q, u) {
			var s = l(q);
			var t = j.Env.mods[u];
			var r = j.require(t.name);
			t.fn({
				require : s
			}, r, j._ns(t.name));
			t.status = 4;
			return r
		},
		loadByName : function(r, q) {
			var s = this;
			var t = "tkapi-plugin-" + q;
			j._lM({
				name : t
			}, function() {
				var u = s.attachPlugin(q, t);
				r(u)
			})
		},
		loadByDeclare : function(q, t) {
			var r = this;
			var s = "tkapi-plugin-" + t.name;
			j.declare(s, [], t.declare);
			var u = r.attachPlugin(t.name, s);
			q(u);
			console.log("new declare", s)
		},
		loadByUrl : function(q, t) {
			var r = this;
			var s = "tkapi-plugin-" + t.name;
			j.getScript(t.url, function() {
				var u = r.attachPlugin(t.name, s);
				q(u)
			});
			console.log("new Url", t)
		},
		addTask : function(u, q) {
			var r = this;
			var t = 0;
			var s = r.queue.push(i) - 1;
			var v = function(w) {
				clearTimeout(t);
				r.queue[s] = (w === undefined) ? h : w;
				r.onLoad()
			};
			t = setTimeout(v, 10000);
			if (q) {
				q(v, u.name)
			} else {
				if (u.declare) {
					r.loadByDeclare(v, u)
				} else {
					if (u.url) {
						r.loadByUrl(v, u)
					} else {
						if (u.name) {
							r.loadByName(v, u.name)
						}
					}
				}
			}
		}
	};
	var l = k.requireFor = function(q) {
		return function(r) {
			if (r == "tkapi-plugin-api") {
				return e(q)
			} else {
				return j.require(r)
			}
		}
	};
	k.Def = function(q) {
		g.queue = [];
		g.waiting = 0;
		if (!q) {
			return
		}
		if (!j.iA(q) || !q.length) {
			return
		}
		var s, t;
		for (var r = 0; r < q.length; r++) {
			s = q[r];
			g.addTask(s)
		}
	}
}); 