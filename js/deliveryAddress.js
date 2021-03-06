var JAddress = "";
var userInfo = JSON.parse(localStorage.getItem('User')),
	fromPage = QueryString('from');;
function putToJAddress(val){
	JAddress = val;
}

function initPage(){
	
	$('.goule-address-submit').on('tap',function(){
		var name = $('#name').val(),
			phone = $('#phone').val(),
			address = $('#address').val();
			
		if(!userInfo){
			hint.show('用户信息获取失败，无法添加地址');
			return;
		}
		
		if(name == ""){
			hint.show('请输入收货人姓名');
			return;
		}
		if(!(/^1[3465789]\d{9}$/.test(phone))){ 
	    		hint.show("手机号码有误，请重填");
	    		return;
	   	} 
	   	if(JAddress == ""){
	   		hint.show("请选择所在区域");
	   		return;
	   	}
	   	if(address == ""){
	   		hint.show("请输入详细收获地址");
	   		return;
	   	}
	   	$.ajax({
	   		type:"POST",
	   		url:config.SERVER+"/createNewAddress",
	   		data:{
	   			userid:userInfo.id,
	   			detail:JAddress + ' ' + address,
	   			receptor:name,
	   			phone:phone,
	   			openid:userInfo.openid
	   		},
	   		async:true,
	   		success:function(data){
	   			if(data.code == 1){
	   				window.location.href = fromPage+'.html';
	   			}
	   			else{
	 				hint.show(data.msg);
	   			}
	   		},
	   		error:function(err){
	   			
	   		}
	   	});
	})
}

$(function(){
	initPage();
})
