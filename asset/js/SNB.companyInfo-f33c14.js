define("SNB.companyInfo.js", ["stockReport.jade.js"], function(t) {
    function a(t, a, n) {
        var i = /^-?\d+$/,
            s = /^-?\d+(\.\d+)?$/,
            o = t + "";
        if (!i.test(o) && !s.test(o)) return o;
        if (stockData.isMobile) return i.test(o) && parseInt(t) < 1e4 && parseInt(t) > -1e4 ? o : e(t);
        if (i.test(o) && parseInt(t) < 1e4 && parseInt(t) > -1e4) return o;
        var r;
        parseFloat(t) < 0 && (r = !0, t = Math.abs(t));
        var l, d, c = ("" + t).split("."),
            p = "";
        for (a || (a = ","), n || 0 === n || (n = 3), l = c[0].length, 0 === c[0].indexOf("-"); l > n;) d = l - n, p = a + c[0].slice(d, l) + p, l = d;
        return p = c[0].slice(0, l) + p, c[0] = p, r ? "-" + c.join(".") : c.join(".")
    }

    function e(t) {
        if (!t) return "-";
        var a = parseFloat(t),
            e = !1;
        0 > a && (t = Math.abs(a), e = !0);
        for (var n = ["", "万", "亿"], i = 0; t > 1e4 && 2 > i;) t /= 1e4, i++;
        a = Math.round(100 * t) / 100;
        var s = a.toString(),
            o = s.indexOf(".");
        for (0 > o && (o = s.length, s += "."); s.length <= o + 2;) s += "0";
        var r = s + n[i];
        return e && (r = "-" + r), r
    }

    function n(t) {
        return 0 == t ? "" : SNB.Util.decimal_2(t)
    }

    function i(t) {
        function a(t, a) {
            var e = t.split("-"),
                n = e[0],
                i = e[1];
            return a ? 4 == i ? (n++, i = 1) : i++ : i > 1 ? i-- : (i = 4, n--), n + "-" + i
        }

        function e(t, a, e, s) {
            var o = '<table cellpadding="0" cellspacing="0" class="dataTable">';
            o += e ? "<thead><tr><th>指标</th><th>金额</th></tr>" : "<thead><tr><th>" + a + "</th><th>数额</th><th>同比</th><th>环比</th></tr></thead>", o += "<tbody>";
            for (var r = 0, l = t.length; l > r; r++) {
                var d = t[r],
                    c = i[d.name],
                    p = r % 2 ? "" : " class='odd'";
                o += "<tr" + p + ">", o += s ? '<td style="min-width:80px">' + c + "</td>" : "<td>" + c + "</td>", o += "<td>" + n(d.amount) + "</td>", e || (o += "<td>" + n(d.yoy) + "</td>", o += "<td>" + n(d.qoq) + "</td>"), o += "</tr>"
            }
            return o += "</tbody></table>"
        }
        var i = {
            revenue: "总收入",
            gross_income: "毛利总额",
            net_income: "净利润",
            current_asset: "流动资产总额",
            total_asset: "资产总额",
            cash_investment: "现金及短投",
            current_liability: "流动负债总额",
            total_liability: "负债总额",
            total_equity: "股东权益合计",
            cash_short_invest: "每股现金及短期投资",
            book_value: "每股净资产"
        };
        if (!t || !t.length) return "";
        var s = t[0],
            o = "",
            r = s.year_quarter,
            l = a(r),
            d = !1;
        r && SNB.get("/stock/financial/quarter.json", {
            key: "47bce5c74f",
            qtr: l,
            code: stockData.stockInfo.stockid
        }, function(t) {
            if (t.financials && t.financials.length) {
                var n = t.financials[0],
                    i = n.year_quarter;
                s.profit_statement && s.profit_statement.length && (o += '<div class="companyInfoTitle"><strong>利润表</strong><span>(单位：百万美元)</span><span class="changeQarter"><a href="#" id="pre">上季度</a><a href="#" id="next">下季度</a></span></div>', o += '<div class="tableContainer"><table class="wrapperTable"><tr><td class="tdleft">', o += e(s.profit_statement, r.replace("-", "Q")), o += '</td><td class="tdright">', o += e(n.profit_statement, l.replace("-", "Q")), o += "</td></tr></table>", o += "</div>", d = !0), s.balance_sheet && s.balance_sheet.length && (o += '<div class="companyInfoTitle"><strong>资产负债表</strong><span>(单位：百万美元)</span></div>', o += '<div class="tableContainer"><table class="wrapperTable"><tr><td class="tdleft">', o += e(s.balance_sheet, r = r.replace("-", "Q"), !1, !0), o += '</td><td class="tdright">', o += e(n.balance_sheet, l.replace("-", "Q"), !1, !0), o += "</td></tr></table>", o += "</div>", d = !0), s.latest_data_per_share && s.latest_data_per_share.length && (o += '<div class="companyInfoTitle"><strong>最新每股数据</strong><span>(单位：美元)</span></div>', o += '<div class="tableContainer">', o += e(s.latest_data_per_share, "", !0), o += "</div>", d = !0), $(".companyDataShow").html(o).find("#pre").data("qrt", i).end().find("#next").data("qrt", s.year_quarter).end().find(".changeQarter a").click(function(t) {
                    t.preventDefault();
                    var n = $(this).data("qrt"),
                        i = "next" == this.id,
                        s = a(n, i),
                        o = this;
                    SNB.get("/stock/financial/quarter.json", {
                        key: "47bce5c74f",
                        qtr: s,
                        code: stockData.stockInfo.stockid
                    }, function(t) {
                        function a(t, a) {
                            i ? (t.eq(1).html(t.eq(0).html()), t.eq(0).html(e(n[a], s.replace("-", "Q")))) : (t.eq(0).html(t.eq(1).html()), t.eq(1).html(e(n[a], s.replace("-", "Q"))))
                        }
                        if (!t.financials || !t.financials.length) return !1;
                        var n = t.financials[0],
                            s = n.year_quarter,
                            r = $(".companyDataShow").find(".wrapperTable");
                        a(r.eq(0).find(".tdleft,.tdright"), "profit_statement"), a(r.eq(1).find(".tdleft,.tdright"), "balance_sheet");
                        $(o).siblings();
                        $(o).siblings().data("qrt", $(o).data("qrt")), $(o).data("qrt", s)
                    })
                })
            }
        })
    }

    function s(t) {
        function a(t) {
            var a = /(\d+)-(\d)/,
                e = {},
                n = {};
            n.years = [];
            for (var i = 0, s = t.length; s > i; i++) {
                var o = t[i],
                    r = o.quarter.match(a),
                    l = r[2],
                    d = r[1];
                n[l] ? n[l][d] = o.amount : (n[l] = {}, n[l][d] = o.amount), e[d] ? e[d] += parseFloat(o.amount) : e[d] = parseFloat(o.amount), _.include(n.years, d) || n.years.push(d)
            }
            return n[5] = e, n
        }

        function e(t) {
            var a = t.years.sort(function(t, a) {
                    return a - t
                }),
                e = '<table cellpadding="0" cellspacing="0" class="dataTable">';
            e += "<thead><tr><th>财季/年份</th><th>" + a[0] + "</th><th>" + a[1] + "</th><th>" + a[2] + "</th></tr></thead>";
            for (var i = 1; 6 > i; i++) {
                var s = t[i],
                    o = i % 2 ? " class='odd'" : "";
                e += "<tr" + o + ">", e += 5 == i ? "<td>合计</td>" : "<td>Q" + i + "</td>", e += "<td>" + n(s[a[0]]) + "</td>", e += "<td>" + n(s[a[1]]) + "</td>", e += "<td>" + n(s[a[2]]) + "</td>", e += "</tr>"
            }
            return e += "</tbody></table>"
        }
        if (!t || !t.length) return "";
        var i = t[0],
            s = "";
        i.revenues && i.revenues.length && (s += '<div class="companyInfoTitle"><strong>总收入额对比</strong><span>(单位：百万美元)</span></div>', s += '<div class="tableContainer">', s += e(a(i.revenues)), s += "</div>"), i.eps && i.eps.length && (s += '<div class="companyInfoTitle"><strong>每股收益对比</strong><span>(单位：美元)</span></div>', s += '<div class="tableContainer">', s += e(a(i.eps)), s += "</div>"), $(".companyDataShow").html(s)
    }

    function o(t) {
        function a(t) {
            var a = '<table cellpadding="0" cellspacing="0" class="dataTable">';
            a += "<thead><tr><th>姓名</th><th>职务</th></tr></thead>";
            for (var e = 0, n = t.length; n > e; e++) {
                var i = t[e],
                    s = e % 2 ? "" : " class='odd'";
                a += "<tr" + s + ">", a += i.url ? '<td><a href="' + i.url + '" target="_blank">' + i.name + "</a></td>" : "<td>" + i.name + "</td>", a += "<td>" + i.position + "</td>"
            }
            return a += "</table>"
        }
        if (!t || !t.length) return "";
        var e = t[0],
            n = "";
        e.managers && e.managers.length && (n += '<div class="companyInfoTitle"><strong>公司高管</strong></div>', n += '<div class="tableContainer">', n += a(e.managers), n += "</div>"), $(".companyDataShow").html(n)
    }

    function r(a) {
        var e = t("./stockReport.jade");
        $(".companyDataShow").html(e(a))
    }

    function l(t, a) {
        function e(a) {
            var e = ' <div class="tableContainer" style="margin-bottom:20px;"><table class="dataTable">',
                n = _.keys(t),
                i = 0;
            _.each(n, function(n) {
                if (a[n]) {
                    i++;
                    var s = a[n];
                    ~_.indexOf(ha, n) && (s = parseFloat(s).toFixed(2) + "%"), ~_.indexOf(ma, n) && (s = s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6, 8)), e += i % 2 ? "<tr>" : '<tr class="odd">', e += '<td style="min-width:130px;">' + t[n] + "</td><td>" + s + "</td></tr>"
                }
            }), e += "</table></div>", $(".companyDataShow").append(e)
        }
        a.data && !_.isUndefined(a.data.length) ? a.data.length > 0 ? _.each(a.data, function(t) {
            e(t)
        }) : $(".companyDataShow").append('<div class="tableContainer" style="margin-bottom:20px;padding:5px 0px;">暂无数据.</div>') : e(a.data || a);
        var n = '<div class="tip">雪球提醒您：以上数据由合作伙伴提供，仅供参考，交易请以正式公告数据为准。</div>';
        $(".companyDataShow").append(n)
    }

    function d(t, e, n) {
        function i(i, s, o, r) {
            var l = " ",
                d = ["一、", "二、", "三、", "四、", "五、", "六、", "七、", "八、", "九、"],
                c = ["gross_margin", "operating_margin", "ebt_margin", "total_current_assests", "total_assets", "total_current_liabilities", "total_liabilities", "total_stockholders_equity", "total_liabilities_and_equity", "cash_conversion_cycle", "revenue", "gross_profit", "cost_of_revenue", "total_operating_expenses", "operating_income", "net_income", "net_income_available_to_common_shareholders", "basic_earnings_per_share", "diluted_earnings_per_share", "net_cash_provided_by_operating_activities", "net_cash_used_for_investing_activities", "net_cash_provided_by_used_for_financing_activities", "total_cash", "total_non_current_assets", "net_property_plant_and_equipment", "total_non_current_liabilities", "total_stockholders_equity"];
            return i.indexOf("headerTitle") > -1 ? l = '<tr class="title-row"><td class="first-td" colspan="5">' + o + "</td></tr>" : (l += s ? _.indexOf(c, i) > -1 ? '<tr class="bold-row">' : _.indexOf(d, o.substr(0, 2)) > -1 ? '<tr class="title-row">' : "<tr>" : '<tr class="first-row">', o && r && (l = "<tr>"), l += '<td class="first-td" ' + (stockData.isMobile ? 'style="max-width:130px;"' : "") + ">" + (o || t[i]) + "</td>", _.each(e.data, function(e) {
                var s = e[i],
                    r = 0 > s;
                ~_.indexOf(ma, i) || t[i] && t[i].indexOf("日期") > -1 && "exrightexp" != i ? n || (s = f(s)) : s ? ~(o || t[i]).indexOf("(%)") ? (n && (s *= 100), s = s.toFixed(2)) : ~(o || t[i]).indexOf("(万)") ? s = (s / 1e4).toFixed(2) : ~(o || t[i]).indexOf("(百万)") ? (s = (s / 1e6).toFixed(2), s = a(s)) : _.isNumber(s) && (2 == SNB.data.dataType ? s = (100 * s).toFixed(2) + "%" : 0 == s ? s = "-" : (s = parseFloat(s).toFixed(2), s = a(s))) : s = "-", l += r ? '<td style="color:red;">' + s + "</td>" : "<td>" + s + "</td>"
            }), l += "</tr>"), l
        }
        if (e.data && e.data.length) {
            $(".page-next").removeClass("noClick");
            var s;
            s = stockData.isMobile ? ' <div class="table-responsive dataTable-div" style="margin-bottom:20px;"><div style="width: 800px"><table class="dataTable table table-bordered">' : ' <div class="table-responsive dataTable-div" style="margin-bottom:20px;"><table class="dataTable table table-bordered">';
            var o = _.keys(t);
            if (_.each(o, function(a, e) {
                    var n = "";
                    if (_.isObject(t[a])) {
                        n = '<tr class="title-row"><td class="first-td" colspan="5">' + a + "</td></tr>";
                        var o = t[a],
                            r = _.keys(t[a]);
                        _.each(r, function(t, a) {
                            var e = o[t];
                            n += i(t, a, e, !0)
                        })
                    } else n = i(a, e, t[a]);
                    s += n
                }), s += stockData.isMobile ? "</table></div></div>" : "</table></div>", n) return n.html(s), !1;
            $(".companyDataShow").html(s);
            var r = $(".table-responsive"),
                l = r.clone().addClass("cloneTableH");
            if (l.css("left", $(".companyDataShow").offset().left), $(".companyDataShow").append(l.clone().addClass("cloneTableH-date")), $(window).off("scroll").on("scroll", function() {
                    var t = $(this).scrollTop();
                    $(".cloneTableH").toggle(t > 55), $(".cloneTableH-date").scrollLeft(r.scrollLeft())
                }), stockData.isMobile) {
                var d = $(r).find("table tbody tr td").eq(0).outerWidth(),
                    c = r.clone().css({
                        width: d + 1
                    });
                $(".companyDataShow").append(c.addClass("cloneTableV-title")), r.on("scroll", function() {
                    $(".cloneTableH-date").scrollLeft($(this).scrollLeft())
                }), $(".companyDataShow").append(l.clone().css("width", d).addClass("cloneTableH-title"))
            }
        } else n ? (n.html('<div style="text-align:center;">暂无数据</div>'), n.parent().find(".page-next").addClass("noClick")) : ($(".companyDataShow").html('<div style="text-align:center;">暂无数据</div>'), $(".page-next").addClass("noClick"))
    }

    function c(t, a, e) {
        var n = e || $("body");
        $(".stockInfo-page", n).length || ($(".stockTitle", n).append('<span class="stockInfo-page"><a href="#" class="page-pre">上一页</a><a href="#" class="page-next">下一页</a></span>'), $(".stockTitle", n).on("click", ".stockInfo-page a", function() {
            var a = $(".stockInfo-page", n).data("page");
            return $(this).hasClass("noClick") ? !1 : ($(this).hasClass("page-pre") && a--, $(this).hasClass("page-next") && a++, 1 == a ? $(".page-pre", n).addClass("noClick") : $(".page-pre", n).removeClass("noClick"), $(".stockInfo-page", n).data("page", a), t(a), !1)
        })), $(".stockInfo-page", n).data("page", a), 1 == a ? $(".page-pre", n).addClass("noClick") : $(".page-pre", n).removeClass("noClick")
    }

    function p(t) {
        var a = SNB.domain.base + t.replace("json", "csv");
        a += "?symbol=" + ca + "&page=1&size=10000";
        var e = '<span class="download-csv"><a href="#" target="_blank">下载csv</a></span>';
        $(".stockTitle").append(e), $(".stockTitle").on("click", ".download-csv a", function() {
            return window.open(a, "_blank"), !1
        })
    }

    function u(t) {
        if ($(".dataType").length) return !1;
        var a = ' <span class="dataType"><a href="#" class="noClick" data-type="1" target="_blank">按金额计算</a><a href="#" data-type="2" target="_blank">按百分比计算</a></span>';
        $(".stockTitle").append(a), $(".dataType").on("click", "a", function(a) {
            return a.preventDefault(), $(this).hasClass("noClick") ? !1 : (SNB.data.dataType = $(this).data("type"), $(".dataType a").removeClass("noClick"), $(this).addClass("noClick"), t(SNB.data.page, !0), void 0)
        })
    }

    function f(t) {
        return t ? t.length < 8 ? t : t.slice(0, 4) + "-" + t.slice(4, 6) + "-" + t.slice(6, 8) : "-"
    }

    function h(t, a, e, n) {
        var i = '<div class="tab-table-responsive dataTable-div" style="margin-bottom:20px;"><table class="dataTable table table-bordered">';
        stockData.isMobile && (i = '<div class="tab-table-responsive dataTable-div" style="margin-bottom:20px;"><table class="table table-bordered">');
        for (var s in a)
            if (_.isArray(a[s])) {
                var o = a[s];
                if (o.length) {
                    var r = _.first(o),
                        l = _.keys(r);
                    if (l = _.reject(l, function(t) {
                            return t.indexOf("code") > -1 || "keynameacronym" == t || "level2nameacronym" == t
                        }), "GSJJ" === stockData.pageName) {
                        var d = t[_.first(l)],
                            c = "";
                        _.each(o, function(t, a) {
                            2 === l.length ? (a && (c += "<br>"), c += t[l[0]] + "：" + t[l[1]]) : c += t[l[0]]
                        }), i += stockData.isMobile ? '<tr><td style="font-weight: bold;">' + d + "</td><td>" + c + "</td></tr>" : '<tr><td width="200px" style="font-weight: bold;">' + d + '</td><td colspan="' + (e - 1) + '">' + c + "</td></tr>"
                    } else {
                        i += '<tr class="title-row">';
                        for (var p = 0; e > p; p++) {
                            var s = l[p];
                            s && !_.isUndefined(t[s]) ? (i += t[s] < 0 ? '<td style="color:red;">' : "<td>", i += t[s] + "</td>") : i += "<td></td>"
                        }
                        i += "</tr>", _.each(o, function(t) {
                            i += "<tr>";
                            for (var a = 0; e > a; a++) {
                                var n = l[a];
                                i += n ? "<td>" + (_.isNull(t[n]) ? "-" : t[n]) + "</td>" : "<td></td>"
                            }
                            i += "</tr>"
                        })
                    }
                }
            } else {
                var u = a[s];
                if ("tradedate" == s || "thighydate" == s || "tlowydate" == s || "founddate" == s) u = n ? SNB.Util.formatTime(a[s]) : f(a[s]);
                else if ("declare_date" == s || "intro_begindate" == s || "intro_enddate" == s) u = a[s] ? SNB.Util.formatTime(a[s]) : "-";
                else if ("ctsupdays" == s || "ctsdowndays" == s) u = u;
                else if (_.isNumber(u)) !n && t[s] && -1 === t[s].indexOf("万元") ? u = SNB.Util.decimal_2(a[s]) : "reg_capital" == s || "exptiss_size" == s || "actissSize" == s ? u /= 1e4 : ("expt_yield" == s || "act_yield" == s) && (u = (100 * u).toFixed(2));
                else if (_.isNull(u) || 0 == u) u = "-";
                else if (s.indexOf("url") > -1) {
                    var h = u; - 1 === h.indexOf("http") && (h = "http://" + h), u = '<a href="' + h + '" target="_blank">' + u + "</a>"
                } else if (s.indexOf("email") > -1) {
                    var h = u;
                    h = "mailto:" + h, u = '<a href="' + h + '" target="_blank">' + u + "</a>"
                }
                t[s] && (i += stockData.isMobile ? '<tr><td width="120px" style="font-weight: bold;">' + t[s] + "</td><td>" + u + "</td></tr>" : '<tr><td width="200px" style="font-weight: bold;">' + t[s] + '</td><td colspan="' + (e - 1) + '">' + u + "</td></tr>")
            }
        i += "</table></div>", $(".companyDataShow").append(i)
    }

    function m(t, e, n) {
        n > 1 && $(".dataTable-div-page").html("");
        var i = '<div class="tab-table-responsive dataTable-div dataTable-div-page" style="margin-bottom:20px;">';
        if (t && t.list && t.list.length) {
            i += '<table class="dataTable table table-bordered">';
            var s = _.keys(e);
            i += '<thead><tr class="title-row">', _.each(s, function(t) {
                i += "<td>" + e[t] + "</td>"
            }), i += "</tr></thead>", i += "<tbody>", _.each(t.list, function(t) {
                i += "<tr>", _.each(s, function(n) {
                    var s = t[n];
                    if (s) {
                        if (("intro_begin_date" == n || "end_date" == n || "sale_begin_date" == n || "launch_date" === n || "dividends_date" == n) && (s = SNB.Util.formatTime(s)), "tradedate" === n && (s = f(s)), "trust_sname" == n) {
                            var o = '<a href="/S/TP' + t.trust_code + '" target="_blank" title="' + s + '">' + SNB.Util.splitWordWithElipse(s, 6) + "</a>";
                            s = o
                        }
                        if ("fp_name" == n) {
                            var o = '<a href="/S/' + t.symbol + '" target="_blank" title="' + s + '">' + SNB.Util.splitWord(s, 8) + "</a>";
                            s = o
                        }
                        if ("sale_area" == n) {
                            var o = '<span title="' + s + '">' + SNB.Util.splitWordWithElipse(s, 2) + "</a>";
                            s = o
                        }
                        if (("min_sub_amt" == n || "this_sub_size" == n || "this_red_size" == n || "this_exp_size" == n || "final_size" == n) && (s /= 1e4), ("unit_nav" == n || "unit_acc_nav" == n) && (s = parseFloat(s).toFixed(4)), "chgtype" == n || "bizsunitname" == n) {
                            s = "chgtype" == n ? fa[s] : s;
                            var r = "chgtype" == n ? 15 : 20;
                            s = '<span title="' + s + '">' + SNB.Util.splitWordWithElipse(s, r) + "</a>"
                        }
                        if (e[n].indexOf("(%)") > -1 && "expt_yield" !== n && "acc_yield" !== n && (s = (100 * parseFloat(s)).toFixed(2)), "manager" === n && _.isArray(s)) {
                            var l = "";
                            _.each(s, function(t, a) {
                                a && (l += ","), l += t.xueqiu_id ? '<a href="/S/' + ca + '/manager">' + t.name + "</a>" : t.name
                            }), s = l
                        }
                        if (("seven_day_yield" == n || "thirty_day_yield" == n || "expt_yield" == n || "acc_yield" == n) && (s *= 100, s = s.toFixed("expt_yield" == n || "acc_yield" == n ? 2 : 3)), "buyamt" === n || "saleamt" === n || "allamt" === n) {
                            var d = s > 0 ? '<span style="color:red;">' : '<span style="color:green">';
                            s = (s / 1e4).toFixed(2), s = d + s + "</span>"
                        }("dividends_value" == n || "split_stock_value" == n) && (s += ""), _.isNumber(s) && (s = parseInt(s), s = a(s))
                    } else s = "-";
                    i += "name" == n ? '<td width="120px">' + s + "</td>" : "<td>" + s + "</td>"
                }), i += "</tr>"
            }), i += "</tbody></table>";
            var o = Math.ceil(t.count / 20);
            o > 1 && (i += SNB.Pager(n, o)), i += "</div>"
        } else i += "暂无数据</div>";
        $(".companyDataShow").append(i)
    }

    function v(t, e, n, i) {
        if (e && e.list && e.list.length) {
            var s = _.pluck(e.list, n || "enddate"),
                o = '<div class="tabsList">截止日期：<select class="dateSelect">';
            _.each(s, function(t) {
                o += '<option value="' + f(t) + '">' + f(t) + "</option>"
            }), o += "</select></div>", n && (o = ""), $(".companyDataShow").append(o), _.each(e.list, function(e) {
                if (e.list.length) {
                    var n = _.first(e.list),
                        s = f(e.enddate),
                        o = f(n.publishdate),
                        r = ["publishdate", "enddate", "symbol", "name"],
                        l = _.reject(_.keys(n), function(t) {
                            return _.indexOf(r, t) > -1
                        }),
                        d = l.length - 1,
                        c = '<div class="tab-table-responsive dataTable-div" id="' + s + '" style="margin-bottom:30px;"><table class="dataTable table table-bordered">';
                    "GDGKCGXX" === stockData.pageName && (l.unshift("name"), l.push("enddate")), t.enddate && s.length > 8 && (c += '<tr class="date-tr"><td width="' + i + 'px" style="font-weight: bold;">' + t.enddate + "</td><td colspan=" + d + ">" + s + "</td></tr>"), c += '<tr class="date-tr"><td width="' + i + 'px" style="font-weight: bold;">' + t.publishdate + "</td><td colspan=" + d + ">" + o + "</td></tr>", c += '<tr class="title-row">', _.each(l, function(a) {
                        t[a] && (c += "<td>" + t[a] + "</td>")
                    }), c += "</tr>", _.each(e.list, function(e) {
                        c += "<tr>", _.each(l, function(n) {
                            if (t[n]) {
                                var i = e[n];
                                if ("holderrto" == n && (i = parseFloat(e[n]).toFixed(2) + "%"), "holderamt" == n && (i = (e[n] / 1e4).toFixed(2)), ("listdate" == n || "enddate" == n) && (i = f(i)), "shholdername" == n && e.shholdercode || "limskholdername" == n && e.limskholdercode) {
                                    var s = "/S/" + ca + "/GDGKCGXX#" + (e.shholdercode || e.limskholdercode) + "&" + (e.shholdername || e.limskholdername);
                                    i = '<a href="' + s + '" >' + i + "</a>"
                                }
                                i = _.isNull(i) ? "-" : a(i), c += "<td>" + i + "</td>"
                            }
                        }), c += "</tr>"
                    }), c += "</table></div>", $(".companyDataShow").append(c)
                }
            });
            var r = $(".tabsList").clone();
            r.addClass("position-fixed").hide(), $("body").append(r), stockData.isMobile && $(window).off("scroll").on("scroll", function() {
                var t = $(this).scrollTop();
                r.toggle(t > 55)
            }), $(".companyDataShow").on("change", ".dateSelect", function() {
                var t = $(this).val();
                $("html, body").animate({
                    scrollTop: $("#" + t).offset().top - 50
                })
            })
        } else $(".companyDataShow").append('<div class="tableContainer" style="margin-bottom:20px;padding:5px 0px;text-align:center;">暂无数据.</div>')
    }

    function g() {
        SNB.get("/money_fund/info.json", {
            symbol: ca
        }, function(t) {
            var a = pa.MFInfo;
            if (t) {
                var e = t;
                e.foundDate && (e.foundDate = SNB.Util.formatTime(e.foundDate)), e.outSubEndDate && (e.outSubEndDate = SNB.Util.formatTime(e.outSubEndDate)), e.inSubBegDate && (e.inSubBegDate = SNB.Util.formatTime(e.inSubBegDate)), e.trasType && "09" != e.trasType && ("02" == e.trasType && (e.trasType = "按月结转"), "01" == e.trasType && (e.trasType = "按日结转"))
            }
            l(a, t)
        })
    }

    function y() {
        SNB.get("/money_fund/manager.json", {
            symbol: ca
        }, function(t) {
            if (t.data) {
                var a = pa.MFManager;
                l(a, t)
            }
        })
    }

    function b() {
        SNB.get("/money_fund/rate.json", {
            symbol: ca
        }, function(t) {
            if (t.data) {
                var a = pa.MFRate;
                l(a, t)
            }
        })
    }

    function k() {
        SNB.get("/money_fund/subredemption.json", {
            symbol: ca
        }, function(t) {
            if (t.data) {
                var a = pa.MFSGSH;
                l(a, t)
            }
        })
    }

    function S() {
        var t = pa.MFZCPZ,
            a = ' <div class="selectTime">从 <input class="startTime datepicker" type="input"/> 至 <input class="endTime datepicker" type="input"/><input type="button" class="btnSearch btn" value="搜索"/></div>';
        $(".companyDataShow").append(a), $(".companyDataShow").find(".startTime,.endTime").datepicker({
            maxDate: "+0d"
        }), $(".btnSearch").on("click", function() {
            var a = $(".startTime").val(),
                e = $(".endTime").val();
            e || (e = SNB.Util.formatTime(Date.now()));
            var n = {
                symbol: ca,
                beginDate: a.replace(/-/g, ""),
                endDate: e.replace(/-/g, "")
            };
            SNB.get("/money_fund/assets.json", n, function(a) {
                a.data && ($(".companyDataShow").find(".tableContainer").remove(), $(".companyDataShow").find(".tip").remove(), l(t, a))
            })
        }), SNB.get("/money_fund/assets.json", {
            symbol: ca
        }, function(a) {
            a.data && l(t, a)
        })
    }

    function D() {
        SNB.get("/money_fund/finance.json", {
            symbol: ca
        }, function(t) {
            if (t.data) {
                var a = pa.MFFinance;
                l(a, t)
            }
        })
    }

    function x(t) {
        var a = 10;
        SNB.get("/treasury_future/member_holder.json", {
            symbol: ca,
            page: t,
            size: a
        }, function(e) {
            if (e.data) {
                var n = pa.QHJGCC;
                l(n, e), e.count > a && ($(".tip").before('<div id="pageList"></div>'), $("#pageList").html(SNB.Pager(t, Math.ceil(e.count / a))), $("#pageList").on("click", "li a", function() {
                    $(".companyDataShow").empty();
                    var t = $(this).attr("data-page");
                    return x(t), $("html,body").animate({
                        scrollTop: 0
                    }), !1
                }))
            }
        })
    }

    function N() {
        SNB.get("/treasury_future/info.json", {
            symbol: ca
        }, function(t) {
            if (t.data) {
                t.data.info_trade_date = t.data.trade_date;
                var a = pa.FMInfo;
                l(a, t)
            }
        })
    }

    function T(t) {
        SNB.get("/stock/f10/finmainindex.json", {
            symbol: ca,
            page: t,
            size: 4
        }, function(a) {
            if (a.list) {
                var e = pa.ZYCWZB;
                a.data = a.list, d(e, a), 1 == t && c(T, 1)
            }
        })
    }

    function w(t) {
        SNB.get("/stock/f10/dailypriceextend.json", {
            symbol: ca,
            page: t,
            size: 4
        }, function(t) {
            if (t.tqQtSkdailypriceExtend) {
                var a = _.extend(t.tqQtSkdailypriceExtend.tqQtSkdailyprice, t.tqQtSkdailypriceExtend.tqSkFinindic),
                    e = pa.MRCWZB;
                h(e, a)
            }
        })
    }

    function B(t) {
        SNB.get("/stock/f10/shareschg.json", {
            symbol: ca,
            page: t,
            size: 4
        }, function(a) {
            if (a.list) {
                var e = pa.GBJG;
                a.data = a.list, d(e, a), 1 == t && c(B, 1)
            }
        })
    }

    function C(t) {
        SNB.get("/stock/f10/shareholder.json", {
            symbol: ca,
            page: t,
            size: 4
        }, function(t) {
            var a = pa.ZYGD;
            v(a, t, "", 200)
        })
    }

    function j(t) {
        SNB.get("/stock/f10/otsholder.json", {
            symbol: ca,
            page: t,
            size: 4
        }, function(t) {
            var a = pa.LTGD;
            v(a, t, "", 200)
        })
    }

    function q() {
        var t = window.location.hash,
            a = "";
        if (t) {
            var e = t.replace("#", "").split("&"),
                a = e[0],
                n = e[1];
            $(".pageName").text(stockData.pageTitle + " - " + n)
        }
        SNB.get("/stock/f10/holderstocks.json", {
            holdercode: a
        }, function(t) {
            var a = pa.GDGKCGXX;
            v(a, t, !0, 200)
        })
    }

    function I(t) {
        SNB.get("/stock/f10/limskholder.json", {
            symbol: ca,
            page: t,
            size: 4
        }, function(t) {
            var a = pa.XSGDMD,
                e = {
                    1: "股权分置",
                    2: "首发",
                    3: "增发",
                    4: "配股",
                    5: "股权转让",
                    6: "合并",
                    7: "追加限售",
                    8: "股权激励",
                    9: "其它	 "
                },
                n = {
                    1: "预案",
                    2: "正式",
                    3: "预案(未实施)"
                },
                i = {
                    1: "流通A股",
                    2: "流通H股"
                };
            _.each(t.list, function(t) {
                _.each(t.list, function(t) {
                    t.limeventtype = t.limeventtype && e[t.limeventtype], t.projectfeature = t.projectfeature && n[t.projectfeature], t.stktype = t.stktype && i[t.stktype]
                })
            }), v(a, t, "listdate", 60)
        })
    }

    function G(t) {
        SNB.get("/stock/f10/shareholdernum.json", {
            symbol: ca,
            page: t,
            size: 4
        }, function(a) {
            if (a.list) {
                var e = pa.GDHS;
                a.data = a.list, d(e, a), 1 == t && c(G, 1)
            }
        })
    }

    function F(t) {
        SNB.get("/stock/f10/bonus.json", {
            symbol: ca,
            page: t,
            size: 4
        }, function(a) {
            if (a.list) {
                var e = pa.FHPS;
                a.data = a.list, d(e, a), 1 == t && c(F, 1)
            }
        })
    }

    function L(t) {
        SNB.get("/stock/f10/furissue.json", {
            symbol: ca,
            page: t,
            size: 4
        }, function(a) {
            if (a.list) {
                var e = pa.ZFYLB;
                a.data = a.list, d(e, a), 1 == t && c(L, 1)
            }
        })
    }

    function Z(t) {
        SNB.get("/stock/f10/yieldindic.json", {
            symbol: ca,
            page: t,
            size: 4
        }, function(t) {
            if (t.tqSkYieldindic) {
                var a = t.tqSkYieldindic,
                    e = pa.GPSYLZB;
                h(e, a)
            }
        })
    }

    function U(t) {
        SNB.get("/stock/f10/compinfo.json", {
            symbol: ca,
            page: t,
            size: 4
        }, function(t) {
            if (t.tqCompInfo) {
                var a = pa.GSJJ;
                h(a, t.tqCompInfo, 2)
            }
        })
    }

    function A() {
        function t() {
            $(".dateSelect select").on("change", function() {
                var t = $(this).val(),
                    a = {
                        date: t,
                        symbol: ca
                    },
                    n = f(t);
                e(a, n)
            })
        }

        function a(t) {
            var a = '<div class="dateSelect">上榜日期：<select>';
            _.each(t, function(t) {
                a += '<option value="' + t + '">' + f(t) + "</option>"
            }), a += "</select></div>", $(".companyDataShow").append(a)
        }

        function e(t, a) {
            SNB.get("/stock/f10/bizunittrdinfo.json", t, function(t) {
                if (t.detail) {
                    var e = t.detail.tqQtBizunittrdinfoBuyList,
                        n = t.detail.tqQtBizunittrdinfoSaleList;
                    $(".dataTable, .GJZB").remove(), _.each(e, function(t) {
                        t.buyamt && t.saleamt && (t.allamt = t.buyamt - t.saleamt)
                    }), _.each(n, function(t) {
                        t.saleamt && t.buyamt && (t.allamt = t.saleamt - t.buyamt)
                    }), $(".companyDataShow").append('<div class="GJZB" style="margin-bottom:5px;"><div class="stockTitle"><span class="tableName">买入榜&nbsp;&nbsp;&nbsp;' + a + '</span></div><div class="GJZBTable"></div></div>'), m({
                        list: e
                    }, pa.LHB.buy, 1), $(".companyDataShow").append('<div class="GJZB" style="margin-bottom:5px;"><div class="stockTitle"><span class="tableName">卖出榜&nbsp;&nbsp;&nbsp;' + a + '</</span></div><div class="GJZBTable"></div></div>'), m({
                        list: n
                    }, pa.LHB.sell, 1)
                }
            })
        }
        var n = window.location.search;
        n && (n = n.replace("?", ""));
        var i = $.parseParams(n),
            s = {
                symbol: ca
            },
            o = "",
            r = "",
            l = "/stock/f10/bizunittrdinfo.json";
        SNB.get(l, s, function(n) {
            n.list && n.list.length ? (a(n.list), o = _.first(n.list), i && i.date && (o = i.date), $(".dateSelect select").val(o), s.date = o, r = f(o), e(s, r), t()) : $(".companyDataShow").append('<div class="tableContainer" style="margin-bottom:20px;padding:5px 0px;">暂无数据.</div>')
        })
    }

    function R(t) {
        SNB.get("/stock/f10/finqindic.json", {
            symbol: ca,
            page: t,
            size: 4
        }, function(a) {
            var e = pa.DJCWZB;
            a.data = a.list, d(e, a), 1 == t && c(R, 1)
        })
    }

    function z(t, a) {
        var e = "/stock/f10/incstatement.json";
        SNB.get(e, {
            symbol: ca,
            page: t,
            size: 4
        }, function(n) {
            {
                var i = n.comptype,
                    s = pa.GSLRB[i];
                va[i]
            }
            n.data = n.list, d(s, n), 1 == t && c(z, 1), a && p(e)
        })
    }

    function M(t, a) {
        var e = "/stock/f10/cfstatement.json";
        SNB.get(e, {
            symbol: ca,
            page: t,
            size: 4
        }, function(n) {
            {
                var i = n.comptype,
                    s = pa.XJLLB[i];
                va[i]
            }
            n.data = n.list, d(s, n), 1 == t && c(M, 1), a && p(e)
        })
    }

    function J(t, a) {
        var e = "/stock/f10/balsheet.json";
        SNB.get(e, {
            symbol: ca,
            page: t,
            size: 4
        }, function(n) {
            {
                var i = n.comptype,
                    s = pa.ZCFZB[i];
                va[i]
            }
            n.data = n.list, d(s, n), 1 == t && c(J, 1), a && p(e)
        })
    }

    function P() {
        SNB.get("/trust/info.json", {
            symbol: ca
        }, function(t) {
            if (t.data) {
                var a = t.data,
                    e = pa.TPInfo;
                h(e, a, 2, !0)
            }
        })
    }

    function H() {
        SNB.get("/trust/info.json", {
            symbol: ca
        }, function(t) {
            function a(t, a) {
                SNB.get("/trust/company_product.json", {
                    compCode: i,
                    page: t,
                    size: 20
                }, function(e) {
                    e.list = e.data, a(e, n, t)
                })
            }
            var e = pa.TPCompanyInfo,
                n = pa.companyTPInfo,
                i = t.data.trust_comp_code;
            i && ($(".companyDataShow").on("click", ".pager-wrapper li a", function(t) {
                t.preventDefault();
                var e = $(this).attr("data-page");
                a(e, m)
            }), SNB.get("/trust/company_info.json", {
                symbol: ca
            }, function(t) {
                h(e, t, 2, !0), a(1, m)
            }))
        })
    }

    function O() {
        function t(t) {
            var a = {
                    page: t,
                    size: 20,
                    symbol: ca
                },
                e = $.trim($(".startTime").val()),
                n = $.trim($(".endTime").val());
            e && (a.start_date = e), n && (a.end_date = n), SNB.get("/trust/navlist.json", a, function(a) {
                if (a.data) {
                    a.list = a.data;
                    var e = pa.LSJZ[a.type];
                    m(a, e, t)
                }
            })
        }
        var a = ' <div class="selectTime">从 <input class="startTime datepicker" type="input"/> 至 <input class="endTime datepicker" type="input"/><input type="button" class="btnSearch btn" value="搜索"/></div>';
        $(".companyDataShow").append(a), $(".startTime, .endTime").datepicker({
            maxDate: "+0d"
        }), t(1), $(".btnSearch").on("click", function() {
            t(1)
        }), $(".companyDataShow").on("click", ".pager-wrapper li a", function(a) {
            a.preventDefault();
            var e = $(this).attr("data-page");
            t(e)
        })
    }

    function E() {
        SNB.get("/trust/share_change.json", {
            trustCode: ca.replace("TP", "")
        }, function(t) {
            if (t.data) {
                t.list = t.data;
                var a = pa.GMBD;
                m(t, a, 1)
            }
        })
    }

    function X(t, a, e) {
        if (t.list && t.list.length) {
            var e = e || 4,
                n = (a - 1) * e,
                i = a * e;
            return t.list.slice(n, i)
        }
        return []
    }

    function Q() {
        var t = {
                financials: {
                    title: "美股动态关键指标",
                    url: "/stock/finance_us_financials.json"
                },
                profitablity: {
                    title: "公司收入",
                    url: "/stock/finance_us_profitablity.json"
                },
                growth: {
                    title: "增长率",
                    url: "/stock/finance_us_growth.json"
                },
                cash_flow: {
                    title: "现金流状态",
                    url: "/stock/finance_us_cash_flow.json"
                },
                financial_health: {
                    title: "财务健康指标",
                    url: "/stock/finance_us_financial_health.json"
                },
                efficiency_ratios: {
                    title: "资产周转率指标",
                    url: "/stock/finance_us_efficiency_ratios.json"
                }
            },
            a = _.keys(t);
        _.each(a, function(a) {
            $(".companyDataShow").append('<div id="' + a + '" class="GJZB"><div class="stockTitle"></div><div class="GJZBTable"></div></div>');
            var e = $("#" + a),
                n = e.find(".GJZBTable");
            $(".stockTitle", e).append('<span class="tableName">' + t[a].title + '<span class="moneySymbol"></span></span>'), SNB.get(t[a].url, {
                symbol: ca
            }, function(t) {
                t.moneySymbol && $(".moneySymbol", e).text("(" + t.moneySymbol + ")"), t.list = t.list.reverse();
                var i = _.first(t.list);
                i && "TTM" === i.date && t.list.shift(), pageRet = {
                    data: X(t, 1)
                };
                var s = pa.GJZB[a];
                if ("financials" == a && pageRet.data.length) {
                    var o = _.first(pageRet.data),
                        r = _.keys(s);
                    _.each(r, function(t) {
                        var a = o[t + "_currency_unit"];
                        a && (s[t] += "(" + (ua[a] || a) + ")")
                    })
                }
                d(s, pageRet, n), c(function(i) {
                    var s = {
                        data: X(t, i)
                    };
                    d(pa.GJZB[a], s, n), 4 * i >= t.list.length && $(".page-next", e).addClass("noClick")
                }, 1, e)
            })
        })
    }

    function W() {
        SNB.get("/stock/finance_us_shareholders.json", {
            symbol: ca
        }, function(t) {
            var a = [],
                e = [];
            _.each(t.list, function(t) {
                "1" == t.holder_type ? a.push(t) : e.push(t)
            }), a.length && ($(".companyDataShow").append('<div class="GJZB" style="margin-bottom:5px;"><div class="stockTitle"><span class="tableName">基金持股</span></div><div class="GJZBTable"></div></div>'), m({
                list: a
            }, pa.CGXX, 1)), e.length && ($(".companyDataShow").append('<div class="GJZB" style="margin-bottom:5px;"><div class="stockTitle"><span class="tableName">机构持股</span></div><div class="GJZBTable"></div></div>'), m({
                list: e
            }, pa.CGXX, 1))
        })
    }

    function V(t, a, e, n) {
        var i = SNB.data.page,
            s = 4;
        SNB.get(t, {
            symbol: ca,
            data_type: SNB.data.dataType,
            dateAscType: "desc"
        }, function(t) {
            var o = pa[a];
            t.list = t[e], SNB.data.ret = t;
            var r = {
                data: X(t, i, s)
            };
            d(o, r);
            var l = _.first(t.list);
            if (l && l.currency_unit && !$(".stockTip").length) {
                var p = $('<div class="stockTip">除开每股数据外，其他数据均为' + (ua[l.currency_unit] || l.currency_unit) + "计算</div>");
                $(".stockTitle").after(p)
            }
            1 == i && t.list.length > s && c(function(a) {
                SNB.data.page = a;
                var e = {
                    data: X(SNB.data.ret, a, s)
                };
                d(o, e), a * s >= t.list.length && $(".page-next").addClass("noClick")
            }, 1), n && n()
        })
    }

    function Y(t, a) {
        SNB.data.page = t;
        var e = "/stock/finance_us_income_statement.json";
        _.isUndefined(SNB.data.dataType) && (SNB.data.dataType = 1), V(e, "GSLRB_US", "financeUSIncomeStatementList", function() {
            a && u(Y)
        })
    }

    function K(t, a) {
        SNB.data.page = t;
        var e = "/stock/finance_us_balance_sheet.json";
        _.isUndefined(SNB.data.dataType) && (SNB.data.dataType = 1), V(e, "ZCFZB_US", "financeUSBalanceSheetList", function() {
            a && u(K)
        })
    }

    function ta(t) {
        SNB.data.page = t;
        var a = "/stock/finance_us_cash_flow_statement.json";
        _.isUndefined(SNB.data.dataType) && (SNB.data.dataType = 1), V(a, "XJLLB_US", "financeUSCashFlowStatementList")
    }

    function aa() {
        SNB.get("/stock/get_div_history_by_symbol.json", {
            symbol: ca
        }, function(t) {
            var a = {
                    5: "分红",
                    7: "合股",
                    8: "拆股"
                },
                e = t.list,
                n = {
                    dividends_date: "执行日期",
                    subtype: "类型",
                    dividends_value: "分红金额",
                    split_stock_value: "拆合比例"
                };
            e.length ? (_.each(e, function(t) {
                var e = t.subtype;
                t.subtype = a[e], t.dividends_date = t.date, 5 != e ? t.split_stock_value = t.value : t.dividends_value = t.value
            }), m(t, n, 1), $(".tab-table-responsive .dataTable").css({
                width: "100%"
            })) : $(".companyDataShow").append('<div style="text-align: center;line-height: 50px;">暂无数据</div>')
        })
    }

    function ea() {
        SNB.get("/stock/quote.json", {
            code: ca
        }, function(t) {
            function a(t) {
                var a = {
                    page: t,
                    size: 20,
                    order: "desc",
                    orderby: "SALEBEGINDATE",
                    bank_code: n
                };
                SNB.get("/financial_product/query.json", a, function(a) {
                    a.list = a.data, _.each(a.list, function(t) {
                        t.fp_name = t.name
                    }), $(".companyDataShow").empty(), m(a, pa.samebank, t)
                })
            }
            var e = t.quotes[0],
                n = e.fp_iss_bank_code;
            a(1), $(".companyDataShow").on("click", ".pager-wrapper li a", function(t) {
                t.preventDefault();
                var e = $(this).attr("data-page");
                $("html, body").animate({
                    scrollTop: 0
                }, 10, function() {
                    a(e)
                })
            })
        })
    }

    function na() {
        SNB.get("/stock/quote.json", {
            code: ca
        }, function(t) {
            function a(t) {
                var a = {
                    page: t,
                    size: 20,
                    order: "desc",
                    orderby: "SALEBEGINDATE",
                    period: n
                };
                SNB.get("/financial_product/query.json", a, function(a) {
                    a.list = a.data, _.each(a.list, function(t) {
                        t.fp_name = t.name
                    }), $(".companyDataShow").empty(), m(a, pa.samebank, t)
                })
            }
            var e = t.quotes[0],
                n = e.fp_entrust_period_std;
            n = n.replace("个月", "m").replace("年", "y"), a(1), $(".companyDataShow").on("click", ".pager-wrapper li a", function(t) {
                t.preventDefault();
                var e = $(this).attr("data-page");
                $("html, body").animate({
                    scrollTop: 0
                }, 10, function() {
                    a(e)
                })
            })
        })
    }

    function ia() {
        function t(t) {
            var a = {
                    page: t,
                    size: 20,
                    symbol: ca
                },
                e = $.trim($(".startTime").val()),
                n = $.trim($(".endTime").val());
            e && (a.start_date = e.replace(/-/g, "")), n && (a.end_date = n.replace(/-/g, "")), SNB.get("/financial_product/navlist.json", a, function(a) {
                if (a.data) {
                    a.list = a.data;
                    var e = pa.jingzhi;
                    $(".companyDataShow .dataTable-div").remove(), m(a, e, t)
                }
            })
        }
        var a = ' <div class="selectTime">从 <input class="startTime datepicker" type="input"/> 至 <input class="endTime datepicker" type="input"/><input type="button" class="btnSearch btn" value="搜索"/></div>';
        $(".companyDataShow").append(a), $(".startTime, .endTime").datepicker({
            maxDate: "+0d"
        }), t(1), $(".btnSearch").on("click", function() {
            t(1)
        }), $(".companyDataShow").on("click", ".pager-wrapper li a", function(a) {
            a.preventDefault();
            var e = $(this).attr("data-page");
            t(e)
        })
    }

    function sa(t, a) {
        var e = _.map(t, function(t) {
                return SNB.domain.base + "/user/show.json?request_method=get&id=" + $.trim(t)
            }),
            n = {},
            i = e.join("#47bce5c74f#");
        $.post("/apimerge/result.json", {
            api: i
        }, function(t) {
            for (var e in t) {
                var i = t[e].result;
                n[i.id] = i
            }
            a(n)
        })
    }

    function oa() {
        SNB.get("/private_fund/company_info.json", {
            symbol: ca
        }, function(t) {
            function a(t, a) {
                SNB.get("/private_fund/company_product.json", {
                    adviserId: i,
                    page: t,
                    size: 20
                }, function(e) {
                    e.list = e.data;
                    var i = [];
                    _.each(e.list, function(t) {
                        t && t.manager && t.manager.length && _.each(t.manager, function(t) {
                            t.xueqiu_id && i.push(t.xueqiu_id)
                        })
                    }), i.length ? sa(i, function(i) {
                        _.each(e.list, function(t) {
                            t && t.manager && t.manager.length && _.each(t.manager, function(t) {
                                t.xueqiu_id && i[t.xueqiu_id] && (t.xueqiu_name = i[t.xueqiu_id].screen_name)
                            })
                        }), a(e, n, t)
                    }) : a(e, n, t)
                })
            }
            var e = pa.PCompany,
                n = pa.PCompanyProduct,
                i = t.id;
            i && ($(".companyDataShow").on("click", ".pager-wrapper li a", function(t) {
                t.preventDefault();
                var e = $(this).attr("data-page");
                a(e, m)
            }), SNB.get("/private_fund/company_info.json", {
                symbol: ca
            }, function(t) {
                h(e, t, 2, !0), a(1, m)
            }))
        })
    }

    function ra() {
        function t(t) {
            var a = '<ul class="users-list">';
            _.each(t, function(t) {
                var e, n, i, s = "",
                    o = "";
                t.xueqiu_name ? (n = "关于$" + stockData.stockInfo.name + "(" + ca + ")$，对@" + t.xueqiu_name + " 说:", s = '<span class="at" data-target="' + t.xueqiu_name + '" data-toggle="at" data-defaulttext="' + n + '">向' + ("m" === t.gender ? "他" : "她") + "提问</span>", e = '<a href="/' + t.xueqiu_id + '" target="_blank">' + t.manager_name + "&nbsp;&nbsp;&nbsp;&nbsp;    @" + t.xueqiu_name + "</a>", i = '<a href="/' + t.xueqiu_id + '"><img src="' + t.imgUrl + '" /></a>') : (o = '他不在雪球，<a href="http://xueqiu.com/service/invitation">邀请他来雪球</a>', e = t.manager_name, i = '<img src="' + t.imgUrl + '" />'), t.imgUrl = t.imgUrl || "//xavatar.imedao.com/community/default/avatar.png!50x50.png";
                var r = ' <li><div class="manager-profile"><div class="manager-photo">' + i + '</div><div class="content"><span class="name">' + e + "</span>" + s + '<div><span class="company">' + t.investment_name + '</span></div><div class="manager-atxueqiu">' + o + "</div></div></div>";
                t.introduction && (r += ' <div class="manager-desc"><p>经理介绍：</p><p>' + t.introduction + "</p></div></div>"), r += "</li>", a += r
            }), a += "</ul>", $(".companyDataShow").append(a)
        }
        seajs.use("SNB.atDialog.js"), SNB.get("/private_fund/mananger_list.json", {
            symbol: ca
        }, function(a) {
            if (a.length) {
                var e = [];
                _.each(a, function(t) {
                    t.xueqiu_id ? e.push(t.xueqiu_id) : t.imgUrl = "//xavatar.imedao.com/community/default/avatar.png!50x50.png"
                }), e.length ? sa(e, function(e) {
                    _.each(a, function(t) {
                        var a = t.xueqiu_id;
                        if (a && e[a]) {
                            var n = e[a];
                            t.xueqiu_name = n.screen_name, t.imgUrl = "//xavatar.imedao.com/" + n.profile_image_url.split(",")[2], t.gender = n.gender
                        }
                    }), t(a)
                }) : t(a)
            } else $(".companyDataShow").append('<div class="tableContainer" style="margin-bottom:20px;padding:5px 0px;">暂无数据.</div>')
        })
    }

    function la() {
        function t(t) {
            t.hover(function() {
                this.sector.stop(), this.sector.scale(1.1, 1.1, this.cx, this.cy), this.label && (this.label[0].stop(), this.label[0].attr({
                    r: 7.5
                }), this.label[1].attr({
                    "font-weight": 800
                }))
            }, function() {
                this.sector.animate({
                    transform: "s1 1 " + this.cx + " " + this.cy
                }, 500, "bounce"), this.label && (this.label[0].animate({
                    r: 5
                }, 500, "bounce"), this.label[1].attr({
                    "font-weight": 400
                }))
            })
        }

        function a(t, a, e) {
            var n = "";
            _.each(a, function(t) {
                var a = t.split(" ");
                a[0] && "Others" !== a[0] && (n += ' <tr><td style="width: 200px;">' + a[0] + "</td><td>" + (a[1] || "-") + "</td></tr>")
            });
            var i = ' <table class="dataTable table-bordered"><thead><tr><th>' + ("industry" === t ? "持有行业" : "持仓股票") + "</th><th>百分比</th></tr></thead><tbody>" + n + "</tbody></table>";
            e.html(i), a.length > 10 && (e.find("tr:gt(10)").hide(), e.append('<div class="showMore"><a href="#">查看更多</a></div>')), e.on("click", ".showMore a", function() {
                return e.find("tr:gt(10)").show(), e.find(".showMore").hide(), !1
            })
        }
        SNB.get("/private_fund/hold_stock/query.json", {
            symbol: ca
        }, function(e) {
            e.end_date && $(".companyDataShow").append('<div class="update-date">更新日期：<span>' + SNB.Util.formatTime(e.end_date) + "</span></div>");
            var n = _.sortBy(e.industry, function(t) {
                    return -t.hold_position_cost
                }),
                i = _.sortBy(e.stock, function(t) {
                    return -t.hold_position_cost
                }),
                s = _.pluck(i, "hold_position_cost"),
                o = _.pluck(n, "hold_position_cost");
            if (valLegendArray = [], industryLegendArray = [], chartValLegendArray = [], chartIndustryLegendArray = [], chartValArray = [], chartIndustryArray = [], allVal = 1, allIndustry = 1, i.length) {
                _.each(i, function(t, a) {
                    var e = t.hold_position_cost,
                        n = t.stock_name + " " + (100 * e).toFixed(2) + "%";
                    allVal -= e, valLegendArray.push(n), 9 > a && (chartValLegendArray.push(n), chartValArray.push(e)), 9 === a && (chartValLegendArray.push("其他 " + (100 * allVal).toFixed(2) + "%"), chartValArray.push(allVal))
                }), _.each(n, function(t, a) {
                    var e = t.hold_position_cost,
                        n = t.industry_name + " " + (100 * e).toFixed(2) + "%";
                    allIndustry -= e, industryLegendArray.push(n), 9 > a && (chartIndustryLegendArray.push(n), chartIndustryArray.push(e)), 9 === a && (chartIndustryLegendArray.push("其他 " + (100 * allIndustry).toFixed(2) + "%"), chartIndustryArray.push(allIndustry))
                }), s.push(allVal), valLegendArray.push("现金类 " + (100 * allVal).toFixed(2) + "%"), o.push(allIndustry), industryLegendArray.push("其他行业 " + (100 * allIndustry).toFixed(2) + "%"), $(".companyDataShow").append('<div class="cContainer tableContainer"><div id="stockHolder"></div><div id="stockTable"></div></div>'), $(".companyDataShow").append('<div class="tContainer tableContainer"><div id="industryHolder"></div><div id="industryTable"></div></div>');
                var r = Raphael("stockHolder", 400, 344),
                    l = Raphael("industryHolder", 400, 344),
                    d = r.piechart(120, 140, 100, chartValArray, {
                        legend: chartValLegendArray
                    });
                industrypie = l.piechart(120, 140, 100, chartIndustryArray, {
                    legend: chartIndustryLegendArray
                }), r.text(130, 20, "持仓股票").attr({
                    font: "16px sans-serif"
                }), l.text(130, 20, "持有行业").attr({
                    font: "16px sans-serif"
                }), t(d), t(industrypie), a("stock", valLegendArray, $("#stockTable")), a("industry", industryLegendArray, $("#industryTable"))
            } else $(".companyDataShow").append('<div class="tableContainer" style="margin-bottom:20px;padding:10px 0px;text-align: center;">暂无数据.</div>')
        })
    }

    function da() {
        SNB.get("/private_fund/income/query.json", {
            symbol: ca
        }, function(t) {
            function a(t, a) {
                var e = "<tr>";
                return e += "sh" === t ? "<td>上证指数</td>" : "index300" === t ? "<td>沪深300</td>" : "<td>基金</td>", _.each(a, function(t) {
                    e += "<td>" + t + "</td>"
                }), e += "</tr>"
            }
            if (_.isEmpty(t)) $(".companyDataShow").append('<div class="tableContainer" style="margin-bottom:20px;padding:10px 0px;text-align: center;">暂无数据.</div>');
            else {
                $(".companyDataShow").append('<div class="update-date">更新日期：<span>' + SNB.Util.formatTime(t.end_date) + "</span></div>");
                var e = ["since_founded_growth_rate", "growth_rate_this_year", "growth_rate_month1", "growth_rate_month3", "growth_rate_month6", "growth_rate_year", "growth_rate_year2"],
                    n = [],
                    i = [],
                    s = [],
                    o = [],
                    r = [],
                    l = [];
                _.each(e, function(a) {
                    var e = t[a],
                        d = t["sh_" + a],
                        c = t["index300_" + a];
                    n.push(e), i.push((100 * e).toFixed(2) + "%"), s.push(d), o.push((100 * d).toFixed(2) + "%"), r.push(c), l.push((100 * c).toFixed(2) + "%")
                }), $(".companyDataShow").append('<div class=""><div id="holder"></div></div>');
                var d = Raphael("holder", 700, 300);
                d.SNBBarChart(680, 280, [n, s, r], {
                    legend: ["成立以来收益率", "今年以来收益率", "1个月收益率", "3个月收益率", "6个月收益率", "1年收益率", "2年收益率"],
                    labCb: function(t) {
                        return (100 * t).toFixed(2) + "%"
                    },
                    typeName: ["基金", "上证指数", "沪深300"]
                }), $(".companyDataShow").append('<div class="tContainer tableContainer"><div id="analystTable"></div></div>');
                var c = ' <table class="dataTable table-bordered"><thead><tr><th></th><th>成立以来收益率</th><th>今年以来收益率</th><th>1个月收益率</th><th>3个月收益率</th><th>6个月收益率</th><th>1年收益率</th><th>2年收益率</th></tr></thead><tbody>';
                c += a("", i), c += a("sh", o), c += a("index300", l), c += "</tbody></table>", $("#analystTable").html(c)
            }
        })
    }! function(t) {
        var a = /([^&=]+)=?([^&]*)/g,
            e = /\+/g,
            n = function(t) {
                return decodeURIComponent(t.replace(e, " "))
            };
        t.parseParams = function(t) {
            t = decodeURIComponent(t);
            for (var e, i = {}; e = a.exec(t);) {
                var s = n(e[1]),
                    o = n(e[2]);
                "[]" === s.substring(s.length - 2) ? (s = s.substring(0, s.length - 2), (i[s] || (i[s] = [])).push(o)) : i[s] = o
            }
            return i
        }
    }(jQuery);
    var ca = stockData.stockInfo.symbol,
        pa = SNB.data.financeTableDataInfo,
        ua = {
            CNY: "人民币",
            TWD: "新台币",
            HKD: "港元",
            JPY: "日元",
            KRW: "韩元",
            RUB: "卢布",
            EUR: "欧元",
            DEM: "马克",
            GBP: "英镑",
            USD: "美元",
            FFR: "法郎",
            CAD: "加元",
            MXN: "墨西哥比索",
            AUD: "澳元"
        },
        fa = {
            "01": "涨幅偏离值达7%的证券",
            "02": "跌幅偏离值达7%的证券",
            "03": "振幅值达15%的证券",
            "04": "换手率达20%的证券",
            "05": "连续三个交易日内，涨幅偏离值累计达20%的证券",
            "06": "连续三个交易日内，跌幅偏离值累计达20%的证券",
            "07": "连续三个交易日内，涨幅偏离值累计达到15%的ST证券、*ST证券和未完成股改证券",
            "08": "连续三个交易日内，跌幅偏离值累计达到15%的ST证券、*ST证券和未完成股改证券",
            "09": "连续三个交易日内，日均换手率与前五个交易日的日均换手率的比值达到30倍，且换手率累计达20%的股票",
            10: "其它异常波动的股票",
            11: "无价格涨跌幅限制的证券",
            12: "权证信息",
            13: "涉嫌违法违规交易实施特别停牌的证券",
            14: "实施特别停牌的证券",
            15: "连续三个交易日收盘价达到涨幅限制价格的ST证券、*ST证券和未完成股改证券",
            16: "连续三个交易日收盘价达到跌幅限制价格的ST证券、*ST证券和未完成股改证券",
            17: "当日无价格涨跌幅限制的股票,其盘中交易价格较当日开盘价上涨100%以上的股票",
            18: "当日无价格涨跌幅限制的股票,其盘中交易价格较当日开盘价下跌50%以上的股票",
            19: "当日有涨跌幅限制的A股,连续2个交易日触及涨幅限制,在这2个交易日中同一营业部净买入股数占当日总成交股数的比重30%以上,且上市公司未有重大事项公告的股票",
            20: "当日有涨跌幅限制的A股,连续2个交易日触及跌幅限制,在这2个交易日中同一营业部净卖出股数占当日总成交股数的比重30%以上,且上市公司未有重大事项公告的股票",
            21: "ST股票、*ST股票和S股连续三个交易日触及涨(跌)幅限制的股票",
            22: "ST股票、*ST股票和S股连续三个交易日触及涨幅限制的股票",
            23: "ST股票、*ST股票和S股连续三个交易日触及跌幅限制的股票",
            24: "连续三个交易日内，涨幅偏离值累计达到12%的ST证券、*ST证券和未完成股改证券",
            25: "连续三个交易日内，跌幅偏离值累计达到12%的ST证券、*ST证券和未完成股改证券",
            26: "当日无价格涨跌幅限制的股票，其盘中交易价格较当日开盘价上涨30%以上的股票",
            27: "当日无价格涨跌幅限制的股票，其盘中交易价格较当日开盘价下跌30%以上的股票",
            28: "单只标的证券的当日融资买入数量达到当日该证券总交易量的50%以上",
            29: "单只标的证券的当日融券卖出数量达到当日该证券总交易量的50%以上",
            30: "当日无价格涨跌幅限制的A股，出现异常波动停牌的股票",
            31: "当日无价格涨跌幅限制的B股，出现异常波动停牌的股票",
            32: "风险警示股票盘中换手率达到或超过30%",
            33: "退市整理的证券"
        },
        ha = ["netShareRatio", "othinveRto", "fdassetnavYield", "fddistYield", "fddavgnavYield", "fddnavgrowRate", "fdaccgrowate", "navRto", "skRatio", "bdRto", "absRto", "fdRto", "forwRto", "opnRto", "wrtRto", "outrightrepoRto", "curfdsRto", "depositRto"],
        ma = ["reportDate", "endDate", "beginDate", "delivery_date", "trade_date", "effect_date", "ltrade_date", "ldeliv_date", "reportdate", "bonusimpdate", "tranaddsklistdate", "bonussklistdate", "tranaddskaccday", "bonusskaccday", "recorddate", "exrightdate", "publishdate", "begindate", "enddate", "smdecipubldate", "issuebegdate", "issueenddate", "uwbegdate", "uwenddate", "onlinesubsdate", "onlinerdshowdate", "tradedate"],
        va = {
            1: "证券公司",
            2: "保险公司",
            3: "银行",
            4: "一般企业"
        };
    "manager" === stockData.pageName ? stockData.stockInfo.isMF ? y() : stockData.stockInfo.isPF ? ra() : o(stockData.companyInfo.managers) : "quarter" === stockData.pageName ? i(stockData.companyInfo.financials) : "historical" === stockData.pageName ? s(stockData.companyInfo.financials) : "report" === stockData.pageName ? r(_.extend(stockData.companyInfo, {
        screenName: stockData.stockInfo.name + "(" + stockData.stockInfo.symbol + ")",
        profile: "/S/" + stockData.stockInfo.symbol
    })) : "maininfo" === stockData.pageName ? "货币基金" == stockData.stockInfo.type ? g() : "国债期货" == stockData.stockInfo.type ? N() : "信托产品" == stockData.stockInfo.type && P() : "rate" === stockData.pageName ? b() : "SGSH" === stockData.pageName ? k() : "ZCPZ" === stockData.pageName ? S() : "finance" === stockData.pageName ? D() : "JGCC" === stockData.pageName ? x(1) : "ZYCWZB" === stockData.pageName ? T(1) : "MRCWZB" === stockData.pageName ? w(1) : "GBJG" === stockData.pageName ? B(1) : "ZYGD" === stockData.pageName ? C(1) : "LTGD" === stockData.pageName ? j(1) : "GDGKCGXX" === stockData.pageName ? q(1) : "XSGDMD" === stockData.pageName ? I(1) : "FHPS" === stockData.pageName ? F(1) : "ZFYLB" === stockData.pageName ? L(1) : "GPSYLZB" === stockData.pageName ? Z(1) : "GDHS" === stockData.pageName ? G(1) : "GSJJ" === stockData.pageName ? U(1) : "LHB" === stockData.pageName ? A(1) : "DJCWZB" === stockData.pageName ? R(1) : "GSLRB" === stockData.pageName ? z(1, !0) : "XJLLB" === stockData.pageName ? M(1, !0) : "ZCFZB" === stockData.pageName ? J(1, !0) : "company" === stockData.pageName ? stockData.stockInfo.isPF ? oa() : stockData.stockInfo.isTP && H() : "LSJZ" === stockData.pageName ? O() : "GMBD" === stockData.pageName ? E() : "keyratios" === stockData.pageName ? Q() : "ownership" === stockData.pageName ? stockData.stockInfo.isPF ? la() : W() : "income" === stockData.pageName ? Y(1, !0) : "balance" === stockData.pageName ? K(1, !0) : "cash" === stockData.pageName ? ta(1, !0) : "dividends" === stockData.pageName ? aa(1, !0) : "samebank" === stockData.pageName ? ea() : "sameperiod" === stockData.pageName ? na() : "newproduct" === stockData.pageName ? getNewProduct() : "CPJZ" === stockData.pageName ? ia() : "analyst" === stockData.pageName && da()
}), define("stockReport.jade.js", function(require, exports, module) {
    function anonymous(locals, attrs, escape, rethrow, merge) {
        attrs = attrs || jade.attrs, escape = escape || jade.escape, rethrow = rethrow || jade.rethrow, merge = merge || jade.merge;
        var buf = [];
        with(locals || {}) {
            buf.push('<div class="tableContainer"><table cellpadding="0" cellspacing="0" class="dataTable"><thead><tr><th colspan="2">');
            var __val__ = screenName + " 雪球研报下载";
            buf.push(escape(null == __val__ ? "" : __val__)), buf.push("</th></tr></thead><tbody>"),
                function() {
                    if ("number" == typeof list.length)
                        for (var t = 0, a = list.length; a > t; t++) {
                            var e = list[t];
                            buf.push("<tr"), buf.push(attrs({
                                "class": t % 2 ? "" : "odd"
                            }, {
                                "class": !0
                            })), buf.push("><td>");
                            var n = e.title || screenName + " 雪球研报 (" + e.count + "次下载)";
                            buf.push(escape(null == n ? "" : n)), buf.push("</td><td>");
                            var n = e.count + "次下载";
                            buf.push(escape(null == n ? "" : n)), buf.push('</td><td style="text-align:right;padding-right: 10px;"><a'), buf.push(attrs({
                                href: "/stockreport/download?name=" + e.pdf + "&_upd=" + e.title,
                                "data-toggle": "download",
                                "data-screen-name": screenName,
                                "data-profile": profile,
                                "data-status-id": e.statusid
                            }, {
                                href: !0,
                                "data-toggle": !0,
                                "data-screen-name": !0,
                                "data-profile": !0,
                                "data-status-id": !0
                            })), buf.push(">下载</a></td></tr>")
                        } else {
                            var a = 0;
                            for (var t in list) {
                                a++;
                                var e = list[t];
                                buf.push("<tr"), buf.push(attrs({
                                    "class": t % 2 ? "" : "odd"
                                }, {
                                    "class": !0
                                })), buf.push("><td>");
                                var n = e.title || screenName + " 雪球研报 (" + e.count + "次下载)";
                                buf.push(escape(null == n ? "" : n)), buf.push("</td><td>");
                                var n = e.count + "次下载";
                                buf.push(escape(null == n ? "" : n)), buf.push('</td><td style="text-align:right;padding-right: 10px;"><a'), buf.push(attrs({
                                    href: "/stockreport/download?name=" + e.pdf + "&_upd=" + e.title,
                                    "data-toggle": "download",
                                    "data-screen-name": screenName,
                                    "data-profile": profile,
                                    "data-status-id": e.statusid
                                }, {
                                    href: !0,
                                    "data-toggle": !0,
                                    "data-screen-name": !0,
                                    "data-profile": !0,
                                    "data-status-id": !0
                                })), buf.push(">下载</a></td></tr>")
                            }
                        }
                }.call(this), buf.push("</tbody></table></div>")
        }
        return buf.join("")
    }
    module.exports = anonymous
});
