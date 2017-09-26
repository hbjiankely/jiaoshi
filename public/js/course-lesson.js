define(['jquery','template','util'], function ($,template,util) {
    //导航菜单高亮
    util.setMenu('/course/courseadd');
    //获取ID
    var csId=util.qs('cs_id');
    //发送请求，获取数据
    $.ajax({
        type:'get',
        url:'/api/course/lesson',
        data:{cs_id:csId},
        dataType:'json',
        success: function (data) {
            var html=template('lessonTpl',data.result);
            $("#lessonInfo").html(html);
        }
    })
})