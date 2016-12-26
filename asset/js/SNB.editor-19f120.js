define("SNB.editor.js", ["lib/store", "SNB.editor.emotion", "lib/autoresize", "lib/upload", "SNB.pdfDialog", "lib/ueditor", "editor_inline.css.js", "editor.jade.js", "editor-footer.jade.js"], function(e, t) {
    function o(e) {
        N.off("resize.fullEditor").on("resize.fullEditor", function() {
            e.setMinFrameHeight()
        })
    }

    function n(e, t) {
        var o = N.scrollLeft(),
            n = N.scrollTop(),
            i = t.find(">iframe").offset(),
            a = e.getCursorPosition(),
            r = {
                start: {},
                end: {}
            };
        return r.start.x = "number" == typeof a.start.x ? a.start.x + i.left - o : void 0, r.start.y = "number" == typeof a.start.y ? a.start.y + i.top - n : void 0, r.end.x = "number" == typeof a.end.x ? a.end.x + i.left - o : void 0, r.end.y = "number" == typeof a.end.y ? a.end.y + i.top - n : void 0, r
    }

    function i(e) {
        function t() {
            var e = i().range;
            e.deleteContents().insertNode(e.document.createTextNode(s.find(".selected").text())).collapse(), o(e), u.hide()
        }

        function o(e) {
            var t, o, n, i = e.cloneRange(),
                a = $.browser.msie ? " " : " ";
            for (t = e.endOffset; o = e.endContainer.childNodes[t++];) {
                if (1 === o.nodeType) {
                    if (o.tagName.match(/span/i) && o.id.match(/^_baidu_bookmark_/)) continue;
                    if (C.isEmptyNode(o)) continue;
                    if (o.tagName.match(/span|strong|b/i)) {
                        i.selectNode(o).shrinkBoundary(!0), o = i.startContainer.childNodes[0];
                        break
                    }
                    break
                }
                if (3 !== o.nodeType || o.nodeValue.length) break
            }
            n = o && 3 === o.nodeType && o.nodeValue.charCodeAt(0), 32 === n || 160 === n ? e.setStart(o, 1).collapse(!0) : e.insertNode(e.document.createTextNode(a)).collapse(), e.select(!0)
        }

        function n(e, t) {
            var o;
            return e in j && j[e] instanceof Array ? t(j[e]) : (o = b.get("at:" + e)) && (new Date).valueOf() - o.updatedAt < 6e5 ? (j[e] = o.names, t(o.names)) : void SNB.get("/users/autocomplete.json", {
                q: e,
                count: 8
            }, function(o) {
                j[e] = o.names, o.names && o.names instanceof Array && b.set("at:" + e, {
                    updatedAt: (new Date).valueOf(),
                    names: o.names
                }), t(j[e])
            })
        }

        function i() {
            {
                var t, o, n = u.is(":visible"),
                    i = e.editor.selection.getRange(),
                    a = i.startContainer,
                    r = i.startOffset;
                $(a.parentNode)
            }
            if (3 != a.nodeType) {
                if (1 != a.nodeType || 1 != i.endContainer.nodeType || !r || r != i.endOffset || 3 != a.childNodes[r - 1].nodeType) return n && u.hide();
                var s = a.childNodes[r - 1];
                i.setStart(s, s.nodeValue.length).collapse(!0), a = i.startContainer, r = i.startOffset
            }
            var d = i.getCommonAncestor();
            if (3 != d.nodeType && d != a.parentNode) return n && u.hide();
            var t = $(i.cloneContents()).text() || "";
            if (t && t.match(/[^a-zA-Z0-9_\-\u4e00-\u9fa5\u200B]/)) return n && u.hide();
            var o, l, c, p, f;
            if (o = C.getNodeIndex(a), l = a.nodeValue.substring(0, r), p = l.lastIndexOf("@"), f = l.match(/[^@a-zA-Z0-9_\-\u4e00-\u9fa5\u200B][a-zA-Z0-9_\-\u4e00-\u9fa5\u200B]*$/), f && p < f.index) return n && u.hide();
            if (p >= 0) i.setStart(a, p + 1), l = l.substring(p + 1);
            else {
                for (; --o >= 0 && l.length <= 30;) {
                    if (c = a.parentNode.childNodes[o], 3 != c.nodeType) {
                        if (4 == c.nodeType) continue;
                        break
                    }
                    if (l = c.nodeValue + l, p = l.lastIndexOf("@"), f = l.match(/[^@a-zA-Z0-9_\-\u4e00-\u9fa5\u200B][a-zA-Z0-9_\-\u4e00-\u9fa5\u200B]*$/), f && p < f.index + 1) return n && u.hide();
                    if (p >= 0) {
                        i.setStart(c, p + 1), l = l.substring(p + 1);
                        break
                    }
                }
                if (0 > p) return n && u.hide()
            }
            return l = l || "", t = (l + t).replace(/\u200B/g, ""), t.length > 30 ? n && u.hide() : {
                success: !0,
                range: i,
                text: t,
                start: l.length,
                end: t.length
            }
        }

        function a() {
            if (c) return c = !1;
            var e = i();
            if (e.success) {
                var o = e.range,
                    a = e.text,
                    p = e.start,
                    f = e.end;
                o.deleteContents();
                var m = o.document.createElement("span"),
                    h = d.offset();
                if (m.style.cssText = "width:0px;overflow:hidden;margin:0;padding:0;border:0;", m.appendChild(o.document.createTextNode(a ? a : "​")), o.insertNode(m), pos = C.getXY(m), pos.x += h.left - 10, pos.y -= d.find("iframe").contents().scrollTop(), $.browser.msie ? pos.y += h.top + (l ? 23 : T() ? 22 : 30) : (pos.y += h.top + (l ? 19 : T() ? 21 : 27), $.browser.mozilla && (pos.y += 2)), o.deleteContents(), a) {
                    var g = o.document.createTextNode(a);
                    o.insertNode(g).setStart(g, p).setEnd(g, f).select(!0)
                }
                r.text(a ? "选择想@的人或敲空格完成输入" : "输入昵称或选择经常@的人"), s.empty().append('<li class="loading" style="width:136px;height:45px;background-color:#fff;cursor:default;"></li>'), u.css({
                    left: pos.x,
                    top: u.hasClass("arrow-down") ? pos.y - u.height() - 40 : pos.y,
                    opacity: 1
                }).show().data("atSelect", t);
                var v, b;
                (v = $(".ui-dialog:visible", B)).length && (b = v.css("z-index")) && (b = parseInt(b, 10)) && u.css("z-index", b + 10), n(a, function(e) {
                    e.length || (e = [a]);
                    var t = "",
                        o = -1;
                    _.each(e, function(e) {
                        t += "<li" + (++o ? "" : ' class="selected"') + ">" + e + "</li>"
                    }), s.empty().html(t), u.show();
                    var n = u.height(),
                        i = pos.y + n,
                        r = N.height(),
                        d = N.scrollTop(),
                        l = r + d;
                    i > l && !T() ? $("html,body").animate({
                        scrollTop: Math.min(i - r + 10, pos.y - 72)
                    }, 200) : i > l && pos.y - n - 20 > d ? u.css({
                        top: pos.y - n - 40
                    }).removeClass("arrow-up").addClass("arrow-down") : u.css({
                        top: pos.y
                    }).removeClass("arrow-down").addClass("arrow-up")
                })
            }
        }
        if (!e || e.atSelectionchange) return !1;
        e.atSelectionchange = !0;
        var r, s, d = e.$uew,
            l = e.$textarea && e.$textarea.parent().is(".inputArea"),
            u = B.find("#editor-at-suggestion");
        u.length || (u = $('<div id="editor-at-suggestion" class="dropdown-menu arrow-up"><div class="hint">请输入</div><ul></ul></div>').hide().appendTo(B).on("click", "li", function(e) {
            $(e.target).siblings().removeClass("selected").end().addClass("selected"), u.data("atSelect")()
        }).on("mouseover", "li", function(e) {
            $(e.target).siblings().removeClass("selected").end().addClass("selected")
        }), $doc.on("click", function() {
            u.hide()
        })), s = u.find(">ul"), r = u.find(">.hint");
        var c;
        return e.editor.addListener("selectionchange", a), e.editor.addListener("keydown", function(o, n) {
                var i, a, r, s, d, l = n.keyCode || n.which;
                if (27 == l) u.is(":visible") && (c = !0, u.hide());
                else if (229 == l) u.is(":visible") && (c = !0);
                else if (38 == l) u.is(":visible") ? (c = !0, n.preventDefault ? n.preventDefault() : n.returnValue = !1, s = $(".selected", u).prev(), s.length ? ($("li", u).removeClass("selected"), s.addClass("selected")) : $("li", u).removeClass("selected").eq(-1).addClass("selected")) : m(e);
                else if (40 == l) u.is(":visible") && (c = !0, n.preventDefault ? n.preventDefault() : n.returnValue = !1, d = $(".selected", u).next(), d.length ? ($("li", u).removeClass("selected"), d.addClass("selected")) : $("li", u).removeClass("selected").eq(0).addClass("selected"));
                else if (13 == l) {
                    if (n.preventDefault ? n.preventDefault() : n.returnValue = !1, n.ctrlKey) return;
                    if (i = e.editor.selection.getRange(), u.is(":visible")) t();
                    else if (i.collapsed) {
                        r = i.document.createElement("br"), i.insertNode(r);
                        var p = r.parentNode;
                        p.lastChild === r ? (r.parentNode.insertBefore(r.cloneNode(!0), r), i.setStartBefore(r)) : i.setStartAfter(r), i.setCursor()
                    } else if (i.deleteContents(), a = i.startContainer, 1 == a.nodeType && (a = a.childNodes[i.startOffset])) {
                        for (; 1 == a.nodeType;) {
                            if (x.dom.dtd.$empty[a.tagName]) return i.setStartBefore(a).setCursor(), !1;
                            if (!a.firstChild) return r = i.document.createElement("br"), a.appendChild(r), i.setStart(a, 0).setCursor(), !1;
                            a = a.firstChild
                        }
                        a === i.startContainer.childNodes[i.startOffset] ? (r = i.document.createElement("br"), i.insertNode(r).setCursor()) : i.setStart(a, 0).setCursor()
                    } else r = i.document.createElement("br"), i.insertNode(r).setStartAfter(r).setCursor()
                }
            }),
            function(t, o) {
                var n = o.keyCode || o.which;
                (n >= 49 && 57 >= n || 32 == n || 13 == n) && a(), 13 == n && setTimeout(function() {
                    e.editor.selection.getRange().scrollToView(e.editor.autoHeightEnabled, e.editor.autoHeightEnabled ? C.getXY(e.editor.iframe).y : 0)
                }, 50)
            }
    }

    function a(e) {
        return function(t) {
            var o, i, a, s, d, l = e.editor ? e.$uew : e.$textarea,
                u = $("body.editor-mode>.editor, body.main-editor-mode #main-editor>.editor"),
                c = u.length && $(".editor-toolbar", u),
                p = (c && u.parent().data("editor"), t.type);
            if ("keyup" === p) {
                if (52 !== t.keyCode) return;
                if (e.editor) {
                    if (s = e.editor.selection.getRange(), index = s.startOffset, !s.collapsed) return;
                    if (!index) return;
                    if (3 !== s.startContainer.nodeType) return;
                    d = $.text(s.startContainer)
                } else d = e.textarea.value, index = e.getSelectionStart();
                if (!d || !d.match(/\$$/)) return
            }
            if (c && "keyup" === p ? (i = n(s, e.$uew, !0).start, a = e.$uew.find(">iframe").offset().left - N.scrollLeft(), o = [i.x + 10, i.y - 46]) : o = c ? [window.innerWidth / 2 - 120, c.hasClass("fixed") ? 0 : c.offset().top - N.scrollTop()] : [l.offset().left - N.scrollLeft(), l.offset().top - N.scrollTop() + l.height()], e.editor) {
                var f = e.editor.iframe.contentDocument.firstElementChild.innerText;
                if (r(f).length >= 3) return void SNB.Util.failDialog("帖子插入股票太多（限制3只）", 300, null, 2e3)
            } else e.upgrade();
            SNB.Util.insertStock(o, function(t) {
                e.insert(("keyup" === p ? "" : "$") + t.name + "(" + t.value + ")$ "), e.$textarea && e.$textarea.hasClass("not-init") && (e.$textarea.trigger("mouseup"), e.$textarea.removeClass("not-init"))
            })
        }
    }

    function r(e) {
        e = e || "";
        var t = e.match(/\$[^\$]+\$/g) || [],
            o = [];
        return $.each(t, function(e, t) {
            t = t || "";
            var n = t.match(/\((.*)\)/);
            $.isArray(n) && n[1] && o.push(n[1])
        }), o
    }

    function s(e, t, o) {
        var n = "",
            i = "";
        t.width && (t.width > 480 ? (i = ' width="480" ', t.height && (n = ' height="' + Math.round(480 * t.height / t.width) + '" ')) : (i = ' width="' + t.width + '" ', t.height && (n = ' height="' + t.height + '" ')));
        var a = t.url ? t.url + "/" + t.filename + "!custom.jpg" : SNB.domain.upyun + "/" + t.filename + "!custom.jpg",
            r = '<p>​<img class="ke_img" src="' + a + '" ' + i + n + E + "/></p>";
        setTimeout(function() {
            e.execCommand("insertHtml", r), e.autoHeightEnabled && setTimeout(function() {
                e.adjustHeight()
            }, 100)
        }, 0), o && o()
    }

    function d(e, t) {
        var o = k(t, {
            action: "/service/upload_photo",
            type: ["gif", "png", "jpg", "jpeg"],
            accept: "image/*",
            sizeLimit: 5120,
            flashSizeLimit: 5120,
            timeout: 3e4,
            flashTimeout: 6e4,
            queueSizeLimit: 10
        });
        o.on("upload.fail upload.done upload.success", function() {
            e.uploadStatusClear()
        }), o.on("upload.fail.ret upload.fail.unknown", function() {
            SNB.Util.failDialog("上传失败，请重试或换张图片试试", 300, null, 2e3)
        }), o.on("upload.fail.timeout", function() {
            SNB.Util.failDialog("上传超时，请确保图片小于5M", 300, null, 2e3)
        }), o.on("upload.fail.queue", function() {
            SNB.Util.failDialog("一次至多可以选取上传10张图片", 300, null, 2e3)
        }), o.on("upload.fail.limit", function() {
            SNB.Util.failDialog("请上传小于5M的图片", 240)
        }), o.on("upload.fail.type", function() {
            SNB.Util.failDialog("只支持PNG，JPG，GIF格式图片", 240)
        }), o.on("upload.success", function(t, o) {
            e.insertImage(o)
        }), o.on("upload.started", function() {
            e.uploadStatusUploading()
        })
    }

    function l(e) {
        if ("number" == typeof e.selectionStart) return e.selectionStart;
        if (document.selection) {
            var t = document.selection.createRange();
            if (!t) return 0;
            var o = e.createTextRange(),
                n = o.duplicate();
            return o.moveToBookmark(t.getBookmark()), n.setEndPoint("EndToStart", o), n.text.length
        }
        return 0
    }

    function u(e) {
        if (e.selectionEnd) return e.selectionEnd;
        if (document.selection) {
            var t = document.selection.createRange();
            if (!t) return 0;
            var o = e.createTextRange(),
                n = o.duplicate();
            return o.moveToBookmark(t.getBookmark()), n.setEndPoint("EndToEnd", o), n.text.length
        }
        return 0
    }

    function c(e, t, o) {
        if (e.setSelectionRange) e.setSelectionRange(t, t + o);
        else if (document.selection) {
            var n = e.createTextRange();
            n.collapse(!0), n.moveStart("character", t), n.moveEnd("character", o), n.select()
        } else e.selectionStart = t, e.selectionEnd = t + o
    }

    function p(e, t) {
        if (!(this instanceof p)) return new p(e, t);
        if ("string" == typeof e) return new p($(e), t);
        if (e.data("ta")) return e.data("ta");
        var o = this;
        e = e.eq(0), o.$textarea = e, o.textarea = e[0], e.data("ta", o), $.browser.msie && e.on("keyup keydown mouseup", function() {
            try {
                $(this).data("start", o.getSelectionStart()).data("end", o.getSelectionEnd())
            } catch (e) {}
        }), e.on("paste", function() {
            setTimeout(function() {
                var e = o.textarea.value;
                (~e.indexOf("") || ~e.indexOf("")) && (o.setBookmark200B(), o.textarea.value = o.textarea.value.replace(/\uF0A7|\uF020/g, ""), o.setSelection200B())
            }, 0)
        }), t = o.options = {
            $emotion: t && t.$emotion,
            $stock: t && t.$stock,
            $upload: t && t.$upload,
            $pdf: t && t.$pdf,
            ctrlReturn: t && t.ctrlReturn || !1,
            submitFunc: t && t.submitFunc || function() {},
            insertFunc: t && t.insertFunc || function() {},
            autoResize: t && t.autoResize || !1,
            content: t && t.content || ""
        }, t.ctrlReturn && function() {
            o.$textarea.keydown(function(e) {
                return e.ctrlKey && 13 === e.keyCode ? (t.submitFunc(), !1) : void 0
            })
        }(), t.$emotion && t.$emotion.length && v(o, t.$emotion), t.$stock && t.$stock.length && (o.stockKeyup = a(o), o.$textarea.bind("keyup", o.stockKeyup), t.$stock.on("click", o.stockKeyup)), t.$upload && t.$upload.length && d(o, t.$upload), t.$pdf && t.$pdf.on("click", w), o.$textarea.val(t.content), t.focus && o.$textarea.focus(), t.autoResize && (o.$textarea.css("min-height", t.autoResize), y(o.$textarea))
    }

    function f(e, t) {
        var o = $(e.document),
            n = $.Deferred();
        return $.ajax({
            url: "/service/pasted_images",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(t),
            dataType: "json",
            timeout: 7e4,
            complete: function(t) {
                if (200 != t.status) return n.resolve(2);
                var i, a, r;
                try {
                    r = $.parseJSON(t.responseText)
                } catch (s) {}
                if (!r || !$.isPlainObject(r)) return n.resolve(2);
                var d, l;
                $.browser.msie && (d = e.selection.getRange(), l = d.createBookmark()), _.each(r, function(e, t) {
                    var n, r, s = o.find("#" + t);
                    e && e.filename && -1 != e.code ? (n = parseInt(e.width, 10), r = parseInt(e.height, 10), 80 > n && 80 > r ? (s.remove(), e.same && _.each(e.same, function(e) {
                        o.find("#" + e).remove()
                    })) : (s.attr({
                        src: e.src,
                        "class": "ke_img"
                    }).removeAttr("width").removeAttr("height").removeAttr("id"), e.same && _.each(e.same, function(t) {
                        var n = o.find("#" + t);
                        n.attr({
                            src: e.src,
                            "class": "ke_img"
                        }).removeAttr("width").removeAttr("height").removeAttr("id")
                    }), a = !0)) : (s.remove(), i = !0)
                }), $.browser.msie && d.moveToBookmark(l), n.resolve(i ? a ? 1 : 2 : 0)
            },
            error: function() {
                _.map(t, function(e) {
                    o.find("#" + e.id).remove(), e.same && _.each(e.same, function(e) {
                        o.find("#" + e).remove()
                    })
                }), n.resolve(2)
            }
        }), n.promise()
    }

    function m(e) {
        return e.editor.autoHeightEnabled ? void setTimeout(function() {
            var t = e.editor.selection.getRange(),
                o = t.collapsed ? t.getCursorPosition().start.y : 0,
                n = o && N.scrollTop(),
                i = o && N.height(),
                a = e.$uew.parent().is(".inputArea") ? 50 : T() ? 40 : 44,
                r = e.$uew.offset().top;
            o && a > o + r - n ? N.scrollTop(o + r - a) : T() && o && o + 80 - n > i - 100 && N.scrollTop(o - i + 181)
        }, 50) : setTimeout(function() {
            e.editor.selection.getRange().scrollToView(!1, 0)
        }, 50)
    }

    function h() {
        if (B.is("#my-home")) {
            var e = $("#main-editor").data("ta");
            if (e && e.hasContent()) {
                var t = e.$uew.closest(".editor").find("input.title"),
                    o = t.length && t.val();
                if (e.editor) {
                    var n = e.ctbk();
                    g.set("editor", {
                        editor: !0,
                        content: n.content,
                        bk: n.bk,
                        title: o || ""
                    })
                } else e.setBookmark200B(), g.set("editor", {
                    content: e.textarea.value,
                    title: o || ""
                })
            } else g.remove("editor")
        } else if (B.hasClass("editor-mode") && M()) return "关闭窗口将放弃当前修改，你确定吗？"
    }
    var g = t.store = e("./lib/store"),
        v = e("./SNB.editor.emotion"),
        b = function() {
            var e = function() {
                var e = "modernizr";
                try {
                    return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0
                } catch (t) {
                    return !1
                }
            }();
            return e ? {
                set: function(e, t) {
                    sessionStorage.setItem(e, JSON.stringify(t))
                },
                get: function(e) {
                    var t = sessionStorage.getItem(e);
                    return "string" != typeof t ? void 0 : JSON.parse(t)
                }
            } : {
                set: $.noop,
                get: $.noop
            }
        }(),
        y = t.autoresize = e("./lib/autoresize"),
        k = t.upload = e("./lib/upload"),
        w = e("./SNB.pdfDialog"),
        x = window.UE = e("./lib/ueditor"),
        C = x.dom.domUtils,
        S = p.prototype,
        N = $(window),
        B = $("body"),
        T = function() {
            return SNB.scroll.isEditorMode()
        };
    window.SNB && (SNB.editor = t, SNB.store = g);
    var j = {},
        E = ' unselectable="on" contenteditable="false" ';
    $.browser.webkit ? E = "" : $.browser.mozilla ? E = 'contenteditable="false"' : $.browser.msie && (E = parseInt($.browser.version, 10) < 9 ? "" : 'unselectable="on"'), S.uploadStatusUploading = function(e) {
        var t = this.$root;
        t && t.length || (t = this.$uew.closest(".editor"));
        var o = t.find(".editor-toolbar .upload"),
            n = t.find(".editor-footer .upload_status");
        n.html(e || '图片正在上传中，请稍候... <span class="progress"></span>'), o.addClass("uploading"), n.html((e || '上传中 <span class="progress"></span> ') + '<img src="' + SNB.domain["static"] + '/images/loading_020.gif" title=""/>')
    }, S.uploadStatusClear = function() {
        var e = this.$root;
        e && e.length || (e = this.$uew.closest(".editor"));
        var t = e.find(".editor-toolbar .upload"),
            o = e.find(".editor-footer .upload_status");
        t.removeClass("uploading"), o.html("")
    }, S.uploadStatus = function() {
        var e = this.$root;
        e && e.length || (e = this.$uew.closest(".editor"));
        var t = e.find(".editor-footer .upload_status");
        return !!t.text()
    }; {
        var R = t.ctbk = function(e) {
            var t = e.selection.getRange().createBookmark(),
                o = e.getContent();
            return {
                content: o,
                bk: {
                    id: !0,
                    start: t.start.id,
                    end: t.end && t.end.id
                }
            }
        };
        t.setCtbk = function(e, t) {
            e.setContent(t.content), setTimeout(function() {
                e.selection.getRange().moveToBookmark(t.bk).select()
            }, 0)
        }
    }
    S.getSelectionStart = function() {
        return l(this.textarea)
    }, S.getSelectionEnd = function() {
        return u(this.textarea)
    }, S.insertString = function(e) {
        if (e) {
            var t = this.textarea,
                o = this.$textarea,
                n = o.data("start") || t.selectionStart || 0,
                i = o.data("end") || t.selectionEnd;
            (void 0 === i || n > i) && (i = n), "function" == typeof e && (e = e(t.value.substring(n, i)));
            var a = n + e.length;
            o.val(t.value.substring(0, n) + e + t.value.substring(i)), "number" == typeof t.selectionStart ? (o.get(0).selectionStart = a, o.get(0).selectionEnd = a, o.focus()) : (o.data("start", a), o.data("end", a), o.focus(), this.setSelection(a, 0))
        }
    }, S.setSelection = function(e, t) {
        return c(this.textarea, e, t)
    }, S.setSelection200B = function() {
        var e, t, o = this.textarea.value; - 1 != (e = o.indexOf("​")) ? -1 != (t = o.indexOf("​", e + 1)) ? t-- : t = e : e = t = 0, this.reset(o.replace(/\u200B/g, "")), this.setSelection(e, t - e)
    }, S.getContent = function() {
        return this.editor ? this.editor.getContent() : SNB.Util.htmlizeContent(this.textarea.value)
    }, S.hasContent = function() {
        var e = $("<div>" + this.getContent() + "</div>");
        return $.trim(e.text()).length || e.find("img").length ? !0 : !1
    }, S.insert = function(e) {
        var t = this.editor ? this.editor.execCommand("insertHtml", e) : this.insertString(e);
        return this.options && this.options.insertFunc && this.options.insertFunc(S, e), this.editor.focus(), t
    }, S.reset = function(e, t, o) {
        this.editor ? (this.editor.setContent(e || C.fillChar), t && this.editor.selection.getRange().selectNodeContents(this.editor.document.body).shrinkBoundary().collapse(o).select()) : (this.textarea.value = e || "", this.$textarea.height(70), t && (this.$textarea.focus(), this.setSelection(o ? 0 : (e || "").length, 0)))
    }, S.setBookmark200B = function() {
        this.insertString(function(e) {
            return "​" + e + (e && "​")
        })
    }, S.ctbk = function() {
        var e, t, o, n = this.editor,
            i = this.textarea;
        return n ? R(n) : (e = i.value, this.setBookmark200B(), t = i.value, i.value = e, ~t.indexOf("​") ? (t = t.replace("​", '<span id="_baidu_bookmark_cursor_start_">﻿</span>').replace("​", '<span id="_baidu_bookmark_cursor_end_">﻿</span>'), ~t.indexOf('<span id="_baidu_bookmark_cursor_end_">﻿</span>') && (o = "_baidu_bookmark_cursor_end_")) : t += '<span id="_baidu_bookmark_cursor_start_">﻿</span>', t = SNB.Util.htmlizeContent(t), {
            content: t,
            bk: {
                id: !0,
                start: "_baidu_bookmark_cursor_start_",
                end: o
            }
        })
    }, S.insertImage = function(e, t) {
        var o = this;
        o.editor ? s(o.editor, e, t) : o.upgrade(function() {
            s(o.editor, e, t)
        })
    };
    var O = t.init = function(e, o) {
        var n = $(e);
        n.show();
        var i = t.textarea($("textarea", n), o || {
            $emotion: $(".emotion", n),
            $stock: $(".stock", n),
            $upload: $(".upload", n)
        });
        return i.$root = n, n.data("ta", i), i
    };
    t.textarea = function(e, t) {
        var o = e.data("ta");
        return o || (o = new p(e, t)), o
    };
    var z = 0,
        A = t.editor = function(t, o, n, i, a) {
            t = t || 70, "function" == typeof i && (a = i, i = {}), x.Editor.prototype.setMinFrameHeight = function(e) {
                var t = N.height();
                e || (e = t > 400 ? t - 177 : 310), x.browser.gecko && (e -= 1), this.options.minFrameHeight = e, this.fireEvent("contentchange")
            }; {
                var r = SNB.cssVersion && SNB.cssVersion["editor.css"];
                r ? "/style/editor-" + r + ".css" : "/style/editor.css?v=" + (new Date).getTime()
            }
            i = {
                minFrameHeight: t,
                pasteplain: !0,
                autoHeightEnabled: !1 === i.autoheight ? !1 : !0,
                enterTag: "br",
                initialStyle: e("./editor_inline.css.js") + i.style,
                iframeCssUrl: !1
            }, o && (/\r|\n/.test(o) && !~o.indexOf("<p>") && (o = textToHtml(o)), i.initialContent = o);
            var s = new x.Editor(i);
            s.UE = x, s.addListener("beforepaste", function(e, t) {
                t.html = t.html.replace(/<(p|li|div|tr|td) [^>]*/gi, function(e, t) {
                    return "<" + t
                }), t.html = SNB.Util.cleanContent(t.html, !1, !1, !0);
                var o = D(s, t.html, !0);
                t.html = o.html, o.local && SNB.Util.failDialog("本地图片请手动上传", 200, null, 3e3)
            }), n && s.render(n), a && a(s)
        },
        D = t.pasteImages = function(e, t, o) {
            console.log("=========== paste images =============");
            var n = [],
                i = {};
            return i.html = t.replace(/(<br\s*\/?>)?<img([^>]+)>(<br\s*\/?>)?/gi, function(t, a, r, s) {
                var d = r.match(/src=["']([^"'\s]+)[\s"']/);
                if (!d) return "";
                if (d = d[1], $.browser.isMobile || e.ta && !e.ta.$uew.parent().is(".editor, .editor-wrapper")) return "";
                var l;
                if (l = d.match(/(\/images\/vipicon_[0-9].png|\d+-\d{2}x\d{2}\.(gif|jpg))(\?.*)?$/i)) return "";
                if (l = d.match(/\/images\/face\/(\d{2}[^\.]+)\.png(\?.*)?$/i)) return SNB.Util.BBCODE_TO_TEXT[l[1]] || t;
                if (l = d.match(/(http:\/\/xqimg\.imedao\.com\/.+?)(!|%21).*?$/i) || d.match(/(http:\/\/u\.xqimg\.imedao\.com\/.+?)(!|%21).*?$/i)) return d = l[1] + "!custom.jpg", (o || a ? "<br>​" : "") + '<img class="ke_img" src="' + d + '" ' + E + " />" + (o || s ? "<br>​" : "");
                var u, c, p, f, m = "ke_img_paste_" + (++z).toString(10);
                return d.match(/https?:\/\//i) ? ((c = r.match(/width=["']?(\d+)/i)) && (c = parseInt(c[1], 10), c && 80 > c && (f = !0)), f && (p = r.match(/height=["']?(\d+)/i)) && (p = parseInt(p[1], 10), p && 80 > p) ? "" : (_.each(n, function(e) {
                    e[1] == d && (n.push([m, e[0]]), u = !0)
                }), u || n.push([m, d]), (o || a ? "<br>​" : "") + '<img id="' + m + '" class="ke_img_paste" style="max-width: 480px;" src="' + d + '" ' + E + " />" + ($.browser.msie ? "&nbsp;" : "") + (o || s ? "<br>​" : ""))) : (i.local = !0, "")
            }), n.length && (i.upload = !0, I(e, n)), i
        },
        I = t.uploadImages = function(e, t) {
            e.uploadImagesCount = e.uploadImagesCount || 0;
            var o, n = e.ta,
                i = {},
                a = [],
                r = [];
            for (_.map(t, function(e) {
                    var t = {
                        id: e[0]
                    };
                    e[1].indexOf("ke_img_paste_") > -1 ? i[e[1]] ? i[e[1]].push(e[0]) : i[e[1]] = [e[0]] : (t.src = e[1], a.push(t))
                }), _.map(a, function(e) {
                    i[e.id] && (e.same = i[e.id])
                });
                (o = a.splice(0, 10)).length;) console.log("_imgurls ", o), r.push(f(e, o));
            return r.length ? (n.uploadStatusUploading("正在上传图片，请稍候"), e.uploadImagesCount++, void $.when.apply($, r).done(function() {
                var t = Array.prototype.slice.call(arguments, 0),
                    o = Math.min.apply(Math, t),
                    i = Math.max.apply(Math, t);
                --e.uploadImagesCount || n.uploadStatusClear(), i && SNB.Util.failDialog((o > 1 ? "" : "部分") + "图片未成功上传，请尝试手动上传。", 300, null, 3e3)
            })) : !1
        };
    S.upgrade = function(e, t) {
        if (this.editor) return !1;
        "function" == typeof e && (t = e, e = !1), e || e === !1 || (e = this.ctbk());
        var o = this,
            n = o.$textarea,
            a = n.siblings(".ueditor-wrapper"),
            r = "";
        a.length || (a = $('<div class="ueditor-wrapper" />').insertAfter(n), r += "body,input,label,select,option,textarea,button,fieldset,legend{font:" + n.css("font") + ";}"), o.$uew = o.$ueditorWrapper = a, e = e || {}, n.attr("readonly", !0), A(e.height || 70, C.fillChar, !1, {
            style: r,
            autoheight: e.autoheight
        }, function(r) {
            o.editor = r, o.$root.data("editor", r), r.ta = o, n.hide(), a.show(), r.addListener("ready", function() {
                o.stockKeyup && r.addListener("keyup", function(e, t) {
                    o.stockKeyup(t)
                }), r.addListener("keyup", i(o)), r.addListener("keyup", _.bind(o.$uew.removeClass, o.$uew, "error")), o.options.ctrlReturn && r.addListener("keydown", function(e, t) {
                    return t.ctrlKey && 13 === t.keyCode ? (o.options.submitFunc(), setTimeout(function() {
                        $("body>.temp>.at-user-input").trigger("blur").remove()
                    }, 200), !1) : void 0
                }), r.setContent(e.content || C.fillChar), e.bk && r.selection.getRange().moveToBookmark(e.bk).select(), r.focus(), t && t(r)
            }), r.render(a[0])
        })
    }, S.fullscreen = function() {
        var e = this;
        q(e.$root).then(function(t) {
            N.scrollTop(0), B.addClass("main-editor-mode"), t.setMinFrameHeight(), o(t), N.trigger("scroll").trigger("resize");
            var n = e.$root.find(".editor-title input.title");
            !n.val().length && $.browser.msie && n.val(n.attr("placeholder")).addClass("placeholder"), setTimeout(function() {
                t.focus()
            }, 0)
        })
    }; {
        var U, H, F = t.editorReady = function(e, t) {
                if (o(e), !t.data("ready")) {
                    t.data("ready", !0);
                    var n = $(".bold", t),
                        i = $(".underline", t),
                        r = $(".numberlist", t),
                        l = $(".bulletlist", t),
                        u = $(".emotion", t),
                        c = $(".stock", t),
                        p = $(".upload", t),
                        f = t.closest(".editor").find(".ueditor-wrapper");
                    n.on("click", function() {
                        e.execCommand("bold")
                    }), i.on("click", function() {
                        e.execCommand("underline")
                    }), r.on("click", function() {
                        e.execCommand("insertorderedlist", "decimal")
                    }), l.on("click", function() {
                        e.execCommand("insertunorderedlist", "disc")
                    }), v({
                        editor: e,
                        insert: S.insert
                    }, u), c.on("click", a({
                        editor: !0,
                        $uew: f,
                        insert: function(t) {
                            e.execCommand("insertHtml", t)
                        }
                    })), d({
                        insertImage: function(t, o) {
                            s(e, t, o)
                        },
                        $uew: f,
                        uploadStatusUploading: S.uploadStatusUploading,
                        uploadStatusClear: S.uploadStatusClear,
                        uploadStatus: S.uploadStatus
                    }, p), e.addListener("selectionchange", function() {
                        e.queryCommandState("Bold") > 0 ? n.addClass("toolbar-item-active") : n.removeClass("toolbar-item-active"), e.queryCommandState("underline") > 0 ? i.addClass("toolbar-item-active") : i.removeClass("toolbar-item-active"), e.queryCommandState("insertorderedlist") > 0 ? r.addClass("toolbar-item-active") : r.removeClass("toolbar-item-active"), e.queryCommandState("insertunorderedlist") > 0 ? l.addClass("toolbar-item-active") : l.removeClass("toolbar-item-active")
                    })
                }
            },
            q = function(t) {
                if (t.data("fullscreen")) return t.data("fullscreen");
                var o = $.Deferred();
                return t.data("fullscreen", o.promise()), t.findOrAppend(">.editor", e("./editor.jade"), {
                    hostDomain: SNB.domain.host
                }, function(e) {
                    var n = ($("input.title", e), $("input.submit", e), $(".editor-toolbar", e)),
                        r = $(".ueditor-wrapper", e);
                    U = $(".back-container", e), H = $(".submit-container", e);
                    var s = t.data("ta");
                    s ? (s.editor ? (F(s.editor, n), o.resolve(s.editor), t.addClass("editor-mode")) : s.upgrade(function(e) {
                        F(e, n), o.resolve(e), t.addClass("editor-mode"), e.setMinFrameHeight()
                    }), r.data("ta", s)) : A(window.innerHeight > 350 ? window.innerHeight - 260 : 90, "", !1, function(e) {
                        s = {
                            editor: e,
                            $uew: r,
                            uploadStatusUploading: S.uploadStatusUploading,
                            uploadStatusClear: S.uploadStatusClear,
                            uploadStatus: S.uploadStatus,
                            insert: function(t) {
                                e.execCommand("insertHtml", t)
                            }
                        }, s.reset = $.proxy(S.reset, s), e.ta = s, e.addListener("ready", function() {
                            var t = a(s);
                            e.addListener("keyup", function(e, o) {
                                t(o)
                            }), e.addListener("keyup", i(s)), F(e, n), o.resolve(e)
                        }), t.addClass("editor-mode"), t.data("editor", e), r.data("ta", s), e.render(r[0])
                    }), r.find(">iframe").prop("tabindex", "2"), $(".submit-container input[type=button]", e).prop("tabindex", "3")
                }), t.data("fullscreen")
            },
            M = (t.fullscreen = function(e, t, n, i, a) {
                q(B).then(function(r) {
                    B.addClass("editor-mode"), o(r), N.trigger("resize"), i && i.$back && i.$back.length && function() {
                        U.empty().each(function(e, t) {
                            i.$back.clone(!0).appendTo(t)
                        })
                    }(), i && i.$submit && i.$submit.length && function() {
                        H.empty().each(function(e, t) {
                            i.$submit.clone(!0).appendTo(t)
                        }), $("input[type=button]", H).prop("tabindex", "3")
                    }();
                    var s = $("body>.editor .editor-toolbar .toolbar-item.upload");
                    i && "boolean" == typeof i.uploadImage && i.uploadImage === !1 ? s.hide() : s.show(), r.setContent(e), B.data("editorInitialContent", r.getContent());
                    var d = r.selection.getRange();
                    n ? d.moveToBookmark(n) : d.collapse(!0), d.select(!0), a && a(r), t = "string" == typeof t ? t : "";
                    var l = $("body>.editor .editor-title input.title");
                    l.val(t), !t && $.browser.msie && l.val(l.attr("placeholder")).addClass("placeholder")
                })
            }, function() {
                return B.data("editor").getContent() != B.data("editorInitialContent")
            });
        t.main = function(t, o, n, i, a, r) {
            o = o || {}, o.content = SNB.Util.cleanContent(o.content || "", !0), $(t).findOrAppend(">.editor", e("./editor.jade"), {
                hostDomain: SNB.domain.host
            }, function(s) {
                var d = $("input.title", s),
                    l = ($(".ueditor-wrapper", s), $(".editor-toolbar", s), $(".editor-footer", s)),
                    u = $.browser.isMobile;
                a = a && !u, i = i && $.browser.supportUpload, s.show(), l.html(e("./editor-footer.jade")({
                    hostDomain: SNB.domain.host
                }));
                var c = $("input.main-submit", l);
                $(".ueditor-wrapper").hide().after('<textarea id="status-box"></textarea>');
                var p = {
                    $emotion: $(".emotion", l),
                    $stock: $(".stock", l),
                    $upload: $(".upload", l),
                    $pdf: $(".pdf", l),
                    ctrlReturn: !0,
                    submitFunc: n,
                    autoResize: 70
                };
                i || (p.$upload.remove(), delete p.$upload), r || (p.$pdf.remove(), delete p.$pdf);
                var f = O(t, p);
                o.editor ? f.upgrade(o) : o.content ? (f.reset(o.content), f.setSelection200B(), f.upgrade()) : (f.$textarea.addClass("not-init"), f.$textarea.one("mouseup", function() {
                    f.$textarea.removeClass("not-init"), u || f.upgrade()
                })), o.title && d.val(o.title), a ? ($(".fullscreen", l).click(function() {
                    f.$textarea.trigger("focus"), f.fullscreen()
                }), $(".back-container", s).each(function(e, t) {
                    $('<a href="javascript:;" class="back">返回</a>').on("click", function(e) {
                        B.removeClass("main-editor-mode"), N.off("resize.fullEditor"), f.editor.setMinFrameHeight(70), setTimeout(function() {
                            f.editor.focus()
                        }, 0), e.preventDefault()
                    }).appendTo(t)
                })) : $(".fullscreen", l).remove(), c.on("click", n)
            })
        }
    }
    B.data("editChanged", M), $.browser.msie && parseFloat($.browser.version) < 9 ? $(window.top).on("beforeunload", h) : N.on("beforeunload", h), B.on("click", ".ui-widget-overlay", function(e) {
        var t = $(e.target),
            o = $("#stockbox, #at-suggestion", t.prev());
        o.length && o.dialog("close")
    })
}), define("editor_inline.css.js", [], function(e, t, o) {
    o.exports = "a,abbr,acronym,address,applet,b,big,blockquote,body,caption,center,cite,code,dd,del,dfn,div,dl,dt,em,fieldset,font,form,h1,h2,h3,h4,h5,h6,html,i,iframe,img,ins,kbd,label,legend,object,ol,p,pre,q,s,samp,small,span,strike,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,tt,u,ul,var{margin:0;border:0;padding:0;outline:0}body{color:#000;padding:0;word-wrap:break-word}body,button,fieldset,input,label,legend,option,select,textarea{font:14px/1.5 'Helvetica Neue',Helvetica,Arial,sans-serif}ol,ul{padding-left:3em}ul li{list-style:disc}ol li{list-style:decimal}.ke_img{background:#f9f9f9}a{color:#000!important;text-decoration:none!important}"
}), define("editor.jade.js", function(require, exports, module) {
    function anonymous(locals, attrs, escape, rethrow, merge) {
        attrs = attrs || jade.attrs, escape = escape || jade.escape, rethrow = rethrow || jade.rethrow, merge = merge || jade.merge;
        var buf = [];
        with(locals || {}) {
            buf.push('<div class="editor"><div class="editor-toolbar-wrapper"><div class="editor-toolbar fixed"><span title="加粗" class="toolbar-item bold"></span><span title="下划线" class="toolbar-item underline"></span><span title="有序列表" class="toolbar-item numberlist"></span><span title="无序列表" class="toolbar-item bulletlist"></span><div class="toolbar-line"></div><span title="插入表情" class="toolbar-item emotion"></span><span title="插入股票" class="toolbar-item stock"></span><span title="插入图片" class="toolbar-item upload"><form action="/service/upload_photo" method="post" enctype="multipart/form-data"><input name="file" type="file"/></form></span><span class="upload_status"></span><div class="back-container"></div></div></div><div class="editor-title"><input name="title" tabindex="1" type="text" placeholder="点击这里输入标题" class="title"/></div><div class="editor-wrapper"><div class="ueditor-wrapper"></div></div><div class="editor-footer"><div class="submit-container"><input type="button" value="发布" class="submit main-submit disabled"/></div><div class="back-container"></div><div class="footer-controller"></div></div></div>')
        }
        return buf.join("")
    }
    module.exports = anonymous
}), define("editor-footer.jade.js", function(require, exports, module) {
    function anonymous(locals, attrs, escape, rethrow, merge) {
        attrs = attrs || jade.attrs, escape = escape || jade.escape, rethrow = rethrow || jade.rethrow, merge = merge || jade.merge;
        var buf = [];
        with(locals || {}) {
            buf.push('<div class="back-container"></div><div class="footer-controller"><span title="插入表情" class="emotion"><s></s><span>表情</span></span><span title="插入股票代码" class="stock"><s></s><span>股票</span></span><span title="上传图片" class="upload"><s></s><span>图片</span></span>');
            var showPdf = function() {
                return ("undefined" == typeof req_isMobile || req_isMobile || "undefined" == typeof req_isPad || req_isPad) && ("undefined" == typeof $ || !$.browser || $.browser.isMobile || $.browser.isPad) ? !1 : !0
            }();
            showPdf && buf.push('<span title="上传研报 pdf 文件" class="pdf"><s></s><span>PDF</span></span>'), buf.push('<span title="添加标题，给文章排版" class="fullscreen"><s></s><span>长文</span></span><span class="upload_status"></span></div><div class="submit-container"><input type="button" value="发布" class="main-submit disabled"/></div>')
        }
        return buf.join("")
    }
    module.exports = anonymous
});
