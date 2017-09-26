define(['jquery','template','util','uploadify','jcrop','form'], function ($,template,util) {
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
            //获取图片
            var img=$(".preview img").eq(0);
            var nowCrop=null;

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
                    //上传成功之后直接选中选区
                    cropImage();
                    $("cropBtn").text('保存图片').attr('data-flag',true);
                }
            })

            //处理封面裁切功能
            $("#cropBtn").click(function () {
                var flag=$(this).attr("data-flag");
                if(flag){
                    //跳转到下一个步骤（页面）
                    $("#inputForm").ajaxSubmit({
                        type:'post',
                        url:'/api/course/update/picture',
                        data:{cs_id:csId},
                        dataType:'json',
                        success: function (data) {
                            if(data.code==200){
                                location.href='/course/lesson?cs_id='+data.result.cs_id;
                            }
                        }
                    })
                }else{
                    //第一次点击之后
                    $(this).text('保存图片').attr("data-flag",true);
                    //实现裁切功能
                    cropImage();
                }
            });

            //封装一个方法实现图片裁切功能
            function cropImage(){
                img.Jcrop({
                    aspectRadio:2
                }, function () {
                    //销毁之前的裁切实例
                    nowCrop&&nowCrop.destroy();
                    nowCrop=this;
                    //获取图片的高度宽度
                    var width=this.ui.stage.width;
                    var height=this.ui.stage.height;
                    //计算选取的参数
                    var x=0;
                    var y=(height-width/2)/2;
                    var w=width;
                    var h=width/2;
                    //初始化选取参数
                    var inputs=$("#inputForm").find('input');
                    inputs.eq(0).val(x);
                    inputs.eq(1).val(y);
                    inputs.eq(2).val(w);
                    inputs.eq(3).val(h);
                    //动态创建一个选取
                    this.newSelection();
                    this.setSelect([x,y,w,h]);
                    //初始化缩略预览图
                    this.initComponent('Thumbnailer',{
                        width:240,
                        height:120,
                        mythumb:'.thumb'
                    });
                    $('.jcrop-thumb').css({
                        position:'absolute',
                        top:0,
                        left:0
                    })
                    //监控选区变化事件
                    img.parent().on('cropstart cropmove cropend', function (a,b,c) {
                        var inputs=$("#inputForm").find('input');
                        inputs.eq(0).val(c.x);
                        inputs.eq(1).val(c.y);
                        inputs.eq(2).val(c.w);
                        inputs.eq(3).val(c.h);
                    })
                })
            }
        }
    })
})