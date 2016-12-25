define("SNB.base.js", ["lib/store", "dialog-with-buttonLink.jade.js"], function(e) {
    if (window.$win = $(window), window.$doc = $(document), window.$body = $("body"), window.baidu = {}, SNB.currentUser || (SNB.currentUser = {
            isGuest: !0
        }), Date.now = Date.now || function() {
            return +new Date
        }, Backbone.sync = function(e, t, n) {
            var o = function(e) {
                    return e && e.url ? _.isFunction(e.url) ? e.url() : e.url : null
                },
                i = function() {
                    throw new Error('A "url" property or function must be specified')
                };
            return n.url || (n.url = o(t) || i()), n.dataType = "jsonp", n.data = n.data || {}, $.ajax(n)
        }, !$.ajax._xq) {
        var t = $.ajax;
        $.ajax = function(e, n) {
            "object" == typeof e && (n = e, e = void 0), n = n || {};
            var o = e || n.url,
                i = "string" == typeof o && -1 === o.replace("http://", "").replace("https://", "").indexOf("im"),
                a = "string" == typeof n.type && "post" === n.type.toLowerCase(),
                r = !n.type && jQuery.ajaxSettings.type && "post" === jQuery.ajaxSettings.type.toLowerCase();
            if ((r || a) && i) {
                var s = $.Deferred(),
                    c = s.promise(),
                    u = n.url;
                "/service/poster" === o.replace("http://xueqiu.com", "").replace("https://xueqiu.com", "") && (u = n.data.url || n.url);
                var l = t.call($, "/service/csrf", {
                    data: {
                        api: u
                    },
                    type: "get"
                });
                return c.abort = function() {
                    l.abort()
                }, l.always(function(o) {
                    o.token && (n.data.session_token = o.token), l = t.call($, e, n), l.success(function() {
                        s.resolve.apply(s, [].slice.call(arguments))
                    }).fail(function() {
                        s.reject.apply(s, [].slice.call(arguments))
                    })
                }), c.success = c.done, c
            }
            return t.call($, e, n)
        }, $.ajax._xq = !0
    }
    $.ajaxSetup({
            cache: !1
        }), $.ajaxSetup({
            type: "POST",
            headers: {
                "cache-control": "no-cache"
            }
        }), window.AndroidJsObject && window.AndroidJsObject.doRequest && ($.ajax = function(e) {
            try {
                e && "string" == typeof e.data && (e.data = parseParams(e.data))
            } catch (t) {
                alert(t.message)
            }
            var n = e.url,
                o = JSON.stringify(e.data); - 1 === n.indexOf("http") && (n = "http://xueqiu.com" + n);
            var i = window.AndroidJsObject.doRequest(n, o, e.type),
                a = $.parseJSON(i);
            a.error_code ? e.error && e.error(a) : e.success && e.success(a), e.complete && e.complete(a)
        }), (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) && ($.browser.isMobile = !0), navigator.userAgent.match(/iPad/i) && ($.browser.isPad = !0), $.browser.isMobile || $.browser.isPad || ($.browser.isPC = !0), $.browser.supportUpload = function() {
            var e = document.createElement("input");
            return e.setAttribute("type", "file"), "text" != e.type && !e.disabled
        }(),
        function(t) {
            t.browser.webkit && $body.addClass("webkit"), t.browser.mozilla && $body.addClass("moz"), t.browser.msie && $body.addClass("ms"), "undefined" == typeof SNB && (SNB = {
                    Views: {},
                    Templates: {},
                    Models: {}
                }), SNB.run = SNB.log = SNB.error = SNB.debug = function() {}, SNB.env && "production" != SNB.env && (SNB.run = function() {
                    var e = Array.prototype.slice.call(arguments),
                        t = [];
                    func = e.pop(), e.length ? "string" == typeof e[0] ? t = e : e[0] instanceof Array && (t = e[0]) : t = ["development"], ~_.indexOf(t, SNB.env) && func()
                }), SNB.run("development", function() {
                    SNB.log = function(e) {
                        window.console && console.log(e)
                    }, SNB.error = function(e) {
                        window.console && console[console.error ? "error" : "log"](e)
                    }, SNB.debug = function(e) {
                        window.console && SNB.error("DEBUG: " + e)
                    }
                }), window.console || (window.console = {
                    log: function() {}
                }), SNB.logger = function(e) {
                    "string" == typeof e && (e = {
                        event: e,
                        time: (new Date).getTime() - WATCH.pageStart
                    }), t.post("/service/logger", e)
                }, t.cookie("xq_is_login") && t.cookie("last_account", null, {
                    path: "/"
                }), SNB.get || (SNB.get = function(e, n, o, i) {
                    var a = "json";
                    "function" == typeof n && (i = o, o = n, n = {}), "" == n && (n = {}), 0 == e.search("http://api.xueqiu.com") && (e = e.substr(21)), 0 == e.search("https://") && (a = "jsonp"), location.host.match(/imeigu.com/i) && (e = "http://xueqiu.com" + e, a = "jsonp");
                    var r = t.ajax({
                        url: e,
                        data: n,
                        type: "GET",
                        dataType: a,
                        success: function(e) {
                            var n = "object" != typeof e ? t.parseJSON(e) : e;
                            o && o(n)
                        },
                        error: function(a) {
                            var r = a.responseText;
                            if ("object" != typeof r && (r = t.parseJSON(r)), !r || "400016" != r.error_code && "400013" != r.error_code) {
                                if (r && "10022" === r.error_code) return SNB.currentUser = {
                                    isGuest: !0
                                }, void SNB.Util.checkLogin(function() {
                                    SNB.get(e, n, o, i)
                                })
                            } else t.get("/user/is_login?prev_url=" + e + "&error_code=" + r.error_code).done(function(e) {
                                !e || e.logout ? location.href = "/user/clearCookie?_=" + (+new Date).toString(36) : i && i({})
                            }).fail(function() {
                                location.href = "/user/clearCookie?_=" + (+new Date).toString(36)
                            })
                        }
                    });
                    return r
                }),
                function() {
                    var e = new Image;
                    SNB.isSupportHttps = !1, e.onload = function() {
                        SNB.isSupportHttps = !0
                    }, e.onerror = function() {
                        SNB.isSupportHttps = !1
                    }, e.src = "//xueqiu.com/blank.png?_" + +new Date
                }(), SNB.post = function(e, n, o, i) {
                    var a = {
                        "/provider/oauth/token": !0,
                        "/account/signup_by_email.json": !0,
                        "/account/change_password.json": !0
                    };
                    "function" == typeof n && (o = n, i = o, n = {}), n._ = (new Date).getTime();
                    var r = "/service/poster";
                    return SNB.isSupportHttps && "development" != SNB.env && a[e] && (r = "https://xueqiu.com/service/poster"), t.ajax({
                        url: r,
                        data: {
                            url: e,
                            data: n
                        },
                        type: "POST",
                        success: function(e) {
                            "object" != typeof e && (e = t.parseJSON(e)), o && o(e)
                        },
                        error: function(a) {
                            var r = a.responseText;
                            return "object" != typeof r && (r = t.parseJSON(r)), r && "10022" === r.error_code ? (SNB.currentUser = {
                                isGuest: !0
                            }, void SNB.Util.checkLogin(function() {
                                SNB.post(e, n, o, i)
                            })) : void(i && i(r))
                        }
                    })
                };
            var n = Date.parse;
            Date.parse = function(e) {
                    var t = n(e);
                    return isNaN(t) && /\+|-/.test(e) && (e = e.replace(/(\+|-)/g, "UTC$1"), t = n(e)), t
                },
                function() {
                    this.getFullMonth = function() {
                        var e = this.getMonth() + 1;
                        return e = 10 > e ? "0" + e : e
                    }, this.getFullDate = function() {
                        var e = this.getDate();
                        return e = 10 > e ? "0" + e : e
                    }, this.getFullHours = function() {
                        var e = this.getHours();
                        return e = 10 > e ? "0" + e : e
                    }, this.getFullMinutes = function() {
                        var e = this.getMinutes() + 1;
                        return 60 == e && (e = 59), e = 10 > e ? "0" + e : e
                    }
                }.call(Date.prototype), t.extend({
                    getParam: function(e) {
                        var t = e || window.location.search;
                        t = -1 !== t.indexOf("?") ? t.substring(t.indexOf("?") + 1) : t;
                        var n = decodeURIComponent(t);
                        if (0 == n || "" == n) return null;
                        for (var o = n.split("&"), i = {}, a = 0; a < o.length; a++) {
                            var r = o[a].indexOf("="); - 1 == r ? i[o[a]] = "" : i[o[a].substring(0, r)] = o[a].substr(r + 1)
                        }
                        return i
                    }
                }), t.extend(t.fn, {
                    found: function(e, n) {
                        if (this.length) {
                            var o = t(this);
                            e.call(o, o)
                        } else n && this.notFound(n);
                        return this
                    },
                    notFound: function(e) {
                        return this.length || e(), this
                    },
                    findOrAppend: function(e, n, o, i) {
                        var a = t.fn.find.call(this, e);
                        return "function" == typeof o && (i = o, o = {}), a.length ? i && i.call(a, a, !1) : (o = o || {}, a = t("function" == typeof n ? n(o) : n).appendTo(this), i && i.call(a, a, !0)), this
                    },
                    reverse: Array.prototype.reverse
                }), SNB.Pager = function(e, n, o) {
                    var i = "<div class='pager-wrapper'><ul class='pager'>",
                        a = "",
                        r = e - 2,
                        s = "",
                        c = t.getParam() || {},
                        u = "";
                    for (e = "string" == typeof e ? parseInt(e) : e, n = "string" == typeof n ? parseInt(n) : n, "undefined" != typeof o && _.map(o, function(e, t) {
                            c[t] = e
                        }), t.isPlainObject(c) && (delete c.page, delete c.jump, t.map(c, function(e, t) {
                            s += "&" + encodeURIComponent(t) + "=" + encodeURIComponent(e)
                        })); n >= r && (2 >= r - e || 5 >= r);) r > 0 && (a += "<li" + (r === e ? " class='active'" : "") + "><a data-page='" + r + "' href='?page=" + r + s + "'>" + r + "</a></li>"), r++;
                    return 1 != e && (i += "<li class='last'><a data-page='" + (e - 1) + "' href='?page=" + (e - 1) + s + "'><span>上一页</span><i></i></a></li>", e > 3 && (i += "<li><a data-page='1' href='?page=1" + s + "'>1</a></li>", e > 4 && (i += "<li>...</li>"))), i += a, e != n && (n > e + 2 && (n > e + 3 && (i += "<li>...<li>"), r - n !== 1 && (i += "<li><a data-page='" + n + "' href='?page=" + n + s + "'>" + n + "</a></li>")), u = "<li class='next'><a data-page='" + (e + 1) + "' href='?page=" + (e + 1) + s + "'><span>下一页</span><i></i></a></li>"), n > 4 && o && o.jump && (u = '<li title="输入页码 按Enter 进行跳转" class="jump_input"><input style="padding: 6px 0; border: 1px solid #ccc; font-size: 13px; width: 40px; text-align: center;"></li>' + u), i += u + "</ul></div>"
                }, SNB.Util = {
                    MAX_STATUS_WORDS: 140,
                    MAX_LONG_STATUS_WORDS: 2e4,
                    MAX_DM_WORDS: 300,
                    BBCODE_IMAGE_BASEURL: "//assets.imedao.com/images/face/",
                    BBCODE_TO_TEXT: {},
                    TEXT_TO_BBCODE: {},
                    BBCODE_MAPPING: [
                        ["01smile", "[微笑]"],
                        ["02smile-big", "[呵呵]"],
                        ["03laugh", "[哈哈]"],
                        ["04clap", "[鼓掌]"],
                        ["05confused", "[困惑]"],
                        ["06sad", "[难过]"],
                        ["07angry", "[生气]"],
                        ["08cute", "[可爱]"],
                        ["09act-up", "[调皮]"],
                        ["10sweat", "[汗]"],
                        ["11good", "[赞]"],
                        ["12bad", "[贬]"],
                        ["13love", "[爱]"],
                        ["14love-over", "[心碎]"],
                        ["15rose", "[献花]"],
                        ["16rose-dead", "[凋谢]"],
                        ["17in-love", "[色]"],
                        ["18kiss", "[亲亲]"],
                        ["19poop", "[屎]"],
                        ["20victory", "[胜利]"],
                        ["21desire", "[仰慕]"],
                        ["22moneymouth", "[贪财]"],
                        ["23quiet", "[无语]"],
                        ["24secret", "[秘密]"],
                        ["25shut-mouth", "[闭嘴]"],
                        ["26shame", "[害羞]"],
                        ["27sick", "[讨厌]"],
                        ["28dazed", "[晕]"],
                        ["29question", "[疑问]"],
                        ["30sleepy", "[困]"],
                        ["31arrogant", "[傲慢]"],
                        ["32curse", "[诅咒]"],
                        ["33crying", "[哭]"],
                        ["34disapointed", "[失望]"],
                        ["35embarrassed", "[尴尬]"],
                        ["36dont-know", "[不知道]"],
                        ["37handshake", "[握手]"],
                        ["38struggle", "[挣扎]"],
                        ["39thinking", "[思考]"],
                        ["40tongue", "[吐舌]"],
                        ["20smile-smile", "[笑]"],
                        ["21lol", "[大笑]"],
                        ["14guzhang", "[鼓鼓掌]"],
                        ["19qiaopi", "[俏皮]"],
                        ["08jiayou", "[加油]"],
                        ["23earn", "[赚大了]"],
                        ["11niubi", "[牛]"],
                        ["24angry", "[怒了]"],
                        ["25weep", "[哭泣]"],
                        ["09lose", "[亏大了]"],
                        ["26sleepy", "[困顿]"],
                        ["18shiwang", "[好失望]"],
                        ["10han", "[滴汗]"],
                        ["13why", "[为什么]"],
                        ["16guile", "[跪了]"],
                        ["12hand", "[摊手]"],
                        ["22buxie", "[不屑]"],
                        ["15xunka", "[好逊]"],
                        ["emoji_chimian_40", "[关灯吃面]"],
                        ["emoji_shabi_40", "[呵呵傻逼]"],
                        ["emoji_gerou_40", "[割肉]"],
                        ["emoji_maishen_40", "[卖身]"],
                        ["emoji_tuxie_40", "[吐血]"],
                        ["emoji_kelian_40", "[可怜]"],
                        ["emoji_haixiu_40", "[害羞]"],
                        ["emoji_koubi_40", "[抠鼻]"],
                        ["emoji_jiong_40", "[囧]"],
                        ["43kunhuo", "[好困惑]"],
                        ["44sikao", "[想一下]"],
                        ["45aoman", "[傲]"],
                        ["17shutup", "[不说了]"],
                        ["27weiguan", "[围观]"],
                        ["03zan", "[很赞]"],
                        ["04bian", "[不赞]"],
                        ["05woshou", "[赞成]"],
                        ["40cheers", "[干杯]"],
                        ["36heart", "[心心]"],
                        ["37heartbreak", "[心碎了]"],
                        ["38flower", "[献花花]"],
                        ["39shit", "[一坨屎]"],
                        ["41full", "[满仓]"],
                        ["42empty", "[空仓]"],
                        ["34reverse", "[复盘]"],
                        ["35bottom", "[抄底]"],
                        ["33nengliquan", "[能力圈]"],
                        ["29put", "[看空]"],
                        ["30call", "[看多]"],
                        ["31add", "[加仓]"],
                        ["32reduce", "[减仓]"],
                        ["01buy", "[买入]"],
                        ["02sell", "[卖出]"],
                        ["06maogugu", "[毛估估]"],
                        ["07deal", "[成交]"],
                        ["28moat", "[护城河]"]
                    ],
                    personalityResult: function(e) {
                        var t = [10, 5, 10, 10, 10, 10, 10, 10, 5, 20],
                            n = _.map(e.replace(/^\s+|\s+$/g, "").split(""), function(e) {
                                return parseInt(e, 36) - 10
                            }),
                            o = _.reduce(t, function(e, t, o) {
                                return e + t * n[o]
                            }, 0);
                        return 150 >= o ? "股市弄潮儿" : 220 >= o ? "假装在投资" : 270 >= o ? "奥马哈之雾" : "说中文的巴菲特"
                    },
                    isSnowBrick: function() {
                        return navigator.userAgent.match(/SnowBrick/i)
                    },
                    callBrick: function(e) {
                        if (!SNB.Util.isSnowBrick()) return !1;
                        var t = document.createElement("iframe");
                        t.setAttribute("src", "js:" + encodeURIComponent(JSON.stringify(e))), document.documentElement.appendChild(t), t.parentNode.removeChild(t), t = null
                    },
                    getAccessToken: function() {
                        return t.cookie("xq_a_token") || SNB.data.access_token
                    },
                    decimal_2: function(e) {
                        if (!e) return "-";
                        for (var t = parseFloat(e), n = ["", "万", "亿"], o = 0; e > 1e4 && 2 > o;) e /= 1e4, o++;
                        t = Math.round(100 * e) / 100;
                        var i = t.toString(),
                            a = i.indexOf(".");
                        for (0 > a && (a = i.length, i += "."); i.length <= a + 2;) i += "0";
                        return i + n[o]
                    },
                    decimal_2_noparse: function(e, t) {
                        if ("undefined" == typeof e || "" === e) return "-";
                        if (t) return e;
                        var n = parseFloat(e);
                        return n > 0 && 1 > n ? n.toFixed(3) : n >= 1 || 0 >= n ? n.toFixed(2) : e
                    },
                    upStock: function(e) {
                        if (_.isUndefined(e) || _.isNull(e)) return "-";
                        e = Number(e);
                        var t = (Math.round(100 * e) / 100).toString(),
                            n = t.indexOf(".");
                        for (0 > n && (n = t.length, t += "."); t.length <= n + 2;) t += "0";
                        return e > 0 ? "+" + t : t
                    },
                    upDownClass: function(e) {
                        return e = Number(e), e > 0 ? "stock_up" : 0 > e ? "stock_down" : ""
                    },
                    getStockInfo: function(e) {
                        var t, n = {
                                HKHSI: 1,
                                HKHSF: 1,
                                HKHSU: 1,
                                HKHSP: 1,
                                HKHSC: 1,
                                HKVHSI: 1,
                                HKHSCEI: 1,
                                HKHSCCI: 1,
                                HKGEM: 1,
                                HKHKL: 1,
                                SGXCN: 1
                            },
                            o = {
                                DJI30: 1,
                                NASDAQ: 1,
                                SP500: 1,
                                ICS30: 1,
                                SLR10: 1,
                                TMT20: 1,
                                HCP10: 1,
                                EDU10: 1
                            },
                            i = {
                                BTCNCNY: {
                                    money: "￥",
                                    market: "比特币（CNY）"
                                },
                                MTGOXAUD: {
                                    money: "AU$",
                                    market: "比特币（AUD）"
                                },
                                MTGOXEUR: {
                                    money: "€",
                                    market: "比特币（EUR）"
                                },
                                MTGOXGBP: {
                                    money: "£",
                                    market: "比特币（GBP）"
                                },
                                MTGOXJPY: {
                                    money: "J￥",
                                    market: "比特币（JPY）"
                                },
                                MTGOXUSD: {
                                    money: "$",
                                    market: "比特币（USD）"
                                },
                                LOCALBTCAUD: {
                                    money: "AU$",
                                    market: "比特币（AUD）"
                                },
                                MTGOXCNY: {
                                    money: "￥",
                                    market: "比特币（CNY）"
                                },
                                BTCDEEUR: {
                                    money: "€",
                                    market: "比特币（EUR）"
                                },
                                BTCEEUR: {
                                    money: "€",
                                    market: "比特币（EUR）"
                                },
                                LOCALBTCGBP: {
                                    money: "£",
                                    market: "比特币（GBP）"
                                },
                                BTCEUSD: {
                                    money: "$",
                                    market: "比特币（USD）"
                                },
                                BITSTAMPUSD: {
                                    money: "$",
                                    market: "比特币（USD）"
                                }
                            },
                            a = ["SH500", "SH510", "SH511", "SH513", "SZ15", "SZ18", "SZ16"];
                        if (e && (_.indexOf(a, e.substr(0, 5)) > -1 || _.indexOf(a, e.substr(0, 4)) > -1)) t = {
                            money: "￥",
                            market: "",
                            bigType: "基金",
                            type: "基金"
                        };
                        else if (/^S[HZ]\d+$/.test(e)) t = /^SZ200/.test(e) ? {
                            money: "HK$",
                            market: "深B",
                            bigType: "沪深",
                            type: "股票"
                        } : /^(SH(201|202|203|204|131)|SZ(13|395032))/.test(e) ? {
                            money: "￥",
                            market: "回购",
                            bigType: "沪深",
                            type: "回购"
                        } : /^(SH(01|02|13)|SZ(10|09))/.test(e) ? {
                            money: "￥",
                            market: "国债",
                            bigType: "沪深",
                            type: "国债"
                        } : /^(SH12|SZ11)/.test(e) ? {
                            money: "￥",
                            market: "企债",
                            bigType: "沪深",
                            type: "企债"
                        } : /^(SH11|SZ12)/i.test(e) ? {
                            money: "￥",
                            market: "可转债",
                            bigType: "沪深",
                            type: "可转债"
                        } : /^SH900/.test(e) ? {
                            money: "$",
                            market: "沪B",
                            bigType: "沪深",
                            type: "股票"
                        } : /^(SH00|SZ399)/.test(e) ? {
                            money: "",
                            market: "",
                            bigType: "沪深",
                            type: "指数"
                        } : {
                            money: "￥",
                            market: "A股",
                            bigType: "沪深",
                            type: "股票"
                        };
                        else if (/CSI\d+/.test(e)) t = {
                            money: "",
                            market: "",
                            bigType: "沪深",
                            type: "指数"
                        };
                        else if (/^MF\d+$/.test(e)) t = {
                            money: "￥",
                            market: "MF",
                            bigType: "货币基金",
                            type: "货币基金"
                        };
                        else if (/^F\d+$/.test(e)) t = {
                            money: "￥",
                            market: "F",
                            bigType: "基金",
                            type: "基金"
                        };
                        else if (/^TP\d+$/.test(e)) t = {
                            money: "￥",
                            market: "TP",
                            bigType: "信托产品",
                            type: "信托产品"
                        };
                        else if (/^[\d\w]+\.FM$/.test(e)) t = {
                            money: "￥",
                            market: "FM",
                            bigType: "国债期货",
                            type: "国债期货"
                        };
                        else if (/^P\d+$/.test(e)) t = {
                            money: "￥",
                            market: "P",
                            bigType: "私募基金",
                            type: "私募基金"
                        }, "P000057" === e && (t.money = "$");
                        else if (/^FP\d+$/.test(e)) t = {
                            money: "￥",
                            market: "FP",
                            bigType: "理财产品",
                            type: "理财产品"
                        };
                        else if (/^ZH\d{6}$/.test(e)) t = {
                            money: "￥",
                            market: "ZH",
                            bigType: "投资组合",
                            type: "投资组合"
                        };
                        else if (/^\d+$/.test(e)) t = {
                            money: /^8/.test(e) ? "￥" : "HK$",
                            market: "港股",
                            bigType: "港股",
                            type: "股票"
                        };
                        else if (n[e] || o[e]) t = {
                            money: "",
                            market: "",
                            bigType: "指数",
                            type: "指数"
                        };
                        else if (/^OC\d{6}$/.test(e)) t = {
                            money: "￥",
                            market: "A股",
                            bigType: "沪深",
                            type: "股票"
                        };
                        else {
                            var r = i[e];
                            t = r ? {
                                money: r.money,
                                market: r.market,
                                bigType: "比特币",
                                type: "比特币"
                            } : {
                                money: "$",
                                market: "美股",
                                bigType: "美股",
                                type: "股票"
                            }
                        }
                        return t
                    },
                    parseTime: function(e, t) {
                        var n, o = new Date;
                        "object" == typeof e ? n = e : (e = "function" == typeof t ? t(e) : e, n = new Date, n.setTime(e), "Invalid Date" == n && n.setTime(parseInt(e)));
                        var i, a, r, s, c, u = (o.getTime() - n.getTime()) / 1e3;
                        return c = n.getFullMonth(), a = n.getFullDate(), r = n.getFullHours(), s = n.getFullMinutes(), o.getYear() != n.getYear() ? i = n.getFullYear() + "-" + c + "-" + a + " " + r + ":" + s : o.getMonth() != n.getMonth() || o.getDate() != n.getDate() ? i = c + "-" + a + " " + r + ":" + s : 60 > u ? (u = 3 > u ? 3 : u, i = Math.ceil(u) + "秒前") : i = 3600 > u ? Math.ceil(u / 60) + "分钟前" : "今天 " + r + ":" + s, i
                    },
                    getTimestamp: Date.now || function() {
                        return (new Date).getTime()
                    },
                    pdfLink: function(e, n, o) {
                        var i = e.data("pdf"),
                            a = t('<div class="zoom-pdf-box"></div>');
                        if (i && !e.next().is("div.zoom-pdf-box")) {
                            a.append('<a class="zoom" href="' + n + '/pdf" target="_blank"><i></i><span>全屏查看</span></a>');
                            var r = o ? ".pdf" : "";
                            a.append('<a class="zoom download" target="_blank" href="/stockreport/download?name=' + i + "&_upd=" + o + r + '" target="_blank" data-toggle="download"><i></i><span>下载查看</span></a>'), e.after(a)
                        }
                    },
                    statusPdf: function(e) {
                        if (e.retweeted_status) return e;
                        var t = /<a href=['"]?(\/\/(xqdoc.b0.upaiyun.com|doc.xueqiu.com|xqdoc.imedao.com|u.xqdoc.imedao.com)\/([^'"\s]+)\.pdf)['"\s][^>]*>[^<]+<\/a>$/i;
                        return e.pdfRemovedContent = e.text.replace(t, function(t, n, o, i) {
                            return e.pdfLink = n, e.pdf = i, ""
                        }), e.description = e.description.replace(t, ""), e
                    },
                    showTip: function(t, n, o) {
                        function i(e) {
                            "s" === e && (n.fadeIn(), o.off("click.closeTip").on("click.closeTip", function() {
                                n.fadeOut(), c()
                            }))
                        }
                        var a = SNB.store || e("./lib/store"),
                            r = a.get("tip:" + t),
                            s = function() {
                                a.set("tip:" + t, "s"), SNB.currentUser.isGuest || SNB.get("/tips/status/update.json", {
                                    source: t,
                                    status: "s"
                                })
                            },
                            c = function() {
                                a.set("tip:" + t, "h"), SNB.currentUser.isGuest || SNB.get("/tips/status/update.json", {
                                    source: t,
                                    status: "h"
                                })
                            };
                        n.hide(), n.data("setShow", s), n.data("setHide", c), r ? i(r) : (SNB.currentUser.isGuest ? r = "s" : SNB.get("/tips/status/show.json?source=" + t, function(e) {
                            var n = e.tips_statuses;
                            r = n.length && "s" != n[0].status ? "h" : "s", a.set("tip:" + t, r)
                        }), i(r))
                    },
                    pdfFullscreenHint: function(e) {
                        e && e.length && e.findOrAppend(".fullscreen-hint", '<div class="fullscreen-hint dropdown-menu"><span>提示：点击此处以全屏模式查看</span><span class="close-button">X</span></div>', function(e) {
                            SNB.Util.showTip("pdf_fullscreen", e, e.find(".close-button"))
                        })
                    },
                    pdfViewer: function(e, n) {
                        seajs.use(["flexpaper.js", "flexpaper_handlers.js"], function() {
                            var o = t("#" + e);
                            o.FlexPaperViewer({
                                config: {
                                    SWFFile: "//xqdoc.imedao.com/" + n + ".swf",
                                    key: "$ffc627e4203219a906c",
                                    Scale: .6,
                                    ZoomTransition: "easeOut",
                                    ZoomTime: .5,
                                    ZoomInterval: .2,
                                    FitPageOnLoad: !1,
                                    FitWidthOnLoad: !0,
                                    PrintEnabled: !1,
                                    FullScreenAsMaxWindow: !1,
                                    ProgressiveLoading: !0,
                                    MinZoomSize: .2,
                                    MaxZoomSize: 5,
                                    SearchMatchAll: !1,
                                    InitViewMode: "Portrait",
                                    RenderingOrder: "flash,html",
                                    StartAtPage: "",
                                    ViewModeToolsVisible: !1,
                                    ZoomToolsVisible: !0,
                                    NavToolsVisible: !0,
                                    CursorToolsVisible: !1,
                                    SearchToolsVisible: !1,
                                    WMode: "opaque",
                                    localeChain: "zh_CN"
                                }
                            });
                            var i = o.siblings(".flexpaper_mask");
                            if (i.length) {
                                var a, r = i.find(".fp_loaded"),
                                    s = (i.find(".fp_total"), function() {
                                        o.data("mask_removed") || (o.data("mask_removed", !0), setTimeout(function() {
                                            r.text("0%"), i.find(".flexpaper_hint").hide(), i.fadeOut(function() {
                                                o.data("mask", i.detach())
                                            })
                                        }, 800))
                                    });
                                o.data("show", s), o.on("onProgress", function(e, t, n) {
                                    t = parseInt(t, 10), n = parseInt(n, 10), a = t / n * 100 | 0, a > 95 && s(), r.text(a + "%")
                                }), o.on("onDocumentLoaded onCurrentPageChanged", s), setTimeout(function() {
                                    a || s()
                                }, 3e3), SNB.Util.pdfFullscreenHint(o.parent())
                            }
                        })
                    },
                    parseContent: function(e, n, o) {
                        if (e = (e || "").replace(/<!--.*?-->|&lt;!--.*?--&gt;/g, "").replace(/\uF0A7|\uF020/g, "").replace(/\uFEFF|\u200B/g, "").replace(/<\/?wbr[^>]*>|<\/?o:p[^>]*>|<\/?font[^>]*>|<\/?st1:[^>]*>|<\/?i(?!m)[^>]*>/gi, "").replace(/<style[^>]*>[\s\S]*?<\/style>|&lt;style.*?&gt;[\s\S]*?&lt;\/style&gt;/gi, "").replace(/\n/g, "\r").replace(/<\/tr*>/gi, "</tr>\n").replace(/<br[^>]*>/gi, "\n").replace(/<\/p>/gi, n ? "\n\n" : "\n").replace(/([\u0020\u00a0\t\r]|&nbsp;)*<p[^>]*>|\r/gi, "").replace(/^[\s\u00a0]+|([\s\u00a0]|&nbsp;)+$/gi, "").replace(/([\u0020\u00a0]|&nbsp;)+(?=\n)/gi, ""), o || (e = e.replace(/^([\s\u00a0]|&nbsp;)+/gi, "")), n && (e = e.replace(/\n{2,}/g, "<br><br>").replace(/<\/?strong[^>]*>/gi, "")), n) {
                            var i = t("<div>" + e + "</div>"),
                                a = i.find(".url_ellipsis");
                            a.length && a.after("<span class='keep_whitespace'>&nbsp;&nbsp;</span>").remove(), e = i.html()
                        }
                        return e = e.replace(/\n/g, "<br>").replace(/\u200B<img/g, "<img").replace(/<span([^>]*)>([\s\S]*?)<\/span>/gi, function(e, t, o) {
                            if (n) return t.match(/keep_whitespace/i) ? e : t.match(/_ie_paste_/i) ? e : o;
                            if (t.match(/_baidu_bookmark_/i)) return e;
                            if (t.match(/highlight/i)) return e;
                            var i = t.match(/text-decoration:\s*underline/i);
                            return i ? '<span style="text-decoration: underline;">' + o + "</span>" : o
                        }).replace(/([^>\s])((?:&nbsp;)+)/g, function(e, t, n) {
                            return t + " " + n.substring(6)
                        })
                    },
                    reparseContent: function(e) {
                        e = e || "";
                        var t = /<img[^>]+src=('|")\/\/js\.xueqiu\.com\/images\/face\/([^>]+)\.png\1[^>]*\/?>/gi,
                            n = /<img[^>]+data-image="([^"]+)"[^>]*>/gi,
                            o = /<\/?a[^>]*>/gi,
                            e = e.replace(o, "");
                        return e = e.replace(t, function(e, t, n) {
                            var o;
                            return (o = SNB.Util.BBCODE_TO_TEXT[n]) ? o : e
                        }), e = e.replace(n, '<img class="ke_img" src="$1" />')
                    },
                    cleanContent: function(e, n, o, i, a) {
                        e = e || "", o && (window.UE && (e = UE.pasteFilter(e, o)), o.ta && !o.ta.$uew.parent().is(".editor, .editor-wrapper") && (e = e.replace(/<img([^>]+)>/gi, ""))), e = SNB.Util.parseContent(e, i, a);
                        var r = t("<div>" + e + "</div>");
                        if (!t.trim(r.text()).length && !r.find("img").length) return "";
                        n || r.find("span").each(function(e, n) {
                            /^_baidu_bookmark_/.test(n.id) && t(n).remove()
                        }), r.find("img.ke_img_paste").remove(), r.find('img.ke_img[src*=".xueqiu.com/images/blank.png"]').remove(), r.find(".url_invisible").remove(), e = r.html();
                        var s = /<img[^>]+class="?ke_img[^>]*>/gi;
                        return e = e.replace(s, function(e) {
                            var t = e.match(/src="?([^"\s]+)/i);
                            return t ? '<img class="ke_img" src="' + t[1] + '" />' : e
                        }), e = e.replace(/<([uo]l)([^>]*)>/gi, function(e, t, n) {
                            var o;
                            return (o = n.match(/style="[^"]+"/)) ? "<" + t + " " + o[0] + ">" : "<" + t + ">"
                        })
                    },
                    isContentSame: function(e, t) {
                        return e = e.replace(/\s|\u00a0|\u0020|&nbsp;/g, ""), t = t.replace(/\s|\u00a0|\u0020|&nbsp;/g, ""), e == t
                    },
                    htmlizeContent: function(e) {
                        return e = e || "", e = e.replace(/\r\n?|\n/g, "<br>"), e = e.replace(/&lt;|&amp;|&quot;|&gt;/g, function(e) {
                            return {
                                "&lt;": "<",
                                "&amp;": "&",
                                "&quot;": '"',
                                "&gt;": ">"
                            }[e]
                        })
                    },
                    unhtml: function(e) {
                        return e ? e.replace(/[&<">]/g, function(e) {
                            return {
                                "<": "&lt;",
                                "&": "&amp;",
                                '"': "&quot;",
                                ">": "&gt;"
                            }[e]
                        }) : ""
                    },
                    updateCount: function(e, t) {
                        var n = /\d+/gi;
                        return n.test(e) ? e = e.replace(n, function(e) {
                            return 0 > t ? parseInt(e) - 1 : parseInt(e) + 1
                        }) : e += "(1)", e
                    },
                    getWordsCount: function(e) {
                        if (_.isUndefined(e)) return 0;
                        var n = e.split(""),
                            o = 0;
                        t(n).each(function() {
                            this.charCodeAt(0) < 256 && o++
                        });
                        var i = e.length - o;
                        return i + Math.round(o / 2)
                    },
                    splitWord: function(e, t) {
                        if (e && e.length > t)
                            for (var n = 0, o = 0, i = e.split(""), a = 0, r = i.length; r > a; a++) {
                                var s = i[a];
                                if (n += s.charCodeAt(0) < 256 ? .5 : 1, n > t) return e.substr(0, o);
                                o++
                            }
                        return e
                    },
                    splitWordWithElipse: function(e, t) {
                        var n = t || 4;
                        return this.getWordsCount(e) > n ? this.splitWord(e, n) + "..." : e
                    },
                    getWindowSize: function(e) {
                        var t = "undefined" != typeof window.screenX ? window.screenX : window.screenLeft,
                            n = "undefined" != typeof window.screenY ? window.screenY : window.screenTop,
                            o = "undefined" != typeof window.outerWidth ? window.outerWidth : document.documentElement.clientWidth,
                            i = "undefined" != typeof window.outerHeight ? window.outerHeight : document.documentElement.clientHeight - 22,
                            a = "undefined" != typeof e && "undefined" != typeof e.width ? e.width : 580,
                            r = "undefined" != typeof e && "undefined" != typeof e.height ? e.height : 355,
                            s = parseInt(t + (o - a) / 2, 10),
                            c = parseInt(n + (i - r) / 2.5, 10),
                            u = "width=" + a + ",height=" + r + ",left=" + s + ",top=" + c + ",toolbar=no,menubar=no,scrollbars=no,   resizable=no,location=no,status=no";
                        return u
                    },
                    dialog_vertical_middle: function(e) {
                        var n = e.height(),
                            o = document.documentElement,
                            i = 0,
                            a = o.clientHeight;
                        i = a > n && (a - n) / 2, e.css("top", i + t(document).scrollTop())
                    },
                    checkLogin: function(e) {
                        if (SNB.data.is_brick) return !1;
                        var t = function() {
                            SNB.Guest.showLoginDialog(function() {
                                e && e()
                            })
                        };
                        SNB.currentUser.isGuest ? "undefined" != typeof SNB.Guest ? t() : seajs.use("SNB.guest.js", function() {
                            t()
                        }) : e && e()
                    },
                    insertStockAutocompletionOptions: {
                        source: function(e, n) {
                            SNB.get("/stock/search.json", {
                                size: 10,
                                code: e.term
                            }, function(e) {
                                n(t.map(e.stocks, function(e) {
                                    return {
                                        label: e.name + "(" + e.code + ")",
                                        name: e.name,
                                        value: e.code
                                    }
                                }))
                            })
                        },
                        autoFocus: !0
                    },
                    insertStock: function(e, n) {
                        t("#stockbox").remove();
                        var o = t('<div id="stockbox"/>').appendTo("body>.temp"),
                            i = t('<input type="text" class="stockboxinput" id= "stockboxinput" />').appendTo(o);
                        o.dialog({
                            modal: !0,
                            stack: !0,
                            width: "330px",
                            minHeight: "54px",
                            title: "请输入股票代码/中文名/英文名",
                            close: function() {
                                i.val(""), i.autocomplete("close")
                            },
                            dragStart: function() {
                                i.autocomplete("close")
                            },
                            dragStop: function() {
                                i.autocomplete("search")
                            },
                            position: e
                        }), i.autocomplete(SNB.Util.insertStockAutocompletionOptions), i.bind("autocompleteselect", function(e, t) {
                            n && n(t.item), o.dialog("close")
                        })
                    },
                    deleteDialog: function(e, n) {
                        var o = t(e),
                            i = "",
                            a = t("#dialog-delete"),
                            r = o.attr("canBlock"),
                            s = o.attr("blockUserId"),
                            c = o.attr("alertAsk"),
                            u = "确定删除这条评论吗？";
                        return c && (u = "删除后钱不退还,将转给被提问者"), i = r ? '<p class="dialog-msg hasBlock">' + u + '</p><div class=\'block\'><input type=\'checkbox\' name=\'block\' id=\'block_user\'></input><label for=\'block_user\'>将对方拉黑</label></div><div><input type="button" class="submit ok" value="确定"/><input type="button" class="button cancel" value="取消"/></div>' : '<p class="dialog-msg">' + u + '</p><div><input type="button" class="submit ok" value="确定"/><input type="button" class="button cancel" value="取消"/></div>', 0 === a.length ? t("body").append('<div id="dialog-delete" class="dialog-wrapper">' + i + "</div>") : t("#dialog-delete").html(i), a = t("#dialog-delete"), a.find(".cancel").click(function() {
                            a.dialog("close")
                        }), a.find(".submit").unbind("click").click(function() {
                            a.dialog("close"), a.find("input#block_user").is(":checked") && SNB.post("/blocks/create.json", {
                                user_id: s
                            }, function() {}), n && n()
                        }), a
                    },
                    confirmDialog: function(e, n) {
                        var o = t("#dialog-confirm");
                        if (o.length < 1) {
                            var i = '<div id="dialog-confirm" class="dialog-wrapper"><p  class="dialog-msg">' + e + '</p><p style="width:100%;text-align:center;"><input type="button" class="submit" value="确定"/><input type="button" class="cancel button" value="取消"/></p></div>';
                            t("body").append(i), o = t("#dialog-confirm"), o.find(".cancel").click(function() {
                                o.dialog("close")
                            })
                        }
                        return o.find(".dialog-msg").html(e), o.find(".submit").unbind("click").click(function() {
                            o.dialog("close"), n && n()
                        }), o
                    },
                    stateDialog: function(e, n, o, i, a, r, s) {
                        var c = t("#dialog-saved-success"),
                            u = "undefined" != typeof i ? i : !0,
                            l = "undefined" != typeof a ? a : 200,
                            d = "undefined" != typeof s ? s : 150,
                            p = "undefined" != typeof r ? r : ["center", "center"];
                        if (c.length < 1) {
                            var f = '<div id="dialog-saved-success" class="dialog-wrapper"><span class="savedsuccesstip">' + e + "</span></div>";
                            t("body").append(f), c = t("#dialog-saved-success")
                        }
                        return 150 > d && c.addClass("lite-content"), c.find(".savedsuccesstip").html(e), c.dialog({
                            modal: u,
                            width: l,
                            minHeight: 20,
                            position: p,
                            minWidth: d
                        }).prev().hide(), setTimeout(function() {
                            c.dialog("close"), o && o()
                        }, n || 2e3), c
                    },
                    failDialog: function(e, n, o, i) {
                        var a = t("#dialog-failed");
                        if (a.length < 1) {
                            var r = '<div id="dialog-failed" class="dialog-wrapper"><s class="info"></s><span class="savedfailtip"></span></div>';
                            t("body").append(r), a = t("#dialog-failed")
                        }
                        a.find(".savedfailtip").text(e), a.dialog({
                            modal: !0,
                            width: n || 200,
                            minHeight: 50
                        }).prev().hide(), setTimeout(function() {
                            a.dialog("close"), o && o()
                        }, i || 1e3)
                    },
                    reportSpam: function(t, n) {
                        SNB.Util.checkLogin(function() {
                            e.async("SNB.reportSpam.js", function(e) {
                                e.reportSpam(t, n)
                            })
                        })
                    },
                    getShareInfo: function(e) {
                        SNB.data.is_bind = !1, SNB.data.qq_bind = !1, SNB.data.sina_bind = !1, SNB.Util.checkLogin(function() {
                            SNB.get("/account/oauth/show.json", {}, function(n) {
                                "object" != typeof n && (n = t.parseJSON(n));
                                var o = n.oauthbind,
                                    i = o.length;
                                i && _.forEach(o, function(e, t) {
                                    "qq" == o[t][0] ? (SNB.data.qq_bind = !0, SNB.data.qq_expireIn = o[t][3], SNB.data.qq_accessToken = o[t][1], SNB.data.is_bind = !0) : "sina" == o[t][0] && (SNB.data.sina_expireIn = o[t][3], SNB.data.sina_bind = !0, SNB.data.is_bind = !0)
                                }), e && e()
                            })
                        })
                    },
                    shareDialog: function(t, n) {
                        SNB.Util.getShareInfo(function() {
                            e.async("SNB.shareDialog.js", function(e) {
                                "undefined" != typeof t.canEdit ? e.shareStatus(t, n) : e.shareMsg(t, n)
                            })
                        })
                    },
                    shareModule: function(t) {
                        SNB.Util.getShareInfo(function() {
                            e.async("SNB.portfolioShareDialog.js", function(e) {
                                {
                                    var n = e.portfolioShare;
                                    SNB.data.share = new n(t)
                                }
                            })
                        })
                    },
                    addFriend: function(e, t, n) {
                        var o = e.id,
                            i = "",
                            a = "/friendships/create/" + o + ".json";
                        n && (a += "?trace_id=" + n), SNB.post(a, {
                            remark: !0
                        }, function(n) {
                            if (n.success) {
                                t && t(), n.contact_name ? i = n.contact_name : n.weibo_name && (i = n.weibo_name);
                                var o = SNB.dialog.userGroup(e, !0, i);
                                o && o.dialog({
                                    title: "关注成功",
                                    width: "auto",
                                    modal: !0
                                })
                            } else SNB.Util.failDialog(n.message, 220)
                        }, function(e) {
                            SNB.Util.addFriend_errorCallback(e)
                        })
                    },
                    addFriend_errorCallback: function(n) {
                        var o = n && n.error_code,
                            i = n && n.error_description || "关注出错，请稍后重试";
                        if ("22801" === o) {
                            if (t(".addfri_dialog_full").length) return void t(".addfri_dialog_full").dialog();
                            var a = t("<div class='addfri_dialog_full'>"),
                                r = e("./dialog-with-buttonLink.jade")({
                                    desc: "你今天已新增关注了50人，绑定微博还能查找到好友",
                                    a_href: "/people",
                                    a_text: "去绑定微博"
                                });
                            a.append(r).dialog({
                                width: 210,
                                minHeight: 70,
                                modal: !0
                            }).prev().hide(), a.on("click", ".cancel", function() {
                                a.dialog("close")
                            })
                        } else SNB.Util.failDialog(i, 220, function() {}, 2e3)
                    },
                    removeFriend: function(e, t) {
                        SNB.post("/friendships/destroy/" + e + ".json", t, function() {
                            SNB.Util.failDialog("取消关注失败")
                        })
                    },
                    verifyEmail: function(e, t) {
                        SNB.get("/account/verify_email.json", {
                            email: e
                        }, t)
                    },
                    getEmailService: function(e) {
                        var t = "";
                        return -1 != e.search("@sina.com") || -1 != e.search("@vip.sina.com") || -1 != e.search("@sina.cn") ? t = "http://mail.sina.com.cn/" : -1 != e.search("@sohu.com") ? t = "http://mail.sohu.com" : -1 != e.search("@yahoo.com.cn") || -1 != e.search("@yahoo.cn") ? t = "http://mail.cn.yahoo.com" : -1 != e.search("@yahoo.cn") ? t = "http://mail.cn.yahoo.com" : -1 != e.search("@qq.com") || -1 != e.search("@vip.qq.com") || -1 != e.search("@foxmail.com") ? t = "http://mail.qq.com" : -1 != e.search("@hotmail.com") || -1 != e.search("@msn.com") || -1 != e.search("@live.com") ? t = "http://www.hotmail.com" : -1 != e.search("@gmail.com") ? t = "http://mail.google.com" : -1 != e.search("@139.com") ? t = "http://mail.10086.cn/" : -1 != e.search("@21cn.com") || -1 != e.search("@21cn.net") ? t = "http://mail.21cn.com" : -1 != e.search("@tom.com") || -1 != e.search("@vip.tom.com") || -1 != e.search("163.net") ? t = "http://mail.tom.com" : -1 != e.search("@163.com") ? t = "http://mail.163.com" : -1 != e.search("@126.com") ? t = "http://mail.126.com/" : -1 != e.search("@yeah.net") ? t = "http://www.yeah.net/" : -1 != e.search("@sogou.com") ? t = "http://mail.sogou.com/" : -1 != e.search("@189.cn") ? t = "http://webmail17.189.cn/webmail/" : -1 != e.search("@eyou.com") ? t = "http://www.eyou.com/" : -1 != e.search("@188.com") ? t = "http://www.188.com/" : -1 != e.search("@wo.com.cn") && (t = "http://mail.wo.com"), t
                    },
                    activate_send_email: function(e, t, n) {
                        var o = "undefined" != typeof n && "modify_email" === n ? "/account/activate_send_newemail.json" : "/account/activate_send_email.json",
                            i = /\*/.test(e) || !e ? {} : {
                                email: e
                            };
                        SNB.post(o, i, function() {
                            t ? t() : SNB.Util.stateDialog("激活邮件已重发，请登录邮箱确认")
                        }, function(e) {
                            SNB.Util.failDialog(e.error_description)
                        })
                    },
                    oauth_bind_verify: function(e) {
                        seajs.use("SNB.bind_verify.js", function() {
                            SNB.bind.bind_verify(e)
                        })
                    },
                    parseDate: function(e) {
                        var t = e.match(/(\d+)/g);
                        return new Date(t[0], t[1] - 1, t[2])
                    },
                    scrollTop: function(e, n) {
                        var o = "object" == typeof n && "undefined" != typeof n.top ? n.top : 40,
                            i = t(e).offset().top;
                        i -= o, t(window).scrollTop(i)
                    },
                    portfolio_addstock: function(n, o, i) {
                        SNB.post("/stock/portfolio/addstock.json", n, function(e) {
                            o && o(e)
                        }, function(n) {
                            var o = n && n.error_code,
                                a = n && n.error_description || "添加股票出错，请稍后重试";
                            if ("22804" === o) {
                                if (t(".addStock_dialog_full").length) return void t(".addStock_dialog_full").dialog();
                                var r = t("<div class='addStock_dialog_full'>"),
                                    s = e("./dialog-with-buttonLink.jade")({
                                        desc: "你今天已新增关注了10只股票，下载客户端可随时获取行情变化 ",
                                        a_href: "/about/mobile-xueqiu",
                                        a_text: "了解详情"
                                    });
                                r.append(s).dialog({
                                    width: 220,
                                    minHeight: 70,
                                    modal: !0
                                }).prev().hide(), r.on("click", ".cancel", function() {
                                    r.dialog("close")
                                })
                            } else SNB.Util.failDialog(a, 220, function() {}, 2e3);
                            i && i(n)
                        })
                    },
                    saveConfig: function(e, n) {
                        if (SNB.Util.getAccessToken()) {
                            var o = [],
                                i = [];
                            for (var a in e) o.push(a), i.push(e[a]), "timeline_source" == a ? t.cookie("source", null) : 0 == a.indexOf("portfolio") && t.cookie(a.replace("portfolio_", ""), null);
                            SNB.get("/user/setting/set_select.json", {
                                type: o + "",
                                value: i + ""
                            }, function() {
                                n && n()
                            })
                        }
                    },
                    getConfig: function(e, t) {
                        SNB.get("/user/setting/select.json", {
                            types: e.toString()
                        }, function(e) {
                            t(e)
                        })
                    },
                    autoCompleteSearchStock: function(e, n, o) {
                        e.autocomplete({
                            source: function(e, n) {
                                SNB.get("/stock/search.json", {
                                    size: 10,
                                    code: e.term
                                }, function(e) {
                                    n(t.map(e.stocks, function(e) {
                                        SNB && SNB.stocksSearch && (SNB.stocksSearch[e.code] = e);
                                        var t = e.name + "(" + e.code + ")",
                                            n = e.code;
                                        return o && (n = "$" + t + "$"), {
                                            label: t,
                                            name: e.name,
                                            value: n
                                        }
                                    }))
                                })
                            },
                            select: function(e, t) {
                                var o = t.item.value,
                                    i = t.item.name;
                                n && n(o, i)
                            },
                            autoFocus: !0
                        })
                    },
                    formatTime: function(e) {
                        if (_.isUndefined(e)) return "";
                        var t = {
                                Jan: "01",
                                Feb: "02",
                                Mar: "03",
                                Apr: "04",
                                May: "05",
                                Jun: "06",
                                Jul: "07",
                                Aug: "08",
                                Sep: "09",
                                Oct: "10",
                                Nov: "11",
                                Dec: "12"
                            },
                            n = _.isNumber(e) ? new Date(e).toString() : e,
                            o = n.split(" ");
                        return 1 == (o[2] + "").length && (o[2] = "0" + o[2]), o[3] && /\d{4}/.test(o[3]) ? [o[3], t[o[1]], o[2]].join("-") : [o[5], t[o[1]], o[2]].join("-")
                    },
                    redirectToIndex: function(e, t, n) {
                        setTimeout(_.bind(function o(t) {
                            if (--t > 0) e.html(t), setTimeout(_.bind(o, null, t), 1e3);
                            else {
                                var i = "/?_=" + SNB.Util.getTimestamp();
                                "undefined" != typeof n && (i = i + "#userEmail=" + n), window.location.href = i
                            }
                        }, null, t), 1e3)
                    },
                    updateStatus: function(e, t, n) {
                        SNB.post("/statuses/update.json", e, function(e) {
                            t && t(e)
                        }, function(e) {
                            SNB.Util.failDialog(e.error_code ? e.error_description : "服务器出错，请重试。"), n && n(e)
                        })
                    },
                    getDesc: function(e) {
                        return e.recommend || e.verified_description || e.description || ""
                    },
                    calculateTs: function(e, t) {
                        var n = new Date(e).toString();
                        return n = n.replace(/\d+:\d+:\d+/g, t), Date.parse(n)
                    },
                    getUSTimezoneOffset: function() {
                        var e = new Date,
                            t = e.getTimezoneOffset(),
                            n = t / 60 * -1 - -5;
                        return n
                    },
                    getBeforeAfterTrade: function(e) {
                        var t = this.getUSTimezoneOffset(),
                            n = Date.now(),
                            o = n - 36e5 * t,
                            i = new Date(o).toString(),
                            a = i.replace(/\d+:\d+:\d+/g, "04:00:00"),
                            r = i.replace(/\d+:\d+:\d+/g, "16:00:00"),
                            s = Date.parse(a),
                            c = Date.parse(r),
                            u = Date.parse(e.afterHoursTime);
                        return o > s && c > o ? u > s && c > u ? "盘后" : "盘前" : "盘后"
                    },
                    getBeforeAfterTradeNew: function(e) {
                        if (e && e.afterHoursTime) {
                            var t = parseInt(e.afterHoursTime.substring(11, 13));
                            return 12 > t ? "盘前" : t > 12 ? "盘后" : void 0
                        }
                    },
                    getTradeTime: function(e, t) {
                        var n = t ? t : "09:30:00",
                            o = new Date,
                            i = Date.parse(o),
                            a = (o.getTimezoneOffset(), "美股" === e ? this.getUSTimezoneOffset() : 0),
                            r = i - 36e5 * a,
                            o = new Date(r),
                            s = o.getDay(),
                            c = {
                                start: SNB.Util.calculateTs(r, n),
                                end: SNB.Util.calculateTs(r, "沪深" == e ? "15:05:00" : "16:20:00")
                            };
                        return 0 == s || 6 == s ? {
                            phase: "end"
                        } : r >= c.start && r <= c.end ? {
                            phase: "trade"
                        } : r < c.start ? {
                            phase: "before",
                            ts: c.start - r
                        } : {
                            phase: "end"
                        }
                    },
                    getNewStocklistUrl: function(e, t, n) {
                        var o = {
                                "明星股": {
                                    firstName: "美国股市",
                                    industry: "明星股",
                                    exchange: "US"
                                },
                                "中国概念股": {
                                    firstName: "美国股市",
                                    industry: "中国概念股",
                                    exchange: "US"
                                },
                                "上市预告": {
                                    firstName: "美国股市",
                                    industry: "上市预告",
                                    exchange: "US"
                                },
                                "新上市公司": {
                                    firstName: "美国股市",
                                    industry: "新上市公司",
                                    exchange: "US"
                                },
                                "可转债": {
                                    firstName: "债券及回购",
                                    industry: "可转债",
                                    exchange: "CN"
                                },
                                "国债": {
                                    firstName: "债券及回购",
                                    industry: "国债",
                                    exchange: "CN"
                                },
                                "企债": {
                                    firstName: "债券及回购",
                                    industry: "企债",
                                    exchange: "CN"
                                },
                                "回购": {
                                    firstName: "债券及回购",
                                    industry: "回购",
                                    exchange: "CN"
                                },
                                "封闭式基金": {
                                    firstName: "基金",
                                    industry: "封闭式基金",
                                    exchange: "CN"
                                },
                                "传统封闭式基金": {
                                    firstName: "基金",
                                    industry: "传统封闭式基金",
                                    exchange: "CN"
                                },
                                "货币式基金": {
                                    firstName: "基金",
                                    industry: "货币式基金",
                                    exchange: "CN"
                                },
                                ETF: {
                                    firstName: "基金",
                                    industry: "ETF",
                                    exchange: "CN"
                                },
                                LOF: {
                                    firstName: "基金",
                                    industry: "LOF",
                                    exchange: "CN"
                                },
                                "比特币(CNY)": {
                                    firstName: "比特币",
                                    industry: "比特币(CNY)",
                                    exchange: "比特币"
                                },
                                "比特币(USD)": {
                                    firstName: "比特币",
                                    industry: "比特币(USD)",
                                    exchange: "比特币"
                                },
                                "比特币(EUR)": {
                                    firstName: "比特币",
                                    industry: "比特币(EUR)",
                                    exchange: "比特币"
                                },
                                "比特币(GBP)": {
                                    firstName: "比特币",
                                    industry: "比特币(GBP)",
                                    exchange: "比特币"
                                },
                                "比特币(JPY)": {
                                    firstName: "比特币",
                                    industry: "比特币(JPY)",
                                    exchange: "比特币"
                                },
                                "比特币(AUD)": {
                                    firstName: "比特币",
                                    industry: "比特币(AUD)",
                                    exchange: "比特币"
                                },
                                QH: {
                                    firstName: "期货",
                                    industry: "国债期货",
                                    exchange: "QH"
                                },
                                TP: {
                                    firstName: "信托",
                                    industry: "信托",
                                    exchange: "TP"
                                },
                                FP: {
                                    firstName: "理财",
                                    industry: "理财产品",
                                    exchange: "FP"
                                },
                                US: {
                                    firstName: "美国股市",
                                    secondName: "雪球行业",
                                    plate: t,
                                    industry: e,
                                    exchange: "US"
                                },
                                CN: {
                                    firstName: "沪深股市",
                                    secondName: "雪球行业",
                                    plate: t,
                                    industry: e,
                                    exchange: "CN"
                                },
                                HK: {
                                    firstName: "香港股市",
                                    secondName: "雪球行业",
                                    plate: t,
                                    industry: e,
                                    exchange: "HK"
                                },
                                "私募工场": {
                                    firstName: "私募",
                                    industry: "私募工场",
                                    exchange: "P"
                                }
                            },
                            i = o[e] || o[n],
                            a = [];
                        for (var r in i) a.push(r + "=" + i[r]);
                        return SNB.domain.host + "/hq#" + a.join("&")
                    }
                }, _.each(SNB.Util.BBCODE_MAPPING, function(e) {
                    SNB.Util.BBCODE_TO_TEXT[e[0]] = e[1], SNB.Util.TEXT_TO_BBCODE[e[1]] = e[0]
                }), t(function() {
                    if (!("placeholder" in document.createElement("input"))) {
                        t("[placeholder]").live("focus", function() {
                            var e = t(this);
                            e.removeClass("placeholder"), e.val() == e.attr("placeholder") && e.val("")
                        }).live("blur", function() {
                            var e = t(this);
                            "" == e.val() && (e.addClass("placeholder"), e.val("password" != e.attr("type") ? e.attr("placeholder") : ""))
                        }).blur();
                        var e = {
                            get: function(e) {
                                var n = t(e);
                                return n.hasClass("placeholder") ? "" : e.value
                            }
                        };
                        t.valHooks.input = e, t.valHooks.textarea = e
                    }
                }), t.cookie("x_nickname", null, {
                    path: "/",
                    domain: ".xueqiu.com"
                }), t.cookie("x_passwd", null, {
                    path: "/",
                    domain: ".xueqiu.com"
                }), t.cookie("x_token", null, {
                    path: "/",
                    domain: ".xueqiu.com"
                }), t.cookie("x_userid", null, {
                    path: "/",
                    domain: ".xueqiu.com"
                }), t.cookie("x_tuserid", null, {
                    path: "/",
                    domain: ".xueqiu.com"
                }), t.cookie("bbs_auth", null, {
                    path: "/",
                    domain: ".xueqiu.com"
                }), t.cookie("bbs_sid", null, {
                    path: "/",
                    domain: ".xueqiu.com"
                }), t.cookie("x_userip", null, {
                    path: "/",
                    domain: ".xueqiu.com"
                }), t.cookie("__utma", null, {
                    path: "/",
                    domain: ".xueqiu.com"
                }), t.cookie("__utmb", null, {
                    path: "/",
                    domain: ".xueqiu.com"
                }), t.cookie("__utmc", null, {
                    path: "/",
                    domain: ".xueqiu.com"
                }), t.cookie("__utmz", null, {
                    path: "/",
                    domain: ".xueqiu.com"
                }), t.cookie("order", null, {
                    path: "/"
                }), t.cookie("col", null, {
                    path: "/"
                }), t.cookie("__exp_t", null, {
                    path: "/"
                }), t("body").on("click", ".nav.account .login, #openLoginDialog", function(e) {
                    e.preventDefault(), SNB.Util.checkLogin(function() {}, e)
                }), e.async("SNB.typeahead.js");
            var o = t(".notices-list");
            SNB.notification = function() {
                var e = $body.hasClass("noMentions");
                return !SNB.currentUser.id || e ? !1 : void SNB.get("/remind/unread.json", function(e) {
                    delete e.user_id, delete e.status, delete e.contact_friends, delete e.weibo_friends, delete e.events_id, delete e.events, delete e.dm, o.find("li:not(.setting)").hide();
                    var n = 0;
                    _.each(e, function(e, t) {
                        e && (o.find("." + t).show().find(".count").html(e), n += 0 | e)
                    }), n > 0 ? t("#btn-notice").css({
                        display: "block",
                        lineHeight: "11px"
                    }).find("sup").text(n).show() : t("#btn-notice").css({
                        display: "none",
                        lineHeight: "20px"
                    }).find("sup").text("0").hide()
                })
            };
            var i = (SNB.currentUser.profile || "/") + "?source=3#notices";
            o.find(".notices a").attr("href", i).end().find("li:not(.setting)").hide(), SNB.Image = {
                    default_30: "community/default/avatar.png!30x30.png",
                    default_50: "community/default/avatar.png!50x50.png",
                    default_180: "community/default/avatar.png!180x180.png",
                    zoomIn: function(e) {
                        var t = e.attr("src"),
                            n = t.indexOf(-1 != t.indexOf("%21custom.jpg") ? "%21custom.jpg" : "!custom.jpg");
                        if (-1 != n) {
                            var o = t.substr(0, n),
                                i = "<a class='zoom' href='" + o + "'target='_blank'><i></i><span>查看原图</span></a>";
                            e.next().is("br") && e.next().remove(), e.after(i)
                        }
                    },
                    lazyload: function(e) {
                        return e.replace(/<img(.*?)src="?(https?:\/\/xqimg.*?custom.jpg)"?(.*?)\/?>/gi, '<img$1src="//assets.imedao.com/images/blank.png" data-image="$2"$3/>')
                    },
                    getProfileImage: function(e, t) {
                        e = e && e.split(",") || [];
                        var n = SNB.domain.photo + "/" + (e.length > 3 ? e[3] : 1 == e.length ? e[0] : "community/default/avatar.png!30x30.png");
                        return n = "undefined" != typeof t ? n.replace(/([0-9]+)x([0-9]+)/, t + "x" + t) : n
                    }
                }, t(function() {
                    SNB.notification()
                }), window.isActive = !0, setInterval(function() {
                    window.isActive && SNB.notification()
                }, 6e4), t(window).focus(function() {
                    SNB.notification()
                }), t(function() {
                    t(window).focus(function() {
                        window.isActive = !0
                    }), t(window).blur(function() {
                        window.isActive = !1
                    })
                }), $doc.on("keydown", function(e) {
                    t(e.target).is("input, textarea") || t(e.target).prop("contenteditable") || 8 !== e.keyCode || e.preventDefault()
                }),
                function() {
                    var e = !0,
                        n = t.browser.msie ? 100 : 50;
                    SNB.scroll = {};
                    var o = SNB.scroll.ConditionHandler = function(e, t) {
                            var n = "function" == typeof e ? e : function() {
                                return e
                            };
                            return function(e) {
                                n() && t(e)
                            }
                        },
                        i = SNB.scroll.handlers = [];
                    setTimeout(function s() {
                        var t;
                        e && (e = !1, t = $win.scrollTop(), _.each(i, function(e) {
                            e(t)
                        })), setTimeout(s, n)
                    }, n), $win.scroll(function() {
                        e = !0
                    });
                    var a = SNB.scroll.isEditorMode = function() {
                            return $body.hasClass("editor-mode") || $body.hasClass("main-editor-mode")
                        },
                        r = SNB.scroll.isNotEditorMode = function() {
                            return !a()
                        };
                    t(function() {
                        t("body#jade-single,body#search,body#my-home,body#my-profile,body#his-profile,body#hots-statuses,body#jade-singleStock,body.scrollToTop").found(function() {
                            var e = t("#center"),
                                n = parseInt($body.attr("data_offset_left")) || 0,
                                a = t('<a href="#" title="回到顶部" id="toTop"></a>').hide().on("click", function(e) {
                                    e.preventDefault(), $win.scrollTop(0), a.fadeOut(200)
                                }).appendTo($body),
                                s = t("body#jade-single").length ? 780 : 740;
                            i.push(o(r, function(e) {
                                e > 1200 ? a.fadeIn(200) : a.fadeOut(200)
                            })), a.css("left", e.offset().left + s + n), window.onresize = function() {
                                a.css("left", e.offset().left + s + n)
                            }
                        })
                    })
                }(), $body.hasClass("noPreload") || (e.async("SNB.editor.js"), e.async("SNB.repostDialog.js"), e.async("SNB.downloadDialog.js"), e.async("SNB.userRemark.js"), t.browser.isPC && e.async("SNB.tooltip.js")), t.browser.msie && t("body").on("click", "a", function(e) {
                    var n = t(this).attr("href");
                    n && "/n/" == n.substr(0, 2) && (e.preventDefault(), window.open("/n/" + encodeURIComponent(n.substr(3))))
                }), "undefined" != typeof console && (console.log("%c", "padding:60px;background:url(//assets.imedao.com/images/logos/logo_xueqiu_120/logo_xueqiu_120-02.png) no-repeat;line-height:120px;height:1px;"), console.log("%cSnowball F2E: Looking for you.", 'color:#949494;font-weight:500;font-size:14px;font-family:"Hiragino Sans GB W3"'), console.log("%cThe Greed Island: %c//xueqiu.com/about/jobs#senior-frontend-engineer", "color:#949494;font-size:12px;", "color:#949494;font-size:12px;"))
        }($)
}), define("dialog-with-buttonLink.jade.js", function(require, exports, module) {
    function anonymous(locals, attrs, escape, rethrow, merge) {
        attrs = attrs || jade.attrs, escape = escape || jade.escape, rethrow = rethrow || jade.rethrow, merge = merge || jade.merge;
        var buf = [];
        with(locals || {}) {
            buf.push('<p class="hd">');
            var __val__ = desc;
            buf.push(escape(null == __val__ ? "" : __val__)), buf.push('</p><p class="ops"><a'), buf.push(attrs({
                href: a_href,
                target: "_blank",
                "class": "btn_link"
            }, {
                href: !0,
                target: !0
            })), buf.push(">");
            var __val__ = a_text;
            buf.push(escape(null == __val__ ? "" : __val__)), buf.push('</a><input type="button" value="取消" class="cancel button"/></p>')
        }
        return buf.join("")
    }
    module.exports = anonymous
});
