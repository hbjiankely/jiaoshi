define(['jquery'], function ($) {
    $(document).ajaxStart(function () {
      //��ʾ���ֲ�
        $(".overlay").show();
    })

    $(document).ajaxStop(function () {
        //�������ֲ�
        setTimeout(function () {
            $(".overlay").hide();
        },500);
    })
})