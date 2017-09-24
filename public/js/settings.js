define(['jquery','template','uploadify','region'], function ($,template) {
    //调用接口上传资料
    $.ajax({

        type:'get',
        url:'/api/teacher/profile',
        dataType:'json',
        success: function (data) {
            var html=template('settingTpl',data.result);
            $('#settingsInfo').html(html);

            //处理头像上传
            //处理bug,因为谷歌浏览器59版本，flash被禁用，需要更改设置
            $("#upfile").uploadify({
                width:'120',
                height:"120",
                buttonText:'',
                itemTemplate:'<span></span>',
                swf:'/public/assets/uploadify/uploadify.swf',
                uploader:'/api/uploader/avatar',
                fileObjName:'tc_avatar',
                onUploadSuccess: function (a,b) {
                    var obj=JSON.parse(b);
                    $(".preview img").attr('src',obj.result.path);
                }
            });

            //处理省市县三级联动
            $("#pcd").region({
                url:'/public/assets/jquery-region/region.json'
            });
        }
    })
});