define(['jquery','template','util','uploadify'], function ($,template,util) {
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
            var html=template('pictureTpl',data.result);
            $("#pictureInfo").html(html);
            //上传封面图片
            $('#myfile').uploadify({
                width:80,
                height:'auto',
                buttonText:'选择文件',
                itemTemplate:'<span></span>',
                buttonClass:'btn btn-success btn-sm',
                swf:'/public/assets/uploadify/uploadify.swf',
                uploader:'/api/uploader/cover',
                fileObjName:'cs_cover_original',
                formData:{cs_id:csId},
                onUploadSuccess: function (a,b,c) {
                    var obj=JSON.parse(b.trim());
                    $(".preview img").attr('src',obj.result.path);
                }
            })
        }
    })
})