define("SNB.downloadDialog.js", ["download-dialog.jade.js", "SNB.editor"], function(e) {
    var t, a, n, o, d = e("./download-dialog.jade"),
        i = e("SNB.editor.js"),
        r = $.Deferred(),
        s = r.promise(),
        l = function(e) {
            function o() {
                var e = SNB.Util.cleanContent(s.getContent(), !1, s.editor),
                    a = SNB.Util.isContentSame(e, n) ? 0 : 1;
                t && SNB.post("/statuses/repost.json", {
                    id: t,
                    status: e,
                    forward: a
                })
            } {
                var d = $(".tipsdivcontent", e),
                    s = d.data("ta");
                $(".errMsg", e), $(".downloadRepost", e)
            }
            e.dialog({
                title: "下载研报",
                modal: !0,
                width: 520
            }), s || (s = i.init(d, {
                ctrlReturn: !0,
                submitFunc: o
            }), $.browser.isMobile ? r.resolve(s) : s.editor || s.upgrade({
                autoheight: !1
            }, function() {
                $(".ueditor-wrapper", e).height(70), r.resolve(s)
            }), $(".downloadOnly, .downloadRepost", e).click(function() {
                $(this).hasClass("downloadRepost") && o(), window.open(a), e.dialog("close")
            }))
        };
    $(function() {
        $("body").on("click", '[data-toggle="download"]', function(e) {
            var i = $(this);
            a = i.attr("href"), o = i.data("screen-name");
            var r = i.data("profile");
            if (!o) {
                var u = i.parents(".retweet,.detail").children("a[data-name]");
                if (u.length || (u = i.parents(".expandable").find(">p>a[data-name]")), !u.length) return !0;
                o = u.data("name"), r = u.attr("href")
            }
            if (t = i.data("status-id"), !t) {
                var p = i.parents(".retweet").find(">.meta>a");
                p.length || (p = i.parents(".detail").siblings(".meta").find(">a").eq(0)), p.length || (p = i.parents(".retweet.expandable").find(">.meta>a")), p.length || (p = i.parents(".status.expandable").siblings(".meta").find(">.infos>a").eq(0)), t = p.length ? p.attr("href").match(/\d+$/) : void 0, t && (t = t[0])
            }
            if (r.match(/\/S\//i)) n = "我刚下载了 $" + o + "$ 的雪球投资研报，推荐给你。";
            else {
                var c = $.trim(u.parents(".retweet,.detail,.expandable").find(">h4,>h3").text());
                c && (c = "《" + c + "》"), n = "我刚下载了 @" + o + " 分享的研报" + c + "，推荐给你。"
            }
            e.preventDefault(), SNB.Util.checkLogin(function() {
                $("body").findOrAppend(">.ui-dialog>#dialog-download", d, function(e) {
                    l(e), s.done(function(e) {
                        e.reset(n, !0)
                    })
                })
            }, e)
        })
    })
}), define("download-dialog.jade.js", function(require, exports, module) {
    function anonymous(locals, attrs, escape, rethrow, merge) {
        attrs = attrs || jade.attrs, escape = escape || jade.escape, rethrow = rethrow || jade.rethrow, merge = merge || jade.merge;
        var buf = [];
        with(locals || {}) {
            buf.push('<div id="dialog-download" class="dialog-wrapper"><div class="tipsdivcontent"><textarea id="atHeStatusTextBox" class="tips_textarea"></textarea></div><div style="text-align:right;width:100%"><input type="button" value="下载" class="button downloadOnly"/><input type="button" value="下载并转发" class="submit downloadRepost"/></div></div>')
        }
        return buf.join("")
    }
    module.exports = anonymous
});
