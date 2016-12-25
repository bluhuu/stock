define("lib/ueditor.js", [], function(e, t, n) {
    function r(e, t, n) {
        var r;
        return t = t.toLowerCase(), (r = e.__allListeners || n && (e.__allListeners = {})) && (r[t] || n && (r[t] = []))
    }

    function a(e, t, n, r, i, o) {
        var s, l = r && e[t];
        for (!l && (l = e[n]); !l && (s = (s || e).parentNode);) {
            if ("BODY" == s.tagName || o && !o(s)) return null;
            l = s[n]
        }
        return l && i && !i(l) ? a(l, t, n, !1, i) : l
    }
    var i = window.UEDITOR_CONFIG || {},
        o = window.baidu || {};
    window.baidu = o, window.UE = o.editor = {}, UE.plugins = {}, UE.commands = {}, UE.instants = {}, UE.I18N = {}, UE.version = "1.2.3.0";
    var s = UE.dom = {},
        l = UE.browser = function() {
            var e = navigator.userAgent.toLowerCase(),
                t = window.opera,
                n = {
                    ie: !!window.ActiveXObject,
                    opera: !!t && t.version,
                    webkit: e.indexOf(" applewebkit/") > -1,
                    mac: e.indexOf("macintosh") > -1,
                    quirks: "BackCompat" == document.compatMode
                };
            n.gecko = "Gecko" == navigator.product && !n.webkit && !n.opera;
            var r = 0;
            if (n.ie && (r = parseFloat(e.match(/msie (\d+)/)[1]), n.ie9Compat = 9 == document.documentMode, n.ie8 = !!document.documentMode, n.ie8Compat = 8 == document.documentMode, n.ie7Compat = 7 == r && !document.documentMode || 7 == document.documentMode, n.ie6Compat = 7 > r || n.quirks), n.gecko) {
                var a = e.match(/rv:([\d\.]+)/);
                a && (a = a[1].split("."), r = 1e4 * a[0] + 100 * (a[1] || 0) + 1 * (a[2] || 0))
            }
            return /chrome\/(\d+\.\d)/i.test(e) && (n.chrome = +RegExp.$1), /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(e) && !/chrome/i.test(e) && (n.safari = +(RegExp.$1 || RegExp.$2)), n.opera && (r = parseFloat(t.version())), n.webkit && (r = parseFloat(e.match(/ applewebkit\/(\d+)/)[1])), n.version = r, n.isCompatible = !n.mobile && (n.ie && r >= 6 || n.gecko && r >= 10801 || n.opera && r >= 9.5 || n.air && r >= 1 || n.webkit && r >= 522 || !1), n
        }(),
        d = l.ie,
        c = (l.webkit, l.gecko, l.opera),
        l = UE.browser = function() {
            var e = navigator.userAgent.toLowerCase(),
                t = window.opera,
                n = {
                    ie: !!window.ActiveXObject,
                    opera: !!t && t.version,
                    webkit: e.indexOf(" applewebkit/") > -1,
                    mac: e.indexOf("macintosh") > -1,
                    quirks: "BackCompat" == document.compatMode
                };
            n.gecko = "Gecko" == navigator.product && !n.webkit && !n.opera;
            var r = 0;
            if (n.ie && (r = parseFloat(e.match(/msie (\d+)/)[1]), n.ie9Compat = 9 == document.documentMode, n.ie8 = !!document.documentMode, n.ie8Compat = 8 == document.documentMode, n.ie7Compat = 7 == r && !document.documentMode || 7 == document.documentMode, n.ie6Compat = 7 > r || n.quirks), n.gecko) {
                var a = e.match(/rv:([\d\.]+)/);
                a && (a = a[1].split("."), r = 1e4 * a[0] + 100 * (a[1] || 0) + 1 * (a[2] || 0))
            }
            return /chrome\/(\d+\.\d)/i.test(e) && (n.chrome = +RegExp.$1), /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(e) && !/chrome/i.test(e) && (n.safari = +(RegExp.$1 || RegExp.$2)), n.opera && (r = parseFloat(t.version())), n.webkit && (r = parseFloat(e.match(/ applewebkit\/(\d+)/)[1])), n.version = r, n.isCompatible = !n.mobile && (n.ie && r >= 6 || n.gecko && r >= 10801 || n.opera && r >= 9.5 || n.air && r >= 1 || n.webkit && r >= 522 || !1), n
        }(),
        d = l.ie,
        c = (l.webkit, l.gecko, l.opera),
        u = UE.utils = {
            makeInstance: function(e) {
                var t = new Function;
                return t.prototype = e, e = new t, t.prototype = null, e
            },
            extend: function(e, t, n) {
                if (t)
                    for (var r in t) n && e.hasOwnProperty(r) || (e[r] = t[r]);
                return e
            },
            isArray: function(e) {
                return "[object Array]" === Object.prototype.toString.apply(e)
            },
            isString: function(e) {
                return "string" == typeof e || e.constructor == String
            },
            inherits: function(e, t) {
                var n = e.prototype,
                    r = u.makeInstance(t.prototype);
                return u.extend(r, n, !0), e.prototype = r, r.constructor = e
            },
            bind: function(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            },
            defer: function(e, t, n) {
                var r;
                return function() {
                    n && clearTimeout(r), r = setTimeout(e, t)
                }
            },
            indexOf: function(e, t, n) {
                for (var r = n || 0, a = e.length; a > r; r++)
                    if (e[r] === t) return r;
                return -1
            },
            findNode: function(e, t, n) {
                for (var r, a = 0; r = e[a++];)
                    if (n ? n(r) : -1 != this.indexOf(t, r.tagName.toLowerCase())) return r
            },
            removeItem: function(e, t) {
                for (var n = 0, r = e.length; r > n; n++) e[n] === t && (e.splice(n, 1), n--)
            },
            trim: function(e) {
                return e.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "")
            },
            listToMap: function(e) {
                if (!e) return {};
                e = u.isArray(e) ? e : e.split(",");
                for (var t, n = 0, r = {}; t = e[n++];) r[t.toUpperCase()] = r[t] = 1;
                return r
            },
            unhtml: function(e, t) {
                return e ? e.replace(t || /[&<">]/g, function(e) {
                    return {
                        "<": "&lt;",
                        "&": "&amp;",
                        '"': "&quot;",
                        ">": "&gt;"
                    }[e]
                }) : ""
            },
            html: function(e) {
                return e ? e.replace(/&((g|l|quo)t|amp);/g, function(e) {
                    return {
                        "&lt;": "<",
                        "&amp;": "&",
                        "&quot;": '"',
                        "&gt;": ">"
                    }[e]
                }) : ""
            },
            cssStyleToDomStyle: function() {
                var e = document.createElement("div").style,
                    t = {
                        "float": void 0 != e.cssFloat ? "cssFloat" : void 0 != e.styleFloat ? "styleFloat" : "float"
                    };
                return function(e) {
                    return t[e] || (t[e] = e.toLowerCase().replace(/-./g, function(e) {
                        return e.charAt(1).toUpperCase()
                    }))
                }
            }(),
            loadFile: function() {
                var e = {};
                return function(t, n, r) {
                    var a = e[n.src || n.href];
                    if (a) return void(u.isArray(a.funs) && (a.ready ? r() : e[n.src || n.href].funs.push(r)));
                    if (e[n.src || n.href] = r ? {
                            funs: [r]
                        } : 1, !t.body) return void t.write('<script src="' + n.src + '"></script>');
                    if (!n.id || !t.getElementById(n.id)) {
                        var i = t.createElement(n.tag);
                        delete n.tag;
                        for (var o in n) i.setAttribute(o, n[o]);
                        i.onload = i.onreadystatechange = function() {
                            if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                                if (a = e[n.src || n.href], a.funs) {
                                    a.ready = 1;
                                    for (var t; t = a.funs.pop();) t()
                                }
                                i.onload = i.onreadystatechange = null
                            }
                        }, t.getElementsByTagName("head")[0].appendChild(i)
                    }
                }
            }(),
            isEmptyObject: function(e) {
                for (var t in e) return !1;
                return !0
            },
            isFunction: function(e) {
                return "[object Function]" == Object.prototype.toString.call(e)
            },
            fixColor: function(e, t) {
                if (/color/i.test(e) && /rgba?/.test(t)) {
                    var n = t.split(",");
                    if (n.length > 3) return "";
                    t = "#";
                    for (var r, a = 0; r = n[a++];) r = parseInt(r.replace(/[^\d]/gi, ""), 10).toString(16), t += 1 == r.length ? "0" + r : r;
                    t = t.toUpperCase()
                }
                return t
            },
            optCss: function(e) {
                function t(e, t) {
                    if (!e) return "";
                    var n = e.top,
                        r = e.bottom,
                        a = e.left,
                        i = e.right,
                        o = "";
                    if (n && a && r && i) o += ";" + t + ":" + (n == r && r == a && a == i ? n : n == r && a == i ? n + " " + a : a == i ? n + " " + a + " " + r : n + " " + i + " " + r + " " + a) + ";";
                    else
                        for (var s in e) o += ";" + t + "-" + s + ":" + e[s] + ";";
                    return o
                }
                var n, r;
                return e = e.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi, function(e, t, a, i) {
                    if (1 == i.split(" ").length) switch (t) {
                        case "padding":
                            return !n && (n = {}), n[a] = i, "";
                        case "margin":
                            return !r && (r = {}), r[a] = i, "";
                        case "border":
                            return "initial" == i ? "" : e
                    }
                    return e
                }), e += t(n, "padding") + t(r, "margin"), e.replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, "").replace(/;([ \n\r\t]+)|\1;/g, ";").replace(/(&((l|g)t|quot|#39))?;{2,}/g, function(e, t) {
                    return t ? t + ";;" : ";"
                })
            },
            domReady: function() {
                function e() {
                    t = !0;
                    for (var e; e = n.pop();) e()
                }
                var t = !1,
                    n = [];
                return function(r) {
                    return "complete" === document.readyState ? r && setTimeout(r, 1) : (r && n.push(r), t && e(), void(l.ie ? (! function() {
                        if (!t) {
                            try {
                                document.documentElement.doScroll("left")
                            } catch (n) {
                                return void setTimeout(arguments.callee, 0)
                            }
                            e()
                        }
                    }(), window.attachEvent("onload", e)) : (document.addEventListener("DOMContentLoaded", function() {
                        document.removeEventListener("DOMContentLoaded", arguments.callee, !1), e()
                    }, !1), window.addEventListener("load", e, !1))))
                }
            }()
        };
    u.domReady();
    var f = UE.EventBase = function() {};
    f.prototype = {
        addListener: function(e, t) {
            e = u.trim(e).split(" ");
            for (var n, a = 0; n = e[a++];) r(this, n, !0).push(t)
        },
        removeListener: function(e, t) {
            e = u.trim(e).split(" ");
            for (var n, a = 0; n = e[a++];) u.removeItem(r(this, n) || [], t)
        },
        fireEvent: function(e) {
            e = u.trim(e).split(" ");
            for (var t, n = 0; t = e[n++];) {
                var a, i, o, s = r(this, t);
                if (s)
                    for (o = s.length; o--;) i = s[o].apply(this, arguments), void 0 !== i && (a = i);
                (i = this["on" + t.toLowerCase()]) && (a = i.apply(this, arguments))
            }
            return a
        }
    }, o.editor.dom = o.editor.dom || {};
    var m = s.dtd = function() {
            function e(e) {
                for (var t in e) e[t.toUpperCase()] = e[t];
                return e
            }

            function t(e) {
                for (var t = arguments, n = 1; n < t.length; n++) {
                    var r = t[n];
                    for (var a in r) e.hasOwnProperty(a) || (e[a] = r[a])
                }
                return e
            }
            var n = e({
                    isindex: 1,
                    fieldset: 1
                }),
                r = e({
                    input: 1,
                    button: 1,
                    select: 1,
                    textarea: 1,
                    label: 1
                }),
                a = t(e({
                    a: 1
                }), r),
                i = t({
                    iframe: 1
                }, a),
                o = e({
                    hr: 1,
                    ul: 1,
                    menu: 1,
                    div: 1,
                    blockquote: 1,
                    noscript: 1,
                    table: 1,
                    center: 1,
                    address: 1,
                    dir: 1,
                    pre: 1,
                    h5: 1,
                    dl: 1,
                    h4: 1,
                    noframes: 1,
                    h6: 1,
                    ol: 1,
                    h1: 1,
                    h3: 1,
                    h2: 1
                }),
                s = e({
                    ins: 1,
                    del: 1,
                    script: 1,
                    style: 1
                }),
                l = t(e({
                    b: 1,
                    acronym: 1,
                    bdo: 1,
                    "var": 1,
                    "#": 1,
                    abbr: 1,
                    code: 1,
                    br: 1,
                    i: 1,
                    cite: 1,
                    kbd: 1,
                    u: 1,
                    strike: 1,
                    s: 1,
                    tt: 1,
                    strong: 1,
                    q: 1,
                    samp: 1,
                    em: 1,
                    dfn: 1,
                    span: 1
                }), s),
                d = t(e({
                    sub: 1,
                    img: 1,
                    embed: 1,
                    object: 1,
                    sup: 1,
                    basefont: 1,
                    map: 1,
                    applet: 1,
                    font: 1,
                    big: 1,
                    small: 1
                }), l),
                c = t(e({
                    p: 1
                }), d),
                u = t(e({
                    iframe: 1
                }), d, r),
                f = e({
                    img: 1,
                    embed: 1,
                    noscript: 1,
                    br: 1,
                    kbd: 1,
                    center: 1,
                    button: 1,
                    basefont: 1,
                    h5: 1,
                    h4: 1,
                    samp: 1,
                    h6: 1,
                    ol: 1,
                    h1: 1,
                    h3: 1,
                    h2: 1,
                    form: 1,
                    font: 1,
                    "#": 1,
                    select: 1,
                    menu: 1,
                    ins: 1,
                    abbr: 1,
                    label: 1,
                    code: 1,
                    table: 1,
                    script: 1,
                    cite: 1,
                    input: 1,
                    iframe: 1,
                    strong: 1,
                    textarea: 1,
                    noframes: 1,
                    big: 1,
                    small: 1,
                    span: 1,
                    hr: 1,
                    sub: 1,
                    bdo: 1,
                    "var": 1,
                    div: 1,
                    object: 1,
                    sup: 1,
                    strike: 1,
                    dir: 1,
                    map: 1,
                    dl: 1,
                    applet: 1,
                    del: 1,
                    isindex: 1,
                    fieldset: 1,
                    ul: 1,
                    b: 1,
                    acronym: 1,
                    a: 1,
                    blockquote: 1,
                    i: 1,
                    u: 1,
                    s: 1,
                    tt: 1,
                    address: 1,
                    q: 1,
                    pre: 1,
                    p: 1,
                    em: 1,
                    dfn: 1
                }),
                m = t(e({
                    a: 0
                }), u),
                p = e({
                    tr: 1
                }),
                h = e({
                    "#": 1
                }),
                g = t(e({
                    param: 1
                }), f),
                y = t(e({
                    form: 1
                }), n, i, o, c),
                b = e({
                    li: 1
                }),
                v = e({
                    style: 1,
                    script: 1
                }),
                C = e({
                    base: 1,
                    link: 1,
                    meta: 1,
                    title: 1
                }),
                N = t(C, v),
                E = e({
                    head: 1,
                    body: 1
                }),
                T = e({
                    html: 1
                }),
                k = e({
                    address: 1,
                    blockquote: 1,
                    center: 1,
                    dir: 1,
                    div: 1,
                    dl: 1,
                    fieldset: 1,
                    form: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1,
                    hr: 1,
                    isindex: 1,
                    menu: 1,
                    noframes: 1,
                    ol: 1,
                    p: 1,
                    pre: 1,
                    table: 1,
                    ul: 1
                }),
                x = e({
                    area: 1,
                    base: 1,
                    br: 1,
                    col: 1,
                    hr: 1,
                    img: 1,
                    input: 1,
                    link: 1,
                    meta: 1,
                    param: 1,
                    embed: 1
                });
            return e({
                $nonBodyContent: t(T, E, C),
                $block: k,
                $inline: m,
                $body: t(e({
                    script: 1,
                    style: 1
                }), k),
                $cdata: e({
                    script: 1,
                    style: 1
                }),
                $empty: x,
                $nonChild: e({
                    iframe: 1,
                    textarea: 1
                }),
                $listItem: e({
                    dd: 1,
                    dt: 1,
                    li: 1
                }),
                $list: e({
                    ul: 1,
                    ol: 1,
                    dl: 1
                }),
                $isNotEmpty: e({
                    table: 1,
                    ul: 1,
                    ol: 1,
                    dl: 1,
                    iframe: 1,
                    area: 1,
                    base: 1,
                    col: 1,
                    hr: 1,
                    img: 1,
                    embed: 1,
                    input: 1,
                    link: 1,
                    meta: 1,
                    param: 1
                }),
                $removeEmpty: e({
                    a: 1,
                    abbr: 1,
                    acronym: 1,
                    address: 1,
                    b: 1,
                    bdo: 1,
                    big: 1,
                    cite: 1,
                    code: 1,
                    del: 1,
                    dfn: 1,
                    em: 1,
                    font: 1,
                    i: 1,
                    ins: 1,
                    label: 1,
                    kbd: 1,
                    q: 1,
                    s: 1,
                    samp: 1,
                    small: 1,
                    span: 1,
                    strike: 1,
                    strong: 1,
                    sub: 1,
                    sup: 1,
                    tt: 1,
                    u: 1,
                    "var": 1
                }),
                $removeEmptyBlock: e({
                    p: 1,
                    div: 1
                }),
                $tableContent: e({
                    caption: 1,
                    col: 1,
                    colgroup: 1,
                    tbody: 1,
                    td: 1,
                    tfoot: 1,
                    th: 1,
                    thead: 1,
                    tr: 1,
                    table: 1
                }),
                $notTransContent: e({
                    pre: 1,
                    script: 1,
                    style: 1,
                    textarea: 1
                }),
                html: E,
                head: N,
                style: h,
                script: h,
                body: y,
                base: {},
                link: {},
                meta: {},
                title: h,
                col: {},
                tr: e({
                    td: 1,
                    th: 1
                }),
                img: {},
                embed: {},
                colgroup: e({
                    thead: 1,
                    col: 1,
                    tbody: 1,
                    tr: 1,
                    tfoot: 1
                }),
                noscript: y,
                td: y,
                br: {},
                th: y,
                center: y,
                kbd: m,
                button: t(c, o),
                basefont: {},
                h5: m,
                h4: m,
                samp: m,
                h6: m,
                ol: b,
                h1: m,
                h3: m,
                option: h,
                h2: m,
                form: t(n, i, o, c),
                select: e({
                    optgroup: 1,
                    option: 1
                }),
                font: m,
                ins: m,
                menu: b,
                abbr: m,
                label: m,
                table: e({
                    thead: 1,
                    col: 1,
                    tbody: 1,
                    tr: 1,
                    colgroup: 1,
                    caption: 1,
                    tfoot: 1
                }),
                code: m,
                tfoot: p,
                cite: m,
                li: y,
                input: {},
                iframe: y,
                strong: m,
                textarea: h,
                noframes: y,
                big: m,
                small: m,
                span: e({
                    "#": 1,
                    br: 1
                }),
                hr: m,
                dt: m,
                sub: m,
                optgroup: e({
                    option: 1
                }),
                param: {},
                bdo: m,
                "var": m,
                div: y,
                object: g,
                sup: m,
                dd: y,
                strike: m,
                area: {},
                dir: b,
                map: t(e({
                    area: 1,
                    form: 1,
                    p: 1
                }), n, s, o),
                applet: g,
                dl: e({
                    dt: 1,
                    dd: 1
                }),
                del: m,
                isindex: {},
                fieldset: t(e({
                    legend: 1
                }), f),
                thead: p,
                ul: b,
                acronym: m,
                b: m,
                a: t(e({
                    a: 1
                }), u),
                blockquote: t(e({
                    td: 1,
                    tr: 1,
                    tbody: 1,
                    li: 1
                }), y),
                caption: m,
                i: m,
                u: m,
                tbody: p,
                s: m,
                address: t(i, c),
                tt: m,
                legend: m,
                q: m,
                pre: t(l, a),
                p: t(e({
                    a: 1
                }), m),
                em: m,
                dfn: m
            })
        }(),
        p = d && l.version < 9 ? {
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
            frameborder: "frameBorder"
        } : {
            tabindex: "tabIndex",
            readonly: "readOnly"
        },
        h = u.listToMap(["-webkit-box", "-moz-box", "block", "list-item", "table", "table-row-group", "table-header-group", "table-footer-group", "table-row", "table-column-group", "table-column", "table-cell", "table-caption"]),
        g = s.domUtils = {
            NODE_ELEMENT: 1,
            NODE_DOCUMENT: 9,
            NODE_TEXT: 3,
            NODE_COMMENT: 8,
            NODE_DOCUMENT_FRAGMENT: 11,
            POSITION_IDENTICAL: 0,
            POSITION_DISCONNECTED: 1,
            POSITION_FOLLOWING: 2,
            POSITION_PRECEDING: 4,
            POSITION_IS_CONTAINED: 8,
            POSITION_CONTAINS: 16,
            fillChar: d && "6" == l.version ? "﻿" : "​",
            keys: {
                8: 1,
                46: 1,
                16: 1,
                17: 1,
                18: 1,
                37: 1,
                38: 1,
                39: 1,
                40: 1,
                13: 1
            },
            getPosition: function(e, t) {
                if (e === t) return 0;
                var n, r = [e],
                    a = [t];
                for (n = e; n = n.parentNode;) {
                    if (n === t) return 10;
                    r.push(n)
                }
                for (n = t; n = n.parentNode;) {
                    if (n === e) return 20;
                    a.push(n)
                }
                if (r.reverse(), a.reverse(), r[0] !== a[0]) return 1;
                for (var i = -1; i++, r[i] === a[i];);
                for (e = r[i], t = a[i]; e = e.nextSibling;)
                    if (e === t) return 4;
                return 2
            },
            getNodeIndex: function(e, t) {
                for (var n = e, r = 0; n = n.previousSibling;) t && 3 == n.nodeType || r++;
                return r
            },
            inDoc: function(e, t) {
                for (; e = e.parentNode;)
                    if (e === t) return !0;
                return !1
            },
            findParent: function(e, t, n) {
                if (!g.isBody(e))
                    for (e = n ? e : e.parentNode; e;) {
                        if (!t || t(e) || this.isBody(e)) return t && !t(e) && this.isBody(e) ? null : e;
                        e = e.parentNode
                    }
                return null
            },
            findParentByTagName: function(e, t, n, r) {
                if (e && e.nodeType && !this.isBody(e) && (1 == e.nodeType || e.nodeType))
                    for (t = u.listToMap(u.isArray(t) ? t : [t]), e = 3 != e.nodeType && n ? e : e.parentNode; e && e.tagName && 9 != e.nodeType && (!r || !r(e));) {
                        if (t[e.tagName]) return e;
                        e = e.parentNode
                    }
                return null
            },
            findParents: function(e, t, n, r) {
                for (var a = t && (n && n(e) || !n) ? [e] : []; e = g.findParent(e, n);) a.push(e);
                return r ? a : a.reverse()
            },
            insertAfter: function(e, t) {
                return e.parentNode.insertBefore(t, e.nextSibling)
            },
            remove: function(e, t) {
                var n, r = e.parentNode;
                if (r) {
                    if (t && e.hasChildNodes())
                        for (; n = e.firstChild;) r.insertBefore(n, e);
                    r.removeChild(e)
                }
                return e
            },
            getNextDomNode: function(e, t, n, r) {
                return a(e, "firstChild", "nextSibling", t, n, r)
            },
            isBookmarkNode: function(e) {
                return 1 == e.nodeType && e.id && /^_baidu_bookmark_/i.test(e.id)
            },
            getWindow: function(e) {
                var t = e.ownerDocument || e;
                return t.defaultView || t.parentWindow
            },
            getCommonAncestor: function(e, t) {
                if (e === t) return e;
                for (var n = [e], r = [t], a = e, i = -1; a = a.parentNode;) {
                    if (a === t) return a;
                    n.push(a)
                }
                for (a = t; a = a.parentNode;) {
                    if (a === e) return a;
                    r.push(a)
                }
                for (n.reverse(), r.reverse(); i++, n[i] === r[i];);
                return 0 == i ? null : n[i - 1]
            },
            clearEmptySibling: function(e, t, n) {
                function r(e, t) {
                    for (var n; e && !g.isBookmarkNode(e) && (g.isEmptyInlineElement(e) || !new RegExp("[^	\n\r" + g.fillChar + "]").test(e.nodeValue));) n = e[t], g.remove(e), e = n
                }!t && r(e.nextSibling, "nextSibling"), !n && r(e.previousSibling, "previousSibling")
            },
            split: function(e, t) {
                var n = e.ownerDocument;
                if (l.ie && t == e.nodeValue.length) {
                    var r = n.createTextNode("");
                    return g.insertAfter(e, r)
                }
                var a = e.splitText(t);
                if (l.ie8) {
                    var i = n.createTextNode("");
                    g.insertAfter(a, i), g.remove(i)
                }
                return a
            },
            isWhitespace: function(e) {
                return !new RegExp("[^ 	\n\r" + g.fillChar + "]").test(e.nodeValue)
            },
            getXY: function(e) {
                for (var t = 0, n = 0; e.offsetParent;) n += e.offsetTop, t += e.offsetLeft, e = e.offsetParent;
                return {
                    x: t,
                    y: n
                }
            },
            on: function(e, t, n) {
                var r = u.isArray(t) ? t : [t],
                    a = r.length;
                if (a)
                    for (; a--;)
                        if (t = r[a], e.addEventListener) e.addEventListener(t, n, !1);
                        else {
                            n._d || (n._d = {});
                            var i = t + n.toString();
                            n._d[i] || (n._d[i] = function(e) {
                                return n.call(e.srcElement, e || window.event)
                            }, e.attachEvent("on" + t, n._d[i]))
                        }
                e = null
            },
            un: function(e, t, n) {
                var r = u.isArray(t) ? t : [t],
                    a = r.length;
                if (a)
                    for (; a--;)
                        if (t = r[a], e.removeEventListener) e.removeEventListener(t, n, !1);
                        else {
                            var i = t + n.toString();
                            e.detachEvent("on" + t, n._d ? n._d[i] : n), n._d && n._d[i] && delete n._d[i]
                        }
            },
            isSameElement: function(e, t) {
                if (e.tagName != t.tagName) return 0;
                var n = e.attributes,
                    r = t.attributes;
                if (!d && n.length != r.length) return 0;
                for (var a, i, o = 0, s = 0, l = 0; a = n[l++];) {
                    if ("style" == a.nodeName) {
                        if (a.specified && o++, g.isSameStyle(e, t)) continue;
                        return 0
                    }
                    if (d) {
                        if (!a.specified) continue;
                        o++, i = r.getNamedItem(a.nodeName)
                    } else i = t.attributes[a.nodeName];
                    if (!i.specified || a.nodeValue != i.nodeValue) return 0
                }
                if (d) {
                    for (l = 0; i = r[l++];) i.specified && s++;
                    if (o != s) return 0
                }
                return 1
            },
            isSameStyle: function(e, t) {
                var n = e.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":"),
                    r = t.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":");
                if (l.opera) {
                    if (n = e.style, r = t.style, n.length != r.length) return 0;
                    for (var a in n)
                        if (!/^(\d+|csstext)$/i.test(a) && n[a] != r[a]) return 0;
                    return 1
                }
                if (!n || !r) return n == r ? 1 : 0;
                if (n = n.split(";"), r = r.split(";"), n.length != r.length) return 0;
                for (var i, o = 0; i = n[o++];)
                    if (-1 == u.indexOf(r, i)) return 0;
                return 1
            },
            isBlockElm: function(e) {
                return 1 == e.nodeType && (m.$block[e.tagName] || h[g.getComputedStyle(e, "display")]) && !m.$nonChild[e.tagName]
            },
            isBody: function(e) {
                return e && 1 == e.nodeType && "body" == e.tagName.toLowerCase()
            },
            breakParent: function(e, t) {
                var n, r, a, i = e,
                    o = e;
                do {
                    for (i = i.parentNode, r ? (n = i.cloneNode(!1), n.appendChild(r), r = n, n = i.cloneNode(!1), n.appendChild(a), a = n) : (r = i.cloneNode(!1), a = r.cloneNode(!1)); n = o.previousSibling;) r.insertBefore(n, r.firstChild);
                    for (; n = o.nextSibling;) a.appendChild(n);
                    o = i
                } while (t !== i);
                return n = t.parentNode, n.insertBefore(r, t), n.insertBefore(a, t), n.insertBefore(e, a), g.remove(t), e
            },
            isEmptyInlineElement: function(e) {
                if (1 != e.nodeType || !m.$removeEmpty[e.tagName]) return 0;
                for (e = e.firstChild; e;) {
                    if (g.isBookmarkNode(e)) return 0;
                    if (1 == e.nodeType && !g.isEmptyInlineElement(e) || 3 == e.nodeType && !g.isWhitespace(e)) return 0;
                    e = e.nextSibling
                }
                return 1
            },
            trimWhiteTextNode: function(e) {
                function t(t) {
                    for (var n;
                        (n = e[t]) && 3 == n.nodeType && g.isWhitespace(n);) e.removeChild(n)
                }
                t("firstChild"), t("lastChild")
            },
            mergChild: function(e, t, n) {
                for (var r, a = g.getElementsByTagName(e, e.tagName.toLowerCase()), i = 0; r = a[i++];)
                    if (r.parentNode && !g.isBookmarkNode(r))
                        if ("span" != r.tagName.toLowerCase()) g.isSameElement(e, r) && g.remove(r, !0);
                        else {
                            if (e === r.parentNode && (g.trimWhiteTextNode(e), 1 == e.childNodes.length)) {
                                e.style.cssText = r.style.cssText + ";" + e.style.cssText, g.remove(r, !0);
                                continue
                            }
                            if (r.style.cssText = e.style.cssText + ";" + r.style.cssText, n) {
                                var o = n.style;
                                if (o) {
                                    o = o.split(";");
                                    for (var s, l = 0; s = o[l++];) r.style[u.cssStyleToDomStyle(s.split(":")[0])] = s.split(":")[1]
                                }
                            }
                            g.isSameStyle(r, e) && g.remove(r, !0)
                        }
                if ("span" == t)
                    for (var d, c = g.getElementsByTagName(e, "a"), i = 0; d = c[i++];) d.style.cssText = ";" + e.style.cssText, d.style.textDecoration = "underline"
            },
            getElementsByTagName: function(e, t) {
                for (var n, r = e.getElementsByTagName(t), a = [], i = 0; n = r[i++];) a.push(n);
                return a
            },
            mergToParent: function(e) {
                for (var t = e.parentNode; t && m.$removeEmpty[t.tagName];) {
                    if (t.tagName == e.tagName || "A" == t.tagName) {
                        if (g.trimWhiteTextNode(t), "SPAN" == t.tagName && !g.isSameStyle(t, e) || "A" == t.tagName && "SPAN" == e.tagName) {
                            if (t.childNodes.length > 1 || t !== e.parentNode) {
                                e.style.cssText = t.style.cssText + ";" + e.style.cssText, t = t.parentNode;
                                continue
                            }
                            t.style.cssText += ";" + e.style.cssText, "A" == t.tagName && (t.style.textDecoration = "underline")
                        }
                        if ("A" != t.tagName) {
                            t === e.parentNode && g.remove(e, !0);
                            break
                        }
                    }
                    t = t.parentNode
                }
            },
            mergSibling: function(e, t, n) {
                function r(e, t, n) {
                    var r;
                    if ((r = n[e]) && !g.isBookmarkNode(r) && 1 == r.nodeType && g.isSameElement(n, r)) {
                        for (; r.firstChild;) "firstChild" == t ? n.insertBefore(r.lastChild, n.firstChild) : n.appendChild(r.firstChild);
                        g.remove(r)
                    }
                }!t && r("previousSibling", "firstChild", e), !n && r("nextSibling", "lastChild", e)
            },
            unselectable: d || l.opera ? function(e) {
                e.onselectstart = function() {
                    return !1
                }, e.onclick = e.onkeyup = e.onkeydown = function() {
                    return !1
                }, e.unselectable = "on", e.setAttribute("unselectable", "on");
                for (var t, n = 0; t = e.all[n++];) switch (t.tagName.toLowerCase()) {
                    case "iframe":
                    case "textarea":
                    case "input":
                    case "select":
                        break;
                    default:
                        t.unselectable = "on", e.setAttribute("unselectable", "on")
                }
            } : function(e) {
                e.style.MozUserSelect = e.style.webkitUserSelect = e.style.KhtmlUserSelect = "none"
            },
            removeAttributes: function(e, t) {
                for (var n, r = 0; n = t[r++];) {
                    switch (n = p[n] || n) {
                        case "className":
                            e[n] = "";
                            break;
                        case "style":
                            e.style.cssText = "", !l.ie && e.removeAttributeNode(e.getAttributeNode("style"))
                    }
                    e.removeAttribute(n)
                }
            },
            creElm: function(e, t, n) {
                return this.setAttributes(e.createElement(t), n)
            },
            setAttributes: function(e, t) {
                for (var n in t) {
                    var r = t[n];
                    switch (n) {
                        case "class":
                            e.className = r;
                            break;
                        case "style":
                            e.style.cssText = e.style.cssText + ";" + r;
                            break;
                        case "innerHTML":
                            e[n] = r;
                            break;
                        case "value":
                            e.value = r;
                            break;
                        default:
                            e.setAttribute(p[n] || n, r)
                    }
                }
                return e
            },
            getComputedStyle: function(e, t) {
                function n(e, t) {
                    return "font-size" == e && /pt$/.test(t) && (t = Math.round(parseFloat(t) / .75) + "px"), t
                }
                if (3 == e.nodeType && (e = e.parentNode), l.ie && l.version < 9 && "font-size" == t && !e.style.fontSize && !m.$empty[e.tagName] && !m.$nonChild[e.tagName]) {
                    var r = e.ownerDocument.createElement("span");
                    r.style.cssText = "padding:0;border:0;font-family:simsun;", r.innerHTML = ".", e.appendChild(r);
                    var a = r.offsetHeight;
                    return e.removeChild(r), r = null, a + "px"
                }
                try {
                    var i = g.getStyle(e, t) || (window.getComputedStyle ? g.getWindow(e).getComputedStyle(e, "").getPropertyValue(t) : (e.currentStyle || e.style)[u.cssStyleToDomStyle(t)])
                } catch (o) {
                    return null
                }
                return n(t, u.fixColor(t, i))
            },
            removeClasses: function(e, t) {
                t = u.isArray(t) ? t : [t], e.className = (" " + e.className + " ").replace(new RegExp("(?:\\s+(?:" + t.join("|") + "))+\\s+", "g"), " ")
            },
            addClass: function(e, t) {
                this.hasClass(e, t) || (e.className += " " + t)
            },
            removeStyle: function(e, t) {
                e.style[u.cssStyleToDomStyle(t)] = "", e.style.cssText || g.removeAttributes(e, ["style"])
            },
            hasClass: function(e, t) {
                return (" " + e.className + " ").indexOf(" " + t + " ") > -1
            },
            preventDefault: function(e) {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1
            },
            getStyle: function(e, t) {
                var n = e.style[u.cssStyleToDomStyle(t)];
                return u.fixColor(t, n)
            },
            setStyle: function(e, t, n) {
                e.style[u.cssStyleToDomStyle(t)] = n
            },
            setStyles: function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && g.setStyle(e, n, t[n])
            },
            removeDirtyAttr: function(e) {
                for (var t, n = 0, r = e.getElementsByTagName("*"); t = r[n++];) t.removeAttribute("_moz_dirty");
                e.removeAttribute("_moz_dirty")
            },
            getChildCount: function(e, t) {
                var n = 0,
                    r = e.firstChild;
                for (t = t || function() {
                        return 1
                    }; r;) t(r) && n++, r = r.nextSibling;
                return n
            },
            isEmptyNode: function(e) {
                return !e.firstChild || 0 == g.getChildCount(e, function(e) {
                    return !g.isBr(e) && !g.isBookmarkNode(e) && !g.isWhitespace(e)
                })
            },
            clearSelectedArr: function(e) {
                for (var t; t = e.pop();) g.removeAttributes(t, ["class"])
            },
            scrollToView: function(e, t, n) {
                var r = function() {
                        var e = t.document,
                            n = "CSS1Compat" == e.compatMode;
                        return {
                            width: (n ? e.documentElement.clientWidth : e.body.clientWidth) || 0,
                            height: (n ? e.documentElement.clientHeight : e.body.clientHeight) || 0
                        }
                    },
                    a = function(e) {
                        if ("pageXOffset" in e) return {
                            x: e.pageXOffset || 0,
                            y: e.pageYOffset || 0
                        };
                        var t = e.document;
                        return {
                            x: t.documentElement.scrollLeft || t.body.scrollLeft || 0,
                            y: t.documentElement.scrollTop || t.body.scrollTop || 0
                        }
                    },
                    i = r().height,
                    o = -1 * i + n;
                o += e.offsetHeight || 0;
                var s = g.getXY(e);
                o += s.y;
                var l = a(t).y;
                (o > l || l - i > o) && t.scrollTo(0, o + (0 > o ? -20 : 20))
            },
            isBr: function(e) {
                return 1 == e.nodeType && "BR" == e.tagName
            },
            isFillChar: function(e) {
                return 3 == e.nodeType && !e.nodeValue.replace(new RegExp(g.fillChar), "").length
            },
            isStartInblock: function(e) {
                for (var t, n = e.cloneRange(), r = 0, a = n.startContainer; a && g.isFillChar(a);) t = a, a = a.previousSibling;
                for (t && (n.setStartBefore(t), a = n.startContainer), 1 == a.nodeType && g.isEmptyNode(a) && 1 == n.startOffset && n.setStart(a, 0).collapse(!0); !n.startOffset;) {
                    if (a = n.startContainer, g.isBlockElm(a) || g.isBody(a)) {
                        r = 1;
                        break
                    }
                    var i, o = n.startContainer.previousSibling;
                    if (o) {
                        for (; o && g.isFillChar(o);) i = o, o = o.previousSibling;
                        n.setStartBefore(i ? i : n.startContainer)
                    } else n.setStartBefore(n.startContainer)
                }
                return r && !g.isBody(n.startContainer) ? 1 : 0
            },
            isEmptyBlock: function(e) {
                var t = new RegExp("[ 	\r\n" + g.fillChar + "]", "g");
                if (e[l.ie ? "innerText" : "textContent"].replace(t, "").length > 0) return 0;
                for (var n in m.$isNotEmpty)
                    if (e.getElementsByTagName(n).length) return 0;
                return 1
            },
            setViewportOffset: function(e, t) {
                var n = 0 | parseInt(e.style.left),
                    r = 0 | parseInt(e.style.top),
                    a = e.getBoundingClientRect(),
                    i = t.left - a.left,
                    o = t.top - a.top;
                i && (e.style.left = n + i + "px"), o && (e.style.top = r + o + "px")
            },
            fillNode: function(e, t) {
                var n = l.ie ? e.createTextNode(g.fillChar) : e.createElement("br");
                t.innerHTML = "", t.appendChild(n)
            },
            moveChild: function(e, t, n) {
                for (; e.firstChild;) n && t.firstChild ? t.insertBefore(e.lastChild, t.firstChild) : t.appendChild(e.firstChild)
            },
            hasNoAttributes: function(e) {
                return l.ie ? /^<\w+\s*?>/.test(e.outerHTML) : 0 == e.attributes.length
            },
            isCustomeNode: function(e) {
                return 1 == e.nodeType && e.getAttribute("_ue_custom_node_")
            },
            isTagNode: function(e, t) {
                return 1 == e.nodeType && e.tagName.toLowerCase() == t
            }
        },
        y = new RegExp(g.fillChar, "g"),
        b = new RegExp(g.fillChar + " ", "g");
    ! function() {
        function e(e) {
            e.collapsed = e.startContainer && e.endContainer && e.startContainer === e.endContainer && e.startOffset == e.endOffset
        }

        function t(t, n, r, a) {
            return 1 == n.nodeType && (m.$empty[n.tagName] || m.$nonChild[n.tagName]) && (r = g.getNodeIndex(n) + (t ? 0 : 1), n = n.parentNode), t ? (a.startContainer = n, a.startOffset = r, a.endContainer || a.collapse(!0)) : (a.endContainer = n, a.endOffset = r, a.startContainer || a.collapse(!1)), e(a), a
        }

        function n(e, t) {
            var n, r, a = e.startContainer,
                i = e.endContainer,
                o = e.startOffset,
                s = e.endOffset,
                l = e.document,
                d = l.createDocumentFragment();
            if (1 == a.nodeType && (a = a.childNodes[o] || (n = a.appendChild(l.createTextNode("")))), 1 == i.nodeType && (i = i.childNodes[s] || (r = i.appendChild(l.createTextNode("")))), a === i && 3 == a.nodeType) return d.appendChild(l.createTextNode(a.substringData(o, s - o))), t && (a.deleteData(o, s - o), e.collapse(!0)), d;
            for (var c, u, f = d, m = g.findParents(a, !0), p = g.findParents(i, !0), h = 0; m[h] == p[h];) h++;
            for (var y, b = h; y = m[b]; b++) {
                for (c = y.nextSibling, y == a ? n || (3 == e.startContainer.nodeType ? (f.appendChild(l.createTextNode(a.nodeValue.slice(o))), t && a.deleteData(o, a.nodeValue.length - o)) : f.appendChild(t ? a : a.cloneNode(!0))) : (u = y.cloneNode(!1), f.appendChild(u)); c && c !== i && c !== p[b];) y = c.nextSibling, f.appendChild(t ? c : c.cloneNode(!0)), c = y;
                f = u
            }
            f = d, m[h] || (f.appendChild(m[h - 1].cloneNode(!1)), f = f.firstChild);
            for (var v, b = h; v = p[b]; b++) {
                if (c = v.previousSibling, v == i ? r || 3 != e.endContainer.nodeType || (f.appendChild(l.createTextNode(i.substringData(0, s))), t && i.deleteData(0, s)) : (u = v.cloneNode(!1), f.appendChild(u)), b != h || !m[h])
                    for (; c && c !== a;) v = c.previousSibling, f.insertBefore(t ? c : c.cloneNode(!0), f.firstChild), c = v;
                f = u
            }
            return t && e.setStartBefore(p[h] ? m[h] ? p[h] : m[h - 1] : p[h - 1]).collapse(!0), n && g.remove(n), r && g.remove(r), d
        }

        function r(e) {
            try {
                if (e = e && e.nextSibling, !e) return;
                for (; e && 1 == e.nodeType && e.children.length;) e = e.children[0];
                3 == e.nodeType && (e.nodeValue = e.nodeValue.replace(/^\u0020/, " "))
            } catch (t) {}
        }

        function a(e, t) {
            try {
                if (o && g.inDoc(o, e))
                    if (o.nodeValue.replace(y, "").length) o.nodeValue = o.nodeValue.replace(b, " ").replace(y, "");
                    else {
                        var n = o.parentNode;
                        for (r(o), g.remove(o); n && g.isEmptyInlineElement(n) && !n.contains(t);) o = n.parentNode, r(n), g.remove(n), n = o
                    }
            } catch (a) {}
        }

        function i(e, t) {
            var n;
            for (e = e[t]; e && g.isFillChar(e);) n = e[t], g.remove(e), e = n
        }
        var o, d = 0,
            c = g.fillChar,
            f = s.Range = function(e) {
                var t = this;
                t.startContainer = t.startOffset = t.endContainer = t.endOffset = null, t.document = e, t.collapsed = !0
            };
        f.prototype = {
            cloneContents: function() {
                return this.collapsed ? null : n(this, 0)
            },
            deleteContents: function() {
                var e;
                return this.collapsed || n(this, 1), l.webkit && (e = this.startContainer, 3 != e.nodeType || e.nodeValue.length || (this.setStartBefore(e).collapse(!0), g.remove(e))), this
            },
            extractContents: function() {
                return this.collapsed ? null : n(this, 2)
            },
            setStart: function(e, n) {
                return t(!0, e, n, this)
            },
            setEnd: function(e, n) {
                return t(!1, e, n, this)
            },
            setStartAfter: function(e) {
                return this.setStart(e.parentNode, g.getNodeIndex(e) + 1)
            },
            setStartBefore: function(e) {
                return this.setStart(e.parentNode, g.getNodeIndex(e))
            },
            setEndAfter: function(e) {
                return this.setEnd(e.parentNode, g.getNodeIndex(e) + 1)
            },
            setStartAtFirst: function(e) {
                return this.setStart(e, 0)
            },
            setStartAtLast: function(e) {
                return this.setStart(e, 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length)
            },
            setEndAtFirst: function(e) {
                return this.setEnd(e, 0)
            },
            setEndAtLast: function(e) {
                return this.setEnd(e, 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length)
            },
            setEndBefore: function(e) {
                return this.setEnd(e.parentNode, g.getNodeIndex(e))
            },
            selectNode: function(e) {
                return this.setStartBefore(e).setEndAfter(e)
            },
            selectNodeContents: function(e) {
                return this.setStart(e, 0).setEnd(e, 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length)
            },
            cloneRange: function() {
                var e = this,
                    t = new f(e.document);
                return t.setStart(e.startContainer, e.startOffset).setEnd(e.endContainer, e.endOffset)
            },
            collapse: function(e) {
                var t = this;
                return e ? (t.endContainer = t.startContainer, t.endOffset = t.startOffset) : (t.startContainer = t.endContainer, t.startOffset = t.endOffset), t.collapsed = !0, t
            },
            shrinkBoundary: function(e) {
                for (var t, n = this, r = n.collapsed; 1 == n.startContainer.nodeType && (t = n.startContainer.childNodes[n.startOffset]) && 1 == t.nodeType && !g.isBookmarkNode(t) && !m.$empty[t.tagName] && !m.$nonChild[t.tagName];) n.setStart(t, 0);
                if (r) return n.collapse(!0);
                if (!e)
                    for (; 1 == n.endContainer.nodeType && n.endOffset > 0 && (t = n.endContainer.childNodes[n.endOffset - 1]) && 1 == t.nodeType && !g.isBookmarkNode(t) && !m.$empty[t.tagName] && !m.$nonChild[t.tagName];) n.setEnd(t, t.childNodes.length);
                return n
            },
            getCommonAncestor: function(e, t) {
                var n = this.startContainer,
                    r = this.endContainer;
                return n === r ? e && 1 == n.nodeType && this.startOffset == this.endOffset - 1 ? n.childNodes[this.startOffset] : t && 3 == n.nodeType ? n.parentNode : n : g.getCommonAncestor(n, r)
            },
            trimBoundary: function(e) {
                this.txtToElmBoundary();
                var t = this.startContainer,
                    n = this.startOffset,
                    r = this.collapsed,
                    a = this.endContainer;
                if (3 == t.nodeType) {
                    if (0 == n) this.setStartBefore(t);
                    else if (n >= t.nodeValue.length) this.setStartAfter(t);
                    else {
                        var i = g.split(t, n);
                        t === a ? this.setEnd(i, this.endOffset - n) : t.parentNode === a && (this.endOffset += 1), this.setStartBefore(i)
                    }
                    if (r) return this.collapse(!0)
                }
                return e || (n = this.endOffset, a = this.endContainer, 3 == a.nodeType && (0 == n ? this.setEndBefore(a) : n >= a.nodeValue.length ? this.setEndAfter(a) : (g.split(a, n), this.setEndAfter(a)))), this
            },
            txtToElmBoundary: function() {
                function e(e, t) {
                    var n = e[t + "Container"],
                        r = e[t + "Offset"];
                    3 == n.nodeType && (r ? r >= n.nodeValue.length && e["set" + t.replace(/(\w)/, function(e) {
                        return e.toUpperCase()
                    }) + "After"](n) : e["set" + t.replace(/(\w)/, function(e) {
                        return e.toUpperCase()
                    }) + "Before"](n))
                }
                return this.collapsed || (e(this, "start"), e(this, "end")), this
            },
            insertNode: function(e) {
                var t = e,
                    n = 1;
                11 == e.nodeType && (t = e.firstChild, n = e.childNodes.length), this.trimBoundary(!0);
                var r = this.startContainer,
                    a = this.startOffset,
                    i = r.childNodes[a];
                return i ? r.insertBefore(e, i) : r.appendChild(e), t.parentNode === this.endContainer && (this.endOffset = this.endOffset + n), this.setStartBefore(t)
            },
            setCursor: function(e, t) {
                return this.collapse(!e).select(t)
            },
            createBookmark: function(e, t) {
                var n, r = this.document.createElement("span");
                return r.style.cssText = "display:none;line-height:0px;", r.appendChild(this.document.createTextNode("﻿")), r.id = "_baidu_bookmark_start_" + (t ? "" : d++), this.collapsed || (n = r.cloneNode(!0), n.id = "_baidu_bookmark_end_" + (t ? "" : d++)), this.insertNode(r), n && (this.collapse(!1).insertNode(n), this.setEndBefore(n)), this.setStartAfter(r), {
                    start: e ? r.id : r,
                    end: n ? e ? n.id : n : null,
                    id: e
                }
            },
            moveToBookmark: function(e) {
                var t = e.id ? this.document.getElementById(e.start) : e.start,
                    n = e.end && e.id ? this.document.getElementById(e.end) : e.end;
                return this.setStartBefore(t), g.remove(t), n ? (this.setEndBefore(n), g.remove(n)) : this.collapse(!0), this
            },
            getCursorPosition: function(e, t) {
                e = e !== !1, t = t !== !1;
                var n, r, a = this.document.createElement("span"),
                    i = {};
                return a.appendChild(this.document.createTextNode(l.ie ? "&nbsp;" : "​")), this.insertNode(a), i.start = g.getXY(a), t && (this.collapsed ? i.end = i.start : (n = a.cloneNode(!0), r = this.createBookmark(), this.collapse(!1).insertNode(n), i.end = g.getXY(n), g.remove(n), this.moveToBookmark(r))), e || delete i.start, g.remove(a), i
            },
            enlarge: function(e, t) {
                var n, r, a = g.isBody,
                    i = this.document.createTextNode("");
                if (e) {
                    for (r = this.startContainer, 1 == r.nodeType ? r.childNodes[this.startOffset] ? n = r = r.childNodes[this.startOffset] : (r.appendChild(i), n = r = i) : n = r;;) {
                        if (g.isBlockElm(r)) {
                            for (r = n;
                                (n = r.previousSibling) && !g.isBlockElm(n);) r = n;
                            this.setStartBefore(r);
                            break
                        }
                        n = r, r = r.parentNode
                    }
                    for (r = this.endContainer, 1 == r.nodeType ? ((n = r.childNodes[this.endOffset]) ? r.insertBefore(i, n) : r.appendChild(i), n = r = i) : n = r;;) {
                        if (g.isBlockElm(r)) {
                            for (r = n;
                                (n = r.nextSibling) && !g.isBlockElm(n);) r = n;
                            this.setEndAfter(r);
                            break
                        }
                        n = r, r = r.parentNode
                    }
                    i.parentNode === this.endContainer && this.endOffset--, g.remove(i)
                }
                if (!this.collapsed) {
                    for (; !(0 != this.startOffset || t && t(this.startContainer) || a(this.startContainer));) this.setStartBefore(this.startContainer);
                    for (; !(this.endOffset != (1 == this.endContainer.nodeType ? this.endContainer.childNodes.length : this.endContainer.nodeValue.length) || t && t(this.endContainer) || a(this.endContainer));) this.setEndAfter(this.endContainer)
                }
                return this
            },
            adjustmentBoundary: function() {
                if (!this.collapsed) {
                    for (; !g.isBody(this.startContainer) && this.startOffset == this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length;) this.setStartAfter(this.startContainer);
                    for (; !g.isBody(this.endContainer) && !this.endOffset;) this.setEndBefore(this.endContainer)
                }
                return this
            },
            applyInlineStyle: function(e, t, n) {
                if (this.collapsed) return this;
                this.trimBoundary().enlarge(!1, function(e) {
                    return 1 == e.nodeType && g.isBlockElm(e)
                }).adjustmentBoundary();
                for (var r, a, i = this.createBookmark(), o = i.end, s = function(e) {
                        return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() : !g.isWhitespace(e)
                    }, l = g.getNextDomNode(i.start, !1, s), d = this.cloneRange(); l && g.getPosition(l, o) & g.POSITION_PRECEDING;)
                    if (3 == l.nodeType || m[e][l.tagName]) {
                        for (d.setStartBefore(l), r = l; r && (3 == r.nodeType || m[e][r.tagName]) && r !== o;) a = r, r = g.getNextDomNode(r, 1 == r.nodeType, null, function(t) {
                            return m[e][t.tagName]
                        });
                        var c, u = d.setEndAfter(a).extractContents();
                        if (n && n.length > 0) {
                            var f, p;
                            p = f = n[0].cloneNode(!1);
                            for (var h, y = 1; h = n[y++];) f.appendChild(h.cloneNode(!1)), f = f.firstChild;
                            c = f
                        } else c = d.document.createElement(e);
                        t && g.setAttributes(c, t), c.appendChild(u), d.insertNode(n ? p : c);
                        var b;
                        if ("span" == e && t.style && /text\-decoration/.test(t.style) && (b = g.findParentByTagName(c, "a", !0)) ? (g.setAttributes(b, t), g.remove(c, !0), c = b) : (g.mergSibling(c), g.clearEmptySibling(c)), g.mergChild(c, e, t), l = g.getNextDomNode(c, !1, s), g.mergToParent(c), r === o) break
                    } else l = g.getNextDomNode(l, !0, s);
                return this.moveToBookmark(i)
            },
            removeInlineStyle: function(e) {
                if (this.collapsed) return this;
                e = u.isArray(e) ? e : [e], this.shrinkBoundary().adjustmentBoundary();
                for (var t = this.startContainer, n = this.endContainer;;) {
                    if (1 == t.nodeType) {
                        if (u.indexOf(e, t.tagName.toLowerCase()) > -1) break;
                        if ("body" == t.tagName.toLowerCase()) {
                            t = null;
                            break
                        }
                    }
                    t = t.parentNode
                }
                for (;;) {
                    if (1 == n.nodeType) {
                        if (u.indexOf(e, n.tagName.toLowerCase()) > -1) break;
                        if ("body" == n.tagName.toLowerCase()) {
                            n = null;
                            break
                        }
                    }
                    n = n.parentNode
                }
                var r, a, i = this.createBookmark();
                t && (a = this.cloneRange().setEndBefore(i.start).setStartBefore(t), r = a.extractContents(), a.insertNode(r), g.clearEmptySibling(t, !0), t.parentNode.insertBefore(i.start, t)), n && (a = this.cloneRange().setStartAfter(i.end).setEndAfter(n), r = a.extractContents(), a.insertNode(r), g.clearEmptySibling(n, !1, !0), n.parentNode.insertBefore(i.end, n.nextSibling));
                for (var o, s = g.getNextDomNode(i.start, !1, function(e) {
                        return 1 == e.nodeType
                    }); s && s !== i.end;) o = g.getNextDomNode(s, !0, function(e) {
                    return 1 == e.nodeType
                }), u.indexOf(e, s.tagName.toLowerCase()) > -1 && g.remove(s, !0), s = o;
                return this.moveToBookmark(i)
            },
            getClosedNode: function() {
                var e;
                if (!this.collapsed) {
                    var t = this.cloneRange().adjustmentBoundary().shrinkBoundary();
                    if (1 == t.startContainer.nodeType && t.startContainer === t.endContainer && t.endOffset - t.startOffset == 1) {
                        var n = t.startContainer.childNodes[t.startOffset];
                        n && 1 == n.nodeType && (m.$empty[n.tagName] || m.$nonChild[n.tagName]) && (e = n)
                    }
                }
                return e
            },
            select: l.ie ? function(e, t) {
                var n;
                this.collapsed || this.shrinkBoundary();
                var r = this.getClosedNode();
                if (r && !t) {
                    try {
                        n = this.document.body.createControlRange(), n.addElement(r), n.select()
                    } catch (s) {}
                    return this
                }
                var l, d = this.createBookmark(),
                    u = d.start;
                if (n = this.document.body.createTextRange(), n.moveToElementText(u), n.moveStart("character", 1), this.collapsed) {
                    if (!e && 3 != this.startContainer.nodeType) {
                        var f = this.document.createTextNode(c),
                            m = this.document.createElement("span");
                        m.appendChild(this.document.createTextNode(c)), u.parentNode.insertBefore(m, u), u.parentNode.insertBefore(f, u), a(this.document, f), o = f, i(m, "previousSibling"), i(u, "nextSibling"), n.moveStart("character", -1), n.collapse(!0)
                    }
                } else {
                    var p = this.document.body.createTextRange();
                    l = d.end, p.moveToElementText(l), n.setEndPoint("EndToEnd", p)
                }
                this.moveToBookmark(d), m && g.remove(m);
                try {
                    n.select()
                } catch (s) {}
                return this
            } : function(e) {
                var t, n = g.getWindow(this.document),
                    r = n.getSelection();
                if (l.gecko && l.version < 14e4 ? this.document.body.focus() : n.focus(), r) {
                    if (r.removeAllRanges(), this.collapsed) {
                        if (e && l.opera && !g.isBody(this.startContainer) && 1 == this.startContainer.nodeType) {
                            var s = this.document.createTextNode("");
                            this.insertNode(s).setStart(s, 0).collapse(!0)
                        }
                        e || (t = this.document.createTextNode(c), this.insertNode(t), a(this.document, t), i(t, "previousSibling"), i(t, "nextSibling"), o = t, this.setStart(t, l.webkit ? 1 : 0).collapse(!0))
                    }
                    var d = this.document.createRange();
                    d.setStart(this.startContainer, this.startOffset), d.setEnd(this.endContainer, this.endOffset), r.addRange(d)
                }
                return this
            },
            scrollToView: function(e, t) {
                e = e ? window : g.getWindow(this.document);
                var n = this.document.createElement("span");
                n.innerHTML = "&nbsp;";
                var r = this.cloneRange();
                return r.insertNode(n), g.scrollToView(n, e, t), g.remove(n), this
            }
        }
    }(),
    function() {
        function e(e, t) {
            var n = g.getNodeIndex;
            e = e.duplicate(), e.collapse(t);
            var r = e.parentElement();
            if (!r.hasChildNodes()) return {
                container: r,
                offset: 0
            };
            for (var a, i, o = r.children, s = e.duplicate(), c = 0, u = o.length - 1, f = -1; u >= c;) {
                f = Math.floor((c + u) / 2), a = o[f], s.moveToElementText(a);
                var p = s.compareEndPoints("StartToStart", e);
                if (p > 0) u = f - 1;
                else {
                    if (!(0 > p)) return {
                        container: r,
                        offset: n(a)
                    };
                    c = f + 1
                }
            }
            if (-1 == f) {
                if (s.moveToElementText(r), s.setEndPoint("StartToStart", e), i = s.text.replace(/(\r\n|\r)/g, "\n").length, o = r.childNodes, !i) return a = o[o.length - 1], {
                    container: a,
                    offset: a.nodeValue.length
                };
                for (var h = o.length; i > 0;) i -= o[--h].nodeValue.length;
                return {
                    container: o[h],
                    offset: -i
                }
            }
            if (s.collapse(p > 0), s.setEndPoint(p > 0 ? "StartToStart" : "EndToStart", e), i = s.text.replace(/(\r\n|\r)/g, d && 9 == l.version ? "" : "\n").length, !i) return m.$empty[a.tagName] || m.$nonChild[a.tagName] ? {
                container: r,
                offset: n(a) + (p > 0 ? 0 : 1)
            } : {
                container: a,
                offset: p > 0 ? 0 : a.childNodes.length
            };
            for (; i > 0;) try {
                var y = a;
                a = a[p > 0 ? "previousSibling" : "nextSibling"], i -= a.nodeValue.length
            } catch (b) {
                return {
                    container: r,
                    offset: n(y)
                }
            }
            return {
                container: a,
                offset: p > 0 ? -i : a.nodeValue.length + i
            }
        }

        function t(t, n) {
            if (t.item) n.selectNode(t.item(0));
            else {
                var r = e(t, !0);
                n.setStart(r.container, r.offset), 0 != t.compareEndPoints("StartToEnd", t) && (r = e(t, !1), n.setEnd(r.container, r.offset))
            }
            return n
        }

        function n(e) {
            var t;
            try {
                t = e.getNative().createRange()
            } catch (n) {
                return null
            }
            var r = t.item ? t.item(0) : t.parentElement();
            return (r.ownerDocument || r) === e.document ? t : null
        }
        var r = s.Selection = function(e) {
            var t, r = this;
            r.document = e, d && (t = g.getWindow(e).frameElement, g.on(t, "beforedeactivate", function() {
                r._bakIERange = r.getIERange()
            }), g.on(t, "activate", function() {
                try {
                    !n(r) && r._bakIERange && r._bakIERange.select()
                } catch (e) {}
                r._bakIERange = null
            })), t = e = null
        };
        r.prototype = {
            getNative: function() {
                var e = this.document;
                try {
                    return e ? d ? e.selection : g.getWindow(e).getSelection() : null
                } catch (t) {
                    return null
                }
            },
            getIERange: function() {
                var e = n(this);
                return !e && this._bakIERange ? this._bakIERange : e
            },
            cache: function() {
                this.clear(), this._cachedRange = this.getRange(), this._cachedStartElement = this.getStart(), this._cachedStartElementPath = this.getStartElementPath()
            },
            getStartElementPath: function() {
                if (this._cachedStartElementPath) return this._cachedStartElementPath;
                var e = this.getStart();
                return e ? g.findParents(e, !0, null, !0) : []
            },
            clear: function() {
                this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null
            },
            isFocus: function() {
                try {
                    return l.ie && n(this) || !l.ie && this.getNative().rangeCount ? !0 : !1
                } catch (e) {
                    return !1
                }
            },
            getRange: function() {
                function e(e) {
                    for (var t = n.document.body.firstChild, r = e.collapsed; t && t.firstChild;) e.setStart(t, 0), t = t.firstChild;
                    e.startContainer || e.setStart(n.document.body, 0), r && e.collapse(!0)
                }
                var n = this;
                if (null != n._cachedRange) return this._cachedRange;
                var r = new o.editor.dom.Range(n.document);
                if (d) {
                    var a = n.getIERange();
                    a ? t(a, r) : e(r)
                } else {
                    var i = n.getNative();
                    if (i && i.rangeCount) {
                        var s = i.getRangeAt(0),
                            l = i.getRangeAt(i.rangeCount - 1);
                        r.setStart(s.startContainer, s.startOffset).setEnd(l.endContainer, l.endOffset), r.collapsed && g.isBody(r.startContainer) && !r.startOffset && e(r)
                    } else {
                        if (this._bakRange && g.inDoc(this._bakRange.startContainer, this.document)) return this._bakRange;
                        e(r)
                    }
                }
                return this._bakRange = r
            },
            getStart: function() {
                if (this._cachedStartElement) return this._cachedStartElement;
                var e, t, n, r, a = d ? this.getIERange() : this.getRange();
                if (d) {
                    if (!a) return this.document.body.firstChild;
                    if (a.item) return a.item(0);
                    for (e = a.duplicate(), e.text.length > 0 && e.moveStart("character", 1), e.collapse(1), t = e.parentElement(), r = n = a.parentElement(); n = n.parentNode;)
                        if (n == t) {
                            t = r;
                            break
                        }
                } else if (a.shrinkBoundary(), t = a.startContainer, 1 == t.nodeType && t.hasChildNodes() && (t = t.childNodes[Math.min(t.childNodes.length - 1, a.startOffset)]), 3 == t.nodeType) return t.parentNode;
                return t
            },
            getText: function() {
                var e, t;
                return this.isFocus() && (e = this.getNative()) ? (t = l.ie ? e.createRange() : e.getRangeAt(0), l.ie ? t.text : t.toString()) : ""
            }
        }
    }(),
    function() {
        function e(e) {
            for (var t, n, r = e.getElementsByTagName("img"), a = 0; n = r[a++];)(t = n.getAttribute("orgSrc")) && (n.src = t, n.removeAttribute("orgSrc"));
            for (var i, o = e.getElementsByTagName("a"), a = 0; i = o[a++]; a++) i.getAttribute("data_ue_src") && i.setAttribute("href", i.getAttribute("data_ue_src"))
        }

        function t(e, t) {
            var n;
            if (t.textarea)
                if (u.isString(t.textarea)) {
                    for (var r, a = 0, i = g.getElementsByTagName(e, "textarea"); r = i[a++];)
                        if (r.id == "ueditor_textarea_" + t.options.textarea) {
                            n = r;
                            break
                        }
                } else n = t.textarea;
            n || e.appendChild(n = g.creElm(document, "textarea", {
                name: t.options.textarea,
                id: "ueditor_textarea_" + t.options.textarea,
                style: "display:none"
            })), n.value = t.options.allHtmlEnabled ? t.getAllHtml() : t.getContent(null, null, !0)
        }
        var n, r = 0,
            a = UE.Editor = function(e) {
                var t = this;
                t.uid = r++, f.call(t), t.commands = {}, t.options = u.extend(e || {}, i, !0), t.setOpt({
                    isShow: !0,
                    initialContent: "欢迎使用ueditor!",
                    autoClearinitialContent: !1,
                    iframeCssUrl: t.options.UEDITOR_HOME_URL + "/themes/default/iframe.css",
                    textarea: "editorValue",
                    focus: !1,
                    minFrameHeight: 320,
                    autoClearEmptyNode: !0,
                    fullscreen: !1,
                    readonly: !1,
                    zIndex: 999,
                    imagePopup: !0,
                    enterTag: "p",
                    pageBreakTag: "_baidu_page_break_tag_",
                    customDomain: !1,
                    allHtmlEnabled: !0
                });
                for (var n in UE.plugins) UE.plugins[n].call(t);
                t.langIsReady = !0, t.fireEvent("langReady"), UE.instants["ueditorInstant" + t.uid] = t
            };
        a.prototype = {
            ready: function(e) {
                var t = this;
                e && (t.isReady ? e.apply(t) : t.addListener("ready", e))
            },
            setOpt: function(e, t) {
                var n = {};
                u.isString(e) ? n[e] = t : n = e, u.extend(this.options, n, !0)
            },
            destroy: function() {
                var e = this;
                e.fireEvent("destroy"), e.container.innerHTML = "", g.remove(e.container);
                for (var t in e) e.hasOwnProperty(t) && delete this[t]
            },
            render: function(e) {
                var t = this,
                    n = t.options;
                if (e.constructor === String && (e = document.getElementById(e)), e) {
                    var r = d && l.version < 9,
                        a = (d && l.version < 9 ? "" : "<!DOCTYPE html>") + "<html xmlns='http://www.w3.org/1999/xhtml'" + (r ? "" : " class='view'") + "><head>" + (n.iframeCssUrl ? "<link rel='stylesheet' type='text/css' href='" + u.unhtml(n.iframeCssUrl) + "'/>" : "") + "<style type='text/css'>.selectTdClass{background-color:#3399FF !important;}table.noBorderTable td{border:1px dashed #ddd !important}table{clear:both;margin-bottom:10px;border-collapse:collapse;word-break:break-all;}.pagebreak{display:block;clear:both !important;cursor:default !important;width: 100% !important;margin:0;}.anchorclass{background: url('" + t.options.UEDITOR_HOME_URL + "themes/default/images/anchor.gif') no-repeat scroll left center transparent;border: 1px dotted #0000FF;cursor: auto;display: inline-block;height: 16px;width: 15px;}.view{padding:0;word-wrap:break-word;cursor:text;height:100%;}\nbody{margin:8px;font-family:'宋体';font-size:16px;}li{clear:both}p{margin:5px 0;}" + (n.initialStyle || "") + 'body, input, label, select, option, textarea, button, fieldset, legend{font: 14px "Helvetica Neue",Helvetica,Arial,sans-serif;}body{line-height:1.5}</style></head><body' + (r ? " class='view'" : "") + "></body>";
                    if (n.customDomain && document.domain != location.hostname) a += "<script>window.parent.UE.instants['ueditorInstant" + t.uid + "']._setup(document);</script></html>", e.appendChild(g.creElm(document, "iframe", {
                        id: "baidu_editor_" + t.uid,
                        width: "100%",
                        height: "100%",
                        frameborder: "0",
                        src: 'javascript:void(function(){document.open();document.domain="' + document.domain + '";document.write("' + a + '");document.close();}())'
                    }));
                    else {
                        e.innerHTML = '<iframe id="baidu_editor_' + this.uid + '"width="100%" height="100%" scroll="no" frameborder="0" ></iframe>';
                        var i = e.firstChild.contentWindow.document;
                        !l.webkit && i.open(), i.write(a + "</html>"), !l.webkit && i.close(), t._setup(i)
                    }
                    e.style.overflow = "hidden"
                }
            },
            _setup: function(e) {
                var n = this,
                    r = n.options;
                d ? (e.body.disabled = !0, e.body.contentEditable = !0, e.body.disabled = !1) : (e.body.contentEditable = !0, e.body.spellcheck = !1), n.document = e, n.window = e.defaultView || e.parentWindow, n.iframe = n.window.frameElement, n.body = e.body, n.setHeight(r.minFrameHeight), n.body.style.height = "auto", n.selection = new s.Selection(e);
                var a;
                if (l.gecko && (a = this.selection.getNative()) && a.removeAllRanges(), this._initEvents(), r.initialContent)
                    if (r.autoClearinitialContent) {
                        var i = n.execCommand;
                        n.execCommand = function() {
                            n.fireEvent("firstBeforeExecCommand"), i.apply(n, arguments)
                        }, this.setDefaultContent(r.initialContent)
                    } else this.setContent(r.initialContent, !0);
                for (var o = this.iframe.parentNode; !g.isBody(o); o = o.parentNode)
                    if ("FORM" == o.tagName) {
                        g.on(o, "submit", function() {
                            t(this, n)
                        });
                        break
                    }
                g.isEmptyNode(n.body) && (n.body.innerHTML = "<p>" + (l.ie ? "" : "<br/>") + "</p>"), r.focus && setTimeout(function() {
                    n.focus(), !n.options.autoClearinitialContent && n._selectionChange()
                }), n.container || (n.container = this.iframe.parentNode), r.fullscreen && n.ui && n.ui.setFullScreen(!0), n.isReady = 1, n.fireEvent("ready"), l.ie || g.on(n.window, ["blur", "focus"], function(e) {
                    if ("blur" == e.type) {
                        n._bakRange = n.selection.getRange();
                        try {
                            n.selection.getNative().removeAllRanges()
                        } catch (e) {}
                    } else try {
                        n._bakRange && n._bakRange.select()
                    } catch (e) {}
                }), l.gecko && l.version <= 10902 && (n.body.contentEditable = !1, setTimeout(function() {
                    n.body.contentEditable = !0
                }, 100), setInterval(function() {
                    n.body.style.height = n.iframe.offsetHeight - 20 + "px"
                }, 100)), !r.isShow && n.setHide(), r.readonly && n.setDisabled()
            },
            sync: function(e) {
                var n = this,
                    r = e ? document.getElementById(e) : g.findParent(n.iframe.parentNode, function(e) {
                        return "FORM" == e.tagName
                    }, !0);
                r && t(r, n)
            },
            setHeight: function(e) {
                e !== parseInt(this.iframe.parentNode.style.height) && (this.iframe.parentNode.style.minHeight = e + "px"), this.document.body.style.minHeight = e + "px"
            },
            getContent: function(e, t, n) {
                var r = this;
                if (e && u.isFunction(e) && (t = e, e = ""), t ? !t() : !this.hasContents()) return "";
                r.fireEvent("beforegetcontent", e);
                var a = new RegExp(g.fillChar, "g"),
                    i = r.body.innerHTML.replace(a, "").replace(/>[\t\r\n]*?</g, "><");
                if (r.fireEvent("aftergetcontent", e), r.serialize) {
                    var o = r.serialize.parseHTML(i);
                    o = r.serialize.transformOutput(o), i = r.serialize.toHTML(o)
                }
                return i = d && n ? i.replace(/<p>\s*?<\/p>/g, "<p>&nbsp;</p>") : i.replace(/(&nbsp;)+/g, function(e) {
                    for (var t = 0, n = [], r = e.split(";").length - 1; r > t; t++) n.push(t % 2 == 0 ? " " : "&nbsp;");
                    return n.join("")
                })
            },
            getAllHtml: function() {
                var e = this,
                    t = {
                        html: ""
                    };
                return e.fireEvent("getAllHtml", t), "<html><head>" + (e.options.charset ? '<meta http-equiv="Content-Type" content="text/html; charset=' + e.options.charset + '"/>' : "") + e.document.getElementsByTagName("head")[0].innerHTML + t.html + "</head><body " + (d && l.version < 9 ? 'class="view"' : "") + ">" + e.getContent(null, null, !0) + "</body></html>"
            },
            getPlainTxt: function() {
                var e = new RegExp(g.fillChar, "g"),
                    t = this.body.innerHTML.replace(/[\n\r]/g, "");
                return t = t.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, "\n").replace(/<br\/?>/gi, "\n").replace(/<[^>\/]+>/g, "").replace(/(\n)?<\/([^>]+)>/g, function(e, t, n) {
                    return m.$block[n] ? "\n" : t ? t : ""
                }), t.replace(e, "").replace(/\u00a0/g, " ").replace(/&nbsp;/g, " ").replace(/\u200B<img/gi, "<img")
            },
            getContentTxt: function() {
                var e = new RegExp(g.fillChar, "g");
                return this.body[l.ie ? "innerText" : "textContent"].replace(e, "").replace(/\u00a0/g, " ")
            },
            setContent: function(t, n) {
                var r, a = this,
                    i = u.extend({
                        a: 1,
                        A: 1
                    }, m.$inline, !0);
                t = t.replace(/^[ \t\r\n]*?</, "<").replace(/>[ \t\r\n]*?$/, ">").replace(/>[\t\r\n]*?</g, "><").replace(/[\s\/]?(\w+)?>[ \t\r\n]*?<\/?(\w+)/gi, function(e, t, n) {
                    return t ? r = n : t = r, i[t] || i[n] ? e : e.replace(/>[ \t\r\n]*?</, "><")
                }), a.fireEvent("beforesetcontent");
                var o = this.serialize;
                if (o) {
                    var s = o.parseHTML(t);
                    s = o.transformInput(s), s = o.filter(s), t = o.toHTML(s)
                }
                if (this.body.innerHTML = t.replace(new RegExp("[\r" + g.fillChar + "]*", "g"), ""), l.ie && l.version < 7 && e(this.document.body), "p" == a.options.enterTag) {
                    var d, c = this.body.firstChild;
                    if (!c || 1 == c.nodeType && (m.$cdata[c.tagName] || g.isCustomeNode(c)) && c === this.body.lastChild) this.body.innerHTML = "<p>" + (l.ie ? "&nbsp;" : "<br/>") + "</p>" + this.body.innerHTML;
                    else
                        for (var f = a.document.createElement("p"); c;) {
                            for (; c && (3 == c.nodeType || 1 == c.nodeType && m.p[c.tagName] && !m.$cdata[c.tagName]);) d = c.nextSibling, f.appendChild(c), c = d;
                            if (f.firstChild) {
                                if (!c) {
                                    a.body.appendChild(f);
                                    break
                                }
                                a.body.insertBefore(f, c), f = a.document.createElement("p")
                            }
                            c = c.nextSibling
                        }
                }
                a.adjustTable && a.adjustTable(a.body), a.fireEvent("aftersetcontent"), a.fireEvent("contentchange"), !n && a._selectionChange(), a._bakRange = a._bakIERange = null;
                var p;
                l.gecko && (p = this.selection.getNative()) && p.removeAllRanges()
            },
            focus: function(e) {
                try {
                    var t = this,
                        n = t.selection.getRange();
                    e ? n.setStartAtLast(t.body.lastChild).setCursor(!1, !0) : n.select(!0)
                } catch (r) {}
            },
            _initEvents: function() {
                var e = this,
                    t = e.document,
                    n = e.window;
                e._proxyDomEvent = u.bind(e._proxyDomEvent, e), g.on(t, ["click", "contextmenu", "mousedown", "keydown", "keyup", "keypress", "mouseup", "mouseover", "mouseout", "selectstart"], e._proxyDomEvent), g.on(n, ["focus", "blur"], e._proxyDomEvent), g.on(t, ["mouseup", "keydown"], function(t) {
                    "keydown" == t.type && (t.ctrlKey || t.metaKey || t.shiftKey || t.altKey) || 2 != t.button && e._selectionChange(250, t)
                });
                var r, a = 0,
                    i = l.ie ? e.body : e.document;
                g.on(i, "dragstart", function() {
                    a = 1
                }), g.on(i, l.webkit ? "dragover" : "drop", function() {
                    return l.webkit ? function() {
                        clearTimeout(r), r = setTimeout(function() {
                            if (!a) {
                                var t = e.selection,
                                    n = t.getRange();
                                if (n) {
                                    var r = n.getCommonAncestor();
                                    if (r && e.serialize) {
                                        var i = e.serialize,
                                            o = i.filter(i.transformInput(i.parseHTML(i.word(r.innerHTML))));
                                        r.innerHTML = i.toHTML(o)
                                    }
                                }
                            }
                            a = 0
                        }, 200)
                    } : function(e) {
                        a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), a = 0
                    }
                }())
            },
            _proxyDomEvent: function(e) {
                return this.fireEvent(e.type.replace(/^on/, ""), e)
            },
            _selectionChange: function(e, t) {
                var r, a, i = this,
                    o = !1;
                if (l.ie && l.version < 9 && t && "mouseup" == t.type) {
                    var s = this.selection.getRange();
                    s.collapsed || (o = !0, r = t.clientX, a = t.clientY)
                }
                clearTimeout(n), n = setTimeout(function() {
                    if (i.selection.getNative()) {
                        var e;
                        if (o && "None" == i.selection.getNative().type) {
                            e = i.document.body.createTextRange();
                            try {
                                e.moveToPoint(r, a)
                            } catch (n) {
                                e = null
                            }
                        }
                        var s;
                        e && (s = i.selection.getIERange, i.selection.getIERange = function() {
                            return e
                        }), i.selection.cache(), s && (i.selection.getIERange = s), i.selection._cachedRange && i.selection._cachedStartElement && (i.fireEvent("beforeselectionchange"), i.fireEvent("selectionchange", !!t), i.fireEvent("afterselectionchange"), i.selection.clear())
                    }
                }, e || 50)
            },
            _callCmdFn: function(e, t) {
                var n, r, a = t[0].toLowerCase();
                return n = this.commands[a] || UE.commands[a], r = n && n[e], n && r || "queryCommandState" != e ? r ? r.apply(this, t) : void 0 : 0
            },
            execCommand: function(e) {
                e = e.toLowerCase();
                var t, n = this,
                    r = n.commands[e] || UE.commands[e];
                if (r && r.execCommand) return r.notNeedUndo || n.__hasEnterExecCommand ? t = this._callCmdFn("execCommand", arguments) : (n.__hasEnterExecCommand = !0, -1 != n.queryCommandState(e) && (n.fireEvent("beforeexeccommand", e), t = this._callCmdFn("execCommand", arguments), n.fireEvent("afterexeccommand", e)), n.__hasEnterExecCommand = !1), n._selectionChange(), t
            },
            queryCommandState: function() {
                return this._callCmdFn("queryCommandState", arguments)
            },
            queryCommandValue: function() {
                return this._callCmdFn("queryCommandValue", arguments)
            },
            hasContents: function(e) {
                if (e)
                    for (var t, n = 0; t = e[n++];)
                        if (this.document.getElementsByTagName(t).length > 0) return !0;
                if (!g.isEmptyBlock(this.body)) return !0;
                for (e = ["div"], n = 0; t = e[n++];)
                    for (var r, a = g.getElementsByTagName(this.document, t), i = 0; r = a[i++];)
                        if (g.isCustomeNode(r)) return !0;
                return !1
            },
            reset: function() {
                this.fireEvent("reset")
            },
            setEnabled: function() {
                var e, t = this;
                if ("false" == t.body.contentEditable) {
                    t.body.contentEditable = !0, e = t.selection.getRange();
                    try {
                        e.moveToBookmark(t.lastBk), delete t.lastBk
                    } catch (n) {
                        e.setStartAtFirst(t.body).collapse(!0)
                    }
                    e.select(!0), t.bkqueryCommandState && (t.queryCommandState = t.bkqueryCommandState, delete t.bkqueryCommandState), t.fireEvent("selectionchange")
                }
            },
            setDisabled: function(e) {
                var t = this;
                e = e ? u.isArray(e) ? e : [e] : [], "true" == t.body.contentEditable && (t.lastBk || (t.lastBk = t.selection.getRange().createBookmark(!0)), t.body.contentEditable = !1, t.bkqueryCommandState = t.queryCommandState, t.queryCommandState = function(n) {
                    return -1 != u.indexOf(e, n) ? t.bkqueryCommandState.apply(t, arguments) : -1
                }, t.fireEvent("selectionchange"))
            },
            setDefaultContent: function() {
                function t() {
                    var e = this;
                    if (e.document.getElementById("initContent")) {
                        e.document.body.innerHTML = "<p>" + (d ? "" : "<br/>") + "</p>";
                        var n = e.selection.getRange();
                        e.removeListener("firstBeforeExecCommand", t), e.removeListener("focus", t), setTimeout(function() {
                            n.setStart(e.document.body.firstChild, 0).collapse(!0).select(!0), e._selectionChange()
                        })
                    }
                }
                return function(n) {
                    var r = this;
                    r.document.body.innerHTML = '<p id="initContent">' + n + "</p>", l.ie && l.version < 7 && e(r.document.body), r.addListener("firstBeforeExecCommand", t), r.addListener("focus", t)
                }
            }(),
            setShow: function() {
                var e = this,
                    t = e.selection.getRange();
                if ("none" == e.container.style.display) {
                    try {
                        t.moveToBookmark(e.lastBk), delete e.lastBk
                    } catch (n) {
                        t.setStartAtFirst(e.body).collapse(!0)
                    }
                    t.select(!0), e.container.style.display = ""
                }
            },
            setHide: function() {
                var e = this;
                e.lastBk || (e.lastBk = e.selection.getRange().createBookmark(!0)), e.container.style.display = "none"
            },
            getLang: function(e) {
                var t = UE.I18N[this.options.lang];
                e = (e || "").split(".");
                for (var n, r = 0;
                    (n = e[r++]) && (t = t[n], t););
                return t
            }
        }, u.inherits(a, f)
    }(), UE.plugins.fiximgclick = function() {
            var e = this;
            if (l.webkit) e.addListener("click", function(t, n) {
                if ("IMG" == n.target.tagName) {
                    var r = new s.Range(e.document);
                    r.selectNode(n.target).select()
                }
            });
            else {
                var t = function(t) {
                        var n = new s.Range(e.document);
                        n.selectNode(t).collapse(!0).insertNode(e.document.createTextNode("​"))
                    },
                    n = function(t) {
                        var n = new s.Range(e.document);
                        n.selectNode(t).setStart(n.startContainer, n.startOffset - 1).select()
                    },
                    r = function(t) {
                        var n = new s.Range(e.document);
                        n.selectNode(t).collapse(!0).setStart(n.startContainer, n.startOffset - 1);
                        var r = n.cloneContents().firstChild;
                        return r ? r.textContent || r.innerText : null
                    },
                    a = function(a) {
                        var i = e.selection.getRange();
                        i.startOffset && "​" === r(a) ? n(a) : (t(a), n(a))
                    };
                e.addListener("click", function(e, t) {
                    t.target && "IMG" == t.target.tagName && a(t.target)
                }), e.addListener("selectionchange", function() {
                    var t = e.selection.getRange();
                    if (t.endOffset - t.startOffset === 1 && 1 === t.startContainer.nodeType) {
                        var n = t.startContainer.childNodes[t.startOffset];
                        if (n && 1 === n.nodeType && "IMG" === n.tagName) return void a(n)
                    }
                })
            }
        }, UE.plugins.removeformat = function() {
            var e = this;
            e.setOpt({
                removeFormatTags: "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var",
                removeFormatAttributes: "class,style,lang,width,height,align,hspace,valign"
            }), e.commands.removeformat = {
                execCommand: function(e, t, n, r, a) {
                    function i(e) {
                        if (3 == e.nodeType || "span" != e.tagName.toLowerCase()) return 0;
                        if (l.ie) {
                            var t = e.attributes;
                            if (t.length) {
                                for (var n = 0, r = t.length; r > n; n++)
                                    if (t[n].specified) return 0;
                                return 1
                            }
                        }
                        return !e.attributes.length
                    }

                    function o(e) {
                        var t = e.createBookmark();
                        if (e.collapsed && e.enlarge(!0), !a) {
                            var r = g.findParentByTagName(e.startContainer, "a", !0);
                            r && e.setStartBefore(r), r = g.findParentByTagName(e.endContainer, "a", !0), r && e.setEndAfter(r)
                        }
                        for (d = e.createBookmark(), y = d.start;
                            (c = y.parentNode) && !g.isBlockElm(c);) g.breakParent(y, c), g.clearEmptySibling(y);
                        if (d.end) {
                            for (y = d.end;
                                (c = y.parentNode) && !g.isBlockElm(c);) g.breakParent(y, c), g.clearEmptySibling(y);
                            for (var o, s = g.getNextDomNode(d.start, !1, h); s && s != d.end;) o = g.getNextDomNode(s, !0, h), m.$empty[s.tagName.toLowerCase()] || g.isBookmarkNode(s) || (u.test(s.tagName) ? n ? (g.removeStyle(s, n), i(s) && "text-decoration" != n && g.remove(s, !0)) : g.remove(s, !0) : m.$tableContent[s.tagName] || m.$list[s.tagName] || (g.removeAttributes(s, f), i(s) && g.remove(s, !0))), s = o
                        }
                        var l = d.start.parentNode;
                        !g.isBlockElm(l) || m.$tableContent[l.tagName] || m.$list[l.tagName] || g.removeAttributes(l, f), l = d.end.parentNode, d.end && g.isBlockElm(l) && !m.$tableContent[l.tagName] && !m.$list[l.tagName] && g.removeAttributes(l, f), e.moveToBookmark(d).moveToBookmark(t);
                        for (var p, y = e.startContainer, b = e.collapsed; 1 == y.nodeType && g.isEmptyNode(y) && m.$removeEmpty[y.tagName];) p = y.parentNode, e.setStartBefore(y), e.startContainer === e.endContainer && e.endOffset--, g.remove(y), y = p;
                        if (!b)
                            for (y = e.endContainer; 1 == y.nodeType && g.isEmptyNode(y) && m.$removeEmpty[y.tagName];) p = y.parentNode, e.setEndBefore(y), g.remove(y), y = p
                    }
                    var d, c, u = new RegExp("^(?:" + (t || this.options.removeFormatTags).replace(/,/g, "|") + ")$", "i"),
                        f = n ? [] : (r || this.options.removeFormatAttributes).split(","),
                        p = new s.Range(this.document),
                        h = function(e) {
                            return 1 == e.nodeType
                        };
                    if (this.currentSelectedArr && this.currentSelectedArr.length) {
                        for (var y, b = 0; y = this.currentSelectedArr[b++];) p.selectNodeContents(y), o(p);
                        p.selectNodeContents(this.currentSelectedArr[0]).select()
                    } else p = this.selection.getRange(), o(p), p.select()
                },
                queryCommandState: function() {
                    return this.highlight ? -1 : 0
                }
            }
        }, UE.plugins.font = function() {
            var e = this,
                t = {
                    forecolor: "color",
                    backcolor: "background-color",
                    fontsize: "font-size",
                    fontfamily: "font-family",
                    underline: "text-decoration",
                    strikethrough: "text-decoration"
                };
            e.setOpt({
                fontfamily: [{
                    name: "songti",
                    val: "宋体,SimSun"
                }, {
                    name: "yahei",
                    val: "微软雅黑,Microsoft YaHei"
                }, {
                    name: "kaiti",
                    val: "楷体,楷体_GB2312, SimKai"
                }, {
                    name: "heiti",
                    val: "黑体, SimHei"
                }, {
                    name: "lishu",
                    val: "隶书, SimLi"
                }, {
                    name: "andaleMono",
                    val: "andale mono"
                }, {
                    name: "arial",
                    val: "arial, helvetica,sans-serif"
                }, {
                    name: "arialBlack",
                    val: "arial black,avant garde"
                }, {
                    name: "comicSansMs",
                    val: "comic sans ms"
                }, {
                    name: "impact",
                    val: "impact,chicago"
                }, {
                    name: "timesNewRoman",
                    val: "times new roman"
                }],
                fontsize: [10, 11, 12, 14, 16, 18, 20, 24, 36]
            });
            for (var n in t) ! function(e, t) {
                UE.commands[e] = {
                    execCommand: function(n, r) {
                        r = r || (this.queryCommandState(n) ? "none" : "underline" == n ? "underline" : "line-through");
                        var a, i = this,
                            o = this.selection.getRange();
                        if ("default" == r) o.collapsed && (a = i.document.createTextNode("font"), o.insertNode(a).select()), i.execCommand("removeFormat", "span,a", t), a && (o.setStartBefore(a).setCursor(), g.remove(a));
                        else if (i.currentSelectedArr && i.currentSelectedArr.length > 0) {
                            for (var s, d = 0; s = i.currentSelectedArr[d++];) o.selectNodeContents(s), o.applyInlineStyle("span", {
                                style: t + ":" + r
                            });
                            o.selectNodeContents(this.currentSelectedArr[0]).select()
                        } else if (o.collapsed) {
                            var u = g.findParentByTagName(o.startContainer, "span", !0);
                            if (a = i.document.createTextNode("font"), !u || u.children.length || u[l.ie ? "innerText" : "textContent"].replace(y, "").length) {
                                if (o.insertNode(a), o.selectNode(a).select(), u = o.document.createElement("span"), "underline" == e || "strikethrough" == e) {
                                    if (g.findParentByTagName(a, "a", !0)) return o.setStartBefore(a).setCursor(), void g.remove(a);
                                    i.execCommand("removeFormat", "span,a", t)
                                }
                                if (u.style.cssText = t + ":" + r, a.parentNode.insertBefore(u, a), !l.ie || l.ie && 9 == l.version)
                                    for (var f = u.parentNode; !g.isBlockElm(f);) "SPAN" == f.tagName && (u.style.cssText = f.style.cssText + ";" + u.style.cssText), f = f.parentNode;
                                c ? setTimeout(function() {
                                    o.setStart(u, 0).setCursor()
                                }) : o.setStart(u, 0).setCursor()
                            } else o.insertNode(a), ("underline" == e || "strikethrough" == e) && (o.selectNode(a).select(), i.execCommand("removeFormat", "span,a", t, null), u = g.findParentByTagName(a, "span", !0), o.setStartBefore(a)), u.style.cssText += ";" + t + ":" + r, o.collapse(!0).select();
                            g.remove(a)
                        } else "underline" != e && "strikethrough" != e || !i.queryCommandValue(e) || i.execCommand("removeFormat", "span,a", t), o = i.selection.getRange(), o.applyInlineStyle("span", {
                            style: t + ":" + r
                        }).select();
                        return !0
                    },
                    queryCommandValue: function(e) {
                        var n = this.selection.getStart();
                        if ("underline" == e || "strikethrough" == e) {
                            for (var r, a = n; a && !g.isBlockElm(a) && !g.isBody(a);) {
                                if (1 == a.nodeType && (r = g.getComputedStyle(a, t), "none" != r)) return r;
                                a = a.parentNode
                            }
                            return "none"
                        }
                        return g.getComputedStyle(n, t)
                    },
                    queryCommandState: function(e) {
                        return this.highlight ? -1 : "underline" != e && "strikethrough" != e ? 0 : this.queryCommandValue(e) == ("underline" == e ? "underline" : "line-through")
                    }
                }
            }(n, t[n])
        }, UE.plugins.basestyle = function() {
            var e = {
                    bold: ["strong", "b"],
                    italic: ["em", "i"],
                    subscript: ["sub"],
                    superscript: ["sup"]
                },
                t = function(e, t) {
                    var n = e.selection.getStartElementPath();
                    return u.findNode(n, t)
                },
                n = this;
            for (var r in e) ! function(e, r) {
                n.commands[e] = {
                    execCommand: function(e) {
                        var a = new s.Range(n.document),
                            i = "";
                        if (n.currentSelectedArr && n.currentSelectedArr.length > 0) {
                            for (var o, l = 0; o = n.currentSelectedArr[l++];) "none" != o.style.display && (a.selectNodeContents(o).select(), !i && (i = t(this, r)), ("superscript" == e || "subscript" == e) && (i && i.tagName.toLowerCase() == e || a.removeInlineStyle(["sub", "sup"])), i ? a.removeInlineStyle(r) : a.applyInlineStyle(r[0]));
                            a.selectNodeContents(n.currentSelectedArr[0]).select()
                        } else {
                            if (a = n.selection.getRange(), i = t(this, r), a.collapsed) {
                                if (i) {
                                    var d = n.document.createTextNode("");
                                    a.insertNode(d).removeInlineStyle(r), a.setStartBefore(d), g.remove(d)
                                } else {
                                    var c = a.document.createElement(r[0]);
                                    ("superscript" == e || "subscript" == e) && (d = n.document.createTextNode(""), a.insertNode(d).removeInlineStyle(["sub", "sup"]).setStartBefore(d).collapse(!0)), a.insertNode(c).setStart(c, 0)
                                }
                                a.collapse(!0)
                            } else("superscript" == e || "subscript" == e) && (i && i.tagName.toLowerCase() == e || a.removeInlineStyle(["sub", "sup"])), i ? a.removeInlineStyle(r) : a.applyInlineStyle(r[0]);
                            a.select()
                        }
                        return !0
                    },
                    queryCommandState: function() {
                        return this.highlight ? -1 : t(this, r) ? 1 : 0
                    }
                }
            }(r, e[r])
        }, UE.commands.inserthtml = {
            execCommand: function(e, t, n) {
                var r, a, i = this,
                    o = i.currentSelectedArr;
                r = i.selection.getRange(), a = r.document.createElement("div"), a.style.display = "inline";
                var s = i.serialize;
                if (!n && s) {
                    var d = s.parseHTML(t);
                    d = s.transformInput(d), d = s.filter(d), t = s.toHTML(d)
                }
                a.innerHTML = u.trim(t);
                try {
                    i.adjustTable && i.adjustTable(a)
                } catch (c) {}
                if (o && o.length) {
                    for (var f, p = 0; f = o[p++];) f.className = "";
                    o[0].innerHTML = "", r.setStart(o[0], 0).collapse(!0), i.currentSelectedArr = []
                }
                if (!r.collapsed && (r.deleteContents(), 1 == r.startContainer.nodeType)) {
                    var h, y = r.startContainer.childNodes[r.startOffset];
                    if (y && g.isBlockElm(y) && (h = y.previousSibling) && g.isBlockElm(h)) {
                        for (r.setEnd(h, h.childNodes.length).collapse(); y.firstChild;) h.appendChild(y.firstChild);
                        g.remove(y)
                    }
                }
                for (var y, b, h, v, C = 0; y = a.firstChild;) {
                    if (r.insertNode(y), !C && y.nodeType == g.NODE_ELEMENT && g.isBlockElm(y) && (b = g.findParent(y, function(e) {
                            return g.isBlockElm(e)
                        }), b && "body" != b.tagName.toLowerCase() && (!m[b.tagName][y.nodeName] || y.parentNode !== b))) {
                        if (m[b.tagName][y.nodeName])
                            for (v = y.parentNode; v !== b;) h = v, v = v.parentNode;
                        else h = b;
                        g.breakParent(y, h || v);
                        var h = y.previousSibling;
                        g.trimWhiteTextNode(h), h.childNodes.length || g.remove(h), !l.ie && (N = y.nextSibling) && g.isBlockElm(N) && N.lastChild && !g.isBr(N.lastChild) && N.appendChild(i.document.createElement("br")), C = 1
                    }
                    var N = y.nextSibling;
                    if (!a.firstChild && N && g.isBlockElm(N)) {
                        r.setStart(N, 0).collapse(!0);
                        break
                    }
                    r.setEndAfter(y).collapse()
                }
                y = r.startContainer, g.isBlockElm(y) && g.isEmptyNode(y) && (y.innerHTML = l.ie ? "" : "<br/>"), setTimeout(function() {
                    r = i.selection.getRange(), r.scrollToView(i.autoHeightEnabled, i.autoHeightEnabled ? g.getXY(i.iframe).y : 0)
                }, 200)
            }
        }, UE.plugins.serialize = function() {
            function e(e) {
                return /pt/.test(e) ? e.replace(/([\d.]+)pt/g, function(e) {
                    return Math.round(96 * parseFloat(e) / 72) + "px"
                }) : e
            }

            function t(e, t) {
                {
                    var r, a = [0, 10, 12, 16, 18, 24, 32, 48];
                    u.indexOf
                }
                switch (e.tag) {
                    case "script":
                        e.tag = "div", e.attributes._ue_div_script = 1, e.attributes._ue_script_data = e.children[0] ? encodeURIComponent(e.children[0].data) : "", e.attributes._ue_custom_node_ = 1, e.children = [];
                        break;
                    case "style":
                        e.tag = "div", e.attributes._ue_div_style = 1, e.attributes._ue_style_data = e.children[0] ? encodeURIComponent(e.children[0].data) : "", e.attributes._ue_custom_node_ = 1, e.children = [];
                        break;
                    case "img":
                        if (e.attributes.src && /^data:/.test(e.attributes.src)) return {
                            type: "fragment",
                            children: []
                        };
                        if (e.attributes.src && /^(?:file)/.test(e.attributes.src)) {
                            if (!/(gif|bmp|png|jpg|jpeg)$/.test(e.attributes.src)) return {
                                type: "fragment",
                                children: []
                            };
                            e.attributes.word_img = e.attributes.src, e.attributes.src = f.options.UEDITOR_HOME_URL + "themes/default/images/spacer.gif";
                            var i = parseInt(e.attributes.width) < 128 || parseInt(e.attributes.height) < 43;
                            e.attributes.style = "background:url(" + (i ? f.options.UEDITOR_HOME_URL + "themes/default/images/word.gif" : f.options.langPath + f.options.lang + "/images/localimage.png") + ") no-repeat center center;border:1px solid #ddd", t && (t.flag = 1)
                        }
                        l.ie && l.version < 7 && (e.attributes.orgSrc = e.attributes.src), e.attributes.data_ue_src = e.attributes.data_ue_src || e.attributes.src;
                        break;
                    case "li":
                        var o = e.children[0];
                        if (!o || "element" != o.type || "p" != o.tag && m.p[o.tag]) {
                            var s = {
                                type: "element",
                                tag: "p",
                                attributes: {},
                                parent: e
                            };
                            s.children = o ? e.children : [l.ie ? {
                                type: "text",
                                data: g.fillChar,
                                parent: s
                            } : {
                                type: "element",
                                tag: "br",
                                attributes: {},
                                closed: !0,
                                children: [],
                                parent: s
                            }], e.children = [s]
                        }
                        break;
                    case "table":
                    case "td":
                        n(e);
                        break;
                    case "a":
                        e.attributes.anchorname && (e.tag = "img", e.attributes = {
                            "class": "anchorclass",
                            anchorname: e.attributes.name
                        }, e.closed = 1), e.attributes.href && (e.attributes.data_ue_src = e.attributes.href);
                        break;
                    case "b":
                        e.tag = e.name = "strong";
                        break;
                    case "i":
                        e.tag = e.name = "em";
                        break;
                    case "u":
                        e.tag = e.name = "span", e.attributes.style = (e.attributes.style || "") + ";text-decoration:underline;";
                        break;
                    case "s":
                    case "del":
                        e.tag = e.name = "span", e.attributes.style = (e.attributes.style || "") + ";text-decoration:line-through;", 1 == e.children.length && (o = e.children[0], o.tag == e.tag && (e.attributes.style += ";" + o.attributes.style, e.children = o.children));
                        break;
                    case "span":
                        var d = e.attributes.style;
                        if (d && (!e.attributes.style || l.webkit && "white-space:nowrap;" == d) && delete e.attributes.style, l.gecko && l.version <= 10902 && e.parent) {
                            var c = e.parent;
                            "span" == c.tag && c.attributes && c.attributes.style && (e.attributes.style = c.attributes.style + ";" + e.attributes.style)
                        }
                        u.isEmptyObject(e.attributes) && p && (e.type = "fragment");
                        break;
                    case "font":
                        for (e.tag = e.name = "span", r = e.attributes, e.attributes = {
                                style: (r.size ? "font-size:" + (a[r.size] || 12) + "px" : "") + ";" + (r.color ? "color:" + r.color : "") + ";" + (r.face ? "font-family:" + r.face : "") + ";" + (r.style || "")
                            }; e.parent.tag == e.tag && 1 == e.parent.children.length;) e.attributes.style && (e.parent.attributes.style ? e.parent.attributes.style += ";" + e.attributes.style : e.parent.attributes.style = e.attributes.style), e.parent.children = e.children, e = e.parent;
                        break;
                    case "p":
                        e.attributes.align && (e.attributes.style = (e.attributes.style || "") + ";text-align:" + e.attributes.align + ";", delete e.attributes.align)
                }
                return e
            }

            function n(e) {
                if (d && e.attributes.style) {
                    var t = e.attributes.style;
                    e.attributes.style = t.replace(/;\s*/g, ";"), e.attributes.style = e.attributes.style.replace(/^\s*|\s*$/, "")
                }
            }

            function r(e) {
                switch (e.tag) {
                    case "div":
                        e.attributes._ue_div_script && (e.tag = "script", e.children = [{
                            type: "cdata",
                            data: e.attributes._ue_script_data ? decodeURIComponent(e.attributes._ue_script_data) : "",
                            parent: e
                        }], delete e.attributes._ue_div_script, delete e.attributes._ue_script_data, delete e.attributes._ue_custom_node_), e.attributes._ue_div_style && (e.tag = "style", e.children = [{
                            type: "cdata",
                            data: e.attributes._ue_style_data ? decodeURIComponent(e.attributes._ue_style_data) : "",
                            parent: e
                        }], delete e.attributes._ue_div_style, delete e.attributes._ue_style_data, delete e.attributes._ue_custom_node_);
                        break;
                    case "table":
                        !e.attributes.style && delete e.attributes.style, d && e.attributes.style && n(e), "noBorderTable" == e.attributes["class"] && delete e.attributes["class"];
                        break;
                    case "td":
                    case "th":
                        if (/display\s*:\s*none/i.test(e.attributes.style)) return {
                            type: "fragment",
                            children: []
                        };
                        if (d && !e.children.length) {
                            var t = {
                                type: "text",
                                data: g.fillChar,
                                parent: e
                            };
                            e.children[0] = t
                        }
                        d && e.attributes.style && n(e), "selectTdClass" == e.attributes["class"] && delete e.attributes["class"];
                        break;
                    case "img":
                        e.attributes.anchorname ? (e.tag = "a", e.attributes = {
                            name: e.attributes.anchorname,
                            anchorname: 1
                        }, e.closed = null) : e.attributes.data_ue_src && (e.attributes.src = e.attributes.data_ue_src, delete e.attributes.data_ue_src);
                        break;
                    case "a":
                        e.attributes.data_ue_src && (e.attributes.href = e.attributes.data_ue_src, delete e.attributes.data_ue_src)
                }
                return e
            }

            function a(e, t, n) {
                if (!e.children || !e.children.length) return e;
                for (var r = e.children, a = 0; a < r.length; a++) {
                    var i = t(r[a], n);
                    if ("fragment" == i.type) {
                        var o = [a, 1];
                        o.push.apply(o, i.children), r.splice.apply(r, o), r.length || (e = {
                            type: "fragment",
                            children: []
                        }), a--
                    } else r[a] = i
                }
                return e
            }

            function i(e) {
                this.rules = e
            }
            var o, s, d = l.ie,
                c = l.version,
                f = this,
                p = f.options.autoClearEmptyNode,
                h = m.$empty,
                y = function() {
                    function e(e, i) {
                        var o, s, l, u = 0;
                        for (t.exec(""); o = t.exec(e);) {
                            var f = o.index;
                            if (f > u) {
                                var m = e.slice(u, f);
                                l ? l.push(m) : i.onText(m)
                            }
                            if (u = t.lastIndex, !(s = o[1]) || (s = s.toLowerCase(), l && s == l._tag_name && (i.onCDATA(l.join("")), l = null), l))
                                if (l) l.push(o[0]);
                                else if (s = o[3]) {
                                if (/="/.test(s)) continue;
                                s = s.toLowerCase();
                                var p, h = o[4],
                                    g = {},
                                    y = h && "/" == h.slice(-1);
                                if (h)
                                    for (n.exec(""); p = n.exec(h);) {
                                        var b = p[1].toLowerCase(),
                                            v = p[2] || p[3] || p[4] || "";
                                        !v && r[b] && (v = b), "style" == b && d && 6 >= c && (v = v.replace(/(?!;)\s*([\w-]+):/g, function(e, t) {
                                            return t.toLowerCase() + ":"
                                        })), v && (g[b] = v.replace(/:\s*/g, ":"))
                                    }
                                i.onTagOpen(s, g, y), !l && a[s] && (l = [], l._tag_name = s)
                            } else(s = o[2]) && i.onComment(s);
                            else i.onTagClose(s)
                        }
                        e.length > u && i.onText(e.slice(u, e.length))
                    }
                    var t = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s\/>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,
                        n = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
                        r = {
                            checked: 1,
                            compact: 1,
                            declare: 1,
                            defer: 1,
                            disabled: 1,
                            ismap: 1,
                            multiple: 1,
                            nohref: 1,
                            noresize: 1,
                            noshade: 1,
                            nowrap: 1,
                            readonly: 1,
                            selected: 1
                        },
                        a = {
                            script: 1,
                            style: 1
                        },
                        i = {
                            li: {
                                $: "ul",
                                ul: 1,
                                ol: 1
                            },
                            dd: {
                                $: "dl",
                                dl: 1
                            },
                            dt: {
                                $: "dl",
                                dl: 1
                            },
                            option: {
                                $: "select",
                                select: 1
                            },
                            td: {
                                $: "tr",
                                tr: 1
                            },
                            th: {
                                $: "tr",
                                tr: 1
                            },
                            tr: {
                                $: "tbody",
                                tbody: 1,
                                thead: 1,
                                tfoot: 1,
                                table: 1
                            },
                            tbody: {
                                $: "table",
                                table: 1,
                                colgroup: 1
                            },
                            thead: {
                                $: "table",
                                table: 1
                            },
                            tfoot: {
                                $: "table",
                                table: 1
                            },
                            col: {
                                $: "colgroup",
                                colgroup: 1
                            }
                        },
                        o = {
                            table: "td",
                            tbody: "td",
                            thead: "td",
                            tfoot: "td",
                            tr: "td",
                            colgroup: "col",
                            ul: "li",
                            ol: "li",
                            dl: "dd",
                            select: "option"
                        };
                    return function(t, n) {
                        function r(e) {
                            e.parent = d, d.children.push(e)
                        }

                        function a(e, t) {
                            var r = e;
                            if (i[r.tag]) {
                                for (; i[d.tag] && i[d.tag][r.tag];) d = d.parent;
                                for (d.tag == r.tag && (d = d.parent); i[r.tag] && !i[r.tag][d.tag];) r = r.parent = {
                                    type: "element",
                                    tag: i[r.tag].$,
                                    attributes: {},
                                    children: [r]
                                }
                            }
                            if (n)
                                for (; m[r.tag] && !("span" == d.tag ? u.extend(m.strong, {
                                        a: 1,
                                        A: 1
                                    }) : m[d.tag] || m.div)[r.tag];)
                                    if (!s(d)) {
                                        if (!d.parent) break;
                                        d = d.parent
                                    }
                            return r.parent = d, d.children.push(r), t && (d = e), e.attributes.style && (e.attributes.style = e.attributes.style.toLowerCase()), e
                        }

                        function s(e) {
                            var t;
                            return !e.children.length && (t = o[e.tag]) ? (a({
                                type: "element",
                                tag: t,
                                attributes: {},
                                children: []
                            }, !0), !0) : !1
                        }
                        var l = {
                                type: "fragment",
                                parent: null,
                                children: []
                            },
                            d = l;
                        for (e(t, {
                                onText: function(e) {
                                    for (; !(m[d.tag] || m.div)["#"];) s(d) || (d = d.parent);
                                    r({
                                        type: "text",
                                        data: e
                                    })
                                },
                                onComment: function(e) {
                                    r({
                                        type: "comment",
                                        data: e
                                    })
                                },
                                onCDATA: function(e) {
                                    for (; !(m[d.tag] || m.div)["#"];) s(d) || (d = d.parent);
                                    r({
                                        type: "cdata",
                                        data: e
                                    })
                                },
                                onTagOpen: function(e, t, n) {
                                    n = n || h[e], a({
                                        type: "element",
                                        tag: e,
                                        attributes: t,
                                        closed: n,
                                        children: []
                                    }, !n)
                                },
                                onTagClose: function(e) {
                                    for (var t = d; t && e != t.tag;) t = t.parent;
                                    if (t) {
                                        for (var n = d; n !== t.parent; n = n.parent) s(n);
                                        d = t.parent
                                    } else m.$removeEmpty[e] || m.$removeEmptyBlock[e] || "embed" == e || (t = {
                                        type: "element",
                                        tag: e,
                                        attributes: {},
                                        children: []
                                    }, a(t, !0), s(t), d = t.parent)
                                }
                            }); d !== l;) s(d), d = d.parent;
                        return l
                    }
                }(),
                b = function() {
                    function e(e) {
                        return t[e]
                    }
                    var t = {
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;"
                    };
                    return function(t) {
                        return t += "", t ? t.replace(/[<>"']/g, e) : ""
                    }
                }(),
                v = function() {
                    function t(e, t) {
                        for (var n, r = e.children, a = [], i = 0; n = r[i]; i++) a.push(v(n, t));
                        return a.join("")
                    }

                    function n(t) {
                        var n = [];
                        for (var r in t) {
                            var a = t[r];
                            "style" == r && (a = e(a), /rgba?\s*\([^)]*\)/.test(a) && (a = a.replace(/rgba?\s*\(([^)]*)\)/g, function(e) {
                                return u.fixColor("color", e)
                            })), t[r] = u.optCss(a.replace(/windowtext/g, "#000")).replace(/white-space[^;]+;/g, "")), n.push(r + '="' + b(t[r]) + '"')
                        }
                        return n.join(" ")
                    }

                    function r(e, t) {
                        return t ? e.data.replace(/&nbsp;/g, " ") : b(e.data).replace(/ /g, "&nbsp;")
                    }

                    function a(e, r) {
                        if ("element" == e.type && !e.children.length && m.$removeEmpty[e.tag] && "a" != e.tag && u.isEmptyObject(e.attributes) && p) return s;
                        var a = e.tag;
                        if (r && "td" == a) s || (s = ""), s += t(e, r) + "&nbsp;&nbsp;&nbsp;";
                        else {
                            var o = n(e.attributes),
                                s = "<" + (r && i[a] ? i[a] : a) + (o ? " " + o : "") + (h[a] ? " />" : ">");
                            h[a] || ("p" != a || e.children.length || (s += l.ie ? "&nbsp;" : "<br/>"), s += t(e, r), s += "</" + (r && i[a] ? i[a] : a) + ">")
                        }
                        return s
                    }
                    var i = {
                        div: "p",
                        li: "p",
                        tr: "p",
                        br: "br",
                        p: "p"
                    };
                    return function(e, n) {
                        return "fragment" == e.type ? t(e, n) : "element" == e.type ? a(e, n) : "text" == e.type || "cdata" == e.type ? r(e, m.$notTransContent[e.parent.tag]) : "comment" == e.type ? "<!--" + e.data + "-->" : ""
                    }
                }(),
                C = function() {
                    function t(e) {
                        var t = new RegExp(/(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<v:)/gi);
                        return t.test(e)
                    }

                    function n(e) {
                        return e = e.replace(/([\d.]+)([\w]+)?/g, function(e, t, n) {
                            return (Math.round(parseFloat(t)) || 1) + (n || "px")
                        })
                    }

                    function r(t) {
                        return t = t.replace(/<!--\s*EndFragment\s*-->[\s\S]*$/, "").replace(/^(\r\n|\n|\r)|(\r\n|\n|\r)$/gi, "").replace(/^\s*(&nbsp;)+/gi, "").replace(/(&nbsp;|<br[^>]*>)+\s*$/gi, "").replace(/<!--[\s\S]*?-->/gi, "").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi, function(t) {
                            if (l.opera) return "";
                            try {
                                var n = t.match(/width:([ \d.]*p[tx])/i)[1],
                                    r = t.match(/height:([ \d.]*p[tx])/i)[1],
                                    a = t.match(/src=\s*"([^"]*)"/i)[1];
                                return '<img width="' + e(n) + '" height="' + e(r) + '" src="' + a + '" />'
                            } catch (i) {
                                return ""
                            }
                        }).replace(/v:\w+=["']?[^'"]+["']?/g, "").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>").replace(/(lang)\s*=\s*([\'\"]?)[\w-]+\2/gi, "").replace(/<font[^>]*>\s*<\/font>/gi, "").replace(/class\s*=\s*["']?(?:(?:MsoTableGrid)|(?:MsoListParagraph)|(?:MsoNormal(Table)?))\s*["']?/gi, ""), t = t.replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi, function(e, t, r, a) {
                            for (var i = [], o = 0, s = a.replace(/^\s+|\s+$/, "").replace(/&quot;/gi, "'").split(/;\s*/g), o = 0; o < s.length; o++) {
                                var l, d, c = s[o],
                                    u = c.split(":");
                                if (2 == u.length) {
                                    switch (l = u[0].toLowerCase(), d = u[1].toLowerCase(), l) {
                                        case "mso-padding-alt":
                                        case "mso-padding-top-alt":
                                        case "mso-padding-right-alt":
                                        case "mso-padding-bottom-alt":
                                        case "mso-padding-left-alt":
                                        case "mso-margin-alt":
                                        case "mso-margin-top-alt":
                                        case "mso-margin-right-alt":
                                        case "mso-margin-bottom-alt":
                                        case "mso-margin-left-alt":
                                        case "mso-height":
                                        case "mso-width":
                                        case "mso-vertical-align-alt":
                                            /<table/.test(t) || (i[o] = l.replace(/^mso-|-alt$/g, "") + ":" + n(d));
                                            continue;
                                        case "horiz-align":
                                            i[o] = "text-align:" + d;
                                            continue;
                                        case "vert-align":
                                            i[o] = "vertical-align:" + d;
                                            continue;
                                        case "font-color":
                                        case "mso-foreground":
                                            i[o] = "color:" + d;
                                            continue;
                                        case "mso-background":
                                        case "mso-highlight":
                                            i[o] = "background:" + d;
                                            continue;
                                        case "mso-default-height":
                                            i[o] = "min-height:" + n(d);
                                            continue;
                                        case "mso-default-width":
                                            i[o] = "min-width:" + n(d);
                                            continue;
                                        case "mso-padding-between-alt":
                                            i[o] = "border-collapse:separate;border-spacing:" + n(d);
                                            continue;
                                        case "text-line-through":
                                            ("single" == d || "double" == d) && (i[o] = "text-decoration:line-through");
                                            continue;
                                        case "mso-zero-height":
                                            "yes" == d && (i[o] = "display:none");
                                            continue;
                                        case "margin":
                                            if (!/[1-9]/.test(u[1])) continue
                                    }
                                    if (/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(l)) continue;
                                    if (/text\-indent|padding|margin/.test(l) && /\-[\d.]+/.test(d)) continue;
                                    i[o] = l + ":" + u[1]
                                }
                            }
                            return o > 0 ? t + ' style="' + i.join(";") + '"' : t
                        }), t = t.replace(/([ ]+)<\/span>/gi, function(e, t) {
                            return new Array(t.length + 1).join("&nbsp;") + "</span>"
                        })
                    }
                    return function(e) {
                        return o = null, E = "", T = "", s = "", t(e) && (e = r(e)), e.replace(/>[ \t\r\n]*</g, "><")
                    }
                }(),
                N = {
                    text: "#text",
                    comment: "#comment",
                    cdata: "#cdata-section",
                    fragment: "#document-fragment"
                },
                E = "",
                T = "";
            i.prototype = {
                rules: null,
                filter: function(e, t, n) {
                    function r(e, t) {
                        if (e.name = "element" == e.type ? e.tag : N[e.type], null == t) return a(e, r, e);
                        if (o && o[e.name]) return n && (n.flag = 1), {
                            type: "fragment",
                            children: []
                        };
                        if (i && "element" == e.type)
                            if ("img" == e.name || "span" == e.name && "___ie_paste_end___" == e.attributes.id || "fragment" == t.type ? i[e.name] : i[e.name] && i[t.name][e.name]) {
                                var s;
                                if ((s = i[e.name].$) && "___ie_paste_end___" != e.attributes.id) {
                                    var l = e.attributes,
                                        d = {};
                                    for (var c in s) l[c] && (d[c] = l[c]);
                                    e.attributes = d
                                }
                            } else "a" == e.tag && e.attributes["data-name"] && e.children && 1 == e.children.length && ("text" == e.children[0].type && "@" != e.children[0].data[0] ? e.children[0].data = "@" + e.children[0].data : "element" == e.children[0].type && "span" == e.children[0].tag && e.children[0].attributes.style && e.children[0].attributes.style.match(/0055a2/i) && e.children[0].children && 1 == e.children[0].children.length && "text" == e.children[0].children[0].type && "@" != e.children[0].children[0].data[0] && (e.children[0].children[0].data = "@" + e.children[0].children[0].data)), n && (n.flag = 1), e.type = "fragment", e.name = t.name;
                        return (o || i) && a(e, r, e), e
                    }
                    t = t || this.rules;
                    var i = t && t.whiteList,
                        o = t && t.blackList;
                    return r(e, null)
                },
                transformInput: function(e, n) {
                    function r(e) {
                        return e = t(e, n), e = a(e, r, e), f.options.pageBreakTag && "text" == e.type && e.data.replace(/\s/g, "") == f.options.pageBreakTag && (e.type = "element", e.name = e.tag = "hr", delete e.data, e.attributes = {
                            "class": "pagebreak",
                            noshade: "noshade",
                            size: "5",
                            unselectable: "on",
                            style: "moz-user-select:none;-khtml-user-select: none;"
                        }, e.children = []), "text" != e.type || m.$notTransContent[e.parent.tag] || (e.data = e.data.replace(/[\r\t\n]*/g, "")), e
                    }
                    return r(e)
                },
                transformOutput: function(e) {
                    function t(e) {
                        return "hr" == e.tag && "pagebreak" == e.attributes["class"] && (delete e.tag, e.type = "text", e.data = f.options.pageBreakTag, delete e.children), e = r(e), ("ol" == e.tag || "ul" == e.tag) && (o = 1), e = a(e, t, e), ("ol" == e.tag || "ul" == e.tag) && (o = 0), e
                    }
                    return t(e)
                },
                toHTML: v,
                parseHTML: y,
                word: C
            }, f.serialize = new i(f.options.serialize || {}), UE.serialize = new i({})
        },
        function() {
            function e(e) {
                var n = this.document;
                if (!n.getElementById("baidu_pastebin")) {
                    var r = this.selection.getRange(),
                        a = r.createBookmark(),
                        i = n.createElement("div");
                    i.id = "baidu_pastebin", t.webkit && i.appendChild(n.createTextNode(g.fillChar + g.fillChar)), n.body.appendChild(i), a.start.style.display = "", i.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" + g.getXY(a.start).y + "px", r.selectNodeContents(i).select(!0), setTimeout(function() {
                        if (t.webkit)
                            for (var o, s = 0, l = n.querySelectorAll("#baidu_pastebin"); o = l[s++];) {
                                if (!g.isEmptyNode(o)) {
                                    i = o;
                                    break
                                }
                                g.remove(o)
                            }
                        try {
                            i.parentNode.removeChild(i)
                        } catch (d) {}
                        r.moveToBookmark(a).select(!0), e(i)
                    }, 0)
                }
            }
            var t = UE.browser,
                n = UE.pasteFilter = function(e, n) {
                    var r = n.serialize,
                        a = n.paste_options.word_img_flag,
                        i = n.paste_options.modify_num,
                        o = n.options.pasteplain;
                    if (r) try {
                        var s = r.transformInput(r.parseHTML(r.word(e)), a);
                        if (s = r.filter(s, o ? {
                                whiteList: {
                                    p: {
                                        br: 1,
                                        BR: 1,
                                        $: {}
                                    },
                                    br: {
                                        $: {}
                                    },
                                    div: {
                                        br: 1,
                                        BR: 1,
                                        $: {}
                                    },
                                    li: {
                                        $: {}
                                    },
                                    img: {
                                        $: {
                                            height: 1,
                                            width: 1,
                                            src: 1,
                                            "class": 1
                                        }
                                    },
                                    span: {
                                        br: 1,
                                        $: {
                                            style: 1,
                                            id: 1
                                        }
                                    },
                                    strong: {
                                        br: 1,
                                        span: 1
                                    }
                                },
                                blackList: {
                                    style: 1,
                                    script: 1,
                                    object: 1
                                }
                            } : null, o ? null : i), t.webkit)
                            for (var l, d = s.children.length;
                                (l = s.children[d - 1]) && "br" == l.tag;) s.children.splice(d - 1, 1), d = s.children.length;
                        e = r.toHTML(s, o)
                    } catch (c) {}
                    return e
                };
            UE.plugins.paste = function() {
                function r(e) {
                    var r;
                    if (e.firstChild) {
                        for (var i, o = g.getElementsByTagName(e, "span"), s = 0; i = o[s++];)("_baidu_cut_start" == i.id || "_baidu_cut_end" == i.id) && g.remove(i);
                        if (t.webkit) {
                            for (var l, d = e.querySelectorAll("div br"), s = 0; l = d[s++];) {
                                var c = l.parentNode;
                                "DIV" == c.tagName && 1 == c.childNodes.length && (c.innerHTML = "<p><br/></p>", g.remove(c))
                            }
                            for (var u, f = e.querySelectorAll("#baidu_pastebin"), s = 0; u = f[s++];) {
                                var m = a.document.createElement("p");
                                for (u.parentNode.insertBefore(m, u); u.firstChild;) m.appendChild(u.firstChild);
                                g.remove(u)
                            }
                            for (var p, h = e.querySelectorAll("meta"), s = 0; p = h[s++];) g.remove(p);
                            var d = e.querySelectorAll("br");
                            for (s = 0; p = d[s++];) /^apple-/.test(p) && g.remove(p)
                        }
                        if (t.gecko) {
                            var y = e.querySelectorAll("[_moz_dirty]");
                            for (s = 0; p = y[s++];) p.removeAttribute("_moz_dirty")
                        }
                        if (!t.ie)
                            for (var p, b = e.querySelectorAll("span.apple-style-span"), s = 0; p = b[s++];) g.remove(p, !0);
                        r = e.innerHTML, SNB && SNB.Util && "function" == typeof SNB.Util.parseContent && (r = SNB.Util.parseContent(r, !0)), r = n(r, a), r = {
                            html: r
                        }, a.fireEvent("beforepaste", r), a.execCommand("insertHtml", r.html, !0), a.fireEvent("afterpaste")
                    }
                } {
                    var a = this,
                        i = a.paste_options = {},
                        o = (i.word_img_flag = {
                            flag: ""
                        }, a.options.pasteplain === !0);
                    i.modify_num = {
                        flag: ""
                    }
                }
                a.commands.pasteplain = {
                    queryCommandState: function() {
                        return o
                    },
                    execCommand: function() {
                        o = 0 | !o
                    },
                    notNeedUndo: 1
                }, a.addListener("ready", function() {
                    function i() {
                        d.start && g.remove(d.start), d.end && g.remove(d.end);
                        var e, t, n = l.getElementsByTagName("div");
                        if (n.length)
                            for (t = -1; e = n[++t];) "ie_pastebin" == e.className && g.remove(e);
                        s = d.start = d.end = null
                    }
                    g.on(a.body, "cut", function() {
                        var e = a.selection.getRange();
                        !e.collapsed && a.undoManger && a.undoManger.save()
                    });
                    var o;
                    g.on(a.body, t.ie ? "keydown" : "paste", function(n) {
                        if (t.ie) {
                            if (!n.ctrlKey || "86" != n.keyCode) return;
                            o = !0
                        }
                        e.call(a, function(e) {
                            r(e)
                        })
                    });
                    var s, l = a.document,
                        d = {};
                    t.ie && (a.addListener("contentchange", i), a.addListener("keyup", i), a.addListener("mouseup", i), a.addListener("contextmenu", function() {
                        var e, t, n = a.selection.getRange(),
                            r = l.createElement("div"),
                            i = n.cloneContents(),
                            o = "";
                        if (d = n.createBookmark(), l.body.appendChild(r), d.start.style.display = "", r.className = "ie_pastebin", r.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" + g.getXY(d.start).y + "px", i && i.childNodes && i.childNodes.length)
                            for (e = -1, o = ""; t = i.childNodes[++e];) o += t.outerHTML ? t.outerHTML.match(/<span[>]*bookmark/i) ? "" : t.outerHTML : t.textContent || t.innerText || t.nodeValue || "";
                        r.innerHTML = o, n.selectNodeContents(r).select(!0)
                    }), g.on(a.body, "cut", function() {
                        setTimeout(function() {
                            var e = a.selection.getRange();
                            d.start && (e.moveToBookmark(d), e.collapsed || e.deleteContents(), e.select(), i())
                        }, 0)
                    }), g.on(a.body, "copy", function() {
                        setTimeout(function() {
                            var e = a.selection.getRange();
                            d.start && (e.moveToBookmark(d).select(), i())
                        }, 0)
                    }), g.on(a.body, "paste", function() {
                        return o ? void(o = !1) : void(d.start && setTimeout(function() {
                            var e, t, r, i = a.selection.getRange(),
                                o = a.document,
                                s = o.getElementsByTagName("div");
                            if (s.length)
                                for (t = -1; e = s[++t];)
                                    if ("ie_pastebin" == e.className) {
                                        if (!g.isEmptyNode(e)) break;
                                        g.remove(e)
                                    }
                            if (e) {
                                try {
                                    e.parentNode.removeChild(e)
                                } catch (l) {}
                                r = e.innerHTML, SNB && SNB.Util && "function" == typeof SNB.Util.parseContent && (r = SNB.Util.parseContent(r, !0)), r = n(r, a), r = {
                                    html: r
                                }, a.fireEvent("beforepaste", r);
                                try {
                                    i.moveToBookmark(d).select()
                                } catch (l) {}
                                if ("ie_pastebin" == i.startContainer.id) return alert("error");
                                a.execCommand("insertHtml", r.html, !0), a.fireEvent("afterpaste"), a.adjustHeight()
                            }
                        }, 0))
                    }))
                })
            }
        }(), UE.plugins.autoheight = function() {
            var e = this;
            if (e.autoHeightEnabled = e.options.autoHeightEnabled !== !1, e.autoHeightEnabled) {
                var t, n, r, a, i = e.adjustHeight = function() {
                    clearTimeout(a), a = setTimeout(function() {
                        var t = l.ie ? r.scrollHeight : $(r).height(),
                            a = e.options.minFrameHeight || 70;
                        t = t > a ? t : a, n.height(t)
                    }, 50)
                };
                e.addListener("destroy", function() {
                    e.removeListener("contentchange", i), e.removeListener("keyup", i), e.removeListener("mouseup", i)
                }), e.enableAutoHeight = function() {
                    e.autoHeightEnabled && (n = $(e.iframe).parent(), r = e.document.body, e.autoHeightEnabled = !0, t = r.style.overflowY, r.style.overflowY = "hidden", e.addListener("contentchange", i), e.addListener("keyup", i), e.addListener("mouseup", i), setTimeout(function() {
                        i()
                    }, l.gecko ? 100 : 0), e.fireEvent("autoheightchanged", e.autoHeightEnabled))
                }, e.disableAutoHeight = function() {
                    e.body.style.overflowY = t || "", e.removeListener("contentchange", i), e.removeListener("keyup", i), e.removeListener("mouseup", i), e.autoHeightEnabled = !1, e.fireEvent("autoheightchanged", e.autoHeightEnabled)
                }, e.addListener("ready", function() {
                    e.enableAutoHeight();
                    var t;
                    g.on(l.ie ? e.body : e.document, l.webkit ? "dragover" : "drop", function() {
                        clearTimeout(t), t = setTimeout(function() {
                            i()
                        }, 100)
                    });
                    var n = g.getWindow(e.document);
                    g.on(n, "scroll", function() {
                        n.scrollTo(0, 0)
                    })
                })
            }
        }, n.exports = UE
});
