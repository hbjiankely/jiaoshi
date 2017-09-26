define(['jquery','template','util'], function ($,template,util) {
    //�����˵�����
    util.setMenu('/course/courseadd');
    //��ȡID
    var csId=util.qs('cs_id');
    //�������󣬻�ȡ����
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