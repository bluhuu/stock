define("lib/upload.js", ["jquery.uploadify"], function(e, t, i) {
    var o = 0;
    e("../jquery.uploadify.js"), i.exports = t = function(e, t) {
        function i() {
            if (n.show(), e.data("swf-ready")) return n.find(".mask").remove(), !1;
            o++, n.empty(), a && a.length && a.remove();
            var t = u.clone().on("change", d).prop("id", "__upload_uid_" + o).appendTo(n);
            return t
        }

        function r(t) {
            var i, o;
            if (t && $.isPlainObject(t)) o = t;
            else if (!t || !(i = t.match(/\{[\s\S]*?(filename|code)[\s\S]*?\}/))) return e.trigger(t ? "upload.fail.unknown" : "upload.fail.timeout"), e.trigger("upload.done"), !1;
            t = i[0];
            try {
                o = $.parseJSON(t), o.code = o.code || o.error_code, o.msg = o.msg || o.error_description, e.trigger(o.code ? "upload.fail.ret" : "upload.success", o)
            } catch (r) {
                e.trigger("upload.fail.unknown")
            } finally {
                e.trigger("upload.done")
            }
        }
        $("form", e).remove();
        var a, n = $('<form method="POST" enctype="multipart/form-data"></form>').appendTo(e),
            u = $('<input name="file" type="file">');
        n.prop("action", t.action), t.accept && u.prop("accept", t.accept);
        var s, l, d = function() {
                var i = _.once(r),
                    o = $(this);
                if (!this.value) return !1;
                var a = new Image;
                a.DYNSRC = this.value;
                var u, s = a.fileSize || this.files[0].fileSize;
                if (s > 1024 * (t.sizeLimit || 5120)) return e.trigger("upload.fail.limit"), e.trigger("upload.done"), !1;
                try {
                    u = new FormData(n[0])
                } catch (l) {}
                var d = this.value.substring(this.value.lastIndexOf(".") + 1).toLowerCase();
                if (-1 == $.inArray(d, t.type)) return e.trigger("upload.fail.type"), e.trigger("upload.done"), !1;
                if (setTimeout(i, t.timeout || 4e4), e.trigger("upload.started", o.val()), u) $.ajax({
                    url: t.action,
                    type: "POST",
                    data: u,
                    cache: !1,
                    contentType: !1,
                    processData: !1,
                    success: function(t) {
                        i(t), e.trigger("upload.done")
                    }
                }), n.hide();
                else {
                    var p = "__upload_uid_" + n.find("input").prop("id"),
                        c = $('<iframe name="' + p + '" src="about:blank" style="display:none;width:0;height:0;"/>').insertAfter(n);
                    n.attr("target", p), c.on("load", function() {
                        try {
                            var t = c.contents().find("body").text();
                            i(t)
                        } catch (o) {
                            e.trigger("upload.fail.unknown")
                        } finally {
                            e.trigger("upload.done")
                        }
                    }), n.hide(), n.submit()
                }
            },
            p = 0,
            c = 0,
            f = 1;
        return t.$progress = t.$progress || $(), e.on("upload.done", function() {
            i();
            try {
                e.uploadify("cancel", "*")
            } catch (o) {}
            try {
                clearTimeout(s)
            } catch (o) {}
            p = 0, t.$progress.length && t.$progress.text("")
        }), $.browser || ($.browser = {}, $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase())), $.browser.msie ? (i().uploadify({
            swf: "//assets.imedao.com/js/uploadify.swf",
            queueSizeLimit: t.queueSizeLimit || 1,
            buttonText: "",
            fileObjName: "file",
            uploader: t.flashAction || t.action,
            width: e.outerWidth(),
            height: e.outerHeight(),
            multi: t.queueSizeLimit && t.queueSizeLimit > 1,
            fileSizeLimit: t.flashSizeLimit || t.sizeLimit || 5120,
            successTimeout: (t.flashTimeout || t.timeout || 4e4) / 1e3,
            fileTypeExts: t.type ? _.map(t.type, function(e) {
                return "*." + e
            }).join("; ") : "*.*",
            overrideEvents: ["onSelectError", "onDialogClose"],
            onDialogClose: function(e) {
                c = e.filesQueued, f = 1
            },
            onQueueComplete: function() {
                c = 0
            },
            onSelectError: function(t, i) {
                i == SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT ? e.trigger("upload.fail.limit") : i == SWFUpload.QUEUE_ERROR.INVALID_FILETYPE ? e.trigger("upload.fail.type") : i == SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED && e.trigger("upload.fail.queue"), e.trigger("upload.done")
            },
            onUploadStart: function(i) {
                e.trigger("upload.started", i.name);
                var o = e.find("object"),
                    a = o.parent();
                a.css("position", "relative"), $('<div class="mask" />').css({
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    background: "transparent",
                    "z-index": 1 + (o.css("z-index") || 0)
                }).appendTo(a), s = setTimeout(function() {
                    r()
                }, t.flashTimeout || t.timeout || 4e4);
                try {
                    clearTimeout(l)
                } catch (n) {}
            },
            onUploadError: function() {
                f++, r("unknown error")
            },
            onUploadProgress: function(i, o, r) {
                var a = o / r * 99 | 0;
                if (++p > 3) {
                    var n = t.$progress.length ? t.$progress : e.parent().find(".progress");
                    n && n.text((c > 1 ? f + "/" + c + " " : "") + a + "%")
                }
            },
            onUploadSuccess: function(e, t) {
                f++, r(t)
            },
            onSWFReady: function() {
                var t = n.parents().filter(".ui-dialog");
                if (e.data("swf-ready", !0), t.length) {
                    n.find("object").css("z-index", 1 + t.css("z-index"));
                    try {
                        clearTimeout(l)
                    } catch (i) {}
                }
            }
        }), l = setTimeout(i, 3e3)) : i(), e
    }
});
