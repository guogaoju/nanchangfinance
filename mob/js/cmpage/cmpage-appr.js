var get_url;
var submit_url;
var get_parm;
var btns;
var statusBox = document.getElementById('c_status');
var descBox = document.getElementById('Apprc_desc');
var memoBox = document.getElementById('Apprc_memo');

//B页面onload从服务器获取列表数据；
mui.plusReady(function () {
	//仅支持竖屏显示
	plus.screen.lockOrientation("portrait-primary");
	cmpage.init();
//	console.log("--------------------------");
//	console.log(mui.currentWebview.get_url);
//	console.log(mui.currentWebview.get_parm);
//	console.log("--------------------------");
//	console.log(mui.currentWebview);
//	console.log("--------------------------");
//	get_url = mui.currentWebview.get_url;
//	get_parm = mui.currentWebview.get_parm;
//	submit_url = mui.currentWebview.submit_url;
//	btns = mui.currentWebview.btns;
	//console.log(get_parm);
//	if (btns == 1) {
//		var btn = document.createElement("button");
//		btn.setAttribute("class", "mui-btn mui-btn-primary mui-btn-block");
//		btn.setAttribute("onclick", "postData()");
//		btn.innerHTML = "提交";
//		document.getElementById("content").appendChild(btn);
//	} else if (btns == 2) {
//		var btn1 = document.createElement("button");
//		btn1.setAttribute("class", "mui-btn mui-btn-primary mui-btn-block");
//		btn1.setAttribute("onclick", "postData('1')");
//		btn1.innerHTML = get_parm.indexOf("\"TaskAFinish\"") > 0 ? "完成" : "通过";
//		var btn2 = document.createElement("button");
//		btn2.setAttribute("class", "mui-btn mui-btn-primary mui-btn-block");
//		btn2.setAttribute("onclick", "postData('0')");
//		btn2.innerHTML = get_parm.indexOf("\"TaskAFinish\"") > 0 ? "整改" : "不通过";
//		document.getElementById("content").appendChild(btn1);
//		document.getElementById("content").appendChild(btn2);
//	}

	//从服务器获取数据
	getAppr();
});
mui.init({
    beforeback: function() {
　　　　 //获得父页面的webview
        var list = plus.webview.currentWebview().opener();
　　　　 //触发父页面的自定义事件(refresh),从而进行刷新
        mui.fire(list, 'refresh');
        //返回true,继续页面关闭逻辑
        return true;
    }
});
/**
 * 从服务器获取表单
 */
function getAppr() {
	console.log("---------------------");
	console.log(cmpage.parmsUrl.url);
	console.log(cmpage.parmsUrl.status);
	console.log(cmpage.parmsUrl.c_status);
	console.log(cmpage.parmsUrl.c_path);
	console.log(cmpage.parmsUrl.id);
	console.log("---------------------");
	statusBox.value = cmpage.parmsUrl.status;
	plus.nativeUI.closeWaiting();
	//显示当前页面
	mui.currentWebview.show();
//	mui.ajax(app.getDomain() + get_url, {
//		data: eval('(' + get_parm + ')'),
//		type: "post",
//		dataType: 'json',
//		timeout: 5000,
//		error: function (request) {
//			app.toast("服务器获取数据失败！");
//		},
//		success: function (data) {
//			if (data.statusCode == 200) {
//				var content = document.body.querySelector('.erp-cmpage-appr');
//				content.innerHTML += data.editPage;
//			} else {
//				app.toast("数据加载失败请稍后重试！");
//			}
//			//关闭等待框
//			plus.nativeUI.closeWaiting();
//			//显示当前页面
//			mui.currentWebview.show();
//		}
//	});
}

/**
 * 提交表单  parma=vala&parmb=valb
 */
function postData() {
	plus.nativeUI.confirm("确定要提交审批吗?", function (e) {
		if (e.index == 0) {
			mui.ajax(app.getDomain() + '/cmpage/mob/save', {
				data: {
					modulename:"APPR",
					id:cmpage.parmsUrl.id,
					c_status:cmpage.parmsUrl.c_status,
					c_path:cmpage.parmsUrl.c_path,
					c_link:cmpage.parmsUrl.c_link,
					c_act:cmpage.parmsUrl.c_act,
					c_modulename:cmpage.parmsUrl.c_modulename,
					c_desc:descBox.value,
					c_memo:memoBox.value,
					c_link_type:cmpage.parmsUrl.c_link_type
				},
				type: "post",
				dataType: 'json',
				timeout: 5000,
				error: function (request) {
					app.toast("服务器获取数据失败！");
				},
				success: function (data) {
					if (data.statusCode == 200) {
						app.toast("审批完成");
						mui.back();
					} else {
						app.toast("系统出错");
					}
				}
			});
		}
	}, this.innerHTML, ["确定", "取消"]);

}