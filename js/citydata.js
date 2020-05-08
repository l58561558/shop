! function() {
	var citys = [];
	$.ajax({
						type: "get",
						url: ajaxUrl + "/address/get_area_list",
						data: {
							token: token
						},
						dataType: "json",
						success: function(res) {
							if(res.code==1){
								 initcity(res.data)
							}else{
								dialog.toast(res.msg, 'none', 1000);
							}
						},
						error:function(err){
							dialog.toast("获取地址失败，服务异常", 'none', 1000);
						}
				})
		}
	function initcity(data){
		for(let i=0;i<data.length;i++){
			let c1={n:'',c:''};
			let arr1=[];
			c1.n=data[i].name;
			for(let j=0;j<data[i].child.length;j++){
				let c2={a:'',n:''};
				let arr2=[];
				c2.n=data[i].child[j].name;
				for(let k=0;k<data[i].child[j].child.length;k++){
					arr2.push(data[i].child[j].child[k].name);
				}
				c2.a=arr2;
				arr1.push(c2);
			}
			c1.c=arr1;
			city.push(c1);
		}
	}
	if (typeof define === "function") {
		define(citys)
	} else {
		window.YDUI_CITYS = citys
	}
}();
