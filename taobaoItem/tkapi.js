﻿/*pub-1|2013-05-21 11:28:03*/
(function(e, f, j) {
	var m = {
		lt_pkgs : {
			tkapi : "",
			packages : "http://a.alimama.cn/kslite/",
			charset : "utf8"
		},
		lt_v : "1.0.0",
		lt_t : "20130226.js"
	};
	if (e[f] === j) {
		e[f] = {}
	} else {
		KSLITE.Config.lt_pkgs = KSLITE.mix(m.lt_pkgs, KSLITE.Config.lt_pkgs);
		var h = KSLITE.getScript;
		KSLITE.getScript = function(t, u, w, v) {
			if (t.indexOf("/tkapi/")) {
				return h(t, u, "utf-8", v)
			} else {
				return h(t, u, "gbk", v)
			}
		};
		return
	}
	var l = e.KSLITEonLoad, d = e.KSLITEpkgPaths;
	f = e[f];
	var s = e.document;
	var p = Object.prototype.toString;
	var n = function(x, w, v, z) {
		if (!w || !x) {
			return x
		}
		if (v === j) {
			v = true
		}
		var u, y, t;
		if (z && ( t = z.length)) {
			for ( u = 0; u < t; u++) {
				y = z[u];
				if ( y in w) {
					if (v || !( y in x)) {
						x[y] = w[y]
					}
				}
			}
		} else {
			for (y in w) {
				if (v || !( y in x)) {
					x[y] = w[y]
				}
			}
		}
		return x
	};
	var i = s.getElementsByTagName("head")[0] || s.documentElement;
	var a = 0, r = 1, g = 2, k = 3, c = 4, b = /\.css(?:\?|$)/i;
	var o = s.createElement("script").readyState ? function(u, v) {
		var t = u.onreadystatechange;
		u.onreadystatechange = function() {
			var w = u.readyState;
			if (w === "loaded" || w === "complete") {
				u.onreadystatechange = null;
				if (t) {
					t()
				}
				v.call(this)
			}
		}
	} : function(t, u) {
		t.addEventListener("load", u, false);
		t.addEventListener("error", u, false)
	};
	function q() {
		if (navigator.userAgent.indexOf("MSIE") < 0) {
			return null
		}
		var u = i.getElementsByTagName("script");
		var v, w = 0, t = u.length;
		for (; w < t; w++) {
			v = u[w];
			if (v.readyState === "interactive") {
				return v
			}
		}
		return null
	}

	n(f, {
		version : m.lt_v,
		_init : function() {
			var v, w, u = s.getElementsByTagName("script");
			if (!window.KSLITEcurrentScript) {
				for ( v = 0; v < u.length; v++) {
					if (u[v].kslite) {
						window.KSLITEcurrentScript = u[v];
						break
					}
				}
			}
			w = window.KSLITEcurrentScript || u[u.length - 1];
			window.KSLITEcurrentScript = w;
			var z = (w.src).split("/").slice(0, -1).join("/") + "/";
			f.Env = {
				mods : {},
				fns : {},
				_loadQueue : {},
				_relies : {
					rq : {},
					sp : {}
				}
			};
			f.Config = {
				debug : "",
				base : z,
				timeout : 10,
				kslite : m
			};
			f.mix(f.Config, m);
			f.declare("kslite", [], function(A, x) {
				x = f.mix(x, f, true, ["path", "log", "getScript", "substitute", "clone", "mix", "multiAsync", "extend", "iA", "iF", "iPO", "iS"])
			});
			f.provide(["kslite"], function(x) {
				f.require("kslite").log("kslite inited")
			});
			if (f.Config.debug) {
				m.lt_t += (new Date()).getTime() + ".js"
			}
			var y;
			function t(A) {
				var x = A.split("@");
				m.lt_pkgs[x[0]] = x[1]
			}
			e.KSLITEpkgPaths = {
				push : function(x) {
					t(x)
				}
			};
			if (d && f.iA(d)) {
				for ( y = 0; y < d.length; y++) {
					t(d[y])
				}
			}
			m.lt_t = e.KSLITEtimestamp || m.lt_t;
			e.KSLITEonLoad = {
				push : function(x) {
					if (x && f.iF(x)) {
						x(f)
					}
				}
			};
			if (l && f.iA(l)) {
				for ( y = 0; y < l.length; y++) {
					if (f.iF(l[y])) {
						l[y](f)
					}
				}
			}
		},
		mix : n,
		log : function(v, t, u) {
			if (f.Config.debug) {
				if (e.console !== j && console.log) {
					console[t&&console[t]?t:"log"](v)
				}
			}
			return f
		},
		clone : function(w) {
			var v = w, t, u;
			if (w && (( t = f.iA(w)) || f.iPO(w))) {
				v = t ? [] : {};
				for (u in w) {
					if (w.hasOwnProperty(u)) {
						v[u] = f.clone(w[u])
					}
				}
			}
			return v
		},
		extend : function(x, w, u, A) {
			if (!w || !x) {
				return x
			}
			var t = Object.prototype, z = function(C) {
				function B() {
				}
				B.prototype = C;
				return new B()
			}, y = w.prototype, v = z(y);
			x.prototype = v;
			v.constructor = x;
			x.superclass = y;
			if (w !== Object && y.constructor === t.constructor) {
				y.constructor = w
			}
			if (u) {
				n(v, u)
			}
			if (A) {
				n(x, A)
			}
			return x
		},
		substitute : function(w, v, u, t) {
			if (!f.iS(w) || !f.iPO(v)) {
				return w
			}
			return w.replace(u || (/\\?\{([^{}]+)\}/g), function(y, x) {
				if (y.charAt(0) === "\\") {
					return y.slice(1)
				}
				return (v[x] !== j) ? v[x] : ( t ? y : "")
			})
		},
		getScript : function(t, C, x, B) {
			var D = b.test(t), w = s.createElement( D ? "link" : "script");
			var v = C, z, A, u, y;
			if (f.iPO(v)) {
				C = v.success;
				z = v.error;
				A = v.timeout;
				x = v.charset
			}
			if (D) {
				w.href = t;
				w.rel = "stylesheet"
			} else {
				w.src = t;
				w.async = true
			}
			if (x) {
				w.charset = x
			}
			if (B) {
				for (y in B) {
					w.setAttribute(y, B[y])
				}
			}
			if (f.iF(C)) {
				if (D) {
					C.call(w)
				} else {
					o(w, function() {
						if (u) {
							clearTimeout(u);
							u = j
						}
						C.call(w)
					})
				}
			}
			if (f.iF(z)) {
				u = setTimeout(function() {
					u = j;
					z()
				}, (A || f.Config.timeout) * 1000)
			}
			i.insertBefore(w, i.firstChild);
			return w
		},
		iF : function(t) {
			return p.call(t) === "[object Function]"
		},
		iA : function(t) {
			return p.call(t) === "[object Array]"
		},
		iS : function(t) {
			return p.call(t) === "[object String]"
		},
		iPO : function(t) {
			return t && p.call(t) === "[object Object]" && !t.nodeType && !t.setInterval
		},
		add : function(u, w, t) {
			var x = f.Env.mods, v;
			if (x[u] && x[u].status > a) {
				return
			}
			v = {
				name : u,
				fn : w || null,
				status : g
			};
			if (f.iA(t)) {
				t = {
					requires : t
				}
			}
			n(v, t);
			x[u] = v;
			return f
		},
		use : function(t, v) {
			t = t.split(",");
			var u = f.Env.mods;
			f._aMs(t, function() {
				if (v) {
					v(f)
				}
			})
		},
		_aMs : function(t, w) {
			var u, v = {};
			for ( u = 0; u < t.length; u++) {
				v[t[u]] = {
					f : f._aM,
					a : t[u]
				}
			}
			f.multiAsync(v, w)
		},
		_aM : function(y, x) {
			var u, B;
			var z = f.Env.mods, t = f.Env._relies.rq, w = f.Env._relies.sp;
			function v(C) {
				if (C.status != c) {
					if (C.fn) {
						f.log("attach " + C.name);
						C.fn(f, f.require(C.name), f._ns(C.name))
					} else {
						f.log("attach " + C.name + " without expected attach fn!", "warn")
					}
					C.status = c
				}
				x()
			}

			function A(F) {
				var E, G, I, C, H;
				function D(J) {
					t[J] = t[J] || {};
					w[J] = w[J] || {};
					return J
				}

				G = D(F.name);
				for ( E = 0; E < F.requires.length; E++) {
					I = D(F.requires[E]);
					t[G][I] = 1;
					w[I][G] = 1;
					for (H in w[G]) {
						t[H][I] = 1;
						w[I][H] = 1
					}
				}
			}

			u = z[y];
			if (u && u.status !== a) {
				B = u.requires;
				if (f.iA(B) && B.length > 0) {
					A(u);
					if (t[y][y]) {
						throw new Error("Fatal Error,Loop Reqs:" + u.name)
					}
					f.log(u.name + " to req: " + B);
					f._aMs(B, function() {
						v(u)
					})
				} else {
					v(u)
				}
			} else {
				u = {
					name : y
				};
				f._lM(u, function() {
					f._aM(y, function() {
						v(z[y])
					})
				})
			}
		},
		_lM : function(u, z) {
			var t = f.Env._loadQueue, x = u.name, v;
			var w = f.Env.mods;
			if (t[x]) {
				v = t[x];
				if (v.c) {
					f.log(x + " is already loaded", "warn");
					z()
				} else {
					f.log(x + " is loading,listen to callback");
					v.fns.push(z)
				}
			} else {
				if ( typeof t[x] != "undefined") {
					try {
						t[x].fns.push(z)
					} catch(y) {
						t[x].fns = [z]
					}
				} else {
					t[x] = {
						fns : [z],
						c : false
					}
				}
				f._gPath(u, function() {
					if (!w[x]) {
						w[x] = {
							name : x,
							status : a
						}
					}
					var A;
					if (u.fullpath.indexOf("/tkapi/")) {
						A = "utf8"
					} else {
						A = "gbk"
					}
					f.getScript(u.fullpath, function() {
						var C, D = t[x], B;
						if (f.__m__) {
							B = f.__m__;
							f.add(x, B.fn, B.deps);
							f.__m__ = null
						}
						if (w[x].status === a) {
							w[x].status = g
						}
						for ( C = 0; C < D.fns.length; C++) {
							D.fns[C]()
						}
						D.c = true;
						D.fns = j
					}, A, {
						mod_name : x
					})
				})
			}
		},
		path : function(u, x) {
			var t = u.split("-"), w = t[0], v = f.Config.lt_pkgs;
			if (f.iS(v[w])) {
				x(v[w] + t.join("/"))
			} else {
				KSLITE.provide(["packages-router"], function(y) {
					var z = y("packages-router");
					x((z[w] || f.Config.base) + t.join("/"))
				})
			}
		},
		_gPath : function(t, u) {
			f.path(t.name, function(v) {
				t.fullpath = v + ".js?_t=" + m.lt_t;
				f.log("path " + t.name + ": " + t.fullpath);
				u()
			})
		},
		multiAsync : function(x, y) {
			var u, v, t = false;
			function w() {
				var z, A = {};
				for (z in x) {
					if (!x[z].c) {
						return
					}
					A[z] = x[z].r
				}
				y(A)
			}

			for (v in x) {
				t = true
			}
			if (!t) {
				y({})
			}
			for (v in x) {
				(function() {
					var z = x[v];
					z.f.call((z.c || f), z.a, function(A) {
						z.r = A;
						z.c = true;
						w()
					})
				})()
			}
		},
		_ns : function(v) {
			var t, u = v.split("-"), w = f.Env.fns;
			for ( t = 0; t < u.length; t++) {
				w[u[t]] = w[u[t]] || {};
				w = w[u[t]]
			}
			return w
		},
		require : function(u) {
			var t = f._ns(u);
			t.exports = t.exports || {};
			return t.exports
		},
		declare : function() {
			var w, v, u, y, t, x;
			for ( v = 0; v < arguments.length; v++) {
				u = arguments[v];
				if (f.iS(u)) {
					y = u
				} else {
					if (f.iA(u)) {
						t = u
					} else {
						if (f.iF(u)) {
							x = u
						}
					}
				}
			}
			if (!y) {
				w = q();
				if (w) {
					y = w.getAttribute("mod_name") || false
				}
			}
			if (!y) {
				f.__m__ = {
					deps : t,
					fn : function(A, z, B) {
						x(A.require, z, B)
					}
				}
			} else {
				f.add(y, function(A, z, B) {
					x(A.require, z, B)
				}, t)
			}
		},
		provide : function(u, t) {
			f.use(u.join(","), function(v) {
				t(v.require)
			})
		}
	});
	f._init()
})(window, "KSLITE");
(function(c, b) {
	var a = c.alimamatk_onload;
	c.alimamatk_onload = {
		push : function(d) {
			if (d && b.iPO(d)) {
				alimamatk_show(d)
			}
		}
	};
	if (a && b.iA(a)) {
		if (b.iPO(a[0])) {
			alimamatk_show(a[0])
		}
	}
})(window, KSLITE);
function alimamatk_show(b) {
	var a = b;
	KSLITE.provide(["tkapi-main"], function(c) {
		c("tkapi-main").run(a)
	})
};
