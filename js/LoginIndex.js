var address = "/User/login";

function onlogin() {
		$.ajax({
				type: "post",
				url: ajaxUrl + address,
				data: {
					account: $("#user").val(),
					password: $("#pwd").val()
				},
				dataType: "json",
				success: function(data) {
					var res= JSON.parse(data);
					if(res.code==0){
						
					}else{
						
					}
				},
				error:function(err){
					console.log(456)
				}


		})



}