define(['jquery','template','util'], function ($,template,util) {
    //�˵�����������ʾ
    util.setMenu('/course/courseadd');
    //��ȡID
    var csId=util.qs('cs_id');
    //�������󣬻�ȡ����
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