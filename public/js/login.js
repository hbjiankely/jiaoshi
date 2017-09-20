define(['jquery','cookie'], function ($) {
    $("#loginBtn").click(function(){
        $.ajax({
            type:'post',
            url:'/api/login',
            dateType:'json',
            data:$("#loginForm").serialize(),
            success:function(data){
                console.log(data);
                if(data.code==200){
                    //把数据记录起来，让其他页面也可以共享
                    $.cookie('data',JSON.stringify(data.result),{path:'/'});
                    //跳转到主页面
                    location.href='/main/index'
                }
            }
        })
        //阻止a标签的默认跳转
        return false;
    });
})