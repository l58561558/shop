var http_url = window.location.protocol+"//"+window.location.host;
var ajaxUrl = http_url +"/api";
var userinfo;
if ($.cookie('userinfo') == null || $.cookie('userinfo') == '' || $.cookie('userinfo') == 'null') {
	if (window.location.href.indexOf('LoginIndex') < 0 && window.location.href.indexOf('Applyagent') < 0 && window.location
		.href.indexOf('Findpwd') < 0) {
		location.href = "LoginIndex.html"
	}

} else {
	userinfo = JSON.parse($.cookie('userinfo'));
}

function comdify(n) {
	var re = /\d{1,3}(?=(\d{3})+$)/g;
	if (n != null && n != undefined) {
		var n1 = n.toString().replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
			return s1.replace(re, "$&,") + s2;
		});
		return n1;
	}
	return 0;
}

function GetSlideDirection(startX, startY, endX, endY) {
	var dy = startY - endY;
	//var dx = endX - startX;  
	var result = 0;
	if (dy > 0) { //向上滑动
		result = 1;
	} else { //向下滑动
		result = 2;
	}

	return result;
}

function timestampToTime(timestamp) {
	var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	Y = date.getFullYear() + '-';
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	D = date.getDate() + ' ';
	h = date.getHours() + ':';
	m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
	s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
	return Y + M + D + h + m + s;
}

function timestampToTime2(timestamp) {
	var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	Y = date.getFullYear() + '-';
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	D = date.getDate() + ' ';
	h = date.getHours() + ':';
	m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
	s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
	return Y + M + D;
}
//获取url参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
var accMul = function(a, b) {
	var c = 0,
		d = a.toString(),
		e = b.toString();
	try {
		c += d.split(".")[1].length;
	} catch (f) {}
	try {
		c += e.split(".")[1].length;
	} catch (f) {}
	return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);

};

function add(a, b) {
	var c, d, e;
	try {
		c = a.toString().split(".")[1].length;
	} catch (f) {
		c = 0;
	}
	try {
		d = b.toString().split(".")[1].length;
	} catch (f) {
		d = 0;
	}
	return e = Math.pow(10, Math.max(c, d)), (accMul(a, e) + accMul(b, e)) / e;
}

// 转为unicode 编码  
function encodeUnicode(str) {
	var res = [];
	for (var i = 0; i < str.length; i++) {
		res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
	}
	return "\\u" + res.join("\\u");
}

// 解码  
function decodeUnicode(str) {
	str = str.replace(/\\/g, "%");
	//转换中文
	str = unescape(str);
	//将其他受影响的转换回原来
	str = str.replace(/%/g, "\\");
	//对网址的链接进行处理
	str = str.replace(/\\/g, "");
	return str;
}

function sendCode(tel) {
	let formdata = new FormData();
	formdata.append("mobile", tel);
	$.ajax({
		type: "post",
		url: ajaxUrl + '/sms/send',
		data: formdata,
		cache: false,
		processData: false,
		contentType: false,
		dataType: "json",
		success: function(res) {
			if (res.code == 1) {
				dialog.toast(res.msg, 'none', 1000);
			} else {
				dialog.toast(res.msg, 'none', 1000);
			}
		},
		error: function(err) {
			dialog.toast('验证码发送失败，服务异常！', 'none', 1000);
		}
	})
}

function getmessNumCount() {
	let token = userinfo.token;
	let user_id = userinfo.user_id;
	let formdata = new FormData();
	formdata.append("token", token);
	formdata.append("user_id", user_id)
	$.ajax({
		type: "post",
		url: ajaxUrl + '/message/message_num',
		data: formdata,
		cache: false,
		processData: false,
		contentType: false,
		dataType: "json",
		success: function(res) {
			if (res.code == 1) {
				if (res.data.total_num > 0) {
					$("#badge_message").show();
					$("#badge_message").text(res.data.total_num);
				} else {
					$("#badge_message").hide();
				}
			} else {
				dialog.toast(res.msg, 'none', 1000);
			}
		},
		error: function(err) {
			dialog.toast('获取未读消息总数失败，服务异常！', 'none', 1000);
		}
	})
}

function isWechat(url) {
	var ua = window.navigator.userAgent.toLowerCase();
	console.log(ua);
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        location.href = 'NoWechat.html?url=' + url;
    }
	// if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !> 0) {
	// 	location.href = 'NoWechat.html?url=' + url;
	// }
}

function initTimeSelect(el) {
	this.id = el
	//得到当前时间
	var date_now = new Date();
	//得到当前年份
	var year = date_now.getFullYear();
	//得到当前月份
	//注：
	//  1：js中获取Date中的month时，会比当前月份少一个月，所以这里需要先加一
	//  2: 判断当前月份是否小于10，如果小于，那么就在月份的前面加一个 '0' ， 如果大于，就显示当前月份
	var month = date_now.getMonth() + 1 < 10 ? "0" + (date_now.getMonth() + 1) : (date_now.getMonth() + 1);
	//得到当前日子（多少号）
	var date = date_now.getDate() < 10 ? "0" + date_now.getDate() : date_now.getDate();

	new Mdate(this.id, {
		beginYear: year - 5,
		beginMonth: "1",
		beginDay: "1",
		format: "-"
	})

	$("#" + el).attr({
		"data-year": year,
		"data-month": month,
		"data-day": date
	})
}


$(function() {
	var white_list = ['115.205.172.51','218.74.52.140'];
	$.getScript("http://pv.sohu.com/cityjson", function() {
		var cip = returnCitySN["cip"];
		if(white_list.indexOf(cip) < 0){
			isWechat(window.location.href);
		}
	});
	// isWechat(window.location.href);
	if (window.location.href.indexOf('Applyagent') < 0) {
		getmessNumCount();
	}
})
