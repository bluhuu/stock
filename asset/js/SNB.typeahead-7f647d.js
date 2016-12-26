define("SNB.typeahead.js", [], function() {
    if ("undefined" != typeof $.fn.typeahead) {
        var e = $(".typeahead"),
            t = !1;
        e.typeahead({
            top: 4,
            items: 15,
            match: !1,
            sort: !1,
            source: function(e, t) {
                var a = $.trim($(".typeahead").val()).replace(/&/g, "&amp").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "");
                if (!a) return !1;
                var n = {
                        code: a,
                        size: 5
                    },
                    r = SNB.get("/stock/search.json", n, function() {}),
                    o = SNB.get("/users/search/suggest.json", {
                        q: a,
                        count: 3
                    }, function() {}),
                    l = SNB.get("/imgroups/search.json", {
                        q: a,
                        count: 3,
                        sg: 1
                    }, function() {});
                return $.when(r, o, l).then(function(e, a, n) {
                    e = "object" != typeof e[0] ? $.parseJSON(e[0]) : e[0], a = "object" != typeof a[0] ? $.parseJSON(a[0]) : a[0], n = "object" != typeof n[0] ? $.parseJSON(n[0]) : n[0];
                    for (var r = e.stocks, o = _.pluck(r, "name"), l = _.pluck(r, "code"), i = [], s = 0; s < o.length; s++) i.push(o[s] + "(" + l[s] + ")");
                    return _.each(a.users, function(e) {
                        i.push({
                            isUser: !0,
                            user: e
                        })
                    }), _.each(n.list, function(e) {
                        i.push({
                            isGroup: !0,
                            group: e
                        })
                    }), t(i)
                })
            },
            _render: function(e, a) {
                var n = $(".typeahead"),
                    r = $("<ul>"),
                    o = $("<ul>");
                if (n.val() === n.attr("placeholder") || "" === $.trim(n.val())) return a.hide();
                var l = _.filter(e, function(e) {
                        return "object" == typeof e && !!e.isGroup
                    }),
                    i = _.filter(e, function(e) {
                        return "object" == typeof e && !!e.isUser
                    });
                e = _.filter(e, function(e) {
                    return "string" == typeof e
                }), _.forEach(i, function(e) {
                    var t = e.user;
                    t.profile_image_url = SNB.Image.getProfileImage(t.profile_image_url, 30);
                    var a = $("<li class='user' data-value='" + t.remark + "'><a href='" + t.profile + "' target='_blank'><img src='" + t.profile_image_url + "' width=30 height=30/><span style='margin-left:6px'>" + t.screen_name + (t.remark ? "(" + t.remark + ")" : "") + "</span></a></li>");
                    r.append(a)
                }), _.forEach(l, function(e) {
                    var t = e.group,
                        a = $("<li class='group' ><a href='/g/" + t.id + "' target='_blank'><img src='" + t.profile_image_url_60 + "' width=30 height=30/><span style='margin-left:6px'>" + t.name + "</span></a></li>");
                    o.append(a)
                }), e = $(e).map(function(e, t) {
                    e = $(a.options.item).attr("data-value", t);
                    var n = e.attr("data-value"),
                        r = n.match(/\(([^(]*)\)$/g);
                    return r = r && r[0].substr(1, r[0].length - 2), e.find("a").html(a.highlighter(t)).attr("href", "http://xueqiu.com/S/" + r), e[0]
                });
                var s = $("<ul>");
                e.length && s.append('<li class="no_menu"><h3 class="stock">股票</h3></li>').append(e);
                var u = a.query.replace(/&/g, "&amp").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                return s.append('<li class="no_menu"><h3 class="content">讨论</h3></li><li data-value=\'' + u + "'><a href='http://xueqiu.com/k?q=" + encodeURIComponent(u) + "'target='_blank'>搜索<strong>&nbsp;" + u + '&nbsp;</strong>相关讨论</a></li><li class="no_menu"><h3 class="content">用户</h3></li>' + r.html() + "<li data-value='" + u + "'><a href='http://xueqiu.com/u?q=" + encodeURIComponent(u) + "'target='_blank'>搜索<strong>&nbsp;" + u + '&nbsp;</strong>相关用户</a></li><li class="no_menu"><h3 class="content">组合</h3></li><li data-value=\'' + u + "'><a href='http://xueqiu.com/k?type=cube&q=" + encodeURIComponent(u) + "'target='_blank'>搜索<strong>&nbsp;" + u + '&nbsp;</strong>相关组合</a></li><li class="no_menu"><h3 class="content">群组</h3></li>' + o.html() + "<li data-value='" + u + "'><a href='http://xueqiu.com/g?q=" + encodeURIComponent(u) + "'target='_blank'>搜索<strong>&nbsp;" + u + "&nbsp;</strong>相关群组</a></li>"), s.find("li:not(.no_menu)").first().addClass("active"), a.$menu.html(s.html()), t === !1 && (t = !0, a.$menu.delegate("a", "click", function() {
                    a.$menu.hide()
                }), $(window).on("focus", function() {
                    a.$element.blur(), a.$menu.hide()
                })), a
            },
            _select: function(e) {
                var t = (e.$menu.find(".active").attr("data-value"), e.$menu.find(".active a").attr("href"));
                return t ? void window.open(t, "_blank") : e.show()
            }
        })
    }
});
