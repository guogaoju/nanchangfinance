var get_url;
var submit_url;
var get_parm;
var btns;
var statusBox = document.getElementById('c_status');
var descBox = document.getElementById('Apprc_desc');
var memoBox = document.getElementById('Apprc_memo');


//B页面onload从服务器获取列表数据；
mui.ready(function () {
	//仅支持竖屏显示

	//从服务器获取数据
	getAppr();
});
mui.init();
/**
 * 从服务器获取表单
 */
function getAppr() {
	var ss = decodeURI(GetQueryString("status"),"UTF-8");

	statusBox.value = ss;
}

/**
 * 提交表单  parma=vala&parmb=valb
 */
function postData() {
	mui.confirm("确定要提交审批吗?", function (e) {
		if (e.index == 1) {
			console.log("1891729841837982");
			console.log("1891729841837982");
			console.log("1891729841837982");
			mui.ajax('/cmpage/mob/save', {
				data: {
					modulename:"APPR",
					id:GetQueryString("id"),
					c_status:GetQueryString("c_status"),
					c_path:GetQueryString("c_path"),
					c_link:GetQueryString("c_link"),
					c_act:GetQueryString("c_act"),
					c_modulename:GetQueryString("c_modulename"),
					c_desc:descBox.value,
					c_memo:memoBox.value,
					c_link_type:GetQueryString("c_link_type")
				},
				type: "post",
				dataType: 'json',
				timeout: 5000,
				error: function (request) {
					mui.toast("服务器获取数据失败！");
				},
				success: function (data) {
					if (data.statusCode == 200) {
						console.log("111111111111111");
						console.log("111111111111111");
						mui.toast("审批完成");
						mui.back();
					} else {
						console.log("222222222222222");
						console.log("222222222222222");
						console.log("222222222222222");
						mui.toast("系统出错");
					}
				}
			});
		}
	}, this.innerHTML, ["确定", "取消"]);

}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}