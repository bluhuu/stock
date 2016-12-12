/*
 * @author <a href="mailto:staurenliu@tencent.com">stauren</a>
 * @revision:
 * @version:2.1
 */
__.BasicModule.register("select", "2.0", ["lang", "dom", "selector", "event", "cookie", "widget"], function() {
    var b, a;
    __.widget.Select = function(d, c) {
        this._initCfg(c);
        this.id = d;
        this.listDisplaying = false;
        this.values = {};
        this.value = this._config.defaultValue;
        this.lastActiveItem = null ;
        if (!c.name) {
            this._config.name = d + "_select"
        }
        this._createEls();
        this._initEls();
        this._addEvents()
    }
    ;
    __.inherits(__.widget.Select, __.widget.Base);
    b = __.widget.Select;
    a = "du-select-";
    b.prototype._cfg = {
        txt: {
            wrongValue: "the value to be set is wrong"
        },
        cls: {
            container: a + "ctn",
            icon: a + "icon",
            value: a + "value",
            list: a + "list",
            item: a + "item",
            active: a + "active",
            input: a + "input"
        },
        status: {},
        defInstCfg: {
            width: 45,
            height: 20,
            lineHeight: 13,
            borderColor: "#d0cece",
            bgColor: "#fff",
            items: {
                1: "item 1",
                2: "item 2"
            },
            zIndex: 100,
            defaultValue: 1,
            ctnZindex: 1,
            fontsize: 13,
            bgSrc: "http://mat1.gtimg.com/finance/stock/qq_panel/qq_bg2.gif",
            bgNormal: "-33px -64px",
            bgActive: "-63px 0",
            onChange: function(d, c) {}
        }
    };
    b.prototype._error = function(c) {
        throw new Error("du-select: " + c)
    }
    ;
    b.prototype._initCfg = function(d) {
        var c, e = 0;
        d = d || {};
        this._config = __.lang.clone(this._cfg.defInstCfg);
        c = this._config;
        __.each(d, function(g, f) {
            c[f] = g
        }, true);
        if (__.lang.isUndefined(d.width)) {
            __.each(d.items, function(f) {
                f = String(f);
                if (f.length > e) {
                    e = f.length
                }
            }, true);
            c.width = e * (c.fontsize + 1) + 18
        }
    }
    ;
    b.prototype._initEls = function() {
        var c = __.dom.f(this.id)
          , d = this._cfg.cls;
        this.els = {
            ctn: c,
            innerCtn: __.dom.f("." + d.container, c),
            value: __.dom.f("." + d.value, c),
            icon: __.dom.f("." + d.icon, c),
            list: __.dom.f("." + d.list, c),
            input: __.dom.f("." + d.input, c)
        }
    }
    ;
    b.prototype._addEvents = function() {
        var e = __.event.bind
          , d = this.els
          , c = [e(this._hlMouseOver, this), e(this._hlMouseOut, this), e(this._hlClick, this)];
        __.event.on(d.ctn, "mouseover", c[0]);
        __.event.on(d.ctn, "mouseout", c[1]);
        __.event.on(__.doc, "click", c[2]);
        this._fns = c
    }
    ;
    b.prototype._hlMouseOut = function(c) {
        this.els.icon.style.backgroundPosition = this._config.bgNormal
    }
    ;
    b.prototype._hlMouseOver = function(g) {
        var c = g.target || g.srcElement
          , d = c.className
          , f = this.els;
        if (c === f.value || c === f.icon || c === f.value.parentNode) {
            f.icon.style.backgroundPosition = this._config.bgActive
        } else {
            while (c !== this.els.ctn) {
                if (__.dom.hasClass(c, this._cfg.cls.item)) {
                    this.setActive(c);
                    break
                }
                c = c.parentNode
            }
        }
    }
    ;
    b.prototype._hlClick = function(g) {
        var c = g.target || g.srcElement
          , d = c.className
          , f = this.els;
        if (!this.listDisplaying && (c === f.value || c === f.icon || c === f.icon.parentNode)) {
            this.show()
        } else {
            if (__.dom.contains(f.ctn, c)) {
                while (c && c !== this.els.ctn) {
                    if (__.dom.hasClass(c, this._cfg.cls.item)) {
                        this.set(__.lang.stripTags(c.innerHTML), true);
                        break
                    }
                    c = c.parentNode
                }
            }
            this.hide()
        }
    }
    ;
    b.prototype.setActive = function(c) {
        this.clearActive();
        c.style.background = "#428fdc";
        c.style.color = "#fff";
        this.lastActiveItem = c
    }
    ;
    b.prototype.clearActive = function(c) {
        if (this.lastActiveItem) {
            this.lastActiveItem.style.background = "#fff";
            this.lastActiveItem.style.color = "#000";
            this.lastActiveItem = null
        }
    }
    ;
    b.prototype.toggle = function() {
        if (this.listDisplaying) {
            this.hide()
        } else {
            this.show()
        }
    }
    ;
    b.prototype.show = function() {
        var c = this.els;
        if (!this.listDisplaying) {
            c.list.style.display = "block";
            c.value.style.background = "#428fdc";
            c.value.style.color = "#fff";
            c.innerCtn.style.zIndex = this._config.ctnZindex;
            this.listDisplaying = true
        }
    }
    ;
    b.prototype.hide = function() {
        var c = this.els;
        if (this.listDisplaying) {
            c.list.style.display = "none";
            c.value.style.background = "#fff";
            c.value.style.color = "#000";
            c.innerCtn.style.zIndex = "0";
            this.listDisplaying = false
        }
    }
    ;
    b.prototype.set = function(e, f) {
        f = f === true ? true : false;
        var c, d;
        if (f && !__.lang.isUndefined(this.values[e])) {
            d = e;
            e = this.values[e]
        } else {
            d = this._config.items[e]
        }
        if (!__.lang.isUndefined(this._config.items[e])) {
            c = this.els.value;
            c.innerHTML = "";
            __.dom.addText(c, d);
            this.value = e;
            this.els.input.value = e;
            if (this._config.onChange) {
                this._config.onChange(e, d);
                __.event.fire(this, "change", [e, d])
            }
        } else {
            this._error(this._cfg.txt.wrongValue)
        }
    }
    ;
    b.prototype._createEls = function() {
        var f, d, i, h, k, c, j, e = this._config, g = this;
        c = __.ua;
        j = e.width;
        d = "height:1px;font-size:1px;line-height:0;";
        i = [2];
        if (c.ie > 6) {
            i = [3]
        }
        if (c.webkit) {
            i = [1]
        }
        h = [];
        k = this.values;
        __.each(e.items, function(m, l) {
            h.push({
                css: "padding:2px 14px 0 3px;width:" + (j - 21) + "px;background:#fff;",
                cls: g._cfg.cls.item,
                child: {
                    tag: "nobr",
                    css: "",
                    text: m
                }
            });
            k[m] = l
        }, true);
        f = {
            css: "height:" + e.height + "px;width:" + j + "px;cursor:pointer;font-size:" + this._config.fontsize + "px;position:relative;z-index:0;",
            cls: this._cfg.cls.container,
            child: [{
                css: d + "margin:0 1px;background:" + this._config.borderColor + ";width:" + (j - 2) + "px;overflow:hidden;float:left;display:inline;"
            }, {
                css: "background:" + this._config.bgColor + ";border:1px solid " + this._config.borderColor + ";border-width:0 1px;float:left;",
                child: [{
                    css: d + "border:1px solid #e3e2e2;border-width:0 1px;border-top-color:#0f0;width:" + (j - 4) + "px;float:left;"
                }, {
                    css: "height:" + (this._config.lineHeight + 3) + "px;float:left;padding-left:1px;width:" + (j - 3) + "px;",
                    child: [{
                        css: "padding:" + i[0] + "px 1px 0 3px;float:left;height:" + this._config.lineHeight + "px;line-height:" + this._config.lineHeight + "px;",
                        cls: this._cfg.cls.value,
                        text: this._config.items[this.value]
                    }, {
                        css: "width:11px;height:" + (this._config.lineHeight + 3) + "px;float:right;background:transparent url(" + e.bgSrc + ") no-repeat " + e.bgNormal + ";margin-right:1px;",
                        cls: this._cfg.cls.icon
                    }, {
                        css: "visibility:hidden;",
                        html: '<input type="hidden" value="' + this._config.defaultValue + '" name="' + this._config.name + '" class="' + this._cfg.cls.input + '"/>'
                    }]
                }, {
                    css: d + "border:1px solid #e3e2e2;border-width:0 1px;width:" + (j - 4) + "px;float:left;"
                }]
            }, {
                css: d + "margin:0 1px;background:" + this._config.borderColor + ";width:" + (j - 2) + "px;float:left;display:inline;overflow:hidden;"
            }, {
                cls: this._cfg.cls.list,
                css: "float:left;position:absolute;left:0px;top:" + (this._config.lineHeight + 5) + "px;display:none;width:" + (j) + "px;z-index:" + this._config.zIndex,
                child: [{
                    css: "border:1px solid #D0CECE;/*border-bottom:0;*/background:#fff;padding:1px;text-align:left;",
                    child: {
                        tag: "ul",
                        css: "list-style:none;padding:0;margin:0;",
                        child: h
                    }
                }, {}]
            }]
        };
        __.dom.addEl(f, this.id)
    }
    ;
    b.prototype.disposeInternal = function() {
        b._super.disposeInternal.call(this);
        __.event.off(this.els.ctn, "mouseover", this._fns[0]);
        __.event.off(this.els.ctn, "mouseout", this._fns[1]);
        __.event.off(__.doc, "click", this._fns[2]);
        this._fns = null ;
        this.els.ctn = null ;
        this.els.innerCtn = null ;
        this.els.value = null ;
        this.els.icon = null ;
        this.els.list = null ;
        this.els.input = null ;
        this.els = null
    }
});
__.BasicModule.register("fn-smartbox", "2.0", ["lang", "dom", "selector", "event", "cookie", "fn-table"], function() {
    var a;
    __.widget.SmartBox = function(e, c) {
        var b, d = a._cfg;
        c = c || {};
        this.status = d.status.READY;
        this._config = __.lang.clone(d.defInstCfg);
        b = this._config;
        __.each(c, function(g, f) {
            b[f] = g
        }, true);
        b.inputHint = b.inputHint || d.txt.inputHint;
        this.moreCls = d.cls.more + e;
        this.zeroList = false;
        this._errQuery = false;
        this.listQT = "";
        this.loadingQT = "";
        this.showCount = 0;
        this._listJustCreated = false;
        this.form = null ;
        this.queryIpt = null ;
        this.subIpt = null ;
        this.typeIpt = null ;
        this.containerId = e;
        this.resultCtnId = e + d.resultCtnIdPostfix;
        this._createEls();
        this._initEls();
        this._initEvents();
        if (this._config.autoFocus) {
            this.queryIpt.select()
        }
    }
    ;
    __.inherits(__.widget.SmartBox, __.widget.Base);
    a = __.widget.SmartBox;
    a._cfg = {
        liIdPrefix: "du-sx-li~",
        selectIdPrefix: "du-sx-sel-",
        resultCtnIdPostfix: "-du-sx-result",
        pstockLink: "http://stockapp.finance.qq.com/pstock/",
        hintUrl: "http://smartbox.gtimg.cn/s3/?v=2&",
        formActionBase: "http://stock.finance.qq.com/cgi-bin/",
        txt: {
            stocksearch: "\u80a1\u7968\u67e5\u8be2",
            ALL: "\u5168\u90e8",
            GP: "\u6caa\u6df1",
            HK: "\u6e2f\u80a1",
            JJ: "\u57fa\u91d1",
            AS: "\u7f8e\u80a1",
            FT: "\u671f\u8d27",
            check: "\u67e5\u8be2",
            pstock: "\u6211\u7684\u81ea\u9009\u80a1",
            inputHint: "\u4ee3\u7801/\u540d\u79f0/\u62fc\u97f3",
            errHint: "\u60a8\u8f93\u5165\u7684\u67e5\u8be2\u8bcd\u6709\u8bef",
            emptyHint: "\u8bf7\u8f93\u5165\u67e5\u8be2\u6761\u4ef6\uff1a\u4ee3\u7801/\u540d\u79f0/\u62fc\u97f3",
            noResult: "\u672a\u627e\u5230\u7b26\u5408\u6761\u4ef6\u7684\u7ed3\u679c"
        },
        cls: {
            query: "du-sx-query",
            submit: "du-sx-submit",
            select: "du-sx-select",
            type: "du-sx-type",
            li: "du-sx-li",
            more: "du-sx-more-"
        },
        status: {
            READY: 0,
            INITED: 1,
            HIDDEN: 3,
            SHOWN: 4
        },
        typeEnum: ["ALL", "GP", "HK", "JJ", "AS", "FT"],
        typeMap: {
            ALL: "all",
            GP: "gp",
            HK: "hk",
            JJ: "jj",
            AS: "us",
            FT: "qh"
        },
        mktMap: {
            sh: "\u4e0a\u6d77",
            sz: "\u6df1\u5733",
            jj: "\u57fa\u91d1",
            hk: "\u6e2f\u80a1",
            us: "\u7f8e\u80a1",
            qh: "\u671f\u8d27",
            nq: "\u4e09\u677f"
        },
        mktNumMap: {
            jj: 0,
            sh: 1,
            sz: 51,
            hk: 100,
            us: 200,
            qh: 350,
            nq: 61
        },
        defInstCfg: {
            maxLine: 13,
            typeWait: 50,
            showType: true,
            defaultType: "ALL",
            showPLink: true,
            showTitle: true,
            directionUp: false,
            onclick: function(b) {
                if (b.length === 2) {
                    this.onMstats(b[1])
                } else {
                    __.global.open(__.fnTable.getPageUrl(b[1], b[2]) + "?pgv_ref=fi_smartbox&_ver=" + __.BasicModule.loadedMods["fn-smartbox"], this.useSelf ? "_self" : "_blank")
                }
            },
            onsubmit: false,
            onsubmit2: false,
            zindex: 1,
            maxQuery: 10,
            showMarket: true,
            listXOffset: 0,
            listYOffset: 0,
            name: "",
            inputHint: "",
            matchRecent: false,
            autoSelect: false,
            adjustLimit: 2,
            showAll: true,
            sendToBoss: true,
            dataScope: null ,
            useSelf: false,
            autoFocus: false,
            preFill: false,
            blurColor: "#B4B3B3",
            onMstats: false,
            iframeMask: false
        }
    };
    a.legalQuery = __.lang.getReg("^[.,0-9a-zA-Z\\u4e00-\\u9fa5]+$");
    a.getRecentCode = function() {
        var d, b, c;
        if (__.lang.isUndefined(this._recentCookieCache)) {
            b = [];
            c = __.fnTable.mapNumMarket;
            d = (__.cookie.get("RECENT_CODE") + __.cookie.get("ASRECENT_CODE")).split("|");
            __.each(d, function(f, e) {
                if (f && b.length < 10) {
                    f = f.split("_");
                    if (f.length > 1 && !__.lang.isUndefined(c[f[1]])) {
                        b.push(c[f[1]] + f[0])
                    } else {
                        if (f.length === 1) {
                            b.push("jj" + f[0])
                        }
                    }
                }
            });
            this._recentCookieCache = b.join(",").toLowerCase()
        }
        return this._recentCookieCache
    }
    ;
    a.setHover = function(b) {
        if (this._lastHoverLi && this._lastHoverLi !== b) {
            this._lastHoverLi.style.backgroundColor = "#fff"
        }
        if (b && b.style) {
            b.style.backgroundColor = "#deefff"
        }
        this._lastHoverLi = b
    }
    ;
    a.prototype._getLine = function() {
        return {
            tag: "li",
            css: "padding:0;margin:4px 3px;float:left;_display:inline;background:#eaeaea;height:2px;line-height:2px;font-size:0;width:254px;"
        }
    }
    ;
    a.prototype._showList = function(s) {
        var g, h, d, o, f, p, b, n, r = [], c = "", q = "", k, l = {}, m = s.split("~"), e = this.cache[s], j = this;
        if (this.listQT === s) {
            __.lang.log("Draw cancelled for the same query.");
            return
        }
        this.listQT = s;
        n = m[1];
        m = m[0];
        if (this._config.directionUp) {
            h = "push";
            d = "unshift"
        } else {
            h = "unshift";
            d = "push"
        }
        if (!this.resultList) {
            return
        }
        this.resultList.innerHTML = "";
        b = function(u, t) {
            var i = m.toUpperCase()
              , v = '<span style="color:#f45243;height:20px;line-height:20px;">' + i + "</span>";
            u = u.toUpperCase();
            if (t && __.lang.endWith(u, i)) {
                u = u.substr(0, u.length - i.length) + v
            } else {
                u = u.replace(i, v)
            }
            return u
        }
        ;
        if (this._config.onMstats) {
            if (e[2]) {
                __.each(e[2].split("^"), function(t) {
                    var i = {};
                    t = t.split("~");
                    i.isMstats = true;
                    i.id = t[0];
                    i.col0 = b(t[2]);
                    i.col2 = b(t[0]);
                    i.col1 = b(t[1]);
                    r.push(j._getLiObj(i))
                })
            }
        }
        if (__.lang.isUndefined(e[0])) {
            e[0] = "N"
        }
        __.each(e[0].split("^"), function(i) {
            if (i) {
                q += i + "~Y^"
            }
        });
        q += e[1];
        q = q.split("^");
        __.each(q, function(v, t) {
            var u;
            v = v.split("~");
            u = {};
            if (!v || v.length < 4) {
                return
            }
            if (r.length >= j._config.maxLine) {
                return
            }
            u.code = v[1].toUpperCase();
            u.numType = a._cfg.mktNumMap[v[0]];
            u.market = a._cfg.mktMap[v[0]];
            if (v[4] === "QH-IF") {
                u.market = "\u80a1\u671f";
                u.numType = 300
            } else {
                if (v[4] === "ZQ") {
                    u.market = "\u503a\u5238"
                }
            }
            u.category = v[4];
            u.name = v[2];
            switch (v[4]) {
            case "FJ":
            case "ETF":
                u.market = "\u57fa\u91d1";
                break
            }
            if (u.numType === 200) {
                o = v[1].indexOf(".");
                u.col0 = o > 0 ? v[1].substr(0, o) : v[1]
            } else {
                u.col0 = v[1]
            }
            u.col0 = b(u.col0, true);
            u.col1 = b(v[2]);
            u.col2 = b(v[3]);
            u = j._getLiObj(u);
            if (u) {
                if (c !== v[7] && r.length > 0) {
                    r[d](j._getLine())
                }
                c = v[7];
                if (v[0] + "~" + v[3] === "00700~100") {
                    r[h](u)
                } else {
                    r[d](u)
                }
            }
        });
        if (r.length > 0) {
            if (this._config.showMarket && this._config.showAll) {
                r[d]({
                    tag: "li",
                    css: "padding:0;float:left;_display:inline;text-align:right;width:250px;height:20px;line-height:20px;",
                    child: {
                        tag: "b",
                        text: "\u67e5\u770b\u5168\u90e8",
                        cls: this.moreCls,
                        css: "color:blue;text-decoration:underline;font-weight:normal;cursor:pointer;"
                    }
                })
            }
            if (__.ua.ie === 6) {
                __.dom.f(this.resultCtnId).style.paddingBottom = r.length === 1 ? "0" : "3px"
            }
            __.dom.addEl(r, this.resultList);
            this.zeroList = false;
            a.setHover(this._config.directionUp ? this.resultList.lastChild : this.resultList.firstChild);
            this._listJustCreated = true;
            this.show(true)
        } else {
            this.zeroList = true;
            this._showError(a._cfg.txt.noResult.replace("##query##", m))
        }
    }
    ;
    a.prototype._getLiObj = function(f) {
        var c = false, b, g, e, d;
        g = "height:20px;line-height:20px;overflow:hidden;";
        d = this._config.showMarket;
        if (f.numType === 200 && f.col2 === "*") {
            b = d ? [246, 54, 142, 5, 45, 0] : [138, 44, 89, 0, 0, 0];
            e = false
        } else {
            if (f.isMstats) {
                b = [246, 54, 75, 5, 60, 0]
            } else {
                b = d ? [246, 54, 75, 5, 60, 5] : [138, 44, 48, 5, 36, 0];
                e = {
                    tag: "span",
                    css: "float:left;width:" + b[4] + "px;margin-right:" + b[5] + "px;" + g,
                    html: f.col2
                }
            }
        }
        if (d) {
            if (f.isMstats) {
                e = {
                    tag: "span",
                    css: "float:left;width:" + b[4] + "px;margin-right:" + b[5] + "px;" + g,
                    html: f.col2
                };
                c = {
                    tag: "span"
                }
            } else {
                if (f.numType === 1) {
                    if (f.code.substr(0, 1) === "9") {
                        c = 2
                    } else {
                        if (f.code.substr(0, 2) === "58") {
                            c = 1
                        }
                    }
                } else {
                    if (f.numType === 51) {
                        if (f.code.substr(0, 1) === "2") {
                            c = 2
                        } else {
                            if (f.code.substr(0, 2) === "03") {
                                c = 1
                            }
                        }
                    }
                }
                c = {
                    tag: "span",
                    css: "float:right;width:40px;text-align:right;color:#a9a9a9;" + g,
                    text: f.market
                }
            }
        }
        return {
            tag: "li",
            css: "padding:0;margin:0 2px;cursor:pointer;float:left;_display:inline;_margin:0 1px;",
            id: a._cfg.liIdPrefix + (f.isMstats ? f.id : f.code + "~" + f.numType + "~" + (f.category || "") + "~" + f.name),
            cls: a._cfg.cls.li,
            child: {
                css: "margin:0 5px;float:left;_display:inline;width:" + b[0] + "px;" + g,
                child: {
                    tag: "nobr",
                    child: [{
                        tag: "span",
                        css: "float:left;width:" + b[1] + "px;margin-right:5px;" + g,
                        html: f.col0
                    }, {
                        tag: "span",
                        css: "float:left;font-family:Arial;margin-right:" + b[3] + "px;height:20px;line-height:22px;_line-height:23px;overflow:hidden;width:" + b[2] + "px;",
                        html: f.col1
                    }, e, c]
                }
            }
        }
    }
    ;
    a.prototype._getListCtn = function(e) {
        var d, f, c, b = __.dom.f(this.resultCtnId);
        c = this._config.showMarket ? 260 : 152;
        if (!b) {
            f = {
                id: this.resultCtnId,
                css: "width:" + c + "px;overflow:hidden;text-align:left;background:#FFF;position:absolute;font-size:12px;visibility:hidden;z-index:" + this._config.zindex,
                child: [{
                    tag: "ul",
                    css: "font-family:Arial;margin:0;padding:0;border:1px solid #9c9c9c;padding:3px 0;list-style:none;overflow:hidden;_zoom:1;"
                }]
            };
            if (__.ua.ie === 6 || this._config.iframeMask) {
                f.child.push({
                    tag: "iframe",
                    css: "width:290px;height:3000px;filter:alpha(opacity=0);position:absolute;top:0;left:-1px;z-index:-1;",
                    frameBorder: "0"
                })
            }
            b = __.dom.addEl(f);
            __.dom.insertBefore(b, __.doc.body.firstChild);
            this.resultList = b.getElementsByTagName("ul")[0];
            d = this.queryIpt;
            b.style.left = __.dom.getPosition(d, "offsetLeft") + this._config.listXOffset + "px";
            b.style.top = (__.dom.getPosition(d, "offsetTop") + d.offsetHeight + this._config.listYOffset + 1) + "px"
        } else {
            if (e) {
                d = this.queryIpt;
                b.style.left = __.dom.getPosition(d, "offsetLeft") + this._config.listXOffset + "px";
                b.style.top = (__.dom.getPosition(d, "offsetTop") + d.offsetHeight + this._config.listYOffset + 1) + "px"
            }
        }
        return b
    }
    ;
    a.prototype._sendRequest = function() {
        var b, f, c, i, g = this.queryIpt, h = this.typeIpt, e = this.cache, d = this;
        f = __.lang.trim(g.value).toLowerCase();
        c = h.value;
        i = f + "~" + c;
        if (this.listQT === i) {
            __.lang.log("same query:" + i);
            return
        }
        if (this.loadingQT === i) {
            return
        }
        if (f === "") {
            this.listQT = "";
            this.hide();
            return
        } else {
            if (!a.legalQuery.test(f)) {
                this.listQT = i;
                this._errQuery = true;
                this._showError();
                return
            }
        }
        if (e[i]) {
            this._showList(i)
        } else {
            b = a._cfg.hintUrl + "q=" + encodeURIComponent(f) + "&t=" + encodeURIComponent(a._cfg.typeMap[c]);
            if (this._config.onMstats) {
                b += "&c=1"
            }
            if (this._config.matchRecent) {
                b += "&c=" + encodeURIComponent(a.getRecentCode())
            }
            setTimeout(function() {
                var j = d._config.dataScope || __.global;
                if (__.lang.trim(g.value).toLowerCase() === f && d.typeIpt.value === c) {
                    __.lang.log("begin load query:" + f);
                    d.loadingQT = i;
                    __.load(b, function() {
                        __.lang.log("data loaded for " + f + "~" + c);
                        d.loadingQT = "";
                        if (__.lang.trim(g.value).toLowerCase() === f && d.typeIpt.value === c) {
                            e[i] = [j.v_hint_R, j.v_hint];
                            if (d._config.onMstats) {
                                e[i].push(j.v_cate_hint || "")
                            }
                            d._showList(i);
                            __.lang.log("list drawed for " + d.listQT);
                            j.v_cate_hint = undefined;
                            j.v_hint_R = undefined;
                            j.v_hint = undefined
                        }
                    }, {
                        charset: "gbk",
                        cache: true,
                        doc: j.document
                    })
                }
            }, this._config.typeWait)
        }
    }
    ;
    a.prototype.cache = {};
    a.prototype._createEls = function() {
        var k, j, d, f = __.dom.f(this.containerId), c = false, i = false, h = false, g = this._config.preFill || this._config.inputHint, b = "ZHENGQUANDM";
        d = this._config.attach;
        if (d) {
            if (!d.form[b]) {
                if (__.ua.ie) {
                    try {
                        j = __.doc.createElement('<input name="' + b + '" type="hidden">')
                    } catch (l) {
                        j = false
                    }
                }
                if (!j) {
                    j = __.doc.createElement("input");
                    j.name = b;
                    j.type = "hidden"
                }
                d.form.appendChild(j)
            }
        } else {
            if (this._config.showType) {
                c = {
                    css: "margin-left:10px;margin-right:2px;_margin-top:1px;float:left;",
                    id: a._cfg.selectIdPrefix + this.containerId
                }
            }
            if (this._config.showPLink) {
                i = {
                    css: "float:left;height:20px;line-height:23px;",
                    child: {
                        tag: "a",
                        text: a._cfg.txt.pstock,
                        href: a._cfg.pstockLink,
                        target: "_blank"
                    }
                }
            }
            if (this._config.showTitle) {
                h = {
                    text: a._cfg.txt.stocksearch,
                    css: "float:left;height:20px;line-height:23px;"
                }
            }
            __.dom.addEl({
                tag: "form",
                target: "_blank",
                css: "float:left;z-index:" + this._config.zindex,
                method: "post",
                child: {
                    tag: "ul",
                    css: "list-style:none;margin:0;padding:0;font-size:12px;font-family:Arial;color:#333333;",
                    child: [h, c, {
                        css: "float:left",
                        html: '<input type="text" style="width:96px;height:16px;padding:2px 0 0 4px;line-height:16px;border:1px solid #D0CECE;vertical-align:top;margin-right:5px;font-size:12px;color:' + this._config.blurColor + ";font-family:Arial;" + (this._config.showType ? "" : "margin-left:5px;") + '" value="' + g + '" class="' + a._cfg.cls.query + '" name="cl" autocomplete="off" maxlength="' + this._config.maxQuery + '" />'
                    }, {
                        css: "float:left;margin-right:15px;display:inline;padding-top:1px;_padding-top:2px;",
                        child: [{
                            tag: "input",
                            type: "submit",
                            css: "width:47px;border:0;cursor:pointer;background:transparent url(http://mat1.gtimg.com/finance/stock/images/smartbox-btn2.png) no-repeat scroll 0px 0px;vertical-align:top;font-size:12px;" + (__.ua.ie ? "height:19px;padding:3px 5px 0;" : "height:19px;padding:0 5px;"),
                            value: a._cfg.txt.check,
                            cls: a._cfg.cls.submit
                        }, {
                            tag: "span",
                            html: '<input type="hidden" name="ZHENGQUANDM"/>' + (this._config.showType ? "" : ('<input type="hidden" value="" name="qc_type" class="' + a._cfg.cls.type + '" />'))
                        }]
                    }, i]
                }
            }, f);
            f.style.height = "21px"
        }
        j = f = null
    }
    ;
    a.prototype._hlResize = function(d) {
        var c = this.queryIpt
          , b = this._getListCtn();
        b.style.left = __.dom.getPosition(c, "offsetLeft") + this._config.listXOffset + "px";
        b.style.top = (__.dom.getPosition(c, "offsetTop") + c.offsetHeight + 1) + "px";
        this.hide()
    }
    ;
    a.prototype._hlScroll = function(c) {
        var b = __.ua;
        if ((b.gecko || b.webkit) && c.target !== __.doc) {
            return
        }
        this.hide()
    }
    ;
    a.prototype._hlFocus = function(c) {
        var d = c.srcElement || c.target, b;
        if (d.value === this._config.inputHint) {
            d.value = ""
        }
        d.style.color = "#333333";
        if (this._config.autoSelect) {
            d.select()
        }
        if (this.status === a._cfg.status.HIDDEN && (this.isQueryChanged() || !this._config.autoSelect)) {
            this.show()
        }
    }
    ;
    a.prototype._hlBlur = function(b) {
        var c = b.srcElement || b.target;
        if (c.value === "") {
            c.style.color = this._config.blurColor;
            c.value = this._config.inputHint
        }
    }
    ;
    a.prototype._hlKeyup = function(b) {
        if (!__.lang.inArray(b.keyCode, [13, 27, 38, 40])) {
            __.lang.log("user key up : " + this.queryIpt.value);
            this._errQuery = false;
            this._sendRequest()
        }
    }
    ;
    a.prototype._hlKeydown = function(d) {
        var c, b = this.queryIpt;
        if (this.status === a._cfg.status.SHOWN && !this._errQuery) {
            switch (d.keyCode) {
            case 38:
                if (this.zeroList) {
                    return
                }
                if (!this.resultList) {
                    return
                }
                c = a._lastHoverLi && a._lastHoverLi.previousSibling ? a._lastHoverLi.previousSibling : this.resultList.lastChild;
                if (!__.dom.hasClass(c, a._cfg.cls.li)) {
                    c = c.previousSibling ? c.previousSibling : this.resultList.lastChild
                }
                a.setHover(c);
                __.event.stopEvent(d);
                break;
            case 40:
                if (this.zeroList) {
                    return
                }
                if (!this.resultList) {
                    return
                }
                c = a._lastHoverLi && a._lastHoverLi.nextSibling ? a._lastHoverLi.nextSibling : this.resultList.firstChild;
                if (!__.dom.hasClass(c, a._cfg.cls.li)) {
                    c = c.nextSibling ? c.nextSibling : this.resultList.firstChild
                }
                a.setHover(c);
                __.event.stopEvent(d);
                break;
            case 27:
                this.hide();
                break;
            case 13:
                this._enterPressed = true;
                break
            }
        } else {
            if (this.status === a._cfg.status.HIDDEN) {
                if (d.keyCode === 38 || d.keyCode === 40 || (b.value.length === 1 && b.value.charCodeAt(0) === d.keyCode) || (d.ctrlKey && d.keyCode === 86)) {
                    this.show()
                }
            }
        }
    }
    ;
    a.prototype._hlMouseover = function(c) {
        var b = c.relatedTarget ? c.relatedTarget : c.fromElement
          , d = c.target || c.srcElement;
        while (d && d !== __.doc.documentElement && d.className !== a._cfg.cls.li) {
            d = d.parentNode
        }
        if (d.className === a._cfg.cls.li) {
            a.setHover(d)
        }
    }
    ;
    a.prototype._hlDocClick = function(c) {
        var d = c.target || c.srcElement, b;
        if (d === this.subIpt) {
            return
        }
        if (d === this.queryIpt) {
            if (this.status === a._cfg.status.SHOWN && !this._errQuery && this._config.autoSelect && !this._listJustCreated) {
                this.hide()
            }
            if (this._config.autoSelect) {
                this.queryIpt.select()
            }
            this._listJustCreated = false;
            return
        }
        if (d.className === this.moreCls) {
            this._setForm();
            return
        }
        if (this.status !== a._cfg.status.SHOWN) {
            return
        }
        while (d && d !== __.doc.documentElement && d.className !== a._cfg.cls.li) {
            d = d.parentNode
        }
        if (d && d.className === a._cfg.cls.li) {
            b = d.id.split("~");
            this._onSelect(b, 1)
        }
        this.hide()
    }
    ;
    a.prototype.getResult = function() {
        if (this.zeroList) {
            return false
        }
        if (this._resultQT == __.lang.trim(this.queryIpt.value).toLowerCase() + "~" + this.typeIpt.value) {
            return this._resultIds
        }
        if (!this.resultList) {
            return false
        }
        var b = this._hasMatchRow()
          , c = this._config.directionUp ? this.resultList.lastChild : this.resultList.firstChild;
        if (!b && c) {
            b = c.id.split("~")
        }
        return b
    }
    ;
    a.prototype._hlSubmit = function(f) {
        var d, b, h, c = this, g = this._enterPressed ? 0 : 2;
        this._enterPressed = false;
        if (this._config.onsubmit2) {
            this._config.onsubmit2(f, a._lastHoverLi, this);
            return
        }
        if (!this.zeroList && !this.isQueryChanged()) {
            if (!this.resultList) {
                __.event.preventDefault(f);
                return false
            }
            h = this._config.directionUp ? this.resultList.lastChild : this.resultList.firstChild;
            if (g === 0) {
                if (this.status === a._cfg.status.SHOWN) {
                    if (a._lastHoverLi || h) {
                        b = (a._lastHoverLi || h).id.split("~");
                        this._onSelect(b, g);
                        this.hide()
                    }
                }
            } else {
                b = this._hasMatchRow();
                if (b) {
                    this._onSelect(b, g);
                    this.hide()
                } else {
                    b = h.id.split("~");
                    this._onSelect(b, g);
                    this.hide()
                }
            }
        } else {
            if (this._checkInput()) {
                if (!this.isQueryChanged()) {
                    if (this._config.onsubmit) {
                        this._config.onsubmit(this.queryIpt.value, this.typeIpt.value, f)
                    } else {
                        this._setForm(f)
                    }
                    return
                } else {
                    __.lang.log("b4show redefined");
                    this.b4Show = function() {
                        var e = c._config.directionUp ? c.resultList.lastChild : c.resultList.firstChild;
                        b = c._hasMatchRow();
                        if (b) {
                            c._onSelect(b, g);
                            c.hide()
                        } else {
                            if (!c.zeroList) {
                                b = e.id.split("~");
                                c._onSelect(b, g);
                                c.hide()
                            } else {
                                if (c._config.onsubmit) {
                                    c._config.onsubmit(c.queryIpt.value, c.typeIpt.value, f)
                                } else {
                                    c._setForm(f)
                                }
                            }
                        }
                        c.b4Show = false;
                        return false
                    }
                }
            }
        }
        __.event.preventDefault(f)
    }
    ;
    a.prototype.hide = function() {
        if (this.status === a._cfg.status.SHOWN) {
            __.lang.log("to hide");
            var c = this._getListCtn();
            c.style.visibility = "hidden";
            c.style.marginLeft = "-10000px";
            var b = c.getElementsByTagName("iframe");
            b.length && (b[0].style.display = "none");
            a.setHover(null );
            this.status = a._cfg.status.HIDDEN
        }
    }
    ;
    a.prototype.show = function(b, d) {
        if (b || !this.isQueryChanged()) {
            d = typeof d === "boolean" ? d : (this.showCount++ < this._config.adjustLimit);
            if (!this.b4Show || this.b4Show()) {
                var e = this._getListCtn(d);
                e.style.visibility = "visible";
                e.style.marginLeft = "";
                var c = e.getElementsByTagName("iframe");
                c.length && (c[0].style.display = "block");
                this.status = a._cfg.status.SHOWN
            }
        } else {
            __.lang.log("send from show");
            this._sendRequest()
        }
    }
    ;
    a.prototype.isQueryChanged = function() {
        return ( this.listQT !== __.lang.trim(this.queryIpt.value).toLowerCase() + "~" + this.typeIpt.value)
    }
    ;
    a.prototype._onSelect = function(d, b) {
        var c;
        this._resultQT = this.listQT;
        this._resultIds = d;
        if (this._config.sendToBoss) {
            c = ["http://btrace.qq.com/collect?sIp=", "&iQQ=", (__.cookie.get("o_cookie") || "0"), "&sBiz=finance.stock.smartbox", "&sOp=browse&iSta=0&iTy=179&iFlow=", (new Date()) % 100000000, "&sInput=", encodeURIComponent(this.queryIpt.value), "&sSubmit=", (b === 0 ? "enter" : (b === 1 ? "click" : "button")), "&sMarket=", encodeURIComponent(this.typeIpt.value.toLowerCase()), "&sCode=", encodeURIComponent(__.fnTable.mapNumMarket[d[2]] + d[1]), "&sName=", encodeURIComponent(d[4]), "&sRefer=", encodeURIComponent((location.host + location.pathname).substr(0, 200))].join("");
            this._bossImg = new Image();
            this._bossImg.src = c
        }
        this._config.onclick(d)
    }
    ;
    a.prototype._initEls = function() {
        var e, d, c, b = a._cfg.cls, f = "#" + this.containerId + " .";
        if (!this._config.attach) {
            this.queryIpt = __.dom.f(f + b.query);
            this.subIpt = __.dom.f(f + b.submit);
            this.form = __.dom.f("#" + this.containerId + " form");
            if (this._config.showType) {
                e = {};
                c = a._cfg.txt;
                __.each(a._cfg.typeEnum, function(g) {
                    e[g] = c[g]
                });
                this.typeIpt = new __.widget.Select(a._cfg.selectIdPrefix + this.containerId,{
                    items: e,
                    defaultValue: this._config.defaultType,
                    fontsize: 12,
                    name: "qc_type"
                })
            } else {
                this.typeIpt = __.dom.f(f + b.type);
                this.typeIpt.value = this._config.defaultType
            }
        } else {
            d = this._config.attach;
            this.form = d.form;
            this.queryIpt = d.query;
            this.subIpt = d.submit;
            this.typeIpt = d.type;
            if (this._config.preFill) {
                this.queryIpt.value = this._config.preFill
            }
            this.typeIpt.value = this._config.defaultType
        }
        this.queryIpt.onfocus = null
    }
    ;
    a.prototype._initEvents = function() {
        var d = this.queryIpt, c = this, f = __.event, e = f.bind, b;
        b = [e(c._hlFocus, c), e(c._hlBlur, c), e(c._hlKeyup, c), e(c._hlKeydown, c), e(c._hlMouseover, c), e(c._hlDocClick, c), e(c._hlSubmit, c), e(c._hlResize, c), e(c._hlScroll, c)];
        f.on(d, "focus", b[0]);
        f.on(d, "blur", b[1]);
        f.on(d, "keyup", b[2]);
        f.on(d, "keydown", b[3]);
        f.on(this._getListCtn(), "mouseover", b[4]);
        f.on(__.doc, "click", b[5]);
        f.on(c.form, "submit", b[6]);
        f.on(__.global, "resize", b[7], true);
        f.on(__.global, "scroll", b[8], true);
        f.on(this.typeIpt, "change", b[2]);
        c._fns = b;
        d = null ;
        c = null
    }
    ;
    a.prototype._hasMatchRow = function() {
        if (!this.resultList) {
            return false
        }
        var d, e = this.queryIpt.value, c = this.resultList.childNodes, b = false;
        if (!this.zeroList) {
            if (c.length === 1) {
                d = 0
            } else {
                d = __.lang.find(c, function(g) {
                    if (!g.id) {
                        return false
                    }
                    var f = g.id.split("~")[1];
                    f = f && f.split(".")[0];
                    return f === e
                })
            }
            if (d !== -1) {
                b = c[d].id.split("~")
            }
        }
        return b
    }
    ;
    a.prototype._checkInput = function() {
        var b = a._cfg.txt.errHint
          , c = this.queryIpt.value;
        c = c.replace(__.lang.getReg("\\s", "gi"), "");
        if (c === "" || c === this._config.inputHint) {
            b = a._cfg.txt.emptyHint
        } else {
            if (__.lang.getReg("^[\\*\\/0-9a-zA-Z\\u4e00-\\u9fa5]+$").test(c) && !__.lang.getReg("[\\\\\\/<>#\\$&]").test(c)) {
                b = true
            }
        }
        if (b !== true) {
            this._showError(b)
        }
        return b === true
    }
    ;
    a.prototype._showError = function(b) {
        if (!this.resultList) {
            return
        }
        b = b || a._cfg.txt.errHint;
        this.resultList.innerHTML = "";
        __.dom.addEl({
            tag: "li",
            css: "padding:5px 0 5px 7px;line-height:15px;",
            html: b
        }, this.resultList);
        this.show(true)
    }
    ;
    a.prototype._setForm = function(c) {
        if (c) {
            __.event.stopEvent(c)
        }
        var b = "http://stock.finance.qq.com/sstock/search.php?c=utf8&t=all&q=" + encodeURIComponent(this.queryIpt.value.split(".")[0]);
        __.global.open(b, "_blank")
    }
    ;
    a.prototype.disposeInternal = function() {
        var d = this.queryIpt
          , c = this._fns
          , b = null
          , e = this
          , f = __.event;
        a._super.disposeInternal.call(this);
        f.off(d, "focus", c[0]);
        f.off(d, "blur", c[1]);
        f.off(d, "keyup", c[2]);
        f.off(d, "keydown", c[3]);
        f.off(this._getListCtn(), "mouseover", c[4]);
        f.off(__.doc, "click", c[5]);
        f.off(e.form, "submit", c[6]);
        f.off(__.global, "resize", c[7], true);
        f.off(__.global, "scroll", c[8], true);
        f.off(this.typeIpt, "change", c[2]);
        e._fns = b;
        e.form = b;
        e.queryIpt = b;
        e.subIpt = b;
        e.typeIpt = b;
        d = e._config;
        d.dataScope = b;
        d.onclick = b;
        d.onsubmit = b;
        d.onsubmit2 = b
    }
});
/*  |xGv00|430e669d1ebb9f6d871b1bbd877180d8 */
