define(['jquery','template','util'], function ($,template,util) {
    //设置导航菜单高亮显示
    util.setMenu('/course/courseadd');
    //获取cs_id
    var csId=util.qs('cs_id');
    //获取flag
    var flag=util.qs('flag');
    //发送请求，获取数据
    $.ajax({
        type:'get',
        url:'/api/course/basic',
        data:{cs_id:csId},
        dataType:'json',
        success: function (data) {
            if(flag){
                data.result.operate='课程编辑';
            }else{
                data.result.operate='课程添加';
            }
            var html=template('basicTpl',data.result);
            $("#basicInfo").html(html);
        }
    })
})