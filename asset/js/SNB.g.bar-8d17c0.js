! function() {
    function t(t) {
        return Math.floor(t) + .5
    }

    function a(t, a, n, r, o) {
        function i(t, a) {
            return "current" === a ? 4 > t ? f = 1 : 8 > t ? f = 2 : 15 > t ? f = 3 : 30 > t ? f = 5 : 40 >= t && (f = 8) : "volume" === a ? f = 3 > t ? 2 : 5 > t ? 3 : 5 : "percentage" === a && (f = 5 > t ? 1 : 2), f
        }

        function s(t, a) {
            return 0 > t ? (a = a.toFixed(Math.abs(t)), parseFloat(a)) : a
        }
        var c, h, l = a - t;
        if (40 > l && l > 10 && "current" === o) c = Math.ceil(l), h = 0;
        else {
            var u = e(l);
            c = Math.ceil(u.mantissa), h = u.exponent, 3 > c && "current" === o && (c *= 10, h -= 1)
        }
        var f = i(c, o) * Math.pow(10, h),
            v = Math.floor(t / f) * f,
            x = Math.ceil(a / f) * f + f;
        v = s(h, v), "volume" !== o && (.3 > (t - v) / f && v - f > 0 && (v -= f), (x - a) / f > 1 && (x -= f));
        var p = Math.round((x - v) / f),
            d = v,
            m = r / p,
            M = [];
        x > 0 && 0 > v && p++;
        for (var y = 0; p > y; y++) {
            var g = d + y * f;
            if (g = s(h, g), "volume" === o) {
                var w, b, _ = e(g),
                    h = _.exponent;
                h >= 9 ? (w = "B", b = h - 9) : h >= 6 ? (w = "M", b = h - 6) : h >= 3 ? (w = "K", b = h - 3) : (w = "", b = 0), g = _.mantissa * Math.pow(10, b) + w
            }
            M.push({
                yAxis: n - y * m,
                text: g
            })
        }
        return {
            yLabelObjs: M,
            dataRange: {
                start: v,
                end: x
            },
            tick: f
        }
    }

    function e(t) {
        if (0 == t) return {
            mantissa: 0,
            exponent: 0
        };
        var a, e, n = parseFloat(t);
        return a = Math.floor(Math.log(n) / Math.LN10), e = n / Math.pow(10, a), {
            mantissa: e,
            exponent: a
        }
    }

    function n(t, a) {
        {
            var e = t.start || 0,
                n = t.end,
                r = a.start || 0,
                o = a.end || 1e3;
            this.options
        }
        return function(t, a) {
            var i;
            return i = a ? (t - e) * (o - r) / (n - e) + r : 0 == t ? r : (t - e) * (o - r) / (n - e) + r, r + o - i
        }
    }

    function r(e, r, o, i, s) {
        s = s || {};
        var c = s.legend.length,
            h = i.length,
            l = s.colors || ["#06c", "red", "green"],
            u = s.legend,
            f = s.typeName,
            v = [],
            x = s.labCb,
            p = 60,
            d = 60,
            m = o - 60,
            M = 20,
            y = o - d - M,
            g = (r - p) / c,
            w = g / (h + 2 + .5 * (h - 1)),
            b = new e.set;
        _.each(i, function(t) {
            v = v.concat(t)
        });
        var A, B = _.max(v),
            k = _.min(v),
            L = a(k, B, m, y, "current");
        _.each(L.yLabelObjs, function(a) {
            var n = x(a.text),
                o = "#f0f0f0";
            0 == a.text && (A = a.yAxis), e.text(5, a.yAxis - 8, n).attr({
                "text-anchor": "start",
                "font-size": "12px"
            }), e.path(["M", .5, t(a.yAxis), "L", r - 20, t(a.yAxis)]).attr({
                stroke: o
            })
        });
        var R = 300,
            F = o - 30;
        _.each(i, function(a, r) {
            var o = l[r],
                i = p;
            i += w + 1.5 * w * r;
            var s = f[r];
            e.rect(t(R), t(F), t(10), t(10)).attr({
                fill: o,
                "stroke-width": "0px"
            }), R += 15;
            var c = e.text(t(R), t(F + 6), s).attr({
                fill: o,
                "text-anchor": "start"
            });
            R += c.getBBox().width + 20, _.each(a, function(a) {
                var r = n(L.dataRange, {
                        start: M,
                        end: m
                    })(a, !0),
                    s = a > 0 ? A - r : r - A,
                    c = a > 0 ? r : A,
                    h = e.rect(t(i), t(c), t(w), t(s)).attr({
                        fill: o,
                        "stroke-width": "0px"
                    });
                h.data("x", i + w / 2).data("value", a).data("y", c), h.hover(function() {
                    this.attr({
                        "fill-opacity": "0.7"
                    });
                    var t = e.text(this.data("x"), this.data("y") - 8, x(this.data("value")));
                    this.data("elem", t)
                }, function() {
                    this.attr({
                        "fill-opacity": "1"
                    }), this.data("elem") && this.data("elem").remove()
                }), b.push(h), i += g
            })
        }), _.each(u, function(t, a) {
            var n = p + g / 2;
            n += g * a, e.text(n, m + 10, t).attr({
                "text-anchor": "middlle",
                "font-size": "12px"
            })
        })
    }
    var o = function() {};
    o.prototype = Raphael.g, r.prototype = new o, Raphael.fn.SNBBarChart = function(t, a, e, n) {
        return new r(this, t, a, e, n)
    }
}();
