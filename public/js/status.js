define(['jquery'], function ($) {
    $(document).ajaxStart(function () {
      //отй╬узуж╡Ц
        $(".overlay").show();
    })

    $(document).ajaxStop(function () {
        //рЧ╡ьузуж╡Ц
        setTimeout(function () {
            $(".overlay").hide();
        },500);
    })
})