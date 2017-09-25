define(['jquery','template','util'], function ($,template,util) {
    //菜单导航高亮显示
    util.setMenu('/course/courseadd');
    //获取ID
    var csId=util.qs('cs_id');
    //发送请求，获取数据
    $.ajax({
        type:'get',
        url:'/api/course/picture',
        data:{cs_id:csId},
        dataType:'json',
        success: function (data) {
            console.log(data);
        }
    })
})