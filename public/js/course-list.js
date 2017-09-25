define(['jquery','template','util'], function ($,template,util) {
    //高亮显示
    util.setMenu(location.pathname);

    //获取所有数据
    $.ajax({
        type:'get',
        url:'/api/course',
        dataType:'json',
        success: function (data) {
            var html=template('courseTpl',{list:data.result});
            $("#courseInfo").html(html);
        }

    })
});