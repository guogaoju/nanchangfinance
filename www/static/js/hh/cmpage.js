// +----------------------------------------------------------------------
// | CmPage [ 通用页面框架.Html5 ]
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// +----------------------------------------------------------------------
// | Author: defans <defans@sina.cn>
// +----------------------------------------------------------------------

/**
  cmpage的公共属性和方法，请在每个cmpage的html页面引用
 */

var cmpage = {
	modulename: '', //模块名称
	parmsUrl: {}, //URL中的参数对象
	curID: 0, //当前记录ID
	gps: { //经纬度
		lat: 0,
		lng: 0
	},
	//手机端加载的窗体页面
	html: {
		LIST: '/html/cmpage/cmpage-list.html', //列表页
		LIST_POP: '/html/cmpage/cmpage-list-pop.html', //弹出列表页
		SEARCH: '/html/cmpage/cmpage-search.html', //搜索条件页
		EDIT: '/html/cmpage/cmpage-edit.html', //编辑页面
		VIEW: '/static/mob/hh_view.html', //查看页面
		LIST_FILE: '/html/cmpage/cmpage-list-file.html', //附件列表页
		FILE_PICKER: '/html/cmpage/cmpage-filepicker.html', //文件、照片页
		SCAN: '/html/cmpage/cmpage-scan.html', //二维码扫描页
		UPLOADER: '/html/cmpage/cmpage-uploader.html', //附件上传-
		APPR: '/static/mob/hh_appr.html' //审批页面
	}
}

//初始化
cmpage.init = function () {

	console.log("-------------init-------------");
	console.log(mui('#modulename'));

	cmpage.modulename = mui('#modulename')[0].value || "";
	cmpage.parmsUrl = eval('(' + mui('#parmsUrl')[0].value + ')') || {};

	//查找带回的结果处理
	window.addEventListener('cmpage_lookup_result', function (event) {
		var d = event.detail;
		app.debug(JSON.stringify(d.result));
		for (var p in d.result) {
			var field = document.getElementsByName(p)[0];
			if (field) {
				//app.debug(JSON.stringify(d.result[p]));
				if (p.indexOf('c_') === 0) {
					field.value = d.result[p];
				} else {
					field.innerHTML = d.result[p];
				}
			}
		}

	});
}

cmpage.getExtrasParm = function (elem) {
	return {
		modulename: elem.getAttribute('data-modulename') || cmpage.modulename,
		curID: elem.getAttribute('data-id') || cmpage.curID,
		parms: eval('(' + elem.getAttribute('data-parms') + ')') || {},
		parmsUrl: eval('(' + elem.getAttribute('data-parmsUrl') + ')') || cmpage.parmsUrl,
		title: elem.innerHTML || ''
	};
}

//根据后端传回的样式类名，增加相应的行为
//此处 cmpage.btnToXXX 为一般的行为逻辑，如果需要特殊处理，则后端传回特定样式类名，然后额外增加事件监听
cmpage.btnToView = function (e) {
	
	
	var elem = this;
	var url = '';
	var extras = cmpage.getExtrasParm(elem);
	console.log(JSON.stringify(extras));
	switch (elem.getAttribute('data-type')) {
		case 'edit':
			url = cmpage.html.EDIT;
			break;
		case 'appr':
		// {"modulename":"SCFSupplierInfo","curID":0,"parms":{},"parmsUrl":{"url":"/cmpage/page/update_status?modulename=SCFSupplierInfo&id=4&actID=149&status=1309","status":"待审核","modulename":"SCFSupplierInfo","id":"4","c_status":"1309","c_path":"demo/scfcorecoinfo_appr","c_link":"4","c_act":"149","c_modulename":"SCFSupplierInfo","c_link_type":"t_scf_supplierinfo"},"title":"递交申请"}
			url = cmpage.html.APPR+'?modulename='+extras.parmsUrl["modulename"]+'&id='+extras.parmsUrl["id"]+'&status='+encodeURI(encodeURI(extras.parmsUrl["status"]))+'&c_status='+extras.parmsUrl["c_status"]+'&c_path='+extras.parmsUrl["c_path"]+'&c_link='+extras.parmsUrl["c_link"]+'&c_act='+extras.parmsUrl["c_act"]+'&c_modulename='+extras.parmsUrl["c_modulename"]+'&c_link_type='+extras.parmsUrl["c_link_type"]+'&title='+extras["title"];
			break;
		case 'view':
			url = cmpage.html.VIEW+'?modulename='+extras["modulename"]+'&id='+extras["curID"];
			break;
		case 'list_file':
			url = cmpage.html.LIST_FILE;
			break;
		case 'list_pop':
			url = cmpage.html.LIST_POP;
			break;
		case 'scan':
			url = cmpage.html.SCAN;
			break;
		case 'uploader':
			url = cmpage.html.UPLOADER;
			break;
		case 'picker_file':
			url = cmpage.html.FILE_PICKER;
			break;
		case 'search':
			url = cmpage.html.SEARCH;
			break;
		default:
			url = '';
	}
	console.log("----------------url--------------------");
	console.log(url);
	console.log("----------------extras----------------");
	console.log(extras);
	e.stopPropagation();
	setTimeout(function () {
		mui.openWindow({
			id: url + app.getRandomNum(0, 50),
			url: url,
			//extras: extras,
			show: {
				autoShow: false
			}
		});
	}, 100);
}

cmpage.btnToAction = function (e) {
	e.stopPropagation();
	var elem = this;
	var btnArray = ['否', '是'];
	mui.confirm("确定要" + elem.innerHTML + "吗?", '友情提示', btnArray, function (el) {
		if (el.index == 1) {
			mui.ajax(elem.getAttribute('href'), {
				data: cmpage.getExtrasParm(elem),
				type: "post",
				dataType: 'json',
				timeout: 5000,
				error: function (request) {
					app.toast("服务器通信失败！");
				},
				success: function (data) {
					app.toast(data.message);
					if (typeof pulldownRefresh === 'function') pulldownRefresh();
					//						if(elem.innerHTML == "删除") {
					//							elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
					//						}
				}
			});
		}
	});
}

cmpage.addEventListener = function () {
	//app.debug('cmpage.addEventListener ');
	//执行某个动作的按钮
	//打开弹出窗口的按钮
	mui('body').on('tap', '.cmpage-btn-view', cmpage.btnToView);
	mui('body').on('tap', '.cmpage-btn-action', cmpage.btnToAction);

	//地区3级联动
	mui('body').on('tap', '.cmpage-picker-country', function () {
		var elem = this;
		var areaPicker = new mui.PopPicker({
			layer: 3
		});
		areaPicker.setData(cityData3); //html文件中需要先加载 <script src="../../mui/js/city.data-3.js" type="text/javascript" charset="utf-8"></script>
		var ref = elem.getAttribute('data-ref');
		areaPicker.show(function (items) {
			elem.innerHTML = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
			document.getElementById(ref).value = (items[0] || {}).value + "," + (items[1] || {}).value + "," + (items[2] || {}).value;
			//areaPicker.dispose();
		});
	});

	//日期时间选择
	mui('body').on('tap', '.cmpage-picker-datetime', function () {
		var btn = this;
		var options = JSON.parse(btn.getAttribute('data-options') || '{}');
		var picker = new mui.DtPicker(options);
		var ref = btn.getAttribute('data-ref');
		picker.setSelectedValue(document.getElementById(ref).value);
		picker.show(function (rs) {
			document.getElementById(ref).value = rs.text;
			btn.innerHTML = rs.text;
			//picker.dispose();
		});
	});

	//查找带回的按钮
	mui('body').on('tap', '.cmpage-btn-lookup', function () {
		//var extras = cmpage.getExtrasParm(this);
		//extras.titile = '请选择';
		//setTimeout(function() {
		//	mui.openWindow({
		//		id: cmpage.html.LIST_POP,
		//		url: cmpage.html.LIST_POP,
		//		extras: extras
		//	});
		//}, 100);
	});

	//查找带回的结果返回, 父页面的结果处理在 cmpage 中
	mui('body').on('tap', '.cmpage-lookup-back', function () {
		var elem = this;
		//mui.fire(cmpage.parentView, "cmpage_lookup_result", {
		//	result: eval('(' + elem.getAttribute('data-result') + ')') || {}
		//});
		//mui.back();
	});

	// //右侧弹出按钮点击事件
	//mui('body').on('tap', '.cmpage-picker-file', function() {
	//
	// });

}