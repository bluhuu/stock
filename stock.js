;(function($,undefined){
	var data = {
		map : {},
		order : []
	}
	window.data = data;
	var localName = "stock_list";
	var sync2Local = function(){
		var data2Local = [];
		for(var i = 0,len = data.order.length; i < len; i++){
			var item = data.map[data.order[i]];
			data2Local.push(item);
		}
		var obj = {
			value : data2Local,
			lastUpdate : +new Date()
		};
		localStorage.setItem(localName, JSON.stringify(obj));
	}
	var saveItem = function(obj){
		data.order.unshift(obj.key); // 将元素加在数组开头，后添加的排在最前
		data.map[obj.key] = obj;
		sync2Local();
	}
	var editItem = function(obj){
		data.map[obj.key]['remark'] = obj.remark;
		sync2Local();
	}
	var removeItem = function(key){
		var position = $.inArray(key, data.order);
		if(position != -1){
			delete data.map[key];
			data.order.splice(position, 1);
		}
		sync2Local();
	}
	/* 排序 */
	var sortItem = function(queue){
		if($.isArray(queue)){
			if(queue.join("") == data.order.join("")){
				return false;
			}
			data.order = queue;
			sync2Local();

			return true;
		}
		return false;
	}
	function getLocalData(){
		var data = localStorage.getItem(localName);
		var arrData = [];
		if(data){
			try{
				var obj = JSON.parse(data);
				arrData = obj && obj.value;
			}catch(e){

			}
		}
		return arrData;
	}
	// 从本地getLocalData初始化data
	(function(){
		var arr = getLocalData();
		arr.forEach(function(item,index){
			data.order.push(item.key);
			data.map[item.key] = item;
		});
	})();
	var LocalData = {
		name : "stock_list",
		add : function(obj, cb){
			if(obj){
				saveItem(obj);
				cb && cb();
			}
		},
		remove : function(key, cb){
			if(key){
				removeItem(key);
				cb && cb();
			}
		},
		edit : function(obj,cb){
			if(obj.key && obj.remark != undefined){
				editItem(obj);
			}
			cb && cb();
		},
		getAll : function(cb){
			var res = [];
			data.order.forEach(function(item,index){
				var obj = data.map[item];
				res.push(obj);
			});
			if(cb){
				cb(res);
				return;
			}
			return res;
		},
		getKeys : function(){
			return data.order;
		},
		num : function(){
			return data.order.length;
		},
		isExist : function(key){
			if($.inArray(key, data.order) != -1){
				return true;
			}
			return false;
		},
		sort : function(queue,cb){
			var sort = sortItem(queue);

			if(sort){
				cb && cb();
			}
		}
	}

	window.LocalData = LocalData;
})(jQuery);

// 根据不同类型的代码，生成不同的url
function getLinkUrl(obj){
	var linkUrl = '',
		imgUrl = '';
	if(obj.key){
		linkUrl =  'https://xueqiu.com/S/' + obj.key;
	}else{
		switch(obj.type){
			case "ZS":
				linkUrl =  'http://stockhtm.finance.qq.com/hqing/zhishu/' + obj.code + '.htm';
				break;
			case "GP-A":
			case undefined:
				linkUrl = 'http://stockhtm.finance.qq.com/sstock/ggcx/' +　obj.code + '.shtml';
				break;
			default:
				linkUrl = 'http://stockhtm.finance.qq.com/fund/djj_jjcx/' + obj.code + '.htm';
				break;
		}
	}

	if(obj.type == "ZS"){
		imgUrl = 'http://img2.gtimg.cn/images/hq_parts_little4/hushen/indexs/' + obj.code + '.png';
	}else if(obj.type == "GP-A" || obj.type == "FJ-CX" || obj.type == ""){
		imgUrl = 'http://img2.gtimg.cn/images/hq_parts_little4/hushen/stocks/' + obj.code + '.png'
	}

	return {
		linkUrl : linkUrl,
		imgUrl : imgUrl
	};
}

;(function($,undefined){
	var sTplList = ['<li id="{key}" data-type="{type}"">',
						'<span class="top" title="置顶">置顶</span>',
						'<span class="name"><a target="_blank" href="{url}">{name}({code})</a></span>',
						'<span class="price">--</span>',
						'<span class="grow">--</span>',
						'<span class="hands">--</span>',
						'<span class="Pricetobookratio">--</span>',
						'<span class="pe_lyr">--</span>',
						'<span class="pe_ttm">--</span>',
						'<span class="zycwzb" data-key="{key}"></span>',
						'<span class="gslrb" data-key="{key}"></span>',
						'<span class="zcfzb" data-key="{key}"></span>',
						'<span class="xjllb" data-key="{key}"></span>',
						'<span class="remark {remarkFlag}" title="{remark}">加备注</span>',
						'<a href="#" class="delete" data-key="{key}">X</a>',
					'</li>'].join("");
	var Stock = {
		name : LocalData.name,
		timerSort : null,
		_renderStockStruct : function(obj){
			var self = this;
			var dataList = obj ? [].concat(obj) : LocalData.getAll();

			var sHtml = '';
			dataList.forEach(function(item){
				var itemObj = $.extend({},item);
				itemObj.code = item.key.slice(2);
				itemObj.key = item.key;
				itemObj.remarkFlag = item.remark ? "remarked" : "";
				itemObj.url = getLinkUrl(itemObj).linkUrl;
				sHtml += tmpl(sTplList,itemObj);
			});
			return sHtml;
		},
		// 请求雪球数据
		_loadXueQiuStockData : function(key,callback){
			$.ajax({
					url: 'https://xueqiu.com/v4/stock/quote.json',
					dataType: "jsonp",
					data: {
						code:key,
						return_hasexist:false,
						_:new Date()
					},
					success: function(json, textStatus){
						if(textStatus == "success"){
							callback(json);
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log("查询失败: ",XMLHttpRequest);
					}
				});
		},

		addStock : function(queryObj){
			var self = this;
			if(LocalData.isExist(queryObj.key)){
				$warning = $('#warning');
				$warning.show().css('opacity', 1).html('您要添加的股票已经在自选股中!');
				$warning.animate({
					opacity:0
				}, 3000, function(){
					$warning.hide();
				});
				return;
			}
			var obj = $.extend({}, queryObj);

			this.addStockData(obj);

			LocalData.add(obj);

			this.updateStockData();
		},
		sortStock : function(cb){
			var self = this;
			var queue = [];
			$('.zxg-list li').each(function(index,item){
				if(!item.id){
					return;
				}
				queue.push(item.id);
			})

			LocalData.sort(queue,function(){
				$(".tipStock").show();
				clearTimeout(self.timerSort);
				self.timerSort = setTimeout(function(){
					$(".tipStock").hide();
				},1000);

				cb && cb();
			});
		},
		addStockData : function(obj){
			if(!obj.key){
				return;
			}
			obj.code = obj.key.slice(2);
			obj.url = getLinkUrl(obj).linkUrl;
			var sHtml = tmpl(sTplList,obj);

			$('#zxg .zxg-list').prepend(sHtml);
		},
		updateStockData : function(cb){
			var keys = LocalData.getKeys();
			var NUM = 30;	// 每30个一组发请求

			if(keys.length == 0){
				$("#zxg .loading").hide();
				return;
			}

			for(var i = 0,len = Math.ceil(keys.length/NUM); i < len; i++){
				var arr = keys.slice(i*NUM, (i+1)*NUM);
				this._loadXueQiuStockData(arr.join(","),function(res){
					var $els = $("#zxg .zxg-list li");

					$els.each(function(index,item){
						var key = item.id;
						var obj = res[key.toUpperCase()];
						if(!obj){
							return;
						}
						var item = $(item);
						if(!item.attr("id")){
							return;
						}
						if(item == undefined || item.find(".price") == undefined){
							console.log(item)
						}
						item.find(".price").html(obj.current?obj.current:"--").removeClass('increase','reduce').addClass(+obj.percentage>0?'increase':'reduce');
						item.find(".grow").html(obj.percentage?(obj.percentage+"%"):"--").removeClass('increase','reduce').addClass(+obj.percentage>0?'increase':'reduce');
						item.find(".hands").html(obj.turnover_rate?obj.turnover_rate:"--");
						item.find(".Pricetobookratio").html(+obj.pb>0?obj.pb:"--");
						item.find(".pe_lyr").html(obj.pe_lyr?(+obj.pe_lyr).toFixed(2):"--");
						item.find(".pe_ttm").html(obj.pe_ttm?(+obj.pe_ttm).toFixed(2):"--");
					});

					cb && cb();
				});
			}
		},
		initDom : function(){
			var sHtml = this._renderStockStruct();
			$('#zxg .zxg-list').html(sHtml);

			this.updateStockData(function(){
				$("#zxg .loading").hide();
			});
		},
		/* 备注 */
		remark : function(info,cb){
			LocalData.edit(info,cb);
		},
		_bindEvent : function(){
			var self = this;
			$("#zxg").delegate(".delete","click",function(e){
				e.preventDefault();
				var $el = $(this);
				var key = $el.attr("data-key");
				LocalData.remove(key, function(){
					$el.closest("li").remove();
					console.log("success");
				});
			}).delegate(".remark","click",function(e){
				// 添加备注
				var key = $(this).parents("li").attr("id");
				var name = $(this).prevAll(".name").html();
				var price = $(this).prevAll(".price").html();
				var Pricetobookratio = $(this).prevAll(".Pricetobookratio").html();
				var pe_lyr = $(this).prevAll(".pe_lyr").html();
				var pe_ttm = $(this).prevAll(".pe_ttm").html();
				var $formRemark = $(".remark-form");
				$formRemark.show().find("#remark-key").val(key)
					.end().find(".name").html(name)
					.end().find(".price").html(price)
					.end().find(".Pricetobookratio").html(Pricetobookratio)
					.end().find(".pe_lyr").html(pe_lyr)
					.end().find(".pe_ttm").html(pe_ttm)
					.end().find("#remark").html($(this).attr("title"));
				$(".mask").show();
			}).delegate(".zycwzb","click",function(e){
				e.preventDefault();
				var $el = $(this);
				var key = $el.attr("data-key");
				financeChart("https://xueqiu.com/stock/f10/finmainindex.json",key,"主要财务指标");
			}).delegate(".gslrb","click",function(e){
				e.preventDefault();
				var $el = $(this);
				var key = $el.attr("data-key");
				financeChart("https://xueqiu.com/stock/f10/incstatement.json",key,"综合损益表");
			}).delegate(".zcfzb","click",function(e){
				e.preventDefault();
				var $el = $(this);
				var key = $el.attr("data-key");
				financeChart("https://xueqiu.com/stock/f10/balsheet.json",key,"资产负债表");
			}).delegate(".xjllb","click",function(e){
				e.preventDefault();
				var $el = $(this);
				var key = $el.attr("data-key");
				financeChart("https://xueqiu.com/stock/f10/cfstatement.json",key,"现金流量表");
			});
			$(".remark-form").delegate(".close","click",function(e){
				$(e.delegateTarget).hide();
				$(".mask").hide();
			}).delegate(".btn","click",function(e){
				var key = $("#remark-key").val().trim();
				var remark = $("#remark").val().trim();

				self.remark({key:key,remark:remark},function(){
					$(".mask").hide();
					$(e.delegateTarget).hide();

					var $remark = $("#"+key).find(".remark");
					if(remark == ""){
						$remark.removeClass("remarked");
					}else{
						$remark.addClass("remarked").attr("title",remark);
					}
				});
			});
			/* 走势图 */
			var timerTrend = null;
			$(".zxg-list").delegate("li .name","mouseenter",function(e){
				$el = $(this);
				var $parent = $el.parents("li");

				var code = $parent.attr("id").slice(2);
				var type = $parent.attr("data-type");
				var imgUrl = getLinkUrl({code:code,type:type}).imgUrl;
				if(imgUrl == ""){
					return;
				}
				timerTrend = setTimeout(function(){
					var style = '';
					if($parent.height()+$parent.position().top+60>$(".zxg-bd").height()){
						style = ' style="top:-82px"';
					}
					var str = '<div class="trendImg"' + style + '><img src="'+imgUrl+'?'+Math.random()+'" alt="" /></div>';
					$el.append(str);
				},500);
			}).delegate("li .name","mouseleave",function(e){
				clearTimeout(timerTrend);
				$(this).find(".trendImg").remove();
			});
			$(".zxg-list").delegate("li","mouseenter",function(e){
				$(this).addClass('hover');
			}).delegate("li",'mouseleave',function(e){
				$(this).removeClass('hover');
			}).delegate(".top","click",function(e){
				$(this).parents("li").prependTo(e.delegateTarget);
				self.sortStock();
			});

			/* 拖拽排序 */
			$( ".zxg-list" ).sortable({
				placeholder: "ui-state-highlight",
				activate : function(event,ui){
					ui.item.removeClass('hover');
				},
				deactivate : function(event,ui){
					self.sortStock();
				}
			});
			$( ".zxg-list" ).disableSelection();
		},
		init : function(){
			this.initDom();
			this._bindEvent();
		}
	};

	Stock.init();

	var timer = null;
	function startRender(){
		clearInterval(timer);
		timer = setInterval(function(){
			Stock.updateStockData();
		},1000);
	}
	startRender();

	// 一个简单的检测是否开盘时间，否则停止更新数据
	(function(){
		var curTime = new Date();

		var base = curTime.getFullYear() + '/' + (curTime.getMonth() + 1) + '/' + curTime.getDate() + ' ';
		var startAM = base + '09:15:00'; // 早盘开盘时间
		var endAM = base + '11:30:00';	// 早盘开盘时间
		var startPM = base + '13:00:00';	// 午盘开盘时间
		var endPM = base + '15:00:00';	// 午盘闭盘时间

		if(+curTime < +new Date(startAM) || ( +new Date(endAM) < +curTime && +curTime < +new Date(startPM) ) || +curTime > +new Date(endPM) ){
			clearInterval(timer);
		}
	})();

	window.LocalData = LocalData;
	window.Stock = Stock;
})(jQuery)
