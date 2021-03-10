var modulename, id;
var parms = "";
mui.init();

//console.log("123123123123123123");

//B页面onload从服务器获取列表数据；
mui.ready(function () {
	//cmpage.init();
	// console.log("-------------------");
	// console.log(GetQueryString('modulename'));
	// console.log(GetQueryString('id'));
	// console.log("-------------------");

	//从服务器获取数据
	getView();
});

/**
 * 从服务器获取表单
 */
function getView() {
	mui.ajax("/cmpage/mob/view", {
		data: {
			modulename: GetQueryString('modulename'),
			curID: GetQueryString('id')
		},
		type: "post",
		dataType: 'json',
		timeout: 5000,
		error: function (request) {
			//console.log(JSON.stringify(request));
			app.toast("服务器获取数据失败！");
			plus.nativeUI.closeWaiting();
		},
		success: function (data) {
			//			console.log(JSON.stringify(data));
			if (data.statusCode == 200) {
				var content = document.body.querySelector('.erp-cmpage-view');
				content.innerHTML += data.viewHtml;
			} else {
				app.toast("数据加载失败请稍后重试！");
			}

			//关闭等待框
			plus.nativeUI.closeWaiting();
			//显示当前页面
			mui.currentWebview.show();
		}
	});
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}