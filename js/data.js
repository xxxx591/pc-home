function getCaseList(pages=1,pagesize=12)//首页案例
{
    $.ajax(
    {
      type : "post",
      url : "api/data.php",
      data : {action:'getTopCase',pages:pages,pagesize:pagesize},
      error : function(XMLHttpRequest, textStatus, errorThrown){},
      success : function(result)
      {
        result=result.data;
        var t1 = "",t2 = "",t3 = "",link = "",id = "",pic="",linkurl="";
        var row = "",caselist="";
        for(var j =0;j < result.length; j++)
        {
          id = result[j]['id'];
          t1 = result[j]['title1'];
          t2 = result[j]['title2'];
          t3 = result[j]['title3'];
          linkurl = result[j]['linkurl'];
          if(linkurl=="")
          {
            linkurl="newsdetails.html?id="+id;
          }
          pic = "upload/admin/images/cases/"+result[j]['pic'];
      
              //case页面
              caselist+="<div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-6\">"
                      +"<div class=\"item-s\">"
                        +"<a href=\""+linkurl+"\" target=\"_blank\">"
                          +"<div class=\"s-1\">"
                            +"<p>"+t1+"</p>"
                            +"<p>"+t2+"</p>"
                            +"<p style=\"font-size: 14px;font-weight: normal;\">"+t3+"</p>"
                          +"</div>"
                          +"<div class=\"s-2\">"
                            +"<img src=\""+pic+"\" />"
                          +"</div>"
                        +"</a>"
                      +"</div>"
                    +"</div>";

        }
        $("#caselist_case").html(caselist);//case页面
      },
      complete : function(XMLHttpRequest, textStatus){}
    });
  }
$(document).ready(function()
{
	/******************************************************************
	函数说明：获取地址栏参数字
	函数名称：getQueryString
	传入参数：name
	输出参数：
	返回值  ：name
	**********************************************************************/
	function getQueryString(name)
	{
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return "";
	}

	function HTMLDecode(text) {
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
	}
	getBanner();
	function getBanner()//首页焦点图
	{
		$.ajax(
		{
			type : "post",
			url : "api/data.php",
			data : {action:'getBanner'},
			error : function(XMLHttpRequest, textStatus, errorThrown){},
			success : function(result)
			{
				result=result.data;
				var swiper_wrapper = "";
				var pic = "";
				for(var j =0;j < result.length; j++)
				{
					pic = "upload/admin/images/banner/"+result[j]['pic'];
					swiper_wrapper+="<div class=\"swiper-slide\">"+
							        "	<img src=\""+pic+"\" alt=\"111\" srcset=\"\">"+
							        "</div>";
				}
				$(".swiper-wrapper").append(swiper_wrapper);
				$(".swiper-wrapper").append(swiper_wrapper);

			},
			complete : function(XMLHttpRequest, textStatus){}
		});
	}
	getCaseInfo();
	function getCaseInfo()
	{
		var id = getQueryString("id");
		// console.log(id);
		if(id==""){return;}
		$.ajax(
		{
			type : "post",
			url : "api/data.php",
			data : {action:'getCaseInfo',id:id},
			error : function(XMLHttpRequest, textStatus, errorThrown){},
			success : function(result)
			{
				result=result.data;
				$("#news_details").append(HTMLDecode(result["info"]));

			},
			complete : function(XMLHttpRequest, textStatus){}
		});
	}
//getTopCase();
	function getTopCase(pages=1,pagesize=12,type="index")//首页案例
	{
		// alert(11);
		$.ajax(
		{
			type : "post",
			url : "api/data.php",
			data : {action:'getTopCase',pages:pages,pagesize:pagesize},
			error : function(XMLHttpRequest, textStatus, errorThrown){},
			success : function(result)
			{
				result=result.data;
				var t1 = "",t2 = "",t3 = "",link = "",id = "",pic="",linkurl="";
				var row = "",caselist="";
				for(var j =0;j < result.length; j++)
				{
					id = result[j]['id'];
					t1 = result[j]['title1'];
					t2 = result[j]['title2'];
					t3 = result[j]['title3'];
					linkurl = result[j]['linkurl'];
					if(linkurl=="")
					{
						linkurl="newsdetails.html?id="+id;
					}
					pic = "upload/admin/images/cases/"+result[j]['pic'];
					row+="<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4\">"
					          +"<a href=\""+linkurl+"\" target=\"_blank\">"
					            +"<div class=\"item-s\">"
					              +"<div class=\"s-1\">"
					                +"<p>"+t1+"</p>"
					                +"<p>"+t2+"</p>"
					                +"<p style=\"font-size: 14px;font-weight: normal;\">"+t3+"</p>"
					              +"</div>"
					              +"<div class=\"s-2\">"
					                +"<img src=\""+pic+"\" />"
					              +"</div>"
					            +"</div>"
					          +"</a>"
					        +"</div>";

								


					        //case页面
					        caselist+="<div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-6\">"
								          +"<div class=\"item-s\">"
								            +"<a href=\""+linkurl+"\" target=\"_blank\">"
								              +"<div class=\"s-1\">"
								                +"<p>"+t1+"</p>"
								                +"<p>"+t2+"</p>"
								                +"<p style=\"font-size: 14px;font-weight: normal;\">"+t3+"</p>"
								              +"</div>"
								              +"<div class=\"s-2\">"
								                +"<img src=\""+pic+"\" />"
								              +"</div>"
								            +"</a>"
								          +"</div>"
								        +"</div>";

				}
				if(type=="index")
				{
					$("#caselist").html(row);
				}
				else
				{
					$("#caselist_case").html(caselist);//case页面
				}
				
			},
			complete : function(XMLHttpRequest, textStatus){}
		});
	}
	getCaseCount();
	function getCaseCount()
	{
		var pages=1,pagesize=6;

		$.ajax(
		{
			type : "post",
			url : "api/data.php",
			data : {action:'getCaseCount'},
			error : function(XMLHttpRequest, textStatus, errorThrown){},
			success : function(result)
			{
				var count=result.data;
				var TotalPage = Math.ceil(count/pagesize);
				for(i=1;i<=TotalPage;i++){
					if(i==1)
					{
						getCaseList(pages,pagesize);
					}
					// $("#pages").append('<li><a href="javascript:void(0)" οnclick="getCaseList('+i+','+pagesize+')">'+i+'</a></li>');
				 $("#pages").append('<li><a href="javascript:getCaseList('+i+','+pagesize+')">'+i+'</a></li>');
				}
				//生成分页
				getTopCase(1,12);//首页
			},
			complete : function(XMLHttpRequest, textStatus){}
		});
	}

	  // $(document).on('click', '.pages>li', function() {
   //        console.log('keso');
   //    });
	

	getAbout();
	function getAbout()//首页关于我们
	{
		$.ajax(
		{
			type : "post",
			url : "api/data.php",
			data : {action:'getAbout'},
			error : function(XMLHttpRequest, textStatus, errorThrown){},
			success : function(result)
			{
				result=result.data;
				var id="",titlecontent="";
				for(var j =0;j < result.length; j++)
				{
					id = result[j]['id'];
				 	titlecontent = result[j]['titlecontent'];
					if(id==1)
					{
						$("#aboutus").html(HTMLDecode(titlecontent));
					}
					else if(id==2)
					{
						$("#yywh").html(HTMLDecode(titlecontent));
					}
					else if(id==3)
					{	
						$("#mtbd").html(HTMLDecode(titlecontent));
					}
					else if(id==4)
					{	
						$("#callus").html(HTMLDecode(titlecontent));
					}
					else if(id==5)
					{	
						$("#hzhb").html(HTMLDecode(titlecontent));
					}
					

					

				}
				
				
			},
			complete : function(XMLHttpRequest, textStatus){}
		});
	}

	function checkphone(tel) {
        //定义判断电话号码的正则表达式
        var strTemp = /^1[3|4|5|6|7|8|9][0-9]{9}$/;

        if (strTemp.test(tel)) {
            return true;
        }
        return false;
    }
	//savemsg
	   $("#savemsg").click(function(){			  	   			 
	  	   var username = $("#username").val();
	  	   var job = $("#job").val();
	  	   var tel = $("#tel").val();
	  	   var slogan = $("#slogan").val();
	  	   var info = $("#info").val();
	  	   if(username==""||job==""||slogan==""||info==""||tel=="")
	  	   {
	  	   	alert('请输入详细信息');
	  	   	return;
	  	   }
    if (checkphone(tel) == false) {
        	alert('请输入正确的手机号码。');
	  	   	return;
    }
	$.post("api/data.php",{action:'savemsg',username:username,job:job,tel:tel,slogan:slogan,info:info},function(result){
    alert(result.msg);
  });
			// $.ajax(
			// {
			// 	type : "post",
			// 	url : "api/data.php",
			// 	data : {action:'savemsg2',username:username,job:job,tel:tel,slogan:slogan,info:info},
			// 	error : function(XMLHttpRequest, textStatus, errorThrown){},
			// 	success : function(result)
			// 	{
			// 		if(result=="-1"){alert("你没有操作权限!");}
			// 		jump = whatpage - 1;
			// 		GetListCount();
			// 	},
			// 	complete : function(XMLHttpRequest, textStatus){}
			// });
	  // 	   $.ajax(
			// {
			// 	type : "post",
			// 	url : "api/data.php",
			// 	data : {action:'savemsg',username:username,job:job,tel:tel,slogan:slogan,info:info},
			// 	error : function(XMLHttpRequest, textStatus, errorThrown){},
			// 	success : function(result)
			// 	{
			// 		alert('提交成功');
					
			// 	},
			// 	complete : function(XMLHttpRequest, textStatus){}
			// });
	 });	
});