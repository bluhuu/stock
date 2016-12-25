define("SNB.atDialog.js", ["at-dialog.jade.js", "SNB.editor"], function(t) {
    var e, a, s = t("./at-dialog.jade"),
        i = t("SNB.editor.js"),
        o = $.Deferred(),
        r = o.promise(),
        d = function(t) {
            function e() {
                if (!n.hasClass("disabled")) {
                    var e = SNB.Util.cleanContent(r.getContent(), !1, r.editor);
                    if (!e) return r.$textarea.addClass("error"), d.text("请输入内容。"), !1;
                    n.addClass("disabled"), SNB.Util.updateStatus({
                        status: e
                    }, function() {
                        n.removeClass("disabled"), t.dialog("close")
                    }, function() {
                        n.removeClass("disabled")
                    })
                }
            }
            var s = $(".tipsdivcontent", t),
                r = s.data("ta"),
                d = $(".errMsg", t),
                n = $(".submitAtHeButton", t);
            if (t.dialog({
                    title: "有什么话对" + a + "说：",
                    modal: !0,
                    width: 520
                }), !r) {
                r = i.init(s, {
                    $emotion: $(".showFaceButton", t),
                    $stock: $(".addStock", t),
                    ctrlReturn: !0,
                    submitFunc: e
                });
                var l = function() {
                    d.text(""), r.$textarea.removeClass("error")
                };
                r.$textarea.focus(l), $(".cancelAtHeButton", t).click(function() {
                    t.dialog("close")
                }), $.browser.isMobile ? o.resolve(r) : r.editor || r.upgrade({
                    autoheight: !1
                }, function() {
                    $(".ueditor-wrapper", t).height(100), r.editor.addListener("keyup", l), o.resolve(r)
                }), n.click(e)
            }
            d.text(""), n.removeClass("disabled")
        };
    $(function() {
        $("body").on("click", '[data-toggle="at"]', function(t) {
            t.preventDefault();
            var i = this;
            a = $(this).data("target") || $(this).attr("data-target"), e = $(this).attr("data-defaulttext") || "对@" + a + " 说：", "tablet" !== SNB.data.app_type ? SNB.Util.checkLogin(function() {
                $("body").findOrAppend(">.ui-dialog>#dialog-at-he", s, function(t) {
                    d(t), $(i).data("isShare") && t.dialog({
                        title: "分享到雪球"
                    }).data("isShare", $(i).data("isShare")), r.done(function(t) {
                        t.reset(e, !0)
                    })
                })
            }, t) : SNB.Util.callBrick({
                atUser: {
                    name: a,
                    atUserContent: e
                }
            })
        })
    })
}), define("at-dialog.jade.js", function(require, exports, module) {
    function anonymous(locals, attrs, escape, rethrow, merge) {
        attrs = attrs || jade.attrs, escape = escape || jade.escape, rethrow = rethrow || jade.rethrow, merge = merge || jade.merge;
        var buf = [];
        with(locals || {}) {
            buf.push('<div id="dialog-at-he" class="dialog-wrapper"><div class="tipsdivcontent"><textarea id="atHeStatusTextBox" class="tips_textarea"></textarea></div><p class="counttxt"><span title="表情" class="showFaceButton"></span><span title="股票" class="addStock"></span><span class="wordsRemain"></span></p><div style="text-align:center;width:100%"><span style="color: red" class="errMsg"></span><input type="button" value="发布" class="submit submitAtHeButton disabled"/></div></div>')
        }
        return buf.join("")
    }
    module.exports = anonymous
});
