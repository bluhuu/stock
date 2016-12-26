define("SNB.pdfDialog.js", ["pdf-dialog.jade.js", "lib/upload"], function(t, e, a) {
    function o(e) {
        function a(t, e) {
            if (-1 != _.indexOf(["upload", "uploading", "uploaded"], t))
                if (n.removeClass().addClass("upload-box").addClass(t), "upload" == t) {
                    var a = $("span.uploadErrMsg", n);
                    e ? (s.hide(), a.text(e)) : (s.show(), a.text(""))
                } else if ("uploading" == t) {
                var o = $("span.filename", n);
                o.text(e)
            }
        }

        function o() {
            w.prop("disabled", !1), $("input:text, textarea", e).val("").removeClass("error"), m.reset(y, !1), n.data("filename", null), a("upload"), v.text(""), p.importTags(""), l.val(f)
        } {
            var n = $(".upload-box", e),
                s = ($(".filename", n), $(".hint", e));
            $(".uploadErrMsg", e)
        }
        i($("span.upload .button", n), {
            action: SNB.domain.host + "/service/upload_pdf",
            flashAction: "/pdf/upload.json",
            type: ["pdf"],
            accept: "application/pdf",
            sizeLimit: 10240,
            timeout: 6e4,
            $progress: $("span.progress", n)
        }).on("upload.fail.ret", function(t, e) {
            var o = {
                20701: "请上传小于 10M 的文件",
                20704: "只支持 PDF 格式的文档",
                22701: "文档无法在线播放，请换个文件试试",
                20703: "文档上传失败，请重试"
            }[e.code] || "文档无法在线播放，请换个文件试试";
            a("upload", o)
        }).on("upload.fail.unknown", function() {
            a("upload", "文档无法在线播放，请换个文件试试")
        }).on("upload.fail.timeout", function() {
            a("upload", "上传超时，请重新上传或换个文件试试")
        }).on("upload.fail.limit", function() {
            a("upload", "请上传小于 10M 的文件")
        }).on("upload.fail.type", function() {
            a("upload", "只支持 PDF 格式的文档")
        }).on("upload.started", function(t, e) {
            var e = e.split(/\\|\//).pop().split("."),
                o = e.pop();
            e = e.join("."), e.length >= 28 && (e = e.substring(0, 27) + "..."), a("uploading", e + "." + o + " ")
        }).on("upload.success", function(t, e) {
            n.data("filename", e.filename), a("uploaded"), v.text("")
        }), $("a.cancelUpload", e).on("click", function() {
            n.data("filename", null), a("upload")
        });
        var l, d = $(".stock", e),
            p = $("input", d),
            r = 10,
            u = "填写相关性最强的股票，最多不超过" + r + "个",
            c = function(t) {
                setTimeout(function() {
                    t && "keydown" == t.type && t.keyCode != $.ui.keyCode.BACKSPACE || v.text(p.val().split("||").length > r ? u : "")
                })
            },
            f = "相关股票";
        t.async("jquery.tagsinput.js", function() {
            function t() {
                setTimeout(function() {
                    $("span.tag a", d).off("click.refresh").on("click.refresh", c)
                }, 0)
            }
            var e = "#a9a9a9";
            p.tagsInput({
                width: "464px",
                height: "auto",
                delimiter: "||",
                placeholderColor: e,
                defaultText: f,
                autocomplete_url: !0,
                autocomplete: SNB.Util.insertStockAutocompletionOptions
            }), l = $(".tagsinput input", d), l.on("blur", function() {
                var a = $(this);
                a.css("color", e), setTimeout(function() {
                    var e;
                    (e = l.val()) && e != f ? (p.addTag(e, {
                        focus: !0,
                        unique: !0
                    }), setTimeout(function() {
                        t()
                    }, 0)) : a.val(f)
                }, 0)
            }).off("autocompleteselect").on("autocompleteselect", function(e, a) {
                e.preventDefault(), p.addTag("$" + a.item.name + "(" + a.item.value + ")$", {
                    focus: !0,
                    unique: !0
                }), c(), t()
            }).off("keypress.tagsinput").on("keydown", function(e) {
                var a = l.autocomplete("widget");
                a = a && a.data("menu");
                var o;
                if (e.keyCode == $.ui.keyCode.SPACE)
                    if (a.active) e.preventDefault(), a.select();
                    else if ((o = l.val()) && o != f) return p.addTag(o, {
                    focus: !0,
                    unique: !0
                }), t(), !1;
                c(e)
            })
        });
        var v = $("div.errMsg", e);
        $("input:text, textarea", e).trigger("blur").on("keyup", function(t) {
            var e = $(t.target),
                a = e.val();
            a && a != e.attr("placeholder") && (e.removeClass("error"), v.text(""))
        });
        var g, m, h = $(".content", e),
            b = $("textarea", e),
            x = b.attr("placeholder"),
            y = '<span class=placeholder style="color:#a9a9a9">' + x + "</span>";
        m = SNB.editor.init(h, {
            $emotion: $(".showFaceButton", e),
            $stock: $(".addStock", e)
        }), $.browser.isMobile || m.editor || m.upgrade({
            autoheight: !1
        }, function() {
            g = $(".ueditor-wrapper", e), g.height(160), m.reset(y, !1), m.editor.addListener("keyup", $.proxy(g, "removeClass", "error")), $(m.editor.body).on("click focus keydown", function() {
                $(m.editor.body).find("span.placeholder").remove(), v.text("")
            }), $body.on("click", function(t) {
                e.is(":hidden") || ($t = $(t.target), $(".showFaceButton, .addStock", e).index($t) > -1 || "block" == $("#faceTablePanel").css("display") ? $(m.editor.body).find("span.placeholder").remove() : $("<div>" + m.getContent() + "</div>").text() || m.reset(y, !1))
            })
        });
        var k = $(".title input", e),
            S = $("input.org", e),
            C = $("input.author", e),
            w = $("div.submit input.submit", e),
            B = $("div.submit input.button", e);
        e.dialog("option", "close", o);
        var j = $.proxy(e, "dialog", "close");
        B.on("click", j), w.on("click", function() {
            if (!w.prop("disabled")) {
                var t = n.data("filename"),
                    a = SNB.domain.pdf + "/" + t + ".pdf",
                    o = (SNB.domain.upyun + "/" + t + ".png!custom.jpg", k.val()),
                    i = S.val(),
                    s = C.val(),
                    l = p.val();
                $(m.editor.body).find("span.placeholder").remove();
                var d = SNB.Util.cleanContent(m.getContent(), !1, m.editor);
                if (!t) return v.text("请完成 PDF 上传再发布");
                if (o && o != k.attr("placeholder") || k.addClass("error"), i && i != S.attr("placeholder") || (i = ""), i && (i = "报告出处：" + i), s && s != C.attr("placeholder") || (s = ""), s && (s = "报告作者：" + s + "&nbsp; &nbsp; &nbsp;"), l && (l = "<br>相关股票：" + l), d || g.addClass("error"), $("input.error", e).length) return v.text("请填写标题后再发布");
                if (!d) return v.text("请填写研究报告的摘要信息或评论后再发布");
                if (l.split("||").length > r) return v.text(u);
                l = l.replace(/\|\|/g, " "), d = s + i + l + (s || i || l ? "<br><br>" : "") + d, d += "<br>" + a, w.prop("disabled", !0), SNB.post("/statuses/update.json", {
                    title: o,
                    status: d
                }, function(t) {
                    j(), SNB.Util.statusPdf(t), SNB.data.tempStatus.push(t.id), SNB.data.stCollection.add(t), SNB.data.stCollection.trigger("addStatuses", [SNB.data.stCollection.get(t.id)]), SNB.data.stView.refreshTime(), SNB.Util.stateDialog("研究报告发布成功")
                }, function(t) {
                    v.text(400 == t.status ? "您提交的内容过长，请更改后重试。" : "服务器出错，请重试。"), w.prop("disabled", !1)
                })
            }
        })
    }
    var n = t("./pdf-dialog.jade"),
        i = t("./lib/upload");
    e = a.exports = function() {
        $("body").findOrAppend(">.ui-dialog>#dialog-pdf", n, function(t, e) {
            t.dialog({
                title: "发布研究报告",
                modal: !0,
                width: 520
            }), e && o(t)
        })
    }
}), define("pdf-dialog.jade.js", function(require, exports, module) {
    function anonymous(locals, attrs, escape, rethrow, merge) {
        attrs = attrs || jade.attrs, escape = escape || jade.escape, rethrow = rethrow || jade.rethrow, merge = merge || jade.merge;
        var buf = [];
        with(locals || {}) {
            buf.push('<div id="dialog-pdf"><div class="upload-box upload"><span class="uploading">正在上传<span class="filename"></span><span class="progress"></span><i class="loading"></i></span><span class="uploaded">已上传<span class="filename"></span><a href="javascript:;" class="cancelUpload">取消</a></span><span class="upload"><span>上传研究报告</span><span class="button">选择 PDF 文件</span><span class="hint">文件最大不超过10M</span><span class="uploadErrMsg"></span></span></div><div class="title"><input placeholder="研究报告标题，不超过 30 个汉字" maxlength="30" type="text"/></div><div class="author"><input placeholder="研究报告作者，多人请用逗号隔开" type="text" class="author"/><input placeholder="研究报告出处" type="text" class="org"/></div><div class="stock"><input maxlength="30" type="text"/></div><div class="content"><textarea placeholder="请填写研究报告的摘要信息或对该报告的评论"></textarea></div><div class="counttxt"><span title="表情" class="showFaceButton"></span><span title="股票" class="addStock"></span></div><div class="errMsg"></div><div class="submit"><input value="确定" type="submit" class="submit"/><input value="取消" type="button" class="button"/></div></div>')
        }
        return buf.join("")
    }
    module.exports = anonymous
});
