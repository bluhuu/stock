define("SNB.dialog.js", [], function() {
    "undefined" == typeof SNB && (SNB = {});
    var e = {
        dialogMessage: function(e) {
            if (0 == $("#dialog-message").length) {
                var a = ' <div id="dialog-message"> <p class="message"> </p> <div class="dialog-center"> <input type="submit" class="submit" value="确定"/> </div> </div> ';
                $("body").append(a), $("#dialog-message").find(".submit").click(function() {
                    $("#dialog-message").dialog("close")
                })
            }
            var t = $("#dialog-message");
            return t.find(".message").html(e), t
        },
        deleteStockTransDialog: function(e, a) {
            if (0 == $("#dialog-delete-stock-trans").length) {
                var t = '<div id="dialog-delete-stock-trans" class="dialog-wrapper"> <form id="delete-stock-trans" action=""> <div class="dialog-center vertical-margin-20"> <span class="alert"> 确认删除 <em name="name"></em> 的所有持仓记录？ </span> </div> <div class="dialog-center"> <input type="submit" class="submit" value="确定" /> <input type="hidden" name="code"/> <input type="button" class="cancel button" value="取消" /> </div> <input type="hidden" name="stock" /> </form> </div>';
                $("body").append(t), $("#delete-stock-trans .cancel").click(function() {
                    $("#dialog-delete-stock-trans").dialog("close")
                })
            }
            $("#delete-stock-trans").unbind("submit").submit(function() {
                var e = $(this).find("input[name=stock]").val(),
                    t = SNB.Util.getStockInfo(e),
                    n = "货币基金" == t.type ? "/stock/transfund/remove.json" : "/stock/portfolio/deltrans.json";
                return SNB.post(n, {
                    symbol: e,
                    group_id: SNB.data.currentPerformanceGroupId
                }, function() {
                    $("#dialog-delete-stock-trans").dialog("close"), a && a()
                }), !1
            });
            var n = $("#dialog-delete-stock-trans");
            return n.find("em[name=name]").html(e), n.find("input[name=stock]").val(e), n
        },
        deleteGroupDialog: function(e) {
            var a = e.isUserGroup,
                t = e.isPerformanceGroup,
                n = "你确定删除该分组吗？",
                r = a ? "删除分组不会影响对用户的关注状态" : "删除分组不会影响对股票的关注状态",
                i = e.id,
                o = a ? "/friendships/groups/destroy.json" : "/stock/portfolio/remove.json",
                s = e.callback,
                l = e.isStock;
            if (l && (o = "/stock/portfolio/delstock.json", n = "你确定取消关注该自选股吗？", r = "该自选股相关的公告、新闻将不再推送给你"), t && (o = "stock/transgroup/remove.json", n = "你确定删除该组合吗？", r = "该组合下的持仓都将会被删除"), !$("#dialog-delete-port").length) {
                var d = ' <div id="dialog-delete-port" class="dialog-wrapper"> <form id="delete-port" action=""><p class="dialog-deleteGroup-title"><stong>' + n + '</strong></p><p class="dialog-deleteGroup-description">' + r + '</p> <div class="dialog-center"> <input type="submit" class="submit" value="确定" /> <input type="button" class="cancel button" value="取消" /> </div> </form> </div>';
                $("body").append(d), $("#delete-port .cancel").click(function() {
                    $("#dialog-delete-port").dialog("close")
                }), $("#delete-port").submit(function() {
                    var e = $("#dialog-delete-port").data("gid"),
                        n = a || t ? {
                            id: e
                        } : l ? {
                            code: e
                        } : {
                            pid: e
                        },
                        r = function() {
                            var a = function(a) {
                                    $("#dialog-delete-port").dialog("close"), s && s(a, e)
                                },
                                t = function(e) {
                                    e.error_description && alert(e.error_description)
                                };
                            SNB.post(o, n, a, t)
                        };
                    return r(), !1
                })
            }
            var p = $("#dialog-delete-port").data("gid", i);
            return p
        },
        deletePortfolioDialog: function(e, a, t) {
            if (0 == $("#dialog-delete-port").length) {
                var n = '<div id="dialog-delete-port" class="dialog-wrapper"> <form id="delete-port" action=""> <div class="dialog-center vertical-margin-20"> <span class="alert"> 确认删除 <em name="pname"></em> 分组？ </span> </div> <div class="dialog-center"> <input type="submit" class="submit" value="确定" /> <input type="hidden" name="pid"/> <input type="button" class="cancel button" value="取消" /> </div> </form> </div>';
                $("body").append(n), $("#delete-port .cancel").click(function() {
                    $("#dialog-delete-port").dialog("close")
                }), $("#delete-port").submit(function() {
                    return SNB.get("/stock/portfolio/remove.json", {
                        pid: $(this).find("input[name=pid]").val()
                    }, function() {
                        $("#dialog-delete-port").dialog("close");
                        var e = $("#delete-port").find("input[name=pid]").val();
                        t.ulWrapper.find("li[portfolio-id='" + e + "']").remove(), t.portfolios = _.reject(t.portfolios, function(a) {
                            return a.id == e
                        }), t.activeTab = t.pid = -1, t.ulWrapper.find("li[portfolio-id='-1']").trigger("click")
                    }), !1
                })
            }
            var r = $("#dialog-delete-port");
            return r.find("input[name=pid]").val(e), r.find("em[name=pname]").html(a), r
        },
        sortDialog: function(e) {
            var a = e.groups,
                t = e.isUserGroup,
                n = e.isPerformanceGroup,
                r = e.submitCallback,
                i = e.deleteCallback,
                o = (e.editCallback, t ? "/friendships/groups/order.json" : "/v4/stock/portfolio/modifyorder.json"),
                s = t ? "/friendships/groups/destroy.json" : "/stock/portfolio/remove.json",
                l = $("#dialog-sort");
            if (n && (o = "/stock/transgroup/order.json", s = "stock/transgroup/remove.json"), !l.length) {
                var d = ' <div id="dialog-sort" class="dialog-wrapper"><form id="sort" action=""><div class="sort-widget"><select name="ports" multiple="multiple" class="sortable Scrollable"> </select> <div class="buttons"> <input type="button" class="sort_up button" value="上移" /> <input type="button" class="sort_down button" value="下移" /><input type="button" class="edit-name button" value="改名" /><input type="button" class="delete-group button" value="删除" /> </div> <div class="clear"></div> </div> <div class="dialog-center"> <input type="submit" class="submit" value="确定" /> <input type="button" class="cancel button" value="取消" /> </div> <input type="hidden" name="pid"/> </form> </div>';
                $("body").append(d), l = $("#dialog-sort"), l.on("click", ".sort_up", function() {
                    var e = l.find("select option:selected");
                    $(e[0]).prev().before(e)
                }), l.on("click", ".sort_down", function() {
                    var e = l.find("select option:selected");
                    $(e[e.length - 1]).next().after(e)
                }), l.on("change", ".sortable", function() {
                    var e = l.find("select option:selected").val(),
                        t = _.find(a, function(a) {
                            return a.id == e
                        });
                    t && t.default_id ? l.find(".edit-name,.delete-group").css("visibility", "hidden") : l.find(".edit-name,.delete-group").css("visibility", "visible")
                }), l.on("click", ".edit-name", function() {
                    if ($(this).hasClass("disabled")) return !1;
                    var e = l.find("select option:selected"),
                        a = $("select option").map(function() {
                            return {
                                id: $(this).val(),
                                name: $(this).text()
                            }
                        }),
                        t = l.data("options").isUserGroup,
                        r = {
                            isEdit: !0,
                            userGroup: t,
                            isPerformanceGroup: n,
                            groups: a,
                            callback: function(a) {
                                e.text(a)
                            },
                            group: {
                                id: e.val(),
                                name: e.text()
                            }
                        },
                        i = SNB.dialog.addGroupDialog(r),
                        o = Number(e.data("type"));
                    return 2 != o ? (SNB.dialog.showAlertDialog("系统默认分组不支持改名"), !1) : (i.dialog({
                        modal: !0,
                        title: "修改分组名称"
                    }), !1)
                }), l.submit(function() {
                    var e = [],
                        a = l.data("groups"),
                        i = [];
                    $(this).find("option").each(function() {
                        var a = $(this).val();
                        e.push(a)
                    }), a = _.filter(a, function(a) {
                        return ~_.indexOf(e, a.id + "")
                    }), i = _.pluck(a, "order_id");
                    var s = e + "",
                        d = {
                            pids: s,
                            category: a[0].category
                        };
                    (t || n) && (d.ids = s, d.orders = i + "", delete d.pids);
                    var p = function() {
                        var e = function(e) {
                            $("#dialog-sort").dialog("close"), r && r(e)
                        };
                        SNB.post(o, d, e)
                    };
                    return p(), !1
                }), l.find(".delete-group").click(function() {
                    if ($(this).hasClass("disabled")) return !1; {
                        var e = l.find("select option:selected"),
                            a = e.val();
                        $("select option").map(function() {
                            return {
                                id: $(this).val(),
                                name: $(this).text()
                            }
                        })
                    }
                    if (e.length) {
                        var r = {
                                isUserGroup: t,
                                isPerformanceGroup: n,
                                callback: function(e) {
                                    l.find("select option:selected").remove(), i && i(e, a)
                                },
                                id: a
                            },
                            o = SNB.dialog.deleteGroupDialog(r),
                            s = Number(e.data("type"));
                        if (2 != s) return SNB.dialog.showAlertDialog("系统默认分组不支持删除"), !1;
                        o.dialog({
                            modal: !0,
                            title: "删除用户分组"
                        })
                    } else alert("请先选择要删除的分组！");
                    return !1
                }), l.find(".cancel").click(function() {
                    $("#dialog-sort").dialog("close")
                }), $(".Scrollable").on("DOMMouseScroll mousewheel", function(e) {
                    var a = $(this),
                        t = this.scrollTop,
                        n = this.scrollHeight,
                        r = a.height(),
                        i = "DOMMouseScroll" == e.type ? -40 * e.originalEvent.detail : e.originalEvent.wheelDelta,
                        o = i > 0,
                        s = function() {
                            return e.stopPropagation(), e.preventDefault(), e.returnValue = !1, !1
                        };
                    return !o && -i > n - r - t ? (a.scrollTop(n), s()) : o && i > t ? (a.scrollTop(0), s()) : void 0
                })
            }
            l.data("options", e);
            var p = "";
            return _.each(a, function(e) {
                t ? 0 != e.id && 1 != e.id && (p += "<option data-type='" + (e.type || 2) + "' value='" + e.id + "' order='" + (e.order_id || 0) + "'>" + e.name + "</option>") : p += "<option data-type='" + (e.type || 2) + "' value='" + e.id + "' order='" + (e.order_id || 0) + "'>" + e.name + "</option>"
            }), l.find("select").html(p), l.find(".edit-name,.delete-group").css("visibility", "visible"), l.data("groups", a), $("#dialog-sort")
        },
        addGroupDialog: function(e) {
            var a = (e.isEdit, e.userGroup),
                t = e.isPerformanceGroup,
                n = (e.groups, a ? 8 : 8),
                r = (e.callback, e.group);
            if (t && (n = 10), !$("#dialog-new-portfolio").length) {
                var i = ' <div id="dialog-new-portfolio" class="dialog-wrapper"> <form id="add-port" action=""> <div class="vertical-margin-30" style="padding-left:20px;"> <label for="new-port">分组：</label> <input type="text" style="width:175px;" name="new-port" id="new-port"/> </div> <div class="dialog-center"> <input type="submit" class="submit" value="确定" /> <input type="button" class="cancel button" value="取消" /> </div> </form> </div>';
                $("body").append(i);
                var o = $("#add-port");
                o.find("#new-port").blur(function() {
                    o.find(".alert").remove();
                    var e = SNB.Util.getWordsCount($.trim($(this).val()));
                    e > n && $(this).after("<p class='alert' style='padding-left:43px;'>分组名称最多8个汉子或16个字符</p>")
                }).focus(function() {
                    o.find(".alert").remove()
                }), $("#add-port .cancel").click(function() {
                    $("#dialog-new-portfolio").dialog("close")
                }), $("#add-port").submit(function() {
                    function e(e, a) {
                        var n = function(e) {
                                e ? ($("#dialog-new-portfolio").dialog("close"), d && d(e.success ? t : e)) : ($("#dialog-new-portfolio").dialog("close"), SNB.dialog.showFailedDialog("最多创建12个分组"))
                            },
                            r = function(e) {
                                SNB.Util.failDialog(e.error_description)
                            };
                        SNB.post(e, a, n, r)
                    }
                    o.find(".alert").remove();
                    var a = o.find("#new-port"),
                        t = $.trim(a.val()),
                        r = SNB.Util.getWordsCount(t),
                        i = $("#dialog-new-portfolio").data("options"),
                        s = i.isEdit,
                        l = i.group,
                        d = i.callback,
                        p = i.userGroup,
                        c = i.isPerformanceGroup,
                        u = i.groups,
                        f = "";
                    if (r) {
                        if (r > n) f = "分组名最多不超过" + n + "个汉字";
                        else if (u) {
                            var m = _.find(u, function(e) {
                                return e.name === t
                            });
                            m && (f = "分组名称重复", s && m.id == l.id && (f = ""))
                        }
                    } else f = "请输入组名";
                    if (f) return a.after("<p class='alert' style='padding-left:43px;'>" + f + "</p>"), !1;
                    var g, v;
                    return s ? (g = p ? "/friendships/groups/update.json" : "/stock/portfolio/modify.json", v = {
                        pname: t,
                        pid: l.id
                    }, c && (g = "/stock/transgroup/update.json"), (p || c) && (v = {
                        name: t,
                        id: l.id
                    })) : (g = p ? "/friendships/groups/create.json" : "/stock/portfolio/create.json", c && (g = "/stock/transgroup/create.json"), v = {
                        pname: t
                    }, (p || c) && (v = {
                        name: t
                    })), e(g, v), !1
                })
            }
            var s = $("#dialog-new-portfolio");
            return s.data("options", e), s.find("#new-port").val(r ? r.name : ""), s
        },
        addStockDialog: function(e) {
            function a() {
                var e = $("#add-stock"),
                    a = e.find("span.name").html(),
                    t = e.find("span.code").html(),
                    n = e.find("span.current").html(),
                    r = $.trim(e.find("#sell-price").val()),
                    o = $.trim(e.find("#buy-price").val()),
                    s = $.trim(e.find("#stock-comment").val()),
                    l = SNB.Util.getStockInfo(t),
                    d = l.money,
                    p = "$" + a + "(" + t + ")$",
                    c = "";
                if (i) {
                    var u = e.find("#sell-price"),
                        f = e.find("#buy-price"),
                        m = e.find("#stock-comment"),
                        g = u.data("orig"),
                        v = f.data("orig"),
                        h = m.data("orig");
                    r && r != g && (c += g && 0 != parseInt(g, 10) ? "将" + p + "卖出目标价从" + d + g + "调整为" + d + r + "。" : "将" + p + "卖出目标价调整为" + d + r + "。"), o && o != v && (c || (c = "将" + p), c += v && 0 != parseInt(v, 10) ? "买入目标价从" + d + v + "调整为" + d + o + "。" : "买入目标价调整为" + d + o + "。"), s && s != h && (c ? c += " " + s : c = p + s)
                } else {
                    "理财产品" === l.bigType && (d = ""), n && 0 != n && (c += "在" + d + n + "时");
                    var b = l.type;
                    c += "关注" + b + p, o && 0 != parseInt(o, 10) && (c += "，买入目标价" + d + o), r && 0 != parseInt(r, 10) && (c += "，卖出目标价" + d + r), c += "。", s && (c += s)
                }
                return c
            }

            function t(e, a) {
                SNB.get("/stock/forchart/stocklist.json", {
                    symbol: a,
                    period: "6m"
                }, function(a) {
                    var t = a.chartlist,
                        n = 0,
                        r = t.length;
                    t = t.reverse();
                    for (var i; r > n; n++) {
                        var o = t[n];
                        0 != o.current && (e.find("#current").html(o.current), i = o.current);
                        break
                    }
                    _.isUndefined(i) && e.find("#current").html("0.00")
                })
            }
            var n = e.stock,
                r = e.groups,
                i = e.isEdit,
                o = 11,
                s = $("#dialog-add-stock"),
                l = function(e) {
                    function t(e) {
                        r.find(".submit").removeAttr("disabled"), r.dialog("close"), SNB.data.share.shareStatus(a()), o && o(e)
                    }

                    function n() {
                        r.find(".submit").removeAttr("disabled")
                    }
                    var r = $("#dialog-add-stock"),
                        i = r.data("options"),
                        o = (i.stock, i.groups, i.callback),
                        s = i.isEdit;
                    s ? SNB.post("/stock/portfolio/updstock.json", e, t, n) : SNB.Util.portfolio_addstock(e, t, n)
                },
                d = n.symbol || n.code,
                p = SNB.Util.getStockInfo(d);
            if ("理财产品" === p.type && n.current && "undefined" !== n.current && (n.current *= 100, n.current = n.current.toFixed(2) + "%"), !s.length) {
                var c = '  <p><span class="code"></span> <span class="name"></span>&nbsp;&nbsp; ' + (_.isUndefined(n.current) || "undefined" == n.current ? "" : '<label for="current">当前价:</label> <span class="current" id="current"></span>') + "</p>";
                "理财产品" === p.type && (c = '  <p><span class="code" style="display: none;"></span> <span class="name"></span>&nbsp;&nbsp; <br/><label for="current">预期收益:</label> <span class="current" id="current"></span></p>');
                var u = ' <div id="dialog-add-stock" class="dialog-wrapper"> <form id="add-stock" action="">' + c + ' <p class="input"> <label for="buy-price">买入目标价:</label> <input type="textfield" name="buy-price" id="buy-price" size="6"/>  </p> <p class="input"> <label for="sell-price">卖出目标价:</label> <input type="textfield" name="sell-price" id="sell-price" size="6"/>  </p> <p class="input"> <label for="target-percent">涨跌幅提醒:</label> <input type="textfield" name="target-percent" id="target-percent" size="6"/>% </p> <p class="input"> <label for="stock-notice">开启提醒:</label> <input type="checkbox" id="stock-notice"/><span class="notice-declare">（包含涨停/跌停提醒）</span> </p> <p> 分组</p> <p class="dialog-userGroup-groups"> </p><p style="height:25px;"><a href="#" class="dialog-userGroup-addGroup">新建分组</a></p><p style="display:none;" class="dialog-userGroup-addGroupContainer"><input type="text"  placeholder="分组名最多不超过8个字"/><input type="button" class="button" value="保存"/><a href="#">取消</a></p> <p><label for="stock-comment">备注</label><span class="description">（可在个人页自选股列表中查看）</span> <textarea id="stock-comment" name="comment" rows="4" cols="30"></textarea> </p> <p id="shareStatus"></p> <div class="dialog-center" style="overflow:hidden;margin-top:10px;"> <input type="submit" class="submit" value="确定" /> <input type="button" class="cancel button" value="取消" /> </div> </form> </div> ';
                $("body").append(u), s = $("#dialog-add-stock"), SNB.Util.shareModule({
                    container: s.find("#shareStatus"),
                    type: "portfolio"
                }), s.on("click", "#add-stock .cancel", function() {
                    s.dialog("close")
                }).on("click", ".dialog-userGroup-addGroup", function() {
                    var e = $(this).parent(),
                        a = s.find(".dialog-userGroup-addGroupContainer");
                    return e.hide(), a.show(), !1
                }).on("click", ".dialog-userGroup-addGroupContainer .button", function() {
                    if (12 == $(".dialog-userGroup-groups label").length) return alert("最多创建12个分组"), !1;
                    var e = s.find(".dialog-userGroup-addGroupContainer input:text"),
                        a = e.val();
                    if (a) {
                        var t = '<label for="' + a + '">&nbsp;&nbsp;<input type="checkbox" class="tempcb" checked=checked data-name="' + a + '" id="' + a + '">' + a + "</label>";
                        s.find(".dialog-userGroup-groups").append(t), e.val("")
                    }
                    return !1
                }).on("click", ".dialog-userGroup-groups input:checkbox", function() {
                    !$(this).is(":checked") && $(this).hasClass("tempcb") && $(this).parent().remove()
                }).on("click", ".dialog-userGroup-addGroupContainer a", function() {
                    return s.find(".dialog-userGroup-addGroupContainer").hide(), s.find(".dialog-userGroup-addGroup").parent().show(), !1
                }).on("click", "#shareStatus input", function() {
                    $(this).is(":checked") ? SNB.Util.saveConfig({
                        sharestatus: 1
                    }) : $("#dialog-add-stock").find("#shareStatus label:visible input:checked").length || SNB.Util.saveConfig({
                        sharestatus: 0
                    })
                }).on("submit", "#add-stock", function() {
                    s.find(".submit").attr("disabled", "disabled");
                    var e = $(this),
                        a = e.find("#sell-price").val(),
                        t = e.find("#buy-price").val(),
                        n = e.find("#target-percent").val(),
                        r = e.find("#stock-notice").is(":checked") ? "1" : "0";
                    $("#sell-price,#buy-price").each(function() {
                        var e = $(this).val();
                        return e && !/\d+(\.\d+)?/gi.test(e) ? ($(this).addClass("error").bind("focus", function() {
                            $(this).removeClass("error"), $(this).next("span").remove()
                        }).after("<span style='margin-left:10px;color:red;'>请输入大于0的数字</span>"), !1) : void 0
                    });
                    var i = (e.find("span.current").html(), e.find("span.name").html(), []),
                        o = [];
                    s.find(".dialog-userGroup-groups input:checked").each(function() {
                        i.push($(this).data("name")), o.push($(this).hasClass("tempcb") ? -100 : this.id)
                    });
                    var d = {
                        pids: o.join(","),
                        pnames: i.join(","),
                        code: e.find("span.code").html(),
                        comment: e.find("#stock-comment").val(),
                        sprice: a,
                        bprice: t,
                        targetpercent: n || "0",
                        isnotice: r
                    };
                    return l(d), 8290096439 == SNB.currentUser.id && SNB.Util.saveConfig({
                        pnames: d.pnames
                    }), !1
                })
            }
            "投资组合" === p.type ? (s.find("label[for='current']").text("当前净值："), s.find("p.input").hide()) : (s.find("label[for='current']").text("当前价："), s.find("p.input").show()), s.find(".notice-declare").toggle("沪深" === p.bigType), s.data("options", e), s.find(".submit").removeAttr("disabled"), s.find(".code").html(n.symbol || n.code), s.find(".name").html(n.name);
            var f, m, g = "",
                v = "";
            i ? (g = -1 == n.buyPrice ? "" : n.buyPrice, v = -1 == n.sellPrice ? "" : n.sellPrice, f = _.isNull(n.targetPercent) ? 7 : -1 == n.targetPercent || 0 === n.targetPercent ? "" : n.targetPercent, m = _.isNull(n.isNotice) || 1 == n.isNotice ? "checked" : "") : (f = 7, m = "checked"), s.find("#buy-price").val(g).data("orig", g), s.find("#sell-price").val(v).data("orig", v), s.find("#target-percent").val(f).data("orig", f), s.find("#stock-comment").val(n.comment).data("orig", n.comment), m && s.find("#stock-notice").attr("checked", "checked");
            var h = function(e) {
                var a = "";
                if (!i) {
                    "全部" == r.current && (r.current = ""), a = r.current;
                    var t = SNB.Util.getStockInfo(s.find(".code").html()).bigType;
                    a || ("基金" == t && (t = "沪深"), a = t), "货币基金" == t && (t = "沪深"), "国债期货" == t && (t = ""), "理财产品" === t && (t = ""), /pre\d+/i.test(d) && (t = ""), a = t
                }
                var n = a ? [a] : r.current,
                    l = "";
                $.each(e, function(e, a) {
                    if (-1 != a.id) {
                        var t = "";
                        ~_.indexOf(n, a.name) && (t = "checked=checked"), l += '<label for="' + a.id + '">&nbsp;&nbsp;<input type="checkbox"' + t + ' data-name="' + a.name + '" id="' + a.id + '">' + a.name + "</label>"
                    }
                }), s.find(".dialog-userGroup-groups").html(l), e.length > o + 1 && s.find(".dialog-userGroup-addGroup").parent().hide()
            };
            r.all ? h(r.all) : SNB.get("/stock/portfolio/list.json", {
                uid: SNB.currentUser.id
            }, function(e) {
                h(e.portfolios)
            });
            var b = n.symbol || n.code;
            return _.isUndefined(n.current) ? SNB.get("/stock/quote.json", {
                code: b
            }, function(e) {
                if (e && e.quotes && e.quotes.length) {
                    var a = e.quotes[0].current;
                    0 == a ? t(dialogAddStock, b) : s.find("#current").html(a)
                }
            }) : 0 == n.current ? t(s, b) : s.find("#current").html(n.current), s
        },
        deleteStockDialog: function(e, a, t, n) {
            if (e.code = e.symbol || e.code || e.stockid, 0 == $("#dialog-delete-stock").length) {
                var r = '<div id="dialog-delete-stock" class="dialog-wrapper"><form action="" id="delete-stock"><div class="vertical-margin-20 portfolio"><span id="remove-from-portfolio"><em name="code" style="display:none;"></em><em>你确定从当前分组删除该自选股吗？</em></span> </br> <span style="color:#999">(仍可在“全部”分组中找到它)</span></div><div class="vertical-margin-10 truncate" style="margin-top:10px;"><input type="checkbox" id="truncate-stock" name="truncate-stock" checked/> <label for="truncate-stock">彻底删除</label><span style="display;none;color:#999;">&nbsp;&nbsp不再接收新闻、公告。</span></div><div class="dialog-center submit-area" style="margin-top:20px;"> <input class="submit" type="submit" value="确定" /> <input type="button" class="cancel button" value="取消" /> </div></form></div>';
                $("body").append(r), $("#dialog-delete-stock .cancel").click(function() {
                    $("#dialog-delete-stock").dialog("close")
                }), $("#dialog-delete-stock form").submit(function() {
                    var e, t, r = $(this).find("em[name=code]").html(),
                        o = $(this).find("#truncate-stock").is(":checked");
                    return o ? (e = "/stock/portfolio/delstock.json", t = {
                        code: r
                    }) : (e = "/stock/portfolio/updstock.json", t = {
                        pnames: n,
                        code: r
                    }), SNB.post(e, t, function() {
                        i.dialog("close"), a && a(r)
                    }), !1
                })
            }
            var i = $("#dialog-delete-stock");
            return i.find("em[name=code]").html(e.code || e.stockid), i.find("em[name=name]").html(e.name), i.find("em[name=pname]").html(t), "全部" == t ? (i.find("#truncate-stock").hide(), i.find(".portfolio").hide(), i.find(".alert").show()) : i.find("#truncate-stock").change(function() {
                $(this).is(":checked") ? i.find(".alert").show() : i.find(".alert").hide()
            }), i
        },
        processingDialog: function(e) {
            var a = $("#processing-dialog");
            if (a.length < 1) {
                var t = '<div id="processing-dialog" class="dialog-wrapper"><span class="processingTip"></span></div>';
                $("body").append(t), a = $("#processing-dialog")
            }
            return a.find(".processingTip").html(e), a.dialog({
                modal: !0,
                width: e.length < 10 ? 200 : 230,
                minHeight: 50
            }).prev().hide(), a
        },
        savedDialog: function(e, a) {
            var t = $("#dialog-saved-success");
            if (t.length < 1) {
                var n = '<div id="dialog-saved-success" class="dialog-wrapper"><span class="savedsuccesstip"></span></div>';
                $("body").append(n), t = $("#dialog-saved-success")
            }
            return t.find(".savedsuccesstip").html(e), t.dialog({
                modal: !0,
                width: e.length < 10 ? 200 : 230,
                minHeight: 50
            }).prev().hide(), setTimeout(function() {
                t.dialog("close")
            }, a || 2e3), t
        },
        showStateDialog: function(e, a) {
            var t = $("#dialog-show-state");
            if (t.length < 1) {
                var n = '<div id="dialog-show-state" class="dialog-wrapper"><p style="margin:10px;text-align:center;">' + e + '</p><p style="width:100%;text-align:center;"><input type="button" class="submit" value="确定"/></div>';
                $("body").append(n), t = $("#dialog-show-state"), t.find(".submit").unbind("click").click(function() {
                    t.dialog("close"), a && a()
                })
            }
            return t
        },
        showFailedDialog: function(e, a) {
            var t = $("#dialog-failed");
            if (t.length < 1) {
                var n = '<div id="dialog-failed" class="dialog-wrapper"><span class="savedfailtip"></span></div>';
                $("body").append(n), t = $("#dialog-failed")
            }
            return t.find(".savedfailtip").text(e), t.dialog({
                modal: !0,
                width: 200,
                minHeight: 50
            }).prev().hide(), setTimeout(function() {
                t.dialog("close")
            }, a || 3e3), t
        },
        getTemplate: function(e, a) {
            var t, n, r = "",
                i = '<select class="postfix"><option value="0">‰</option>',
                o = {
                    $: "美元",
                    HK$: "港元",
                    "￥": "人民币",
                    "€": "欧元",
                    AU$: "澳元",
                    "J￥": "日元",
                    "£": "英镑"
                },
                s = SNB.Util.getStockInfo(a),
                l = "货币基金" == s.type,
                d = o[s.money],
                p = ["", "买入", "卖出", "补回", "卖空", "现金股息", "红股入账", "合股", "拆股"];
            i += '<option value="1">' + d + "</option></select>";
            var c = function(e) {
                    var a = "请输入有效日期";
                    try {
                        var t = SNB.Util.parseDate(e.val()),
                            n = new Date;
                        if ("Invalid Date" == t || "" == t || t > n) return e.addClass("error").val(a).attr("title", a), !1
                    } catch (r) {
                        return e.addClass("error").val(a).attr("title", a), !1
                    }
                    return !0
                },
                u = function(e, a, t) {
                    var n = "无效数字",
                        r = e.val();
                    return isNaN(r) ? (e.addClass("error").val(n).attr("title", n), !1) : (n = "不能为空", "" != r || t ? (n = "不能为负数", 0 > r ? (e.addClass("error").val(n).attr("title", n), !1) : a || (n = "不能为0", 0 != r) ? !0 : (e.addClass("error").val(n).attr("title", n), !1)) : (e.addClass("error").val(n).attr("title", n), !1))
                };
            switch (e) {
                case 1:
                case 2:
                case 3:
                case 4:
                    r = ' <p> <label for="performance-date"><span class="required">*</span>日期:</label> <input type="text" class="datepicker" id="performance-date" name="performance-date" style="width:90px;"/> </p>', l || (r += ' <p> <label for="performance-price"><span class="required">*</span>价格:</label> <input type="text" name="performance-price" id="performance-price" size="6"/> </p>'), r += ' <p> <label for="performance-shares"><span class="required">*</span>数量:</label> <input type="text" name="performance-shares" id="performance-shares" size="6"/> <span>(不分享数量)</span></p>', l ? (r += ' <p><label>收益计算：</label><label><input type="radio" name="performance-mf-calculate" value="1" checked/>赎回日计息，申购日不计息</label><br><label style="visibility:hidden;">收益计算：</label><label><input type="radio" name="performance-mf-calculate" value="2">申购日计息，赎回日不计息</label></p>', 1 == e && (r += ' <p><label> 红利再分配日期：每月&nbsp;<input type="text" id="performance-mf-day" style="width:30px;"/>&nbsp;号</label></p>')) : r += ' <p> <label for="performance-commission">佣金:</label> <input type="text" name="performance-commission" id="performance-commission" size="6"/>&nbsp;&nbsp;' + i + '<label for="performance-saveCommission" style="float:right;"><input type="checkbox" id="performance-saveCommission" checked>保存为常用佣金</label></p><p> <label for="performance-price">税率:</label> <input type="text" name="performance-taxRate" id="performance-taxRate" size="6"/>&nbsp;&nbsp;' + i + '<label for="performance-saveTaxRate" style="float:right;"><input type="checkbox" id="performance-saveTaxRate" checked>保存为常用税率</label></p>', t = function(e) {
                        var t = $("#dialog-performance"),
                            n = "",
                            r = t.find(".name").text(),
                            i = SNB.Util.getStockInfo(a).money,
                            o = t.find("#performance-date").val(),
                            s = t.find("#performance-price").val(),
                            e = p[e],
                            l = t.find("#performance-comment").val();
                        return n += o, s && (n += "以" + i + s), e && (n += e), n += "$" + r + "(" + a + ")$。", l && (n += l), n
                    }, n = function() {
                        var a = $("#dialog-performance"),
                            t = a.find("#performance-date"),
                            n = a.find("#performance-shares"),
                            r = a.find("#performance-price"),
                            i = a.find("#performance-mf-day"),
                            o = a.find("#performance-taxRate"),
                            s = a.find("#performance-commission");
                        return l ? 1 == e ? c(t) && u(n) && u(i) : c(t) && u(n) : c(t) && u(n) && u(r) && u(o, !0, !0) && u(s, !0, !0)
                    };
                    break;
                case 5:
                    r = '<p> <label for="performance-date"><span class="required">*</span>除息日:</label> <input type="text" class="datepicker" id="performance-date" name="performance-date" style="width:90px;"/> <span id="beforeShares" ></span></p><p> <label for="performance-unitDividend"><span class="required">*</span>派息方案:</label> 每股派息<input type="text" name="performance-unitDividend" id="performance-unitDividend" size="6"/><span class="unit">&nbsp;&nbsp;' + d + '</span></p><p> <label for="dividend-taxRate">税率:</label> <input type="text" name="performance-taxRate" id="performance-taxRate" size="6"/>&nbsp;&nbsp;' + i + "</p>", t = function(e) {
                        var t = $("#dialog-performance"),
                            n = "",
                            r = t.find(".name").text(),
                            i = SNB.Util.getStockInfo(a).money,
                            o = t.find("#performance-date").val(),
                            s = t.find("#performance-unitDividend").val(),
                            e = (t.find("#performance-taxRate"), p[e]),
                            l = t.find("#performance-comment").val();
                        return n += "$" + r + "(" + a + ")$", n += o, n += "发放股息,每股" + i + s + "。", l && (n += l), n
                    }, n = function() {
                        var e = $("#dialog-performance"),
                            a = e.find("#performance-date"),
                            t = e.find("#performance-unitDividend");
                        return c(a) && u(t)
                    };
                    break;
                case 7:
                    r = '<p> <label for="performance-date"><span class="required">*</span>除权日:</label> <input type="text" class="datepicker" id="performance-date" name="performance-date" style="width:90px;"/> <span id="beforeShares" ></span></p><p> <label for="performance-unitShares"><span class="required">*</span>合股方案:</label> <input type="text" name="performance-unitShares" id="performance-unitShares" size="6"/><span>&nbsp;&nbsp;股合成1股</span></p><p> <label for="afterShares">合股后数量:</label> <span id="afterShares"></span>股</p>', t = function(e) {
                        var t = $("#dialog-performance"),
                            n = "",
                            r = t.find(".name").text(),
                            i = (SNB.Util.getStockInfo(a).money, t.find("#performance-date").val()),
                            o = t.find("#performance-unitShares").val(),
                            e = p[e],
                            s = t.find("#performance-comment").val();
                        return n += "$" + r + "(" + a + ")$", n += i, n += "合股," + o + "合1。", s && (n += s), n
                    }, n = function() {
                        var e = $("#dialog-performance"),
                            a = e.find("#performance-date"),
                            t = e.find("#performance-unitShares");
                        return c(a) && u(t)
                    };
                    break;
                case 8:
                    r = '<p> <label for="performance-date"><span class="required">*</span>除权日:</label> <input type="text" class="datepicker" id="performance-date" name="performance-date" style="width:90px;"/> <span id="beforeShares" ></span></p><p> <label for="performance-unitShares"><span class="required">*</span>拆股方案:</label><span>1股拆成</span> <input type="text" name="performance-unitShares" id="performance-unitShares" size="6"/><span>&nbsp;&nbsp;股</span></p><p> <label for="afterShares">拆股后数量:</label> <span id="afterShares"></span>股</p>', t = function(e) {
                        var t = $("#dialog-performance"),
                            n = "",
                            r = t.find(".name").text(),
                            i = (SNB.Util.getStockInfo(a).money, t.find("#performance-date").val()),
                            o = t.find("#performance-unitShares").val(),
                            e = p[e],
                            s = t.find("#performance-comment").val();
                        return n += "$" + r + "(" + a + ")$", n += i, n += "拆股，1拆" + o + "。", s && (n += s), n
                    }, n = function() {
                        var e = $("#dialog-performance"),
                            a = e.find("#performance-date"),
                            t = e.find("#performance-unitShares");
                        return c(a) && u(t)
                    };
                    break;
                case 9:
                    r = '<p> <label for="performance-date"><span class="required">*</span>除权除息日:</label> <input type="text" class="datepicker" id="performance-date" name="performance-date" style="width:90px;"/> <span id="beforeShares" ></span></p><p>10股</p><p> <label for="performance-unitIncreaseShares">转增:</label> <input type="text" name="performance-unitIncreaseShares" id="performance-unitIncreaseShares" size="6"/>股 </p><p> <label for="performance-unitShares">送&nbsp;&nbsp;&nbsp;:</label> <input type="text" name="performance-unitShares" id="performance-unitShares" size="6"/>股 </p><p> <label for="performance-unitDividend">红利:</label> <input type="text" name="performance-unitDividend" id="performance-unitDividend" size="6"/> ' + d + '</p><p> <label for="performance-taxRate">税率:</label> <input type="text" name="performance-taxRate" id="performance-taxRate" size="6"/> &nbsp;&nbsp;' + i + '<label for="performance-saveTaxRate" style="float:right;"><input type="checkbox" id="performance-saveTaxRate" checked>保存为常用税率</label></p>', t = function(e) {
                        var t = $("#dialog-performance"),
                            n = "",
                            r = t.find(".name").text(),
                            i = (SNB.Util.getStockInfo(a).money, t.find("#performance-date").val()),
                            o = t.find("#performance-unitIncreaseShares").val(),
                            s = t.find("#performance-unitShares").val(),
                            l = t.find("#performance-unitDividend").val(),
                            e = p[e],
                            c = t.find("#performance-comment").val();
                        n += "$" + r + "(" + a + ")$", n += i + " 除权除息,每10股";
                        var u = n;
                        return 0 != s && (n += "送红股" + s + "股"), 0 != l && (n != u && (n += "，"), n += "派" + l + d + "现金（含税）"), 0 != o && (n != u && (n += "，"), n += "转赠" + o + "股"), n += "。", c && (n += c), n
                    }, n = function() {
                        var e = $("#dialog-performance"),
                            a = e.find("#performance-date"),
                            t = e.find("#performance-unitShares"),
                            n = e.find("#performance-unitIncreaseShares"),
                            r = e.find("#performance-unitDividend"),
                            i = !0;
                        return t.val() && (i = u(t, !0)), n.val() && (i = u(n, !0)), r.val() && (i = u(r, !0)), c(a) && i
                    };
                    break;
                case 6:
                    r = '<p> <label for="performance-date"><span class="required">*</span>除权日:</label> <input type="text" class="datepicker" id="performance-date" name="performance-date" style="width:90px;"/> <span id="beforeShares" ></span></p><p> <label for="performance-unitShares"><span class="required">*</span>每1股送/增:</label> <input type="text" name="performance-unitShares" id="performance-unitShares" size="6"/><span>&nbsp;&nbsp;股</span></p><p> <label for="afterShares">红股数量:</label> <span id="afterShares"></span>股</p>', t = function(e) {
                        var t = $("#dialog-performance"),
                            n = "",
                            r = t.find(".name").text(),
                            i = (SNB.Util.getStockInfo(a).money, t.find("#performance-date").val()),
                            o = t.find("#performance-unitShares").val(),
                            e = p[e],
                            s = t.find("#performance-comment").val();
                        return n += "$" + r + "(" + a + ")$", n += i, n += "送/增股，每股分得" + o + "股。", s && (n += s), n
                    }, n = function() {
                        var e = $("#dialog-performance"),
                            a = e.find("#performance-date"),
                            t = e.find("#performance-unitShares");
                        return c(a) && u(t)
                    }
            }
            return {
                html: r,
                status: t,
                validate: n
            }
        },
        addStock: function(e, a, t) {
            function n(e, a, t, n) {
                var r = SNB.dialog.addStockDialog({
                    isEdit: e,
                    groups: a,
                    stock: t,
                    callback: n
                });
                r.dialog({
                    modal: "true",
                    width: "360px",
                    close: function() {
                        $("#search-stock").val("")
                    },
                    title: (e ? "修改" : "添加") + "自选股"
                })
            }
            var r = !!e.isEdit;
            if (t || "function" != typeof a || (t = a, a = {}), r && _.isEmpty(a)) {
                var i = SNB.get("/stock/portfolio/list.json", {
                        uid: SNB.currentUser.id
                    }),
                    o = SNB.get("/stock/portfolio/stock.json", {
                        symbol: e.symbol
                    });
                $.when(i, o).then(function(i, o) {
                    var s = i[0] ? i[0].portfolios : [],
                        l = o[0],
                        d = l.portfolioIds.split(","),
                        p = [];
                    e = _.extend(e, l), _.each(d, function(e) {
                        if (-1 != e) {
                            var a = _.find(s, function(a) {
                                return a.id == e
                            });
                            a && p.push(a.name)
                        }
                    }), a.current = p, a.all = s, n(r, a, e, t)
                })
            } else n(r, a, e, t)
        },
        performanceDialog: function(e) {
            function a(e, a) {
                var t, n = {
                        "沪股": 1,
                        "深股": 2,
                        "美股": 3,
                        "港股": 4,
                        "比特币": 5
                    },
                    r = SNB.Util.getStockInfo(e).bigType,
                    i = {};
                return "沪深" == r && (r = ~e.indexOf("SH") ? "沪股" : "深股"), i.stock_type = n[r], (1 == a || 2 == a) && (t = 1), (3 == a || 4 == a) && (t = 2), 9 == a && (t = 3), i.op_type = t, i
            }

            function t(e, t, n) {
                if (n) return !1;
                var r = a(e, t),
                    i = SNB.Util.getStockInfo(e);
                SNB.get("/stock/commissiontax/show.json", r, function(e) {
                    var a = $("#performance-commission"),
                        t = $("#performance-taxRate");
                    a.length && (a.val(e.commission || e.commission_rate), a.next().val(0 != e.commission ? 1 : 0)), t.length && (t.val(e.tax || e.tax_rate), t.next().val(e.tax ? 1 : 0)), _.isUndefined(e.commissionRate) && _.isUndefined(e.commission) && ("沪深" === i.bigType ? (a.next().val(0), a.val(1.5)) : "港股" === i.bigType && (a.next().val(0), a.val(2.5))), _.isUndefined(e.taxRate) && _.isUndefined(e.tax) && "港股" === i.bigType && (t.next().val(0), t.val(1.21))
                })
            }
            var n = $("#dialog-performance"),
                r = e.isEdit,
                i = (e.callback, e.stock),
                o = e.type,
                s = e.tranObj,
                l = this,
                d = e.shares,
                p = l.getTemplate(o, i.symbol),
                c = SNB.Util.getStockInfo(i.symbol),
                u = "货币基金" === c.type,
                f = '<p><span class="required">*</span><label for="performance-type">类型:</label><select id="performance-type">',
                m = ["", "买入", "卖出", "补回", "卖空", "现金股息", "红股入账", "合股", "拆股", "除权除息"],
                g = ["", {
                    add: "/stock/portfolio/addtrans.json",
                    edit: "/stock/portfolio/updtrans.json"
                }, {
                    add: "/stock/portfolio/addtrans.json",
                    edit: "/stock/portfolio/updtrans.json"
                }, {
                    add: "/stock/portfolio/addtrans.json",
                    edit: "/stock/portfolio/updtrans.json"
                }, {
                    add: "/stock/portfolio/addtrans.json",
                    edit: "/stock/portfolio/updtrans.json"
                }, {
                    add: "/stock/dividend/addtrans.json",
                    edit: "/stock/dividend/updtrans.json"
                }, {
                    add: "/stock/joinsplit/addtrans.json",
                    edit: "/stock/joinsplit/updtrans.json"
                }, {
                    add: "/stock/joinsplit/addtrans.json",
                    edit: "/stock/joinsplit/updtrans.json"
                }, {
                    add: "/stock/joinsplit/addtrans.json",
                    edit: "/stock/joinsplit/updtrans.json"
                }, {
                    add: "/stock/bonus/addtrans.json",
                    edit: "/stock/bonus/updtrans.json"
                }];
            if (u && (g[1] = {
                    add: "/stock/transfund/create.json",
                    edit: "/stock/transfund/update.json"
                }, g[2] = {
                    add: "/stock/transfund/create.json",
                    edit: "/stock/transfund/update.json"
                }), _.each(m, function(e, a) {
                    ("比特币" == c.type || "货币基金" == c.type) && a > 2 || a && 5 != a && 6 != a && (f += '<option value="' + a + '">' + e + "</option>")
                }), f += "</select>", n.length < 1) {
                var v = ' <div id="dialog-performance" class="dialog-wrapper"><form id="add-performance" action=""><p><span class="code"></span><span class="name"></span>&nbsp; <label for="current" id="performance-current-label">当前价:</label> <span id="moneySymbol"></span><span class="current" id="current"></span></p> <p><span>持仓组合：</span><select id="performance-groups"></select><p>' + f + '<div id="performance-container"></div><p><label for="performance-comment" style="display: block;">备注</label><textarea id="performance-comment" name="comment" rows="4" cols="44"></textarea> </p><p class="selectShareType"><label for="only-self"><input type="radio" id="only-self" name="share"/> 仅自己可见</label></p><p id="shareStatus" data-type="performance"></p><p class="submit" style="overflow:hidden;"> <input type="button" class="cancel button" value="取消" /> <input type="submit" class="submit" value="确定" /> </p></form></div> ';
                $("body").append(v), n = $("#dialog-performance"), SNB.Util.shareModule({
                    container: $("#dialog-performance").find("#shareStatus"),
                    type: "performance"
                })
            }
            n.find("#performance-container").html(p.html), n.find("#moneySymbol").html(SNB.Util.getStockInfo(i.symbol).money), n.find(".code").html(i.symbol), n.find(".name").html(i.name), n.find(".current").html(i.current), "货币基金" == c.type && n.find("#performance-current-label").text("万份收益");
            var h;
            if ("美股" == c.bigType && i.time) {
                if (h = SNB.Util.formatTime(i.time), !n.find("#performance-tip").length) {
                    var b = '<span id="performance-tip">&nbsp;(最后交易日：' + h + ")</span>";
                    n.find("#performance-date").after(b)
                }
            } else h = new Date;
            n.find("#performance-date").datepicker({
                maxDate: h
            }), n.find("#performance-type").val(o), u || t(i.symbol, o, r), SNB.get("/stock/transgroup/list.json", {}, function(e) {
                var a = "";
                e && e.length && _.each(e, function(e) {
                    a += '<option value="' + e.id + '">' + e.name + "</option>"
                }), $("#performance-groups").html(a).val(SNB.data.currentPerformanceGroupId)
            });
            var k = $("#performance-date"),
                y = $("#performance-type"),
                S = $("performance-groups"),
                x = $("#performance-shares"),
                N = $("#performance-sharesAll"),
                B = $("#performance-price"),
                G = $("#performance-comment"),
                w = $("#performance-commission"),
                j = $("#performance-taxRate"),
                U = $("#performance-unitShares"),
                D = $("#performance-unitDividend"),
                C = $("#performance-unitIncreaseShares"),
                I = $('input[name="performance-mf-calculate"]'),
                T = $("#performance-mf-day");
            if (r) n.data("tid", s.tid), n.find("#performance-groups").attr("disabled", "disabled"), $("#only-self").attr("checked", "checked"), n.find("#shareStatus").hide(), y.val(o).attr("disabled", "disabled"), k.val(SNB.Util.formatTime(s.date)).attr("disabled", "disabled"), G.val(s.comment), S.val(s.groupId), x.length && x.val(s.shares), N.length && N.val(s.sharesAll), B.length && B.val(s.price), w.length && (w.val(s.commission || s.commissionRate), w.next().val(0 != s.commission ? 1 : 0)), j.length && (j.val(s.tax || s.taxRate), j.next().val(s.tax ? 1 : 0)), U.length && U.val(s.unitShares), D.length && D.val(s.unitDividend), C.length && C.val(s.unitIncreaseShares), I.length && I.eq(s.earning_type - 1).attr("checked", "checked"), T.length && T.val(s.day);
            else {
                y.removeAttr("disabled"), n.find("#performance-groups").removeAttr("disabled"), n.find("input:text").val(""), n.find("textarea").val(""), n.find("#shareStatus").show();
                var R = !1;
                $("#shareStatus input").each(function() {
                    $(this).is(":checked") && (R = !0)
                }), R && n.find("#only-self").removeAttr("checked")
            }
            return "美股" != c.market || r || n.find("#performance-commission").next().val(1), n.delegate("input:text", "focus", function() {
                $(this).hasClass("error") && $(this).removeClass("error").val("")
            }), n.find("#statusPreview").hover(function() {
                var e = parseInt($("#performance-type").val(), 10),
                    a = n.find(".code").text(),
                    t = l.getTemplate(e, a);
                this.title = t.status($("#performance-type").val())
            }, $.noop), n.find("#performance-type").change(function() {
                var e = parseInt($(this).val(), 10),
                    a = l.getTemplate(e, i.symbol).html;
                $("#performance-container").html(a);
                var r;
                if ("美股" == c.bigType && i.time && 9 != e) {
                    if (r = SNB.Util.formatTime(i.time), !n.find("#performance-tip").length) {
                        var o = '<span id="performance-tip">&nbsp;(最后交易日：' + r + ")</span>";
                        n.find("#performance-date").after(o)
                    }
                } else r = new Date;
                n.find("#performance-date").datepicker({
                    maxDate: r
                }), t(i.symbol, e)
            }), n.delegate("#performance-unitShares", "keyup", function() {
                if ("undefined" != typeof d && $("#performance-unitShares").val() && _.isNumber(parseFloat($("#performance-unitShares").val()))) {
                    var e = $("#performance-type").val();
                    n.find("#afterShares").html("7" == e ? d / $("#performance-unitShares").val() : d * $("#performance-unitShares").val())
                }
            }), n.delegate("#performance-date", "change", function() {
                if ($("#beforeShares").length) {
                    var e = $("#performance-date").val();
                    /\d{4}-\d{2}-\d{2}/.test(e) && SNB.get("/stock/portfolio/currentshares.json", {
                        symbol: i.symbol,
                        date: e,
                        group_id: SNB.data.currentPerformanceGroupId
                    }, function(e) {
                        e && (d = e.currentShares || 0, n.find("#beforeShares").html("前持有" + d + "股"))
                    })
                }
            }), n.delegate("#shareStatus input", "click", function() {
                $(this).is(":checked") ? ($("#only-self").removeAttr("checked"), SNB.Util.saveConfig({
                    sharestatus: 1
                })) : n.find("#shareStatus label:visible input:checked").length || ($("#only-self").attr("checked", "checked"), SNB.Util.saveConfig({
                    sharestatus: 0
                }))
            }), n.delegate("#only-self", "click", function() {
                $(this).is(":checked") && (n.find("#shareStatus input").removeAttr("checked"), SNB.Util.saveConfig({
                    sharestatus: 0
                }))
            }), $("#add-performance").unbind("submit").submit(function(t) {
                function o() {
                    var t = {};
                    if (t.type = m.val(), t.date = f.val(), t.comment = b.val(), t.symbol = i.symbol, u ? t.group_id = c.val() : t.groupId = c.val(), h.length && (t.price = h.val()), v.length && (t.shares = v.val()), k.length) {
                        var o = k.next().val();
                        0 == o ? t.commissionRate = k.val() : t.commission = k.val()
                    }
                    if (y.length) {
                        var o = y.next().val();
                        0 == o ? t.taxRate = y.val() : t.tax = y.val()
                    }
                    S.length && (t.unitShares = S.val()), x.length && (t.unitDividend = x.val()), N.length && (t.unitIncreaseShares = N.val()), r && (t.tid = n.data("tid")), B.length && (t.earning_type = B.filter(":checked").val()), G.length && (t.day = $.trim(G.val()));
                    var l = g[m.val()],
                        w = r ? l.edit : l.add;
                    SNB.post(w, t, function(a) {
                        if (a.error_code) return alert(a.error_description), !1;
                        if (n.dialog("close"), !r) {
                            var o = p.status(s),
                                l = {
                                    card_type: "stock",
                                    card_param: i.symbol
                                };
                            SNB.data.share.shareStatus(o, l)
                        }
                        e.callback && e.callback(t)
                    }, function(e) {
                        alert(e.error_description)
                    });
                    var j = $("#performance-saveCommission").length && $("#performance-saveCommission").is(":checked"),
                        U = $("#performance-saveTaxRate").length && $("#performance-saveTaxRate").is(":checked");
                    if (j || U) {
                        var D = a(d, s),
                            C = {
                                commission: "commission",
                                commissionRate: "commission_rate",
                                tax: "tax",
                                taxRate: "tax_rate"
                            };
                        for (var I in C) _.isUndefined(t[I]) || (D[C[I]] = t[I] || 0);
                        SNB.post("/stock/commissiontax/add.json", D, $.noop())
                    }
                }
                t.preventDefault();
                var s = parseInt($("#performance-type").val(), 10),
                    d = n.find(".code").text(),
                    p = l.getTemplate(s, d),
                    c = $("#performance-groups"),
                    f = $("#performance-date"),
                    m = $("#performance-type"),
                    v = $("#performance-shares"),
                    h = ($("#performance-sharesAll"), $("#performance-price")),
                    b = $("#performance-comment"),
                    k = $("#performance-commission"),
                    y = $("#performance-taxRate"),
                    S = $("#performance-unitShares"),
                    x = $("#performance-unitDividend"),
                    N = $("#performance-unitIncreaseShares"),
                    B = $('input[name="performance-mf-calculate"]'),
                    G = $("#performance-mf-day");
                return p.validate() ? void SNB.get("/stock/portfolio/hasexist.json", {
                    code: i.symbol,
                    uid: SNB.currentUser.id
                }, function(e) {
                    e && e.hasExist ? o() : SNB.get("/stock/portfolio/stocks.json", {
                        pid: -1,
                        tuid: SNB.currentUser.id
                    }, function(e) {
                        var a = "",
                            t = SNB.Util.getStockInfo(i.symbol).bigType,
                            n = _.pluck(e.portfolios, "name");
                        a = $.inArray(t, n) > -1 ? t : "全部";
                        var r = {
                            pnames: a,
                            code: i.symbol
                        };
                        SNB.Util.portfolio_addstock(r, function() {
                            o()
                        }, function() {})
                    })
                }) : !1
            }), n.find(".cancel").click(function() {
                n.dialog("close")
            }), n
        },
        userGroup: function(e, a, t) {
            var n = $("#dialog-userGroup"),
                r = 13,
                i = t || "",
                o = function(t) {
                    if (n.length) n.find("#remark").val(i);
                    else {
                        var o = '<div id="dialog-userGroup" class="dialog-wrapper"><form><p class="remark-wrapper" style=""><label for="remark" class="label_remark" >为<span style="vertical-align: baseline;" class="dialog-userGroup-userName"></span>设置备注：</label><input type="text" id="remark" placeholder="长度8个汉字以内" class="dialog_form_text" value="' + i + '"></p><p class="dialog-userGroup-title">为<span class="dialog-userGroup-userName"></span>设置分组：</p><p class="dialog-userGroup-groups"></p>' + (t.length >= r ? "" : '<p style="height:25px;"><a href="#" class="dialog-userGroup-addGroup">新建分组</a></p>') + '<p style="display:none;" class="dialog-userGroup-addGroupContainer"><input type="text" class="dialog_form_text" style="width:165px;" placeholder="分组名最多不超过8个字"/><input type="button" class="submit" value="保存"/><a href="#">取消</a></p><p class="submit" style="overflow:hidden;"> <input type="submit" class="submit" value="确定" /><input type="button" class="cancel button" value="取消" />  </p></form></div> ';
                        $("body").append(o), n = $("#dialog-userGroup"), n.delegate(".dialog-userGroup-addGroup", "click", function() {
                            var e = $(this).parent(),
                                a = $(".dialog-userGroup-addGroupContainer");
                            return e.hide(), a.show().find("input:text").focus(), !1
                        }).delegate("input:submit", "click", function() {
                            var e = [],
                                a = [],
                                t = $(".dialog-userGroup-userName").data("uid"),
                                r = n.data("user"),
                                i = $("#dialog-userGroup"),
                                o = i.find("input#remark"),
                                s = $.trim(o.val()),
                                l = i.find(".dialog-userGroup-addGroupContainer");
                            if (l.is(":visible")) return SNB.Util.failDialog("请先保存新建分组"), !1;
                            if (!SNB.Remark.Validate(s)) return SNB.Util.failDialog("备注最多不超过8个汉字"), !1;
                            if (SNB.Remark.Action({
                                    user_id: t,
                                    remark: s
                                }, $.noop(), function() {
                                    var e = $("div[data-uid='" + t + "']").next().find(".name");
                                    if (s && e.length) {
                                        var a = '<a href="#" data-user-name="' + r.name + '" data-user-id="' + t + '" data-user-remark="' + s + '" class="user_remark" >(' + s + ")</a>";
                                        e.find(".user_remark").length ? e.find(".user_remark").replaceWith(a) : e.append(a).css("display", "inline")
                                    }
                                }), $(".dialog-userGroup-groups").find("input:checkbox").each(function() {
                                    $(this).is(":checked") ? $(this).data("exist") || a.push(this.id) : $(this).data("exist") && e.push(this.id)
                                }), e.length && SNB.post("/friendships/groups/members/destroy.json", {
                                    uid: t,
                                    gid: e + ""
                                }, function() {}), a.length) {
                                var d = function(e) {
                                    e && e.error_description && alert(e.error_description)
                                };
                                r.industry_id ? SNB.post("/friendships/groups/members/add_industry.json", {
                                    gid: a + "",
                                    industry_id: r.industry_id,
                                    count: r.count,
                                    verified: r.verified
                                }, $.noop, d) : r.isGroup ? SNB.post("/friendships/groups/members/add_group.json", {
                                    gid: t,
                                    tgid: a + ""
                                }, $.noop, d) : SNB.post("/friendships/groups/members/add.json", {
                                    uid: t,
                                    gid: a + ""
                                }, $.noop, d)
                            }
                            return n.dialog("close"), !1
                        }).delegate("input.cancel", "click", function() {
                            n.dialog("close")
                        }).find(".dialog-userGroup-addGroupContainer").delegate("input:button", "click", function() {
                            var e = $(".dialog-userGroup-addGroupContainer input:text"),
                                a = $.trim(e.val()),
                                t = this;
                            return a && SNB.post("/friendships/groups/create.json", {
                                name: a
                            }, function(a) {
                                var n = '<label for="' + a.id + '">&nbsp;&nbsp;<input type="checkbox" id="' + a.id + '" checked="checked">' + a.name + "</label>";
                                $(".dialog-userGroup-groups").append(n).show(), e.val(""), SNB.data.userGroups && SNB.data.userGroups.push(a), $(t).next().trigger("click")
                            }, function(e) {
                                alert(e.error_description)
                            }), !1
                        }).delegate("a", "click", function() {
                            return $(".dialog-userGroup-addGroupContainer").hide(), $(".dialog-userGroup-addGroup").parent().show(), !1
                        })
                    }
                    n.data("user", e), $(".dialog-userGroup-userName").html(e.isGroup ? e.name : "“" + e.name + "”").data("uid", e.id);
                    var s = n.find(".dialog-userGroup-groups"),
                        l = "";
                    _.each(t, function(e) {
                        0 != e.id && 1 != e.id && (l += '<label for="' + e.id + '">&nbsp;&nbsp;<input type="checkbox" id="' + e.id + '">' + e.name + "</label>")
                    });
                    var d = n.find(".remark-wrapper");
                    return a ? d.show() : d.hide(), l ? s.html(l) : s.hide(), a || SNB.get("/friendships/groups/list.json", {
                        uid: e.id
                    }, function(e) {
                        e && e.length && $(".dialog-userGroup-groups").find("input:checkbox").each(function() {
                            ~_.indexOf(e, +this.id) && $(this).attr("checked", "checked").data("exist", !0)
                        })
                    }), n
                };
            return SNB.data.userGroups ? o(SNB.data.userGroups) : void SNB.get("/friendships/groups.json", function(e) {
                SNB.data.userGroups = e;
                var t = o(SNB.data.userGroups);
                t.dialog({
                    title: a ? "关注成功" : "用户分组",
                    width: "auto",
                    modal: !0
                })
            })
        },
        showAlertDialog: function(e, a, t) {
            var n = $("#dialog-alert");
            if (n.length < 1) {
                var r = '<div id="dialog-alert" class="dialog-wrapper" style="text-align: center"><a href="#" class="alert-close" role="button"><span class="ui-icon ui-icon-closethick">close</span></a><span class="alert-content" style="display: inline-block; margin-bottom: 1em;"></span><a class="alert-btn" href="#"></a></div>';
                $("body").append(r), n = $("#dialog-alert")
            }
            return n.find(".alert-content").html(e), n.find(".alert-btn").attr("href", t).text(a), n.dialog({
                modal: !0,
                width: 200,
                minHeight: 50
            }).prev().hide(), n.on("click", ".alert-close", function() {
                n.dialog("close")
            }), setTimeout(function() {
                n.dialog("close")
            }, 2e3), n
        }
    };
    SNB.dialog || (SNB.dialog = {}), _.extend(SNB.dialog, e)
});
