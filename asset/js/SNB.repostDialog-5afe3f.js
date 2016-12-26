define("SNB.repostDialog.js", ["SNB.editor"], function(t, e, a) {
    var i = $("#dialog-repost");
    if (!i.length) {
        var s = '<div id="dialog-repost" class="dialog-wrapper" style="display:none"><textarea></textarea><p class="counttxt"><span class="showFaceButton" title="表情">&nbsp;</span><span class="addStock" title="股票">&nbsp</span><span class="wordsRemain"></span></p><p style="text-align:center"><input type="submit" class="submit" value="确定"/><input type="button" class="cancel button" value="取消"/></p></div>';
        i = $(s).appendTo("body>.temp:first")
    }
    i.find(".cancel").click(function() {
        i.dialog("close")
    });
    var o, r, n = SNB.Util.MAX_STATUS_WORDS,
        d = i.find(".wordsRemain"),
        l = function(t) {
            var e = SNB.Util.cleanContent(S.getContent(), !1, S.editor);
            return t && (e = e.replace(/&nbsp;/gi, " ")), e = e.replace(/<br>/gi, "\n")
        },
        u = function() {
            return SNB.Util.getWordsCount(l(!0))
        },
        c = function() {
            var t = (i.data("ta"), u());
            $(".ueditor-wrapper, textarea", i).removeClass("error"), t > n ? d.html("已超出<em>" + (t - n) + "</em>字").css("color", "#C30801") : d.html("还能输入<em>" + (n - t) + "</em>字").css("color", "")
        },
        p = i.find("textarea"),
        f = function() {
            var t = l(),
                e = i.data("statusId"),
                a = u();
            if (t != o || e != r) {
                if (o = t, r = e, a > SNB.Util.MAX_STATUS_WORDS) return S.$uew.addClass("error"), !1;
                i.dialog("close");
                var s = SNB.Util.isContentSame(t, i.data("default")) ? 0 : 1,
                    n = i.data("callback"),
                    d = {
                        id: e,
                        status: t,
                        forward: s
                    };
                "undefined" != typeof SNB.data.status_module_id && (d.module_id = SNB.data.status_module_id), SNB.post("/statuses/repost.json", d, function(t) {
                    n && n(t)
                }, function(t) {
                    t.error_code && SNB.Util.failDialog(t.error_description)
                })
            }
        };
    i.find(".submit").click(f);
    var m = t("SNB.editor.js"),
        S = m.init(i, {
            $emotion: $(".showFaceButton", i),
            $stock: $(".addStock", i),
            ctrlReturn: !0,
            submitFunc: f,
            insertFunc: function() {
                c()
            }
        }),
        v = $.Deferred(),
        g = v.promise();
    p.focus(c), p.bind("keyup", c), i.hide(), e = a.exports = function(t, e, a) {
        {
            var s = !!t.retweet_status_id && t.retweeted_status,
                o = s ? t.retweeted_status : t;
            o.user
        }
        i.data("statusId", t.id), i.data("callback", e), i.dialog({
            modal: "true",
            width: "520px",
            title: "转发到我的首页"
        }), $.browser.isMobile ? v.resolve(S) : S.editor || S.upgrade({
            autoheight: !1
        }, function() {
            $(".ueditor-wrapper", i).height(100), S.editor.addListener("keyup", c), v.resolve(S)
        });
        var r = a || "";
        s && (r = " //@" + t.user.screen_name + ": " + $("<div>" + SNB.Util.reparseContent(t.text) + "</div>").text()), i.data("default", r), g.done(function(t) {
            t.reset(r, !0, !0), c()
        }), SNB.Util.dialog_vertical_middle(i.closest(".ui-dialog"))
    }
});
