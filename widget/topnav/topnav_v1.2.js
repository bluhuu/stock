__.BasicModule.register("widget.topnav:topnav_v1.2", "0.0.0", ["widget", "dom", "event", "fn-smartbox", "anim"], function() {
    __.widget.TopNav = function(a, b) {
        __.widget.Base.call(this);
        if (this.dom = __.dom.f(a)) {
            this.config = b || {};
            this.config.preFill = this.config.preFill || __.widget.TopNav.defConfig.preFill;
            __.extend(this.config, __.widget.TopNav.defConfig, false);
            this._prepareEls();
            this._loadData()
        }
    }
    ;
    __.inherits(__.widget.TopNav, __.widget.Base);
    __.widget.TopNav.defConfig = {
        useSelf: true,
        autoFocus: true,
        preFill: "\u4ee3\u7801/\u540d\u79f0/\u62fc\u97f3",
        indexNames: ['<a boss="6016" href="http://gu.qq.com/sh000001" title="\u4e0a\u8bc1\u6307\u6570:(000001)" target="_self">\u4e0a\u8bc1\u6307\u6570:</a>', '<a boss="6040" href="http://gu.qq.com/sz399001" title="\u6df1\u8bc1\u6210\u6307:(399001)" target="_self">\u6df1\u8bc1\u6210\u6307:</a>', '<a boss="6015" href="http://gu.qq.com/hkHSI" title="\u6052\u751f\u6307\u6570:(HSI)" target="_self">\u6052\u751f\u6307\u6570:</a>', '<a boss="6038" href="http://gu.qq.com/usDJI" title="\u9053\u743c\u65af:(DJI)" target="_self">\u9053\u743c\u65af:</a>', '<a boss="6039" href="http://gu.qq.com/usIXIC" title="\u7eb3\u65af\u8fbe\u514b:(IXIC)" target="_self">\u7eb3\u65af\u8fbe\u514b:</a>', "\u6cd5\u56fdCAC:", "\u5fb7\u56fdDAX:", "\u65e5\u7ecf225:", "\u6d77\u5ce1\u65f6\u62a5:", "\u53f0\u6e7e\u52a0\u6743\u6307\u6570:", "\u9ec4\u91d1:", "\u77f3\u6cb9:"],
        indexKeys: ["s_sh000001", "s_sz399001", "s_r_hkHSI", "s_usDJI", "s_usIXIC", "gzFCHI", "gzGDAXI", "gzN225", "gzFTSTI", "gzTWII", "fqUS_GC_1", "fqUS_CL_1"],
        indexCfg: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    };
    __.widget.TopNav.prototype.html = '<span class="first"></span>\t<div class="center">\t\t<div  id="top-smartbox-ctn">\t\t<form target="_blank" method="post">\t\t\t<input type="text" maxlength="11" autocomplete="off" class="nav-smartbox-query fl" name="cl" style="color:#B4B3B3;">\t\t\t<div class="nav-smartbox-ctn fl">\t\t\t  <div class="nav-smartbox-cnt-box"></div>\t\t\t  <input type="hidden" class="nav-smartbox-input" name="qc_type" value="ALL">\t\t\t</div>\t\t\t<input type="submit" value="\u80a1\u7968\u67e5\u8be2" name="submitbtn" class="nav-smartbox-submit" boss="6013">\t\t\t<a href="http://stockapp.finance.qq.com/pstock/" target="_blank" class="istock" boss="6014">\u6211\u7684\u81ea\u9009\u80a1</a>\t\t\t<span id="div-msg-box-num" boss="6023"></span>\t\t\t<input type="hidden" name="ZHENGQUANDM">\t\t</form>\t\t</div>\t</div>\t<span class="cutline"></span>\t<div id="stock_box1">\t\t<div title="\u70b9\u51fb\u5411\u4e0a\u6eda\u52a8" id="arr_up" boss="6017"></div>\t\t<div title="\u70b9\u51fb\u5411\u4e0b\u6eda\u52a8" id="arr_do" boss="6018"></div>\t\t<div id="word"></div>\t</div>\t<span class="last"></span>  ';
    __.widget.TopNav.prototype._prepareEls = function() {
        var a = this;
        this.dom.innerHTML = this.html;
        this.select = new __.widget.Select(__.dom.f(".nav-smartbox-cnt-box"),{
            items: {
                ALL: "\u5168\u90e8",
                GP: "\u6caa\u6df1",
                HK: "\u6e2f\u80a1",
                JJ: "\u57fa\u91d1",
                AS: "\u7f8e\u80a1",
                FT: "\u671f\u8d27"
            },
            defaultValue: "ALL",
            fontsize: 14,
            height: 25,
            width: 59,
            lineHeight: 18,
            borderColor: "transparent",
            bgColor: "transparent",
            bgActive: "-142px -30px",
            bgNormal: "-142px -30px",
            bgSrc: "http://mat1.gtimg.com/finance/png/st/p/hqhk_gg/mainnav_v1.1/sprite-2_v20111121142445.png",
            onChange: function(f) {
                __.dom.f(".nav-smartbox-input").value = f
            }
        });
        __.dom.$(".du-select-ctn div")[1].style.borderWidth = "0";
        this.smartbox = new __.widget.SmartBox("top-smartbox-ctn",{
            useSelf: this.config.useSelf === false ? false : true,
            autoFocus: this.config.autoFocus === false ? false : true,
            preFill: this.config.preFill,
            attach: {
                form: __.dom.f("#top-smartbox-ctn form"),
                type: __.dom.f(".nav-smartbox-input"),
                query: __.dom.f(".nav-smartbox-query"),
                submit: __.dom.f(".nav-smartbox-submit")
            },
            iframeMask: true
        });
        __.dom.f("top-smartbox-ctn-du-sx-result").style.zIndex = 3;
        var b = this.config.indexNames, d = this.config.indexCfg, e = [], c, g;
        for (c = 0; c < d.length; c++) {
            g = d[c];
            e.push(c % 2 === 0 ? "<p>" : "| ", b[g], "<span>--</span><span>--</span><span></span>", c % 2 === 0 ? "" : "</p>")
        }
        __.dom.f("word").innerHTML = e.join("") + e.join("");
        this.start = this.current = 0;
        this.rows = Math.ceil(d.length / 2);
        this.rowHeight = 29;
        __.event.on("arr_up", "click", function() {
            a.scroll(true)
        });
        __.event.on("arr_do", "click", function() {
            a.scroll(false)
        });
        this.indexSpan = {};
        b = __.dom.$("span", __.dom.f("word"));
        for (c = 0; c < d.length; c++) {
            g = d[c];
            this.indexSpan[this.config.indexKeys[g]] = [[b[c * 3], b[c * 3 + 1], b[c * 3 + 2]], [b[c * 3 + 6 * this.rows], b[c * 3 + 1 + 6 * this.rows], b[c * 3 + 2 + 6 * this.rows]]]
        }
    }
    ;
    __.widget.TopNav.prototype._loadData = function() {
        var a = this;
        __.widget.TopNav.loadMsgNum(function(b) {
            a._setMsgData(b)
        });
        a._loadIndex()
    }
    ;
    __.widget.TopNav.prototype._loadIndex = function() {
        var a = this;
        if (a._loadIndexTimer) {
            clearTimeout(a._loadIndexTimer);
            a._loadIndexTimer = null
        }
        if (!a._indexQtKey)
            a._indexQtKey = a.config.indexKeys.join(",");
        a._indexQtKeyPre = a._indexQtKey;
        __.fnTable.load(a._indexQtKey, function() {
            var b = {};
            __.each(a._indexQtKey.split(","), function(d) {
                if (__.global["v_" + d])
                    b[d] = __.global["v_" + d].split("~")
            });
            a._fillIndex(b)
        });
        a._loadIndexTimer = setTimeout(function() {
            a._loadIndex()
        }, 5E3)
    }
    ;
    var k = [/^(t_)?s_((sh)|(sz)|((r_)?hk)|(us))/, /^gz/, /^s_((sh)|(sz)|((r_)?hk))/];
    __.widget.TopNav.prototype._fillIndex = function(a) {
        var b = this, d, e = ["--", "--", ""], c = __.fnTable.process, g = __.fnTable.processors, f;
        __.each(a, function(h, j) {
            e = ["--", "--", ""];
            d = b.indexSpan[j];
            if (k[0].test(j)) {
                e[0] = c("S_PRICE", h);
                e[1] = c("S_PERCENT", h)
            } else if (k[1].test(j)) {
                e[0] = c("S_PRICE", h);
                e[1] = c("S_PERCENT", h)
            } else {
                e[0] = c(function(i) {
                    return g.GET_COLOR(i[5].replace(/[,+]/g, ""), i[6].replace(/[,+]/g, ""))
                }, h);
                e[1] = c(function(i) {
                    var l = i[6].replace(/[,+]/g, "") * 100 / (i[5].replace(/[,+]/g, "") - i[6].replace(/[,+]/g, ""));
                    return g.GET_COLOR(l.toFixed(2) + "%", i[6].replace(/[,+]/g, ""))
                }, h)
            }
            if (k[2].test(j))
                e[2] = (h["7"] / 1E4).toFixed(0) + (j.substr(0, 6) == "s_r_hk" ? "\u4ebf\u6e2f\u5143" : "\u4ebf\u5143");
            for (f = 0; f < 3; f++) {
                d[0][f].innerHTML = e[f];
                d[1][f].innerHTML = e[f]
            }
        }, true);
        b._indexQtKey = b.config.indexKeys[b.config.indexCfg[b.current * 2]] + "," + b.config.indexKeys[b.config.indexCfg[b.current * 2 + 1]]
    }
    ;
    __.widget.TopNav.prototype._setMsgData = function(a) {
        var b = __.dom.f("div-msg-box-num");
        if (b) {
            var d = this;
            if (a && a.data && a.data.total_num) {
                b.innerHTML = ['<div style="position:relative;width:52px;height:20px;line-height:20px;z-index:2;"> <span>   <a target="_blank" style="width:52px;display:block;cursor:pointer;" href="http://stockapp.finance.qq.com/pstock/msgbox.php">   <span style="background:url(http://mat1.gtimg.com/finance/images/stock/p/hqhk_gg/mainnav_v1.1/icon.png) no-repeat;width:14px;height:13px;float:left;margin:3px 2px;"></span>   <span style="float:left;color:#d70300">(<span style="font-weight:bold;">', a.data.total_num[1] > 99 ? 99 : a.data.total_num[1], '</span>)</span>   </a> </span> <div style="text-align:left;width:177px;line-height:18px;border:1px solid #FDD66F;background-color:#FFF8C1;padding: 3px 10px; z-index:3;position:absolute;top:20px;left:20px;display:none;"></div></div>'].join("");
                var e = b.getElementsByTagName("a")[0]
                  , c = b.getElementsByTagName("div")[1];
                if (a.data.total_num[1] <= 0) {
                    c.innerHTML = "\u6682\u65e0\u672a\u8bfb\u6d88\u606f\uff0c\u70b9\u51fb\u67e5\u770b\u5386\u53f2\u6d88\u606f";
                    c.style.width = "180px"
                } else {
                    c.innerHTML = ["\u80a1\u4ef7\u6d88\u606f(", a.data.stock_num[1] > 99 ? 99 : a.data.stock_num[1], ")<br>\u8d44\u8baf\u6d88\u606f(", a.data.info_num[1] > 99 ? 99 : a.data.info_num[1], ")<br>\u51c0\u503c\u6d88\u606f(", a.data.fund_num[1] > 99 ? 99 : a.data.fund_num[1], ")<br>\u7279\u8272\u6d88\u606f(", a.data.special_num[1] > 99 ? 99 : a.data.special_num[1], ")<br>"].join("");
                    c.style.width = "72px"
                }
                e.onmouseover = function() {
                    c.style.display = "block"
                }
                ;
                e.onmouseout = function() {
                    c.style.display = "none"
                }
                ;
                e.onclick = function() {
                    setTimeout(function() {
                        a.data.total_num[1] = 0;
                        d._setMsgData(a)
                    }, 100)
                }
            } else
                b.innerHTML = ""
        }
    }
    ;
    __.widget.TopNav.loadMsgNum = function(a) {
        var b = document.cookie.match(/l?uin=o(\d+)/);
        if (b = b && b[1]) {
            b = b.replace(/^0*/, "");
            __.set("__.app.Stockdiy.data.mbox");
            __.load("http://message.finance.qq.com/tips/get_msg_num.php?uid=" + b + "&name=pstock", function() {
                typeof a == "function" && a(__.app.Stockdiy.data.mbox.msgnum)
            })
        } else
            typeof a == "function" && a(false)
    }
    ;
    __.widget.TopNav.prototype.scroll = function(a) {
        var b, d = this;
        if (!this._isrunning) {
            if (d._indexQtKeyPre.split(",").length < d.config.indexKeys.length) {
                d._indexQtKey = "";
                d._loadIndex()
            } else
                d._indexQtKey = "";
            a = !!a;
            b = __.dom.f("word");
            if (a) {
                if (this.current < 0) {
                    this.current = this.rows;
                    b.scrollTop = this.rowHeight * this.current
                }
                this.current--
            } else {
                if (this.current > this.rows) {
                    this.current = 0;
                    b.scrollTop = 0
                }
                this.current++
            }
            a = new __.Anim(b,"scrollTop",{
                to: b.scrollTop + (a ? -this.rowHeight : this.rowHeight),
                isStyle: false,
                onOver: function() {
                    d._isrunning = false
                }
            });
            d._isrunning = true;
            a.run()
        }
    }
    ;
    __.widget.TopNav.prototype.disposeInternal = function() {
        __.widget.TopNav._super.disposeInternal.call(this);
        this.select.dispose();
        this.smartbox.dispose();
        this._loadIndexTimer && clearTimeout(this._loadIndexTimer);
        if (this.dom)
            this.dom.innerHTML = "";
        this.select = this.smartbox = this._loadIndexTimer = this.dom = null
    }
});
/*  |xGv00|da811b3b4831f81e6dc3dab158edca5f */
