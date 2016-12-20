;(function($,undefined){
	// 初始化指数数据
	(function(){
		if(!!localStorage.getItem('stock_list')){
			return;
		}
		var data = [
			{key: "sh000001", name: "上证指数", pinyin: "szzs", type: "ZS"},
			{key: "sz399006", name: "创业板指", pinyin: "cybz", type: "ZS"}
		];
		while(data.length){
			Stock.addStock(data.pop());
		}
	})();

	// 选择图标对话框
	(function(){
		var renderIconHtml = function(){
			var confIcons = ['rabbit', 'panda', 'mouse', 'lips', 'bear', 'dog', 'angrybird', 'hellokitty', 'octopus', 'tiger', 'flower', 'crab'];
			var html = [];
			while(confIcons.length){
				var icon = confIcons.shift();
				html.push('<a href="#" class="icon" data-id="' + icon + '"><img src="images/icons/' + icon + '.png"/></a>');
			}
			$('#setting .iconlist').html(html.join(""));
		}
		var bindEvent = function(){
			$('.setting').on('click', function(e){
				$("#setting").toggle();
				$('.mask').toggle();
			});
			$('#setting').delegate('.icon', 'click', function(e){
				var name = $(this).attr('data-id');
				localStorage.setItem('stock_icon', name);
				$('.iconlist .icon').removeClass('cur');
				$(this).addClass('cur');
				chrome.browserAction.setIcon({path: 'images/icons/' + name + '.png'});
			}).delegate('.close', 'click', function(e){
				$('#setting').hide();
				$('.mask').hide();
			}).delegate('.default', 'click', function(e){
				localStorage.removeItem('stock_icon');
				chrome.browserAction.setIcon({path: 'images/logo48.png'});
			});
		}
		renderIconHtml();
		bindEvent();
	})();

	/* 搜索suggest */
	var sug = new Suggest({
		template : {
			item : '<div class="sug-item" data-pre="{0}" data-item="{0}{1}" data-type={4}>'+
						'<span class="key">{1}</span><span class="name">{2}</span><span class="pinyin">{3}</span>'+
						// '<span class="sug-plus"></span>'+
					'</div>'
		},
		requestUrl : '/s3/?t=all',
		requestQueryKey : 'q',
		requestCallbackKey : 'cb',
		localStorageKey : Stock.name,
		suggestMaxNum: 15,
		submitCallback : function(query){
			var arr = query.split("  ");
			var queryObj = {
				key : arr[0]+arr[1],
				name : arr[2],
				pinyin : arr[3],
				type : arr[4]
			}
			if(LocalData.num() >= 100){
				$warning = $('#warning');
				$warning.show().css('opacity', 1).html('您的自选股中已经达到100个的上限，请删除一些再添加!');
				$warning.animate({
					opacity:0
				}, 3000, function(){
					$warning.hide();
				});
				return;
			}
			console.log(queryObj);
			Stock.addStock(queryObj);
		},
		isCache : false
	});
	window.TYPE = "financeQQ";


	// var weixinListApi = 'http://localhost/stock/api/weixin/list.php';
	// var stockListApi = 'http://localhost/stock/api/stock/list.php';
	// /* tab切换 */
	// $tabs = $(".nav-tabs .tab");
	// $tabPanes = $(".tab-content .tab-pane");
	// $tabs.on("click",function(e){
	// 	var $el = $(this);
	// 	var curIndex = $tabs.index($el);
	// 	$tabs.each(function(index,item){
	// 		$(item).removeClass("on");
	// 	});
	// 	$el.addClass("on");

	// 	$tabPanes.each(function(index,item){
	// 		$(item).removeClass('on');
	// 	});
	// 	$tabPanes.eq(curIndex).addClass("on");
	// 	$(".loading").hide();

	// 	if($el.attr("data-type") == "weixin"){
	// 		if($(".weixin").attr("data-status") != "ok"){
	// 			$(".loading").prependTo($tabPanes.eq(curIndex)).show();
	// 			var sTpl = ['<li class="item">',
	// 							'<div class="img">',
	// 								'<img src="{img}" alt="{name}">',
	// 							'</div>',
	// 							'<div class="info">',
	// 								'<span class="title">{name}</span>',
	// 								'<span class="intro">{intro}</span>',
	// 							'</div>',
	// 						'</li>'].join("");
	// 			var obj = {
	// 				url : weixinListApi,
	// 				el : $("#weixin"),
	// 				tpl : sTpl
	// 			}
	// 			window.RecoList && RecoList.init(obj,function(){
	// 				$(".weixin").attr("data-status","ok");
	// 				$(".loading").hide();
	// 			});
	// 		}
	// 	}
	// });

})(jQuery);
