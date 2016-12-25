define("SNB.editor.emotion.js", ["emotion.jade.js"], function(t, e, o) {
    function i(e, o) {
        function i(t) {
            function o() {
                i = !1, t.hide()
            }
            var i;
            t.find(".tooltip-inner").findOrAppend("table", "<table />", function(a, r) {
                if (r) {
                    var s = "",
                        l = "",
                        c = $(".emotion-hover");
                    _.each(SNB.Util.BBCODE_MAPPING.slice(40), function(t, e) {
                        l += '<td><img src="' + SNB.Util.BBCODE_IMAGE_BASEURL + t[0] + '.png" title="' + t[1] + '" width="24" height="24"/></td>', (e + 1) % 9 === 0 && (s += "<tr>" + l + "</tr>", l = "")
                    }), l && (s += "<tr>" + l + "</tr>"), a.html(s), a.on("mouseenter", "img", function(t) {
                        c.text($(t.target).attr("title"))
                    }).on("mouseleave", function() {
                        c.text("")
                    }).on("click", "img", function(e) {
                        e.preventDefault(), t.data("callback")($(e.target).attr("title") || ""), o()
                    }), t.on("click", "a.close", function() {
                        e.preventDefault(), o()
                    }), n.on("mouseleave", function() {
                        setTimeout(function() {
                            i || o()
                        }, 100)
                    }), t.on("mouseenter", function() {
                        i = !0, t.on("mouseleave", o)
                    })
                }
            })
        }
        var n = $(e.target);
        n.parents("#main-editor").length && (n.is("span.emotion") || (n = n.parents("span.emotion")));
        var a = n.offset(),
            r = n.outerHeight();
        $body.findOrAppend(">.emotion-panel", t("./emotion.jade"), function(t, e) {
            e && i(t), t.data("callback", o);
            var n, s = a.left - 18,
                l = a.top + r;
            l + (n = t.height()) - 70 > $win.scrollTop() + $win.height() ? (l = l - n - r, 0 > l && (l = 0), t.removeClass("above").addClass("below")) : t.addClass("above").removeClass("below"), SNB.scroll.isEditorMode() && (s += 4), t.css({
                display: "block",
                top: l,
                left: s,
                "z-index": 9999
            }).show()
        })
    }
    o.exports = function(t, e, o) {
        return o ? i : void e.on(e.parents("#main-editor").length ? "mouseenter" : "click", function(e) {
            i(e, function(e) {
                if (t.editor) t.insert(e);
                else {
                    var o = t.getContent();
                    t.upgrade(function() {
                        t.insert(o + e)
                    })
                }
            })
        })
    }
}), define("emotion.jade.js", function(require, exports, module) {
    function anonymous(locals, attrs, escape, rethrow, merge) {
        attrs = attrs || jade.attrs, escape = escape || jade.escape, rethrow = rethrow || jade.rethrow, merge = merge || jade.merge;
        var buf = [];
        with(locals || {}) {
            buf.push('<div class="tooltip emotion-panel above"><div class="tooltip-arrow above"><div class="tooltip-arrow-in"></div><div class="tooltip-arrow-out"></div></div><div class="tooltip-alpha"></div><div class="tooltip-inner"><div class="operations"><span>插入表情：</span><span class="emotion-hover"></span><!--a.close(href="javascript:;")--></div></div><div class="tooltip-arrow below"><div class="tooltip-arrow-in"></div><div class="tooltip-arrow-out"></div></div></div>')
        }
        return buf.join("")
    }
    module.exports = anonymous
});
