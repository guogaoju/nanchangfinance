var file = {};
var parmsUrl = {};

var nameTB = document.getElementById("name");
var memoTB = document.getElementById("memo");
var pic_id = "";
mui.init();

mui.plusReady(function () {

	parmsUrl = plus.webview.currentWebview().parmsUrl;
	console.log(JSON.stringify(parmsUrl));

//	if (mui.os.android) {
//		document.getElementById("fileDIV").style.display = "block";
//	}

	//关闭等待框
	plus.nativeUI.closeWaiting();
	//显示当前页面
	mui.currentWebview.show();
});

// 上传文件
function upload() {
	if (pic_id=="") {
		app.toast("没有添加上传文件！");
		return;
	}
	var wt = plus.nativeUI.showWaiting();
	var no = "";
	if(parmsUrl.c_no){
		no = parmsUrl.c_no;
	}
					//保存相关信息到后端数据库 t_file
	mui.ajax(app.getDomain() + '/cmpage/page/save', {
		data: {
			modulename: 'SCFFileList',
			c_uid:parmsUrl.c_uid,
			c_no:no,
			c_link: parmsUrl.c_link || 0,
			c_link_type: parmsUrl.c_link_type || 'none',
			c_status: parmsUrl.c_status || 0,
			c_type: parmsUrl.c_type || 0,
			c_path: pic_id,
			c_name: nameTB.value,
			c_memo: memoTB.value
		},
		type: "post",
		dataType: 'json',
		timeout: 5000,
		error: function (request) {
			app.toast("服务器通信错误！");
		},
		success: function (data) {
			if (data.statusCode == 200) {
				app.toast("数据保存成功！");
				mui.fire(plus.webview.currentWebview().opener(), "file_list_refresh", {});
				mui.back()
			} else {
				app.toast("数据保存失败，请稍后重试！");
			}
			wt.close();
		}
	});
}

// 拍照添加文件
function appendByCamera() {
	plus.camera.getCamera().captureImage(function(e){
        console.log(e);
        plus.io.resolveLocalFileSystemURL(e, function(entry) { 
        var path = entry.toLocalURL(); 
        document.getElementById("img").src = path;
        uploadHeadImg(path);
        }, function(e) { 
            mui.toast("读取拍照文件错误：" + e.message); 
        }); 
    }); 
}

// 从相册添加文件
function appendByGallery() {
	plus.gallery.pick(function(path){
    		document.getElementById("img").src = path;
		uploadHeadImg(path);
	});
}
//
//function appendFile(path) {
//	var strs = path.split("/");
//	var dst = plus.io.convertLocalFileSystemURL("_doc/upload/" + strs[strs.length - 1]);
//	if (dst.slice(0, 7) != "file://") {
//		dst = "file://" + dst;
//	}
//	plus.zip.compressImage({
//			src: path,
//			dst: dst,
//			overwrite: true,
//			quality: 20,
//			width: "50%"
//		},
//		function () {
//			var img = document.getElementById("img");
//			img.style.backgroundImage = "url(" + dst + ")";
//			file.name = "file";
//			file.path = dst;
//			img.style.display = "block";
//			nameTB.style.display = "block";
//			memoTB.style.display = "block";
//			empty.style.display = "none";
//		},
//		function (error) {
//			console.log("Compress error!");
//			console.log(error);
//		});
//}

//function fileSystem() {
//	mui.openWindow("cmpage-filepicker.html", "cmpage-filepicker.html");
//}

function uploadHeadImg(imgPath){ //选中图片之后，头像当前的照片变为选择的照片 
    var mainImg=document.getElementById('img'); 
    mainImg.src=imgPath; 
    var images=new Image(); 
    images.src=imgPath;
    plus.nativeUI.showWaiting();
    images.onload = function(){
        var imgData=getBase64Image(images); 
        
        mui.ajax(app.getDomain() + "/cmpage/page/uploadMobile",{ 
            data:{ 
                'file':imgData,
                'c_link_type': parmsUrl.c_link_type
            }, 
            dataType:'json',//服务器返回json格式数据 
            type:'post',//HTTP请求类型 
            timeout:10000,//超时时间设置为10秒； 
            success:function(data){ 
                console.log(data);
                console.log(JSON.stringify(data));
                if(data.status=='200'){ 
                    pic_id = data.filename;
                    mui.alert('上传成功,请填写文件名称和说明后点击保存！'); 
                }
                plus.nativeUI.closeWaiting();
            }, 
            error:function(xhr,type,errorThrown){ 
                if(type=='timeout'){ 
                    mui.alert('服务器连接超时，请稍后再试'); 
                }
                plus.nativeUI.closeWaiting();
            } 
        }); 
    }
    
}


function getBase64Image(img){ 
    var canvas=document.createElement("canvas"); 
    var width=img.width; 
    var height=img.height; 
    if(width>height){ 
        if(width>750){ 
            height=Math.round(height*=750/width); 
            width=750; 
        } 
    }else{ 
        if(height>750){ 
            width=Math.round(width*=750/height); 
        } 
        height=750; 
    } 
    canvas.width=width; 
    canvas.height=height; 
    var ctx=canvas.getContext('2d'); 
    ctx.drawImage(img,0,0,width,height); 
    var dataUrl=canvas.toDataURL('image/jpeg',0.5); 
    return dataUrl.replace('data:image/jpeg:base64,',''); 
}
