define("SNB.tooltip.js", ["SNB.atDialog", "SNB.dialog", "tooltip.jade.js", "profile-tooltip.jade.js", "stock-tooltip.jade.js"], function(e) {
    SNB.data.profiles = SNB.data.profiles || {}, SNB.data.quotes = SNB.data.quotes || {}, e("./SNB.atDialog.js"), e("./SNB.dialog.js"), $("body>.temp").findOrAppend(">.profileTooltip", e("./tooltip.jade"));
    var a = $("body"),
        t = $(".temp > .tooltip"),
        s = t.find(".tooltip-inner"),
        o = function(a) {
            return a && (a.verified_description && (a.verified_description = SNB.Util.splitWordWithElipse(a.verified_description, 42)), a.description && (a.description = SNB.Util.splitWordWithElipse(a.description, 44))), e("./profile-tooltip.jade")({
                profile: a,
                domain: SNB.domain
            })
        },
        i = function(a) {
            return e("./stock-tooltip.jade")({
                quote: a,
                domain: SNB.domain
            })
        },
        r = function(e, a) {
            return e.symbol && a.find(".exchange").click(function() {
                var a = SNB.dialog.performanceDialog({
                    stock: e,
                    type: 1,
                    callback: function() {
                        var e = '添加成功，可到<a href="/performance" target="_blank">持仓盈亏</a>&nbsp;查看所有记录';
                        SNB.Util.stateDialog(e, 3e3, void 0, void 0, 300)
                    }
                });
                a.dialog({
                    modal: !0,
                    width: "360px",
                    title: "新增交易"
                })
            }), a.data("listened") ? !1 : (a.data("listened", !0), void a.delegate(".relations a", "click", function(e) {
                var t = $(this),
                    s = "",
                    o = "";
                if (t.hasClass("removeStock")) {
                    s = t.attr("data-id"), o = SNB.data.quotes[s];
                    var i = SNB.dialog.deleteStockDialog(o, function() {
                        SNB.data.quotes[s].following = !1, SNB.Util.stateDialog("取消关注成功", 400)
                    }, "全部", "");
                    i.dialog({
                        title: "删除自选股"
                    })
                } else if (t.hasClass("foStock")) s = t.attr("data-id"), SNB.Util.checkLogin(function() {
                    SNB.dialog.addStock(SNB.data.quotes[s], function() {
                        SNB.data.quotes[s].following = !0
                    })
                }, e);
                else if (t.hasClass("removeFriend")) SNB.Util.checkLogin(function() {
                    SNB.Util.confirmDialog("确定取消关注吗？", function() {
                        SNB.Util.removeFriend(t.attr("data-id"), function() {
                            SNB.Util.stateDialog("取消关注成功", 400), SNB.data.profiles[t.data("name")].following = !1
                        })
                    }).dialog({
                        modal: !0,
                        width: 200,
                        minHeight: 50,
                        position: [e.clientX - 95, e.clientY - 110]
                    }).siblings(".ui-dialog-titlebar").remove()
                }, e);
                else if (t.hasClass("foFriend")) SNB.Util.checkLogin(function() {
                    var e = {
                        id: t.data("id"),
                        name: t.data("name")
                    };
                    SNB.Util.addFriend(e, function() {
                        var e = SNB.data.profiles[t.data("name")];
                        return SNB.data.profiles[t.data("name")].following = !0, a.find(".relations").html(e.follow_me ? '<span class="interfollow"><s></s>互相关注&nbsp;|&nbsp;</span><a data-id="' + e.id + '" class="removeFriend">取消</a>' : '<span class="onefollow"><s></s>已关注&nbsp;|&nbsp;</span><a data-id="' + e.id + '" class="removeFriend">取消</a>'), a.find(".relations").append('<a data-id="' + e.id + '" data-name="' + e.screen_name + '" class="groupUser">分组</a>'), !1
                    })
                }, e);
                else {
                    if (t.hasClass("groupUser")) {
                        var r = SNB.dialog.userGroup({
                            name: t.data("name"),
                            id: t.data("id")
                        });
                        return r && r.dialog({
                            title: "用户分组",
                            width: "auto",
                            modal: !0
                        }), !1
                    }
                    t.hasClass("groupStock") && (s = t.attr("data-id"), o = SNB.data.quotes[s], o.isEdit = !0, SNB.Util.checkLogin(function() {
                        SNB.dialog.addStock(o, $.noop)
                    }, e))
                }
            }))
        },
        n = "#center a, #stockChartFullscreen a, .ui-dialog a, #container a";
    a.delegate(n, "mouseenter", function(e) {
        if (SNB.currentUser.isGuest || $(e.currentTarget).hasClass("noToolTip")) return !1;
        var a = $(e.currentTarget),
            n = a.attr("href"),
            l = !1,
            p = !1,
            u = "",
            d = "";
        n = n && n.replace(/^http:\/\/xueqiu.com/, "");
        var f = n && n.split("/");
        if (!f) return !1;
        f.shift();
        var c = a.data("name") || "n" === f[0];
        if (c) {
            if (l = !0, u = a.data("name") || decodeURIComponent(f[1].split("?")[0]), "visible" == t.css("visibility") && t.data("screen_name") == u) return !1;
            if (u == SNB.currentUser.screen_name) return !1;
            t.data("screen_name", u), a.data("profile", !0)
        }
        var h = a.data("symbol");
        if (!h && 2 === f.length) {
            var b = f[0].toUpperCase(),
                m = f[1].toUpperCase();
            _.indexOf(["S", "P"], b) > -1 && m && "?" !== m[0] && (h = !0, "P" === b && (h = "投资组合" === SNB.Util.getStockInfo(m).bigType))
        }
        if (h) {
            if (p = !0, d = f[1] || a.data("symbol"), "visible" == t.css("visibility") && t.data("symbol") == d) return !1;
            t.data("symbol", d), a.data("stock", !0)
        }
        return l || p ? (l && p && (l = !1), clearTimeout(a.data("timeout")), a.data("hoverState", "in"), void a.data("timeout", setTimeout(function() {
            if ("in" == a.data("hoverState")) {
                var n, p = a.offset(),
                    f = t[0].offsetHeight,
                    c = {
                        top: p.top - f + 4,
                        left: p.left
                    };
                p.top - $(document).scrollTop() < f + 41 && (c.top = p.top + a[0].offsetHeight, n = "above", t.addClass("above")), a.height() > 20 && (e.offsetY < 20 ? (c.left += a.width() - 40, "above" === n && (c.top -= 17)) : "above" != n && (c.top += 17)), p.left + t.width() > $(window).width() && (c.left = p.left - t.width() + 50, t.addClass("right"));
                var h = function() {
                        return a.closest(".ui-dialog").length
                    },
                    b = function() {
                        return h() ? $.ui.dialog.maxZ + 1 : 1e3
                    };
                l ? SNB.data.profiles[u] ? (s.html(o(SNB.data.profiles[u])), t.css("z-index", b()), r(SNB.data.profiles[u], s)) : (s.html(o()), console.log(""), SNB.get("/user/show.json?id=" + encodeURIComponent(u), function(e) {
                    var i = e.profile_image_url && e.profile_image_url.split(",");
                    e.profile_image_url = i && i.length >= 3 ? i[2] : "community/default/avatar.png!50x50.png", ("不限" == e.city || "其他" == e.province) && (e.city = ""), e.defaulttext = a.data("defaulttext") || "", SNB.data.profiles[e.screen_name] = e, s.html(o(e)), t.css("z-index", b()), r(e, s)
                }, function(e) {
                    return 21702 == e.error_code ? (s.find(".load").html("没有找到这个用户"), !1) : void 0
                })) : (s.html(i()), SNB.get("/stock/quote.json", {
                    code: d
                }, function(e) {
                    var a = e.quotes;
                    if (a && a.length) {
                        e = $.extend(e, a[0]), e.money = SNB.Util.getStockInfo(e.symbol).money, e.percentage > 0 ? (e.updown = "stock_up", e.change = "+" + e.change, e.percentage = "+" + e.percentage) : e.percentage < 0 && (e.updown = "stock_down");
                        var t = SNB.Util.getStockInfo(e.symbol);
                        "美股" == t.bigType && (e.bigType = "美股", e.beforeAfter = SNB.Util.getBeforeAfterTrade(e), e.afterHoursPct > 0 ? (e.afterHourUpdown = "stock_up", e.afterHoursChg = "+" + e.afterHoursChg, e.afterHoursPct = "+" + e.afterHoursPct) : e.afterHoursPct < 0 && (e.afterHourUpdown = "stock_down")), "回购" == t.type && (e.current = parseFloat(e.current).toFixed(3)), "货币基金" == t.bigType && (e.isMF = !0, e.pe_ttm += "%"), "信托产品" == t.bigType && (e.isTP = !0), "理财产品" == t.bigType && (e.isFP = !0), "私募基金" == t.bigType && (e.isPF = !0), e.url = "/S/" + e.symbol, "投资组合" === t.bigType && (e.isZH = !0, e.url = "/P/" + e.symbol), e.splitName = SNB.Util.splitWord(e.name, 10), e.splitName.length !== e.name.length && (e.splitName += "..."), e.percentage += "%", e.afterHoursPct += "%", s.html(i(e))
                    }
                    if (SNB.data.quotes[d]) e = $.extend({}, SNB.data.quotes[d], e), SNB.data.quotes[d] = e, s.html(i(e)), r(e, s);
                    else {
                        var o = (SNB.Util.getAccessToken(), SNB.currentUser.id);
                        $.getJSON("/service/stockfollows", {
                            symbol: d,
                            uid: o
                        }, function(a) {
                            e = $.extend({}, a, e), SNB.data.quotes[d] = e, s.html(i(e)), r(e, s)
                        })
                    }
                })), t.css(c).css("visibility", "visible")
            }
        }, "600"))) : !1
    }).delegate(n, "mouseleave", function(e) {
        var a = $(e.currentTarget);
        return a.data("profile") || a.data("stock") ? (clearTimeout(a.data("l_timeout")), void a.data("l_timeout", setTimeout(function() {
            return t.hasClass("hover") ? !1 : (t.css("visibility", "hidden"), t.removeClass("above myself right"), void a.data("hoverState", ""))
        }, "200"))) : !1
    }).delegate(n, "click", function(e) {
        var a = $(e.currentTarget);
        (a.data("profile") || a.data("stock")) && (clearTimeout(a.data("l_timeout")), a.data("l_timeout", setTimeout(function() {
            return t.hasClass("hover") ? !1 : (t.css("visibility", "hidden"), t.removeClass("above myself right"), void a.data("hoverState", ""))
        }, "200")))
    }), t.on("mouseleave", function() {
        t.css("visibility", "hidden").removeClass("hover above myself right")
    }).on("mouseenter", function() {
        t.addClass("hover")
    })
}), define("tooltip.jade.js", function(require, exports, module) {
    function anonymous(locals, attrs, escape, rethrow, merge) {
        attrs = attrs || jade.attrs, escape = escape || jade.escape, rethrow = rethrow || jade.rethrow, merge = merge || jade.merge;
        var buf = [];
        with(locals || {}) {
            buf.push('<div class="tooltip"><div class="tooltip-arrow above"><div class="tooltip-arrow-in"></div><div class="tooltip-arrow-out"></div></div><div class="tooltip-alpha"></div><div class="tooltip-inner"></div><div class="tooltip-arrow below"><div class="tooltip-arrow-out"></div><div class="tooltip-arrow-in"></div></div></div>')
        }
        return buf.join("")
    }
    module.exports = anonymous
}), define("profile-tooltip.jade.js", function(require, exports, module) {
    function anonymous(locals, attrs, escape, rethrow, merge) {
        attrs = attrs || jade.attrs, escape = escape || jade.escape, rethrow = rethrow || jade.rethrow, merge = merge || jade.merge;
        var buf = [];
        with(locals || {}) {
            var interp;
            if (profile) {
                var domain_host = domain.host;
                buf.push('<div class="info"><div class="card"><div class="headpic"><a'), buf.push(attrs({
                    href: domain_host + profile.profile,
                    target: "_blank"
                }, {
                    href: !0,
                    target: !0
                })), buf.push("><img"), buf.push(attrs({
                    src: "//xavatar.imedao.com/" + profile.profile_image_url,
                    alt: profile.screen_name,
                    width: "50px",
                    height: "50px"
                }, {
                    src: !0,
                    alt: !0,
                    width: !0,
                    height: !0
                })), buf.push('/></a></div><div class="content"><div><a'), buf.push(attrs({
                    href: domain_host + profile.profile,
                    target: "_blank"
                }, {
                    href: !0,
                    target: !0
                })), buf.push(">");
                var __val__ = profile.screen_name;
                if (buf.push(escape(null == __val__ ? "" : __val__)), buf.push("</a>"), profile.following && (buf.push("<a"), buf.push(attrs({
                        href: "#",
                        "data-user-name": profile.screen_name,
                        "data-user-id": profile.id,
                        "data-user-remark": profile.remark,
                        "class": profile.remark ? "user_remark" : "setRemark"
                    }, {
                        "class": !0,
                        href: !0,
                        "data-user-name": !0,
                        "data-user-id": !0,
                        "data-user-remark": !0
                    })), buf.push(">(" + escape(null == (interp = profile.remark || "备注") ? "" : interp) + ")</a>")), profile.verified) {
                    var verified_img = profile.verified_type || 1;
                    buf.push("<img"), buf.push(attrs({
                        src: "//assets.imedao.com/images/vipicon_" + verified_img + ".png",
                        alt: profile.verified_description,
                        "class": "vipicon"
                    }, {
                        src: !0,
                        alt: !0
                    })), buf.push("/>")
                }
                if (buf.push("</div><div>"), buf.push("f" == profile.gender ? '<span class="f head">&nbsp;&nbsp;&nbsp;</span>女' : "m" == profile.gender ? '<span class="m head">&nbsp;&nbsp;&nbsp;</span>男' : '<span class="m head">&nbsp;&nbsp;&nbsp;</span>保密'), "其他" !== profile.province && "省/直辖市" !== profile.province && buf.push("，" + escape(null == (interp = profile.province) ? "" : interp)), "其他" !== profile.city && "不限" !== profile.city && "城市/地区" !== profile.city && buf.push("" + escape(null == (interp = profile.city) ? "" : interp)), buf.push("</div><div><span>股票&nbsp;<a href='" + escape(null == (interp = domain_host) ? "" : interp) + escape(null == (interp = profile.profile) ? "" : interp) + "#portfolioTab' target='_blank'>" + escape(null == (interp = profile.stocks_count) ? "" : interp) + "</a>&nbsp;&nbsp;&nbsp;</span><span>讨论&nbsp;<a href='" + escape(null == (interp = domain_host) ? "" : interp) + escape(null == (interp = profile.profile) ? "" : interp) + "' target='_blank'>" + escape(null == (interp = profile.status_count) ? "" : interp) + "</a>&nbsp;&nbsp;&nbsp;</span><span>粉丝&nbsp;<a href='" + escape(null == (interp = domain_host) ? "" : interp) + escape(null == (interp = profile.profile) ? "" : interp) + "/followers' target='_blank'>" + escape(null == (interp = profile.followers_count) ? "" : interp) + '</a></span></div></div></div><div class="desc">'), profile.verified_description) {
                    buf.push("<label>认证信息：</label><span>");
                    var __val__ = profile.verified_description;
                    buf.push(escape(null == __val__ ? "" : __val__)), buf.push("</span>")
                } else if (profile.description) {
                    buf.push("<label>简介：</label><span>");
                    var __val__ = profile.description;
                    buf.push(null == __val__ ? "" : __val__), buf.push("</span>")
                }
                buf.push('</div></div><div class="operations"><div class="relations">'), profile.follow_me ? profile.following ? (buf.push('<span class="interfollow"> <s></s>互相关注&nbsp;|&nbsp;</span><a'), buf.push(attrs({
                    "data-id": "" + profile.id,
                    "data-name": "" + profile.screen_name,
                    "class": "removeFriend"
                }, {
                    "data-id": !0,
                    "data-name": !0
                })), buf.push(">取消</a><a"), buf.push(attrs({
                    "data-id": "" + profile.id,
                    "data-name": "" + profile.screen_name,
                    "class": "groupUser"
                }, {
                    "data-id": !0,
                    "data-name": !0
                })), buf.push(">分组</a>")) : (buf.push("<a"), buf.push(attrs({
                    "data-id": "" + profile.id,
                    "data-name": "" + profile.screen_name,
                    "class": "foFriend"
                }, {
                    "data-id": !0,
                    "data-name": !0
                })), buf.push(">加关注</a>")) : profile.following ? (buf.push('<span class="onefollow"><s></s>已关注&nbsp;|&nbsp;</span><a'), buf.push(attrs({
                    "data-id": "" + profile.id,
                    "data-name": "" + profile.screen_name,
                    "class": "removeFriend"
                }, {
                    "data-id": !0,
                    "data-name": !0
                })), buf.push(">取消</a><a"), buf.push(attrs({
                    "data-id": "" + profile.id,
                    "data-name": "" + profile.screen_name,
                    "class": "groupUser"
                }, {
                    "data-id": !0,
                    "data-name": !0
                })), buf.push(">分组</a>")) : (buf.push("<a"), buf.push(attrs({
                    "data-id": "" + profile.id,
                    "data-name": "" + profile.screen_name,
                    "class": "foFriend"
                }, {
                    "data-id": !0,
                    "data-name": !0
                })), buf.push(">加关注</a>")), buf.push('</div><div class="contact">'), "f" == profile.gender ? (buf.push("<a"), buf.push(attrs({
                    "data-toggle": "at",
                    "data-target": "" + profile.screen_name,
                    "class": "at"
                }, {
                    "data-toggle": !0,
                    "data-target": !0
                })), buf.push(">@她</a>")) : (buf.push("<a"), buf.push(attrs({
                    "data-toggle": "at",
                    "data-target": "" + profile.screen_name,
                    "data-defaulttext": "" + profile.defaulttext,
                    "class": "at"
                }, {
                    "data-toggle": !0,
                    "data-target": !0,
                    "data-defaulttext": !0
                })), buf.push(">@他</a>")), buf.push("</div></div>")
            } else buf.push("<ad>正在获取用户信息...</ad>")
        }
        return buf.join("")
    }
    module.exports = anonymous
}), define("stock-tooltip.jade.js", function(require, exports, module) {
    function anonymous(locals, attrs, escape, rethrow, merge) {
        attrs = attrs || jade.attrs, escape = escape || jade.escape, rethrow = rethrow || jade.rethrow, merge = merge || jade.merge;
        var buf = [];
        with(locals || {}) {
            var interp;
            if (quote) {
                var domain_host = domain.host;
                if (buf.push('<div class="info"><div class="stockname"><a'), buf.push(attrs({
                        href: "" + quote.url,
                        target: "_blank",
                        title: "" + quote.name
                    }, {
                        href: !0,
                        target: !0,
                        title: !0
                    })), buf.push(">" + escape(null == (interp = quote.splitName) ? "" : interp) + "</a>"), buf.push(quote.isZH ? "<span>(" + escape(null == (interp = quote.symbol) ? "" : interp) + ")</span>" : "<span>(" + escape(null == (interp = quote.exchange) ? "" : interp) + ":" + escape(null == (interp = quote.code) ? "" : interp) + ")</span>"), buf.push("</div><span"), buf.push(attrs({
                        "class": "stockquote " + quote.updown
                    }, {
                        "class": !0
                    })), buf.push(">"), buf.push(quote.isFP ? '<span>预期收益：</span><span class="stockcurrent">' + escape(null == (interp = (100 * quote.current).toFixed(2)) ? "" : interp) + "%</span>" : quote.isZH ? '<span class="stockcurrent">' + escape(null == (interp = quote.current) ? "" : interp) + "</span>" : '<span class="stockcurrent">' + escape(null == (interp = quote.money) ? "" : interp) + escape(null == (interp = quote.current) ? "" : interp) + "</span>"), quote.isMF ? buf.push('<span class="stockpercentage">(七日年化收益：' + escape(null == (interp = quote.pe_ttm) ? "" : interp) + ")</span>") : quote.isPF ? buf.push('<span class="stockpercentage"> </span>') : quote.isTP || quote.isFP || buf.push('<span class="stockchange">' + escape(null == (interp = quote.change) ? "" : interp) + '</span><span class="stockpercentage">(' + escape(null == (interp = quote.percentage) ? "" : interp) + ")</span>"), buf.push("</span>"), "美股" == quote.bigType && (buf.push("<span>" + escape(null == (interp = quote.beforeAfter) ? "" : interp) + " </span><span"), buf.push(attrs({
                        "class": "afterHour " + quote.afterHourUpdown
                    }, {
                        "class": !0
                    })), buf.push('><span class="stockafterhourchg">' + escape(null == (interp = quote.afterHoursChg) ? "" : interp) + '</span><span class="stockafterhourpct">(' + escape(null == (interp = quote.afterHoursPct) ? "" : interp) + ")</span></span>")), quote.followers) var len = quote.followers.length;
                buf.push('<div class="stockfollows"><div class="followsdesc">'), quote.followers_count && (quote.isZH ? buf.push("<span>" + escape(null == (interp = quote.followers_count) ? "" : interp) + "</span>") : (buf.push("<a"), buf.push(attrs({
                    href: "" + quote.url + "/follows",
                    target: "_blank"
                }, {
                    href: !0,
                    target: !0
                })), buf.push(">" + escape(null == (interp = quote.followers_count) ? "" : interp) + "</a>")), buf.push("人关注，")), len && buf.push("最活跃用户："), buf.push("</div>"), len && (buf.push('<div class="imglist">'), function() {
                    if ("number" == typeof quote.followers.length)
                        for (var e = 0, a = quote.followers.length; a > e; e++) {
                            var t = quote.followers[e];
                            buf.push("<a"), buf.push(attrs({
                                href: "" + domain_host + t.profile,
                                target: "_blank",
                                title: "" + t.screen_name
                            }, {
                                href: !0,
                                target: !0,
                                title: !0
                            })), buf.push("><img"), buf.push(attrs({
                                src: "" + t.img
                            }, {
                                src: !0
                            })), buf.push("/></a>")
                        } else {
                            var a = 0;
                            for (var e in quote.followers) {
                                a++;
                                var t = quote.followers[e];
                                buf.push("<a"), buf.push(attrs({
                                    href: "" + domain_host + t.profile,
                                    target: "_blank",
                                    title: "" + t.screen_name
                                }, {
                                    href: !0,
                                    target: !0,
                                    title: !0
                                })), buf.push("><img"), buf.push(attrs({
                                    src: "" + t.img
                                }, {
                                    src: !0
                                })), buf.push("/></a>")
                            }
                        }
                }.call(this), buf.push("</div>")), buf.push("</div>"), buf.push('</div><div class="operations">'), quote.followers && (buf.push('<div class="relations">'), quote.following ? (buf.push('<span class="onefollow"><s></s>已关注&nbsp;|&nbsp;</span><a'), buf.push(attrs({
                    "data-id": "" + quote.symbol,
                    "data-name": "" + quote.name,
                    "class": "removeStock"
                }, {
                    "data-id": !0,
                    "data-name": !0
                })), buf.push(">取消</a><a"), buf.push(attrs({
                    "data-id": "" + quote.symbol,
                    "data-name": "" + quote.symbol,
                    "class": "groupStock"
                }, {
                    "data-id": !0,
                    "data-name": !0
                })), buf.push(">分组</a>")) : (buf.push("<a"), buf.push(attrs({
                    "data-id": "" + quote.symbol,
                    "data-name": "" + quote.name,
                    "class": "foStock"
                }, {
                    "data-id": !0,
                    "data-name": !0
                })), buf.push(">加关注</a>")), buf.push("</div>")), buf.push('<div class="contact"><a'), buf.push(attrs({
                    "data-toggle": "at",
                    "data-defaulttext": "$" + quote.name + "(" + quote.symbol + ")$ ",
                    "data-target": "$" + quote.name + "(" + quote.symbol + ")$"
                }, {
                    "data-toggle": !0,
                    "data-defaulttext": !0,
                    "data-target": !0
                })), buf.push(">讨论</a>"), quote.isTP || quote.isFP || quote.isZH || (buf.push("<a"), buf.push(attrs({
                    "data-target": "" + quote.symbol,
                    "class": "exchange"
                }, {
                    "data-target": !0
                })), buf.push(">持仓 </a>")), buf.push("</div></div>")
            } else buf.push('<div class="load">正在获取股票信息...</div>')
        }
        return buf.join("")
    }
    module.exports = anonymous
});
