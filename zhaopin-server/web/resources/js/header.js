﻿/**
 * 
 */
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


var _index = 0;
var _xindex = 0;
var _sindex = 0;
var times = 0; //翻转次数
var flag = 0;
var ID = 0;
var password1 = 0;
var password2 = 0;
var flag1 = 0;
var flag2 = 0;
var flag3 = 0;
var flag4 = 0;
var old_user='';
Vue.transition('roll', {
	type: 'animation',
	enterClass: 'rollIn',
	leaveClass: 'rollOut'
})

Vue.transition('rotate', {
	type: 'animation',
	enterClass: 'rotateIn',
	leaveClass: 'rotateOut'
})

Vue.transition('slideLeft', {
	type: 'animation',
	enterClass: 'slideInLeft',
	leaveClass: 'slideOutLeft'
})

Vue.transition('slideUp', {
	type: 'animation',
	enterClass: 'slideInUp',
	leaveClass: 'slideOutUp'
})


Vue.transition('flip', {
	type: 'animation',
	enterClass: 'flipInX',
	leaveClass: 'flipOutX'
})

Vue.transition('flipY', {
	type: 'animation',
	enterClass: 'flipInY',
	leaveClass: 'flipOutY'
})

Vue.transition('lightSpeed', {
	type: 'animation',
	enterClass: 'lightSpeedIn',
	leaveClass: 'lightSpeedOut'
})

Vue.transition('zoom', {
	type: 'animation',
	enterClass: 'zoomInDown',
	leaveClass: 'zoomOutDown'
})
$(function() { //checkSession
	$.ajax({
		type: "get",
		cache:false,
		url: "checkSession",
		success: function(data) {
			if (data) {
				$("header i.login").hide();
				$("header div.user").fadeIn(500);
				getInformation();
			}
		}
	})
	// $('div.fullpage').mCustomScrollbar({
	// 	theme:"minimal-dark"
	// });
	$('ul#shoppingcartlist').mCustomScrollbar({
		theme:"minimal-dark"
	});
	$('ul#hint').mCustomScrollbar({
		theme:"minimal-dark"
	})
	$('ul#searchRecommand').mCustomScrollbar({
		theme:"minimal-dark"
	})
	
})



function change(lable) {
	if ($(lable).find("i").attr("data-cookies") == "true") {
		$(lable).find("i").html("&#xe622;");
		$(lable).find("i").attr("data-cookies", "false");
	} else {
		$(lable).find("i").attr("data-cookies");
		$(lable).find("i").html("&#xe619;");
		$(lable).find("i").attr("data-cookies", "true");
	}
}

$("div.login .changeBox").click(function() {
	$("div.login").hide();
	$("div.register").fadeIn(500);
})

$("div.register .changeBox").click(function() {
	$("div.register").hide();
	$("div.login").fadeIn(500);
})

$(".register input.username").change(function() { //焦点从id框移除时，发送ajax请求判断id是否可用
	if ($(this).val().length < 6) {
		flag2 = 0;
		$(".register div.username #judge_false").fadeIn(500).animate({
			'right': '20px'
		}, 200)
		$(".register div.username #judge_true").fadeOut();
	} else {
		$.post("registerJudge", {
			id: $(".register input.username").val()
		}, function(d) {
			if (d == 1) {
				flag2 = 1;
				$(".register div.username #judge_true").fadeIn(500).animate({
					'right': '20px'
				}, 200)
				$(".register div.username #judge_false").fadeOut();
				//	alert(d);
			} else {
				flag2 = 0;
				$(".register div.username #judge_false").fadeIn(500).animate({
					'right': '20px'
				}, 200)
				$(".register div.username #judge_true").fadeOut();
			}
		})
	}
})

$(".register input.password1").change(function() { //判断密码是否符合要求
	password1 = $(this).val();
	password2 = $(".register input.password2").val();
	if (password1.length < 6) {
		flag3 = 0;
		$(".register input.password1").next().fadeOut();
		$(".register input.password1").nextAll("#judge_false").fadeIn(500).animate({
			'right': '20px'
		}, 200)
	} else if (password2.length < 6 && password1.length >= 6) {
		flag3 = 1;
		$(".register input.password1").next().fadeIn(500).animate({
			'right': '20px'
		}, 200)
		$(".register input.password1").nextAll("#judge_false").fadeOut();
	} else if (password2.length >= 6 && password1 == password2) {
		flag3 = 1;
		$(".register input.password1").next().fadeIn(500).animate({
			'right': '20px'
		}, 200)
		$(".register input.password1").nextAll("#judge_false").fadeOut();
		$(".register input.password2").next().fadeIn(500).animate({
			'right': '20px'
		}, 200)
		$(".register input.password2").nextAll("#judge_false").fadeOut();
	} else if (password2.length >= 6 && password1 != password2) {
		flag3 = 0;
		$(".register input.password2").next().fadeOut();
		$(".register input.password2").nextAll("#judge_false").fadeIn(500).animate({
			'right': '20px'
		}, 200)
	}
})
$(".register input.password2").change(function() { //判断密码2是否符合要求
	password2 = $(this).val();
	if (password1 != password2 || password2.length < 6) {
		flag3 = 0;
		$(".register input.password2").next().fadeOut();
		$(".register input.password2").nextAll("#judge_false").fadeIn(500).animate({
			'right': '20px'
		}, 200)
	} else {
		flag3 = 1;
		$(".register input.password2").next().fadeIn(500).animate({
			'right': '20px'
		}, 200)
		$(".register input.password2").nextAll("#judge_false").fadeOut();
	}
})

$(".login input.username").change(function() { //login的id框验证
	if ($(this).val().length < 6) {
		$(this).nextAll("#judge_false").fadeIn(500).animate({
			'right': '20px'
		}, 200)
		$(this).next().fadeOut();
	} else if ($(".login input.password").val().length < 6) {
		ID = $(this).val();
		$.post("loginJudge", {
			id: ID
		}, function(d) {
			if (d == 1) { //账号正确
				$(".login input.username").next().fadeIn(500).animate({
					'right': '20px'
				}, 200)
				$(".login input.username").nextAll("#judge_false").fadeOut();
			} else {
				$(".login input.username").nextAll("#judge_false").fadeIn(500).animate({
					'right': '20px'
				}, 200)
				$(".login input.username").next().fadeOut();
			}
		})
	} else {
		ID = $(this).val();
		$.post("loginJudge", {
			id: ID,
			password: $(".login input.password").val()
		}, function(d) {
			if (d == 1) { //账号密码对应正确
				flag1 = 1;
				_true();
			} else {
				flag1 = 0;
				_false();
			}
		})
	}
})
$(".login input.password").change(function() {
	if ($(this).val().length < 6) {
		flag1 = 0;
		$(this).nextAll("#judge_false").fadeIn(500).animate({
			'right': '20px'
		}, 200)
		$(this).next().fadeOut();
	} else if ($(".login input.username").val().length >= 6) {
		ID = $(".login input.username").val();
		$.post("loginJudge", {
			id: ID,
			password: $(this).val()
		}, function(d) {
			if (d == 1) { //账号密码对应正确
				flag1 = 1;
				_true();
			} else {
				flag1 = 0;
				_false();
			}
		})
	} else {
		return false;
	}
})

function _true() { //login页面的iconfont对飞出，错隐藏
	$(".login input.password").next().fadeIn(500).animate({
		'right': '20px'
	}, 200)
	$(".login input.password").nextAll("#judge_false").fadeOut();
	$(".login input.username").next().fadeIn(500).animate({
		'right': '20px'
	}, 200)
	$(".login input.username").nextAll("#judge_false").fadeOut();

}

function _false() { //login页面的iconfont错飞出，对隐藏
	$(".login input.password").nextAll("#judge_false").fadeIn(500).animate({
		'right': '20px'
	}, 200)
	$(".login input.password").next().fadeOut();
	$(".login input.username").nextAll("#judge_false").fadeIn(500).animate({
		'right': '20px'
	}, 200)
	$(".login input.username").next().fadeOut();
}

$(".register .btn").click(function() { //注册
	if (flag2 == 1 && flag3 == 1) {
		$.ajax({
			type: "post",
			url: "register",
			dataType: "json",
			data: {
				id: $(".register input.username").val(),
				password: $(".register input.password1").val(),
				data_cookies: $(".register i.choose").attr("data-cookies")
			},
			success: function(data) {
				if (data) {
					$("div.login-register").removeClass('flipInY').removeClass('showLogin');
					$("header i.login").hide();
					$("header div.user").fadeIn(500);
					getInformation();
				} else {
					alert("注册失败");
				}

			},
			error: function() {
				alert("注册失败");
			}
		})
	} else {
		return false;
	}
})
$(".login .btn").click(function() { //登录
	if (flag1 == 1) {
		$.ajax({
			type: "post",
			url: "login",
			dataType: "json",
			data: {
				id: $(".login input.username").val(),
				password: $(".login input.password").val(),
				data_cookies: $(".login i.choose").attr("data-cookies")
			},
			success: function(data) {
				if (data) {
					$("div.login-register").removeClass('flipInY').removeClass('showLogin');
					$("header i.login").hide();
					$("header div.user").fadeIn(500);
					getInformation();
				} else {
					alert("登录失败");
				}
			},
			error: function() {
				alert("登录失败");
			}
		})
	} else {
		return false;
	}
})

$("header i.login").click(function() {
	$("header div.login-register").toggleClass('showLogin flipInY');
	checkCookies(); //检查是否有cookies
})

//$("header div.login-register").slideToggle(300);
function checkCookies() {
	$.ajax({
		type: "get",
		cache:false,
		url: "checkCookies",
		success: function(data) {
			/*		for(var key in data){
						  alert(key);
						  alert(data[key].value);
						 }
					alert(data[0].value);*/ //json数据循环
			//	alert(data);  //Object
			if (!$.isEmptyObject(data)) {
				$(".login input.username").val(data["id"].value);
				$(".login input.password").val(data["password"].value);
				flag1 = 1;
				flag4 = 1;
			}
		}
	});
}

$("header div.user").click(function() {
	$("header ul.user").slideToggle(300);
	times++;
	$(this).find("i").css({
		'transform': 'rotate(' + times * 180 + 'deg)',
		'transition': '0.3s'
	})
})

function getHints(){
	$.ajax({
		url:'goods/getHints',
		cache:false,
		success:function(data){
			if(data!=null&&data.length!=hintapp.hints.length){
				hintapp.hints=data;
			}else if(data==null){
				clearInterval(interval);
			}
		}
	})
}


/**
 * 购物车组件
 */
function showcart(){
	if(shoppingcartlistapp.userid==""){
		alert("请先登录");
		$("header div.login-register").addClass('showLogin flipInY');
		checkCookies(); //检查是否有cookies
		return;
	}else{
		shoppingcartlistapp.showcart=!shoppingcartlistapp.showcart;
	}
}

var changeAmountInCart=function(goodsid,amount){
	$.ajax({
		url:'checkSession',
		type:'get',
		cache:false,
		success:function(data){
			if(data){
				$.ajax({
					url:'goods/changeAmountInCart',
					type:'post',
					data:{goodsid:goodsid,amount:amount},
					success:function(data){
						console.log(data);
					},
					error:function(data){
						console.log(data);
					}
				})
			}else{
				alert("您已离开,请重新登录");
				$("header div.login-register").addClass('showLogin flipInY');
				checkCookies(); //检查是否有cookies
			}
		}
	})
}
var shoppingcartlistapp=new Vue({
	el:'#shoppingcartlistapp',
	data:{
		cartlist:[],
		showcart:false,
		userid:''
	},
	methods:{
		changeAmount:function(index,item,vm){
			console.log(vm.$event.target.innerHTML);
			var newAmount=vm.$event.target.innerHTML;
			if(newAmount==""||newAmount=="0"){
				newAmount=0;
				this.cartlist.$remove(this.cartlist[index]);
			}else{
				newAmount=parseInt(newAmount);
				item.amount=newAmount;
			}
			changeAmountInCart(item.goodsid,newAmount);
		},
		deleteInCart:function(index,item,$event){
			changeAmountInCart(item.goodsid,0);
			this.cartlist.$remove(this.cartlist[index]);
		},
		refresh:function(){
			$.ajax({
				url:'checkSession',
				type:'get',
				cache:false,
				success:function(data){
					if(data){
						$.ajax({
							url:'goods/getCartList',
							type:'get',
							cache:false,
							success:function(data){
								if(data!=null){
									$('#shoppingcartlistapp span.refresh').addClass('rotateIn');
									setTimeout("$('#shoppingcartlistapp span.refresh').removeClass('rotateIn')",1000);
									shoppingcartlistapp.cartlist=data;
									getCart=false;
								}
							},
							error:function(data){
								console.log(data);
							}
						})
					}else{
						alert("您已离开,请重新登录");
						$("header div.login-register").addClass('showLogin flipInY');
						checkCookies(); //检查是否有cookies
					}
				}
			})
		},
		checkout:function(){
			if(confirm("您确定要完成购买吗?总需要花费"+this.totalCost+"元!")){
				$.ajax({
					url:'checkSession',
					type:'get',
					cache:false,
					success:function(data){
						if(data){
							$.ajax({
								url:'goods/checkOut',
								type:'post',
								traditional:true,
								contentType:'application/json;charset=UTF-8',//tm的浪费了我3小时,才找到解决的办法！！！
								data:JSON.stringify(shoppingcartlistapp.cartlist),
								success:function(data){
									if(data=="true"){//交易成功									
										shoppingcartlistapp.cartlist=[];
										if(commentsapp){
											$.ajax({
												url:'goods/getAllcommentIsFalseFromDeal',
												type:'post',
												data:{id:id},
												success:function(data){
													commentsapp.needComments=data;
												}
											})
										}
									}else if(data=="false"){//后台错误
										$.ajax({
											url:'goods/getCartList',
											type:'get',
											cache:false,
											success:function(data){
												if(data!=null){
													shoppingcartlistapp.cartlist=data;
												}
											},
											error:function(data){
												console.log(data);
											}
										})
										alert("后台错误,交易失败!");
									}else{
										$.ajax({
											url:'goods/getCartList',
											type:'get',
											cache:false,
											success:function(data){
												if(data!=null){
													shoppingcartlistapp.cartlist=data;
												}
											},
											error:function(data){
												console.log(data);
											}
										})
										alert("部分交易失败:"+data);
									}								
								},
								error:function(data){
									console.log(data);
								}
							})
						}else{
							alert("您已离开,请重新登录");
							$("header div.login-register").addClass('showLogin flipInY');
							checkCookies(); //检查是否有cookies
						}
					}
				})
			}
		}
	},
	computed:{
		totalCost:function(){
			var totalCost=0;
			for(var index in this.cartlist){
				totalCost+=this.cartlist[index].amount*this.cartlist[index].goods.price;
			}
			return totalCost;
		}
	},
	watch:{
		
	}
	
})


/*
 * 消息提示组件   通过Html5 Server-send Event实时更新  不支持的通过ajax轮训
 */
var source;//eventsource 登录时打开 注销时关闭

var interval;//用于不支持eventsource的浏览器

var socket='';

var hintapp=new Vue({
	el:'#hintapp',
	data:{
		showhint:false,//Server-send Event实时更新    见header.js
		hints:[],
		chatHints:[] //交流信息存储
	},
	computed:{
		userid:function(){
			return shoppingcartlistapp.userid;
		}
	},
	methods:{
		getit:function(){
			if(this.hints.length==0){
				return;
			}
			$.ajax({
				url:'checkSession',
				type:'get',
				cache:false,
				success:function(data){
					if(data){
						$.ajax({
							url:'goods/notifyAll',
							type:'post',
							data:{count:hintapp.hints.length},
							success:function(data){
								if(data){
									hintapp.hints=[];
								}
							},
							error:function(data){
								console.log(data);
							}
						})
					}else{
						alert("您已离开,请重新登录");
						$("header div.login-register").addClass('showLogin flipInY');
						checkCookies(); //检查是否有cookies
					}
				}
			})
		}
	}
})

Vue.component('modal', {
	  template: '#modal-template',
	  props: {
	    show: {
	      type: Boolean,
	      required: true,
	      twoWay: true    
	    }
	  },
	  methods:{
	  	closeChat:function(event){
			if($(event.target).hasClass('modal-wrapper')){
				chatapp.$data.showModal=false;
			}
		}
	  }
	})

Vue.directive('sdown', {
	bind:function(){
		setTimeout(function(){
			$('#chatlist')[0].scrollTop=$('#chatlist')[0].scrollHeight+40;
		},0)
	}
})

var chatapp=new Vue({
	el: '#chatapp',
	data: {
		showhint:false,
	  	showModal: false,
	  	receiverid:'',
	  	receiver:{name:'',portrait:''},//保存对方昵称和头像
	  	chatData:{},
	  	receiverConn:false,
	  	totalUnread:0,
	  	receiverColumn:[],
	  	userData:{}
	},
	computed:{
		userid:function(){
			return shoppingcartlistapp.userid;
		}
	},
	methods:{
		timecheck:function(item,index){
			if(index==0){
				return true;
			}else{
				var time1=item.time;
				var y1=parseInt(time1.substr(0,4));
				var M1=parseInt(time1.substr(5,2));
				var d1=parseInt(time1.substr(8,2));
				var h1=parseInt(time1.substr(11,2));
				var m1=parseInt(time1.substr(-2));
				var time2=this.chatData['uid'+this.receiverid][index-1].time;
				var y2=parseInt(time2.substr(0,4));
				var M2=parseInt(time2.substr(5,2));
				var d2=parseInt(time2.substr(8,2));
				var h2=parseInt(time2.substr(11,2));
				var m2=parseInt(time2.substr(-2));
				if((m1-m2)+(h1-h2)*60+(d1-d2)*60*24+(M1-M2)*60*24*30+(y1-y2)*60*24*30*12>10){
					return true;
				}else{
					return false;
				}
			}
		},
		showChat:function(item){
			this.receiverid=item.receiverid;
			this.showModal=true;
		},
		chat_send_judge:function(event){
			if(event.ctrlKey && event.keyCode == 13){//ctrl+enter 换行
				var reg=/(<br><br>)$/;
				if(reg.test($('.msg').html())){ //以<br><br>结尾加<br> 否则加<br><br>
					$('.msg').html($('.msg').html()+'<br>');
				}else{
					$('.msg').html($('.msg').html()+'<br><br>');
				}
				placeCaretAtEnd($('.msg').get(0));//移动光标
				return false;			
			}
			if((event.keyCode || event.which) == 13){  //enter发送 
 				event.preventDefault();
 				this.chat_send();
 				return false;
			}
		},
		chat_send:function(){
			var msg=$('.msg').html();
			if(msg==''){
				return;
			}else{
				//发送数据到服务器
				var time=(new Date()).Format("yyyy-MM-dd hh:mm");
				socket.emit('receiveFormClient',{
					senderid:'uid'+shoppingcartlistapp.userid,
					sendername:chatapp.userData.name,
					senderportrait:chatapp.userData.portrait,
					receiverid:'uid'+this.receiverid,
					msg:msg,
					time:time
				})
				
				//判断receiver是否在数组中 不在添加
				var k=0;
				if(this.receiverColumn.length==0){
					var that=this;
					$.ajax({ //获取对方昵称和头像
						url:'getNickNameAndPic',
						async:false,
						data:{id:this.receiverid},
						success:function(data){
							that.receiverColumn.push({
								receiverid:that.receiverid,
								receivername:data.name,
								receiverportrait:data.portrait,
								unreadCount:0
							})
						}
					})
					
				}else{
					for(var i=0;i<this.receiverColumn.length;i++){
						if(this.receiverColumn[i].receiverid!=this.receiverid){
							k++;
						}
					}
					if(k==this.receiverColumn.length){
						var that=this;
						$.ajax({ //获取对方昵称和头像
							url:'getNickNameAndPic',
							async:false,
							data:{id:this.receiverid},
							success:function(data){
								that.receiverColumn.push({
									receiverid:that.receiverid,
									receivername:data.name,
									receiverportrait:data.portrait,
									unreadCount:0
								})
							}
						})
					}
					k=0;
				}
			
				//数据写到chatData中
				if(!this.chatData.hasOwnProperty('uid'+this.receiverid)){
					Vue.set(chatapp.chatData, 'uid'+this.receiverid, []);
				//	this.chatData['uid'+this.receiverid]=[];
					this.chatData['uid'+this.receiverid].push({
						msg:msg,
						time:time,
						senderid:shoppingcartlistapp.userid,
						unread:false,
					});
				}else{
					this.chatData['uid'+this.receiverid].push({
						msg:msg,
						time:time,
						senderid:shoppingcartlistapp.userid,
						unread:false,
					});
				}
				//将数据存储到数据库中 
				$.ajax({
					url:'chat',
					type:'post',
					data:{
						senderid:shoppingcartlistapp.userid,
						sendername:chatapp.userData.name,
						senderportrait:chatapp.userData.portrait,
						receiverid:this.receiverid,
						msg:msg,
						time:time
					},
					success:function(data){
						//重置输入框
						$('.msg').html('');
					}
				})
				//判断对方是否在线
				socket.emit('receiverConnState',{senderid:'uid'+shoppingcartlistapp.userid,receiverid:'uid'+this.receiverid});
			}
		}
	},
	watch:{
		userid:function(newval,oldval){
			if(this.userid!=''){
				var that=this;
				//登录后获取未读信息
				$.ajax({
					url:'getAllUnread',
					type:'get',
					data:{id:this.userid},
					success:function(data){//data是对象数组
						for(var i=0;i<data.length;i++){
							if(!that.chatData.hasOwnProperty('uid'+data[i].senderid)){
								Vue.set(chatapp.chatData,'uid'+data[i].senderid,[]);
							//	that.chatData['uid'+data[i].senderid]=[];
								that.chatData['uid'+data[i].senderid].push({
									msg:data[i].msg,
									time:data[i].time,
									senderid:data[i].senderid,
									unread:data[i].unread
								});								
							}else{
								that.chatData['uid'+data[i].senderid].push({
									msg:data[i].msg,
									time:data[i].time,
									senderid:data[i].senderid,
									unread:data[i].unread
								});
							}							
							that.totalUnread++;
						}
						for(var item in that.chatData){
							for(var z=0;z<data.length;z++){
								if(data[z].senderid==item.slice(3)){
									that.receiverColumn.push({
										receiverid:item.slice(3),
										receivername:data[z].sendername,
										receiverportrait:data[z].senderportrait,
										unreadCount:0
									});
									break;	
								}
							}				
						}
						for(var _item in that.chatData){
							var _count=0
							for(var y=0;y<that.chatData[_item].length;y++){
								if(that.chatData[_item][y].unread){
									_count++;
								}
							}
							for(var x=0;x<that.receiverColumn.length;x++){
								if(that.receiverColumn[x].receiverid==_item.slice(3)){
									that.receiverColumn[x].unreadCount=_count;
									_count=0;
								}
							}
						}
					}
				})

				socket = io('http://172.30.67.162:8888');  //登录时创建websocket
				socket.emit('login',{uid:'uid'+this.userid});

				//谈话 先发送到服务器  服务器转给对方  这里是接收从服务器来的信息 
				socket.on('receiveFormServer',function(data){
					if(chatapp.receiverid==''){
						chatapp.$data.receiverid=data.senderid.slice(3);
					}				
					
					//判断receiver是否在数组中 不在添加
					var k=0;
					if(chatapp.receiverColumn.length==0){
						chatapp.receiverColumn.push({
							receiverid:chatapp.receiverid,
							receivername:data.sendername,
							receiverportrait:data.senderportrait,
							unreadCount:0
						})
					}else{
						for(var i=0;i<chatapp.receiverColumn.length;i++){
							if(chatapp.receiverColumn[i].receiverid!=data.senderid.slice(3)){
								k++;
								console.log(k);
							}
						}
						if(k==chatapp.receiverColumn.length){
							chatapp.receiverColumn.push({
								receiverid:data.senderid.slice(3),
								receivername:data.sendername,
								receiverportrait:data.senderportrait,
								unreadCount:0
							})
						}
						k=0;
					}

					if(chatapp.$data.chatData.hasOwnProperty(data.senderid)){
						chatapp.$data.chatData[data.senderid].push({
							msg:data.msg,
							time:data.time,
							senderid:data.senderid.slice(3),
							unread:true
						});						
					}else{
						Vue.set(chatapp.chatData, data.senderid, []);
					//	chatapp.$data.chatData[data.senderid]=[];
						chatapp.$data.chatData[data.senderid].push({
							msg:data.msg,
							time:data.time,
							senderid:data.senderid.slice(3),
							unread:true
						});
					}
					chatapp.totalUnread++;
					
					for(var x=0;x<chatapp.receiverColumn.length;x++){
						if(chatapp.receiverColumn[x].receiverid==data.senderid.slice(3)){
							chatapp.receiverColumn[x].unreadCount++;
							break;
						}
					}

					//判断是否有打开聊天窗口，如果有，全部设置为已读
					if(chatapp.showModal){
						for(var i=0;i<chatapp.chatData[data.senderid].length;i++){
							if(chatapp.chatData[data.senderid][i].unread){
								chatapp.chatData[data.senderid][i].unread=false;
								chatapp.totalUnread--;
							}
						}
						for(var x=0;x<chatapp.receiverColumn.length;x++){
							if(chatapp.receiverColumn[x].receiverid==data.senderid.slice(3)){
								chatapp.receiverColumn[x].unreadCount--;
								break;
							}
						}
						//发送ajax修改数据库
						setServerRead({senderid:data.senderid.slice(3),receiverid:data.receiverid.slice(3)});
					}

				})
				
				//判断对方是否在线 true false
				socket.on('receiverConnOrNot',function(data){
					console.log(data);
					chatapp.$data.receiverConn=data;
				})
			}
			if(this.userid==''){  //注销
				console.log('注销'+oldval);
				socket.emit('logout',{uid:'uid'+oldval});
				socket='';
			}
		},
		showModal:function(){
			if(this.showModal && this.chatData.hasOwnProperty('uid'+this.receiverid)){
				var j=0;
				for(var i=0;i<this.chatData['uid'+this.receiverid].length;i++){
					if(this.chatData['uid'+this.receiverid][i].unread){
						this.chatData['uid'+this.receiverid][i].unread=false;
						j++;
					}
				}
				if(j!=0){
					this.totalUnread-=j;
					for(var x=0;x<chatapp.receiverColumn.length;x++){
						if(chatapp.receiverColumn[x].receiverid==this.receiverid){
							chatapp.receiverColumn[x].unreadCount-=j;
						}
					}
					setServerRead({senderid:this.receiverid,receiverid:shoppingcartlistapp.userid});
				}				
			}
			if(this.showModal){
				this.showhint=false;
			}
		},
		receiverid:function(){
			if(this.receiverid!=''){
				var that=this;
				$.ajax({ //获取对方昵称和头像
					url:'getNickNameAndPic',
					async:false,
					data:{id:this.receiverid},
					success:function(data){
						that.receiver.name=data.name;
						that.receiver.portrait=data.portrait;
					}
				})

				socket.emit('receiverConnState',{senderid:'uid'+shoppingcartlistapp.userid,receiverid:'uid'+this.receiverid});
			}
		}
	}
})

var setServerRead=function(data){
	setTimeout(function(){
		$.ajax({
			url:'setRead',
			type:'post',
			data:data,
			success:function(data){
				console.log(data);
			}
		})
	},20)
}


var placeCaretAtEnd=function(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}
