define(['jquery','template','util','bootstrap','form'], function ($,template,util) {
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
            
            //获取添加课时按钮添加点击事件
            $("#lessonAdd").click(function () {
                //显示模态框
                var html=template('modalTpl',{operate:'添加课时'});
                $("#modalInfo").html(html);
                $("#chapterModal").modal();
                //添加表单提交
                $('#addOrEditLesson').click(function () {
                    $("#lessonEdit").ajaxSubmit({
                        type:'post',
                        url:'/api/course/chapter/add',
                        data:{ct_cs_id:csId},
                        dataType:'json',
                        success: function (data) {
                            if(data.code==200){
                                location.reload();
                            }
                        }
                    })
                })
            })

            //编辑课时
            $(".editBtn").click(function () {
                var ctId=$(this).attr('data-ctId');
                $.ajax({
                    type:'get',
                    url:'/api/course/chapter/edit',
                    data:{ct_id:ctId},
                    dataType:'json',
                    success: function (data) {
                        //解析数据渲染模态框
                        data.result.operate='编辑课时'
                        var html=template('modalTpl',data.result);
                        $("#modalInfo").html(html);
                        //显示模态框
                        $("#chapterModal").modal();
                        //编辑表单提交
                        $('#addOrEditLesson').click(function () {
                            $("#lessonEdit").ajaxSubmit({
                                type:'post',
                                url:'/api/course/chapter/modify',
                                data:{ct_cs_id:csId,ct_id:ctId},
                                dataType:'json',
                                success: function (data) {
                                    if(data.code==200){
                                        location.reload();
                                    }
                                }
                            })
                        })
                    }
                })

            })
        }
    })
})