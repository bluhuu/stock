! function() {
    var n = function() {
        var n = this;
        n.parseLongUrl = function(n) {
            if (!n) return n;
            var e = "",
                t = "",
                r = "",
                s = function(n, s) {
                    if (n.match(/xueqiu.com|xqdoc.b0.upaiyun.com/i)) return s;
                    if (n) {
                        (-1 !== n.indexOf("http://") || -1 !== n.indexOf("https://")) && (t = -1 !== n.indexOf("http://") ? "http://" : "https://");
                        var a = n.length,
                            i = t.length,
                            u = a > i + 30 ? i + 30 + 1 : a;
                        e = n.substr(i, u);
                        var l = e.length;
                        r = n.substr(l + i)
                    }
                    var p = s.replace(/<[^>]+>/g, ""),
                        c = "";
                    return c = p ? '<a href="' + n + '" class="xueqiu_timleine_link" target="_blank" title="' + n + '" >' + p : '<a href="' + n + '" class="xueqiu_timleine_link" target="_blank" title="' + n + '" ><span class="" >' + t + '</span><span class="js-display-url">' + e + "</span>", r && (c += '<span class="url_invisible" >' + r + '</span><span class="url_ellipsis"><span class="url_invisible" >&nbsp;</span>…</span>'), c += "</a>"
                },
                a = /<a href=(['"].+?['"\s])[^>]*>[^<]+<\/a>/g;
            return n = n.replace(a, function(n, e) {
                return e = e.substr(1, e.length - 2), n = s(e, n)
            })
        }, n.queryUrl = function(n, e, t) {
            n = n.replace(/^[^?=]*\?/gi, "").split("#")[0], e = e || "&", t = t || "";
            var r = {};
            return n.replace(new RegExp("(^|" + e + ")([^" + e + "=]+)=([^" + e + "]*)", "g"), function(n, e, t, s) {
                try {
                    t = decodeURIComponent(t).replace(/^[\s\uFEFF\xa0\u3000]+|[\uFEFF\xa0\u3000\s]+$/g, "")
                } catch (a) {}
                try {
                    s = decodeURIComponent(s)
                } catch (a) {}
                t in r ? r[t] instanceof Array ? r[t].push(s) : r[t] = [r[t], s] : r[t] = /\[\]$/.test(t) ? [s] : s
            }), t ? r[t] : r
        }, n.keys = function() {
            return Object.keys || function(n) {
                var e = [];
                for (var t in n) n.hasOwnProperty(t) && e.push(t);
                return e
            }
        }()
    };
    "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = function() {
        return new n
    } : (window.SNB = window.SNB || {}, SNB.helpers = new n)
}();
