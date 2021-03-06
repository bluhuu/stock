define("lib/store.js", [], function(e, t, n) {
    ! function() {
        function e() {
            try {
                return l in u && u[l]
            } catch (e) {
                return !1
            }
        }

        function t() {
            try {
                return f in u && u[f] && u[f][u.location.hostname]
            } catch (e) {
                return !1
            }
        }

        function r(e) {
            return function() {
                var t = Array.prototype.slice.call(arguments, 0);
                t.unshift(o), d.appendChild(o), o.addBehavior("#default#userData"), o.load(l);
                var n = e.apply(a, t);
                return d.removeChild(o), n
            }
        }

        function i(e) {
            return "_" + e
        }
        var o, a = {},
            u = window,
            c = u.document,
            l = "localStorage",
            f = "globalStorage",
            s = "__storejs__";
        if (a.disabled = !1, a.set = function() {}, a.get = function() {}, a.remove = function() {}, a.clear = function() {}, a.transact = function(e, t, n) {
                var r = a.get(e);
                null == n && (n = t, t = null), "undefined" == typeof r && (r = t || {}), n(r), a.set(e, r)
            }, a.getAll = function() {}, a.serialize = function(e) {
                return JSON.stringify(e)
            }, a.deserialize = function(e) {
                return "string" != typeof e ? void 0 : JSON.parse(e)
            }, e()) o = u[l], a.set = function(e, t) {
            return void 0 === t ? a.remove(e) : void o.setItem(e, a.serialize(t))
        }, a.get = function(e) {
            return a.deserialize(o.getItem(e))
        }, a.remove = function(e) {
            o.removeItem(e)
        }, a.clear = function() {
            o.clear()
        }, a.getAll = function() {
            for (var e = {}, t = 0; t < o.length; ++t) {
                var n = o.key(t);
                e[n] = a.get(n)
            }
            return e
        };
        else if (t()) o = u[f][u.location.hostname], a.set = function(e, t) {
            return void 0 === t ? a.remove(e) : void(o[e] = a.serialize(t))
        }, a.get = function(e) {
            return a.deserialize(o[e] && o[e].value)
        }, a.remove = function(e) {
            delete o[e]
        }, a.clear = function() {
            for (var e in o) delete o[e]
        }, a.getAll = function() {
            for (var e = {}, t = 0; t < o.length; ++t) {
                var n = o.key(t);
                e[n] = a.get(n)
            }
            return e
        };
        else if (c.documentElement.addBehavior) {
            var d, v;
            try {
                v = new ActiveXObject("htmlfile"), v.open(), v.write('<script>document.w=window</script><iframe src="/favicon.ico"></frame>'), v.close(), d = v.w.frames[0].document, o = d.createElement("div")
            } catch (m) {
                o = c.createElement("div"), d = c.body
            }
            a.set = r(function(e, t, n) {
                return t = i(t), void 0 === n ? a.remove(t) : (e.setAttribute(t, a.serialize(n)), void e.save(l))
            }), a.get = r(function(e, t) {
                return t = i(t), a.deserialize(e.getAttribute(t))
            }), a.remove = r(function(e, t) {
                t = i(t), e.removeAttribute(t), e.save(l)
            }), a.clear = r(function(e) {
                var t = e.XMLDocument.documentElement.attributes;
                e.load(l);
                for (var n, r = 0; n = t[r]; r++) e.removeAttribute(n.name);
                e.save(l)
            }), a.getAll = r(function(e) {
                var t = e.XMLDocument.documentElement.attributes;
                e.load(l);
                for (var n, r = {}, i = 0; n = t[i]; ++i) r[n] = a.get(n);
                return r
            })
        }
        try {
            a.set(s, s), a.get(s) != s && (a.disabled = !0), a.remove(s)
        } catch (m) {
            a.disabled = !0
        }
        n.exports = a
    }()
});
