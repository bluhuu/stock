__.BasicModule.register("widget.bossclick", "2.0.0", ["cookie", "fn-boss", "event", "widget"], function() {
    __.exportPath("__.widget.BossClick");
    __.widget.BossClick = function(b) {
        __.widget.Base.call(this);
        __.extend(this._cfg, b);
        this._addEvent();
        this._cfg.origin && this.send({
            iTy: this._cfg.origin,
            sOp: 1,
            sUrl: location.href,
            sRefer: document.referrer
        })
    }
    ;
    __.inherits(__.widget.BossClick, __.widget.Base);
    var c = __.widget.BossClick
      , k = function() {
        return __.ua.ie ? function(b, a) {
            var d = __.dom.f("du-win-open-a");
            d || (d = __.dom.addEl({
                tag: "a",
                id: "du-win-open-a",
                css: "display:none"
            }, document.body));
            if (d && d.click) {
                d.target = a;
                d.href = b;
                d.click()
            } else
                window.open(b, a)
        }
        : function(b, a) {
            window.open(b, a)
        }
    }();
    c._fnBoss = {};
    c._listend = false;
    c.EVENT_SEND = "du-boss:send";
    c.prototype.listen = function() {
        if (!c._listend) {
            var b = this;
            this._fnSend = function(a) {
                a.memo && b.send(a.memo)
            }
            ;
            __.event.on(__.doc, c.EVENT_SEND, this._fnSend)
        }
        c._listend = true
    }
    ;
    c.prototype._cfg = {
        node: __.doc,
        recurse: true
    };
    c.prototype._onClick = function(b) {
        if (__.ua.gecko && b.button !== 0)
            return true;
        for (var a = b.target, d, e, g = this; a && a.getAttribute; ) {
            e = a.getAttribute("boss");
            d = a.tagName.toLowerCase();
            if (__.ua.webkit && !e & d == "select")
                if (!a.getAttribute("bossmemo")) {
                    a.setAttribute("bossmemo", 1);
                    __.event.on(a, "change", function() {
                        var i = a;
                        return function() {
                            var l = i.options[i.selectedIndex].getAttribute("boss");
                            l && g.send({
                                sOp: l
                            })
                        }
                    }())
                }
            if (!e && __.ua.ie && d == "select") {
                var h = a.getAttribute("bossmemo")
                  , f = a.selectedIndex;
                if (h != f) {
                    a.setAttribute("bossmemo", f);
                    e = a.options[f].getAttribute("boss")
                }
            }
            if (e) {
                h = false;
                f = null ;
                if (d == "a" && (a.target == "_self" || a.target === "")) {
                    var j = a.href;
                    __.event.preventDefault(b);
                    h = true;
                    f = function() {
                        k(j, "_self")
                    }
                    ;
                    setTimeout(function() {
                        k(j, "_self")
                    }, 10)
                }
                g.send({
                    iTy: g._cfg.iTy,
                    sOp: e
                }, h, f)
            }
            a = g._cfg.recurse && a != this._cfg.node ? a.parentNode : null
        }
    }
    ;
    c.prototype.send = function(b, a, d) {
        if (b) {
            var e = b.iTy || this._cfg.iTy;
            if (!c._fnBoss[e]) {
                var g = "";
                if (typeof __.global.trimUin == "function" && typeof __.global.pgvGetCookieByName == "function")
                    g = __.global.trimUin(__.global.pgvGetCookieByName("o_cookie="));
                else {
                    var h = __.cookie.get("o_cookie") || __.cookie.get("uin") || __.cookie.get("luin");
                    if (h)
                        g = h.replace(/^o0+/, "")
                }
                c._fnBoss[e] = new __.FnBoss(e,g,"")
            }
            e = c._fnBoss[e];
            var f = {};
            __.each(b, function(j, i) {
                if ("&sIp&iQQ&sBiz&sOp&iSta&iTy&iFlow".indexOf("&" + i) < 0)
                    f[i] = j
            }, true);
            e.log(b.sOp, f, a, d)
        }
    }
    ;
    c.prototype._addEvent = function() {
        if ("iTy"in this._cfg) {
            this._fnClick = __.event.bind(this._onClick, this);
            __.event.on(this._cfg.node, "click", this._fnClick)
        }
    }
    ;
    __.widget.BossClick.prototype.disposeInternal = function() {
        __.widget.BossClick._super.disposeInternal.call(this);
        c._listend = false
    }
});
/*  |xGv00|e18280ec010e98201d0c29eeb77d1cde */
