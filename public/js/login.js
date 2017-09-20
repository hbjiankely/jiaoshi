define(['jquery','cookie'], function ($) {
    $("#loginBtn").click(function(){
        $.ajax({
            type:'post',
            url:'/api/login',
            dateType:'json',
            data:$("#loginForm").serialize(),
            success:function(data){
                console.log(data);
                if(data.code==200){
                    //�����ݼ�¼������������ҳ��Ҳ���Թ���
                    $.cookie('data',JSON.stringify(data.result),{path:'/'});
                    //��ת����ҳ��
                    location.href='/main/index'
                }
            }
        })
        //��ֹa��ǩ��Ĭ����ת
        return false;
    });
})