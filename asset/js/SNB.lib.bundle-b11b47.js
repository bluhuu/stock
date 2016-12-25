this.seajs = {
        _seajs: this.seajs
    }, seajs.version = "1.2.1", seajs._util = {}, seajs._config = {
        debug: "",
        preload: []
    },
    function(e) {
        var t = Object.prototype.toString,
            i = Array.prototype;
        e.isString = function(e) {
            return "[object String]" === t.call(e)
        }, e.isFunction = function(e) {
            return "[object Function]" === t.call(e)
        }, e.isRegExp = function(e) {
            return "[object RegExp]" === t.call(e)
        }, e.isObject = function(e) {
            return e === Object(e)
        }, e.isArray = Array.isArray || function(e) {
            return "[object Array]" === t.call(e)
        }, e.indexOf = i.indexOf ? function(e, t) {
            return e.indexOf(t)
        } : function(e, t) {
            for (var i = 0; i < e.length; i++)
                if (e[i] === t) return i;
            return -1
        };
        var n = e.forEach = i.forEach ? function(e, t) {
            e.forEach(t)
        } : function(e, t) {
            for (var i = 0; i < e.length; i++) t(e[i], i, e)
        };
        e.map = i.map ? function(e, t) {
            return e.map(t)
        } : function(e, t) {
            var i = [];
            return n(e, function(e, n, r) {
                i.push(t(e, n, r))
            }), i
        }, e.filter = i.filter ? function(e, t) {
            return e.filter(t)
        } : function(e, t) {
            var i = [];
            return n(e, function(e, n, r) {
                t(e, n, r) && i.push(e)
            }), i
        };
        var r = e.keys = Object.keys || function(e) {
            var t, i = [];
            for (t in e) e.hasOwnProperty(t) && i.push(t);
            return i
        };
        e.unique = function(e) {
            var t = {};
            return n(e, function(e) {
                t[e] = 1
            }), r(t)
        }, e.now = Date.now || function() {
            return (new Date).getTime()
        }
    }(seajs._util),
    function(e, t) {
        var i = Array.prototype;
        e.log = function() {
            if ("undefined" != typeof console) {
                var e = i.slice.call(arguments),
                    n = "log";
                console[e[e.length - 1]] && (n = e.pop()), ("log" !== n || t.debug) && (e = "dir" === n ? e[0] : i.join.call(e, " "), console[n](e))
            }
        }
    }(seajs._util, seajs._config),
    function(e, t, i) {
        function n(e) {
            return e = e.match(c), (e ? e[0] : ".") + "/"
        }

        function r(e) {
            if (h.lastIndex = 0, h.test(e) && (e = e.replace(h, "$1/")), -1 === e.indexOf(".")) return e;
            for (var t, i = e.split("/"), n = [], r = 0; r < i.length; r++)
                if (t = i[r], ".." === t) {
                    if (0 === n.length) throw Error("The path is invalid: " + e);
                    n.pop()
                } else "." !== t && n.push(t);
            return n.join("/")
        }

        function s(e) {
            var e = r(e),
                t = e.charAt(e.length - 1);
            return "/" === t ? e : ("#" === t ? e = e.slice(0, -1) : -1 === e.indexOf("?") && !d.test(e) && (e += ".js"), 0 < e.indexOf(":80/") && (e = e.replace(":80/", "/")), e)
        }

        function a(e) {
            if ("#" === e.charAt(0)) return e.substring(1);
            var i = t.alias;
            if (i && u(e)) {
                var n = e.split("/"),
                    r = n[0];
                i.hasOwnProperty(r) && (n[0] = i[r], e = n.join("/"))
            }
            return e
        }

        function o(e) {
            return 0 < e.indexOf("://") || 0 === e.indexOf("//")
        }

        function l(e) {
            return "/" === e.charAt(0) && "/" !== e.charAt(1)
        }

        function u(e) {
            var t = e.charAt(0);
            return -1 === e.indexOf("://") && "." !== t && "/" !== t
        }
        var c = /.*(?=\/.*$)/,
            h = /([^:\/])\/\/+/g,
            d = /\.(?:css|js)$/,
            p = /^(.*?\w)(?:\/|$)/,
            f = {},
            i = i.location,
            g = i.protocol + "//" + i.host + function(e) {
                return "/" !== e.charAt(0) && (e = "/" + e), e
            }(i.pathname);
        0 < g.indexOf("\\") && (g = g.replace(/\\/g, "/")), e.dirname = n, e.realpath = r, e.normalize = s, e.parseAlias = a, e.parseMap = function(i) {
            var n = t.map || [];
            if (!n.length) return i;
            for (var r = i, s = 0; s < n.length; s++) {
                var a = n[s];
                if (e.isArray(a) && 2 === a.length) {
                    var o = a[0];
                    (e.isString(o) && -1 < r.indexOf(o) || e.isRegExp(o) && o.test(r)) && (r = r.replace(o, a[1]))
                } else e.isFunction(a) && (r = a(r))
            }
            return r !== i && (f[r] = i), r
        }, e.unParseMap = function(e) {
            return f[e] || e
        }, e.id2Uri = function(e, i) {
            if (!e) return "";
            e = a(e), i || (i = g);
            var r;
            return o(e) ? r = e : 0 === e.indexOf("./") || 0 === e.indexOf("../") ? (0 === e.indexOf("./") && (e = e.substring(2)), r = n(i) + e) : r = l(e) ? i.match(p)[1] + e : t.base + "/" + e, s(r)
        }, e.isAbsolute = o, e.isRoot = l, e.isTopLevel = u, e.pageUri = g
    }(seajs._util, seajs._config, this),
    function(e, t) {
        function i(e, i) {
            e.onload = e.onerror = e.onreadystatechange = function() {
                d.test(e.readyState) && (e.onload = e.onerror = e.onreadystatechange = null, e.parentNode && !t.debug && u.removeChild(e), e = void 0, i())
            }
        }

        function n(t, i) {
            f || g ? (e.log("Start poll to fetch css"), setTimeout(function() {
                r(t, i)
            }, 1)) : t.onload = t.onerror = function() {
                t.onload = t.onerror = null, t = void 0, i()
            }
        }

        function r(e, t) {
            var i;
            if (f) e.sheet && (i = !0);
            else if (e.sheet) try {
                e.sheet.cssRules && (i = !0)
            } catch (n) {
                "NS_ERROR_DOM_SECURITY_ERR" === n.name && (i = !0)
            }
            setTimeout(function() {
                i ? t() : r(e, t)
            }, 1)
        }

        function s() {}
        var a, o, l = document,
            u = l.head || l.getElementsByTagName("head")[0] || l.documentElement,
            c = u.getElementsByTagName("base")[0],
            h = /\.css(?:\?|$)/i,
            d = /loaded|complete|undefined/;
        e.fetch = function(t, r, o) {
            var l = h.test(t),
                d = document.createElement(l ? "link" : "script");
            o && (o = e.isFunction(o) ? o(t) : o) && (d.charset = o), r = r || s, "SCRIPT" === d.nodeName ? i(d, r) : n(d, r), l ? (d.rel = "stylesheet", d.href = t) : (d.async = "async", d.src = t), a = d, c ? u.insertBefore(d, c) : u.appendChild(d), a = null
        }, e.getCurrentScript = function() {
            if (a) return a;
            if (o && "interactive" === o.readyState) return o;
            for (var e = u.getElementsByTagName("script"), t = 0; t < e.length; t++) {
                var i = e[t];
                if ("interactive" === i.readyState) return o = i
            }
        }, e.getScriptAbsoluteSrc = function(e) {
            return e.hasAttribute ? e.src : e.getAttribute("src", 4)
        }, e.importStyle = function(e, t) {
            if (!t || !l.getElementById(t)) {
                var i = l.createElement("style");
                t && (i.id = t), u.appendChild(i), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(l.createTextNode(e))
            }
        };
        var p = navigator.userAgent,
            f = 536 > Number(p.replace(/.*AppleWebKit\/(\d+)\..*/, "$1")),
            g = 0 < p.indexOf("Firefox") && !("onload" in document.createElement("link"))
    }(seajs._util, seajs._config, this),
    function(e) {
        var t = /(?:^|[^.$])\brequire\s*\(\s*(["'])([^"'\s\)]+)\1\s*\)/g;
        e.parseDependencies = function(i) {
            var n, r = [],
                i = i.replace(/^\s*\/\*[\s\S]*?\*\/\s*$/gm, "").replace(/^\s*\/\/.*$/gm, "");
            for (t.lastIndex = 0; n = t.exec(i);) n[2] && r.push(n[2]);
            return e.unique(r)
        }
    }(seajs._util),
    function(e, t, i) {
        function n(e, t) {
            this.uri = e, this.status = t || 0
        }

        function r(e, i) {
            return t.isString(e) ? n._resolve(e, i) : t.map(e, function(e) {
                return r(e, i)
            })
        }

        function s(e, r) {
            var s = t.parseMap(e);
            m[s] ? (h[e] = h[s], r()) : g[s] ? v[s].push(r) : (g[s] = !0, v[s] = [r], n._fetch(s, function() {
                m[s] = !0;
                var i = h[e];
                i.status === f.FETCHING && (i.status = f.FETCHED), y && (a(e, y), y = null), b && i.status === f.FETCHED && (h[e] = b, b.realUri = e), b = null, g[s] && delete g[s], v[s] && (t.forEach(v[s], function(e) {
                    e()
                }), delete v[s])
            }, i.charset))
        }

        function a(e, i) {
            var s = h[e] || (h[e] = new n(e));
            return s.status < f.SAVED && (s.id = i.id || e, s.dependencies = r(t.filter(i.dependencies || [], function(e) {
                return !!e
            }), e), s.factory = i.factory, s.status = f.SAVED), s
        }

        function o(e, t) {
            var i = e(t.require, t.exports, t);
            void 0 !== i && (t.exports = i)
        }

        function l(e) {
            var i = e.realUri || e.uri,
                n = d[i];
            n && (t.forEach(n, function(t) {
                o(t, e)
            }), delete d[i])
        }

        function u(e) {
            var i = e.uri;
            return t.filter(e.dependencies, function(e) {
                return _ = [i], (e = c(h[e], i)) && (_.push(i), t.log("Found circular dependencies:", _.join(" --> "), void 0)), !e
            })
        }

        function c(e, i) {
            if (!e || e.status !== f.SAVED) return !1;
            _.push(e.uri);
            var n = e.dependencies;
            if (n.length) {
                if (-1 < t.indexOf(n, i)) return !0;
                for (var r = 0; r < n.length; r++)
                    if (c(h[n[r]], i)) return !0
            }
            return !1
        }
        var h = {},
            d = {},
            p = [],
            f = {
                FETCHING: 1,
                FETCHED: 2,
                SAVED: 3,
                READY: 4,
                COMPILING: 5,
                COMPILED: 6
            };
        n.prototype._use = function(e, i) {
            t.isString(e) && (e = [e]);
            var n = r(e, this.uri);
            this._load(n, function() {
                var e = t.map(n, function(e) {
                    return e ? h[e]._compile() : null
                });
                i && i.apply(null, e)
            })
        }, n.prototype._load = function(e, i) {
            function r(e) {
                (e || {}).status < f.READY && (e.status = f.READY), 0 === --l && i()
            }
            var a = t.filter(e, function(e) {
                    return e && (!h[e] || h[e].status < f.READY)
                }),
                o = a.length;
            if (0 === o) i();
            else
                for (var l = o, c = 0; o > c; c++)(function(e) {
                    function i() {
                        if (a = h[e], a.status >= f.SAVED) {
                            var i = u(a);
                            i.length ? n.prototype._load(i, function() {
                                r(a)
                            }) : r(a)
                        } else t.log("It is not a valid CMD module: " + e), r()
                    }
                    var a = h[e] || (h[e] = new n(e, f.FETCHING));
                    a.status >= f.FETCHED ? i() : s(e, i)
                })(a[c])
        }, n.prototype._compile = function() {
            function e(e) {
                return e = r(e, i.uri), (e = h[e]) ? e.status === f.COMPILING ? e.exports : (e.parent = i, e._compile()) : null
            }
            var i = this;
            if (i.status === f.COMPILED) return i.exports;
            if (i.status < f.READY && !d[i.realUri || i.uri]) return null;
            i.status = f.COMPILING, e.async = function(e, t) {
                i._use(e, t)
            }, e.resolve = function(e) {
                return r(e, i.uri)
            }, e.cache = h, i.require = e, i.exports = {};
            var n = i.factory;
            return t.isFunction(n) ? (p.push(i), o(n, i), p.pop()) : void 0 !== n && (i.exports = n), i.status = f.COMPILED, l(i), i.exports
        }, n._define = function(e, i, n) {
            var s = arguments.length;
            1 === s ? (n = e, e = void 0) : 2 === s && (n = i, i = void 0, t.isArray(e) && (i = e, e = void 0)), !t.isArray(i) && t.isFunction(n) && (i = t.parseDependencies(n.toString()));
            var o, s = {
                id: e,
                dependencies: i,
                factory: n
            };
            if (document.attachEvent) {
                var l = t.getCurrentScript();
                l && (o = t.unParseMap(t.getScriptAbsoluteSrc(l))), o || t.log("Failed to derive URI from interactive script for:", n.toString(), "warn")
            }
            if (l = e ? r(e) : o) {
                if (l === o) {
                    var u = h[o];
                    u && u.realUri && u.status === f.SAVED && (h[o] = null)
                }
                s = a(l, s), o ? (h[o] || {}).status === f.FETCHING && (h[o] = s, s.realUri = o) : b || (b = s)
            } else y = s
        }, n._getCompilingModule = function() {
            return p[p.length - 1]
        }, n._find = function(e) {
            var i = [];
            return t.forEach(t.keys(h), function(n) {
                (t.isString(e) && -1 < n.indexOf(e) || t.isRegExp(e) && e.test(n)) && (n = h[n], n.exports && i.push(n.exports))
            }), i
        }, n._modify = function(t, i) {
            var n = r(t),
                s = h[n];
            return s && s.status === f.COMPILED ? o(i, s) : (d[n] || (d[n] = []), d[n].push(i)), e
        }, n.STATUS = f, n._resolve = t.id2Uri, n._fetch = t.fetch, n.cache = h;
        var g = {},
            m = {},
            v = {},
            y = null,
            b = null,
            _ = [],
            x = new n(t.pageUri, f.COMPILED);
        e.use = function(t, n) {
            var r = i.preload;
            return r.length ? x._use(r, function() {
                i.preload = [], x._use(t, n)
            }) : x._use(t, n), e
        }, e.define = n._define, e.cache = n.cache, e.find = n._find, e.modify = n._modify, e.pluginSDK = {
            Module: n,
            util: t,
            config: i
        }
    }(seajs, seajs._util, seajs._config),
    function(e, t, i) {
        var n = "seajs-ts=" + t.now(),
            r = document.getElementById("seajsnode");
        r || (r = document.getElementsByTagName("script"), r = r[r.length - 1]);
        var s = t.getScriptAbsoluteSrc(r) || t.pageUri,
            s = t.dirname(function(e) {
                if (-1 === e.indexOf("??")) return e;
                var i = e.split("??"),
                    e = i[0],
                    i = t.filter(i[1].split(","), function(e) {
                        return -1 !== e.indexOf("sea.js")
                    });
                return e + i[0]
            }(s));
        t.loaderDir = s;
        var a = s.match(/^(.+\/)seajs\/[\d\.]+\/$/);
        a && (s = a[1]), i.base = s, (r = r.getAttribute("data-main")) && (i.main = r), i.charset = "utf-8", e.config = function(r) {
            for (var s in r)
                if (r.hasOwnProperty(s)) {
                    var a = i[s],
                        o = r[s];
                    if (a && "alias" === s) {
                        for (var l in o)
                            if (o.hasOwnProperty(l)) {
                                var u = a[l],
                                    c = o[l];
                                /^\d+\.\d+\.\d+$/.test(c) && (c = l + "/" + c + "/" + l), u && u !== c && t.log("The alias config is conflicted:", "key =", '"' + l + '"', "previous =", '"' + u + '"', "current =", '"' + c + '"', "warn"), a[l] = c
                            }
                    } else !a || "map" !== s && "preload" !== s ? i[s] = o : (t.isString(o) && (o = [o]), t.forEach(o, function(e) {
                        e && a.push(e)
                    }))
                }
            return (r = i.base) && !t.isAbsolute(r) && (i.base = t.id2Uri((t.isRoot(r) ? "" : "./") + r + "/")), 2 === i.debug && (i.debug = 1, e.config({
                map: [
                    [/^.*$/, function(e) {
                        return -1 === e.indexOf("seajs-ts=") && (e += (-1 === e.indexOf("?") ? "?" : "&") + n), e
                    }]
                ]
            })), i.debug && (e.debug = !!i.debug), this
        }, i.debug && (e.debug = !!i.debug)
    }(seajs, seajs._util, seajs._config),
    function(e, t, i) {
        e.log = t.log, e.importStyle = t.importStyle, e.config({
            alias: {
                seajs: t.loaderDir
            }
        }), t.forEach(function() {
            var e = [],
                n = i.location.search,
                n = n.replace(/(seajs-\w+)(&|$)/g, "$1=1$2"),
                n = n + (" " + document.cookie);
            return n.replace(/seajs-(\w+)=[1-9]/g, function(t, i) {
                e.push(i)
            }), t.unique(e)
        }(), function(t) {
            e.use("seajs/plugin-" + t), "debug" === t && (e._use = e.use, e._useArgs = [], e.use = function() {
                return e._useArgs.push(arguments), e
            })
        })
    }(seajs, seajs._util, this),
    function(e, t, i) {
        var n = e._seajs;
        if (n && !n.args) i.seajs = e._seajs;
        else {
            if (i.define = e.define, t.main && e.use(t.main), t = (n || 0).args)
                for (var n = {
                        0: "config",
                        1: "use",
                        2: "define"
                    }, r = 0; r < t.length; r += 2) e[n[t[r]]].apply(e, t[r + 1]);
            i.define.cmd = {}, delete e.define, delete e._util, delete e._config, delete e._seajs
        }
    }(seajs, seajs._config, this);
var JSON;
JSON || (JSON = {}),
    function() {
        function str(e, t) {
            var i, n, r, s, a, o = gap,
                l = t[e];
            switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(e)), "function" == typeof rep && (l = rep.call(t, e, l)), typeof l) {
                case "string":
                    return quote(l);
                case "number":
                    return isFinite(l) ? String(l) : "null";
                case "boolean":
                case "null":
                    return String(l);
                case "object":
                    if (!l) return "null";
                    if (gap += indent, a = [], "[object Array]" === Object.prototype.toString.apply(l)) {
                        for (s = l.length, i = 0; s > i; i += 1) a[i] = str(i, l) || "null";
                        return r = 0 === a.length ? "[]" : gap ? "[\n" + gap + a.join(",\n" + gap) + "\n" + o + "]" : "[" + a.join(",") + "]", gap = o, r
                    }
                    if (rep && "object" == typeof rep)
                        for (s = rep.length, i = 0; s > i; i += 1) "string" == typeof rep[i] && (n = rep[i], r = str(n, l), r && a.push(quote(n) + (gap ? ": " : ":") + r));
                    else
                        for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (r = str(n, l), r && a.push(quote(n) + (gap ? ": " : ":") + r));
                    return r = 0 === a.length ? "{}" : gap ? "{\n" + gap + a.join(",\n" + gap) + "\n" + o + "}" : "{" + a.join(",") + "}", gap = o, r
            }
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                var t = meta[e];
                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function f(e) {
            return 10 > e ? "0" + e : e
        }
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        "function" != typeof JSON.stringify && (JSON.stringify = function(e, t, i) {
            var n;
            if (gap = "", indent = "", "number" == typeof i)
                for (n = 0; i > n; n += 1) indent += " ";
            else "string" == typeof i && (indent = i);
            if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
            return str("", {
                "": e
            })
        }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
            function walk(e, t) {
                var i, n, r = e[t];
                if (r && "object" == typeof r)
                    for (i in r) Object.prototype.hasOwnProperty.call(r, i) && (n = walk(r, i), void 0 !== n ? r[i] = n : delete r[i]);
                return reviver.call(e, t, r)
            }
            var j;
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(), window.Modernizr = function(e, t, i) {
        function n() {
            d.input = function(e) {
                for (var t = 0, i = e.length; i > t; t++) D[e[t]] = e[t] in y;
                return D
            }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), d.inputtypes = function(e) {
                for (var n, r, s, a = 0, o = e.length; o > a; a++) y.setAttribute("type", r = e[a]), n = "text" !== y.type, n && (y.value = b, y.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(r) && y.style.WebkitAppearance !== i ? (f.appendChild(y), s = t.defaultView, n = s.getComputedStyle && "textfield" !== s.getComputedStyle(y, null).WebkitAppearance && 0 !== y.offsetHeight, f.removeChild(y)) : /^(search|tel)$/.test(r) || (/^(url|email)$/.test(r) ? n = y.checkValidity && y.checkValidity() === !1 : /^color$/.test(r) ? (f.appendChild(y), f.offsetWidth, n = y.value != b, f.removeChild(y)) : n = y.value != b)), k[e[a]] = !!n;
                return k
            }("search tel url email datetime date month week time datetime-local number range color".split(" "))
        }

        function r(e, t) {
            var i = e.charAt(0).toUpperCase() + e.substr(1),
                n = (e + " " + x.join(i + " ") + i).split(" ");
            return s(n, t)
        }

        function s(e, t) {
            for (var n in e)
                if (v[e[n]] !== i) return "pfx" == t ? e[n] : !0;
            return !1
        }

        function a(e, t) {
            return !!~("" + e).indexOf(t)
        }

        function o(e, t) {
            return typeof e === t
        }

        function l(e) {
            v.cssText = e
        }
        var u, c, h = "2.0.6",
            d = {},
            p = !0,
            f = t.documentElement,
            g = (t.head || t.getElementsByTagName("head")[0], "modernizr"),
            m = t.createElement(g),
            v = m.style,
            y = t.createElement("input"),
            b = ":)",
            _ = (Object.prototype.toString, " -webkit- -moz- -o- -ms- -khtml- ".split(" ")),
            x = "Webkit Moz O ms Khtml".split(" "),
            w = {},
            k = {},
            D = {},
            C = [],
            T = {}.hasOwnProperty;
        c = o(T, i) || o(T.call, i) ? function(e, t) {
            return t in e && o(e.constructor.prototype[t], i)
        } : function(e, t) {
            return T.call(e, t)
        }, w.borderradius = function() {
            return r("borderRadius")
        }, w.boxshadow = function() {
            return r("boxShadow")
        }, w.cssgradients = function() {
            var e = "background-image:",
                t = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
                i = "linear-gradient(left top,#9f9, white);";
            return l((e + _.join(t + e) + _.join(i + e)).slice(0, -e.length)), a(v.backgroundImage, "gradient")
        };
        for (var E in w) c(w, E) && (u = E.toLowerCase(), d[u] = w[E](), C.push((d[u] ? "" : "no-") + u));
        return d.input || n(), l(""), m = y = null, d._version = h, d._prefixes = _, d._domPrefixes = x, d.testProp = function(e) {
            return s([e])
        }, d.testAllProps = r, f.className = f.className.replace(/\bno-js\b/, "") + (p ? " js " + C.join(" ") : ""), d
    }(this, this.document),
    function(e, t) {
        function i(e) {
            var t = ft[e] = {};
            return G.each(e.split(tt), function(e, i) {
                t[i] = !0
            }), t
        }

        function n(e, i, n) {
            if (n === t && 1 === e.nodeType) {
                var r = "data-" + i.replace(mt, "-$1").toLowerCase();
                if (n = e.getAttribute(r), "string" == typeof n) {
                    try {
                        n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : gt.test(n) ? G.parseJSON(n) : n
                    } catch (s) {}
                    G.data(e, i, n)
                } else n = t
            }
            return n
        }

        function r(e) {
            var t;
            for (t in e)
                if (("data" !== t || !G.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
            return !0
        }

        function s() {
            return !1
        }

        function a() {
            return !0
        }

        function o(e) {
            return !e || !e.parentNode || 11 === e.parentNode.nodeType
        }

        function l(e, t) {
            do e = e[t]; while (e && 1 !== e.nodeType);
            return e
        }

        function u(e, t, i) {
            if (t = t || 0, G.isFunction(t)) return G.grep(e, function(e, n) {
                var r = !!t.call(e, n, e);
                return r === i
            });
            if (t.nodeType) return G.grep(e, function(e) {
                return e === t === i
            });
            if ("string" == typeof t) {
                var n = G.grep(e, function(e) {
                    return 1 === e.nodeType
                });
                if (zt.test(t)) return G.filter(t, n, !i);
                t = G.filter(t, n)
            }
            return G.grep(e, function(e) {
                return G.inArray(e, t) >= 0 === i
            })
        }

        function c(e) {
            var t = Rt.split("|"),
                i = e.createDocumentFragment();
            if (i.createElement)
                for (; t.length;) i.createElement(t.pop());
            return i
        }

        function h(e, t) {
            return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
        }

        function d(e, t) {
            if (1 === t.nodeType && G.hasData(e)) {
                var i, n, r, s = G._data(e),
                    a = G._data(t, s),
                    o = s.events;
                if (o) {
                    delete a.handle, a.events = {};
                    for (i in o)
                        for (n = 0, r = o[i].length; r > n; n++) G.event.add(t, i, o[i][n])
                }
                a.data && (a.data = G.extend({}, a.data))
            }
        }

        function p(e, t) {
            var i;
            1 === t.nodeType && (t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), i = t.nodeName.toLowerCase(), "object" === i ? (t.parentNode && (t.outerHTML = e.outerHTML), G.support.html5Clone && e.innerHTML && !G.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === i && Vt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === i ? t.selected = e.defaultSelected : "input" === i || "textarea" === i ? t.defaultValue = e.defaultValue : "script" === i && t.text !== e.text && (t.text = e.text), t.removeAttribute(G.expando))
        }

        function f(e) {
            return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName("*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll("*") : []
        }

        function g(e) {
            Vt.test(e.type) && (e.defaultChecked = e.checked)
        }

        function m(e, t) {
            if (t in e) return t;
            for (var i = t.charAt(0).toUpperCase() + t.slice(1), n = t, r = vi.length; r--;)
                if (t = vi[r] + i, t in e) return t;
            return n
        }

        function v(e, t) {
            return e = t || e, "none" === G.css(e, "display") || !G.contains(e.ownerDocument, e)
        }

        function y(e, t) {
            for (var i, n, r = [], s = 0, a = e.length; a > s; s++) i = e[s], i.style && (r[s] = G._data(i, "olddisplay"), t ? (r[s] || "none" !== i.style.display || (i.style.display = ""), "" === i.style.display && v(i) && (r[s] = G._data(i, "olddisplay", w(i.nodeName)))) : (n = ii(i, "display"), r[s] || "none" === n || G._data(i, "olddisplay", n)));
            for (s = 0; a > s; s++) i = e[s], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[s] || "" : "none"));
            return e
        }

        function b(e, t, i) {
            var n = ci.exec(t);
            return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : t
        }

        function _(e, t, i, n) {
            for (var r = i === (n ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > r; r += 2) "margin" === i && (s += G.css(e, i + mi[r], !0)), n ? ("content" === i && (s -= parseFloat(ii(e, "padding" + mi[r])) || 0), "margin" !== i && (s -= parseFloat(ii(e, "border" + mi[r] + "Width")) || 0)) : (s += parseFloat(ii(e, "padding" + mi[r])) || 0, "padding" !== i && (s += parseFloat(ii(e, "border" + mi[r] + "Width")) || 0));
            return s
        }

        function x(e, t, i) {
            var n = "width" === t ? e.offsetWidth : e.offsetHeight,
                r = !0,
                s = G.support.boxSizing && "border-box" === G.css(e, "boxSizing");
            if (0 >= n || null == n) {
                if (n = ii(e, t), (0 > n || null == n) && (n = e.style[t]), hi.test(n)) return n;
                r = s && (G.support.boxSizingReliable || n === e.style[t]), n = parseFloat(n) || 0
            }
            return n + _(e, t, i || (s ? "border" : "content"), r) + "px"
        }

        function w(e) {
            if (pi[e]) return pi[e];
            var t = G("<" + e + ">").appendTo(L.body),
                i = t.css("display");
            return t.remove(), ("none" === i || "" === i) && (ni = L.body.appendChild(ni || G.extend(L.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            })), ri && ni.createElement || (ri = (ni.contentWindow || ni.contentDocument).document, ri.write("<!doctype html><html><body>"), ri.close()), t = ri.body.appendChild(ri.createElement(e)), i = ii(t, "display"), L.body.removeChild(ni)), pi[e] = i, i
        }

        function k(e, t, i, n) {
            var r;
            if (G.isArray(t)) G.each(t, function(t, r) {
                i || _i.test(e) ? n(e, r) : k(e + "[" + ("object" == typeof r ? t : "") + "]", r, i, n)
            });
            else if (i || "object" !== G.type(t)) n(e, t);
            else
                for (r in t) k(e + "[" + r + "]", t[r], i, n)
        }

        function D(e) {
            return function(t, i) {
                "string" != typeof t && (i = t, t = "*");
                var n, r, s, a = t.toLowerCase().split(tt),
                    o = 0,
                    l = a.length;
                if (G.isFunction(i))
                    for (; l > o; o++) n = a[o], s = /^\+/.test(n), s && (n = n.substr(1) || "*"), r = e[n] = e[n] || [], r[s ? "unshift" : "push"](i)
            }
        }

        function C(e, i, n, r, s, a) {
            s = s || i.dataTypes[0], a = a || {}, a[s] = !0;
            for (var o, l = e[s], u = 0, c = l ? l.length : 0, h = e === zi; c > u && (h || !o); u++) o = l[u](i, n, r), "string" == typeof o && (!h || a[o] ? o = t : (i.dataTypes.unshift(o), o = C(e, i, n, r, o, a)));
            return !h && o || a["*"] || (o = C(e, i, n, r, "*", a)), o
        }

        function T(e, i) {
            var n, r, s = G.ajaxSettings.flatOptions || {};
            for (n in i) i[n] !== t && ((s[n] ? e : r || (r = {}))[n] = i[n]);
            r && G.extend(!0, e, r)
        }

        function E(e, i, n) {
            var r, s, a, o, l = e.contents,
                u = e.dataTypes,
                c = e.responseFields;
            for (s in c) s in n && (i[c[s]] = n[s]);
            for (;
                "*" === u[0];) u.shift(), r === t && (r = e.mimeType || i.getResponseHeader("content-type"));
            if (r)
                for (s in l)
                    if (l[s] && l[s].test(r)) {
                        u.unshift(s);
                        break
                    }
            if (u[0] in n) a = u[0];
            else {
                for (s in n) {
                    if (!u[0] || e.converters[s + " " + u[0]]) {
                        a = s;
                        break
                    }
                    o || (o = s)
                }
                a = a || o
            }
            return a ? (a !== u[0] && u.unshift(a), n[a]) : void 0
        }

        function S(e, t) {
            var i, n, r, s, a = e.dataTypes.slice(),
                o = a[0],
                l = {},
                u = 0;
            if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), a[1])
                for (i in e.converters) l[i.toLowerCase()] = e.converters[i];
            for (; r = a[++u];)
                if ("*" !== r) {
                    if ("*" !== o && o !== r) {
                        if (i = l[o + " " + r] || l["* " + r], !i)
                            for (n in l)
                                if (s = n.split(" "), s[1] === r && (i = l[o + " " + s[0]] || l["* " + s[0]])) {
                                    i === !0 ? i = l[n] : l[n] !== !0 && (r = s[0], a.splice(u--, 0, r));
                                    break
                                }
                        if (i !== !0)
                            if (i && e["throws"]) t = i(t);
                            else try {
                                t = i(t)
                            } catch (c) {
                                return {
                                    state: "parsererror",
                                    error: i ? c : "No conversion from " + o + " to " + r
                                }
                            }
                    }
                    o = r
                }
            return {
                state: "success",
                data: t
            }
        }

        function N() {
            try {
                return new e.XMLHttpRequest
            } catch (t) {}
        }

        function M() {
            try {
                return new e.ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {}
        }

        function A() {
            return setTimeout(function() {
                Ki = t
            }, 0), Ki = G.now()
        }

        function I(e, t) {
            G.each(t, function(t, i) {
                for (var n = (Zi[t] || []).concat(Zi["*"]), r = 0, s = n.length; s > r; r++)
                    if (n[r].call(e, t, i)) return
            })
        }

        function j(e, t, i) {
            var n, r = 0,
                s = Gi.length,
                a = G.Deferred().always(function() {
                    delete o.elem
                }),
                o = function() {
                    for (var t = Ki || A(), i = Math.max(0, l.startTime + l.duration - t), n = i / l.duration || 0, r = 1 - n, s = 0, o = l.tweens.length; o > s; s++) l.tweens[s].run(r);
                    return a.notifyWith(e, [l, r, i]), 1 > r && o ? i : (a.resolveWith(e, [l]), !1)
                },
                l = a.promise({
                    elem: e,
                    props: G.extend({}, t),
                    opts: G.extend(!0, {
                        specialEasing: {}
                    }, i),
                    originalProperties: t,
                    originalOptions: i,
                    startTime: Ki || A(),
                    duration: i.duration,
                    tweens: [],
                    createTween: function(t, i) {
                        var n = G.Tween(e, l.opts, t, i, l.opts.specialEasing[t] || l.opts.easing);
                        return l.tweens.push(n), n
                    },
                    stop: function(t) {
                        for (var i = 0, n = t ? l.tweens.length : 0; n > i; i++) l.tweens[i].run(1);
                        return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]), this
                    }
                }),
                u = l.props;
            for (P(u, l.opts.specialEasing); s > r; r++)
                if (n = Gi[r].call(l, e, u, l.opts)) return n;
            return I(l, u), G.isFunction(l.opts.start) && l.opts.start.call(e, l), G.fx.timer(G.extend(o, {
                anim: l,
                queue: l.opts.queue,
                elem: e
            })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
        }

        function P(e, t) {
            var i, n, r, s, a;
            for (i in e)
                if (n = G.camelCase(i), r = t[n], s = e[i], G.isArray(s) && (r = s[1], s = e[i] = s[0]), i !== n && (e[n] = s, delete e[i]), a = G.cssHooks[n], a && "expand" in a) {
                    s = a.expand(s), delete e[n];
                    for (i in s) i in e || (e[i] = s[i], t[i] = r)
                } else t[n] = r
        }

        function O(e, t, i) {
            var n, r, s, a, o, l, u, c, h, d = this,
                p = e.style,
                f = {},
                g = [],
                m = e.nodeType && v(e);
            i.queue || (c = G._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, h = c.empty.fire, c.empty.fire = function() {
                c.unqueued || h()
            }), c.unqueued++, d.always(function() {
                d.always(function() {
                    c.unqueued--, G.queue(e, "fx").length || c.empty.fire()
                })
            })), 1 === e.nodeType && ("height" in t || "width" in t) && (i.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === G.css(e, "display") && "none" === G.css(e, "float") && (G.support.inlineBlockNeedsLayout && "inline" !== w(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), i.overflow && (p.overflow = "hidden", G.support.shrinkWrapBlocks || d.done(function() {
                p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2]
            }));
            for (n in t)
                if (s = t[n], Vi.exec(s)) {
                    if (delete t[n], l = l || "toggle" === s, s === (m ? "hide" : "show")) continue;
                    g.push(n)
                }
            if (a = g.length) {
                o = G._data(e, "fxshow") || G._data(e, "fxshow", {}), "hidden" in o && (m = o.hidden), l && (o.hidden = !m), m ? G(e).show() : d.done(function() {
                    G(e).hide()
                }), d.done(function() {
                    var t;
                    G.removeData(e, "fxshow", !0);
                    for (t in f) G.style(e, t, f[t])
                });
                for (n = 0; a > n; n++) r = g[n], u = d.createTween(r, m ? o[r] : 0), f[r] = o[r] || G.style(e, r), r in o || (o[r] = u.start, m && (u.end = u.start, u.start = "width" === r || "height" === r ? 1 : 0))
            }
        }

        function z(e, t, i, n, r) {
            return new z.prototype.init(e, t, i, n, r)
        }

        function $(e, t) {
            var i, n = {
                    height: e
                },
                r = 0;
            for (t = t ? 1 : 0; 4 > r; r += 2 - t) i = mi[r], n["margin" + i] = n["padding" + i] = e;
            return t && (n.opacity = n.width = e), n
        }

        function H(e) {
            return G.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
        }
        var R, F, L = e.document,
            W = e.location,
            B = e.navigator,
            q = e.jQuery,
            Y = e.$,
            U = Array.prototype.push,
            K = Array.prototype.slice,
            X = Array.prototype.indexOf,
            V = Object.prototype.toString,
            J = Object.prototype.hasOwnProperty,
            Q = String.prototype.trim,
            G = function(e, t) {
                return new G.fn.init(e, t, R)
            },
            Z = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
            et = /\S/,
            tt = /\s+/,
            it = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            nt = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
            rt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            st = /^[\],:{}\s]*$/,
            at = /(?:^|:|,)(?:\s*\[)+/g,
            ot = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            lt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
            ut = /^-ms-/,
            ct = /-([\da-z])/gi,
            ht = function(e, t) {
                return (t + "").toUpperCase()
            },
            dt = function() {
                L.addEventListener ? (L.removeEventListener("DOMContentLoaded", dt, !1), G.ready()) : "complete" === L.readyState && (L.detachEvent("onreadystatechange", dt), G.ready())
            },
            pt = {};
        G.fn = G.prototype = {
            constructor: G,
            init: function(e, i, n) {
                var r, s, a;
                if (!e) return this;
                if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;
                if ("string" == typeof e) {
                    if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : nt.exec(e), !r || !r[1] && i) return !i || i.jquery ? (i || n).find(e) : this.constructor(i).find(e);
                    if (r[1]) return i = i instanceof G ? i[0] : i, a = i && i.nodeType ? i.ownerDocument || i : L, e = G.parseHTML(r[1], a, !0), rt.test(r[1]) && G.isPlainObject(i) && this.attr.call(e, i, !0), G.merge(this, e);
                    if (s = L.getElementById(r[2]), s && s.parentNode) {
                        if (s.id !== r[2]) return n.find(e);
                        this.length = 1, this[0] = s
                    }
                    return this.context = L, this.selector = e, this
                }
                return G.isFunction(e) ? n.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), G.makeArray(e, this))
            },
            selector: "",
            jquery: "1.8.3",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return K.call(this)
            },
            get: function(e) {
                return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
            },
            pushStack: function(e, t, i) {
                var n = G.merge(this.constructor(), e);
                return n.prevObject = this, n.context = this.context, "find" === t ? n.selector = this.selector + (this.selector ? " " : "") + i : t && (n.selector = this.selector + "." + t + "(" + i + ")"), n
            },
            each: function(e, t) {
                return G.each(this, e, t)
            },
            ready: function(e) {
                return G.ready.promise().done(e), this
            },
            eq: function(e) {
                return e = +e, -1 === e ? this.slice(e) : this.slice(e, e + 1)
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            slice: function() {
                return this.pushStack(K.apply(this, arguments), "slice", K.call(arguments).join(","))
            },
            map: function(e) {
                return this.pushStack(G.map(this, function(t, i) {
                    return e.call(t, i, t)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: U,
            sort: [].sort,
            splice: [].splice
        }, G.fn.init.prototype = G.fn, G.extend = G.fn.extend = function() {
            var e, i, n, r, s, a, o = arguments[0] || {},
                l = 1,
                u = arguments.length,
                c = !1;
            for ("boolean" == typeof o && (c = o, o = arguments[1] || {}, l = 2), "object" == typeof o || G.isFunction(o) || (o = {}), u === l && (o = this, --l); u > l; l++)
                if (null != (e = arguments[l]))
                    for (i in e) n = o[i], r = e[i], o !== r && (c && r && (G.isPlainObject(r) || (s = G.isArray(r))) ? (s ? (s = !1, a = n && G.isArray(n) ? n : []) : a = n && G.isPlainObject(n) ? n : {}, o[i] = G.extend(c, a, r)) : r !== t && (o[i] = r));
            return o
        }, G.extend({
            noConflict: function(t) {
                return e.$ === G && (e.$ = Y), t && e.jQuery === G && (e.jQuery = q), G
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? G.readyWait++ : G.ready(!0)
            },
            ready: function(e) {
                if (e === !0 ? !--G.readyWait : !G.isReady) {
                    if (!L.body) return setTimeout(G.ready, 1);
                    G.isReady = !0, e !== !0 && --G.readyWait > 0 || (F.resolveWith(L, [G]), G.fn.trigger && G(L).trigger("ready").off("ready"))
                }
            },
            isFunction: function(e) {
                return "function" === G.type(e)
            },
            isArray: Array.isArray || function(e) {
                return "array" === G.type(e)
            },
            isWindow: function(e) {
                return null != e && e == e.window
            },
            isNumeric: function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            type: function(e) {
                return null == e ? String(e) : pt[V.call(e)] || "object"
            },
            isPlainObject: function(e) {
                if (!e || "object" !== G.type(e) || e.nodeType || G.isWindow(e)) return !1;
                try {
                    if (e.constructor && !J.call(e, "constructor") && !J.call(e.constructor.prototype, "isPrototypeOf")) return !1
                } catch (i) {
                    return !1
                }
                var n;
                for (n in e);
                return n === t || J.call(e, n)
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            error: function(e) {
                throw new Error(e)
            },
            parseHTML: function(e, t, i) {
                var n;
                return e && "string" == typeof e ? ("boolean" == typeof t && (i = t, t = 0), t = t || L, (n = rt.exec(e)) ? [t.createElement(n[1])] : (n = G.buildFragment([e], t, i ? null : []), G.merge([], (n.cacheable ? G.clone(n.fragment) : n.fragment).childNodes))) : null
            },
            parseJSON: function(t) {
                return t && "string" == typeof t ? (t = G.trim(t), e.JSON && e.JSON.parse ? e.JSON.parse(t) : st.test(t.replace(ot, "@").replace(lt, "]").replace(at, "")) ? new Function("return " + t)() : void G.error("Invalid JSON: " + t)) : null
            },
            parseXML: function(i) {
                var n, r;
                if (!i || "string" != typeof i) return null;
                try {
                    e.DOMParser ? (r = new DOMParser, n = r.parseFromString(i, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(i))
                } catch (s) {
                    n = t
                }
                return n && n.documentElement && !n.getElementsByTagName("parsererror").length || G.error("Invalid XML: " + i), n
            },
            noop: function() {},
            globalEval: function(t) {
                t && et.test(t) && (e.execScript || function(t) {
                    e.eval.call(e, t)
                })(t)
            },
            camelCase: function(e) {
                return e.replace(ut, "ms-").replace(ct, ht)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, i, n) {
                var r, s = 0,
                    a = e.length,
                    o = a === t || G.isFunction(e);
                if (n)
                    if (o) {
                        for (r in e)
                            if (i.apply(e[r], n) === !1) break
                    } else
                        for (; a > s && i.apply(e[s++], n) !== !1;);
                else if (o) {
                    for (r in e)
                        if (i.call(e[r], r, e[r]) === !1) break
                } else
                    for (; a > s && i.call(e[s], s, e[s++]) !== !1;);
                return e
            },
            trim: Q && !Q.call("﻿ ") ? function(e) {
                return null == e ? "" : Q.call(e)
            } : function(e) {
                return null == e ? "" : (e + "").replace(it, "")
            },
            makeArray: function(e, t) {
                var i, n = t || [];
                return null != e && (i = G.type(e), null == e.length || "string" === i || "function" === i || "regexp" === i || G.isWindow(e) ? U.call(n, e) : G.merge(n, e)), n
            },
            inArray: function(e, t, i) {
                var n;
                if (t) {
                    if (X) return X.call(t, e, i);
                    for (n = t.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; n > i; i++)
                        if (i in t && t[i] === e) return i
                }
                return -1
            },
            merge: function(e, i) {
                var n = i.length,
                    r = e.length,
                    s = 0;
                if ("number" == typeof n)
                    for (; n > s; s++) e[r++] = i[s];
                else
                    for (; i[s] !== t;) e[r++] = i[s++];
                return e.length = r, e
            },
            grep: function(e, t, i) {
                var n, r = [],
                    s = 0,
                    a = e.length;
                for (i = !!i; a > s; s++) n = !!t(e[s], s), i !== n && r.push(e[s]);
                return r
            },
            map: function(e, i, n) {
                var r, s, a = [],
                    o = 0,
                    l = e.length,
                    u = e instanceof G || l !== t && "number" == typeof l && (l > 0 && e[0] && e[l - 1] || 0 === l || G.isArray(e));
                if (u)
                    for (; l > o; o++) r = i(e[o], o, n), null != r && (a[a.length] = r);
                else
                    for (s in e) r = i(e[s], s, n), null != r && (a[a.length] = r);
                return a.concat.apply([], a)
            },
            guid: 1,
            proxy: function(e, i) {
                var n, r, s;
                return "string" == typeof i && (n = e[i], i = e, e = n), G.isFunction(e) ? (r = K.call(arguments, 2), s = function() {
                    return e.apply(i, r.concat(K.call(arguments)))
                }, s.guid = e.guid = e.guid || G.guid++, s) : t
            },
            access: function(e, i, n, r, s, a, o) {
                var l, u = null == n,
                    c = 0,
                    h = e.length;
                if (n && "object" == typeof n) {
                    for (c in n) G.access(e, i, c, n[c], 1, a, r);
                    s = 1
                } else if (r !== t) {
                    if (l = o === t && G.isFunction(r), u && (l ? (l = i, i = function(e, t, i) {
                            return l.call(G(e), i)
                        }) : (i.call(e, r), i = null)), i)
                        for (; h > c; c++) i(e[c], n, l ? r.call(e[c], c, i(e[c], n)) : r, o);
                    s = 1
                }
                return s ? e : u ? i.call(e) : h ? i(e[0], n) : a
            },
            now: function() {
                return (new Date).getTime()
            }
        }), G.ready.promise = function(t) {
            if (!F)
                if (F = G.Deferred(), "complete" === L.readyState) setTimeout(G.ready, 1);
                else if (L.addEventListener) L.addEventListener("DOMContentLoaded", dt, !1), e.addEventListener("load", G.ready, !1);
            else {
                L.attachEvent("onreadystatechange", dt), e.attachEvent("onload", G.ready);
                var i = !1;
                try {
                    i = null == e.frameElement && L.documentElement
                } catch (n) {}
                i && i.doScroll && ! function r() {
                    if (!G.isReady) {
                        try {
                            i.doScroll("left")
                        } catch (e) {
                            return setTimeout(r, 50)
                        }
                        G.ready()
                    }
                }()
            }
            return F.promise(t)
        }, G.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
            pt["[object " + t + "]"] = t.toLowerCase()
        }), R = G(L);
        var ft = {};
        G.Callbacks = function(e) {
            e = "string" == typeof e ? ft[e] || i(e) : G.extend({}, e);
            var n, r, s, a, o, l, u = [],
                c = !e.once && [],
                h = function(t) {
                    for (n = e.memory && t, r = !0, l = a || 0, a = 0, o = u.length, s = !0; u && o > l; l++)
                        if (u[l].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                            n = !1;
                            break
                        }
                    s = !1, u && (c ? c.length && h(c.shift()) : n ? u = [] : d.disable())
                },
                d = {
                    add: function() {
                        if (u) {
                            var t = u.length;
                            ! function i(t) {
                                G.each(t, function(t, n) {
                                    var r = G.type(n);
                                    "function" === r ? e.unique && d.has(n) || u.push(n) : n && n.length && "string" !== r && i(n)
                                })
                            }(arguments), s ? o = u.length : n && (a = t, h(n))
                        }
                        return this
                    },
                    remove: function() {
                        return u && G.each(arguments, function(e, t) {
                            for (var i;
                                (i = G.inArray(t, u, i)) > -1;) u.splice(i, 1), s && (o >= i && o--, l >= i && l--)
                        }), this
                    },
                    has: function(e) {
                        return G.inArray(e, u) > -1
                    },
                    empty: function() {
                        return u = [], this
                    },
                    disable: function() {
                        return u = c = n = t, this
                    },
                    disabled: function() {
                        return !u
                    },
                    lock: function() {
                        return c = t, n || d.disable(), this
                    },
                    locked: function() {
                        return !c
                    },
                    fireWith: function(e, t) {
                        return t = t || [], t = [e, t.slice ? t.slice() : t], !u || r && !c || (s ? c.push(t) : h(t)), this
                    },
                    fire: function() {
                        return d.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!r
                    }
                };
            return d
        }, G.extend({
            Deferred: function(e) {
                var t = [
                        ["resolve", "done", G.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", G.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", G.Callbacks("memory")]
                    ],
                    i = "pending",
                    n = {
                        state: function() {
                            return i
                        },
                        always: function() {
                            return r.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var e = arguments;
                            return G.Deferred(function(i) {
                                G.each(t, function(t, n) {
                                    var s = n[0],
                                        a = e[t];
                                    r[n[1]](G.isFunction(a) ? function() {
                                        var e = a.apply(this, arguments);
                                        e && G.isFunction(e.promise) ? e.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[s + "With"](this === r ? i : this, [e])
                                    } : i[s])
                                }), e = null
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? G.extend(e, n) : n
                        }
                    },
                    r = {};
                return n.pipe = n.then, G.each(t, function(e, s) {
                    var a = s[2],
                        o = s[3];
                    n[s[1]] = a.add, o && a.add(function() {
                        i = o
                    }, t[1 ^ e][2].disable, t[2][2].lock), r[s[0]] = a.fire, r[s[0] + "With"] = a.fireWith
                }), n.promise(r), e && e.call(r, r), r
            },
            when: function(e) {
                var t, i, n, r = 0,
                    s = K.call(arguments),
                    a = s.length,
                    o = 1 !== a || e && G.isFunction(e.promise) ? a : 0,
                    l = 1 === o ? e : G.Deferred(),
                    u = function(e, i, n) {
                        return function(r) {
                            i[e] = this, n[e] = arguments.length > 1 ? K.call(arguments) : r, n === t ? l.notifyWith(i, n) : --o || l.resolveWith(i, n)
                        }
                    };
                if (a > 1)
                    for (t = new Array(a), i = new Array(a), n = new Array(a); a > r; r++) s[r] && G.isFunction(s[r].promise) ? s[r].promise().done(u(r, n, s)).fail(l.reject).progress(u(r, i, t)) : --o;
                return o || l.resolveWith(n, s), l.promise()
            }
        }), G.support = function() {
            var t, i, n, r, s, a, o, l, u, c, h, d = L.createElement("div");
            if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = d.getElementsByTagName("*"), n = d.getElementsByTagName("a")[0], !i || !n || !i.length) return {};
            r = L.createElement("select"), s = r.appendChild(L.createElement("option")), a = d.getElementsByTagName("input")[0], n.style.cssText = "top:1px;float:left;opacity:.5", t = {
                leadingWhitespace: 3 === d.firstChild.nodeType,
                tbody: !d.getElementsByTagName("tbody").length,
                htmlSerialize: !!d.getElementsByTagName("link").length,
                style: /top/.test(n.getAttribute("style")),
                hrefNormalized: "/a" === n.getAttribute("href"),
                opacity: /^0.5/.test(n.style.opacity),
                cssFloat: !!n.style.cssFloat,
                checkOn: "on" === a.value,
                optSelected: s.selected,
                getSetAttribute: "t" !== d.className,
                enctype: !!L.createElement("form").enctype,
                html5Clone: "<:nav></:nav>" !== L.createElement("nav").cloneNode(!0).outerHTML,
                boxModel: "CSS1Compat" === L.compatMode,
                submitBubbles: !0,
                changeBubbles: !0,
                focusinBubbles: !1,
                deleteExpando: !0,
                noCloneEvent: !0,
                inlineBlockNeedsLayout: !1,
                shrinkWrapBlocks: !1,
                reliableMarginRight: !0,
                boxSizingReliable: !0,
                pixelPosition: !1
            }, a.checked = !0, t.noCloneChecked = a.cloneNode(!0).checked, r.disabled = !0, t.optDisabled = !s.disabled;
            try {
                delete d.test
            } catch (p) {
                t.deleteExpando = !1
            }
            if (!d.addEventListener && d.attachEvent && d.fireEvent && (d.attachEvent("onclick", h = function() {
                    t.noCloneEvent = !1
                }), d.cloneNode(!0).fireEvent("onclick"), d.detachEvent("onclick", h)), a = L.createElement("input"), a.value = "t", a.setAttribute("type", "radio"), t.radioValue = "t" === a.value, a.setAttribute("checked", "checked"), a.setAttribute("name", "t"), d.appendChild(a), o = L.createDocumentFragment(), o.appendChild(d.lastChild), t.checkClone = o.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = a.checked, o.removeChild(a), o.appendChild(d), d.attachEvent)
                for (u in {
                        submit: !0,
                        change: !0,
                        focusin: !0
                    }) l = "on" + u, c = l in d, c || (d.setAttribute(l, "return;"), c = "function" == typeof d[l]), t[u + "Bubbles"] = c;
            return G(function() {
                var i, n, r, s, a = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                    o = L.getElementsByTagName("body")[0];
                o && (i = L.createElement("div"), i.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", o.insertBefore(i, o.firstChild), n = L.createElement("div"), i.appendChild(n), n.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = n.getElementsByTagName("td"), r[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === r[0].offsetHeight, r[0].style.display = "", r[1].style.display = "none", t.reliableHiddenOffsets = c && 0 === r[0].offsetHeight, n.innerHTML = "", n.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === n.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== o.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(n, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(n, null) || {
                    width: "4px"
                }).width, s = L.createElement("div"), s.style.cssText = n.style.cssText = a, s.style.marginRight = s.style.width = "0", n.style.width = "1px", n.appendChild(s), t.reliableMarginRight = !parseFloat((e.getComputedStyle(s, null) || {}).marginRight)), "undefined" != typeof n.style.zoom && (n.innerHTML = "", n.style.cssText = a + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === n.offsetWidth, n.style.display = "block", n.style.overflow = "visible", n.innerHTML = "<div></div>", n.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== n.offsetWidth, i.style.zoom = 1), o.removeChild(i), i = n = r = s = null)
            }), o.removeChild(d), i = n = r = s = a = o = d = null, t
        }();
        var gt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            mt = /([A-Z])/g;
        G.extend({
            cache: {},
            deletedIds: [],
            uuid: 0,
            expando: "jQuery" + (G.fn.jquery + Math.random()).replace(/\D/g, ""),
            noData: {
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                applet: !0
            },
            hasData: function(e) {
                return e = e.nodeType ? G.cache[e[G.expando]] : e[G.expando], !!e && !r(e)
            },
            data: function(e, i, n, r) {
                if (G.acceptData(e)) {
                    var s, a, o = G.expando,
                        l = "string" == typeof i,
                        u = e.nodeType,
                        c = u ? G.cache : e,
                        h = u ? e[o] : e[o] && o;
                    if (h && c[h] && (r || c[h].data) || !l || n !== t) return h || (u ? e[o] = h = G.deletedIds.pop() || G.guid++ : h = o), c[h] || (c[h] = {}, u || (c[h].toJSON = G.noop)), ("object" == typeof i || "function" == typeof i) && (r ? c[h] = G.extend(c[h], i) : c[h].data = G.extend(c[h].data, i)), s = c[h], r || (s.data || (s.data = {}), s = s.data), n !== t && (s[G.camelCase(i)] = n), l ? (a = s[i], null == a && (a = s[G.camelCase(i)])) : a = s, a
                }
            },
            removeData: function(e, t, i) {
                if (G.acceptData(e)) {
                    var n, s, a, o = e.nodeType,
                        l = o ? G.cache : e,
                        u = o ? e[G.expando] : G.expando;
                    if (l[u]) {
                        if (t && (n = i ? l[u] : l[u].data)) {
                            G.isArray(t) || (t in n ? t = [t] : (t = G.camelCase(t), t = t in n ? [t] : t.split(" ")));
                            for (s = 0, a = t.length; a > s; s++) delete n[t[s]];
                            if (!(i ? r : G.isEmptyObject)(n)) return
                        }(i || (delete l[u].data, r(l[u]))) && (o ? G.cleanData([e], !0) : G.support.deleteExpando || l != l.window ? delete l[u] : l[u] = null)
                    }
                }
            },
            _data: function(e, t, i) {
                return G.data(e, t, i, !0)
            },
            acceptData: function(e) {
                var t = e.nodeName && G.noData[e.nodeName.toLowerCase()];
                return !t || t !== !0 && e.getAttribute("classid") === t
            }
        }), G.fn.extend({
            data: function(e, i) {
                var r, s, a, o, l, u = this[0],
                    c = 0,
                    h = null;
                if (e === t) {
                    if (this.length && (h = G.data(u), 1 === u.nodeType && !G._data(u, "parsedAttrs"))) {
                        for (a = u.attributes, l = a.length; l > c; c++) o = a[c].name, o.indexOf("data-") || (o = G.camelCase(o.substring(5)), n(u, o, h[o]));
                        G._data(u, "parsedAttrs", !0)
                    }
                    return h
                }
                return "object" == typeof e ? this.each(function() {
                    G.data(this, e)
                }) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", s = r[1] + "!", G.access(this, function(i) {
                    return i === t ? (h = this.triggerHandler("getData" + s, [r[0]]), h === t && u && (h = G.data(u, e), h = n(u, e, h)), h === t && r[1] ? this.data(r[0]) : h) : (r[1] = i, void this.each(function() {
                        var t = G(this);
                        t.triggerHandler("setData" + s, r), G.data(this, e, i), t.triggerHandler("changeData" + s, r)
                    }))
                }, null, i, arguments.length > 1, null, !1))
            },
            removeData: function(e) {
                return this.each(function() {
                    G.removeData(this, e)
                })
            }
        }), G.extend({
            queue: function(e, t, i) {
                var n;
                return e ? (t = (t || "fx") + "queue", n = G._data(e, t), i && (!n || G.isArray(i) ? n = G._data(e, t, G.makeArray(i)) : n.push(i)), n || []) : void 0
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var i = G.queue(e, t),
                    n = i.length,
                    r = i.shift(),
                    s = G._queueHooks(e, t),
                    a = function() {
                        G.dequeue(e, t)
                    };
                "inprogress" === r && (r = i.shift(), n--), r && ("fx" === t && i.unshift("inprogress"), delete s.stop, r.call(e, a, s)), !n && s && s.empty.fire()
            },
            _queueHooks: function(e, t) {
                var i = t + "queueHooks";
                return G._data(e, i) || G._data(e, i, {
                    empty: G.Callbacks("once memory").add(function() {
                        G.removeData(e, t + "queue", !0), G.removeData(e, i, !0)
                    })
                })
            }
        }), G.fn.extend({
            queue: function(e, i) {
                var n = 2;
                return "string" != typeof e && (i = e, e = "fx", n--), arguments.length < n ? G.queue(this[0], e) : i === t ? this : this.each(function() {
                    var t = G.queue(this, e, i);
                    G._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && G.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    G.dequeue(this, e)
                })
            },
            delay: function(e, t) {
                return e = G.fx ? G.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, i) {
                    var n = setTimeout(t, e);
                    i.stop = function() {
                        clearTimeout(n)
                    }
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, i) {
                var n, r = 1,
                    s = G.Deferred(),
                    a = this,
                    o = this.length,
                    l = function() {
                        --r || s.resolveWith(a, [a])
                    };
                for ("string" != typeof e && (i = e, e = t), e = e || "fx"; o--;) n = G._data(a[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(l));
                return l(), s.promise(i)
            }
        });
        var vt, yt, bt, _t = /[\t\r\n]/g,
            xt = /\r/g,
            wt = /^(?:button|input)$/i,
            kt = /^(?:button|input|object|select|textarea)$/i,
            Dt = /^a(?:rea|)$/i,
            Ct = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            Tt = G.support.getSetAttribute;
        G.fn.extend({
            attr: function(e, t) {
                return G.access(this, G.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    G.removeAttr(this, e)
                })
            },
            prop: function(e, t) {
                return G.access(this, G.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return e = G.propFix[e] || e, this.each(function() {
                    try {
                        this[e] = t, delete this[e]
                    } catch (i) {}
                })
            },
            addClass: function(e) {
                var t, i, n, r, s, a, o;
                if (G.isFunction(e)) return this.each(function(t) {
                    G(this).addClass(e.call(this, t, this.className))
                });
                if (e && "string" == typeof e)
                    for (t = e.split(tt), i = 0, n = this.length; n > i; i++)
                        if (r = this[i], 1 === r.nodeType)
                            if (r.className || 1 !== t.length) {
                                for (s = " " + r.className + " ", a = 0, o = t.length; o > a; a++) s.indexOf(" " + t[a] + " ") < 0 && (s += t[a] + " ");
                                r.className = G.trim(s)
                            } else r.className = e;
                return this
            },
            removeClass: function(e) {
                var i, n, r, s, a, o, l;
                if (G.isFunction(e)) return this.each(function(t) {
                    G(this).removeClass(e.call(this, t, this.className))
                });
                if (e && "string" == typeof e || e === t)
                    for (i = (e || "").split(tt), o = 0, l = this.length; l > o; o++)
                        if (r = this[o], 1 === r.nodeType && r.className) {
                            for (n = (" " + r.className + " ").replace(_t, " "), s = 0, a = i.length; a > s; s++)
                                for (; n.indexOf(" " + i[s] + " ") >= 0;) n = n.replace(" " + i[s] + " ", " ");
                            r.className = e ? G.trim(n) : ""
                        }
                return this
            },
            toggleClass: function(e, t) {
                var i = typeof e,
                    n = "boolean" == typeof t;
                return this.each(G.isFunction(e) ? function(i) {
                    G(this).toggleClass(e.call(this, i, this.className, t), t)
                } : function() {
                    if ("string" === i)
                        for (var r, s = 0, a = G(this), o = t, l = e.split(tt); r = l[s++];) o = n ? o : !a.hasClass(r), a[o ? "addClass" : "removeClass"](r);
                    else("undefined" === i || "boolean" === i) && (this.className && G._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : G._data(this, "__className__") || "")
                })
            },
            hasClass: function(e) {
                for (var t = " " + e + " ", i = 0, n = this.length; n > i; i++)
                    if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(_t, " ").indexOf(t) >= 0) return !0;
                return !1
            },
            val: function(e) {
                var i, n, r, s = this[0]; {
                    if (arguments.length) return r = G.isFunction(e), this.each(function(n) {
                        var s, a = G(this);
                        1 === this.nodeType && (s = r ? e.call(this, n, a.val()) : e, null == s ? s = "" : "number" == typeof s ? s += "" : G.isArray(s) && (s = G.map(s, function(e) {
                            return null == e ? "" : e + ""
                        })), i = G.valHooks[this.type] || G.valHooks[this.nodeName.toLowerCase()], i && "set" in i && i.set(this, s, "value") !== t || (this.value = s))
                    });
                    if (s) return i = G.valHooks[s.type] || G.valHooks[s.nodeName.toLowerCase()], i && "get" in i && (n = i.get(s, "value")) !== t ? n : (n = s.value, "string" == typeof n ? n.replace(xt, "") : null == n ? "" : n)
                }
            }
        }), G.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = e.attributes.value;
                        return !t || t.specified ? e.value : e.text
                    }
                },
                select: {
                    get: function(e) {
                        for (var t, i, n = e.options, r = e.selectedIndex, s = "select-one" === e.type || 0 > r, a = s ? null : [], o = s ? r + 1 : n.length, l = 0 > r ? o : s ? r : 0; o > l; l++)
                            if (i = n[l], !(!i.selected && l !== r || (G.support.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && G.nodeName(i.parentNode, "optgroup"))) {
                                if (t = G(i).val(), s) return t;
                                a.push(t)
                            }
                        return a
                    },
                    set: function(e, t) {
                        var i = G.makeArray(t);
                        return G(e).find("option").each(function() {
                            this.selected = G.inArray(G(this).val(), i) >= 0
                        }), i.length || (e.selectedIndex = -1), i
                    }
                }
            },
            attrFn: {},
            attr: function(e, i, n, r) {
                var s, a, o, l = e.nodeType;
                if (e && 3 !== l && 8 !== l && 2 !== l) return r && G.isFunction(G.fn[i]) ? G(e)[i](n) : "undefined" == typeof e.getAttribute ? G.prop(e, i, n) : (o = 1 !== l || !G.isXMLDoc(e), o && (i = i.toLowerCase(), a = G.attrHooks[i] || (Ct.test(i) ? yt : vt)), n !== t ? null === n ? void G.removeAttr(e, i) : a && "set" in a && o && (s = a.set(e, n, i)) !== t ? s : (e.setAttribute(i, n + ""), n) : a && "get" in a && o && null !== (s = a.get(e, i)) ? s : (s = e.getAttribute(i), null === s ? t : s))
            },
            removeAttr: function(e, t) {
                var i, n, r, s, a = 0;
                if (t && 1 === e.nodeType)
                    for (n = t.split(tt); a < n.length; a++) r = n[a], r && (i = G.propFix[r] || r, s = Ct.test(r), s || G.attr(e, r, ""), e.removeAttribute(Tt ? r : i), s && i in e && (e[i] = !1))
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (wt.test(e.nodeName) && e.parentNode) G.error("type property can't be changed");
                        else if (!G.support.radioValue && "radio" === t && G.nodeName(e, "input")) {
                            var i = e.value;
                            return e.setAttribute("type", t), i && (e.value = i), t
                        }
                    }
                },
                value: {
                    get: function(e, t) {
                        return vt && G.nodeName(e, "button") ? vt.get(e, t) : t in e ? e.value : null
                    },
                    set: function(e, t, i) {
                        return vt && G.nodeName(e, "button") ? vt.set(e, t, i) : void(e.value = t)
                    }
                }
            },
            propFix: {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            },
            prop: function(e, i, n) {
                var r, s, a, o = e.nodeType;
                if (e && 3 !== o && 8 !== o && 2 !== o) return a = 1 !== o || !G.isXMLDoc(e), a && (i = G.propFix[i] || i, s = G.propHooks[i]), n !== t ? s && "set" in s && (r = s.set(e, n, i)) !== t ? r : e[i] = n : s && "get" in s && null !== (r = s.get(e, i)) ? r : e[i]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var i = e.getAttributeNode("tabindex");
                        return i && i.specified ? parseInt(i.value, 10) : kt.test(e.nodeName) || Dt.test(e.nodeName) && e.href ? 0 : t
                    }
                }
            }
        }), yt = {
            get: function(e, i) {
                var n, r = G.prop(e, i);
                return r === !0 || "boolean" != typeof r && (n = e.getAttributeNode(i)) && n.nodeValue !== !1 ? i.toLowerCase() : t
            },
            set: function(e, t, i) {
                var n;
                return t === !1 ? G.removeAttr(e, i) : (n = G.propFix[i] || i, n in e && (e[n] = !0), e.setAttribute(i, i.toLowerCase())), i
            }
        }, Tt || (bt = {
            name: !0,
            id: !0,
            coords: !0
        }, vt = G.valHooks.button = {
            get: function(e, i) {
                var n;
                return n = e.getAttributeNode(i), n && (bt[i] ? "" !== n.value : n.specified) ? n.value : t
            },
            set: function(e, t, i) {
                var n = e.getAttributeNode(i);
                return n || (n = L.createAttribute(i), e.setAttributeNode(n)), n.value = t + ""
            }
        }, G.each(["width", "height"], function(e, t) {
            G.attrHooks[t] = G.extend(G.attrHooks[t], {
                set: function(e, i) {
                    return "" === i ? (e.setAttribute(t, "auto"), i) : void 0
                }
            })
        }), G.attrHooks.contenteditable = {
            get: vt.get,
            set: function(e, t, i) {
                "" === t && (t = "false"), vt.set(e, t, i)
            }
        }), G.support.hrefNormalized || G.each(["href", "src", "width", "height"], function(e, i) {
            G.attrHooks[i] = G.extend(G.attrHooks[i], {
                get: function(e) {
                    var n = e.getAttribute(i, 2);
                    return null === n ? t : n
                }
            })
        }), G.support.style || (G.attrHooks.style = {
            get: function(e) {
                return e.style.cssText.toLowerCase() || t
            },
            set: function(e, t) {
                return e.style.cssText = t + ""
            }
        }), G.support.optSelected || (G.propHooks.selected = G.extend(G.propHooks.selected, {
            get: function(e) {
                var t = e.parentNode;
                return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
            }
        })), G.support.enctype || (G.propFix.enctype = "encoding"), G.support.checkOn || G.each(["radio", "checkbox"], function() {
            G.valHooks[this] = {
                get: function(e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                }
            }
        }), G.each(["radio", "checkbox"], function() {
            G.valHooks[this] = G.extend(G.valHooks[this], {
                set: function(e, t) {
                    return G.isArray(t) ? e.checked = G.inArray(G(e).val(), t) >= 0 : void 0
                }
            })
        });
        var Et = /^(?:textarea|input|select)$/i,
            St = /^([^\.]*|)(?:\.(.+)|)$/,
            Nt = /(?:^|\s)hover(\.\S+|)\b/,
            Mt = /^key/,
            At = /^(?:mouse|contextmenu)|click/,
            It = /^(?:focusinfocus|focusoutblur)$/,
            jt = function(e) {
                return G.event.special.hover ? e : e.replace(Nt, "mouseenter$1 mouseleave$1")
            };
        G.event = {
                add: function(e, i, n, r, s) {
                    var a, o, l, u, c, h, d, p, f, g, m;
                    if (3 !== e.nodeType && 8 !== e.nodeType && i && n && (a = G._data(e))) {
                        for (n.handler && (f = n, n = f.handler, s = f.selector), n.guid || (n.guid = G.guid++), l = a.events, l || (a.events = l = {}), o = a.handle, o || (a.handle = o = function(e) {
                                return "undefined" == typeof G || e && G.event.triggered === e.type ? t : G.event.dispatch.apply(o.elem, arguments)
                            }, o.elem = e), i = G.trim(jt(i)).split(" "), u = 0; u < i.length; u++) c = St.exec(i[u]) || [], h = c[1], d = (c[2] || "").split(".").sort(), m = G.event.special[h] || {}, h = (s ? m.delegateType : m.bindType) || h, m = G.event.special[h] || {}, p = G.extend({
                            type: h,
                            origType: c[1],
                            data: r,
                            handler: n,
                            guid: n.guid,
                            selector: s,
                            needsContext: s && G.expr.match.needsContext.test(s),
                            namespace: d.join(".")
                        }, f), g = l[h], g || (g = l[h] = [], g.delegateCount = 0, m.setup && m.setup.call(e, r, d, o) !== !1 || (e.addEventListener ? e.addEventListener(h, o, !1) : e.attachEvent && e.attachEvent("on" + h, o))), m.add && (m.add.call(e, p), p.handler.guid || (p.handler.guid = n.guid)), s ? g.splice(g.delegateCount++, 0, p) : g.push(p), G.event.global[h] = !0;
                        e = null
                    }
                },
                global: {},
                remove: function(e, t, i, n, r) {
                    var s, a, o, l, u, c, h, d, p, f, g, m = G.hasData(e) && G._data(e);
                    if (m && (d = m.events)) {
                        for (t = G.trim(jt(t || "")).split(" "), s = 0; s < t.length; s++)
                            if (a = St.exec(t[s]) || [], o = l = a[1], u = a[2], o) {
                                for (p = G.event.special[o] || {}, o = (n ? p.delegateType : p.bindType) || o, f = d[o] || [], c = f.length, u = u ? new RegExp("(^|\\.)" + u.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, h = 0; h < f.length; h++) g = f[h], !r && l !== g.origType || i && i.guid !== g.guid || u && !u.test(g.namespace) || n && n !== g.selector && ("**" !== n || !g.selector) || (f.splice(h--, 1), g.selector && f.delegateCount--, p.remove && p.remove.call(e, g));
                                0 === f.length && c !== f.length && (p.teardown && p.teardown.call(e, u, m.handle) !== !1 || G.removeEvent(e, o, m.handle), delete d[o])
                            } else
                                for (o in d) G.event.remove(e, o + t[s], i, n, !0);
                        G.isEmptyObject(d) && (delete m.handle, G.removeData(e, "events", !0))
                    }
                },
                customEvent: {
                    getData: !0,
                    setData: !0,
                    changeData: !0
                },
                trigger: function(i, n, r, s) {
                    if (!r || 3 !== r.nodeType && 8 !== r.nodeType) {
                        var a, o, l, u, c, h, d, p, f, g, m = i.type || i,
                            v = [];
                        if (!It.test(m + G.event.triggered) && (m.indexOf("!") >= 0 && (m = m.slice(0, -1), o = !0), m.indexOf(".") >= 0 && (v = m.split("."), m = v.shift(), v.sort()), r && !G.event.customEvent[m] || G.event.global[m]))
                            if (i = "object" == typeof i ? i[G.expando] ? i : new G.Event(m, i) : new G.Event(m), i.type = m, i.isTrigger = !0, i.exclusive = o, i.namespace = v.join("."), i.namespace_re = i.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, h = m.indexOf(":") < 0 ? "on" + m : "", r) {
                                if (i.result = t, i.target || (i.target = r), n = null != n ? G.makeArray(n) : [], n.unshift(i), d = G.event.special[m] || {}, !d.trigger || d.trigger.apply(r, n) !== !1) {
                                    if (f = [
                                            [r, d.bindType || m]
                                        ], !s && !d.noBubble && !G.isWindow(r)) {
                                        for (g = d.delegateType || m, u = It.test(g + m) ? r : r.parentNode, c = r; u; u = u.parentNode) f.push([u, g]), c = u;
                                        c === (r.ownerDocument || L) && f.push([c.defaultView || c.parentWindow || e, g])
                                    }
                                    for (l = 0; l < f.length && !i.isPropagationStopped(); l++) u = f[l][0], i.type = f[l][1], p = (G._data(u, "events") || {})[i.type] && G._data(u, "handle"), p && p.apply(u, n), p = h && u[h], p && G.acceptData(u) && p.apply && p.apply(u, n) === !1 && i.preventDefault();
                                    return i.type = m, s || i.isDefaultPrevented() || d._default && d._default.apply(r.ownerDocument, n) !== !1 || "click" === m && G.nodeName(r, "a") || !G.acceptData(r) || h && r[m] && ("focus" !== m && "blur" !== m || 0 !== i.target.offsetWidth) && !G.isWindow(r) && (c = r[h], c && (r[h] = null), G.event.triggered = m, r[m](), G.event.triggered = t, c && (r[h] = c)), i.result
                                }
                            } else {
                                a = G.cache;
                                for (l in a) a[l].events && a[l].events[m] && G.event.trigger(i, n, a[l].handle.elem, !0)
                            }
                    }
                },
                dispatch: function(i) {
                    i = G.event.fix(i || e.event);
                    var n, r, s, a, o, l, u, c, h, d = (G._data(this, "events") || {})[i.type] || [],
                        p = d.delegateCount,
                        f = K.call(arguments),
                        g = !i.exclusive && !i.namespace,
                        m = G.event.special[i.type] || {},
                        v = [];
                    if (f[0] = i, i.delegateTarget = this, !m.preDispatch || m.preDispatch.call(this, i) !== !1) {
                        if (p && (!i.button || "click" !== i.type))
                            for (s = i.target; s != this; s = s.parentNode || this)
                                if (s.disabled !== !0 || "click" !== i.type) {
                                    for (o = {}, u = [], n = 0; p > n; n++) c = d[n], h = c.selector, o[h] === t && (o[h] = c.needsContext ? G(h, this).index(s) >= 0 : G.find(h, this, null, [s]).length), o[h] && u.push(c);
                                    u.length && v.push({
                                        elem: s,
                                        matches: u
                                    })
                                }
                        for (d.length > p && v.push({
                                elem: this,
                                matches: d.slice(p)
                            }), n = 0; n < v.length && !i.isPropagationStopped(); n++)
                            for (l = v[n], i.currentTarget = l.elem, r = 0; r < l.matches.length && !i.isImmediatePropagationStopped(); r++) c = l.matches[r], (g || !i.namespace && !c.namespace || i.namespace_re && i.namespace_re.test(c.namespace)) && (i.data = c.data, i.handleObj = c, a = ((G.event.special[c.origType] || {}).handle || c.handler).apply(l.elem, f), a !== t && (i.result = a, a === !1 && (i.preventDefault(), i.stopPropagation())));
                        return m.postDispatch && m.postDispatch.call(this, i), i.result
                    }
                },
                props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(e, t) {
                        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(e, i) {
                        var n, r, s, a = i.button,
                            o = i.fromElement;
                        return null == e.pageX && null != i.clientX && (n = e.target.ownerDocument || L, r = n.documentElement, s = n.body, e.pageX = i.clientX + (r && r.scrollLeft || s && s.scrollLeft || 0) - (r && r.clientLeft || s && s.clientLeft || 0), e.pageY = i.clientY + (r && r.scrollTop || s && s.scrollTop || 0) - (r && r.clientTop || s && s.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? i.toElement : o), e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
                    }
                },
                fix: function(e) {
                    if (e[G.expando]) return e;
                    var t, i, n = e,
                        r = G.event.fixHooks[e.type] || {},
                        s = r.props ? this.props.concat(r.props) : this.props;
                    for (e = G.Event(n), t = s.length; t;) i = s[--t], e[i] = n[i];
                    return e.target || (e.target = n.srcElement || L), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, r.filter ? r.filter(e, n) : e
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        delegateType: "focusin"
                    },
                    blur: {
                        delegateType: "focusout"
                    },
                    beforeunload: {
                        setup: function(e, t, i) {
                            G.isWindow(this) && (this.onbeforeunload = i)
                        },
                        teardown: function(e, t) {
                            this.onbeforeunload === t && (this.onbeforeunload = null)
                        }
                    }
                },
                simulate: function(e, t, i, n) {
                    var r = G.extend(new G.Event, i, {
                        type: e,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    n ? G.event.trigger(r, null, t) : G.event.dispatch.call(t, r), r.isDefaultPrevented() && i.preventDefault()
                }
            }, G.event.handle = G.event.dispatch, G.removeEvent = L.removeEventListener ? function(e, t, i) {
                e.removeEventListener && e.removeEventListener(t, i, !1)
            } : function(e, t, i) {
                var n = "on" + t;
                e.detachEvent && ("undefined" == typeof e[n] && (e[n] = null), e.detachEvent(n, i))
            }, G.Event = function(e, t) {
                return this instanceof G.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? a : s) : this.type = e, t && G.extend(this, t), this.timeStamp = e && e.timeStamp || G.now(), void(this[G.expando] = !0)) : new G.Event(e, t)
            }, G.Event.prototype = {
                preventDefault: function() {
                    this.isDefaultPrevented = a;
                    var e = this.originalEvent;
                    e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
                },
                stopPropagation: function() {
                    this.isPropagationStopped = a;
                    var e = this.originalEvent;
                    e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
                },
                stopImmediatePropagation: function() {
                    this.isImmediatePropagationStopped = a, this.stopPropagation()
                },
                isDefaultPrevented: s,
                isPropagationStopped: s,
                isImmediatePropagationStopped: s
            }, G.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }, function(e, t) {
                G.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function(e) {
                        {
                            var i, n = this,
                                r = e.relatedTarget,
                                s = e.handleObj;
                            s.selector
                        }
                        return (!r || r !== n && !G.contains(n, r)) && (e.type = s.origType, i = s.handler.apply(this, arguments), e.type = t), i
                    }
                }
            }), G.support.submitBubbles || (G.event.special.submit = {
                setup: function() {
                    return G.nodeName(this, "form") ? !1 : void G.event.add(this, "click._submit keypress._submit", function(e) {
                        var i = e.target,
                            n = G.nodeName(i, "input") || G.nodeName(i, "button") ? i.form : t;
                        n && !G._data(n, "_submit_attached") && (G.event.add(n, "submit._submit", function(e) {
                            e._submit_bubble = !0
                        }), G._data(n, "_submit_attached", !0))
                    })
                },
                postDispatch: function(e) {
                    e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && G.event.simulate("submit", this.parentNode, e, !0))
                },
                teardown: function() {
                    return G.nodeName(this, "form") ? !1 : void G.event.remove(this, "._submit")
                }
            }), G.support.changeBubbles || (G.event.special.change = {
                setup: function() {
                    return Et.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (G.event.add(this, "propertychange._change", function(e) {
                        "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
                    }), G.event.add(this, "click._change", function(e) {
                        this._just_changed && !e.isTrigger && (this._just_changed = !1), G.event.simulate("change", this, e, !0)
                    })), !1) : void G.event.add(this, "beforeactivate._change", function(e) {
                        var t = e.target;
                        Et.test(t.nodeName) && !G._data(t, "_change_attached") && (G.event.add(t, "change._change", function(e) {
                            !this.parentNode || e.isSimulated || e.isTrigger || G.event.simulate("change", this.parentNode, e, !0)
                        }), G._data(t, "_change_attached", !0))
                    })
                },
                handle: function(e) {
                    var t = e.target;
                    return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
                },
                teardown: function() {
                    return G.event.remove(this, "._change"), !Et.test(this.nodeName)
                }
            }), G.support.focusinBubbles || G.each({
                focus: "focusin",
                blur: "focusout"
            }, function(e, t) {
                var i = 0,
                    n = function(e) {
                        G.event.simulate(t, e.target, G.event.fix(e), !0)
                    };
                G.event.special[t] = {
                    setup: function() {
                        0 === i++ && L.addEventListener(e, n, !0)
                    },
                    teardown: function() {
                        0 === --i && L.removeEventListener(e, n, !0)
                    }
                }
            }), G.fn.extend({
                on: function(e, i, n, r, a) {
                    var o, l;
                    if ("object" == typeof e) {
                        "string" != typeof i && (n = n || i, i = t);
                        for (l in e) this.on(l, i, n, e[l], a);
                        return this
                    }
                    if (null == n && null == r ? (r = i, n = i = t) : null == r && ("string" == typeof i ? (r = n, n = t) : (r = n, n = i, i = t)), r === !1) r = s;
                    else if (!r) return this;
                    return 1 === a && (o = r, r = function(e) {
                        return G().off(e), o.apply(this, arguments)
                    }, r.guid = o.guid || (o.guid = G.guid++)), this.each(function() {
                        G.event.add(this, e, r, n, i)
                    })
                },
                one: function(e, t, i, n) {
                    return this.on(e, t, i, n, 1)
                },
                off: function(e, i, n) {
                    var r, a;
                    if (e && e.preventDefault && e.handleObj) return r = e.handleObj, G(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                    if ("object" == typeof e) {
                        for (a in e) this.off(a, i, e[a]);
                        return this
                    }
                    return (i === !1 || "function" == typeof i) && (n = i, i = t), n === !1 && (n = s), this.each(function() {
                        G.event.remove(this, e, n, i)
                    })
                },
                bind: function(e, t, i) {
                    return this.on(e, null, t, i)
                },
                unbind: function(e, t) {
                    return this.off(e, null, t)
                },
                live: function(e, t, i) {
                    return G(this.context).on(e, this.selector, t, i), this
                },
                die: function(e, t) {
                    return G(this.context).off(e, this.selector || "**", t), this
                },
                delegate: function(e, t, i, n) {
                    return this.on(t, e, i, n)
                },
                undelegate: function(e, t, i) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
                },
                trigger: function(e, t) {
                    return this.each(function() {
                        G.event.trigger(e, t, this)
                    })
                },
                triggerHandler: function(e, t) {
                    return this[0] ? G.event.trigger(e, t, this[0], !0) : void 0
                },
                toggle: function(e) {
                    var t = arguments,
                        i = e.guid || G.guid++,
                        n = 0,
                        r = function(i) {
                            var r = (G._data(this, "lastToggle" + e.guid) || 0) % n;
                            return G._data(this, "lastToggle" + e.guid, r + 1), i.preventDefault(), t[r].apply(this, arguments) || !1
                        };
                    for (r.guid = i; n < t.length;) t[n++].guid = i;
                    return this.click(r)
                },
                hover: function(e, t) {
                    return this.mouseenter(e).mouseleave(t || e)
                }
            }), G.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
                G.fn[t] = function(e, i) {
                    return null == i && (i = e, e = null), arguments.length > 0 ? this.on(t, null, e, i) : this.trigger(t)
                }, Mt.test(t) && (G.event.fixHooks[t] = G.event.keyHooks), At.test(t) && (G.event.fixHooks[t] = G.event.mouseHooks)
            }),
            function(e, t) {
                function i(e, t, i, n) {
                    i = i || [], t = t || A;
                    var r, s, a, o, l = t.nodeType;
                    if (!e || "string" != typeof e) return i;
                    if (1 !== l && 9 !== l) return [];
                    if (a = x(t), !a && !n && (r = it.exec(e)))
                        if (o = r[1]) {
                            if (9 === l) {
                                if (s = t.getElementById(o), !s || !s.parentNode) return i;
                                if (s.id === o) return i.push(s), i
                            } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(o)) && w(t, s) && s.id === o) return i.push(s), i
                        } else {
                            if (r[2]) return z.apply(i, $.call(t.getElementsByTagName(e), 0)), i;
                            if ((o = r[3]) && dt && t.getElementsByClassName) return z.apply(i, $.call(t.getElementsByClassName(o), 0)), i
                        }
                    return g(e.replace(Q, "$1"), t, i, n, a)
                }

                function n(e) {
                    return function(t) {
                        var i = t.nodeName.toLowerCase();
                        return "input" === i && t.type === e
                    }
                }

                function r(e) {
                    return function(t) {
                        var i = t.nodeName.toLowerCase();
                        return ("input" === i || "button" === i) && t.type === e
                    }
                }

                function s(e) {
                    return R(function(t) {
                        return t = +t, R(function(i, n) {
                            for (var r, s = e([], i.length, t), a = s.length; a--;) i[r = s[a]] && (i[r] = !(n[r] = i[r]))
                        })
                    })
                }

                function a(e, t, i) {
                    if (e === t) return i;
                    for (var n = e.nextSibling; n;) {
                        if (n === t) return -1;
                        n = n.nextSibling
                    }
                    return 1
                }

                function o(e, t) {
                    var n, r, s, a, o, l, u, c = W[N][e + " "];
                    if (c) return t ? 0 : c.slice(0);
                    for (o = e, l = [], u = b.preFilter; o;) {
                        (!n || (r = Z.exec(o))) && (r && (o = o.slice(r[0].length) || o), l.push(s = [])), n = !1, (r = et.exec(o)) && (s.push(n = new M(r.shift())), o = o.slice(n.length), n.type = r[0].replace(Q, " "));
                        for (a in b.filter) !(r = ot[a].exec(o)) || u[a] && !(r = u[a](r)) || (s.push(n = new M(r.shift())), o = o.slice(n.length), n.type = a, n.matches = r);
                        if (!n) break
                    }
                    return t ? o.length : o ? i.error(e) : W(e, l).slice(0)
                }

                function l(e, t, i) {
                    var n = t.dir,
                        r = i && "parentNode" === t.dir,
                        s = P++;
                    return t.first ? function(t, i, s) {
                        for (; t = t[n];)
                            if (r || 1 === t.nodeType) return e(t, i, s)
                    } : function(t, i, a) {
                        if (a) {
                            for (; t = t[n];)
                                if ((r || 1 === t.nodeType) && e(t, i, a)) return t
                        } else
                            for (var o, l = j + " " + s + " ", u = l + v; t = t[n];)
                                if (r || 1 === t.nodeType) {
                                    if ((o = t[N]) === u) return t.sizset;
                                    if ("string" == typeof o && 0 === o.indexOf(l)) {
                                        if (t.sizset) return t
                                    } else {
                                        if (t[N] = u, e(t, i, a)) return t.sizset = !0, t;
                                        t.sizset = !1
                                    }
                                }
                    }
                }

                function u(e) {
                    return e.length > 1 ? function(t, i, n) {
                        for (var r = e.length; r--;)
                            if (!e[r](t, i, n)) return !1;
                        return !0
                    } : e[0]
                }

                function c(e, t, i, n, r) {
                    for (var s, a = [], o = 0, l = e.length, u = null != t; l > o; o++)(s = e[o]) && (!i || i(s, n, r)) && (a.push(s), u && t.push(o));
                    return a
                }

                function h(e, t, i, n, r, s) {
                    return n && !n[N] && (n = h(n)), r && !r[N] && (r = h(r, s)), R(function(s, a, o, l) {
                        var u, h, d, p = [],
                            g = [],
                            m = a.length,
                            v = s || f(t || "*", o.nodeType ? [o] : o, []),
                            y = !e || !s && t ? v : c(v, p, e, o, l),
                            b = i ? r || (s ? e : m || n) ? [] : a : y;
                        if (i && i(y, b, o, l), n)
                            for (u = c(b, g), n(u, [], o, l), h = u.length; h--;)(d = u[h]) && (b[g[h]] = !(y[g[h]] = d));
                        if (s) {
                            if (r || e) {
                                if (r) {
                                    for (u = [], h = b.length; h--;)(d = b[h]) && u.push(y[h] = d);
                                    r(null, b = [], u, l)
                                }
                                for (h = b.length; h--;)(d = b[h]) && (u = r ? H.call(s, d) : p[h]) > -1 && (s[u] = !(a[u] = d))
                            }
                        } else b = c(b === a ? b.splice(m, b.length) : b), r ? r(null, a, b, l) : z.apply(a, b)
                    })
                }

                function d(e) {
                    for (var t, i, n, r = e.length, s = b.relative[e[0].type], a = s || b.relative[" "], o = s ? 1 : 0, c = l(function(e) {
                            return e === t
                        }, a, !0), p = l(function(e) {
                            return H.call(t, e) > -1
                        }, a, !0), f = [function(e, i, n) {
                            return !s && (n || i !== T) || ((t = i).nodeType ? c(e, i, n) : p(e, i, n))
                        }]; r > o; o++)
                        if (i = b.relative[e[o].type]) f = [l(u(f), i)];
                        else {
                            if (i = b.filter[e[o].type].apply(null, e[o].matches), i[N]) {
                                for (n = ++o; r > n && !b.relative[e[n].type]; n++);
                                return h(o > 1 && u(f), o > 1 && e.slice(0, o - 1).join("").replace(Q, "$1"), i, n > o && d(e.slice(o, n)), r > n && d(e = e.slice(n)), r > n && e.join(""))
                            }
                            f.push(i)
                        }
                    return u(f)
                }

                function p(e, t) {
                    var n = t.length > 0,
                        r = e.length > 0,
                        s = function(a, o, l, u, h) {
                            var d, p, f, g = [],
                                m = 0,
                                y = "0",
                                _ = a && [],
                                x = null != h,
                                w = T,
                                k = a || r && b.find.TAG("*", h && o.parentNode || o),
                                D = j += null == w ? 1 : Math.E;
                            for (x && (T = o !== A && o, v = s.el); null != (d = k[y]); y++) {
                                if (r && d) {
                                    for (p = 0; f = e[p]; p++)
                                        if (f(d, o, l)) {
                                            u.push(d);
                                            break
                                        }
                                    x && (j = D, v = ++s.el)
                                }
                                n && ((d = !f && d) && m--, a && _.push(d))
                            }
                            if (m += y, n && y !== m) {
                                for (p = 0; f = t[p]; p++) f(_, g, o, l);
                                if (a) {
                                    if (m > 0)
                                        for (; y--;) _[y] || g[y] || (g[y] = O.call(u));
                                    g = c(g)
                                }
                                z.apply(u, g), x && !a && g.length > 0 && m + t.length > 1 && i.uniqueSort(u)
                            }
                            return x && (j = D, T = w), _
                        };
                    return s.el = 0, n ? R(s) : s
                }

                function f(e, t, n) {
                    for (var r = 0, s = t.length; s > r; r++) i(e, t[r], n);
                    return n
                }

                function g(e, t, i, n, r) {
                    {
                        var s, a, l, u, c, h = o(e);
                        h.length
                    }
                    if (!n && 1 === h.length) {
                        if (a = h[0] = h[0].slice(0), a.length > 2 && "ID" === (l = a[0]).type && 9 === t.nodeType && !r && b.relative[a[1].type]) {
                            if (t = b.find.ID(l.matches[0].replace(at, ""), t, r)[0], !t) return i;
                            e = e.slice(a.shift().length)
                        }
                        for (s = ot.POS.test(e) ? -1 : a.length - 1; s >= 0 && (l = a[s], !b.relative[u = l.type]); s--)
                            if ((c = b.find[u]) && (n = c(l.matches[0].replace(at, ""), nt.test(a[0].type) && t.parentNode || t, r))) {
                                if (a.splice(s, 1), e = n.length && a.join(""), !e) return z.apply(i, $.call(n, 0)), i;
                                break
                            }
                    }
                    return k(e, h)(n, t, r, i, nt.test(e)), i
                }

                function m() {}
                var v, y, b, _, x, w, k, D, C, T, E = !0,
                    S = "undefined",
                    N = ("sizcache" + Math.random()).replace(".", ""),
                    M = String,
                    A = e.document,
                    I = A.documentElement,
                    j = 0,
                    P = 0,
                    O = [].pop,
                    z = [].push,
                    $ = [].slice,
                    H = [].indexOf || function(e) {
                        for (var t = 0, i = this.length; i > t; t++)
                            if (this[t] === e) return t;
                        return -1
                    },
                    R = function(e, t) {
                        return e[N] = null == t || t, e
                    },
                    F = function() {
                        var e = {},
                            t = [];
                        return R(function(i, n) {
                            return t.push(i) > b.cacheLength && delete e[t.shift()], e[i + " "] = n
                        }, e)
                    },
                    L = F(),
                    W = F(),
                    B = F(),
                    q = "[\\x20\\t\\r\\n\\f]",
                    Y = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
                    U = Y.replace("w", "w#"),
                    K = "([*^$|!~]?=)",
                    X = "\\[" + q + "*(" + Y + ")" + q + "*(?:" + K + q + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + U + ")|)|)" + q + "*\\]",
                    V = ":(" + Y + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + X + ")|[^:]|\\\\.)*|.*))\\)|)",
                    J = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + q + "*((?:-\\d)?\\d*)" + q + "*\\)|)(?=[^-]|$)",
                    Q = new RegExp("^" + q + "+|((?:^|[^\\\\])(?:\\\\.)*)" + q + "+$", "g"),
                    Z = new RegExp("^" + q + "*," + q + "*"),
                    et = new RegExp("^" + q + "*([\\x20\\t\\r\\n\\f>+~])" + q + "*"),
                    tt = new RegExp(V),
                    it = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
                    nt = /[\x20\t\r\n\f]*[+~]/,
                    rt = /h\d/i,
                    st = /input|select|textarea|button/i,
                    at = /\\(?!\\)/g,
                    ot = {
                        ID: new RegExp("^#(" + Y + ")"),
                        CLASS: new RegExp("^\\.(" + Y + ")"),
                        NAME: new RegExp("^\\[name=['\"]?(" + Y + ")['\"]?\\]"),
                        TAG: new RegExp("^(" + Y.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + X),
                        PSEUDO: new RegExp("^" + V),
                        POS: new RegExp(J, "i"),
                        CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + q + "*(even|odd|(([+-]|)(\\d*)n|)" + q + "*(?:([+-]|)" + q + "*(\\d+)|))" + q + "*\\)|)", "i"),
                        needsContext: new RegExp("^" + q + "*[>+~]|" + J, "i")
                    },
                    lt = function(e) {
                        var t = A.createElement("div");
                        try {
                            return e(t)
                        } catch (i) {
                            return !1
                        } finally {
                            t = null
                        }
                    },
                    ut = lt(function(e) {
                        return e.appendChild(A.createComment("")), !e.getElementsByTagName("*").length
                    }),
                    ct = lt(function(e) {
                        return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== S && "#" === e.firstChild.getAttribute("href")
                    }),
                    ht = lt(function(e) {
                        e.innerHTML = "<select></select>";
                        var t = typeof e.lastChild.getAttribute("multiple");
                        return "boolean" !== t && "string" !== t
                    }),
                    dt = lt(function(e) {
                        return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
                    }),
                    pt = lt(function(e) {
                        e.id = N + 0, e.innerHTML = "<a name='" + N + "'></a><div name='" + N + "'></div>", I.insertBefore(e, I.firstChild);
                        var t = A.getElementsByName && A.getElementsByName(N).length === 2 + A.getElementsByName(N + 0).length;
                        return y = !A.getElementById(N), I.removeChild(e), t
                    });
                try {
                    $.call(I.childNodes, 0)[0].nodeType
                } catch (ft) {
                    $ = function(e) {
                        for (var t, i = []; t = this[e]; e++) i.push(t);
                        return i
                    }
                }
                i.matches = function(e, t) {
                    return i(e, null, null, t)
                }, i.matchesSelector = function(e, t) {
                    return i(t, null, null, [e]).length > 0
                }, _ = i.getText = function(e) {
                    var t, i = "",
                        n = 0,
                        r = e.nodeType;
                    if (r) {
                        if (1 === r || 9 === r || 11 === r) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) i += _(e)
                        } else if (3 === r || 4 === r) return e.nodeValue
                    } else
                        for (; t = e[n]; n++) i += _(t);
                    return i
                }, x = i.isXML = function(e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return t ? "HTML" !== t.nodeName : !1
                }, w = i.contains = I.contains ? function(e, t) {
                    var i = 9 === e.nodeType ? e.documentElement : e,
                        n = t && t.parentNode;
                    return e === n || !!(n && 1 === n.nodeType && i.contains && i.contains(n))
                } : I.compareDocumentPosition ? function(e, t) {
                    return t && !!(16 & e.compareDocumentPosition(t))
                } : function(e, t) {
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                    return !1
                }, i.attr = function(e, t) {
                    var i, n = x(e);
                    return n || (t = t.toLowerCase()), (i = b.attrHandle[t]) ? i(e) : n || ht ? e.getAttribute(t) : (i = e.getAttributeNode(t), i ? "boolean" == typeof e[t] ? e[t] ? t : null : i.specified ? i.value : null : null)
                }, b = i.selectors = {
                    cacheLength: 50,
                    createPseudo: R,
                    match: ot,
                    attrHandle: ct ? {} : {
                        href: function(e) {
                            return e.getAttribute("href", 2)
                        },
                        type: function(e) {
                            return e.getAttribute("type")
                        }
                    },
                    find: {
                        ID: y ? function(e, t, i) {
                            if (typeof t.getElementById !== S && !i) {
                                var n = t.getElementById(e);
                                return n && n.parentNode ? [n] : []
                            }
                        } : function(e, i, n) {
                            if (typeof i.getElementById !== S && !n) {
                                var r = i.getElementById(e);
                                return r ? r.id === e || typeof r.getAttributeNode !== S && r.getAttributeNode("id").value === e ? [r] : t : []
                            }
                        },
                        TAG: ut ? function(e, t) {
                            return typeof t.getElementsByTagName !== S ? t.getElementsByTagName(e) : void 0
                        } : function(e, t) {
                            var i = t.getElementsByTagName(e);
                            if ("*" === e) {
                                for (var n, r = [], s = 0; n = i[s]; s++) 1 === n.nodeType && r.push(n);
                                return r
                            }
                            return i
                        },
                        NAME: pt && function(e, t) {
                            return typeof t.getElementsByName !== S ? t.getElementsByName(name) : void 0
                        },
                        CLASS: dt && function(e, t, i) {
                            return typeof t.getElementsByClassName === S || i ? void 0 : t.getElementsByClassName(e)
                        }
                    },
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(at, ""), e[3] = (e[4] || e[5] || "").replace(at, ""), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1] ? (e[2] || i.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * ("even" === e[2] || "odd" === e[2])), e[4] = +(e[6] + e[7] || "odd" === e[2])) : e[2] && i.error(e[0]), e
                        },
                        PSEUDO: function(e) {
                            var t, i;
                            return ot.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[3] : (t = e[4]) && (tt.test(t) && (i = o(t, !0)) && (i = t.indexOf(")", t.length - i) - t.length) && (t = t.slice(0, i), e[0] = e[0].slice(0, i)), e[2] = t), e.slice(0, 3))
                        }
                    },
                    filter: {
                        ID: y ? function(e) {
                            return e = e.replace(at, ""),
                                function(t) {
                                    return t.getAttribute("id") === e
                                }
                        } : function(e) {
                            return e = e.replace(at, ""),
                                function(t) {
                                    var i = typeof t.getAttributeNode !== S && t.getAttributeNode("id");
                                    return i && i.value === e
                                }
                        },
                        TAG: function(e) {
                            return "*" === e ? function() {
                                return !0
                            } : (e = e.replace(at, "").toLowerCase(), function(t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e
                            })
                        },
                        CLASS: function(e) {
                            var t = L[N][e + " "];
                            return t || (t = new RegExp("(^|" + q + ")" + e + "(" + q + "|$)")) && L(e, function(e) {
                                return t.test(e.className || typeof e.getAttribute !== S && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(e, t, n) {
                            return function(r) {
                                var s = i.attr(r, e);
                                return null == s ? "!=" === t : t ? (s += "", "=" === t ? s === n : "!=" === t ? s !== n : "^=" === t ? n && 0 === s.indexOf(n) : "*=" === t ? n && s.indexOf(n) > -1 : "$=" === t ? n && s.substr(s.length - n.length) === n : "~=" === t ? (" " + s + " ").indexOf(n) > -1 : "|=" === t ? s === n || s.substr(0, n.length + 1) === n + "-" : !1) : !0
                            }
                        },
                        CHILD: function(e, t, i, n) {
                            return "nth" === e ? function(e) {
                                var t, r, s = e.parentNode;
                                if (1 === i && 0 === n) return !0;
                                if (s)
                                    for (r = 0, t = s.firstChild; t && (1 !== t.nodeType || (r++, e !== t)); t = t.nextSibling);
                                return r -= n, r === i || r % i === 0 && r / i >= 0
                            } : function(t) {
                                var i = t;
                                switch (e) {
                                    case "only":
                                    case "first":
                                        for (; i = i.previousSibling;)
                                            if (1 === i.nodeType) return !1;
                                        if ("first" === e) return !0;
                                        i = t;
                                    case "last":
                                        for (; i = i.nextSibling;)
                                            if (1 === i.nodeType) return !1;
                                        return !0
                                }
                            }
                        },
                        PSEUDO: function(e, t) {
                            var n, r = b.pseudos[e] || b.setFilters[e.toLowerCase()] || i.error("unsupported pseudo: " + e);
                            return r[N] ? r(t) : r.length > 1 ? (n = [e, e, "", t], b.setFilters.hasOwnProperty(e.toLowerCase()) ? R(function(e, i) {
                                for (var n, s = r(e, t), a = s.length; a--;) n = H.call(e, s[a]), e[n] = !(i[n] = s[a])
                            }) : function(e) {
                                return r(e, 0, n)
                            }) : r
                        }
                    },
                    pseudos: {
                        not: R(function(e) {
                            var t = [],
                                i = [],
                                n = k(e.replace(Q, "$1"));
                            return n[N] ? R(function(e, t, i, r) {
                                for (var s, a = n(e, null, r, []), o = e.length; o--;)(s = a[o]) && (e[o] = !(t[o] = s))
                            }) : function(e, r, s) {
                                return t[0] = e, n(t, null, s, i), !i.pop()
                            }
                        }),
                        has: R(function(e) {
                            return function(t) {
                                return i(e, t).length > 0
                            }
                        }),
                        contains: R(function(e) {
                            return function(t) {
                                return (t.textContent || t.innerText || _(t)).indexOf(e) > -1
                            }
                        }),
                        enabled: function(e) {
                            return e.disabled === !1
                        },
                        disabled: function(e) {
                            return e.disabled === !0
                        },
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                        },
                        parent: function(e) {
                            return !b.pseudos.empty(e)
                        },
                        empty: function(e) {
                            var t;
                            for (e = e.firstChild; e;) {
                                if (e.nodeName > "@" || 3 === (t = e.nodeType) || 4 === t) return !1;
                                e = e.nextSibling
                            }
                            return !0
                        },
                        header: function(e) {
                            return rt.test(e.nodeName)
                        },
                        text: function(e) {
                            var t, i;
                            return "input" === e.nodeName.toLowerCase() && "text" === (t = e.type) && (null == (i = e.getAttribute("type")) || i.toLowerCase() === t)
                        },
                        radio: n("radio"),
                        checkbox: n("checkbox"),
                        file: n("file"),
                        password: n("password"),
                        image: n("image"),
                        submit: r("submit"),
                        reset: r("reset"),
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        input: function(e) {
                            return st.test(e.nodeName)
                        },
                        focus: function(e) {
                            var t = e.ownerDocument;
                            return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        active: function(e) {
                            return e === e.ownerDocument.activeElement
                        },
                        first: s(function() {
                            return [0]
                        }),
                        last: s(function(e, t) {
                            return [t - 1]
                        }),
                        eq: s(function(e, t, i) {
                            return [0 > i ? i + t : i]
                        }),
                        even: s(function(e, t) {
                            for (var i = 0; t > i; i += 2) e.push(i);
                            return e
                        }),
                        odd: s(function(e, t) {
                            for (var i = 1; t > i; i += 2) e.push(i);
                            return e
                        }),
                        lt: s(function(e, t, i) {
                            for (var n = 0 > i ? i + t : i; --n >= 0;) e.push(n);
                            return e
                        }),
                        gt: s(function(e, t, i) {
                            for (var n = 0 > i ? i + t : i; ++n < t;) e.push(n);
                            return e
                        })
                    }
                }, D = I.compareDocumentPosition ? function(e, t) {
                    return e === t ? (C = !0, 0) : (e.compareDocumentPosition && t.compareDocumentPosition ? 4 & e.compareDocumentPosition(t) : e.compareDocumentPosition) ? -1 : 1
                } : function(e, t) {
                    if (e === t) return C = !0, 0;
                    if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
                    var i, n, r = [],
                        s = [],
                        o = e.parentNode,
                        l = t.parentNode,
                        u = o;
                    if (o === l) return a(e, t);
                    if (!o) return -1;
                    if (!l) return 1;
                    for (; u;) r.unshift(u), u = u.parentNode;
                    for (u = l; u;) s.unshift(u), u = u.parentNode;
                    i = r.length, n = s.length;
                    for (var c = 0; i > c && n > c; c++)
                        if (r[c] !== s[c]) return a(r[c], s[c]);
                    return c === i ? a(e, s[c], -1) : a(r[c], t, 1)
                }, [0, 0].sort(D), E = !C, i.uniqueSort = function(e) {
                    var t, i = [],
                        n = 1,
                        r = 0;
                    if (C = E, e.sort(D), C) {
                        for (; t = e[n]; n++) t === e[n - 1] && (r = i.push(n));
                        for (; r--;) e.splice(i[r], 1)
                    }
                    return e
                }, i.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, k = i.compile = function(e, t) {
                    var i, n = [],
                        r = [],
                        s = B[N][e + " "];
                    if (!s) {
                        for (t || (t = o(e)), i = t.length; i--;) s = d(t[i]), s[N] ? n.push(s) : r.push(s);
                        s = B(e, p(r, n))
                    }
                    return s
                }, A.querySelectorAll && ! function() {
                    var e, t = g,
                        n = /'|\\/g,
                        r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                        s = [":focus"],
                        a = [":active"],
                        l = I.matchesSelector || I.mozMatchesSelector || I.webkitMatchesSelector || I.oMatchesSelector || I.msMatchesSelector;
                    lt(function(e) {
                        e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || s.push("\\[" + q + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || s.push(":checked")
                    }), lt(function(e) {
                        e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && s.push("[*^$]=" + q + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || s.push(":enabled", ":disabled")
                    }), s = new RegExp(s.join("|")), g = function(e, i, r, a, l) {
                        if (!a && !l && !s.test(e)) {
                            var u, c, h = !0,
                                d = N,
                                p = i,
                                f = 9 === i.nodeType && e;
                            if (1 === i.nodeType && "object" !== i.nodeName.toLowerCase()) {
                                for (u = o(e), (h = i.getAttribute("id")) ? d = h.replace(n, "\\$&") : i.setAttribute("id", d), d = "[id='" + d + "'] ", c = u.length; c--;) u[c] = d + u[c].join("");
                                p = nt.test(e) && i.parentNode || i, f = u.join(",")
                            }
                            if (f) try {
                                return z.apply(r, $.call(p.querySelectorAll(f), 0)), r
                            } catch (g) {} finally {
                                h || i.removeAttribute("id")
                            }
                        }
                        return t(e, i, r, a, l)
                    }, l && (lt(function(t) {
                        e = l.call(t, "div");
                        try {
                            l.call(t, "[test!='']:sizzle"), a.push("!=", V)
                        } catch (i) {}
                    }), a = new RegExp(a.join("|")), i.matchesSelector = function(t, n) {
                        if (n = n.replace(r, "='$1']"), !x(t) && !a.test(n) && !s.test(n)) try {
                            var o = l.call(t, n);
                            if (o || e || t.document && 11 !== t.document.nodeType) return o
                        } catch (u) {}
                        return i(n, null, null, [t]).length > 0
                    })
                }(), b.pseudos.nth = b.pseudos.eq, b.filters = m.prototype = b.pseudos, b.setFilters = new m, i.attr = G.attr, G.find = i, G.expr = i.selectors, G.expr[":"] = G.expr.pseudos, G.unique = i.uniqueSort, G.text = i.getText, G.isXMLDoc = i.isXML, G.contains = i.contains
            }(e);
        var Pt = /Until$/,
            Ot = /^(?:parents|prev(?:Until|All))/,
            zt = /^.[^:#\[\.,]*$/,
            $t = G.expr.match.needsContext,
            Ht = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        G.fn.extend({
            find: function(e) {
                var t, i, n, r, s, a, o = this;
                if ("string" != typeof e) return G(e).filter(function() {
                    for (t = 0, i = o.length; i > t; t++)
                        if (G.contains(o[t], this)) return !0
                });
                for (a = this.pushStack("", "find", e), t = 0, i = this.length; i > t; t++)
                    if (n = a.length, G.find(e, this[t], a), t > 0)
                        for (r = n; r < a.length; r++)
                            for (s = 0; n > s; s++)
                                if (a[s] === a[r]) {
                                    a.splice(r--, 1);
                                    break
                                }
                return a
            },
            has: function(e) {
                var t, i = G(e, this),
                    n = i.length;
                return this.filter(function() {
                    for (t = 0; n > t; t++)
                        if (G.contains(this, i[t])) return !0
                })
            },
            not: function(e) {
                return this.pushStack(u(this, e, !1), "not", e)
            },
            filter: function(e) {
                return this.pushStack(u(this, e, !0), "filter", e)
            },
            is: function(e) {
                return !!e && ("string" == typeof e ? $t.test(e) ? G(e, this.context).index(this[0]) >= 0 : G.filter(e, this).length > 0 : this.filter(e).length > 0)
            },
            closest: function(e, t) {
                for (var i, n = 0, r = this.length, s = [], a = $t.test(e) || "string" != typeof e ? G(e, t || this.context) : 0; r > n; n++)
                    for (i = this[n]; i && i.ownerDocument && i !== t && 11 !== i.nodeType;) {
                        if (a ? a.index(i) > -1 : G.find.matchesSelector(i, e)) {
                            s.push(i);
                            break
                        }
                        i = i.parentNode
                    }
                return s = s.length > 1 ? G.unique(s) : s, this.pushStack(s, "closest", e)
            },
            index: function(e) {
                return e ? "string" == typeof e ? G.inArray(this[0], G(e)) : G.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
            },
            add: function(e, t) {
                var i = "string" == typeof e ? G(e, t) : G.makeArray(e && e.nodeType ? [e] : e),
                    n = G.merge(this.get(), i);
                return this.pushStack(o(i[0]) || o(n[0]) ? n : G.unique(n))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), G.fn.andSelf = G.fn.addBack, G.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return G.dir(e, "parentNode")
            },
            parentsUntil: function(e, t, i) {
                return G.dir(e, "parentNode", i)
            },
            next: function(e) {
                return l(e, "nextSibling")
            },
            prev: function(e) {
                return l(e, "previousSibling")
            },
            nextAll: function(e) {
                return G.dir(e, "nextSibling")
            },
            prevAll: function(e) {
                return G.dir(e, "previousSibling")
            },
            nextUntil: function(e, t, i) {
                return G.dir(e, "nextSibling", i)
            },
            prevUntil: function(e, t, i) {
                return G.dir(e, "previousSibling", i)
            },
            siblings: function(e) {
                return G.sibling((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return G.sibling(e.firstChild)
            },
            contents: function(e) {
                return G.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : G.merge([], e.childNodes)
            }
        }, function(e, t) {
            G.fn[e] = function(i, n) {
                var r = G.map(this, t, i);
                return Pt.test(e) || (n = i), n && "string" == typeof n && (r = G.filter(n, r)), r = this.length > 1 && !Ht[e] ? G.unique(r) : r, this.length > 1 && Ot.test(e) && (r = r.reverse()), this.pushStack(r, e, K.call(arguments).join(","))
            }
        }), G.extend({
            filter: function(e, t, i) {
                return i && (e = ":not(" + e + ")"), 1 === t.length ? G.find.matchesSelector(t[0], e) ? [t[0]] : [] : G.find.matches(e, t)
            },
            dir: function(e, i, n) {
                for (var r = [], s = e[i]; s && 9 !== s.nodeType && (n === t || 1 !== s.nodeType || !G(s).is(n));) 1 === s.nodeType && r.push(s), s = s[i];
                return r
            },
            sibling: function(e, t) {
                for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
                return i
            }
        });
        var Rt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            Ft = / jQuery\d+="(?:null|\d+)"/g,
            Lt = /^\s+/,
            Wt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Bt = /<([\w:]+)/,
            qt = /<tbody/i,
            Yt = /<|&#?\w+;/,
            Ut = /<(?:script|style|link)/i,
            Kt = /<(?:script|object|embed|option|style)/i,
            Xt = new RegExp("<(?:" + Rt + ")[\\s/>]", "i"),
            Vt = /^(?:checkbox|radio)$/,
            Jt = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Qt = /\/(java|ecma)script/i,
            Gt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
            Zt = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                area: [1, "<map>", "</map>"],
                _default: [0, "", ""]
            },
            ei = c(L),
            ti = ei.appendChild(L.createElement("div"));
        Zt.optgroup = Zt.option, Zt.tbody = Zt.tfoot = Zt.colgroup = Zt.caption = Zt.thead, Zt.th = Zt.td, G.support.htmlSerialize || (Zt._default = [1, "X<div>", "</div>"]), G.fn.extend({
                text: function(e) {
                    return G.access(this, function(e) {
                        return e === t ? G.text(this) : this.empty().append((this[0] && this[0].ownerDocument || L).createTextNode(e))
                    }, null, e, arguments.length)
                },
                wrapAll: function(e) {
                    if (G.isFunction(e)) return this.each(function(t) {
                        G(this).wrapAll(e.call(this, t))
                    });
                    if (this[0]) {
                        var t = G(e, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                            for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                            return e
                        }).append(this)
                    }
                    return this
                },
                wrapInner: function(e) {
                    return this.each(G.isFunction(e) ? function(t) {
                        G(this).wrapInner(e.call(this, t))
                    } : function() {
                        var t = G(this),
                            i = t.contents();
                        i.length ? i.wrapAll(e) : t.append(e)
                    })
                },
                wrap: function(e) {
                    var t = G.isFunction(e);
                    return this.each(function(i) {
                        G(this).wrapAll(t ? e.call(this, i) : e)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        G.nodeName(this, "body") || G(this).replaceWith(this.childNodes)
                    }).end()
                },
                append: function() {
                    return this.domManip(arguments, !0, function(e) {
                        (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(e)
                    })
                },
                prepend: function() {
                    return this.domManip(arguments, !0, function(e) {
                        (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(e, this.firstChild)
                    })
                },
                before: function() {
                    if (!o(this[0])) return this.domManip(arguments, !1, function(e) {
                        this.parentNode.insertBefore(e, this)
                    });
                    if (arguments.length) {
                        var e = G.clean(arguments);
                        return this.pushStack(G.merge(e, this), "before", this.selector)
                    }
                },
                after: function() {
                    if (!o(this[0])) return this.domManip(arguments, !1, function(e) {
                        this.parentNode.insertBefore(e, this.nextSibling)
                    });
                    if (arguments.length) {
                        var e = G.clean(arguments);
                        return this.pushStack(G.merge(this, e), "after", this.selector)
                    }
                },
                remove: function(e, t) {
                    for (var i, n = 0; null != (i = this[n]); n++)(!e || G.filter(e, [i]).length) && (t || 1 !== i.nodeType || (G.cleanData(i.getElementsByTagName("*")), G.cleanData([i])), i.parentNode && i.parentNode.removeChild(i));
                    return this
                },
                empty: function() {
                    for (var e, t = 0; null != (e = this[t]); t++)
                        for (1 === e.nodeType && G.cleanData(e.getElementsByTagName("*")); e.firstChild;) e.removeChild(e.firstChild);
                    return this
                },
                clone: function(e, t) {
                    return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                        return G.clone(this, e, t)
                    })
                },
                html: function(e) {
                    return G.access(this, function(e) {
                        var i = this[0] || {},
                            n = 0,
                            r = this.length;
                        if (e === t) return 1 === i.nodeType ? i.innerHTML.replace(Ft, "") : t;
                        if (!("string" != typeof e || Ut.test(e) || !G.support.htmlSerialize && Xt.test(e) || !G.support.leadingWhitespace && Lt.test(e) || Zt[(Bt.exec(e) || ["", ""])[1].toLowerCase()])) {
                            e = e.replace(Wt, "<$1></$2>");
                            try {
                                for (; r > n; n++) i = this[n] || {}, 1 === i.nodeType && (G.cleanData(i.getElementsByTagName("*")), i.innerHTML = e);
                                i = 0
                            } catch (s) {}
                        }
                        i && this.empty().append(e)
                    }, null, e, arguments.length)
                },
                replaceWith: function(e) {
                    return o(this[0]) ? this.length ? this.pushStack(G(G.isFunction(e) ? e() : e), "replaceWith", e) : this : G.isFunction(e) ? this.each(function(t) {
                        var i = G(this),
                            n = i.html();
                        i.replaceWith(e.call(this, t, n))
                    }) : ("string" != typeof e && (e = G(e).detach()), this.each(function() {
                        var t = this.nextSibling,
                            i = this.parentNode;
                        G(this).remove(), t ? G(t).before(e) : G(i).append(e)
                    }))
                },
                detach: function(e) {
                    return this.remove(e, !0)
                },
                domManip: function(e, i, n) {
                    e = [].concat.apply([], e);
                    var r, s, a, o, l = 0,
                        u = e[0],
                        c = [],
                        d = this.length;
                    if (!G.support.checkClone && d > 1 && "string" == typeof u && Jt.test(u)) return this.each(function() {
                        G(this).domManip(e, i, n)
                    });
                    if (G.isFunction(u)) return this.each(function(r) {
                        var s = G(this);
                        e[0] = u.call(this, r, i ? s.html() : t), s.domManip(e, i, n)
                    });
                    if (this[0]) {
                        if (r = G.buildFragment(e, this, c), a = r.fragment, s = a.firstChild, 1 === a.childNodes.length && (a = s), s)
                            for (i = i && G.nodeName(s, "tr"), o = r.cacheable || d - 1; d > l; l++) n.call(i && G.nodeName(this[l], "table") ? h(this[l], "tbody") : this[l], l === o ? a : G.clone(a, !0, !0));
                        a = s = null, c.length && G.each(c, function(e, t) {
                            t.src ? G.ajax ? G.ajax({
                                url: t.src,
                                type: "GET",
                                dataType: "script",
                                async: !1,
                                global: !1,
                                "throws": !0
                            }) : G.error("no ajax") : G.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Gt, "")), t.parentNode && t.parentNode.removeChild(t)
                        })
                    }
                    return this
                }
            }), G.buildFragment = function(e, i, n) {
                var r, s, a, o = e[0];
                return i = i || L, i = !i.nodeType && i[0] || i, i = i.ownerDocument || i, !(1 === e.length && "string" == typeof o && o.length < 512 && i === L && "<" === o.charAt(0)) || Kt.test(o) || !G.support.checkClone && Jt.test(o) || !G.support.html5Clone && Xt.test(o) || (s = !0, r = G.fragments[o], a = r !== t), r || (r = i.createDocumentFragment(), G.clean(e, i, r, n), s && (G.fragments[o] = a && r)), {
                    fragment: r,
                    cacheable: s
                }
            }, G.fragments = {}, G.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(e, t) {
                G.fn[e] = function(i) {
                    var n, r = 0,
                        s = [],
                        a = G(i),
                        o = a.length,
                        l = 1 === this.length && this[0].parentNode;
                    if ((null == l || l && 11 === l.nodeType && 1 === l.childNodes.length) && 1 === o) return a[t](this[0]), this;
                    for (; o > r; r++) n = (r > 0 ? this.clone(!0) : this).get(), G(a[r])[t](n), s = s.concat(n);
                    return this.pushStack(s, e, a.selector)
                }
            }), G.extend({
                clone: function(e, t, i) {
                    var n, r, s, a;
                    if (G.support.html5Clone || G.isXMLDoc(e) || !Xt.test("<" + e.nodeName + ">") ? a = e.cloneNode(!0) : (ti.innerHTML = e.outerHTML, ti.removeChild(a = ti.firstChild)), !(G.support.noCloneEvent && G.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || G.isXMLDoc(e)))
                        for (p(e, a), n = f(e), r = f(a), s = 0; n[s]; ++s) r[s] && p(n[s], r[s]);
                    if (t && (d(e, a), i))
                        for (n = f(e), r = f(a), s = 0; n[s]; ++s) d(n[s], r[s]);
                    return n = r = null, a
                },
                clean: function(e, t, i, n) {
                    var r, s, a, o, l, u, h, d, p, f, m, v = t === L && ei,
                        y = [];
                    for (t && "undefined" != typeof t.createDocumentFragment || (t = L), r = 0; null != (a = e[r]); r++)
                        if ("number" == typeof a && (a += ""), a) {
                            if ("string" == typeof a)
                                if (Yt.test(a)) {
                                    for (v = v || c(t), h = t.createElement("div"), v.appendChild(h), a = a.replace(Wt, "<$1></$2>"), o = (Bt.exec(a) || ["", ""])[1].toLowerCase(), l = Zt[o] || Zt._default, u = l[0], h.innerHTML = l[1] + a + l[2]; u--;) h = h.lastChild;
                                    if (!G.support.tbody)
                                        for (d = qt.test(a), p = "table" !== o || d ? "<table>" !== l[1] || d ? [] : h.childNodes : h.firstChild && h.firstChild.childNodes, s = p.length - 1; s >= 0; --s) G.nodeName(p[s], "tbody") && !p[s].childNodes.length && p[s].parentNode.removeChild(p[s]);
                                    !G.support.leadingWhitespace && Lt.test(a) && h.insertBefore(t.createTextNode(Lt.exec(a)[0]), h.firstChild), a = h.childNodes, h.parentNode.removeChild(h)
                                } else a = t.createTextNode(a);
                            a.nodeType ? y.push(a) : G.merge(y, a)
                        }
                    if (h && (a = h = v = null), !G.support.appendChecked)
                        for (r = 0; null != (a = y[r]); r++) G.nodeName(a, "input") ? g(a) : "undefined" != typeof a.getElementsByTagName && G.grep(a.getElementsByTagName("input"), g);
                    if (i)
                        for (f = function(e) {
                                return !e.type || Qt.test(e.type) ? n ? n.push(e.parentNode ? e.parentNode.removeChild(e) : e) : i.appendChild(e) : void 0
                            }, r = 0; null != (a = y[r]); r++) G.nodeName(a, "script") && f(a) || (i.appendChild(a), "undefined" != typeof a.getElementsByTagName && (m = G.grep(G.merge([], a.getElementsByTagName("script")), f), y.splice.apply(y, [r + 1, 0].concat(m)), r += m.length));
                    return y
                },
                cleanData: function(e, t) {
                    for (var i, n, r, s, a = 0, o = G.expando, l = G.cache, u = G.support.deleteExpando, c = G.event.special; null != (r = e[a]); a++)
                        if ((t || G.acceptData(r)) && (n = r[o], i = n && l[n])) {
                            if (i.events)
                                for (s in i.events) c[s] ? G.event.remove(r, s) : G.removeEvent(r, s, i.handle);
                            l[n] && (delete l[n], u ? delete r[o] : r.removeAttribute ? r.removeAttribute(o) : r[o] = null, G.deletedIds.push(n))
                        }
                }
            }),
            function() {
                var e, t;
                G.uaMatch = function(e) {
                    e = e.toLowerCase();
                    var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
                    return {
                        browser: t[1] || "",
                        version: t[2] || "0"
                    }
                }, e = G.uaMatch(B.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), G.browser = t, G.sub = function() {
                    function e(t, i) {
                        return new e.fn.init(t, i)
                    }
                    G.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function(i, n) {
                        return n && n instanceof G && !(n instanceof e) && (n = e(n)), G.fn.init.call(this, i, n, t)
                    }, e.fn.init.prototype = e.fn;
                    var t = e(L);
                    return e
                }
            }();
        var ii, ni, ri, si = /alpha\([^)]*\)/i,
            ai = /opacity=([^)]*)/,
            oi = /^(top|right|bottom|left)$/,
            li = /^(none|table(?!-c[ea]).+)/,
            ui = /^margin/,
            ci = new RegExp("^(" + Z + ")(.*)$", "i"),
            hi = new RegExp("^(" + Z + ")(?!px)[a-z%]+$", "i"),
            di = new RegExp("^([-+])=(" + Z + ")", "i"),
            pi = {
                BODY: "block"
            },
            fi = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            gi = {
                letterSpacing: 0,
                fontWeight: 400
            },
            mi = ["Top", "Right", "Bottom", "Left"],
            vi = ["Webkit", "O", "Moz", "ms"],
            yi = G.fn.toggle;
        G.fn.extend({
            css: function(e, i) {
                return G.access(this, function(e, i, n) {
                    return n !== t ? G.style(e, i, n) : G.css(e, i)
                }, e, i, arguments.length > 1)
            },
            show: function() {
                return y(this, !0)
            },
            hide: function() {
                return y(this)
            },
            toggle: function(e, t) {
                var i = "boolean" == typeof e;
                return G.isFunction(e) && G.isFunction(t) ? yi.apply(this, arguments) : this.each(function() {
                    (i ? e : v(this)) ? G(this).show(): G(this).hide()
                })
            }
        }), G.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var i = ii(e, "opacity");
                            return "" === i ? "1" : i
                        }
                    }
                }
            },
            cssNumber: {
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": G.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(e, i, n, r) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var s, a, o, l = G.camelCase(i),
                        u = e.style;
                    if (i = G.cssProps[l] || (G.cssProps[l] = m(u, l)), o = G.cssHooks[i] || G.cssHooks[l], n === t) return o && "get" in o && (s = o.get(e, !1, r)) !== t ? s : u[i];
                    if (a = typeof n, "string" === a && (s = di.exec(n)) && (n = (s[1] + 1) * s[2] + parseFloat(G.css(e, i)), a = "number"), !(null == n || "number" === a && isNaN(n) || ("number" !== a || G.cssNumber[l] || (n += "px"), o && "set" in o && (n = o.set(e, n, r)) === t))) try {
                        u[i] = n
                    } catch (c) {}
                }
            },
            css: function(e, i, n, r) {
                var s, a, o, l = G.camelCase(i);
                return i = G.cssProps[l] || (G.cssProps[l] = m(e.style, l)), o = G.cssHooks[i] || G.cssHooks[l], o && "get" in o && (s = o.get(e, !0, r)), s === t && (s = ii(e, i)), "normal" === s && i in gi && (s = gi[i]), n || r !== t ? (a = parseFloat(s), n || G.isNumeric(a) ? a || 0 : s) : s
            },
            swap: function(e, t, i) {
                var n, r, s = {};
                for (r in t) s[r] = e.style[r], e.style[r] = t[r];
                n = i.call(e);
                for (r in t) e.style[r] = s[r];
                return n
            }
        }), e.getComputedStyle ? ii = function(t, i) {
            var n, r, s, a, o = e.getComputedStyle(t, null),
                l = t.style;
            return o && (n = o.getPropertyValue(i) || o[i], "" !== n || G.contains(t.ownerDocument, t) || (n = G.style(t, i)), hi.test(n) && ui.test(i) && (r = l.width, s = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = n, n = o.width, l.width = r, l.minWidth = s, l.maxWidth = a)), n
        } : L.documentElement.currentStyle && (ii = function(e, t) {
            var i, n, r = e.currentStyle && e.currentStyle[t],
                s = e.style;
            return null == r && s && s[t] && (r = s[t]), hi.test(r) && !oi.test(t) && (i = s.left, n = e.runtimeStyle && e.runtimeStyle.left, n && (e.runtimeStyle.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : r, r = s.pixelLeft + "px", s.left = i, n && (e.runtimeStyle.left = n)), "" === r ? "auto" : r
        }), G.each(["height", "width"], function(e, t) {
            G.cssHooks[t] = {
                get: function(e, i, n) {
                    return i ? 0 === e.offsetWidth && li.test(ii(e, "display")) ? G.swap(e, fi, function() {
                        return x(e, t, n)
                    }) : x(e, t, n) : void 0
                },
                set: function(e, i, n) {
                    return b(e, i, n ? _(e, t, n, G.support.boxSizing && "border-box" === G.css(e, "boxSizing")) : 0)
                }
            }
        }), G.support.opacity || (G.cssHooks.opacity = {
            get: function(e, t) {
                return ai.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            },
            set: function(e, t) {
                var i = e.style,
                    n = e.currentStyle,
                    r = G.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                    s = n && n.filter || i.filter || "";
                i.zoom = 1, t >= 1 && "" === G.trim(s.replace(si, "")) && i.removeAttribute && (i.removeAttribute("filter"), n && !n.filter) || (i.filter = si.test(s) ? s.replace(si, r) : s + " " + r)
            }
        }), G(function() {
            G.support.reliableMarginRight || (G.cssHooks.marginRight = {
                get: function(e, t) {
                    return G.swap(e, {
                        display: "inline-block"
                    }, function() {
                        return t ? ii(e, "marginRight") : void 0
                    })
                }
            }), !G.support.pixelPosition && G.fn.position && G.each(["top", "left"], function(e, t) {
                G.cssHooks[t] = {
                    get: function(e, i) {
                        if (i) {
                            var n = ii(e, t);
                            return hi.test(n) ? G(e).position()[t] + "px" : n
                        }
                    }
                }
            })
        }), G.expr && G.expr.filters && (G.expr.filters.hidden = function(e) {
            return 0 === e.offsetWidth && 0 === e.offsetHeight || !G.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ii(e, "display"))
        }, G.expr.filters.visible = function(e) {
            return !G.expr.filters.hidden(e)
        }), G.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            G.cssHooks[e + t] = {
                expand: function(i) {
                    var n, r = "string" == typeof i ? i.split(" ") : [i],
                        s = {};
                    for (n = 0; 4 > n; n++) s[e + mi[n] + t] = r[n] || r[n - 2] || r[0];
                    return s
                }
            }, ui.test(e) || (G.cssHooks[e + t].set = b)
        });
        var bi = /%20/g,
            _i = /\[\]$/,
            xi = /\r?\n/g,
            wi = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
            ki = /^(?:select|textarea)/i;
        G.fn.extend({
            serialize: function() {
                return G.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    return this.elements ? G.makeArray(this.elements) : this
                }).filter(function() {
                    return this.name && !this.disabled && (this.checked || ki.test(this.nodeName) || wi.test(this.type))
                }).map(function(e, t) {
                    var i = G(this).val();
                    return null == i ? null : G.isArray(i) ? G.map(i, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(xi, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: i.replace(xi, "\r\n")
                    }
                }).get()
            }
        }), G.param = function(e, i) {
            var n, r = [],
                s = function(e, t) {
                    t = G.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
            if (i === t && (i = G.ajaxSettings && G.ajaxSettings.traditional), G.isArray(e) || e.jquery && !G.isPlainObject(e)) G.each(e, function() {
                s(this.name, this.value)
            });
            else
                for (n in e) k(n, e[n], i, s);
            return r.join("&").replace(bi, "+")
        };
        var Di, Ci, Ti = /#.*$/,
            Ei = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Si = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
            Ni = /^(?:GET|HEAD)$/,
            Mi = /^\/\//,
            Ai = /\?/,
            Ii = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            ji = /([?&])_=[^&]*/,
            Pi = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
            Oi = G.fn.load,
            zi = {},
            $i = {},
            Hi = ["*/"] + ["*"];
        try {
            Ci = W.href
        } catch (Ri) {
            Ci = L.createElement("a"), Ci.href = "", Ci = Ci.href
        }
        Di = Pi.exec(Ci.toLowerCase()) || [], G.fn.load = function(e, i, n) {
            if ("string" != typeof e && Oi) return Oi.apply(this, arguments);
            if (!this.length) return this;
            var r, s, a, o = this,
                l = e.indexOf(" ");
            return l >= 0 && (r = e.slice(l, e.length), e = e.slice(0, l)), G.isFunction(i) ? (n = i, i = t) : i && "object" == typeof i && (s = "POST"), G.ajax({
                url: e,
                type: s,
                dataType: "html",
                data: i,
                complete: function(e, t) {
                    n && o.each(n, a || [e.responseText, t, e])
                }
            }).done(function(e) {
                a = arguments, o.html(r ? G("<div>").append(e.replace(Ii, "")).find(r) : e)
            }), this
        }, G.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
            G.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), G.each(["get", "post"], function(e, i) {
            G[i] = function(e, n, r, s) {
                return G.isFunction(n) && (s = s || r, r = n, n = t), G.ajax({
                    type: i,
                    url: e,
                    data: n,
                    success: r,
                    dataType: s
                })
            }
        }), G.extend({
            getScript: function(e, i) {
                return G.get(e, t, i, "script")
            },
            getJSON: function(e, t, i) {
                return G.get(e, t, i, "json")
            },
            ajaxSetup: function(e, t) {
                return t ? T(e, G.ajaxSettings) : (t = e, e = G.ajaxSettings), T(e, t), e
            },
            ajaxSettings: {
                url: Ci,
                isLocal: Si.test(Di[1]),
                global: !0,
                type: "GET",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                processData: !0,
                async: !0,
                accepts: {
                    xml: "application/xml, text/xml",
                    html: "text/html",
                    text: "text/plain",
                    json: "application/json, text/javascript",
                    "*": Hi
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText"
                },
                converters: {
                    "* text": e.String,
                    "text html": !0,
                    "text json": G.parseJSON,
                    "text xml": G.parseXML
                },
                flatOptions: {
                    context: !0,
                    url: !0
                }
            },
            ajaxPrefilter: D(zi),
            ajaxTransport: D($i),
            ajax: function(e, i) {
                function n(e, i, n, a) {
                    var u, h, y, b, x, k = i;
                    2 !== _ && (_ = 2, l && clearTimeout(l), o = t, s = a || "", w.readyState = e > 0 ? 4 : 0, n && (b = E(d, w, n)), e >= 200 && 300 > e || 304 === e ? (d.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (G.lastModified[r] = x), x = w.getResponseHeader("Etag"), x && (G.etag[r] = x)), 304 === e ? (k = "notmodified", u = !0) : (u = S(d, b), k = u.state, h = u.data, y = u.error, u = !y)) : (y = k, (!k || e) && (k = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (i || k) + "", u ? g.resolveWith(p, [h, k, w]) : g.rejectWith(p, [w, k, y]), w.statusCode(v), v = t, c && f.trigger("ajax" + (u ? "Success" : "Error"), [w, d, u ? h : y]), m.fireWith(p, [w, k]), c && (f.trigger("ajaxComplete", [w, d]), --G.active || G.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (i = e, e = t), i = i || {};
                var r, s, a, o, l, u, c, h, d = G.ajaxSetup({}, i),
                    p = d.context || d,
                    f = p !== d && (p.nodeType || p instanceof G) ? G(p) : G.event,
                    g = G.Deferred(),
                    m = G.Callbacks("once memory"),
                    v = d.statusCode || {},
                    y = {},
                    b = {},
                    _ = 0,
                    x = "canceled",
                    w = {
                        readyState: 0,
                        setRequestHeader: function(e, t) {
                            if (!_) {
                                var i = e.toLowerCase();
                                e = b[i] = b[i] || e, y[e] = t
                            }
                            return this
                        },
                        getAllResponseHeaders: function() {
                            return 2 === _ ? s : null
                        },
                        getResponseHeader: function(e) {
                            var i;
                            if (2 === _) {
                                if (!a)
                                    for (a = {}; i = Ei.exec(s);) a[i[1].toLowerCase()] = i[2];
                                i = a[e.toLowerCase()]
                            }
                            return i === t ? null : i
                        },
                        overrideMimeType: function(e) {
                            return _ || (d.mimeType = e), this
                        },
                        abort: function(e) {
                            return e = e || x, o && o.abort(e), n(0, e), this
                        }
                    };
                if (g.promise(w), w.success = w.done, w.error = w.fail, w.complete = m.add, w.statusCode = function(e) {
                        if (e) {
                            var t;
                            if (2 > _)
                                for (t in e) v[t] = [v[t], e[t]];
                            else t = e[w.status], w.always(t)
                        }
                        return this
                    }, d.url = ((e || d.url) + "").replace(Ti, "").replace(Mi, Di[1] + "//"), d.dataTypes = G.trim(d.dataType || "*").toLowerCase().split(tt), null == d.crossDomain && (u = Pi.exec(d.url.toLowerCase()), d.crossDomain = !(!u || u[1] === Di[1] && u[2] === Di[2] && (u[3] || ("http:" === u[1] ? 80 : 443)) == (Di[3] || ("http:" === Di[1] ? 80 : 443)))), d.data && d.processData && "string" != typeof d.data && (d.data = G.param(d.data, d.traditional)), C(zi, d, i, w), 2 === _) return w;
                if (c = d.global, d.type = d.type.toUpperCase(), d.hasContent = !Ni.test(d.type), c && 0 === G.active++ && G.event.trigger("ajaxStart"), !d.hasContent && (d.data && (d.url += (Ai.test(d.url) ? "&" : "?") + d.data, delete d.data), r = d.url, d.cache === !1)) {
                    var k = G.now(),
                        D = d.url.replace(ji, "$1_=" + k);
                    d.url = D + (D === d.url ? (Ai.test(d.url) ? "&" : "?") + "_=" + k : "")
                }(d.data && d.hasContent && d.contentType !== !1 || i.contentType) && w.setRequestHeader("Content-Type", d.contentType), d.ifModified && (r = r || d.url, G.lastModified[r] && w.setRequestHeader("If-Modified-Since", G.lastModified[r]), G.etag[r] && w.setRequestHeader("If-None-Match", G.etag[r])), w.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Hi + "; q=0.01" : "") : d.accepts["*"]);
                for (h in d.headers) w.setRequestHeader(h, d.headers[h]);
                if (d.beforeSend && (d.beforeSend.call(p, w, d) === !1 || 2 === _)) return w.abort();
                x = "abort";
                for (h in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) w[h](d[h]);
                if (o = C($i, d, i, w)) {
                    w.readyState = 1, c && f.trigger("ajaxSend", [w, d]), d.async && d.timeout > 0 && (l = setTimeout(function() {
                        w.abort("timeout")
                    }, d.timeout));
                    try {
                        _ = 1, o.send(y, n)
                    } catch (T) {
                        if (!(2 > _)) throw T;
                        n(-1, T)
                    }
                } else n(-1, "No Transport");
                return w
            },
            active: 0,
            lastModified: {},
            etag: {}
        });
        var Fi = [],
            Li = /\?/,
            Wi = /(=)\?(?=&|$)|\?\?/,
            Bi = G.now();
        G.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Fi.pop() || G.expando + "_" + Bi++;
                return this[e] = !0, e
            }
        }), G.ajaxPrefilter("json jsonp", function(i, n, r) {
            var s, a, o, l = i.data,
                u = i.url,
                c = i.jsonp !== !1,
                h = c && Wi.test(u),
                d = c && !h && "string" == typeof l && !(i.contentType || "").indexOf("application/x-www-form-urlencoded") && Wi.test(l);
            return "jsonp" === i.dataTypes[0] || h || d ? (s = i.jsonpCallback = G.isFunction(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback, a = e[s], h ? i.url = u.replace(Wi, "$1" + s) : d ? i.data = l.replace(Wi, "$1" + s) : c && (i.url += (Li.test(u) ? "&" : "?") + i.jsonp + "=" + s), i.converters["script json"] = function() {
                return o || G.error(s + " was not called"), o[0]
            }, i.dataTypes[0] = "json", e[s] = function() {
                o = arguments
            }, r.always(function() {
                e[s] = a, i[s] && (i.jsonpCallback = n.jsonpCallback, Fi.push(s)), o && G.isFunction(a) && a(o[0]), o = a = t
            }), "script") : void 0
        }), G.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /javascript|ecmascript/
            },
            converters: {
                "text script": function(e) {
                    return G.globalEval(e), e
                }
            }
        }), G.ajaxPrefilter("script", function(e) {
            e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
        }), G.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var i, n = L.head || L.getElementsByTagName("head")[0] || L.documentElement;
                return {
                    send: function(r, s) {
                        i = L.createElement("script"), i.async = "async", e.scriptCharset && (i.charset = e.scriptCharset), i.src = e.url, i.onload = i.onreadystatechange = function(e, r) {
                            (r || !i.readyState || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = null, n && i.parentNode && n.removeChild(i), i = t, r || s(200, "success"))
                        }, n.insertBefore(i, n.firstChild)
                    },
                    abort: function() {
                        i && i.onload(0, 1)
                    }
                }
            }
        });
        var qi, Yi = e.ActiveXObject ? function() {
                for (var e in qi) qi[e](0, 1)
            } : !1,
            Ui = 0;
        G.ajaxSettings.xhr = e.ActiveXObject ? function() {
                return !this.isLocal && N() || M()
            } : N,
            function(e) {
                G.extend(G.support, {
                    ajax: !!e,
                    cors: !!e && "withCredentials" in e
                })
            }(G.ajaxSettings.xhr()), G.support.ajax && G.ajaxTransport(function(i) {
                if (!i.crossDomain || G.support.cors) {
                    var n;
                    return {
                        send: function(r, s) {
                            var a, o, l = i.xhr();
                            if (i.username ? l.open(i.type, i.url, i.async, i.username, i.password) : l.open(i.type, i.url, i.async), i.xhrFields)
                                for (o in i.xhrFields) l[o] = i.xhrFields[o];
                            i.mimeType && l.overrideMimeType && l.overrideMimeType(i.mimeType), i.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                            try {
                                for (o in r) l.setRequestHeader(o, r[o])
                            } catch (u) {}
                            l.send(i.hasContent && i.data || null), n = function(e, r) {
                                var o, u, c, h, d;
                                try {
                                    if (n && (r || 4 === l.readyState))
                                        if (n = t, a && (l.onreadystatechange = G.noop, Yi && delete qi[a]), r) 4 !== l.readyState && l.abort();
                                        else {
                                            o = l.status, c = l.getAllResponseHeaders(), h = {}, d = l.responseXML, d && d.documentElement && (h.xml = d);
                                            try {
                                                h.text = l.responseText
                                            } catch (p) {}
                                            try {
                                                u = l.statusText
                                            } catch (p) {
                                                u = ""
                                            }
                                            o || !i.isLocal || i.crossDomain ? 1223 === o && (o = 204) : o = h.text ? 200 : 404
                                        }
                                } catch (f) {
                                    r || s(-1, f)
                                }
                                h && s(o, u, h, c)
                            }, i.async ? 4 === l.readyState ? setTimeout(n, 0) : (a = ++Ui, Yi && (qi || (qi = {}, G(e).unload(Yi)), qi[a] = n), l.onreadystatechange = n) : n()
                        },
                        abort: function() {
                            n && n(0, 1)
                        }
                    }
                }
            });
        var Ki, Xi, Vi = /^(?:toggle|show|hide)$/,
            Ji = new RegExp("^(?:([-+])=|)(" + Z + ")([a-z%]*)$", "i"),
            Qi = /queueHooks$/,
            Gi = [O],
            Zi = {
                "*": [function(e, t) {
                    var i, n, r = this.createTween(e, t),
                        s = Ji.exec(t),
                        a = r.cur(),
                        o = +a || 0,
                        l = 1,
                        u = 20;
                    if (s) {
                        if (i = +s[2], n = s[3] || (G.cssNumber[e] ? "" : "px"), "px" !== n && o) {
                            o = G.css(r.elem, e, !0) || i || 1;
                            do l = l || ".5", o /= l, G.style(r.elem, e, o + n); while (l !== (l = r.cur() / a) && 1 !== l && --u)
                        }
                        r.unit = n, r.start = o, r.end = s[1] ? o + (s[1] + 1) * i : i
                    }
                    return r
                }]
            };
        G.Animation = G.extend(j, {
            tweener: function(e, t) {
                G.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                for (var i, n = 0, r = e.length; r > n; n++) i = e[n], Zi[i] = Zi[i] || [], Zi[i].unshift(t)
            },
            prefilter: function(e, t) {
                t ? Gi.unshift(e) : Gi.push(e)
            }
        }), G.Tween = z, z.prototype = {
            constructor: z,
            init: function(e, t, i, n, r, s) {
                this.elem = e, this.prop = i, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), this.end = n, this.unit = s || (G.cssNumber[i] ? "" : "px")
            },
            cur: function() {
                var e = z.propHooks[this.prop];
                return e && e.get ? e.get(this) : z.propHooks._default.get(this)
            },
            run: function(e) {
                var t, i = z.propHooks[this.prop];
                return this.pos = t = this.options.duration ? G.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : z.propHooks._default.set(this), this
            }
        }, z.prototype.init.prototype = z.prototype, z.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = G.css(e.elem, e.prop, !1, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
                },
                set: function(e) {
                    G.fx.step[e.prop] ? G.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[G.cssProps[e.prop]] || G.cssHooks[e.prop]) ? G.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        }, z.propHooks.scrollTop = z.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, G.each(["toggle", "show", "hide"], function(e, t) {
            var i = G.fn[t];
            G.fn[t] = function(n, r, s) {
                return null == n || "boolean" == typeof n || !e && G.isFunction(n) && G.isFunction(r) ? i.apply(this, arguments) : this.animate($(t, !0), n, r, s)
            }
        }), G.fn.extend({
            fadeTo: function(e, t, i, n) {
                return this.filter(v).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, i, n)
            },
            animate: function(e, t, i, n) {
                var r = G.isEmptyObject(e),
                    s = G.speed(t, i, n),
                    a = function() {
                        var t = j(this, G.extend({}, e), s);
                        r && t.stop(!0)
                    };
                return r || s.queue === !1 ? this.each(a) : this.queue(s.queue, a)
            },
            stop: function(e, i, n) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = i, i = e, e = t), i && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        i = null != e && e + "queueHooks",
                        s = G.timers,
                        a = G._data(this);
                    if (i) a[i] && a[i].stop && r(a[i]);
                    else
                        for (i in a) a[i] && a[i].stop && Qi.test(i) && r(a[i]);
                    for (i = s.length; i--;) s[i].elem !== this || null != e && s[i].queue !== e || (s[i].anim.stop(n), t = !1, s.splice(i, 1));
                    (t || !n) && G.dequeue(this, e)
                })
            }
        }), G.each({
            slideDown: $("show"),
            slideUp: $("hide"),
            slideToggle: $("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            G.fn[e] = function(e, i, n) {
                return this.animate(t, e, i, n)
            }
        }), G.speed = function(e, t, i) {
            var n = e && "object" == typeof e ? G.extend({}, e) : {
                complete: i || !i && t || G.isFunction(e) && e,
                duration: e,
                easing: i && t || t && !G.isFunction(t) && t
            };
            return n.duration = G.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in G.fx.speeds ? G.fx.speeds[n.duration] : G.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                G.isFunction(n.old) && n.old.call(this), n.queue && G.dequeue(this, n.queue)
            }, n
        }, G.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }
        }, G.timers = [], G.fx = z.prototype.init, G.fx.tick = function() {
            var e, i = G.timers,
                n = 0;
            for (Ki = G.now(); n < i.length; n++) e = i[n], e() || i[n] !== e || i.splice(n--, 1);
            i.length || G.fx.stop(), Ki = t
        }, G.fx.timer = function(e) {
            e() && G.timers.push(e) && !Xi && (Xi = setInterval(G.fx.tick, G.fx.interval))
        }, G.fx.interval = 13, G.fx.stop = function() {
            clearInterval(Xi), Xi = null
        }, G.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, G.fx.step = {}, G.expr && G.expr.filters && (G.expr.filters.animated = function(e) {
            return G.grep(G.timers, function(t) {
                return e === t.elem
            }).length
        });
        var en = /^(?:body|html)$/i;
        G.fn.offset = function(e) {
            if (arguments.length) return e === t ? this : this.each(function(t) {
                G.offset.setOffset(this, e, t)
            });
            var i, n, r, s, a, o, l, u = {
                    top: 0,
                    left: 0
                },
                c = this[0],
                h = c && c.ownerDocument;
            if (h) return (n = h.body) === c ? G.offset.bodyOffset(c) : (i = h.documentElement, G.contains(i, c) ? ("undefined" != typeof c.getBoundingClientRect && (u = c.getBoundingClientRect()), r = H(h), s = i.clientTop || n.clientTop || 0, a = i.clientLeft || n.clientLeft || 0, o = r.pageYOffset || i.scrollTop, l = r.pageXOffset || i.scrollLeft, {
                top: u.top + o - s,
                left: u.left + l - a
            }) : u)
        }, G.offset = {
            bodyOffset: function(e) {
                var t = e.offsetTop,
                    i = e.offsetLeft;
                return G.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(G.css(e, "marginTop")) || 0, i += parseFloat(G.css(e, "marginLeft")) || 0), {
                    top: t,
                    left: i
                }
            },
            setOffset: function(e, t, i) {
                var n = G.css(e, "position");
                "static" === n && (e.style.position = "relative");
                var r, s, a = G(e),
                    o = a.offset(),
                    l = G.css(e, "top"),
                    u = G.css(e, "left"),
                    c = ("absolute" === n || "fixed" === n) && G.inArray("auto", [l, u]) > -1,
                    h = {},
                    d = {};
                c ? (d = a.position(), r = d.top, s = d.left) : (r = parseFloat(l) || 0, s = parseFloat(u) || 0), G.isFunction(t) && (t = t.call(e, i, o)), null != t.top && (h.top = t.top - o.top + r), null != t.left && (h.left = t.left - o.left + s), "using" in t ? t.using.call(e, h) : a.css(h)
            }
        }, G.fn.extend({
            position: function() {
                if (this[0]) {
                    var e = this[0],
                        t = this.offsetParent(),
                        i = this.offset(),
                        n = en.test(t[0].nodeName) ? {
                            top: 0,
                            left: 0
                        } : t.offset();
                    return i.top -= parseFloat(G.css(e, "marginTop")) || 0, i.left -= parseFloat(G.css(e, "marginLeft")) || 0, n.top += parseFloat(G.css(t[0], "borderTopWidth")) || 0, n.left += parseFloat(G.css(t[0], "borderLeftWidth")) || 0, {
                        top: i.top - n.top,
                        left: i.left - n.left
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent || L.body; e && !en.test(e.nodeName) && "static" === G.css(e, "position");) e = e.offsetParent;
                    return e || L.body
                })
            }
        }), G.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, i) {
            var n = /Y/.test(i);
            G.fn[e] = function(r) {
                return G.access(this, function(e, r, s) {
                    var a = H(e);
                    return s === t ? a ? i in a ? a[i] : a.document.documentElement[r] : e[r] : void(a ? a.scrollTo(n ? G(a).scrollLeft() : s, n ? s : G(a).scrollTop()) : e[r] = s)
                }, e, r, arguments.length, null)
            }
        }), G.each({
            Height: "height",
            Width: "width"
        }, function(e, i) {
            G.each({
                padding: "inner" + e,
                content: i,
                "": "outer" + e
            }, function(n, r) {
                G.fn[r] = function(r, s) {
                    var a = arguments.length && (n || "boolean" != typeof r),
                        o = n || (r === !0 || s === !0 ? "margin" : "border");
                    return G.access(this, function(i, n, r) {
                        var s;
                        return G.isWindow(i) ? i.document.documentElement["client" + e] : 9 === i.nodeType ? (s = i.documentElement, Math.max(i.body["scroll" + e], s["scroll" + e], i.body["offset" + e], s["offset" + e], s["client" + e])) : r === t ? G.css(i, n, r, o) : G.style(i, n, r, o)
                    }, i, a ? r : t, a, null)
                }
            })
        }), e.jQuery = e.$ = G, "function" == typeof define && define.amd && define.amd.jQuery && define("SNB.lib.bundle.js", [], function() {
            return G
        })
    }(window),
    function(e, t) {
        function i(t, i) {
            var r, s, a, o = t.nodeName.toLowerCase();
            return "area" === o ? (r = t.parentNode, s = r.name, t.href && s && "map" === r.nodeName.toLowerCase() ? (a = e("img[usemap=#" + s + "]")[0], !!a && n(a)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && n(t)
        }

        function n(t) {
            return e.expr.filters.visible(t) && !e(t).parents().andSelf().filter(function() {
                return "hidden" === e.css(this, "visibility")
            }).length
        }
        var r = 0,
            s = /^ui-id-\d+$/;
        e.ui = e.ui || {}, e.ui.version || (e.extend(e.ui, {
            version: "1.9.2",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), e.fn.extend({
            _focus: e.fn.focus,
            focus: function(t, i) {
                return "number" == typeof t ? this.each(function() {
                    var n = this;
                    setTimeout(function() {
                        e(n).focus(), i && i.call(n)
                    }, t)
                }) : this._focus.apply(this, arguments)
            },
            scrollParent: function() {
                var t;
                return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
            },
            zIndex: function(i) {
                if (i !== t) return this.css("zIndex", i);
                if (this.length)
                    for (var n, r, s = e(this[0]); s.length && s[0] !== document;) {
                        if (n = s.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (r = parseInt(s.css("zIndex"), 10), !isNaN(r) && 0 !== r)) return r;
                        s = s.parent()
                    }
                return 0
            },
            uniqueId: function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++r)
                })
            },
            removeUniqueId: function() {
                return this.each(function() {
                    s.test(this.id) && e(this).removeAttr("id")
                })
            }
        }), e.extend(e.expr[":"], {
            data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
                return function(i) {
                    return !!e.data(i, t)
                }
            }) : function(t, i, n) {
                return !!e.data(t, n[3])
            },
            focusable: function(t) {
                return i(t, !isNaN(e.attr(t, "tabindex")))
            },
            tabbable: function(t) {
                var n = e.attr(t, "tabindex"),
                    r = isNaN(n);
                return (r || n >= 0) && i(t, !r)
            }
        }), e(function() {
            var t = document.body,
                i = t.appendChild(i = document.createElement("div"));
            i.offsetHeight, e.extend(i.style, {
                minHeight: "100px",
                height: "auto",
                padding: 0,
                borderWidth: 0
            }), e.support.minHeight = 100 === i.offsetHeight, e.support.selectstart = "onselectstart" in i, t.removeChild(i).style.display = "none"
        }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(i, n) {
            function r(t, i, n, r) {
                return e.each(s, function() {
                    i -= parseFloat(e.css(t, "padding" + this)) || 0, n && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), r && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
                }), i
            }
            var s = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
                a = n.toLowerCase(),
                o = {
                    innerWidth: e.fn.innerWidth,
                    innerHeight: e.fn.innerHeight,
                    outerWidth: e.fn.outerWidth,
                    outerHeight: e.fn.outerHeight
                };
            e.fn["inner" + n] = function(i) {
                return i === t ? o["inner" + n].call(this) : this.each(function() {
                    e(this).css(a, r(this, i) + "px")
                })
            }, e.fn["outer" + n] = function(t, i) {
                return "number" != typeof t ? o["outer" + n].call(this, t) : this.each(function() {
                    e(this).css(a, r(this, t, !0, i) + "px")
                })
            }
        }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
            return function(i) {
                return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
            }
        }(e.fn.removeData)), function() {
            var t = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
            e.ui.ie = t.length ? !0 : !1, e.ui.ie6 = 6 === parseFloat(t[1], 10)
        }(), e.fn.extend({
            disableSelection: function() {
                return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                    e.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            }
        }), e.extend(e.ui, {
            plugin: {
                add: function(t, i, n) {
                    var r, s = e.ui[t].prototype;
                    for (r in n) s.plugins[r] = s.plugins[r] || [], s.plugins[r].push([i, n[r]])
                },
                call: function(e, t, i) {
                    var n, r = e.plugins[t];
                    if (r && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
                        for (n = 0; n < r.length; n++) e.options[r[n][0]] && r[n][1].apply(e.element, i)
                }
            },
            contains: e.contains,
            hasScroll: function(t, i) {
                if ("hidden" === e(t).css("overflow")) return !1;
                var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                    r = !1;
                return t[n] > 0 ? !0 : (t[n] = 1, r = t[n] > 0, t[n] = 0, r)
            },
            isOverAxis: function(e, t, i) {
                return e > t && t + i > e
            },
            isOver: function(t, i, n, r, s, a) {
                return e.ui.isOverAxis(t, n, s) && e.ui.isOverAxis(i, r, a)
            }
        }))
    }(jQuery),
    function(e, t) {
        var i = 0,
            n = Array.prototype.slice,
            r = e.cleanData;
        e.cleanData = function(t) {
            for (var i, n = 0; null != (i = t[n]); n++) try {
                e(i).triggerHandler("remove")
            } catch (s) {}
            r(t)
        }, e.widget = function(t, i, n) {
            var r, s, a, o, l = t.split(".")[0];
            t = t.split(".")[1], r = l + "-" + t, n || (n = i, i = e.Widget), e.expr[":"][r.toLowerCase()] = function(t) {
                return !!e.data(t, r)
            }, e[l] = e[l] || {}, s = e[l][t], a = e[l][t] = function(e, t) {
                return this._createWidget ? void(arguments.length && this._createWidget(e, t)) : new a(e, t)
            }, e.extend(a, s, {
                version: n.version,
                _proto: e.extend({}, n),
                _childConstructors: []
            }), o = new i, o.options = e.widget.extend({}, o.options), e.each(n, function(t, r) {
                e.isFunction(r) && (n[t] = function() {
                    var e = function() {
                            return i.prototype[t].apply(this, arguments)
                        },
                        n = function(e) {
                            return i.prototype[t].apply(this, e)
                        };
                    return function() {
                        var t, i = this._super,
                            s = this._superApply;
                        return this._super = e, this._superApply = n, t = r.apply(this, arguments), this._super = i, this._superApply = s, t
                    }
                }())
            }), a.prototype = e.widget.extend(o, {
                widgetEventPrefix: s ? o.widgetEventPrefix : t
            }, n, {
                constructor: a,
                namespace: l,
                widgetName: t,
                widgetBaseClass: r,
                widgetFullName: r
            }), s ? (e.each(s._childConstructors, function(t, i) {
                var n = i.prototype;
                e.widget(n.namespace + "." + n.widgetName, a, i._proto)
            }), delete s._childConstructors) : i._childConstructors.push(a), e.widget.bridge(t, a)
        }, e.widget.extend = function(i) {
            for (var r, s, a = n.call(arguments, 1), o = 0, l = a.length; l > o; o++)
                for (r in a[o]) s = a[o][r], a[o].hasOwnProperty(r) && s !== t && (i[r] = e.isPlainObject(s) ? e.isPlainObject(i[r]) ? e.widget.extend({}, i[r], s) : e.widget.extend({}, s) : s);
            return i
        }, e.widget.bridge = function(i, r) {
            var s = r.prototype.widgetFullName || i;
            e.fn[i] = function(a) {
                var o = "string" == typeof a,
                    l = n.call(arguments, 1),
                    u = this;
                return a = !o && l.length ? e.widget.extend.apply(null, [a].concat(l)) : a, this.each(o ? function() {
                    var n, r = e.data(this, s);
                    return r ? e.isFunction(r[a]) && "_" !== a.charAt(0) ? (n = r[a].apply(r, l), n !== r && n !== t ? (u = n && n.jquery ? u.pushStack(n.get()) : n, !1) : void 0) : e.error("no such method '" + a + "' for " + i + " widget instance") : e.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + a + "'")
                } : function() {
                    var t = e.data(this, s);
                    t ? t.option(a || {})._init() : e.data(this, s, new r(a, this))
                }), u
            }
        }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(t, n) {
                n = e(n || this.defaultElement || this)[0], this.element = e(n), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), n !== this && (e.data(n, this.widgetName, this), e.data(n, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(e) {
                        e.target === n && this.destroy()
                    }
                }), this.document = e(n.style ? n.ownerDocument : n.document || n), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: e.noop,
            _getCreateEventData: e.noop,
            _create: e.noop,
            _init: e.noop,
            destroy: function() {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: e.noop,
            widget: function() {
                return this.element
            },
            option: function(i, n) {
                var r, s, a, o = i;
                if (0 === arguments.length) return e.widget.extend({}, this.options);
                if ("string" == typeof i)
                    if (o = {}, r = i.split("."), i = r.shift(), r.length) {
                        for (s = o[i] = e.widget.extend({}, this.options[i]), a = 0; a < r.length - 1; a++) s[r[a]] = s[r[a]] || {}, s = s[r[a]];
                        if (i = r.pop(), n === t) return s[i] === t ? null : s[i];
                        s[i] = n
                    } else {
                        if (n === t) return this.options[i] === t ? null : this.options[i];
                        o[i] = n
                    }
                return this._setOptions(o), this
            },
            _setOptions: function(e) {
                var t;
                for (t in e) this._setOption(t, e[t]);
                return this
            },
            _setOption: function(e, t) {
                return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
            },
            enable: function() {
                return this._setOption("disabled", !1)
            },
            disable: function() {
                return this._setOption("disabled", !0)
            },
            _on: function(t, i, n) {
                var r, s = this;
                "boolean" != typeof t && (n = i, i = t, t = !1), n ? (i = r = e(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, r = this.widget()), e.each(n, function(n, a) {
                    function o() {
                        return t || s.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? s[a] : a).apply(s, arguments) : void 0
                    }
                    "string" != typeof a && (o.guid = a.guid = a.guid || o.guid || e.guid++);
                    var l = n.match(/^(\w+)\s*(.*)$/),
                        u = l[1] + s.eventNamespace,
                        c = l[2];
                    c ? r.delegate(c, u, o) : i.bind(u, o)
                })
            },
            _off: function(e, t) {
                t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
            },
            _delay: function(e, t) {
                function i() {
                    return ("string" == typeof e ? n[e] : e).apply(n, arguments)
                }
                var n = this;
                return setTimeout(i, t || 0)
            },
            _hoverable: function(t) {
                this.hoverable = this.hoverable.add(t), this._on(t, {
                    mouseenter: function(t) {
                        e(t.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(t) {
                        e(t.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(t) {
                this.focusable = this.focusable.add(t), this._on(t, {
                    focusin: function(t) {
                        e(t.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(t) {
                        e(t.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(t, i, n) {
                var r, s, a = this.options[t];
                if (n = n || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], s = i.originalEvent)
                    for (r in s) r in i || (i[r] = s[r]);
                return this.element.trigger(i, n), !(e.isFunction(a) && a.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
            }
        }, e.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(t, i) {
            e.Widget.prototype["_" + t] = function(n, r, s) {
                "string" == typeof r && (r = {
                    effect: r
                });
                var a, o = r ? r === !0 || "number" == typeof r ? i : r.effect || i : t;
                r = r || {}, "number" == typeof r && (r = {
                    duration: r
                }), a = !e.isEmptyObject(r), r.complete = s, r.delay && n.delay(r.delay), a && e.effects && (e.effects.effect[o] || e.uiBackCompat !== !1 && e.effects[o]) ? n[t](r) : o !== t && n[o] ? n[o](r.duration, r.easing, s) : n.queue(function(i) {
                    e(this)[t](), s && s.call(n[0]), i()
                })
            }
        }), e.uiBackCompat !== !1 && (e.Widget.prototype._getCreateOptions = function() {
            return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
        })
    }(jQuery),
    function(e) {
        var t = !1;
        e(document).mouseup(function() {
            t = !1
        }), e.widget("ui.mouse", {
            version: "1.9.2",
            options: {
                cancel: "input,textarea,button,select,option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var t = this;
                this.element.bind("mousedown." + this.widgetName, function(e) {
                    return t._mouseDown(e)
                }).bind("click." + this.widgetName, function(i) {
                    return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
                }), this.started = !1
            },
            _mouseDestroy: function() {
                this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function(i) {
                if (!t) {
                    this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                    var n = this,
                        r = 1 === i.which,
                        s = "string" == typeof this.options.cancel && i.target.nodeName ? e(i.target).closest(this.options.cancel).length : !1;
                    return r && !s && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                        n.mouseDelayMet = !0
                    }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === e.data(i.target, this.widgetName + ".preventClickEvent") && e.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                        return n._mouseMove(e)
                    }, this._mouseUpDelegate = function(e) {
                        return n._mouseUp(e)
                    }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), t = !0, !0)) : !0
                }
            },
            _mouseMove: function(t) {
                return !e.ui.ie || document.documentMode >= 9 || t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
            },
            _mouseUp: function(t) {
                return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
            },
            _mouseDistanceMet: function(e) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function() {
                return this.mouseDelayMet
            },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() {
                return !0
            }
        })
    }(jQuery),
    function(e, t) {
        function i(e, t, i) {
            return [parseInt(e[0], 10) * (d.test(e[0]) ? t / 100 : 1), parseInt(e[1], 10) * (d.test(e[1]) ? i / 100 : 1)]
        }

        function n(t, i) {
            return parseInt(e.css(t, i), 10) || 0
        }
        e.ui = e.ui || {};
        var r, s = Math.max,
            a = Math.abs,
            o = Math.round,
            l = /left|center|right/,
            u = /top|center|bottom/,
            c = /[\+\-]\d+%?/,
            h = /^\w+/,
            d = /%$/,
            p = e.fn.position;
        e.position = {
                scrollbarWidth: function() {
                    if (r !== t) return r;
                    var i, n, s = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        a = s.children()[0];
                    return e("body").append(s), i = a.offsetWidth, s.css("overflow", "scroll"), n = a.offsetWidth, i === n && (n = s[0].clientWidth), s.remove(), r = i - n
                },
                getScrollInfo: function(t) {
                    var i = t.isWindow ? "" : t.element.css("overflow-x"),
                        n = t.isWindow ? "" : t.element.css("overflow-y"),
                        r = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
                        s = "scroll" === n || "auto" === n && t.height < t.element[0].scrollHeight;
                    return {
                        width: r ? e.position.scrollbarWidth() : 0,
                        height: s ? e.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function(t) {
                    var i = e(t || window),
                        n = e.isWindow(i[0]);
                    return {
                        element: i,
                        isWindow: n,
                        offset: i.offset() || {
                            left: 0,
                            top: 0
                        },
                        scrollLeft: i.scrollLeft(),
                        scrollTop: i.scrollTop(),
                        width: n ? i.width() : i.outerWidth(),
                        height: n ? i.height() : i.outerHeight()
                    }
                }
            }, e.fn.position = function(t) {
                if (!t || !t.of) return p.apply(this, arguments);
                t = e.extend({}, t);
                var r, d, f, g, m, v = e(t.of),
                    y = e.position.getWithinInfo(t.within),
                    b = e.position.getScrollInfo(y),
                    _ = v[0],
                    x = (t.collision || "flip").split(" "),
                    w = {};
                return 9 === _.nodeType ? (d = v.width(), f = v.height(), g = {
                    top: 0,
                    left: 0
                }) : e.isWindow(_) ? (d = v.width(), f = v.height(), g = {
                    top: v.scrollTop(),
                    left: v.scrollLeft()
                }) : _.preventDefault ? (t.at = "left top", d = f = 0, g = {
                    top: _.pageY,
                    left: _.pageX
                }) : (d = v.outerWidth(), f = v.outerHeight(), g = v.offset()), m = e.extend({}, g), e.each(["my", "at"], function() {
                    var e, i, n = (t[this] || "").split(" ");
                    1 === n.length && (n = l.test(n[0]) ? n.concat(["center"]) : u.test(n[0]) ? ["center"].concat(n) : ["center", "center"]), n[0] = l.test(n[0]) ? n[0] : "center", n[1] = u.test(n[1]) ? n[1] : "center", e = c.exec(n[0]), i = c.exec(n[1]), w[this] = [e ? e[0] : 0, i ? i[0] : 0], t[this] = [h.exec(n[0])[0], h.exec(n[1])[0]]
                }), 1 === x.length && (x[1] = x[0]), "right" === t.at[0] ? m.left += d : "center" === t.at[0] && (m.left += d / 2), "bottom" === t.at[1] ? m.top += f : "center" === t.at[1] && (m.top += f / 2), r = i(w.at, d, f), m.left += r[0], m.top += r[1], this.each(function() {
                    var l, u, c = e(this),
                        h = c.outerWidth(),
                        p = c.outerHeight(),
                        _ = n(this, "marginLeft"),
                        k = n(this, "marginTop"),
                        D = h + _ + n(this, "marginRight") + b.width,
                        C = p + k + n(this, "marginBottom") + b.height,
                        T = e.extend({}, m),
                        E = i(w.my, c.outerWidth(), c.outerHeight());
                    "right" === t.my[0] ? T.left -= h : "center" === t.my[0] && (T.left -= h / 2), "bottom" === t.my[1] ? T.top -= p : "center" === t.my[1] && (T.top -= p / 2), T.left += E[0], T.top += E[1], e.support.offsetFractions || (T.left = o(T.left), T.top = o(T.top)), l = {
                        marginLeft: _,
                        marginTop: k
                    }, e.each(["left", "top"], function(i, n) {
                        e.ui.position[x[i]] && e.ui.position[x[i]][n](T, {
                            targetWidth: d,
                            targetHeight: f,
                            elemWidth: h,
                            elemHeight: p,
                            collisionPosition: l,
                            collisionWidth: D,
                            collisionHeight: C,
                            offset: [r[0] + E[0], r[1] + E[1]],
                            my: t.my,
                            at: t.at,
                            within: y,
                            elem: c
                        })
                    }), e.fn.bgiframe && c.bgiframe(), t.using && (u = function(e) {
                        var i = g.left - T.left,
                            n = i + d - h,
                            r = g.top - T.top,
                            o = r + f - p,
                            l = {
                                target: {
                                    element: v,
                                    left: g.left,
                                    top: g.top,
                                    width: d,
                                    height: f
                                },
                                element: {
                                    element: c,
                                    left: T.left,
                                    top: T.top,
                                    width: h,
                                    height: p
                                },
                                horizontal: 0 > n ? "left" : i > 0 ? "right" : "center",
                                vertical: 0 > o ? "top" : r > 0 ? "bottom" : "middle"
                            };
                        h > d && a(i + n) < d && (l.horizontal = "center"), p > f && a(r + o) < f && (l.vertical = "middle"), l.important = s(a(i), a(n)) > s(a(r), a(o)) ? "horizontal" : "vertical", t.using.call(this, e, l)
                    }), c.offset(e.extend(T, {
                        using: u
                    }))
                })
            }, e.ui.position = {
                fit: {
                    left: function(e, t) {
                        var i, n = t.within,
                            r = n.isWindow ? n.scrollLeft : n.offset.left,
                            a = n.width,
                            o = e.left - t.collisionPosition.marginLeft,
                            l = r - o,
                            u = o + t.collisionWidth - a - r;
                        t.collisionWidth > a ? l > 0 && 0 >= u ? (i = e.left + l + t.collisionWidth - a - r, e.left += l - i) : e.left = u > 0 && 0 >= l ? r : l > u ? r + a - t.collisionWidth : r : l > 0 ? e.left += l : u > 0 ? e.left -= u : e.left = s(e.left - o, e.left)
                    },
                    top: function(e, t) {
                        var i, n = t.within,
                            r = n.isWindow ? n.scrollTop : n.offset.top,
                            a = t.within.height,
                            o = e.top - t.collisionPosition.marginTop,
                            l = r - o,
                            u = o + t.collisionHeight - a - r;
                        t.collisionHeight > a ? l > 0 && 0 >= u ? (i = e.top + l + t.collisionHeight - a - r, e.top += l - i) : e.top = u > 0 && 0 >= l ? r : l > u ? r + a - t.collisionHeight : r : l > 0 ? e.top += l : u > 0 ? e.top -= u : e.top = s(e.top - o, e.top)
                    }
                },
                flip: {
                    left: function(e, t) {
                        var i, n, r = t.within,
                            s = r.offset.left + r.scrollLeft,
                            o = r.width,
                            l = r.isWindow ? r.scrollLeft : r.offset.left,
                            u = e.left - t.collisionPosition.marginLeft,
                            c = u - l,
                            h = u + t.collisionWidth - o - l,
                            d = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                            p = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                            f = -2 * t.offset[0];
                        0 > c ? (i = e.left + d + p + f + t.collisionWidth - o - s, (0 > i || i < a(c)) && (e.left += d + p + f)) : h > 0 && (n = e.left - t.collisionPosition.marginLeft + d + p + f - l, (n > 0 || a(n) < h) && (e.left += d + p + f))
                    },
                    top: function(e, t) {
                        var i, n, r = t.within,
                            s = r.offset.top + r.scrollTop,
                            o = r.height,
                            l = r.isWindow ? r.scrollTop : r.offset.top,
                            u = e.top - t.collisionPosition.marginTop,
                            c = u - l,
                            h = u + t.collisionHeight - o - l,
                            d = "top" === t.my[1],
                            p = d ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                            f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                            g = -2 * t.offset[1];
                        0 > c ? (n = e.top + p + f + g + t.collisionHeight - o - s, e.top + p + f + g > c && (0 > n || n < a(c)) && (e.top += p + f + g)) : h > 0 && (i = e.top - t.collisionPosition.marginTop + p + f + g - l, e.top + p + f + g > h && (i > 0 || a(i) < h) && (e.top += p + f + g))
                    }
                },
                flipfit: {
                    left: function() {
                        e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
                    }
                }
            },
            function() {
                var t, i, n, r, s, a = document.getElementsByTagName("body")[0],
                    o = document.createElement("div");
                t = document.createElement(a ? "div" : "body"), n = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                }, a && e.extend(n, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
                for (s in n) t.style[s] = n[s];
                t.appendChild(o), i = a || document.documentElement, i.insertBefore(t, i.firstChild), o.style.cssText = "position: absolute; left: 10.7432222px;", r = e(o).offset().left, e.support.offsetFractions = r > 10 && 11 > r, t.innerHTML = "", i.removeChild(t)
            }(), e.uiBackCompat !== !1 && ! function(e) {
                var i = e.fn.position;
                e.fn.position = function(n) {
                    if (!n || !n.offset) return i.call(this, n);
                    var r = n.offset.split(" "),
                        s = n.at.split(" ");
                    return 1 === r.length && (r[1] = r[0]), /^\d/.test(r[0]) && (r[0] = "+" + r[0]), /^\d/.test(r[1]) && (r[1] = "+" + r[1]), 1 === s.length && (/left|center|right/.test(s[0]) ? s[1] = "center" : (s[1] = s[0], s[0] = "center")), i.call(this, e.extend(n, {
                        at: s[0] + r[0] + " " + s[1] + r[1],
                        offset: t
                    }))
                }
            }(jQuery)
    }(jQuery),
    function(e) {
        e.widget("ui.draggable", e.ui.mouse, {
            version: "1.9.2",
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1
            },
            _create: function() {
                "original" != this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
            },
            _destroy: function() {
                this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
            },
            _mouseCapture: function(t) {
                var i = this.options;
                return this.helper || i.disabled || e(t.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function() {
                    e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                        width: this.offsetWidth + "px",
                        height: this.offsetHeight + "px",
                        position: "absolute",
                        opacity: "0.001",
                        zIndex: 1e3
                    }).css(e(this).offset()).appendTo("body")
                }), !0) : !1)
            },
            _mouseStart: function(t) {
                var i = this.options;
                return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, e.extend(this.offset, {
                    click: {
                        left: t.pageX - this.offset.left,
                        top: t.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), i.containment && this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
            },
            _mouseDrag: function(t, i) {
                if (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                    var n = this._uiHash();
                    if (this._trigger("drag", t, n) === !1) return this._mouseUp({}), !1;
                    this.position = n.position
                }
                return this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px"), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
            },
            _mouseStop: function(t) {
                var i = !1;
                e.ui.ddmanager && !this.options.dropBehaviour && (i = e.ui.ddmanager.drop(this, t)), this.dropped && (i = this.dropped, this.dropped = !1);
                for (var n = this.element[0], r = !1; n && (n = n.parentNode);) n == document && (r = !0);
                if (!r && "original" === this.options.helper) return !1;
                if ("invalid" == this.options.revert && !i || "valid" == this.options.revert && i || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, i)) {
                    var s = this;
                    e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                        s._trigger("stop", t) !== !1 && s._clear()
                    })
                } else this._trigger("stop", t) !== !1 && this._clear();
                return !1
            },
            _mouseUp: function(t) {
                return e("div.ui-draggable-iframeFix").each(function() {
                    this.parentNode.removeChild(this)
                }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
            },
            cancel: function() {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
            },
            _getHandle: function(t) {
                var i = this.options.handle && e(this.options.handle, this.element).length ? !1 : !0;
                return e(this.options.handle, this.element).find("*").andSelf().each(function() {
                    this == t.target && (i = !0)
                }), i
            },
            _createHelper: function(t) {
                var i = this.options,
                    n = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [t])) : "clone" == i.helper ? this.element.clone().removeAttr("id") : this.element;
                return n.parents("body").length || n.appendTo("parent" == i.appendTo ? this.element[0].parentNode : i.appendTo), n[0] == this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
            },
            _adjustOffsetFromHelper: function(t) {
                "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {
                    left: +t[0],
                    top: +t[1] || 0
                }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                this.offsetParent = this.helper.offsetParent();
                var t = this.offsetParent.offset();
                return "absolute" == this.cssPosition && this.scrollParent[0] != document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {
                    top: 0,
                    left: 0
                }), {
                    top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ("relative" == this.cssPosition) {
                    var e = this.element.position();
                    return {
                        top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var t = this.options;
                if ("parent" == t.containment && (t.containment = this.helper[0].parentNode), ("document" == t.containment || "window" == t.containment) && (this.containment = ["document" == t.containment ? 0 : e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, "document" == t.containment ? 0 : e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, ("document" == t.containment ? 0 : e(window).scrollLeft()) + e("document" == t.containment ? document : window).width() - this.helperProportions.width - this.margins.left, ("document" == t.containment ? 0 : e(window).scrollTop()) + (e("document" == t.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(t.containment) || t.containment.constructor == Array) t.containment.constructor == Array && (this.containment = t.containment);
                else {
                    var i = e(t.containment),
                        n = i[0];
                    if (!n) return;
                    var r = (i.offset(), "hidden" != e(n).css("overflow"));
                    this.containment = [(parseInt(e(n).css("borderLeftWidth"), 10) || 0) + (parseInt(e(n).css("paddingLeft"), 10) || 0), (parseInt(e(n).css("borderTopWidth"), 10) || 0) + (parseInt(e(n).css("paddingTop"), 10) || 0), (r ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(e(n).css("borderLeftWidth"), 10) || 0) - (parseInt(e(n).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (r ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(e(n).css("borderTopWidth"), 10) || 0) - (parseInt(e(n).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i
                }
            },
            _convertPositionTo: function(t, i) {
                i || (i = this.position);
                var n = "absolute" == t ? 1 : -1,
                    r = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent),
                    s = /(html|body)/i.test(r[0].tagName);
                return {
                    top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : s ? 0 : r.scrollTop()) * n,
                    left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : s ? 0 : r.scrollLeft()) * n
                }
            },
            _generatePosition: function(t) {
                var i = this.options,
                    n = "absolute" != this.cssPosition || this.scrollParent[0] != document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    r = /(html|body)/i.test(n[0].tagName),
                    s = t.pageX,
                    a = t.pageY;
                if (this.originalPosition) {
                    var o;
                    if (this.containment) {
                        if (this.relative_container) {
                            var l = this.relative_container.offset();
                            o = [this.containment[0] + l.left, this.containment[1] + l.top, this.containment[2] + l.left, this.containment[3] + l.top]
                        } else o = this.containment;
                        t.pageX - this.offset.click.left < o[0] && (s = o[0] + this.offset.click.left), t.pageY - this.offset.click.top < o[1] && (a = o[1] + this.offset.click.top), t.pageX - this.offset.click.left > o[2] && (s = o[2] + this.offset.click.left), t.pageY - this.offset.click.top > o[3] && (a = o[3] + this.offset.click.top)
                    }
                    if (i.grid) {
                        var u = i.grid[1] ? this.originalPageY + Math.round((a - this.originalPageY) / i.grid[1]) * i.grid[1] : this.originalPageY;
                        a = o && (u - this.offset.click.top < o[1] || u - this.offset.click.top > o[3]) ? u - this.offset.click.top < o[1] ? u + i.grid[1] : u - i.grid[1] : u;
                        var c = i.grid[0] ? this.originalPageX + Math.round((s - this.originalPageX) / i.grid[0]) * i.grid[0] : this.originalPageX;
                        s = o && (c - this.offset.click.left < o[0] || c - this.offset.click.left > o[2]) ? c - this.offset.click.left < o[0] ? c + i.grid[0] : c - i.grid[0] : c
                    }
                }
                return {
                    top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : r ? 0 : n.scrollTop()),
                    left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : r ? 0 : n.scrollLeft())
                }
            },
            _clear: function() {
                this.helper.removeClass("ui-draggable-dragging"), this.helper[0] == this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
            },
            _trigger: function(t, i, n) {
                return n = n || this._uiHash(), e.ui.plugin.call(this, t, [i, n]), "drag" == t && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, i, n)
            },
            plugins: {},
            _uiHash: function() {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        }), e.ui.plugin.add("draggable", "connectToSortable", {
            start: function(t, i) {
                var n = e(this).data("draggable"),
                    r = n.options,
                    s = e.extend({}, i, {
                        item: n.element
                    });
                n.sortables = [], e(r.connectToSortable).each(function() {
                    var i = e.data(this, "sortable");
                    i && !i.options.disabled && (n.sortables.push({
                        instance: i,
                        shouldRevert: i.options.revert
                    }), i.refreshPositions(), i._trigger("activate", t, s))
                })
            },
            stop: function(t, i) {
                var n = e(this).data("draggable"),
                    r = e.extend({}, i, {
                        item: n.element
                    });
                e.each(n.sortables, function() {
                    this.instance.isOver ? (this.instance.isOver = 0, n.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, "original" == n.options.helper && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, r))
                })
            },
            drag: function(t, i) {
                var n = e(this).data("draggable"),
                    r = this;
                e.each(n.sortables, function() {
                    var s = !1,
                        a = this;
                    this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (s = !0, e.each(n.sortables, function() {
                        return this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this != a && this.instance._intersectsWith(this.instance.containerCache) && e.ui.contains(a.instance.element[0], this.instance.element[0]) && (s = !1), s
                    })), s ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(r).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                        return i.helper[0]
                    }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = n.offset.click.top, this.instance.offset.click.left = n.offset.click.left, this.instance.offset.parent.left -= n.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= n.offset.parent.top - this.instance.offset.parent.top, n._trigger("toSortable", t), n.dropped = this.instance.element, n.currentItem = n.element, this.instance.fromOutside = n), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), n._trigger("fromSortable", t), n.dropped = !1)
                })
            }
        }), e.ui.plugin.add("draggable", "cursor", {
            start: function() {
                var t = e("body"),
                    i = e(this).data("draggable").options;
                t.css("cursor") && (i._cursor = t.css("cursor")), t.css("cursor", i.cursor)
            },
            stop: function() {
                var t = e(this).data("draggable").options;
                t._cursor && e("body").css("cursor", t._cursor)
            }
        }), e.ui.plugin.add("draggable", "opacity", {
            start: function(t, i) {
                var n = e(i.helper),
                    r = e(this).data("draggable").options;
                n.css("opacity") && (r._opacity = n.css("opacity")), n.css("opacity", r.opacity)
            },
            stop: function(t, i) {
                var n = e(this).data("draggable").options;
                n._opacity && e(i.helper).css("opacity", n._opacity)
            }
        }), e.ui.plugin.add("draggable", "scroll", {
            start: function() {
                var t = e(this).data("draggable");
                t.scrollParent[0] != document && "HTML" != t.scrollParent[0].tagName && (t.overflowOffset = t.scrollParent.offset())
            },
            drag: function(t) {
                var i = e(this).data("draggable"),
                    n = i.options,
                    r = !1;
                i.scrollParent[0] != document && "HTML" != i.scrollParent[0].tagName ? (n.axis && "x" == n.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - t.pageY < n.scrollSensitivity ? i.scrollParent[0].scrollTop = r = i.scrollParent[0].scrollTop + n.scrollSpeed : t.pageY - i.overflowOffset.top < n.scrollSensitivity && (i.scrollParent[0].scrollTop = r = i.scrollParent[0].scrollTop - n.scrollSpeed)), n.axis && "y" == n.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - t.pageX < n.scrollSensitivity ? i.scrollParent[0].scrollLeft = r = i.scrollParent[0].scrollLeft + n.scrollSpeed : t.pageX - i.overflowOffset.left < n.scrollSensitivity && (i.scrollParent[0].scrollLeft = r = i.scrollParent[0].scrollLeft - n.scrollSpeed))) : (n.axis && "x" == n.axis || (t.pageY - e(document).scrollTop() < n.scrollSensitivity ? r = e(document).scrollTop(e(document).scrollTop() - n.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < n.scrollSensitivity && (r = e(document).scrollTop(e(document).scrollTop() + n.scrollSpeed))), n.axis && "y" == n.axis || (t.pageX - e(document).scrollLeft() < n.scrollSensitivity ? r = e(document).scrollLeft(e(document).scrollLeft() - n.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < n.scrollSensitivity && (r = e(document).scrollLeft(e(document).scrollLeft() + n.scrollSpeed)))), r !== !1 && e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(i, t)
            }
        }), e.ui.plugin.add("draggable", "snap", {
            start: function() {
                var t = e(this).data("draggable"),
                    i = t.options;
                t.snapElements = [], e(i.snap.constructor != String ? i.snap.items || ":data(draggable)" : i.snap).each(function() {
                    var i = e(this),
                        n = i.offset();
                    this != t.element[0] && t.snapElements.push({
                        item: this,
                        width: i.outerWidth(),
                        height: i.outerHeight(),
                        top: n.top,
                        left: n.left
                    })
                })
            },
            drag: function(t, i) {
                for (var n = e(this).data("draggable"), r = n.options, s = r.snapTolerance, a = i.offset.left, o = a + n.helperProportions.width, l = i.offset.top, u = l + n.helperProportions.height, c = n.snapElements.length - 1; c >= 0; c--) {
                    var h = n.snapElements[c].left,
                        d = h + n.snapElements[c].width,
                        p = n.snapElements[c].top,
                        f = p + n.snapElements[c].height;
                    if (a > h - s && d + s > a && l > p - s && f + s > l || a > h - s && d + s > a && u > p - s && f + s > u || o > h - s && d + s > o && l > p - s && f + s > l || o > h - s && d + s > o && u > p - s && f + s > u) {
                        if ("inner" != r.snapMode) {
                            var g = Math.abs(p - u) <= s,
                                m = Math.abs(f - l) <= s,
                                v = Math.abs(h - o) <= s,
                                y = Math.abs(d - a) <= s;
                            g && (i.position.top = n._convertPositionTo("relative", {
                                top: p - n.helperProportions.height,
                                left: 0
                            }).top - n.margins.top), m && (i.position.top = n._convertPositionTo("relative", {
                                top: f,
                                left: 0
                            }).top - n.margins.top), v && (i.position.left = n._convertPositionTo("relative", {
                                top: 0,
                                left: h - n.helperProportions.width
                            }).left - n.margins.left), y && (i.position.left = n._convertPositionTo("relative", {
                                top: 0,
                                left: d
                            }).left - n.margins.left)
                        }
                        var b = g || m || v || y;
                        if ("outer" != r.snapMode) {
                            var g = Math.abs(p - l) <= s,
                                m = Math.abs(f - u) <= s,
                                v = Math.abs(h - a) <= s,
                                y = Math.abs(d - o) <= s;
                            g && (i.position.top = n._convertPositionTo("relative", {
                                top: p,
                                left: 0
                            }).top - n.margins.top), m && (i.position.top = n._convertPositionTo("relative", {
                                top: f - n.helperProportions.height,
                                left: 0
                            }).top - n.margins.top), v && (i.position.left = n._convertPositionTo("relative", {
                                top: 0,
                                left: h
                            }).left - n.margins.left), y && (i.position.left = n._convertPositionTo("relative", {
                                top: 0,
                                left: d - n.helperProportions.width
                            }).left - n.margins.left)
                        }!n.snapElements[c].snapping && (g || m || v || y || b) && n.options.snap.snap && n.options.snap.snap.call(n.element, t, e.extend(n._uiHash(), {
                            snapItem: n.snapElements[c].item
                        })), n.snapElements[c].snapping = g || m || v || y || b
                    } else n.snapElements[c].snapping && n.options.snap.release && n.options.snap.release.call(n.element, t, e.extend(n._uiHash(), {
                        snapItem: n.snapElements[c].item
                    })), n.snapElements[c].snapping = !1
                }
            }
        }), e.ui.plugin.add("draggable", "stack", {
            start: function() {
                var t = e(this).data("draggable").options,
                    i = e.makeArray(e(t.stack)).sort(function(t, i) {
                        return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0)
                    });
                if (i.length) {
                    var n = parseInt(i[0].style.zIndex) || 0;
                    e(i).each(function(e) {
                        this.style.zIndex = n + e
                    }), this[0].style.zIndex = n + i.length
                }
            }
        }), e.ui.plugin.add("draggable", "zIndex", {
            start: function(t, i) {
                var n = e(i.helper),
                    r = e(this).data("draggable").options;
                n.css("zIndex") && (r._zIndex = n.css("zIndex")), n.css("zIndex", r.zIndex)
            },
            stop: function(t, i) {
                var n = e(this).data("draggable").options;
                n._zIndex && e(i.helper).css("zIndex", n._zIndex)
            }
        })
    }(jQuery),
    function(e) {
        e.widget("ui.resizable", e.ui.mouse, {
            version: "1.9.2",
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 1e3
            },
            _create: function() {
                var t = this,
                    i = this.options;
                if (this.element.addClass("ui-resizable"), e.extend(this, {
                        _aspectRatio: !!i.aspectRatio,
                        aspectRatio: i.aspectRatio,
                        originalElement: this.element,
                        _proportionallyResizeElements: [],
                        _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null
                    }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                        position: this.element.css("position"),
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight(),
                        top: this.element.css("top"),
                        left: this.element.css("left")
                    })), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
                        marginLeft: this.originalElement.css("marginLeft"),
                        marginTop: this.originalElement.css("marginTop"),
                        marginRight: this.originalElement.css("marginRight"),
                        marginBottom: this.originalElement.css("marginBottom")
                    }), this.originalElement.css({
                        marginLeft: 0,
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                        position: "static",
                        zoom: 1,
                        display: "block"
                    })), this.originalElement.css({
                        margin: this.originalElement.css("margin")
                    }), this._proportionallyResize()), this.handles = i.handles || (e(".ui-resizable-handle", this.element).length ? {
                        n: ".ui-resizable-n",
                        e: ".ui-resizable-e",
                        s: ".ui-resizable-s",
                        w: ".ui-resizable-w",
                        se: ".ui-resizable-se",
                        sw: ".ui-resizable-sw",
                        ne: ".ui-resizable-ne",
                        nw: ".ui-resizable-nw"
                    } : "e,s,se"), this.handles.constructor == String) {
                    "all" == this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw");
                    var n = this.handles.split(",");
                    this.handles = {};
                    for (var r = 0; r < n.length; r++) {
                        var s = e.trim(n[r]),
                            a = "ui-resizable-" + s,
                            o = e('<div class="ui-resizable-handle ' + a + '"></div>');
                        o.css({
                            zIndex: i.zIndex
                        }), "se" == s && o.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(o)
                    }
                }
                this._renderAxis = function(t) {
                    t = t || this.element;
                    for (var i in this.handles) {
                        if (this.handles[i].constructor == String && (this.handles[i] = e(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                            var n = e(this.handles[i], this.element),
                                r = 0;
                            r = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth();
                            var s = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join("");
                            t.css(s, r), this._proportionallyResize()
                        }
                        e(this.handles[i]).length
                    }
                }, this._renderAxis(this.element), this._handles = e(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                    if (!t.resizing) {
                        if (this.className) var e = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                        t.axis = e && e[1] ? e[1] : "se"
                    }
                }), i.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                    i.disabled || (e(this).removeClass("ui-resizable-autohide"), t._handles.show())
                }).mouseleave(function() {
                    i.disabled || t.resizing || (e(this).addClass("ui-resizable-autohide"), t._handles.hide())
                })), this._mouseInit()
            },
            _destroy: function() {
                this._mouseDestroy();
                var t = function(t) {
                    e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                };
                if (this.elementIsWrapper) {
                    t(this.element);
                    var i = this.element;
                    this.originalElement.css({
                        position: i.css("position"),
                        width: i.outerWidth(),
                        height: i.outerHeight(),
                        top: i.css("top"),
                        left: i.css("left")
                    }).insertAfter(i), i.remove()
                }
                return this.originalElement.css("resize", this.originalResizeStyle), t(this.originalElement), this
            },
            _mouseCapture: function(t) {
                var i = !1;
                for (var n in this.handles) e(this.handles[n])[0] == t.target && (i = !0);
                return !this.options.disabled && i
            },
            _mouseStart: function(i) {
                var n = this.options,
                    r = this.element.position(),
                    s = this.element;
                this.resizing = !0, this.documentScroll = {
                    top: e(document).scrollTop(),
                    left: e(document).scrollLeft()
                }, (s.is(".ui-draggable") || /absolute/.test(s.css("position"))) && s.css({
                    position: "absolute",
                    top: r.top,
                    left: r.left
                }), this._renderProxy();
                var a = t(this.helper.css("left")),
                    o = t(this.helper.css("top"));
                n.containment && (a += e(n.containment).scrollLeft() || 0, o += e(n.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                    left: a,
                    top: o
                }, this.size = this._helper ? {
                    width: s.outerWidth(),
                    height: s.outerHeight()
                } : {
                    width: s.width(),
                    height: s.height()
                }, this.originalSize = this._helper ? {
                    width: s.outerWidth(),
                    height: s.outerHeight()
                } : {
                    width: s.width(),
                    height: s.height()
                }, this.originalPosition = {
                    left: a,
                    top: o
                }, this.sizeDiff = {
                    width: s.outerWidth() - s.width(),
                    height: s.outerHeight() - s.height()
                }, this.originalMousePosition = {
                    left: i.pageX,
                    top: i.pageY
                }, this.aspectRatio = "number" == typeof n.aspectRatio ? n.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
                var l = e(".ui-resizable-" + this.axis).css("cursor");
                return e("body").css("cursor", "auto" == l ? this.axis + "-resize" : l), s.addClass("ui-resizable-resizing"), this._propagate("start", i), !0
            },
            _mouseDrag: function(e) {
                var t = this.helper,
                    i = (this.options, this.originalMousePosition),
                    n = this.axis,
                    r = e.pageX - i.left || 0,
                    s = e.pageY - i.top || 0,
                    a = this._change[n];
                if (!a) return !1;
                var o = a.apply(this, [e, r, s]);
                return this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (o = this._updateRatio(o, e)), o = this._respectSize(o, e), this._propagate("resize", e), t.css({
                    top: this.position.top + "px",
                    left: this.position.left + "px",
                    width: this.size.width + "px",
                    height: this.size.height + "px"
                }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(o), this._trigger("resize", e, this.ui()), !1
            },
            _mouseStop: function(t) {
                this.resizing = !1;
                var i = this.options,
                    n = this;
                if (this._helper) {
                    var r = this._proportionallyResizeElements,
                        s = r.length && /textarea/i.test(r[0].nodeName),
                        a = s && e.ui.hasScroll(r[0], "left") ? 0 : n.sizeDiff.height,
                        o = s ? 0 : n.sizeDiff.width,
                        l = {
                            width: n.helper.width() - o,
                            height: n.helper.height() - a
                        },
                        u = parseInt(n.element.css("left"), 10) + (n.position.left - n.originalPosition.left) || null,
                        c = parseInt(n.element.css("top"), 10) + (n.position.top - n.originalPosition.top) || null;
                    i.animate || this.element.css(e.extend(l, {
                        top: c,
                        left: u
                    })), n.helper.height(n.size.height), n.helper.width(n.size.width), this._helper && !i.animate && this._proportionallyResize()
                }
                return e("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
            },
            _updateVirtualBoundaries: function(e) {
                var t, n, r, s, a, o = this.options;
                a = {
                    minWidth: i(o.minWidth) ? o.minWidth : 0,
                    maxWidth: i(o.maxWidth) ? o.maxWidth : 1 / 0,
                    minHeight: i(o.minHeight) ? o.minHeight : 0,
                    maxHeight: i(o.maxHeight) ? o.maxHeight : 1 / 0
                }, (this._aspectRatio || e) && (t = a.minHeight * this.aspectRatio, r = a.minWidth / this.aspectRatio, n = a.maxHeight * this.aspectRatio, s = a.maxWidth / this.aspectRatio, t > a.minWidth && (a.minWidth = t), r > a.minHeight && (a.minHeight = r), n < a.maxWidth && (a.maxWidth = n), s < a.maxHeight && (a.maxHeight = s)), this._vBoundaries = a
            },
            _updateCache: function(e) {
                this.options;
                this.offset = this.helper.offset(), i(e.left) && (this.position.left = e.left), i(e.top) && (this.position.top = e.top), i(e.height) && (this.size.height = e.height), i(e.width) && (this.size.width = e.width)
            },
            _updateRatio: function(e) {
                var t = (this.options, this.position),
                    n = this.size,
                    r = this.axis;
                return i(e.height) ? e.width = e.height * this.aspectRatio : i(e.width) && (e.height = e.width / this.aspectRatio), "sw" == r && (e.left = t.left + (n.width - e.width), e.top = null), "nw" == r && (e.top = t.top + (n.height - e.height), e.left = t.left + (n.width - e.width)), e
            },
            _respectSize: function(e, t) {
                var n = (this.helper, this._vBoundaries),
                    r = (this._aspectRatio || t.shiftKey, this.axis),
                    s = i(e.width) && n.maxWidth && n.maxWidth < e.width,
                    a = i(e.height) && n.maxHeight && n.maxHeight < e.height,
                    o = i(e.width) && n.minWidth && n.minWidth > e.width,
                    l = i(e.height) && n.minHeight && n.minHeight > e.height;
                o && (e.width = n.minWidth), l && (e.height = n.minHeight), s && (e.width = n.maxWidth), a && (e.height = n.maxHeight);
                var u = this.originalPosition.left + this.originalSize.width,
                    c = this.position.top + this.size.height,
                    h = /sw|nw|w/.test(r),
                    d = /nw|ne|n/.test(r);
                o && h && (e.left = u - n.minWidth), s && h && (e.left = u - n.maxWidth), l && d && (e.top = c - n.minHeight), a && d && (e.top = c - n.maxHeight);
                var p = !e.width && !e.height;
                return p && !e.left && e.top ? e.top = null : p && !e.top && e.left && (e.left = null), e
            },
            _proportionallyResize: function() {
                this.options;
                if (this._proportionallyResizeElements.length)
                    for (var t = this.helper || this.element, i = 0; i < this._proportionallyResizeElements.length; i++) {
                        var n = this._proportionallyResizeElements[i];
                        if (!this.borderDif) {
                            var r = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")],
                                s = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")];
                            this.borderDif = e.map(r, function(e, t) {
                                var i = parseInt(e, 10) || 0,
                                    n = parseInt(s[t], 10) || 0;
                                return i + n
                            })
                        }
                        n.css({
                            height: t.height() - this.borderDif[0] - this.borderDif[2] || 0,
                            width: t.width() - this.borderDif[1] - this.borderDif[3] || 0
                        })
                    }
            },
            _renderProxy: function() {
                var t = this.element,
                    i = this.options;
                if (this.elementOffset = t.offset(), this._helper) {
                    this.helper = this.helper || e('<div style="overflow:hidden;"></div>');
                    var n = e.ui.ie6 ? 1 : 0,
                        r = e.ui.ie6 ? 2 : -1;
                    this.helper.addClass(this._helper).css({
                        width: this.element.outerWidth() + r,
                        height: this.element.outerHeight() + r,
                        position: "absolute",
                        left: this.elementOffset.left - n + "px",
                        top: this.elementOffset.top - n + "px",
                        zIndex: ++i.zIndex
                    }), this.helper.appendTo("body").disableSelection()
                } else this.helper = this.element
            },
            _change: {
                e: function(e, t) {
                    return {
                        width: this.originalSize.width + t
                    }
                },
                w: function(e, t) {
                    var i = (this.options, this.originalSize),
                        n = this.originalPosition;
                    return {
                        left: n.left + t,
                        width: i.width - t
                    }
                },
                n: function(e, t, i) {
                    var n = (this.options, this.originalSize),
                        r = this.originalPosition;
                    return {
                        top: r.top + i,
                        height: n.height - i
                    }
                },
                s: function(e, t, i) {
                    return {
                        height: this.originalSize.height + i
                    }
                },
                se: function(t, i, n) {
                    return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, n]))
                },
                sw: function(t, i, n) {
                    return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, n]))
                },
                ne: function(t, i, n) {
                    return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, n]))
                },
                nw: function(t, i, n) {
                    return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, n]))
                }
            },
            _propagate: function(t, i) {
                e.ui.plugin.call(this, t, [i, this.ui()]), "resize" != t && this._trigger(t, i, this.ui())
            },
            plugins: {},
            ui: function() {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                }
            }
        }), e.ui.plugin.add("resizable", "alsoResize", {
            start: function() {
                var t = e(this).data("resizable"),
                    i = t.options,
                    n = function(t) {
                        e(t).each(function() {
                            var t = e(this);
                            t.data("resizable-alsoresize", {
                                width: parseInt(t.width(), 10),
                                height: parseInt(t.height(), 10),
                                left: parseInt(t.css("left"), 10),
                                top: parseInt(t.css("top"), 10)
                            })
                        })
                    };
                "object" != typeof i.alsoResize || i.alsoResize.parentNode ? n(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], n(i.alsoResize)) : e.each(i.alsoResize, function(e) {
                    n(e)
                })
            },
            resize: function(t, i) {
                var n = e(this).data("resizable"),
                    r = n.options,
                    s = n.originalSize,
                    a = n.originalPosition,
                    o = {
                        height: n.size.height - s.height || 0,
                        width: n.size.width - s.width || 0,
                        top: n.position.top - a.top || 0,
                        left: n.position.left - a.left || 0
                    },
                    l = function(t, n) {
                        e(t).each(function() {
                            var t = e(this),
                                r = e(this).data("resizable-alsoresize"),
                                s = {},
                                a = n && n.length ? n : t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                            e.each(a, function(e, t) {
                                var i = (r[t] || 0) + (o[t] || 0);
                                i && i >= 0 && (s[t] = i || null)
                            }), t.css(s)
                        })
                    };
                "object" != typeof r.alsoResize || r.alsoResize.nodeType ? l(r.alsoResize) : e.each(r.alsoResize, function(e, t) {
                    l(e, t)
                })
            },
            stop: function() {
                e(this).removeData("resizable-alsoresize")
            }
        }), e.ui.plugin.add("resizable", "animate", {
            stop: function(t) {
                var i = e(this).data("resizable"),
                    n = i.options,
                    r = i._proportionallyResizeElements,
                    s = r.length && /textarea/i.test(r[0].nodeName),
                    a = s && e.ui.hasScroll(r[0], "left") ? 0 : i.sizeDiff.height,
                    o = s ? 0 : i.sizeDiff.width,
                    l = {
                        width: i.size.width - o,
                        height: i.size.height - a
                    },
                    u = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
                    c = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
                i.element.animate(e.extend(l, c && u ? {
                    top: c,
                    left: u
                } : {}), {
                    duration: n.animateDuration,
                    easing: n.animateEasing,
                    step: function() {
                        var n = {
                            width: parseInt(i.element.css("width"), 10),
                            height: parseInt(i.element.css("height"), 10),
                            top: parseInt(i.element.css("top"), 10),
                            left: parseInt(i.element.css("left"), 10)
                        };
                        r && r.length && e(r[0]).css({
                            width: n.width,
                            height: n.height
                        }), i._updateCache(n), i._propagate("resize", t)
                    }
                })
            }
        }), e.ui.plugin.add("resizable", "containment", {
            start: function() {
                var i = e(this).data("resizable"),
                    n = i.options,
                    r = i.element,
                    s = n.containment,
                    a = s instanceof e ? s.get(0) : /parent/.test(s) ? r.parent().get(0) : s;
                if (a)
                    if (i.containerElement = e(a), /document/.test(s) || s == document) i.containerOffset = {
                        left: 0,
                        top: 0
                    }, i.containerPosition = {
                        left: 0,
                        top: 0
                    }, i.parentData = {
                        element: e(document),
                        left: 0,
                        top: 0,
                        width: e(document).width(),
                        height: e(document).height() || document.body.parentNode.scrollHeight
                    };
                    else {
                        var o = e(a),
                            l = [];
                        e(["Top", "Right", "Left", "Bottom"]).each(function(e, i) {
                            l[e] = t(o.css("padding" + i))
                        }), i.containerOffset = o.offset(), i.containerPosition = o.position(), i.containerSize = {
                            height: o.innerHeight() - l[3],
                            width: o.innerWidth() - l[1]
                        };
                        var u = i.containerOffset,
                            c = i.containerSize.height,
                            h = i.containerSize.width,
                            d = e.ui.hasScroll(a, "left") ? a.scrollWidth : h,
                            p = e.ui.hasScroll(a) ? a.scrollHeight : c;
                        i.parentData = {
                            element: a,
                            left: u.left,
                            top: u.top,
                            width: d,
                            height: p
                        }
                    }
            },
            resize: function(t) {
                var i = e(this).data("resizable"),
                    n = i.options,
                    r = (i.containerSize, i.containerOffset),
                    s = (i.size, i.position),
                    a = i._aspectRatio || t.shiftKey,
                    o = {
                        top: 0,
                        left: 0
                    },
                    l = i.containerElement;
                l[0] != document && /static/.test(l.css("position")) && (o = r), s.left < (i._helper ? r.left : 0) && (i.size.width = i.size.width + (i._helper ? i.position.left - r.left : i.position.left - o.left), a && (i.size.height = i.size.width / i.aspectRatio), i.position.left = n.helper ? r.left : 0), s.top < (i._helper ? r.top : 0) && (i.size.height = i.size.height + (i._helper ? i.position.top - r.top : i.position.top), a && (i.size.width = i.size.height * i.aspectRatio), i.position.top = i._helper ? r.top : 0), i.offset.left = i.parentData.left + i.position.left, i.offset.top = i.parentData.top + i.position.top;
                var u = Math.abs((i._helper ? i.offset.left - o.left : i.offset.left - o.left) + i.sizeDiff.width),
                    c = Math.abs((i._helper ? i.offset.top - o.top : i.offset.top - r.top) + i.sizeDiff.height),
                    h = i.containerElement.get(0) == i.element.parent().get(0),
                    d = /relative|absolute/.test(i.containerElement.css("position"));
                h && d && (u -= i.parentData.left), u + i.size.width >= i.parentData.width && (i.size.width = i.parentData.width - u, a && (i.size.height = i.size.width / i.aspectRatio)), c + i.size.height >= i.parentData.height && (i.size.height = i.parentData.height - c, a && (i.size.width = i.size.height * i.aspectRatio))
            },
            stop: function() {
                var t = e(this).data("resizable"),
                    i = t.options,
                    n = (t.position, t.containerOffset),
                    r = t.containerPosition,
                    s = t.containerElement,
                    a = e(t.helper),
                    o = a.offset(),
                    l = a.outerWidth() - t.sizeDiff.width,
                    u = a.outerHeight() - t.sizeDiff.height;
                t._helper && !i.animate && /relative/.test(s.css("position")) && e(this).css({
                    left: o.left - r.left - n.left,
                    width: l,
                    height: u
                }), t._helper && !i.animate && /static/.test(s.css("position")) && e(this).css({
                    left: o.left - r.left - n.left,
                    width: l,
                    height: u
                })
            }
        }), e.ui.plugin.add("resizable", "ghost", {
            start: function() {
                var t = e(this).data("resizable"),
                    i = t.options,
                    n = t.size;
                t.ghost = t.originalElement.clone(), t.ghost.css({
                    opacity: .25,
                    display: "block",
                    position: "relative",
                    height: n.height,
                    width: n.width,
                    margin: 0,
                    left: 0,
                    top: 0
                }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), t.ghost.appendTo(t.helper)
            },
            resize: function() {
                {
                    var t = e(this).data("resizable");
                    t.options
                }
                t.ghost && t.ghost.css({
                    position: "relative",
                    height: t.size.height,
                    width: t.size.width
                })
            },
            stop: function() {
                {
                    var t = e(this).data("resizable");
                    t.options
                }
                t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
            }
        }), e.ui.plugin.add("resizable", "grid", {
            resize: function(t) {
                {
                    var i = e(this).data("resizable"),
                        n = i.options,
                        r = i.size,
                        s = i.originalSize,
                        a = i.originalPosition,
                        o = i.axis;
                    n._aspectRatio || t.shiftKey
                }
                n.grid = "number" == typeof n.grid ? [n.grid, n.grid] : n.grid;
                var l = Math.round((r.width - s.width) / (n.grid[0] || 1)) * (n.grid[0] || 1),
                    u = Math.round((r.height - s.height) / (n.grid[1] || 1)) * (n.grid[1] || 1);
                /^(se|s|e)$/.test(o) ? (i.size.width = s.width + l, i.size.height = s.height + u) : /^(ne)$/.test(o) ? (i.size.width = s.width + l, i.size.height = s.height + u, i.position.top = a.top - u) : /^(sw)$/.test(o) ? (i.size.width = s.width + l, i.size.height = s.height + u, i.position.left = a.left - l) : (i.size.width = s.width + l, i.size.height = s.height + u, i.position.top = a.top - u, i.position.left = a.left - l)
            }
        });
        var t = function(e) {
                return parseInt(e, 10) || 0
            },
            i = function(e) {
                return !isNaN(parseInt(e, 10))
            }
    }(jQuery),
    function(e) {
        var t = 0;
        e.widget("ui.autocomplete", {
            version: "1.9.2",
            defaultElement: "<input>",
            options: {
                appendTo: "body",
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            pending: 0,
            _create: function() {
                var t, i, n;
                this.isMultiLine = this._isMultiLine(), this.valueMethod = this.element[this.element.is("input,textarea") ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                    keydown: function(r) {
                        if (this.element.prop("readOnly")) return t = !0, n = !0, void(i = !0);
                        t = !1, n = !1, i = !1;
                        var s = e.ui.keyCode;
                        switch (r.keyCode) {
                            case s.PAGE_UP:
                                t = !0, this._move("previousPage", r);
                                break;
                            case s.PAGE_DOWN:
                                t = !0, this._move("nextPage", r);
                                break;
                            case s.UP:
                                t = !0, this._keyEvent("previous", r);
                                break;
                            case s.DOWN:
                                t = !0, this._keyEvent("next", r);
                                break;
                            case s.ENTER:
                            case s.NUMPAD_ENTER:
                                this.menu.active && (t = !0, r.preventDefault(), this.menu.select(r));
                                break;
                            case s.TAB:
                                this.menu.active && this.menu.select(r);
                                break;
                            case s.ESCAPE:
                                this.menu.element.is(":visible") && (this._value(this.term), this.close(r), r.preventDefault());
                                break;
                            default:
                                i = !0, this._searchTimeout(r)
                        }
                    },
                    keypress: function(n) {
                        if (t) return t = !1, void n.preventDefault();
                        if (!i) {
                            var r = e.ui.keyCode;
                            switch (n.keyCode) {
                                case r.PAGE_UP:
                                    this._move("previousPage", n);
                                    break;
                                case r.PAGE_DOWN:
                                    this._move("nextPage", n);
                                    break;
                                case r.UP:
                                    this._keyEvent("previous", n);
                                    break;
                                case r.DOWN:
                                    this._keyEvent("next", n)
                            }
                        }
                    },
                    input: function(e) {
                        return n ? (n = !1, void e.preventDefault()) : void this._searchTimeout(e)
                    },
                    focus: function() {
                        this.selectedItem = null, this.previous = this._value()
                    },
                    blur: function(e) {
                        return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(e), void this._change(e))
                    }
                }), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete").appendTo(this.document.find(this.options.appendTo || "body")[0]).menu({
                    input: e(),
                    role: null
                }).zIndex(this.element.zIndex() + 1).hide().data("menu"), this._on(this.menu.element, {
                    mousedown: function(t) {
                        t.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                            delete this.cancelBlur
                        });
                        var i = this.menu.element[0];
                        e(t.target).closest(".ui-menu-item").length || this._delay(function() {
                            var t = this;
                            this.document.one("mousedown", function(n) {
                                n.target === t.element[0] || n.target === i || e.contains(i, n.target) || t.close()
                            })
                        })
                    },
                    menufocus: function(t, i) {
                        if (this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type))) return this.menu.blur(), void this.document.one("mousemove", function() {
                            e(t.target).trigger(t.originalEvent)
                        });
                        var n = i.item.data("ui-autocomplete-item") || i.item.data("item.autocomplete");
                        !1 !== this._trigger("focus", t, {
                            item: n
                        }) ? t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(n.value) : this.liveRegion.text(n.value)
                    },
                    menuselect: function(e, t) {
                        var i = t.item.data("ui-autocomplete-item") || t.item.data("item.autocomplete"),
                            n = this.previous;
                        this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = n, this._delay(function() {
                            this.previous = n, this.selectedItem = i
                        })), !1 !== this._trigger("select", e, {
                            item: i
                        }) && this._value(i.value), this.term = this._value(), this.close(e), this.selectedItem = i
                    }
                }), this.liveRegion = e("<span>", {
                    role: "status",
                    "aria-live": "polite"
                }).addClass("ui-helper-hidden-accessible").insertAfter(this.element), e.fn.bgiframe && this.menu.element.bgiframe(), this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _destroy: function() {
                clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
            },
            _setOption: function(e, t) {
                this._super(e, t), "source" === e && this._initSource(), "appendTo" === e && this.menu.element.appendTo(this.document.find(t || "body")[0]), "disabled" === e && t && this.xhr && this.xhr.abort()
            },
            _isMultiLine: function() {
                return this.element.is("textarea") ? !0 : this.element.is("input") ? !1 : this.element.prop("isContentEditable")
            },
            _initSource: function() {
                var t, i, n = this;
                e.isArray(this.options.source) ? (t = this.options.source, this.source = function(i, n) {
                    n(e.ui.autocomplete.filter(t, i.term))
                }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(t, r) {
                    n.xhr && n.xhr.abort(), n.xhr = e.ajax({
                        url: i,
                        data: t,
                        dataType: "json",
                        success: function(e) {
                            r(e)
                        },
                        error: function() {
                            r([])
                        }
                    })
                }) : this.source = this.options.source
            },
            _searchTimeout: function(e) {
                clearTimeout(this.searching), this.searching = this._delay(function() {
                    this.term !== this._value() && (this.selectedItem = null, this.search(null, e))
                }, this.options.delay)
            },
            search: function(e, t) {
                return e = null != e ? e : this._value(), this.term = this._value(), e.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(e) : void 0
            },
            _search: function(e) {
                this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                    term: e
                }, this._response())
            },
            _response: function() {
                var e = this,
                    i = ++t;
                return function(n) {
                    i === t && e.__response(n), e.pending--, e.pending || e.element.removeClass("ui-autocomplete-loading")
                }
            },
            __response: function(e) {
                e && (e = this._normalize(e)), this._trigger("response", null, {
                    content: e
                }), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close()
            },
            close: function(e) {
                this.cancelSearch = !0, this._close(e)
            },
            _close: function(e) {
                this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e))
            },
            _change: function(e) {
                this.previous !== this._value() && this._trigger("change", e, {
                    item: this.selectedItem
                })
            },
            _normalize: function(t) {
                return t.length && t[0].label && t[0].value ? t : e.map(t, function(t) {
                    return "string" == typeof t ? {
                        label: t,
                        value: t
                    } : e.extend({
                        label: t.label || t.value,
                        value: t.value || t.label
                    }, t)
                })
            },
            _suggest: function(t) {
                var i = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
                this._renderMenu(i, t), this.menu.refresh(), i.show(), this._resizeMenu(), i.position(e.extend({
                    of: this.element
                }, this.options.position)), this.options.autoFocus && this.menu.next()
            },
            _resizeMenu: function() {
                var e = this.menu.element;
                e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function(t, i) {
                var n = this;
                e.each(i, function(e, i) {
                    n._renderItemData(t, i)
                })
            },
            _renderItemData: function(e, t) {
                return this._renderItem(e, t).data("ui-autocomplete-item", t)
            },
            _renderItem: function(t, i) {
                return e("<li>").append(e("<a>").text(i.label)).appendTo(t)
            },
            _move: function(e, t) {
                return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e) ? (this._value(this.term), void this.menu.blur()) : void this.menu[e](t) : void this.search(null, t)
            },
            widget: function() {
                return this.menu.element
            },
            _value: function() {
                return this.valueMethod.apply(this.element, arguments)
            },
            _keyEvent: function(e, t) {
                (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(e, t), t.preventDefault())
            }
        }), e.extend(e.ui.autocomplete, {
            escapeRegex: function(e) {
                return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            },
            filter: function(t, i) {
                var n = new RegExp(e.ui.autocomplete.escapeRegex(i), "i");
                return e.grep(t, function(e) {
                    return n.test(e.label || e.value || e)
                })
            }
        }), e.widget("ui.autocomplete", e.ui.autocomplete, {
            options: {
                messages: {
                    noResults: "No search results.",
                    results: function(e) {
                        return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                    }
                }
            },
            __response: function(e) {
                var t;
                this._superApply(arguments), this.options.disabled || this.cancelSearch || (t = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults, this.liveRegion.text(t))
            }
        })
    }(jQuery),
    function(e) {
        var t, i, n, r, s = "ui-button ui-widget ui-state-default ui-corner-all",
            a = "ui-state-hover ui-state-active ",
            o = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
            l = function() {
                var t = e(this).find(":ui-button");
                setTimeout(function() {
                    t.button("refresh")
                }, 1)
            },
            u = function(t) {
                var i = t.name,
                    n = t.form,
                    r = e([]);
                return i && (r = n ? e(n).find("[name='" + i + "']") : e("[name='" + i + "']", t.ownerDocument).filter(function() {
                    return !this.form
                })), r
            };
        e.widget("ui.button", {
            version: "1.9.2",
            defaultElement: "<button>",
            options: {
                disabled: null,
                text: !0,
                label: null,
                icons: {
                    primary: null,
                    secondary: null
                }
            },
            _create: function() {
                this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, l), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
                var a = this,
                    o = this.options,
                    c = "checkbox" === this.type || "radio" === this.type,
                    h = c ? "" : "ui-state-active",
                    d = "ui-state-focus";
                null === o.label && (o.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(s).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                    o.disabled || this === t && e(this).addClass("ui-state-active")
                }).bind("mouseleave" + this.eventNamespace, function() {
                    o.disabled || e(this).removeClass(h)
                }).bind("click" + this.eventNamespace, function(e) {
                    o.disabled && (e.preventDefault(), e.stopImmediatePropagation())
                }), this.element.bind("focus" + this.eventNamespace, function() {
                    a.buttonElement.addClass(d)
                }).bind("blur" + this.eventNamespace, function() {
                    a.buttonElement.removeClass(d)
                }), c && (this.element.bind("change" + this.eventNamespace, function() {
                    r || a.refresh()
                }), this.buttonElement.bind("mousedown" + this.eventNamespace, function(e) {
                    o.disabled || (r = !1, i = e.pageX, n = e.pageY)
                }).bind("mouseup" + this.eventNamespace, function(e) {
                    o.disabled || (i !== e.pageX || n !== e.pageY) && (r = !0)
                })), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                    return o.disabled || r ? !1 : (e(this).toggleClass("ui-state-active"), void a.buttonElement.attr("aria-pressed", a.element[0].checked))
                }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                    if (o.disabled || r) return !1;
                    e(this).addClass("ui-state-active"), a.buttonElement.attr("aria-pressed", "true");
                    var t = a.element[0];
                    u(t).not(t).map(function() {
                        return e(this).button("widget")[0]
                    }).removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                    return o.disabled ? !1 : (e(this).addClass("ui-state-active"), t = this, void a.document.one("mouseup", function() {
                        t = null
                    }))
                }).bind("mouseup" + this.eventNamespace, function() {
                    return o.disabled ? !1 : void e(this).removeClass("ui-state-active")
                }).bind("keydown" + this.eventNamespace, function(t) {
                    return o.disabled ? !1 : void((t.keyCode === e.ui.keyCode.SPACE || t.keyCode === e.ui.keyCode.ENTER) && e(this).addClass("ui-state-active"))
                }).bind("keyup" + this.eventNamespace, function() {
                    e(this).removeClass("ui-state-active")
                }), this.buttonElement.is("a") && this.buttonElement.keyup(function(t) {
                    t.keyCode === e.ui.keyCode.SPACE && e(this).click()
                })), this._setOption("disabled", o.disabled), this._resetButton()
            },
            _determineButtonType: function() {
                var e, t, i;
                this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (e = this.element.parents().last(), t = "label[for='" + this.element.attr("id") + "']", this.buttonElement = e.find(t), this.buttonElement.length || (e = e.length ? e.siblings() : this.element.siblings(), this.buttonElement = e.filter(t), this.buttonElement.length || (this.buttonElement = e.find(t))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
            },
            widget: function() {
                return this.buttonElement
            },
            _destroy: function() {
                this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(s + " " + a + " " + o).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
            },
            _setOption: function(e, t) {
                return this._super(e, t), "disabled" === e ? void(t ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1)) : void this._resetButton()
            },
            refresh: function() {
                var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
                t !== this.options.disabled && this._setOption("disabled", t), "radio" === this.type ? u(this.element[0]).each(function() {
                    e(this).is(":checked") ? e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
            },
            _resetButton: function() {
                if ("input" === this.type) return void(this.options.label && this.element.val(this.options.label));
                var t = this.buttonElement.removeClass(o),
                    i = e("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),
                    n = this.options.icons,
                    r = n.primary && n.secondary,
                    s = [];
                n.primary || n.secondary ? (this.options.text && s.push("ui-button-text-icon" + (r ? "s" : n.primary ? "-primary" : "-secondary")), n.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + n.primary + "'></span>"), n.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + n.secondary + "'></span>"), this.options.text || (s.push(r ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || t.attr("title", e.trim(i)))) : s.push("ui-button-text-only"), t.addClass(s.join(" "))
            }
        }), e.widget("ui.buttonset", {
            version: "1.9.2",
            options: {
                items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(button)"
            },
            _create: function() {
                this.element.addClass("ui-buttonset")
            },
            _init: function() {
                this.refresh()
            },
            _setOption: function(e, t) {
                "disabled" === e && this.buttons.button("option", e, t), this._super(e, t)
            },
            refresh: function() {
                var t = "rtl" === this.element.css("direction");
                this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                    return e(this).button("widget")[0]
                }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
            },
            _destroy: function() {
                this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
                    return e(this).button("widget")[0]
                }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
            }
        })
    }(jQuery),
    function($, undefined) {
        function Datepicker() {
            this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
        }

        function bindHover(e) {
            var t = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return e.delegate(t, "mouseout", function() {
                $(this).removeClass("ui-state-hover"), -1 != this.className.indexOf("ui-datepicker-prev") && $(this).removeClass("ui-datepicker-prev-hover"), -1 != this.className.indexOf("ui-datepicker-next") && $(this).removeClass("ui-datepicker-next-hover")
            }).delegate(t, "mouseover", function() {
                $.datepicker._isDisabledDatepicker(instActive.inline ? e.parent()[0] : instActive.input[0]) || ($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), $(this).addClass("ui-state-hover"), -1 != this.className.indexOf("ui-datepicker-prev") && $(this).addClass("ui-datepicker-prev-hover"), -1 != this.className.indexOf("ui-datepicker-next") && $(this).addClass("ui-datepicker-next-hover"))
            })
        }

        function extendRemove(e, t) {
            $.extend(e, t);
            for (var i in t)(null == t[i] || t[i] == undefined) && (e[i] = t[i]);
            return e
        }
        $.extend($.ui, {
            datepicker: {
                version: "1.9.2"
            }
        });
        var PROP_NAME = "datepicker",
            dpuuid = (new Date).getTime(),
            instActive;
        $.extend(Datepicker.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            log: function() {
                this.debug && console.log.apply("", arguments)
            },
            _widgetDatepicker: function() {
                return this.dpDiv
            },
            setDefaults: function(e) {
                return extendRemove(this._defaults, e || {}), this
            },
            _attachDatepicker: function(target, settings) {
                var inlineSettings = null;
                for (var attrName in this._defaults) {
                    var attrValue = target.getAttribute("date:" + attrName);
                    if (attrValue) {
                        inlineSettings = inlineSettings || {};
                        try {
                            inlineSettings[attrName] = eval(attrValue)
                        } catch (err) {
                            inlineSettings[attrName] = attrValue
                        }
                    }
                }
                var nodeName = target.nodeName.toLowerCase(),
                    inline = "div" == nodeName || "span" == nodeName;
                target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
                var inst = this._newInst($(target), inline);
                inst.settings = $.extend({}, settings || {}, inlineSettings || {}), "input" == nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
            },
            _newInst: function(e, t) {
                var i = e[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
                return {
                    id: i,
                    input: e,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: t,
                    dpDiv: t ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
                }
            },
            _connectDatepicker: function(e, t) {
                var i = $(e);
                t.append = $([]), t.trigger = $([]), i.hasClass(this.markerClassName) || (this._attachments(i, t), i.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(e, i, n) {
                    t.settings[i] = n
                }).bind("getData.datepicker", function(e, i) {
                    return this._get(t, i)
                }), this._autoSize(t), $.data(e, PROP_NAME, t), t.settings.disabled && this._disableDatepicker(e))
            },
            _attachments: function(e, t) {
                var i = this._get(t, "appendText"),
                    n = this._get(t, "isRTL");
                t.append && t.append.remove(), i && (t.append = $('<span class="' + this._appendClass + '">' + i + "</span>"), e[n ? "before" : "after"](t.append)), e.unbind("focus", this._showDatepicker), t.trigger && t.trigger.remove();
                var r = this._get(t, "showOn");
                if (("focus" == r || "both" == r) && e.focus(this._showDatepicker), "button" == r || "both" == r) {
                    var s = this._get(t, "buttonText"),
                        a = this._get(t, "buttonImage");
                    t.trigger = $(this._get(t, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                        src: a,
                        alt: s,
                        title: s
                    }) : $('<button type="button"></button>').addClass(this._triggerClass).html("" == a ? s : $("<img/>").attr({
                        src: a,
                        alt: s,
                        title: s
                    }))), e[n ? "before" : "after"](t.trigger), t.trigger.click(function() {
                        return $.datepicker._datepickerShowing && $.datepicker._lastInput == e[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != e[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(e[0])) : $.datepicker._showDatepicker(e[0]), !1
                    })
                }
            },
            _autoSize: function(e) {
                if (this._get(e, "autoSize") && !e.inline) {
                    var t = new Date(2009, 11, 20),
                        i = this._get(e, "dateFormat");
                    if (i.match(/[DM]/)) {
                        var n = function(e) {
                            for (var t = 0, i = 0, n = 0; n < e.length; n++) e[n].length > t && (t = e[n].length, i = n);
                            return i
                        };
                        t.setMonth(n(this._get(e, i.match(/MM/) ? "monthNames" : "monthNamesShort"))), t.setDate(n(this._get(e, i.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - t.getDay())
                    }
                    e.input.attr("size", this._formatDate(e, t).length)
                }
            },
            _inlineDatepicker: function(e, t) {
                var i = $(e);
                i.hasClass(this.markerClassName) || (i.addClass(this.markerClassName).append(t.dpDiv).bind("setData.datepicker", function(e, i, n) {
                    t.settings[i] = n
                }).bind("getData.datepicker", function(e, i) {
                    return this._get(t, i)
                }), $.data(e, PROP_NAME, t), this._setDate(t, this._getDefaultDate(t), !0), this._updateDatepicker(t), this._updateAlternate(t), t.settings.disabled && this._disableDatepicker(e), t.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function(e, t, i, n, r) {
                var s = this._dialogInst;
                if (!s) {
                    this.uuid += 1;
                    var a = "dp" + this.uuid;
                    this._dialogInput = $('<input type="text" id="' + a + '" style="position: absolute; top: -100px; width: 0px;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), s = this._dialogInst = this._newInst(this._dialogInput, !1), s.settings = {}, $.data(this._dialogInput[0], PROP_NAME, s)
                }
                if (extendRemove(s.settings, n || {}), t = t && t.constructor == Date ? this._formatDate(s, t) : t, this._dialogInput.val(t), this._pos = r ? r.length ? r : [r.pageX, r.pageY] : null, !this._pos) {
                    var o = document.documentElement.clientWidth,
                        l = document.documentElement.clientHeight,
                        u = document.documentElement.scrollLeft || document.body.scrollLeft,
                        c = document.documentElement.scrollTop || document.body.scrollTop;
                    this._pos = [o / 2 - 100 + u, l / 2 - 150 + c]
                }
                return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), s.settings.onSelect = i, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, s), this
            },
            _destroyDatepicker: function(e) {
                var t = $(e),
                    i = $.data(e, PROP_NAME);
                if (t.hasClass(this.markerClassName)) {
                    var n = e.nodeName.toLowerCase();
                    $.removeData(e, PROP_NAME), "input" == n ? (i.append.remove(), i.trigger.remove(), t.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" == n || "span" == n) && t.removeClass(this.markerClassName).empty()
                }
            },
            _enableDatepicker: function(e) {
                var t = $(e),
                    i = $.data(e, PROP_NAME);
                if (t.hasClass(this.markerClassName)) {
                    var n = e.nodeName.toLowerCase();
                    if ("input" == n) e.disabled = !1, i.trigger.filter("button").each(function() {
                        this.disabled = !1
                    }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    });
                    else if ("div" == n || "span" == n) {
                        var r = t.children("." + this._inlineClass);
                        r.children().removeClass("ui-state-disabled"), r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)
                    }
                    this._disabledInputs = $.map(this._disabledInputs, function(t) {
                        return t == e ? null : t
                    })
                }
            },
            _disableDatepicker: function(e) {
                var t = $(e),
                    i = $.data(e, PROP_NAME);
                if (t.hasClass(this.markerClassName)) {
                    var n = e.nodeName.toLowerCase();
                    if ("input" == n) e.disabled = !0, i.trigger.filter("button").each(function() {
                        this.disabled = !0
                    }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    });
                    else if ("div" == n || "span" == n) {
                        var r = t.children("." + this._inlineClass);
                        r.children().addClass("ui-state-disabled"), r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)
                    }
                    this._disabledInputs = $.map(this._disabledInputs, function(t) {
                        return t == e ? null : t
                    }), this._disabledInputs[this._disabledInputs.length] = e
                }
            },
            _isDisabledDatepicker: function(e) {
                if (!e) return !1;
                for (var t = 0; t < this._disabledInputs.length; t++)
                    if (this._disabledInputs[t] == e) return !0;
                return !1
            },
            _getInst: function(e) {
                try {
                    return $.data(e, PROP_NAME)
                } catch (t) {
                    throw "Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function(e, t, i) {
                var n = this._getInst(e);
                if (2 == arguments.length && "string" == typeof t) return "defaults" == t ? $.extend({}, $.datepicker._defaults) : n ? "all" == t ? $.extend({}, n.settings) : this._get(n, t) : null;
                var r = t || {};
                if ("string" == typeof t && (r = {}, r[t] = i), n) {
                    this._curInst == n && this._hideDatepicker();
                    var s = this._getDateDatepicker(e, !0),
                        a = this._getMinMaxDate(n, "min"),
                        o = this._getMinMaxDate(n, "max");
                    extendRemove(n.settings, r), null !== a && r.dateFormat !== undefined && r.minDate === undefined && (n.settings.minDate = this._formatDate(n, a)), null !== o && r.dateFormat !== undefined && r.maxDate === undefined && (n.settings.maxDate = this._formatDate(n, o)), this._attachments($(e), n), this._autoSize(n), this._setDate(n, s), this._updateAlternate(n), this._updateDatepicker(n)
                }
            },
            _changeDatepicker: function(e, t, i) {
                this._optionDatepicker(e, t, i)
            },
            _refreshDatepicker: function(e) {
                var t = this._getInst(e);
                t && this._updateDatepicker(t)
            },
            _setDateDatepicker: function(e, t) {
                var i = this._getInst(e);
                i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
            },
            _getDateDatepicker: function(e, t) {
                var i = this._getInst(e);
                return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
            },
            _doKeyDown: function(e) {
                var t = $.datepicker._getInst(e.target),
                    i = !0,
                    n = t.dpDiv.is(".ui-datepicker-rtl");
                if (t._keyEvent = !0, $.datepicker._datepickerShowing) switch (e.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker(), i = !1;
                        break;
                    case 13:
                        var r = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", t.dpDiv);
                        r[0] && $.datepicker._selectDay(e.target, t.selectedMonth, t.selectedYear, r[0]);
                        var s = $.datepicker._get(t, "onSelect");
                        if (s) {
                            var a = $.datepicker._formatDate(t);
                            s.apply(t.input ? t.input[0] : null, [a, t])
                        } else $.datepicker._hideDatepicker();
                        return !1;
                    case 27:
                        $.datepicker._hideDatepicker();
                        break;
                    case 33:
                        $.datepicker._adjustDate(e.target, e.ctrlKey ? -$.datepicker._get(t, "stepBigMonths") : -$.datepicker._get(t, "stepMonths"), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(e.target, e.ctrlKey ? +$.datepicker._get(t, "stepBigMonths") : +$.datepicker._get(t, "stepMonths"), "M");
                        break;
                    case 35:
                        (e.ctrlKey || e.metaKey) && $.datepicker._clearDate(e.target), i = e.ctrlKey || e.metaKey;
                        break;
                    case 36:
                        (e.ctrlKey || e.metaKey) && $.datepicker._gotoToday(e.target), i = e.ctrlKey || e.metaKey;
                        break;
                    case 37:
                        (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, n ? 1 : -1, "D"), i = e.ctrlKey || e.metaKey, e.originalEvent.altKey && $.datepicker._adjustDate(e.target, e.ctrlKey ? -$.datepicker._get(t, "stepBigMonths") : -$.datepicker._get(t, "stepMonths"), "M");
                        break;
                    case 38:
                        (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, -7, "D"), i = e.ctrlKey || e.metaKey;
                        break;
                    case 39:
                        (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, n ? -1 : 1, "D"), i = e.ctrlKey || e.metaKey, e.originalEvent.altKey && $.datepicker._adjustDate(e.target, e.ctrlKey ? +$.datepicker._get(t, "stepBigMonths") : +$.datepicker._get(t, "stepMonths"), "M");
                        break;
                    case 40:
                        (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, 7, "D"), i = e.ctrlKey || e.metaKey;
                        break;
                    default:
                        i = !1
                } else 36 == e.keyCode && e.ctrlKey ? $.datepicker._showDatepicker(this) : i = !1;
                i && (e.preventDefault(), e.stopPropagation())
            },
            _doKeyPress: function(e) {
                var t = $.datepicker._getInst(e.target);
                if ($.datepicker._get(t, "constrainInput")) {
                    var i = $.datepicker._possibleChars($.datepicker._get(t, "dateFormat")),
                        n = String.fromCharCode(e.charCode == undefined ? e.keyCode : e.charCode);
                    return e.ctrlKey || e.metaKey || " " > n || !i || i.indexOf(n) > -1
                }
            },
            _doKeyUp: function(e) {
                var t = $.datepicker._getInst(e.target);
                if (t.input.val() != t.lastVal) try {
                    var i = $.datepicker.parseDate($.datepicker._get(t, "dateFormat"), t.input ? t.input.val() : null, $.datepicker._getFormatConfig(t));
                    i && ($.datepicker._setDateFromField(t), $.datepicker._updateAlternate(t), $.datepicker._updateDatepicker(t))
                } catch (n) {
                    $.datepicker.log(n)
                }
                return !0
            },
            _showDatepicker: function(e) {
                if (e = e.target || e, "input" != e.nodeName.toLowerCase() && (e = $("input", e.parentNode)[0]), !$.datepicker._isDisabledDatepicker(e) && $.datepicker._lastInput != e) {
                    var t = $.datepicker._getInst(e);
                    $.datepicker._curInst && $.datepicker._curInst != t && ($.datepicker._curInst.dpDiv.stop(!0, !0), t && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
                    var i = $.datepicker._get(t, "beforeShow"),
                        n = i ? i.apply(e, [e, t]) : {};
                    if (n !== !1) {
                        extendRemove(t.settings, n), t.lastVal = null, $.datepicker._lastInput = e, $.datepicker._setDateFromField(t), $.datepicker._inDialog && (e.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(e), $.datepicker._pos[1] += e.offsetHeight);
                        var r = !1;
                        $(e).parents().each(function() {
                            return r |= "fixed" == $(this).css("position"), !r
                        });
                        var s = {
                            left: $.datepicker._pos[0],
                            top: $.datepicker._pos[1]
                        };
                        if ($.datepicker._pos = null, t.dpDiv.empty(), t.dpDiv.css({
                                position: "absolute",
                                display: "block",
                                top: "-1000px"
                            }), $.datepicker._updateDatepicker(t), s = $.datepicker._checkOffset(t, s, r), t.dpDiv.css({
                                position: $.datepicker._inDialog && $.blockUI ? "static" : r ? "fixed" : "absolute",
                                display: "none",
                                left: s.left + "px",
                                top: s.top + "px"
                            }), !t.inline) {
                            var a = $.datepicker._get(t, "showAnim"),
                                o = $.datepicker._get(t, "duration"),
                                l = function() {
                                    var e = t.dpDiv.find("iframe.ui-datepicker-cover");
                                    if (e.length) {
                                        var i = $.datepicker._getBorders(t.dpDiv);
                                        e.css({
                                            left: -i[0],
                                            top: -i[1],
                                            width: t.dpDiv.outerWidth(),
                                            height: t.dpDiv.outerHeight()
                                        })
                                    }
                                };
                            t.dpDiv.zIndex($(e).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && ($.effects.effect[a] || $.effects[a]) ? t.dpDiv.show(a, $.datepicker._get(t, "showOptions"), o, l) : t.dpDiv[a || "show"](a ? o : null, l), a && o || l(), t.input.is(":visible") && !t.input.is(":disabled") && t.input.focus(), $.datepicker._curInst = t
                        }
                    }
                }
            },
            _updateDatepicker: function(e) {
                this.maxRows = 4;
                var t = $.datepicker._getBorders(e.dpDiv);
                instActive = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);
                var i = e.dpDiv.find("iframe.ui-datepicker-cover");
                i.length && i.css({
                    left: -t[0],
                    top: -t[1],
                    width: e.dpDiv.outerWidth(),
                    height: e.dpDiv.outerHeight()
                }), e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
                var n = this._getNumberOfMonths(e),
                    r = n[1],
                    s = 17;
                if (e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), r > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + r).css("width", s * r + "em"), e.dpDiv[(1 != n[0] || 1 != n[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e == $.datepicker._curInst && $.datepicker._datepickerShowing && e.input && e.input.is(":visible") && !e.input.is(":disabled") && e.input[0] != document.activeElement && e.input.focus(), e.yearshtml) {
                    var a = e.yearshtml;
                    setTimeout(function() {
                        a === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), a = e.yearshtml = null
                    }, 0)
                }
            },
            _getBorders: function(e) {
                var t = function(e) {
                    return {
                        thin: 1,
                        medium: 2,
                        thick: 3
                    }[e] || e
                };
                return [parseFloat(t(e.css("border-left-width"))), parseFloat(t(e.css("border-top-width")))]
            },
            _checkOffset: function(e, t, i) {
                var n = e.dpDiv.outerWidth(),
                    r = e.dpDiv.outerHeight(),
                    s = e.input ? e.input.outerWidth() : 0,
                    a = e.input ? e.input.outerHeight() : 0,
                    o = document.documentElement.clientWidth + (i ? 0 : $(document).scrollLeft()),
                    l = document.documentElement.clientHeight + (i ? 0 : $(document).scrollTop());
                return t.left -= this._get(e, "isRTL") ? n - s : 0, t.left -= i && t.left == e.input.offset().left ? $(document).scrollLeft() : 0, t.top -= i && t.top == e.input.offset().top + a ? $(document).scrollTop() : 0, t.left -= Math.min(t.left, t.left + n > o && o > n ? Math.abs(t.left + n - o) : 0), t.top -= Math.min(t.top, t.top + r > l && l > r ? Math.abs(r + a) : 0), t
            },
            _findPos: function(e) {
                for (var t = this._getInst(e), i = this._get(t, "isRTL"); e && ("hidden" == e.type || 1 != e.nodeType || $.expr.filters.hidden(e));) e = e[i ? "previousSibling" : "nextSibling"];
                var n = $(e).offset();
                return [n.left, n.top]
            },
            _hideDatepicker: function(e) {
                var t = this._curInst;
                if (t && (!e || t == $.data(e, PROP_NAME)) && this._datepickerShowing) {
                    var i = this._get(t, "showAnim"),
                        n = this._get(t, "duration"),
                        r = function() {
                            $.datepicker._tidyDialog(t)
                        };
                    $.effects && ($.effects.effect[i] || $.effects[i]) ? t.dpDiv.hide(i, $.datepicker._get(t, "showOptions"), n, r) : t.dpDiv["slideDown" == i ? "slideUp" : "fadeIn" == i ? "fadeOut" : "hide"](i ? n : null, r), i || r(), this._datepickerShowing = !1;
                    var s = this._get(t, "onClose");
                    s && s.apply(t.input ? t.input[0] : null, [t.input ? t.input.val() : "", t]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
                }
            },
            _tidyDialog: function(e) {
                e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
            },
            _checkExternalClick: function(e) {
                if ($.datepicker._curInst) {
                    var t = $(e.target),
                        i = $.datepicker._getInst(t[0]);
                    (t[0].id != $.datepicker._mainDivId && 0 == t.parents("#" + $.datepicker._mainDivId).length && !t.hasClass($.datepicker.markerClassName) && !t.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || t.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != i) && $.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function(e, t, i) {
                var n = $(e),
                    r = this._getInst(n[0]);
                this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(r, t + ("M" == i ? this._get(r, "showCurrentAtPos") : 0), i), this._updateDatepicker(r))
            },
            _gotoToday: function(e) {
                var t = $(e),
                    i = this._getInst(t[0]);
                if (this._get(i, "gotoCurrent") && i.currentDay) i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear;
                else {
                    var n = new Date;
                    i.selectedDay = n.getDate(), i.drawMonth = i.selectedMonth = n.getMonth(), i.drawYear = i.selectedYear = n.getFullYear()
                }
                this._notifyChange(i), this._adjustDate(t)
            },
            _selectMonthYear: function(e, t, i) {
                var n = $(e),
                    r = this._getInst(n[0]);
                r["selected" + ("M" == i ? "Month" : "Year")] = r["draw" + ("M" == i ? "Month" : "Year")] = parseInt(t.options[t.selectedIndex].value, 10), this._notifyChange(r), this._adjustDate(n)
            },
            _selectDay: function(e, t, i, n) {
                var r = $(e);
                if (!$(n).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(r[0])) {
                    var s = this._getInst(r[0]);
                    s.selectedDay = s.currentDay = $("a", n).html(), s.selectedMonth = s.currentMonth = t, s.selectedYear = s.currentYear = i, this._selectDate(e, this._formatDate(s, s.currentDay, s.currentMonth, s.currentYear))
                }
            },
            _clearDate: function(e) {
                {
                    var t = $(e);
                    this._getInst(t[0])
                }
                this._selectDate(t, "")
            },
            _selectDate: function(e, t) {
                var i = $(e),
                    n = this._getInst(i[0]);
                t = null != t ? t : this._formatDate(n), n.input && n.input.val(t), this._updateAlternate(n);
                var r = this._get(n, "onSelect");
                r ? r.apply(n.input ? n.input[0] : null, [t, n]) : n.input && n.input.trigger("change"), n.inline ? this._updateDatepicker(n) : (this._hideDatepicker(), this._lastInput = n.input[0], "object" != typeof n.input[0] && n.input.focus(), this._lastInput = null)
            },
            _updateAlternate: function(e) {
                var t = this._get(e, "altField");
                if (t) {
                    var i = this._get(e, "altFormat") || this._get(e, "dateFormat"),
                        n = this._getDate(e),
                        r = this.formatDate(i, n, this._getFormatConfig(e));
                    $(t).each(function() {
                        $(this).val(r)
                    })
                }
            },
            noWeekends: function(e) {
                var t = e.getDay();
                return [t > 0 && 6 > t, ""]
            },
            iso8601Week: function(e) {
                var t = new Date(e.getTime());
                t.setDate(t.getDate() + 4 - (t.getDay() || 7));
                var i = t.getTime();
                return t.setMonth(0), t.setDate(1), Math.floor(Math.round((i - t) / 864e5) / 7) + 1
            },
            parseDate: function(e, t, i) {
                if (null == e || null == t) throw "Invalid arguments";
                if (t = "object" == typeof t ? t.toString() : t + "", "" == t) return null;
                var n = (i ? i.shortYearCutoff : null) || this._defaults.shortYearCutoff;
                n = "string" != typeof n ? n : (new Date).getFullYear() % 100 + parseInt(n, 10);
                for (var r = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, s = (i ? i.dayNames : null) || this._defaults.dayNames, a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, o = (i ? i.monthNames : null) || this._defaults.monthNames, l = -1, u = -1, c = -1, h = -1, d = !1, p = function(t) {
                        var i = y + 1 < e.length && e.charAt(y + 1) == t;
                        return i && y++, i
                    }, f = function(e) {
                        var i = p(e),
                            n = "@" == e ? 14 : "!" == e ? 20 : "y" == e && i ? 4 : "o" == e ? 3 : 2,
                            r = new RegExp("^\\d{1," + n + "}"),
                            s = t.substring(v).match(r);
                        if (!s) throw "Missing number at position " + v;
                        return v += s[0].length, parseInt(s[0], 10)
                    }, g = function(e, i, n) {
                        var r = $.map(p(e) ? n : i, function(e, t) {
                                return [
                                    [t, e]
                                ]
                            }).sort(function(e, t) {
                                return -(e[1].length - t[1].length)
                            }),
                            s = -1;
                        if ($.each(r, function(e, i) {
                                var n = i[1];
                                return t.substr(v, n.length).toLowerCase() == n.toLowerCase() ? (s = i[0], v += n.length, !1) : void 0
                            }), -1 != s) return s + 1;
                        throw "Unknown name at position " + v
                    }, m = function() {
                        if (t.charAt(v) != e.charAt(y)) throw "Unexpected literal at position " + v;
                        v++
                    }, v = 0, y = 0; y < e.length; y++)
                    if (d) "'" != e.charAt(y) || p("'") ? m() : d = !1;
                    else switch (e.charAt(y)) {
                        case "d":
                            c = f("d");
                            break;
                        case "D":
                            g("D", r, s);
                            break;
                        case "o":
                            h = f("o");
                            break;
                        case "m":
                            u = f("m");
                            break;
                        case "M":
                            u = g("M", a, o);
                            break;
                        case "y":
                            l = f("y");
                            break;
                        case "@":
                            var b = new Date(f("@"));
                            l = b.getFullYear(), u = b.getMonth() + 1, c = b.getDate();
                            break;
                        case "!":
                            var b = new Date((f("!") - this._ticksTo1970) / 1e4);
                            l = b.getFullYear(), u = b.getMonth() + 1, c = b.getDate();
                            break;
                        case "'":
                            p("'") ? m() : d = !0;
                            break;
                        default:
                            m()
                    }
                    if (v < t.length) {
                        var _ = t.substr(v);
                        if (!/^\s+/.test(_)) throw "Extra/unparsed characters found in date: " + _
                    }
                if (-1 == l ? l = (new Date).getFullYear() : 100 > l && (l += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (n >= l ? 0 : -100)), h > -1)
                    for (u = 1, c = h;;) {
                        var x = this._getDaysInMonth(l, u - 1);
                        if (x >= c) break;
                        u++, c -= x
                    }
                var b = this._daylightSavingAdjust(new Date(l, u - 1, c));
                if (b.getFullYear() != l || b.getMonth() + 1 != u || b.getDate() != c) throw "Invalid date";
                return b
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
            formatDate: function(e, t, i) {
                if (!t) return "";
                var n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                    r = (i ? i.dayNames : null) || this._defaults.dayNames,
                    s = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                    a = (i ? i.monthNames : null) || this._defaults.monthNames,
                    o = function(t) {
                        var i = d + 1 < e.length && e.charAt(d + 1) == t;
                        return i && d++, i
                    },
                    l = function(e, t, i) {
                        var n = "" + t;
                        if (o(e))
                            for (; n.length < i;) n = "0" + n;
                        return n
                    },
                    u = function(e, t, i, n) {
                        return o(e) ? n[t] : i[t]
                    },
                    c = "",
                    h = !1;
                if (t)
                    for (var d = 0; d < e.length; d++)
                        if (h) "'" != e.charAt(d) || o("'") ? c += e.charAt(d) : h = !1;
                        else switch (e.charAt(d)) {
                            case "d":
                                c += l("d", t.getDate(), 2);
                                break;
                            case "D":
                                c += u("D", t.getDay(), n, r);
                                break;
                            case "o":
                                c += l("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                c += l("m", t.getMonth() + 1, 2);
                                break;
                            case "M":
                                c += u("M", t.getMonth(), s, a);
                                break;
                            case "y":
                                c += o("y") ? t.getFullYear() : (t.getYear() % 100 < 10 ? "0" : "") + t.getYear() % 100;
                                break;
                            case "@":
                                c += t.getTime();
                                break;
                            case "!":
                                c += 1e4 * t.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                o("'") ? c += "'" : h = !0;
                                break;
                            default:
                                c += e.charAt(d)
                        }
                        return c
            },
            _possibleChars: function(e) {
                for (var t = "", i = !1, n = function(t) {
                        var i = r + 1 < e.length && e.charAt(r + 1) == t;
                        return i && r++, i
                    }, r = 0; r < e.length; r++)
                    if (i) "'" != e.charAt(r) || n("'") ? t += e.charAt(r) : i = !1;
                    else switch (e.charAt(r)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            t += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            n("'") ? t += "'" : i = !0;
                            break;
                        default:
                            t += e.charAt(r)
                    }
                    return t
            },
            _get: function(e, t) {
                return e.settings[t] !== undefined ? e.settings[t] : this._defaults[t]
            },
            _setDateFromField: function(e, t) {
                if (e.input.val() != e.lastVal) {
                    var i, n, r = this._get(e, "dateFormat"),
                        s = e.lastVal = e.input ? e.input.val() : null;
                    i = n = this._getDefaultDate(e);
                    var a = this._getFormatConfig(e);
                    try {
                        i = this.parseDate(r, s, a) || n
                    } catch (o) {
                        this.log(o), s = t ? "" : s
                    }
                    e.selectedDay = i.getDate(), e.drawMonth = e.selectedMonth = i.getMonth(), e.drawYear = e.selectedYear = i.getFullYear(), e.currentDay = s ? i.getDate() : 0, e.currentMonth = s ? i.getMonth() : 0, e.currentYear = s ? i.getFullYear() : 0, this._adjustInstDate(e)
                }
            },
            _getDefaultDate: function(e) {
                return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
            },
            _determineDate: function(e, t, i) {
                var n = function(e) {
                        var t = new Date;
                        return t.setDate(t.getDate() + e), t
                    },
                    r = function(t) {
                        try {
                            return $.datepicker.parseDate($.datepicker._get(e, "dateFormat"), t, $.datepicker._getFormatConfig(e))
                        } catch (i) {}
                        for (var n = (t.toLowerCase().match(/^c/) ? $.datepicker._getDate(e) : null) || new Date, r = n.getFullYear(), s = n.getMonth(), a = n.getDate(), o = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = o.exec(t); l;) {
                            switch (l[2] || "d") {
                                case "d":
                                case "D":
                                    a += parseInt(l[1], 10);
                                    break;
                                case "w":
                                case "W":
                                    a += 7 * parseInt(l[1], 10);
                                    break;
                                case "m":
                                case "M":
                                    s += parseInt(l[1], 10), a = Math.min(a, $.datepicker._getDaysInMonth(r, s));
                                    break;
                                case "y":
                                case "Y":
                                    r += parseInt(l[1], 10), a = Math.min(a, $.datepicker._getDaysInMonth(r, s))
                            }
                            l = o.exec(t)
                        }
                        return new Date(r, s, a)
                    },
                    s = null == t || "" === t ? i : "string" == typeof t ? r(t) : "number" == typeof t ? isNaN(t) ? i : n(t) : new Date(t.getTime());
                return s = s && "Invalid Date" == s.toString() ? i : s, s && (s.setHours(0), s.setMinutes(0), s.setSeconds(0), s.setMilliseconds(0)), this._daylightSavingAdjust(s)
            },
            _daylightSavingAdjust: function(e) {
                return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null
            },
            _setDate: function(e, t, i) {
                var n = !t,
                    r = e.selectedMonth,
                    s = e.selectedYear,
                    a = this._restrictMinMax(e, this._determineDate(e, t, new Date));
                e.selectedDay = e.currentDay = a.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = a.getMonth(), e.drawYear = e.selectedYear = e.currentYear = a.getFullYear(), r == e.selectedMonth && s == e.selectedYear || i || this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(n ? "" : this._formatDate(e))
            },
            _getDate: function(e) {
                var t = !e.currentYear || e.input && "" == e.input.val() ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
                return t
            },
            _attachHandlers: function(e) {
                var t = this._get(e, "stepMonths"),
                    i = "#" + e.id.replace(/\\\\/g, "\\");
                e.dpDiv.find("[data-handler]").map(function() {
                    var e = {
                        prev: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._adjustDate(i, -t, "M")
                        },
                        next: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._adjustDate(i, +t, "M")
                        },
                        hide: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker()
                        },
                        today: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._gotoToday(i)
                        },
                        selectDay: function() {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                        },
                        selectMonth: function() {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(i, this, "M"), !1
                        },
                        selectYear: function() {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(i, this, "Y"), !1
                        }
                    };
                    $(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function(e) {
                var t = new Date;
                t = this._daylightSavingAdjust(new Date(t.getFullYear(), t.getMonth(), t.getDate()));
                var i = this._get(e, "isRTL"),
                    n = this._get(e, "showButtonPanel"),
                    r = this._get(e, "hideIfNoPrevNext"),
                    s = this._get(e, "navigationAsDateFormat"),
                    a = this._getNumberOfMonths(e),
                    o = this._get(e, "showCurrentAtPos"),
                    l = this._get(e, "stepMonths"),
                    u = 1 != a[0] || 1 != a[1],
                    c = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
                    h = this._getMinMaxDate(e, "min"),
                    d = this._getMinMaxDate(e, "max"),
                    p = e.drawMonth - o,
                    f = e.drawYear;
                if (0 > p && (p += 12, f--), d) {
                    var g = this._daylightSavingAdjust(new Date(d.getFullYear(), d.getMonth() - a[0] * a[1] + 1, d.getDate()));
                    for (g = h && h > g ? h : g; this._daylightSavingAdjust(new Date(f, p, 1)) > g;) p--, 0 > p && (p = 11, f--)
                }
                e.drawMonth = p, e.drawYear = f;
                var m = this._get(e, "prevText");
                m = s ? this.formatDate(m, this._daylightSavingAdjust(new Date(f, p - l, 1)), this._getFormatConfig(e)) : m;
                var v = this._canAdjustMonth(e, -1, f, p) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "e" : "w") + '">' + m + "</span></a>" : r ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "e" : "w") + '">' + m + "</span></a>",
                    y = this._get(e, "nextText");
                y = s ? this.formatDate(y, this._daylightSavingAdjust(new Date(f, p + l, 1)), this._getFormatConfig(e)) : y;
                var b = this._canAdjustMonth(e, 1, f, p) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + y + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "w" : "e") + '">' + y + "</span></a>" : r ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + y + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "w" : "e") + '">' + y + "</span></a>",
                    _ = this._get(e, "currentText"),
                    x = this._get(e, "gotoCurrent") && e.currentDay ? c : t;
                _ = s ? this.formatDate(_, x, this._getFormatConfig(e)) : _;
                var w = e.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(e, "closeText") + "</button>",
                    k = n ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (i ? w : "") + (this._isInRange(e, x) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + _ + "</button>" : "") + (i ? "" : w) + "</div>" : "",
                    D = parseInt(this._get(e, "firstDay"), 10);
                D = isNaN(D) ? 0 : D;
                for (var C = this._get(e, "showWeek"), T = this._get(e, "dayNames"), E = (this._get(e, "dayNamesShort"), this._get(e, "dayNamesMin")), S = this._get(e, "monthNames"), N = this._get(e, "monthNamesShort"), M = this._get(e, "beforeShowDay"), A = this._get(e, "showOtherMonths"), I = this._get(e, "selectOtherMonths"), j = (this._get(e, "calculateWeek") || this.iso8601Week, this._getDefaultDate(e)), P = "", O = 0; O < a[0]; O++) {
                    var z = "";
                    this.maxRows = 4;
                    for (var H = 0; H < a[1]; H++) {
                        var R = this._daylightSavingAdjust(new Date(f, p, e.selectedDay)),
                            F = " ui-corner-all",
                            L = "";
                        if (u) {
                            if (L += '<div class="ui-datepicker-group', a[1] > 1) switch (H) {
                                case 0:
                                    L += " ui-datepicker-group-first", F = " ui-corner-" + (i ? "right" : "left");
                                    break;
                                case a[1] - 1:
                                    L += " ui-datepicker-group-last", F = " ui-corner-" + (i ? "left" : "right");
                                    break;
                                default:
                                    L += " ui-datepicker-group-middle", F = ""
                            }
                            L += '">'
                        }
                        L += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + F + '">' + (/all|left/.test(F) && 0 == O ? i ? b : v : "") + (/all|right/.test(F) && 0 == O ? i ? v : b : "") + this._generateMonthYearHeader(e, p, f, h, d, O > 0 || H > 0, S, N) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                        for (var W = C ? '<th class="ui-datepicker-week-col">' + this._get(e, "weekHeader") + "</th>" : "", B = 0; 7 > B; B++) {
                            var q = (B + D) % 7;
                            W += "<th" + ((B + D + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + T[q] + '">' + E[q] + "</span></th>"
                        }
                        L += W + "</tr></thead><tbody>";
                        var Y = this._getDaysInMonth(f, p);
                        f == e.selectedYear && p == e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, Y));
                        var U = (this._getFirstDayOfMonth(f, p) - D + 7) % 7,
                            K = Math.ceil((U + Y) / 7),
                            X = u && this.maxRows > K ? this.maxRows : K;
                        this.maxRows = X;
                        for (var V = this._daylightSavingAdjust(new Date(f, p, 1 - U)), J = 0; X > J; J++) {
                            L += "<tr>";
                            for (var Q = C ? '<td class="ui-datepicker-week-col">' + this._get(e, "calculateWeek")(V) + "</td>" : "", B = 0; 7 > B; B++) {
                                var G = M ? M.apply(e.input ? e.input[0] : null, [V]) : [!0, ""],
                                    Z = V.getMonth() != p,
                                    et = Z && !I || !G[0] || h && h > V || d && V > d;
                                Q += '<td class="' + ((B + D + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (Z ? " ui-datepicker-other-month" : "") + (V.getTime() == R.getTime() && p == e.selectedMonth && e._keyEvent || j.getTime() == V.getTime() && j.getTime() == R.getTime() ? " " + this._dayOverClass : "") + (et ? " " + this._unselectableClass + " ui-state-disabled" : "") + (Z && !A ? "" : " " + G[1] + (V.getTime() == c.getTime() ? " " + this._currentClass : "") + (V.getTime() == t.getTime() ? " ui-datepicker-today" : "")) + '"' + (Z && !A || !G[2] ? "" : ' title="' + G[2] + '"') + (et ? "" : ' data-handler="selectDay" data-event="click" data-month="' + V.getMonth() + '" data-year="' + V.getFullYear() + '"') + ">" + (Z && !A ? "&#xa0;" : et ? '<span class="ui-state-default">' + V.getDate() + "</span>" : '<a class="ui-state-default' + (V.getTime() == t.getTime() ? " ui-state-highlight" : "") + (V.getTime() == c.getTime() ? " ui-state-active" : "") + (Z ? " ui-priority-secondary" : "") + '" href="#">' + V.getDate() + "</a>") + "</td>", V.setDate(V.getDate() + 1), V = this._daylightSavingAdjust(V)
                            }
                            L += Q + "</tr>"
                        }
                        p++, p > 11 && (p = 0, f++), L += "</tbody></table>" + (u ? "</div>" + (a[0] > 0 && H == a[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), z += L
                    }
                    P += z
                }
                return P += k + ($.ui.ie6 && !e.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), e._keyEvent = !1, P
            },
            _generateMonthYearHeader: function(e, t, i, n, r, s, a, o) {
                var l = this._get(e, "changeMonth"),
                    u = this._get(e, "changeYear"),
                    c = this._get(e, "showMonthAfterYear"),
                    h = '<div class="ui-datepicker-title">',
                    d = "";
                if (s || !l) d += '<span class="ui-datepicker-month">' + a[t] + "</span>";
                else {
                    var p = n && n.getFullYear() == i,
                        f = r && r.getFullYear() == i;
                    d += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
                    for (var g = 0; 12 > g; g++)(!p || g >= n.getMonth()) && (!f || g <= r.getMonth()) && (d += '<option value="' + g + '"' + (g == t ? ' selected="selected"' : "") + ">" + o[g] + "</option>");
                    d += "</select>"
                }
                if (c || (h += d + (!s && l && u ? "" : "&#xa0;")), !e.yearshtml)
                    if (e.yearshtml = "", s || !u) h += '<span class="ui-datepicker-year">' + i + "</span>";
                    else {
                        var m = this._get(e, "yearRange").split(":"),
                            v = (new Date).getFullYear(),
                            y = function(e) {
                                var t = e.match(/c[+-].*/) ? i + parseInt(e.substring(1), 10) : e.match(/[+-].*/) ? v + parseInt(e, 10) : parseInt(e, 10);
                                return isNaN(t) ? v : t
                            },
                            b = y(m[0]),
                            _ = Math.max(b, y(m[1] || ""));
                        for (b = n ? Math.max(b, n.getFullYear()) : b, _ = r ? Math.min(_, r.getFullYear()) : _, e.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; _ >= b; b++) e.yearshtml += '<option value="' + b + '"' + (b == i ? ' selected="selected"' : "") + ">" + b + "</option>";
                        e.yearshtml += "</select>", h += e.yearshtml, e.yearshtml = null
                    }
                return h += this._get(e, "yearSuffix"), c && (h += (!s && l && u ? "" : "&#xa0;") + d), h += "</div>"
            },
            _adjustInstDate: function(e, t, i) {
                var n = e.drawYear + ("Y" == i ? t : 0),
                    r = e.drawMonth + ("M" == i ? t : 0),
                    s = Math.min(e.selectedDay, this._getDaysInMonth(n, r)) + ("D" == i ? t : 0),
                    a = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(n, r, s)));
                e.selectedDay = a.getDate(), e.drawMonth = e.selectedMonth = a.getMonth(), e.drawYear = e.selectedYear = a.getFullYear(), ("M" == i || "Y" == i) && this._notifyChange(e)
            },
            _restrictMinMax: function(e, t) {
                var i = this._getMinMaxDate(e, "min"),
                    n = this._getMinMaxDate(e, "max"),
                    r = i && i > t ? i : t;
                return r = n && r > n ? n : r
            },
            _notifyChange: function(e) {
                var t = this._get(e, "onChangeMonthYear");
                t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
            },
            _getNumberOfMonths: function(e) {
                var t = this._get(e, "numberOfMonths");
                return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
            },
            _getMinMaxDate: function(e, t) {
                return this._determineDate(e, this._get(e, t + "Date"), null)
            },
            _getDaysInMonth: function(e, t) {
                return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
            },
            _getFirstDayOfMonth: function(e, t) {
                return new Date(e, t, 1).getDay()
            },
            _canAdjustMonth: function(e, t, i, n) {
                var r = this._getNumberOfMonths(e),
                    s = this._daylightSavingAdjust(new Date(i, n + (0 > t ? t : r[0] * r[1]), 1));
                return 0 > t && s.setDate(this._getDaysInMonth(s.getFullYear(), s.getMonth())), this._isInRange(e, s)
            },
            _isInRange: function(e, t) {
                var i = this._getMinMaxDate(e, "min"),
                    n = this._getMinMaxDate(e, "max");
                return (!i || t.getTime() >= i.getTime()) && (!n || t.getTime() <= n.getTime())
            },
            _getFormatConfig: function(e) {
                var t = this._get(e, "shortYearCutoff");
                return t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
                    shortYearCutoff: t,
                    dayNamesShort: this._get(e, "dayNamesShort"),
                    dayNames: this._get(e, "dayNames"),
                    monthNamesShort: this._get(e, "monthNamesShort"),
                    monthNames: this._get(e, "monthNames")
                }
            },
            _formatDate: function(e, t, i, n) {
                t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
                var r = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(n, i, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
                return this.formatDate(this._get(e, "dateFormat"), r, this._getFormatConfig(e))
            }
        }), $.fn.datepicker = function(e) {
            if (!this.length) return this;
            $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find(document.body).append($.datepicker.dpDiv), $.datepicker.initialized = !0);
            var t = Array.prototype.slice.call(arguments, 1);
            return "string" != typeof e || "isDisabled" != e && "getDate" != e && "widget" != e ? "option" == e && 2 == arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this[0]].concat(t)) : this.each(function() {
                "string" == typeof e ? $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this].concat(t)) : $.datepicker._attachDatepicker(this, e)
            }) : $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this[0]].concat(t))
        }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.9.2", window["DP_jQuery_" + dpuuid] = $
    }(jQuery),
    function(e, t) {
        var i = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
            n = {
                buttons: !0,
                height: !0,
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0,
                width: !0
            },
            r = {
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0
            };
        e.widget("ui.dialog", {
            version: "1.9.2",
            options: {
                autoOpen: !0,
                buttons: {},
                closeOnEscape: !0,
                closeText: "close",
                dialogClass: "",
                draggable: !0,
                hide: null,
                height: "auto",
                maxHeight: !1,
                maxWidth: !1,
                minHeight: 150,
                minWidth: 150,
                modal: !1,
                position: {
                    my: "center",
                    at: "center",
                    of: window,
                    collision: "fit",
                    using: function(t) {
                        var i = e(this).css(t).offset().top;
                        0 > i && e(this).css("top", t.top - i)
                    }
                },
                resizable: !1,
                show: null,
                stack: !0,
                title: "",
                width: 300,
                zIndex: 1e3
            },
            _create: function() {
                this.originalTitle = this.element.attr("title"), "string" != typeof this.originalTitle && (this.originalTitle = ""), this.oldPosition = {
                    parent: this.element.parent(),
                    index: this.element.parent().children().index(this.element)
                }, this.options.title = this.options.title || this.originalTitle;
                var t, n, r, s, a, o = this,
                    l = this.options,
                    u = l.title || "&#160;";
                t = (this.uiDialog = e("<div>")).addClass(i + l.dialogClass).css({
                    display: "none",
                    outline: 0,
                    zIndex: l.zIndex
                }).attr("tabIndex", -1).keydown(function(t) {
                    l.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === e.ui.keyCode.ESCAPE && (o.close(t), t.preventDefault())
                }).mousedown(function(e) {
                    o.moveToTop(!1, e)
                }).appendTo("body"), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(t), n = (this.uiDialogTitlebar = e("<div>")).addClass("ui-dialog-titlebar  ui-widget-header  ui-corner-all  ui-helper-clearfix").bind("mousedown", function() {
                    t.focus()
                }).prependTo(t), r = e("<a href='#'></a>").addClass("ui-dialog-titlebar-close  ui-corner-all").attr("role", "button").click(function(e) {
                    e.preventDefault(), o.close(e)
                }).appendTo(n), (this.uiDialogTitlebarCloseText = e("<span>")).addClass("ui-icon ui-icon-closethick").text(l.closeText).appendTo(r), s = e("<span>").uniqueId().addClass("ui-dialog-title").html(u).prependTo(n), a = (this.uiDialogButtonPane = e("<div>")).addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), (this.uiButtonSet = e("<div>")).addClass("ui-dialog-buttonset").appendTo(a), t.attr({
                    role: "dialog",
                    "aria-labelledby": s.attr("id")
                }), n.find("*").add(n).disableSelection(), this._hoverable(r), this._focusable(r), l.draggable && e.fn.draggable && this._makeDraggable(), l.resizable && e.fn.resizable && this._makeResizable(), this._createButtons(l.buttons), this._isOpen = !1, e.fn.bgiframe && t.bgiframe(), this._on(t, {
                    keydown: function(i) {
                        if (l.modal && i.keyCode === e.ui.keyCode.TAB) {
                            var n = e(":tabbable", t),
                                r = n.filter(":first"),
                                s = n.filter(":last");
                            return i.target !== s[0] || i.shiftKey ? i.target === r[0] && i.shiftKey ? (s.focus(1), !1) : void 0 : (r.focus(1), !1)
                        }
                    }
                })
            },
            _init: function() {
                this.options.autoOpen && this.open()
            },
            _destroy: function() {
                var e, t = this.oldPosition;
                this.overlay && this.overlay.destroy(), this.uiDialog.hide(), this.element.removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), e = t.parent.children().eq(t.index), e.length && e[0] !== this.element[0] ? e.before(this.element) : t.parent.append(this.element)
            },
            widget: function() {
                return this.uiDialog
            },
            close: function(t) {
                var i, n, r = this;
                if (this._isOpen && !1 !== this._trigger("beforeClose", t)) return this._isOpen = !1, this.overlay && this.overlay.destroy(), this.options.hide ? this._hide(this.uiDialog, this.options.hide, function() {
                    r._trigger("close", t)
                }) : (this.uiDialog.hide(), this._trigger("close", t)), e.ui.dialog.overlay.resize(), this.options.modal && (i = 0, e(".ui-dialog").each(function() {
                    this !== r.uiDialog[0] && (n = e(this).css("z-index"), isNaN(n) || (i = Math.max(i, n)))
                }), e.ui.dialog.maxZ = i), this
            },
            isOpen: function() {
                return this._isOpen
            },
            moveToTop: function(t, i) {
                var n, r = this.options;
                return r.modal && !t || !r.stack && !r.modal ? this._trigger("focus", i) : (r.zIndex > e.ui.dialog.maxZ && (e.ui.dialog.maxZ = r.zIndex), this.overlay && (e.ui.dialog.maxZ += 1, e.ui.dialog.overlay.maxZ = e.ui.dialog.maxZ, this.overlay.$el.css("z-index", e.ui.dialog.overlay.maxZ)), n = {
                    scrollTop: this.element.scrollTop(),
                    scrollLeft: this.element.scrollLeft()
                }, e.ui.dialog.maxZ += 1, this.uiDialog.css("z-index", e.ui.dialog.maxZ), this.element.attr(n), this._trigger("focus", i), this)
            },
            open: function() {
                if (!this._isOpen) {
                    var t, i = this.options,
                        n = this.uiDialog;
                    return this._size(), this._position(i.position), n.show(i.show), this.overlay = i.modal ? new e.ui.dialog.overlay(this) : null, this.moveToTop(!0), t = this.element.find(":tabbable"), t.length || (t = this.uiDialogButtonPane.find(":tabbable"), t.length || (t = n)), t.eq(0).focus(), this._isOpen = !0, this._trigger("open"), this
                }
            },
            _createButtons: function(t) {
                var i = this,
                    n = !1;
                this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), "object" == typeof t && null !== t && e.each(t, function() {
                    return !(n = !0)
                }), n ? (e.each(t, function(t, n) {
                    var r, s;
                    n = e.isFunction(n) ? {
                        click: n,
                        text: t
                    } : n, n = e.extend({
                        type: "button"
                    }, n), s = n.click, n.click = function() {
                        s.apply(i.element[0], arguments)
                    }, r = e("<button></button>", n).appendTo(i.uiButtonSet), e.fn.button && r.button()
                }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog)) : this.uiDialog.removeClass("ui-dialog-buttons")
            },
            _makeDraggable: function() {
                function t(e) {
                    return {
                        position: e.position,
                        offset: e.offset
                    }
                }
                var i = this,
                    n = this.options;
                this.uiDialog.draggable({
                    cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                    handle: ".ui-dialog-titlebar",
                    containment: "document",
                    start: function(n, r) {
                        e(this).addClass("ui-dialog-dragging"), i._trigger("dragStart", n, t(r))
                    },
                    drag: function(e, n) {
                        i._trigger("drag", e, t(n))
                    },
                    stop: function(r, s) {
                        n.position = [s.position.left - i.document.scrollLeft(), s.position.top - i.document.scrollTop()], e(this).removeClass("ui-dialog-dragging"), i._trigger("dragStop", r, t(s)), e.ui.dialog.overlay.resize()
                    }
                })
            },
            _makeResizable: function(i) {
                function n(e) {
                    return {
                        originalPosition: e.originalPosition,
                        originalSize: e.originalSize,
                        position: e.position,
                        size: e.size
                    }
                }
                i = i === t ? this.options.resizable : i;
                var r = this,
                    s = this.options,
                    a = this.uiDialog.css("position"),
                    o = "string" == typeof i ? i : "n,e,s,w,se,sw,ne,nw";
                this.uiDialog.resizable({
                    cancel: ".ui-dialog-content",
                    containment: "document",
                    alsoResize: this.element,
                    maxWidth: s.maxWidth,
                    maxHeight: s.maxHeight,
                    minWidth: s.minWidth,
                    minHeight: this._minHeight(),
                    handles: o,
                    start: function(t, i) {
                        e(this).addClass("ui-dialog-resizing"), r._trigger("resizeStart", t, n(i))
                    },
                    resize: function(e, t) {
                        r._trigger("resize", e, n(t))
                    },
                    stop: function(t, i) {
                        e(this).removeClass("ui-dialog-resizing"), s.height = e(this).height(), s.width = e(this).width(), r._trigger("resizeStop", t, n(i)), e.ui.dialog.overlay.resize()
                    }
                }).css("position", a).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
            },
            _minHeight: function() {
                var e = this.options;
                return "auto" === e.height ? e.minHeight : Math.min(e.minHeight, e.height)
            },
            _position: function(t) {
                var i, n = [],
                    r = [0, 0];
                t ? (("string" == typeof t || "object" == typeof t && "0" in t) && (n = t.split ? t.split(" ") : [t[0], t[1]], 1 === n.length && (n[1] = n[0]), e.each(["left", "top"], function(e, t) {
                    +n[e] === n[e] && (r[e] = n[e], n[e] = t)
                }), t = {
                    my: n[0] + (r[0] < 0 ? r[0] : "+" + r[0]) + " " + n[1] + (r[1] < 0 ? r[1] : "+" + r[1]),
                    at: n.join(" ")
                }), t = e.extend({}, e.ui.dialog.prototype.options.position, t)) : t = e.ui.dialog.prototype.options.position, i = this.uiDialog.is(":visible"), i || this.uiDialog.show(), this.uiDialog.position(t), i || this.uiDialog.hide()
            },
            _setOptions: function(t) {
                var i = this,
                    s = {},
                    a = !1;
                e.each(t, function(e, t) {
                    i._setOption(e, t), e in n && (a = !0), e in r && (s[e] = t)
                }), a && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", s)
            },
            _setOption: function(t, n) {
                var r, s, a = this.uiDialog;
                switch (t) {
                    case "buttons":
                        this._createButtons(n);
                        break;
                    case "closeText":
                        this.uiDialogTitlebarCloseText.text("" + n);
                        break;
                    case "dialogClass":
                        a.removeClass(this.options.dialogClass).addClass(i + n);
                        break;
                    case "disabled":
                        n ? a.addClass("ui-dialog-disabled") : a.removeClass("ui-dialog-disabled");
                        break;
                    case "draggable":
                        r = a.is(":data(draggable)"), r && !n && a.draggable("destroy"), !r && n && this._makeDraggable();
                        break;
                    case "position":
                        this._position(n);
                        break;
                    case "resizable":
                        s = a.is(":data(resizable)"), s && !n && a.resizable("destroy"), s && "string" == typeof n && a.resizable("option", "handles", n), s || n === !1 || this._makeResizable(n);
                        break;
                    case "title":
                        e(".ui-dialog-title", this.uiDialogTitlebar).html("" + (n || "&#160;"))
                }
                this._super(t, n)
            },
            _size: function() {
                var t, i, n, r = this.options,
                    s = this.uiDialog.is(":visible");
                this.element.show().css({
                    width: "auto",
                    minHeight: 0,
                    height: 0
                }), r.minWidth > r.width && (r.width = r.minWidth), t = this.uiDialog.css({
                    height: "auto",
                    width: r.width
                }).outerHeight(), i = Math.max(0, r.minHeight - t), "auto" === r.height ? e.support.minHeight ? this.element.css({
                    minHeight: i,
                    height: "auto"
                }) : (this.uiDialog.show(), n = this.element.css("height", "auto").height(), s || this.uiDialog.hide(), this.element.height(Math.max(n, i))) : this.element.height(Math.max(r.height - t, 0)), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
            }
        }), e.extend(e.ui.dialog, {
            uuid: 0,
            maxZ: 0,
            getTitleId: function(e) {
                var t = e.attr("id");
                return t || (this.uuid += 1, t = this.uuid), "ui-dialog-title-" + t
            },
            overlay: function(t) {
                this.$el = e.ui.dialog.overlay.create(t)
            }
        }), e.extend(e.ui.dialog.overlay, {
            instances: [],
            oldInstances: [],
            maxZ: 0,
            events: e.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(e) {
                return e + ".dialog-overlay"
            }).join(" "),
            create: function(t) {
                0 === this.instances.length && (setTimeout(function() {
                    e.ui.dialog.overlay.instances.length && e(document).bind(e.ui.dialog.overlay.events, function(t) {
                        return e(t.target).zIndex() < e.ui.dialog.overlay.maxZ ? !1 : void 0
                    })
                }, 1), e(window).bind("resize.dialog-overlay", e.ui.dialog.overlay.resize));
                var i = this.oldInstances.pop() || e("<div>").addClass("ui-widget-overlay");
                return e(document).bind("keydown.dialog-overlay", function(n) {
                    var r = e.ui.dialog.overlay.instances;
                    0 !== r.length && r[r.length - 1] === i && t.options.closeOnEscape && !n.isDefaultPrevented() && n.keyCode && n.keyCode === e.ui.keyCode.ESCAPE && (t.close(n), n.preventDefault())
                }), i.appendTo(document.body).css({
                    width: this.width(),
                    height: this.height()
                }), e.fn.bgiframe && i.bgiframe(), this.instances.push(i), i
            },
            destroy: function(t) {
                var i = e.inArray(t, this.instances),
                    n = 0; - 1 !== i && this.oldInstances.push(this.instances.splice(i, 1)[0]), 0 === this.instances.length && e([document, window]).unbind(".dialog-overlay"), t.height(0).width(0).remove(), e.each(this.instances, function() {
                    n = Math.max(n, this.css("z-index"))
                }), this.maxZ = n
            },
            height: function() {
                var t, i;
                return e.ui.ie ? (t = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), i = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), i > t ? e(window).height() + "px" : t + "px") : e(document).height() + "px"
            },
            width: function() {
                var t, i;
                return e.ui.ie ? (t = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), i = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), i > t ? e(window).width() + "px" : t + "px") : e(document).width() + "px"
            },
            resize: function() {
                var t = e([]);
                e.each(e.ui.dialog.overlay.instances, function() {
                    t = t.add(this)
                }), t.css({
                    width: 0,
                    height: 0
                }).css({
                    width: e.ui.dialog.overlay.width(),
                    height: e.ui.dialog.overlay.height()
                })
            }
        }), e.extend(e.ui.dialog.overlay.prototype, {
            destroy: function() {
                e.ui.dialog.overlay.destroy(this.$el)
            }
        })
    }(jQuery),
    function(e) {
        var t = !1;
        e.widget("ui.menu", {
            version: "1.9.2",
            defaultElement: "<ul>",
            delay: 300,
            options: {
                icons: {
                    submenu: "ui-icon-carat-1-e"
                },
                menus: "ul",
                position: {
                    my: "left top",
                    at: "right top"
                },
                role: "menu",
                blur: null,
                focus: null,
                select: null
            },
            _create: function() {
                this.activeMenu = this.element, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                    role: this.options.role,
                    tabIndex: 0
                }).bind("click" + this.eventNamespace, e.proxy(function(e) {
                    this.options.disabled && e.preventDefault()
                }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                    "mousedown .ui-menu-item > a": function(e) {
                        e.preventDefault()
                    },
                    "click .ui-state-disabled > a": function(e) {
                        e.preventDefault()
                    },
                    "click .ui-menu-item:has(a)": function(i) {
                        var n = e(i.target).closest(".ui-menu-item");
                        !t && n.not(".ui-state-disabled").length && (t = !0, this.select(i), n.has(".ui-menu").length ? this.expand(i) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                    },
                    "mouseenter .ui-menu-item": function(t) {
                        var i = e(t.currentTarget);
                        i.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(t, i)
                    },
                    mouseleave: "collapseAll",
                    "mouseleave .ui-menu": "collapseAll",
                    focus: function(e, t) {
                        var i = this.active || this.element.children(".ui-menu-item").eq(0);
                        t || this.focus(e, i)
                    },
                    blur: function(t) {
                        this._delay(function() {
                            e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
                        })
                    },
                    keydown: "_keydown"
                }), this.refresh(), this._on(this.document, {
                    click: function(i) {
                        e(i.target).closest(".ui-menu").length || this.collapseAll(i), t = !1
                    }
                })
            },
            _destroy: function() {
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                    var t = e(this);
                    t.data("ui-menu-submenu-carat") && t.remove()
                }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
            },
            _keydown: function(t) {
                function i(e) {
                    return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
                }
                var n, r, s, a, o, l = !0;
                switch (t.keyCode) {
                    case e.ui.keyCode.PAGE_UP:
                        this.previousPage(t);
                        break;
                    case e.ui.keyCode.PAGE_DOWN:
                        this.nextPage(t);
                        break;
                    case e.ui.keyCode.HOME:
                        this._move("first", "first", t);
                        break;
                    case e.ui.keyCode.END:
                        this._move("last", "last", t);
                        break;
                    case e.ui.keyCode.UP:
                        this.previous(t);
                        break;
                    case e.ui.keyCode.DOWN:
                        this.next(t);
                        break;
                    case e.ui.keyCode.LEFT:
                        this.collapse(t);
                        break;
                    case e.ui.keyCode.RIGHT:
                        this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                        break;
                    case e.ui.keyCode.ENTER:
                    case e.ui.keyCode.SPACE:
                        this._activate(t);
                        break;
                    case e.ui.keyCode.ESCAPE:
                        this.collapse(t);
                        break;
                    default:
                        l = !1, r = this.previousFilter || "", s = String.fromCharCode(t.keyCode), a = !1, clearTimeout(this.filterTimer), s === r ? a = !0 : s = r + s, o = new RegExp("^" + i(s), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function() {
                            return o.test(e(this).children("a").text())
                        }), n = a && -1 !== n.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : n, n.length || (s = String.fromCharCode(t.keyCode), o = new RegExp("^" + i(s), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function() {
                            return o.test(e(this).children("a").text())
                        })), n.length ? (this.focus(t, n), n.length > 1 ? (this.previousFilter = s, this.filterTimer = this._delay(function() {
                            delete this.previousFilter
                        }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
                }
                l && t.preventDefault()
            },
            _activate: function(e) {
                this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(e) : this.select(e))
            },
            refresh: function() {
                var t, i = this.options.icons.submenu,
                    n = this.element.find(this.options.menus);
                n.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                    role: this.options.role,
                    "aria-hidden": "true",
                    "aria-expanded": "false"
                }).each(function() {
                    var t = e(this),
                        n = t.prev("a"),
                        r = e("<span>").addClass("ui-menu-icon ui-icon " + i).data("ui-menu-submenu-carat", !0);
                    n.attr("aria-haspopup", "true").prepend(r), t.attr("aria-labelledby", n.attr("id"))
                }), t = n.add(this.element), t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                    tabIndex: -1,
                    role: this._itemRole()
                }), t.children(":not(.ui-menu-item)").each(function() {
                    var t = e(this);
                    /[^\-—–\s]/.test(t.text()) || t.addClass("ui-widget-content ui-menu-divider")
                }), t.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !e.contains(this.element[0], this.active[0]) && this.blur()
            },
            _itemRole: function() {
                return {
                    menu: "menuitem",
                    listbox: "option"
                }[this.options.role]
            },
            focus: function(e, t) {
                var i, n;
                this.blur(e, e && "focus" === e.type), this._scrollIntoView(t), this.active = t.first(), n = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", n.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), e && "keydown" === e.type ? this._close() : this.timer = this._delay(function() {
                    this._close()
                }, this.delay), i = t.children(".ui-menu"), i.length && /^mouse/.test(e.type) && this._startOpening(i), this.activeMenu = t.parent(), this._trigger("focus", e, {
                    item: t
                })
            },
            _scrollIntoView: function(t) {
                var i, n, r, s, a, o;
                this._hasScroll() && (i = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, n = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, r = t.offset().top - this.activeMenu.offset().top - i - n, s = this.activeMenu.scrollTop(), a = this.activeMenu.height(), o = t.height(), 0 > r ? this.activeMenu.scrollTop(s + r) : r + o > a && this.activeMenu.scrollTop(s + r - a + o))
            },
            blur: function(e, t) {
                t || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", e, {
                    item: this.active
                }))
            },
            _startOpening: function(e) {
                clearTimeout(this.timer), "true" === e.attr("aria-hidden") && (this.timer = this._delay(function() {
                    this._close(), this._open(e)
                }, this.delay))
            },
            _open: function(t) {
                var i = e.extend({
                    of: this.active
                }, this.options.position);
                clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
            },
            collapseAll: function(t, i) {
                clearTimeout(this.timer), this.timer = this._delay(function() {
                    var n = i ? this.element : e(t && t.target).closest(this.element.find(".ui-menu"));
                    n.length || (n = this.element), this._close(n), this.blur(t), this.activeMenu = n
                }, this.delay)
            },
            _close: function(e) {
                e || (e = this.active ? this.active.parent() : this.element), e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
            },
            collapse: function(e) {
                var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                t && t.length && (this._close(), this.focus(e, t))
            },
            expand: function(e) {
                var t = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
                t && t.length && (this._open(t.parent()), this._delay(function() {
                    this.focus(e, t)
                }))
            },
            next: function(e) {
                this._move("next", "first", e)
            },
            previous: function(e) {
                this._move("prev", "last", e)
            },
            isFirstItem: function() {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            isLastItem: function() {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            _move: function(e, t, i) {
                var n;
                this.active && (n = "first" === e || "last" === e ? this.active["first" === e ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[e + "All"](".ui-menu-item").eq(0)), n && n.length && this.active || (n = this.activeMenu.children(".ui-menu-item")[t]()), this.focus(i, n)
            },
            nextPage: function(t) {
                var i, n, r;
                return this.active ? void(this.isLastItem() || (this._hasScroll() ? (n = this.active.offset().top, r = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                    return i = e(this), i.offset().top - n - r < 0
                }), this.focus(t, i)) : this.focus(t, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]()))) : void this.next(t)
            },
            previousPage: function(t) {
                var i, n, r;
                return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (n = this.active.offset().top, r = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                    return i = e(this), i.offset().top - n + r > 0
                }), this.focus(t, i)) : this.focus(t, this.activeMenu.children(".ui-menu-item").first()))) : void this.next(t)
            },
            _hasScroll: function() {
                return this.element.outerHeight() < this.element.prop("scrollHeight")
            },
            select: function(t) {
                this.active = this.active || e(t.target).closest(".ui-menu-item");
                var i = {
                    item: this.active
                };
                this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, i)
            }
        })
    }(jQuery), jQuery(function(e) {
        e.datepicker.regional["zh-CN"] = {
            closeText: "关闭",
            prevText: "&#x3c;上月",
            nextText: "下月&#x3e;",
            currentText: "今天",
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
            dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            weekHeader: "周",
            dateFormat: "yy-mm-dd",
            firstDay: 1,
            isRTL: !1,
            showMonthAfterYear: !0,
            yearSuffix: "年"
        }, e.datepicker.setDefaults(e.datepicker.regional["zh-CN"])
    }),
    function(e) {
        e.cookie = function(t, i, n) {
            if (arguments.length > 1 && "[object Object]" !== String(i)) {
                if (n = e.extend({}, n), (null === i || void 0 === i) && (n.expires = -1), "number" == typeof n.expires) {
                    var r = n.expires,
                        s = n.expires = new Date;
                    s.setDate(s.getDate() + r)
                }
                return i = String(i), document.cookie = [encodeURIComponent(t), "=", n.raw ? i : encodeURIComponent(i), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : ""].join("")
            }
            n = i || {};
            var a, o = n.raw ? function(e) {
                return e
            } : decodeURIComponent;
            return (a = new RegExp("(?:^|; )" + encodeURIComponent(t) + "=([^;]*)").exec(document.cookie)) ? o(a[1]) : null
        }
    }($),
    function() {
        var e = this,
            t = e._,
            i = {},
            n = Array.prototype,
            r = Object.prototype,
            s = Function.prototype,
            a = n.push,
            o = n.slice,
            l = n.concat,
            u = (n.unshift, r.toString),
            c = r.hasOwnProperty,
            h = n.forEach,
            d = n.map,
            p = n.reduce,
            f = n.reduceRight,
            g = n.filter,
            m = n.every,
            v = n.some,
            y = n.indexOf,
            b = n.lastIndexOf,
            _ = Array.isArray,
            x = Object.keys,
            w = s.bind,
            k = function(e) {
                return e instanceof k ? e : this instanceof k ? void(this._wrapped = e) : new k(e)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = k), exports._ = k) : e._ = k, k.VERSION = "1.4.2";
        var D = k.each = k.forEach = function(e, t, n) {
            if (null != e)
                if (h && e.forEach === h) e.forEach(t, n);
                else if (e.length === +e.length) {
                for (var r = 0, s = e.length; s > r; r++)
                    if (t.call(n, e[r], r, e) === i) return
            } else
                for (var a in e)
                    if (k.has(e, a) && t.call(n, e[a], a, e) === i) return
        };
        k.map = k.collect = function(e, t, i) {
            var n = [];
            return null == e ? n : d && e.map === d ? e.map(t, i) : (D(e, function(e, r, s) {
                n[n.length] = t.call(i, e, r, s)
            }), n)
        }, k.reduce = k.foldl = k.inject = function(e, t, i, n) {
            var r = arguments.length > 2;
            if (null == e && (e = []), p && e.reduce === p) return n && (t = k.bind(t, n)), r ? e.reduce(t, i) : e.reduce(t);
            if (D(e, function(e, s, a) {
                    r ? i = t.call(n, i, e, s, a) : (i = e, r = !0)
                }), !r) throw new TypeError("Reduce of empty array with no initial value");
            return i
        }, k.reduceRight = k.foldr = function(e, t, i, n) {
            var r = arguments.length > 2;
            if (null == e && (e = []), f && e.reduceRight === f) return n && (t = k.bind(t, n)), arguments.length > 2 ? e.reduceRight(t, i) : e.reduceRight(t);
            var s = e.length;
            if (s !== +s) {
                var a = k.keys(e);
                s = a.length
            }
            if (D(e, function(o, l, u) {
                    l = a ? a[--s] : --s, r ? i = t.call(n, i, e[l], l, u) : (i = e[l], r = !0)
                }), !r) throw new TypeError("Reduce of empty array with no initial value");
            return i
        }, k.find = k.detect = function(e, t, i) {
            var n;
            return C(e, function(e, r, s) {
                return t.call(i, e, r, s) ? (n = e, !0) : void 0
            }), n
        }, k.filter = k.select = function(e, t, i) {
            var n = [];
            return null == e ? n : g && e.filter === g ? e.filter(t, i) : (D(e, function(e, r, s) {
                t.call(i, e, r, s) && (n[n.length] = e)
            }), n)
        }, k.reject = function(e, t, i) {
            var n = [];
            return null == e ? n : (D(e, function(e, r, s) {
                t.call(i, e, r, s) || (n[n.length] = e)
            }), n)
        }, k.every = k.all = function(e, t, n) {
            t || (t = k.identity);
            var r = !0;
            return null == e ? r : m && e.every === m ? e.every(t, n) : (D(e, function(e, s, a) {
                return (r = r && t.call(n, e, s, a)) ? void 0 : i
            }), !!r)
        };
        var C = k.some = k.any = function(e, t, n) {
            t || (t = k.identity);
            var r = !1;
            return null == e ? r : v && e.some === v ? e.some(t, n) : (D(e, function(e, s, a) {
                return r || (r = t.call(n, e, s, a)) ? i : void 0
            }), !!r)
        };
        k.contains = k.include = function(e, t) {
            var i = !1;
            return null == e ? i : y && e.indexOf === y ? -1 != e.indexOf(t) : i = C(e, function(e) {
                return e === t
            })
        }, k.invoke = function(e, t) {
            var i = o.call(arguments, 2);
            return k.map(e, function(e) {
                return (k.isFunction(t) ? t : e[t]).apply(e, i)
            })
        }, k.pluck = function(e, t) {
            return k.map(e, function(e) {
                return e[t]
            })
        }, k.where = function(e, t) {
            return k.isEmpty(t) ? [] : k.filter(e, function(e) {
                for (var i in t)
                    if (t[i] !== e[i]) return !1;
                return !0
            })
        }, k.max = function(e, t, i) {
            if (!t && k.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
            if (!t && k.isEmpty(e)) return -1 / 0;
            var n = {
                computed: -1 / 0
            };
            return D(e, function(e, r, s) {
                var a = t ? t.call(i, e, r, s) : e;
                a >= n.computed && (n = {
                    value: e,
                    computed: a
                })
            }), n.value
        }, k.min = function(e, t, i) {
            if (!t && k.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
            if (!t && k.isEmpty(e)) return 1 / 0;
            var n = {
                computed: 1 / 0
            };
            return D(e, function(e, r, s) {
                var a = t ? t.call(i, e, r, s) : e;
                a < n.computed && (n = {
                    value: e,
                    computed: a
                })
            }), n.value
        }, k.shuffle = function(e) {
            var t, i = 0,
                n = [];
            return D(e, function(e) {
                t = k.random(i++), n[i - 1] = n[t], n[t] = e
            }), n
        };
        var T = function(e) {
            return k.isFunction(e) ? e : function(t) {
                return t[e]
            }
        };
        k.sortBy = function(e, t, i) {
            var n = T(t);
            return k.pluck(k.map(e, function(e, t, r) {
                return {
                    value: e,
                    index: t,
                    criteria: n.call(i, e, t, r)
                }
            }).sort(function(e, t) {
                var i = e.criteria,
                    n = t.criteria;
                if (i !== n) {
                    if (i > n || void 0 === i) return 1;
                    if (n > i || void 0 === n) return -1
                }
                return e.index < t.index ? -1 : 1
            }), "value")
        };
        var E = function(e, t, i, n) {
            var r = {},
                s = T(t);
            return D(e, function(t, a) {
                var o = s.call(i, t, a, e);
                n(r, o, t)
            }), r
        };
        k.groupBy = function(e, t, i) {
            return E(e, t, i, function(e, t, i) {
                (k.has(e, t) ? e[t] : e[t] = []).push(i)
            })
        }, k.countBy = function(e, t, i) {
            return E(e, t, i, function(e, t) {
                k.has(e, t) || (e[t] = 0), e[t]++
            })
        }, k.sortedIndex = function(e, t, i, n) {
            i = null == i ? k.identity : T(i);
            for (var r = i.call(n, t), s = 0, a = e.length; a > s;) {
                var o = s + a >>> 1;
                i.call(n, e[o]) < r ? s = o + 1 : a = o
            }
            return s
        }, k.toArray = function(e) {
            return e ? e.length === +e.length ? o.call(e) : k.values(e) : []
        }, k.size = function(e) {
            return e.length === +e.length ? e.length : k.keys(e).length
        }, k.first = k.head = k.take = function(e, t, i) {
            return null == t || i ? e[0] : o.call(e, 0, t)
        }, k.initial = function(e, t, i) {
            return o.call(e, 0, e.length - (null == t || i ? 1 : t))
        }, k.last = function(e, t, i) {
            return null == t || i ? e[e.length - 1] : o.call(e, Math.max(e.length - t, 0))
        }, k.rest = k.tail = k.drop = function(e, t, i) {
            return o.call(e, null == t || i ? 1 : t)
        }, k.compact = function(e) {
            return k.filter(e, function(e) {
                return !!e
            })
        };
        var S = function(e, t, i) {
            return D(e, function(e) {
                k.isArray(e) ? t ? a.apply(i, e) : S(e, t, i) : i.push(e)
            }), i
        };
        k.flatten = function(e, t) {
            return S(e, t, [])
        }, k.without = function(e) {
            return k.difference(e, o.call(arguments, 1))
        }, k.uniq = k.unique = function(e, t, i, n) {
            var r = i ? k.map(e, i, n) : e,
                s = [],
                a = [];
            return D(r, function(i, n) {
                (t ? n && a[a.length - 1] === i : k.contains(a, i)) || (a.push(i), s.push(e[n]))
            }), s
        }, k.union = function() {
            return k.uniq(l.apply(n, arguments))
        }, k.intersection = function(e) {
            var t = o.call(arguments, 1);
            return k.filter(k.uniq(e), function(e) {
                return k.every(t, function(t) {
                    return k.indexOf(t, e) >= 0
                })
            })
        }, k.difference = function(e) {
            var t = l.apply(n, o.call(arguments, 1));
            return k.filter(e, function(e) {
                return !k.contains(t, e)
            })
        }, k.zip = function() {
            for (var e = o.call(arguments), t = k.max(k.pluck(e, "length")), i = new Array(t), n = 0; t > n; n++) i[n] = k.pluck(e, "" + n);
            return i
        }, k.object = function(e, t) {
            for (var i = {}, n = 0, r = e.length; r > n; n++) t ? i[e[n]] = t[n] : i[e[n][0]] = e[n][1];
            return i
        }, k.indexOf = function(e, t, i) {
            if (null == e) return -1;
            var n = 0,
                r = e.length;
            if (i) {
                if ("number" != typeof i) return n = k.sortedIndex(e, t), e[n] === t ? n : -1;
                n = 0 > i ? Math.max(0, r + i) : i
            }
            if (y && e.indexOf === y) return e.indexOf(t, i);
            for (; r > n; n++)
                if (e[n] === t) return n;
            return -1
        }, k.lastIndexOf = function(e, t, i) {
            if (null == e) return -1;
            var n = null != i;
            if (b && e.lastIndexOf === b) return n ? e.lastIndexOf(t, i) : e.lastIndexOf(t);
            for (var r = n ? i : e.length; r--;)
                if (e[r] === t) return r;
            return -1
        }, k.range = function(e, t, i) {
            arguments.length <= 1 && (t = e || 0, e = 0), i = arguments[2] || 1;
            for (var n = Math.max(Math.ceil((t - e) / i), 0), r = 0, s = new Array(n); n > r;) s[r++] = e, e += i;
            return s
        };
        var N = function() {};
        k.bind = function(e, t) {
            var i, n;
            if (e.bind === w && w) return w.apply(e, o.call(arguments, 1));
            if (!k.isFunction(e)) throw new TypeError;
            return n = o.call(arguments, 2), i = function() {
                if (this instanceof i) {
                    N.prototype = e.prototype;
                    var r = new N,
                        s = e.apply(r, n.concat(o.call(arguments)));
                    return Object(s) === s ? s : r
                }
                return e.apply(t, n.concat(o.call(arguments)))
            }
        }, k.bindAll = function(e) {
            var t = o.call(arguments, 1);
            return 0 == t.length && (t = k.functions(e)), D(t, function(t) {
                e[t] = k.bind(e[t], e)
            }), e
        }, k.memoize = function(e, t) {
            var i = {};
            return t || (t = k.identity),
                function() {
                    var n = t.apply(this, arguments);
                    return k.has(i, n) ? i[n] : i[n] = e.apply(this, arguments)
                }
        }, k.delay = function(e, t) {
            var i = o.call(arguments, 2);
            return setTimeout(function() {
                return e.apply(null, i)
            }, t)
        }, k.defer = function(e) {
            return k.delay.apply(k, [e, 1].concat(o.call(arguments, 1)))
        }, k.throttle = function(e, t) {
            var i, n, r, s, a, o, l = k.debounce(function() {
                a = s = !1
            }, t);
            return function() {
                i = this, n = arguments;
                var u = function() {
                    r = null, a && (o = e.apply(i, n)), l()
                };
                return r || (r = setTimeout(u, t)), s ? a = !0 : (s = !0, o = e.apply(i, n)), l(), o
            }
        }, k.debounce = function(e, t, i) {
            var n, r;
            return function() {
                var s = this,
                    a = arguments,
                    o = function() {
                        n = null, i || (r = e.apply(s, a))
                    },
                    l = i && !n;
                return clearTimeout(n), n = setTimeout(o, t), l && (r = e.apply(s, a)), r
            }
        }, k.once = function(e) {
            var t, i = !1;
            return function() {
                return i ? t : (i = !0, t = e.apply(this, arguments), e = null, t)
            }
        }, k.wrap = function(e, t) {
            return function() {
                var i = [e];
                return a.apply(i, arguments), t.apply(this, i)
            }
        }, k.compose = function() {
            var e = arguments;
            return function() {
                for (var t = arguments, i = e.length - 1; i >= 0; i--) t = [e[i].apply(this, t)];
                return t[0]
            }
        }, k.after = function(e, t) {
            return 0 >= e ? t() : function() {
                return --e < 1 ? t.apply(this, arguments) : void 0
            }
        }, k.keys = x || function(e) {
            if (e !== Object(e)) throw new TypeError("Invalid object");
            var t = [];
            for (var i in e) k.has(e, i) && (t[t.length] = i);
            return t
        }, k.values = function(e) {
            var t = [];
            for (var i in e) k.has(e, i) && t.push(e[i]);
            return t
        }, k.pairs = function(e) {
            var t = [];
            for (var i in e) k.has(e, i) && t.push([i, e[i]]);
            return t
        }, k.invert = function(e) {
            var t = {};
            for (var i in e) k.has(e, i) && (t[e[i]] = i);
            return t
        }, k.functions = k.methods = function(e) {
            var t = [];
            for (var i in e) k.isFunction(e[i]) && t.push(i);
            return t.sort()
        }, k.extend = function(e) {
            return D(o.call(arguments, 1), function(t) {
                for (var i in t) e[i] = t[i]
            }), e
        }, k.pick = function(e) {
            var t = {},
                i = l.apply(n, o.call(arguments, 1));
            return D(i, function(i) {
                i in e && (t[i] = e[i])
            }), t
        }, k.omit = function(e) {
            var t = {},
                i = l.apply(n, o.call(arguments, 1));
            for (var r in e) k.contains(i, r) || (t[r] = e[r]);
            return t
        }, k.defaults = function(e) {
            return D(o.call(arguments, 1), function(t) {
                for (var i in t) null == e[i] && (e[i] = t[i])
            }), e
        }, k.clone = function(e) {
            return k.isObject(e) ? k.isArray(e) ? e.slice() : k.extend({}, e) : e
        }, k.tap = function(e, t) {
            return t(e), e
        };
        var M = function(e, t, i, n) {
            if (e === t) return 0 !== e || 1 / e == 1 / t;
            if (null == e || null == t) return e === t;
            e instanceof k && (e = e._wrapped), t instanceof k && (t = t._wrapped);
            var r = u.call(e);
            if (r != u.call(t)) return !1;
            switch (r) {
                case "[object String]":
                    return e == String(t);
                case "[object Number]":
                    return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
                case "[object Date]":
                case "[object Boolean]":
                    return +e == +t;
                case "[object RegExp]":
                    return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
            }
            if ("object" != typeof e || "object" != typeof t) return !1;
            for (var s = i.length; s--;)
                if (i[s] == e) return n[s] == t;
            i.push(e), n.push(t);
            var a = 0,
                o = !0;
            if ("[object Array]" == r) {
                if (a = e.length, o = a == t.length)
                    for (; a-- && (o = M(e[a], t[a], i, n)););
            } else {
                var l = e.constructor,
                    c = t.constructor;
                if (l !== c && !(k.isFunction(l) && l instanceof l && k.isFunction(c) && c instanceof c)) return !1;
                for (var h in e)
                    if (k.has(e, h) && (a++, !(o = k.has(t, h) && M(e[h], t[h], i, n)))) break;
                if (o) {
                    for (h in t)
                        if (k.has(t, h) && !a--) break;
                    o = !a
                }
            }
            return i.pop(), n.pop(), o
        };
        k.isEqual = function(e, t) {
            return M(e, t, [], [])
        }, k.isEmpty = function(e) {
            if (null == e) return !0;
            if (k.isArray(e) || k.isString(e)) return 0 === e.length;
            for (var t in e)
                if (k.has(e, t)) return !1;
            return !0
        }, k.isElement = function(e) {
            return !!e && 1 === e.nodeType
        }, k.isArray = _ || function(e) {
            return "[object Array]" == u.call(e)
        }, k.isObject = function(e) {
            return e === Object(e)
        }, D(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
            k["is" + e] = function(t) {
                return u.call(t) == "[object " + e + "]"
            }
        }), k.isArguments(arguments) || (k.isArguments = function(e) {
            return !!e && !!k.has(e, "callee")
        }), "function" != typeof /./ && (k.isFunction = function(e) {
            return "function" == typeof e
        }), k.isFinite = function(e) {
            return k.isNumber(e) && isFinite(e)
        }, k.isNaN = function(e) {
            return k.isNumber(e) && e != +e
        }, k.isBoolean = function(e) {
            return e === !0 || e === !1 || "[object Boolean]" == u.call(e)
        }, k.isNull = function(e) {
            return null === e
        }, k.isUndefined = function(e) {
            return void 0 === e
        }, k.has = function(e, t) {
            return c.call(e, t)
        }, k.noConflict = function() {
            return e._ = t, this
        }, k.identity = function(e) {
            return e
        }, k.times = function(e, t, i) {
            for (var n = 0; e > n; n++) t.call(i, n)
        }, k.random = function(e, t) {
            return null == t && (t = e, e = 0), e + (0 | Math.random() * (t - e + 1))
        };
        var A = {
            escape: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "/": "&#x2F;"
            }
        };
        A.unescape = k.invert(A.escape);
        var I = {
            escape: new RegExp("[" + k.keys(A.escape).join("") + "]", "g"),
            unescape: new RegExp("(" + k.keys(A.unescape).join("|") + ")", "g")
        };
        k.each(["escape", "unescape"], function(e) {
            k[e] = function(t) {
                return null == t ? "" : ("" + t).replace(I[e], function(t) {
                    return A[e][t]
                })
            }
        }), k.result = function(e, t) {
            if (null == e) return null;
            var i = e[t];
            return k.isFunction(i) ? i.call(e) : i
        }, k.mixin = function(e) {
            D(k.functions(e), function(t) {
                var i = k[t] = e[t];
                k.prototype[t] = function() {
                    var e = [this._wrapped];
                    return a.apply(e, arguments), $.call(this, i.apply(k, e))
                }
            })
        };
        var j = 0;
        k.uniqueId = function(e) {
            var t = j++;
            return e ? e + t : t
        }, k.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var P = /(.)^/,
            O = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "	": "t",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            z = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        k.template = function(e, t, i) {
            i = k.defaults({}, i, k.templateSettings);
            var n = new RegExp([(i.escape || P).source, (i.interpolate || P).source, (i.evaluate || P).source].join("|") + "|$", "g"),
                r = 0,
                s = "__p+='";
            e.replace(n, function(t, i, n, a, o) {
                s += e.slice(r, o).replace(z, function(e) {
                    return "\\" + O[e]
                }), s += i ? "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'" : n ? "'+\n((__t=(" + n + "))==null?'':__t)+\n'" : a ? "';\n" + a + "\n__p+='" : "", r = o + t.length
            }), s += "';\n", i.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
            try {
                var a = new Function(i.variable || "obj", "_", s)
            } catch (o) {
                throw o.source = s, o
            }
            if (t) return a(t, k);
            var l = function(e) {
                return a.call(this, e, k)
            };
            return l.source = "function(" + (i.variable || "obj") + "){\n" + s + "}", l
        }, k.chain = function(e) {
            return k(e).chain()
        };
        var $ = function(e) {
            return this._chain ? k(e).chain() : e
        };
        k.mixin(k), D(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
            var t = n[e];
            k.prototype[e] = function() {
                var i = this._wrapped;
                return t.apply(i, arguments), ("shift" == e || "splice" == e) && 0 === i.length && delete i[0], $.call(this, i)
            }
        }), D(["concat", "join", "slice"], function(e) {
            var t = n[e];
            k.prototype[e] = function() {
                return $.call(this, t.apply(this._wrapped, arguments))
            }
        }), k.extend(k.prototype, {
            chain: function() {
                return this._chain = !0, this
            },
            value: function() {
                return this._wrapped
            }
        })
    }.call(this),
    function() {
        var e, t = this,
            i = t.Backbone;
        e = "undefined" != typeof exports ? exports : t.Backbone = {}, e.VERSION = "0.5.3";
        var n = t._;
        n || "undefined" == typeof require || (n = require("underscore")._);
        var r = t.jQuery || t.Zepto;
        e.noConflict = function() {
            return t.Backbone = i, this
        }, e.emulateHTTP = !1, e.emulateJSON = !1, e.Events = {
            bind: function(e, t, i) {
                var n = this._callbacks || (this._callbacks = {}),
                    r = n[e] || (n[e] = []);
                return r.push([t, i]), this
            },
            unbind: function(e, t) {
                var i;
                if (e) {
                    if (i = this._callbacks)
                        if (t) {
                            var n = i[e];
                            if (!n) return this;
                            for (var r = 0, s = n.length; s > r; r++)
                                if (n[r] && t === n[r][0]) {
                                    n[r] = null;
                                    break
                                }
                        } else i[e] = []
                } else this._callbacks = {};
                return this
            },
            trigger: function(e) {
                var t, i, n, r, s, a = 2;
                if (!(i = this._callbacks)) return this;
                for (; a--;)
                    if (n = a ? e : "all", t = i[n])
                        for (var o = 0, l = t.length; l > o; o++)(r = t[o]) ? (s = a ? Array.prototype.slice.call(arguments, 1) : arguments, r[0].apply(r[1] || this, s)) : (t.splice(o, 1), o--, l--);
                return this
            }
        }, e.Model = function(e, t) {
            var i;
            e || (e = {}), (i = this.defaults) && (n.isFunction(i) && (i = i.call(this)), e = n.extend({}, i, e)), this.attributes = {}, this._escapedAttributes = {}, this.cid = n.uniqueId("c"), this.set(e, {
                silent: !0
            }), this._changed = !1, this._previousAttributes = n.clone(this.attributes), t && t.collection && (this.collection = t.collection), this.initialize(e, t)
        }, n.extend(e.Model.prototype, e.Events, {
            _previousAttributes: null,
            _changed: !1,
            idAttribute: "id",
            initialize: function() {},
            toJSON: function() {
                return n.clone(this.attributes)
            },
            get: function(e) {
                return this.attributes[e]
            },
            escape: function(e) {
                var t;
                if (t = this._escapedAttributes[e]) return t;
                var i = this.attributes[e];
                return this._escapedAttributes[e] = w(null == i ? "" : "" + i)
            },
            has: function(e) {
                return null != this.attributes[e]
            },
            set: function(e, t) {
                if (t || (t = {}), !e) return this;
                e.attributes && (e = e.attributes);
                var i = this.attributes,
                    r = this._escapedAttributes;
                if (!t.silent && this.validate && !this._performValidation(e, t)) return !1;
                this.idAttribute in e && (this.id = e[this.idAttribute]);
                var s = this._changing;
                this._changing = !0;
                for (var a in e) {
                    var o = e[a];
                    n.isEqual(i[a], o) || (i[a] = o, delete r[a], this._changed = !0, t.silent || this.trigger("change:" + a, this, o, t))
                }
                return s || t.silent || !this._changed || this.change(t), this._changing = !1, this
            },
            unset: function(e, t) {
                if (!(e in this.attributes)) return this;
                t || (t = {});
                var i = (this.attributes[e], {});
                return i[e] = void 0, t.silent || !this.validate || this._performValidation(i, t) ? (delete this.attributes[e], delete this._escapedAttributes[e], e == this.idAttribute && delete this.id, this._changed = !0, t.silent || (this.trigger("change:" + e, this, void 0, t), this.change(t)), this) : !1
            },
            clear: function(e) {
                e || (e = {});
                var t, i = this.attributes,
                    n = {};
                for (t in i) n[t] = void 0;
                if (!e.silent && this.validate && !this._performValidation(n, e)) return !1;
                if (this.attributes = {}, this._escapedAttributes = {}, this._changed = !0, !e.silent) {
                    for (t in i) this.trigger("change:" + t, this, void 0, e);
                    this.change(e)
                }
                return this
            },
            fetch: function(t) {
                t || (t = {});
                var i = this,
                    n = t.success;
                return t.success = function(e, r, s) {
                    return i.set(i.parse(e, s), t) ? void(n && n(i, e)) : !1
                }, t.error = x(t.error, i, t), (this.sync || e.sync).call(this, "read", this, t)
            },
            save: function(t, i) {
                if (i || (i = {}), t && !this.set(t, i)) return !1;
                var n = this,
                    r = i.success;
                i.success = function(e, t, s) {
                    return n.set(n.parse(e, s), i) ? void(r && r(n, e, s)) : !1
                }, i.error = x(i.error, n, i);
                var s = this.isNew() ? "create" : "update";
                return (this.sync || e.sync).call(this, s, this, i)
            },
            destroy: function(t) {
                if (t || (t = {}), this.isNew()) return this.trigger("destroy", this, this.collection, t);
                var i = this,
                    n = t.success;
                return t.success = function(e) {
                    i.trigger("destroy", i, i.collection, t), n && n(i, e)
                }, t.error = x(t.error, i, t), (this.sync || e.sync).call(this, "delete", this, t)
            },
            url: function() {
                var e = b(this.collection) || this.urlRoot || _();
                return this.isNew() ? e : e + ("/" == e.charAt(e.length - 1) ? "" : "/") + encodeURIComponent(this.id)
            },
            parse: function(e) {
                return e
            },
            clone: function() {
                return new this.constructor(this)
            },
            isNew: function() {
                return null == this.id
            },
            change: function(e) {
                this.trigger("change", this, e), this._previousAttributes = n.clone(this.attributes), this._changed = !1
            },
            hasChanged: function(e) {
                return e ? this._previousAttributes[e] != this.attributes[e] : this._changed
            },
            changedAttributes: function(e) {
                e || (e = this.attributes);
                var t = this._previousAttributes,
                    i = !1;
                for (var r in e) n.isEqual(t[r], e[r]) || (i = i || {}, i[r] = e[r]);
                return i
            },
            previous: function(e) {
                return e && this._previousAttributes ? this._previousAttributes[e] : null
            },
            previousAttributes: function() {
                return n.clone(this._previousAttributes)
            },
            _performValidation: function(e, t) {
                var i = this.validate(e);
                return i ? (t.error ? t.error(this, i, t) : this.trigger("error", this, i, t), !1) : !0
            }
        }), e.Collection = function(e, t) {
            t || (t = {}), t.comparator && (this.comparator = t.comparator), n.bindAll(this, "_onModelEvent", "_removeReference"), this._reset(), e && this.reset(e, {
                silent: !0
            }), this.initialize.apply(this, arguments)
        }, n.extend(e.Collection.prototype, e.Events, {
            model: e.Model,
            initialize: function() {},
            toJSON: function() {
                return this.map(function(e) {
                    return e.toJSON()
                })
            },
            add: function(e, t) {
                if (n.isArray(e))
                    for (var i = 0, r = e.length; r > i; i++) this._add(e[i], t);
                else this._add(e, t);
                return this
            },
            remove: function(e, t) {
                if (n.isArray(e))
                    for (var i = 0, r = e.length; r > i; i++) this._remove(e[i], t);
                else this._remove(e, t);
                return this
            },
            get: function(e) {
                return null == e ? null : this._byId[null != e.id ? e.id : e]
            },
            getByCid: function(e) {
                return e && this._byCid[e.cid || e]
            },
            at: function(e) {
                return this.models[e]
            },
            sort: function(e) {
                if (e || (e = {}), !this.comparator) throw new Error("Cannot sort a set without a comparator");
                return this.models = this.sortBy(this.comparator), e.silent || this.trigger("reset", this, e), this
            },
            pluck: function(e) {
                return n.map(this.models, function(t) {
                    return t.get(e)
                })
            },
            reset: function(e, t) {
                return e || (e = []), t || (t = {}), this.each(this._removeReference), this._reset(), this.add(e, {
                    silent: !0
                }), t.silent || this.trigger("reset", this, t), this
            },
            fetch: function(t) {
                t || (t = {});
                var i = this,
                    n = t.success;
                return t.success = function(e, r, s) {
                    i[t.add ? "add" : "reset"](i.parse(e, s), t), n && n(i, e)
                }, t.error = x(t.error, i, t), (this.sync || e.sync).call(this, "read", this, t)
            },
            create: function(e, t) {
                var i = this;
                if (t || (t = {}), e = this._prepareModel(e, t), !e) return !1;
                var n = t.success;
                return t.success = function(e, r, s) {
                    i.add(e, t), n && n(e, r, s)
                }, e.save(null, t), e
            },
            parse: function(e) {
                return e
            },
            chain: function() {
                return n(this.models).chain()
            },
            _reset: function() {
                this.length = 0, this.models = [], this._byId = {}, this._byCid = {}
            },
            _prepareModel: function(t, i) {
                if (t instanceof e.Model) t.collection || (t.collection = this);
                else {
                    var n = t;
                    t = new this.model(n, {
                        collection: this
                    }), t.validate && !t._performValidation(n, i) && (t = !1)
                }
                return t
            },
            _add: function(e, t) {
                if (t || (t = {}), e = this._prepareModel(e, t), !e) return !1;
                var i = this.getByCid(e);
                if (i) throw new Error(["Can't add the same model to a set twice", i.id]);
                this._byId[e.id] = e, this._byCid[e.cid] = e;
                var n = null != t.at ? t.at : this.comparator ? this.sortedIndex(e, this.comparator) : this.length;
                return this.models.splice(n, 0, e), e.bind("all", this._onModelEvent), this.length++, t.silent || e.trigger("add", e, this, t), e
            },
            _remove: function(e, t) {
                return t || (t = {}), (e = this.getByCid(e) || this.get(e)) ? (delete this._byId[e.id], delete this._byCid[e.cid], this.models.splice(this.indexOf(e), 1), this.length--, t.silent || e.trigger("remove", e, this, t), this._removeReference(e), e) : null
            },
            _removeReference: function(e) {
                this == e.collection && delete e.collection, e.unbind("all", this._onModelEvent)
            },
            _onModelEvent: function(e, t, i, n) {
                ("add" != e && "remove" != e || i == this) && ("destroy" == e && this._remove(t, n), t && e === "change:" + t.idAttribute && (delete this._byId[t.previous(t.idAttribute)], this._byId[t.id] = t), this.trigger.apply(this, arguments))
            }
        });
        var s = ["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "rest", "last", "without", "indexOf", "lastIndexOf", "isEmpty", "groupBy"];
        n.each(s, function(t) {
            e.Collection.prototype[t] = function() {
                return n[t].apply(n, [this.models].concat(n.toArray(arguments)))
            }
        }), e.Router = function(e) {
            e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
        };
        var a = /:([\w\d]+)/g,
            o = /\*([\w\d]+)/g,
            l = /[-[\]{}()+?.,\\^$|#\s]/g;
        n.extend(e.Router.prototype, e.Events, {
            initialize: function() {},
            route: function(t, i, r) {
                e.history || (e.history = new e.History), n.isRegExp(t) || (t = this._routeToRegExp(t)), e.history.route(t, n.bind(function(e) {
                    var n = this._extractParameters(t, e);
                    r.apply(this, n), this.trigger.apply(this, ["route:" + i].concat(n))
                }, this))
            },
            navigate: function(t, i) {
                e.history.navigate(t, i)
            },
            _bindRoutes: function() {
                if (this.routes) {
                    var e = [];
                    for (var t in this.routes) e.unshift([t, this.routes[t]]);
                    for (var i = 0, n = e.length; n > i; i++) this.route(e[i][0], e[i][1], this[e[i][1]])
                }
            },
            _routeToRegExp: function(e) {
                return e = e.replace(l, "\\$&").replace(a, "([^/]*)").replace(o, "(.*?)"), new RegExp("^" + e + "$")
            },
            _extractParameters: function(e, t) {
                return e.exec(t).slice(1)
            }
        }), e.History = function() {
            this.handlers = [], n.bindAll(this, "checkUrl")
        };
        var u = /^#*/,
            c = /msie [\w.]+/,
            h = !1;
        n.extend(e.History.prototype, {
            interval: 50,
            getFragment: function(e, t) {
                if (null == e)
                    if (this._hasPushState || t) {
                        e = window.location.pathname;
                        var i = window.location.search;
                        i && (e += i), 0 == e.indexOf(this.options.root) && (e = e.substr(this.options.root.length))
                    } else e = window.location.hash;
                return decodeURIComponent(e.replace(u, ""))
            },
            start: function(e) {
                if (h) throw new Error("Backbone.history has already been started");
                this.options = n.extend({}, {
                    root: "/"
                }, this.options, e), this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
                var t = this.getFragment(),
                    i = document.documentMode,
                    s = c.exec(navigator.userAgent.toLowerCase()) && (!i || 7 >= i);
                s && (this.iframe = r('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(t)), this._hasPushState ? r(window).bind("popstate", this.checkUrl) : "onhashchange" in window && !s ? r(window).bind("hashchange", this.checkUrl) : setInterval(this.checkUrl, this.interval), this.fragment = t, h = !0;
                var a = window.location,
                    o = a.pathname == this.options.root;
                return !this._wantsPushState || this._hasPushState || o ? (this._wantsPushState && this._hasPushState && o && a.hash && (this.fragment = a.hash.replace(u, ""), window.history.replaceState({}, document.title, a.protocol + "//" + a.host + this.options.root + this.fragment)), this.options.silent ? void 0 : this.loadUrl()) : (this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0)
            },
            route: function(e, t) {
                this.handlers.unshift({
                    route: e,
                    callback: t
                })
            },
            checkUrl: function() {
                var e = this.getFragment();
                return e == this.fragment && this.iframe && (e = this.getFragment(this.iframe.location.hash)), e == this.fragment || e == decodeURIComponent(this.fragment) ? !1 : (this.iframe && this.navigate(e), void(this.loadUrl() || this.loadUrl(window.location.hash)))
            },
            loadUrl: function(e) {
                var t = this.fragment = this.getFragment(e),
                    i = n.any(this.handlers, function(e) {
                        return e.route.test(t) ? (e.callback(t), !0) : void 0
                    });
                return i
            },
            navigate: function(e, t) {
                var i = (e || "").replace(u, "");
                if (this.fragment != i && this.fragment != decodeURIComponent(i)) {
                    if (this._hasPushState) {
                        var n = window.location;
                        0 != i.indexOf(this.options.root) && (i = this.options.root + i), this.fragment = i, window.history.pushState({}, document.title, n.protocol + "//" + n.host + i)
                    } else window.location.hash = this.fragment = i, this.iframe && i != this.getFragment(this.iframe.location.hash) && (this.iframe.document.open().close(), this.iframe.location.hash = i);
                    t && this.loadUrl(e)
                }
            }
        }), e.View = function(e) {
            this.cid = n.uniqueId("view"), this._configure(e || {}), this._ensureElement(), this.delegateEvents(), this.initialize.apply(this, arguments)
        };
        var d = function(e) {
                return r(e, this.el)
            },
            p = /^(\S+)\s*(.*)$/,
            f = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
        n.extend(e.View.prototype, e.Events, {
            tagName: "div",
            $: d,
            initialize: function() {},
            render: function() {
                return this
            },
            remove: function() {
                return r(this.el).remove(), this
            },
            make: function(e, t, i) {
                var n = document.createElement(e);
                return t && r(n).attr(t), i && r(n).html(i), n
            },
            delegateEvents: function(e) {
                if (e || (e = this.events)) {
                    n.isFunction(e) && (e = e.call(this)), r(this.el).unbind(".delegateEvents" + this.cid);
                    for (var t in e) {
                        var i = this[e[t]];
                        if (!i) throw new Error('Event "' + e[t] + '" does not exist');
                        var s = t.match(p),
                            a = s[1],
                            o = s[2];
                        i = n.bind(i, this), a += ".delegateEvents" + this.cid, "" === o ? r(this.el).bind(a, i) : r(this.el).delegate(o, a, i)
                    }
                }
            },
            _configure: function(e) {
                this.options && (e = n.extend({}, this.options, e));
                for (var t = 0, i = f.length; i > t; t++) {
                    var r = f[t];
                    e[r] && (this[r] = e[r])
                }
                this.options = e
            },
            _ensureElement: function() {
                if (this.el) n.isString(this.el) && (this.el = r(this.el).get(0));
                else {
                    var e = this.attributes || {};
                    this.id && (e.id = this.id), this.className && (e["class"] = this.className), this.el = this.make(this.tagName, e)
                }
            }
        });
        var g = function(e, t) {
            var i = y(this, e, t);
            return i.extend = this.extend, i
        };
        e.Model.extend = e.Collection.extend = e.Router.extend = e.View.extend = g;
        var m = {
            create: "POST",
            update: "PUT",
            "delete": "DELETE",
            read: "GET"
        };
        e.sync = function(t, i, s) {
            var a = m[t],
                o = n.extend({
                    type: a,
                    dataType: "json"
                }, s);
            return o.url || (o.url = b(i) || _()), o.data || !i || "create" != t && "update" != t || (o.contentType = "application/json", o.data = JSON.stringify(i.toJSON())), e.emulateJSON && (o.contentType = "application/x-www-form-urlencoded", o.data = o.data ? {
                model: o.data
            } : {}), e.emulateHTTP && ("PUT" === a || "DELETE" === a) && (e.emulateJSON && (o.data._method = a), o.type = "POST", o.beforeSend = function(e) {
                e.setRequestHeader("X-HTTP-Method-Override", a)
            }), "GET" === o.type || e.emulateJSON || (o.processData = !1), r.ajax(o)
        };
        var v = function() {},
            y = function(e, t, i) {
                var r;
                return r = t && t.hasOwnProperty("constructor") ? t.constructor : function() {
                    return e.apply(this, arguments)
                }, n.extend(r, e), v.prototype = e.prototype, r.prototype = new v, t && n.extend(r.prototype, t), i && n.extend(r, i), r.prototype.constructor = r, r.__super__ = e.prototype, r
            },
            b = function(e) {
                return e && e.url ? n.isFunction(e.url) ? e.url() : e.url : null
            },
            _ = function() {
                throw new Error('A "url" property or function must be specified')
            },
            x = function(e, t, i) {
                return function(n) {
                    e ? e(t, n, i) : t.trigger("error", t, n, i)
                }
            },
            w = function(e) {
                return e.replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
            }
    }.call(this);
var Mustache = function() {
    var e = function() {};
    return e.prototype = {
        otag: "{{",
        ctag: "}}",
        pragmas: {},
        buffer: [],
        pragmas_implemented: {
            "IMPLICIT-ITERATOR": !0
        },
        context: {},
        render: function(e, t, i, n) {
            if (n || (this.context = t, this.buffer = []), this.includes("", e)) {
                e = this.render_pragmas(e);
                var r = this.render_section(e, t, i);
                if (n) return this.render_tags(r, t, i, n);
                this.render_tags(r, t, i, n)
            } else {
                if (n) return e;
                this.send(e)
            }
        },
        send: function(e) {
            "" != e && this.buffer.push(e)
        },
        render_pragmas: function(e) {
            if (!this.includes("%", e)) return e;
            var t = this,
                i = new RegExp(this.otag + "%([\\w-]+) ?([\\w]+=[\\w]+)?" + this.ctag);
            return e.replace(i, function(e, i, n) {
                if (!t.pragmas_implemented[i]) throw {
                    message: "This implementation of mustache doesn't understand the '" + i + "' pragma"
                };
                if (t.pragmas[i] = {}, n) {
                    var r = n.split("=");
                    t.pragmas[i][r[0]] = r[1]
                }
                return ""
            })
        },
        render_partial: function(e, t, i) {
            if (e = this.trim(e), !i || void 0 === i[e]) throw {
                message: "unknown_partial '" + e + "'"
            };
            return "object" != typeof t[e] ? this.render(i[e], t, i, !0) : this.render(i[e], t[e], i, !0)
        },
        render_section: function(e, t, i) {
            if (!this.includes("#", e) && !this.includes("^", e)) return e;
            var n = this,
                r = new RegExp(this.otag + "(\\^|\\#)\\s*(.+)\\s*" + this.ctag + "\n*([\\s\\S]+?)" + this.otag + "\\/\\s*\\2\\s*" + this.ctag + "\\s*", "mg");
            return e.replace(r, function(e, r, s, a) {
                var o = n.find(s, t);
                return "^" == r ? !o || n.is_array(o) && 0 === o.length ? n.render(a, t, i, !0) : "" : "#" == r ? n.is_array(o) ? n.map(o, function(e) {
                    return n.render(a, n.create_context(e), i, !0)
                }).join("") : n.is_object(o) ? n.render(a, n.create_context(o), i, !0) : "function" == typeof o ? o.call(t, a, function(e) {
                    return n.render(e, t, i, !0)
                }) : o ? n.render(a, t, i, !0) : "" : void 0
            })
        },
        render_tags: function(e, t, i, n) {
            for (var r = this, s = function() {
                    return new RegExp(r.otag + "(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?" + r.ctag + "+", "g")
                }, a = s(), o = function(e, n, o) {
                    switch (n) {
                        case "!":
                            return "";
                        case "=":
                            return r.set_delimiters(o), a = s(), "";
                        case ">":
                            return r.render_partial(o, t, i);
                        case "{":
                            return r.find(o, t);
                        default:
                            return r.escape(r.find(o, t))
                    }
                }, l = e.split("\n"), u = 0; u < l.length; u++) l[u] = l[u].replace(a, o, this), n || this.send(l[u]);
            return n ? l.join("\n") : void 0
        },
        set_delimiters: function(e) {
            var t = e.split(" ");
            this.otag = this.escape_regex(t[0]), this.ctag = this.escape_regex(t[1])
        },
        escape_regex: function(e) {
            if (!arguments.callee.sRE) {
                var t = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"];
                arguments.callee.sRE = new RegExp("(\\" + t.join("|\\") + ")", "g")
            }
            return e.replace(arguments.callee.sRE, "\\$1")
        },
        find: function(e, t) {
            function i(e) {
                return e === !1 || 0 === e || e
            }
            e = this.trim(e);
            var n;
            return i(t[e]) ? n = t[e] : i(this.context[e]) && (n = this.context[e]), "function" == typeof n ? n.apply(t) : void 0 !== n ? n : ""
        },
        includes: function(e, t) {
            return -1 != t.indexOf(this.otag + e)
        },
        escape: function(e) {
            return e = String(null === e ? "" : e), e.replace(/&(?!\w+;)|["'<>\\]/g, function(e) {
                switch (e) {
                    case "&":
                        return "&amp;";
                    case "\\":
                        return "\\\\";
                    case '"':
                        return "&quot;";
                    case "'":
                        return "&#39;";
                    case "<":
                        return "&lt;";
                    case ">":
                        return "&gt;";
                    default:
                        return e
                }
            })
        },
        create_context: function(e) {
            if (this.is_object(e)) return e;
            var t = ".";
            this.pragmas["IMPLICIT-ITERATOR"] && (t = this.pragmas["IMPLICIT-ITERATOR"].iterator);
            var i = {};
            return i[t] = e, i
        },
        is_object: function(e) {
            return e && "object" == typeof e
        },
        is_array: function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        },
        trim: function(e) {
            return e.replace(/^\s*|\s*$/g, "")
        },
        map: function(e, t) {
            if ("function" == typeof e.map) return e.map(t);
            for (var i = [], n = e.length, r = 0; n > r; r++) i.push(t(e[r]));
            return i
        }
    }, {
        name: "mustache.js",
        version: "0.3.1-dev",
        to_html: function(t, i, n, r) {
            var s = new e;
            return r && (s.send = r), s.render(t, i, n), r ? void 0 : s.buffer.join("\n")
        }
    }
}();
! function() {
    function resolveDefs(c, block, def) {
        return ("string" == typeof block ? block : block.toString()).replace(c.define, function(match, code, assign, value) {
            return 0 === code.indexOf("def.") && (code = code.substring(4)), code in def || (":" === assign ? def[code] = value : eval("def[code]=" + value)), ""
        }).replace(c.use, function(match, code) {
            var v = eval(code);
            return v ? resolveDefs(c, v, def) : v
        })
    }
    var doT = {
        version: "0.1.6"
    };
    "undefined" != typeof module && module.exports ? module.exports = doT : this.doT = doT, doT.templateSettings = {
        evaluate: /\{\{([\s\S]+?)\}\}/g,
        interpolate: /\{\{=([\s\S]+?)\}\}/g,
        encode: /\{\{!([\s\S]+?)\}\}/g,
        use: /\{\{#([\s\S]+?)\}\}/g,
        define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
        varname: "it",
        strip: !0,
        append: !0
    }, doT.template = function(e, t, i) {
        t = t || doT.templateSettings;
        var n = t.append ? "'+(" : "';out+=(",
            r = t.append ? ")+'" : ");out+='",
            s = t.use || t.define ? resolveDefs(t, e, i || {}) : e;
        s = ("var out='" + (t.strip ? s.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]|(\/\*[\s\S]*?\*\/)/g, "") : s).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(t.interpolate, function(e, t) {
            return n + t.replace(/\\'/g, "'").replace(/\\\\/g, "\\").replace(/[\r\t\n]/g, " ") + r
        }).replace(t.encode, function(e, t) {
            return n + t.replace(/\\'/g, "'").replace(/\\\\/g, "\\").replace(/[\r\t\n]/g, " ") + ").toString().replace(/&(?!\\w+;)/g, '&#38;').split('<').join('&#60;').split('>').join('&#62;').split('\"').join('&#34;').split(\"'\").join('&#39;').split('/').join('&#47;'" + r
        }).replace(t.evaluate, function(e, t) {
            return "';" + t.replace(/\\'/g, "'").replace(/\\\\/g, "\\").replace(/[\r\t\n]/g, " ") + "out+='"
        }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").split("out+='';").join("").split("var out='';out+=").join("var out=");
        try {
            return new Function(t.varname, s)
        } catch (a) {
            throw "undefined" != typeof console && console.log("Could not create a template function: " + s), a
        }
    }
}();
var jade = function(e) {
    return Array.isArray || (Array.isArray = function(e) {
        return "[object Array]" == Object.prototype.toString.call(e)
    }), Object.keys || (Object.keys = function(e) {
        var t = [];
        for (var i in e) e.hasOwnProperty(i) && t.push(i);
        return t
    }), e.attrs = function(t) {
        var i = [],
            n = t.terse;
        delete t.terse;
        var r = Object.keys(t),
            s = r.length;
        if (s) {
            i.push("");
            for (var a = 0; s > a; ++a) {
                var o = r[a],
                    l = t[o];
                "boolean" == typeof l || null == l ? l && i.push(n ? o : o + '="' + o + '"') : i.push("class" == o && Array.isArray(l) ? o + '="' + e.escape(l.join(" ")) + '"' : o + '="' + e.escape(l) + '"')
            }
        }
        return i.join(" ")
    }, e.escape = function(e) {
        return String(e).replace(/&(?!\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }, e.rethrow = function() {}, e
}({});
