define(['jquery','template','bootstrap'], function ($,template) {
    $.ajax({
        type:'get',
        url:'/api/teacher',
        dataType:'json',
        success: function (data) {
            var html=template('teacherTpl',{list:data.result});
            $('#teacherInfo').html(html);

            //启用注销功能
            $('.eod').click(function () {
                var that=this;
                var td=$(this).closest('td');
                var tcId=td.attr('data-tcId');
                var status=td.attr('data-tcStatus');
                $.ajax({
                    type:'post',
                    url:'/api/teacher/handle',
                    dataType:'json',
                    data:{
                        tc_id:tcId,
                        tc_status:status
                    },
                    success: function (data) {
                        if(data.code==200){
                            td.attr('data-tcStatus',data.result.tc_status);
                            if(data.result.tc_status==0){
                                $(that).text('注销');
                            }else{
                                $(that).text('启用');

                            }
                        }
                    }
                })
            });

            //实现查看讲师功能
            $(".preview").click(function () {
                var td=$(this).closest('td');
                var tcId=td.attr('data-tcId');
                $.ajax({
                    type:'get',
                    url:'/api/teacher/view',
                    data:{tc_id:tcId},
                    dateType:'json',
                    success: function (data) {
                        console.log(data);
                        var html=template('teacherPre',data.result);
                        $('#modalTpl').html(html);
                        $('#teacherModal').modal();
                    }
                })
            });
        }
    })


});