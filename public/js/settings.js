define(['jquery','template','ckeditor','uploadify','region','datepicker','language','validate','form'], function ($,template,CKEDITOR) {
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

            //处理富文本
            CKEDITOR.replace('editor',{
                toolbarGroups : [
                    { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                    { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] }
                ]
            });
            //处理表单提交
            $("#settingsForm").validate({
                sendForm:false,
                valid: function () {
                    //获取家乡信息
                    var p=$("#p").find('option:selected').text();
                    var c=$("#c").find('option:selected').text();
                    var d=$("#d").find('option:selected').text();
                    var hometown=p+'|'+c+'|'+d;
                    //同步富文本
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    //提交表单内容
                    $(this).ajaxSubmit({
                        type:'post',
                        url:'/api/teacher/modify',
                        data:{tc_hometown:hometown},
                        dataType:'json',
                        success: function (data) {
                            if(data.code==200){
                                location.reload();
                            }
                        }
                    })
                }
            })
        }
    })
});