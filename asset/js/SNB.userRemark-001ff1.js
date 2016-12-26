define("SNB.userRemark.js", [], function() {
    "undefined" == typeof SNB.Remark && (SNB.Remark = {}), SNB.Remark.Validate = function(e) {
            return SNB.Util.getWordsCount(e) > 8 ? !1 : !0
        }, SNB.Remark.Request = function(e, a, t, r) {
            a && a(), SNB.post("/remarks/setting.json", e, function() {
                t && t()
            }, function(e) {
                r && r(e)
            })
        }, SNB.Remark.Action = function(e, a, t, r) {
            return SNB.Remark.Validate(e.remark) ? void SNB.Remark.Request(e, a, t, r) : void SNB.Util.failDialog("备注最多不超过8个汉字")
        },
        function() {
            $("body").on("click", "a.setRemark,a.user_remark", function(e) {
                e.preventDefault();
                var a = $(this),
                    t = !1,
                    r = $(this).attr("data-user-name"),
                    i = $(this).attr("data-user-id"),
                    s = $(this).attr("data-user-remark"),
                    n = s ? "modify" : "create",
                    l = $("#remarkDialog"),
                    o = "<div id='remarkDialog'><div class='bd vertical-margin-30' style=''><label for='remark' class=''>备注：</label><input type='text' id='remark' placeholder='长度8个汉字以内' class='dialog_form_text'/></div><div style='text-align:center'>" + '<input type="submit" class="submit" value="确定"><input type="button" class="cancel button" value="取消"></div></div>';
                $("#remarkDialog").length ? (l.replaceWith(o), l = $(o)) : l = $(o).appendTo($("body")), l.dialog({
                    width: 300,
                    title: "设置备注"
                }), s && l.find("input#remark").val(s), l.find(".submit").click(function() {
                    var e = l.find("#remark"),
                        s = $.trim(e.val());
                    return s || "create" !== n ? void SNB.Remark.Action({
                        user_id: i,
                        remark: s
                    }, function() {
                        t || (t = !0)
                    }, function() {
                        s ? (SNB.Util.stateDialog("modify" === n ? "修改备注成功！" : "设置备注成功！"), a.hasClass("setRemark") && a.removeClass("setRemark").addClass("user_remark"), a.attr("data-user-remark", s), a.text("(" + s + ")")) : "modify" === n && (SNB.Util.stateDialog("取消备注成功！"), a.removeClass("user_remark").addClass("setRemark"), a.attr("data-user-remark", ""), a.text("(备注)")), SNB.data.profiles[r] && (SNB.data.profiles[r].remark = s), $("span.user_remark[data-name='" + r + "'],a.user_remark[data-user-name='" + r + "']").each(function() {
                            var e = this;
                            s ? $(e).text("(" + s + ")").show() : $(e).hide()
                        }), l.dialog("close"), t = !1
                    }, function(e) {
                        t = !1, SNB.Util.failDialog(e && e.error_description)
                    }) : l.dialog("close")
                }), l.find(".cancel").click(function() {
                    l.dialog("close")
                })
            })
        }()
});
