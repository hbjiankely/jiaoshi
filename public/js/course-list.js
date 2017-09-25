define(['jquery','template','util'], function ($,template,util) {
    //������ʾ
    util.setMenu(location.pathname);

    //��ȡ��������
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