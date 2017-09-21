define(['jquery','template','cookie'], function ($,template) {

    /*NProgress.start();

    NProgress.done();*/

    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });


    //点击退出
    $("#logoutBtn").click(function () {
        $.ajax({
            type:'post',
            url:'/api/logout',
            dateType:'json',
            success: function (data) {
                //如果sessionid没有了就跳转到登录页
                if(data.code){
                    //跳转到登录页
                    location.href='/main/login';
                }
            }
        })
    });

    //判断PHPSESSID有没有值,没有值就跳转到登录页
    var flag=$.cookie('PHPSESSID');
    /*
    * 如果没有location.pathname!='/main/login'，登录页面会不停的刷新，原因是flag一直没有值
    * */
    if(!flag&&location.pathname!='/main/login'){
        location.href='/main/login';
    }

    //获取cookie,变更头像用户
    /*
    * 这里写的时候出现了一个bug，data是undefind,解决方式是，先把整段代码注释掉，登录一次后再解开
    * 因为cookie是会话存储，只要浏览器不关闭或者不清除cache(缓存),就不会报错
    * */
     var data=$.cookie('data');
     data=data&&JSON.parse(data);
     /*$('.aside .profile .avatar img').attr('src',data.tc_avatar);
     $('.aside .profile h4').html(data.tc_name);*/
    var tpl='<div class="avatar img-circle"> <img src="{{tc_avatar}}"> </div> <h4>{{tc_name}}</h4>';
    var html=template.render(tpl,data);
    $(".aside .profile").html(html);
})