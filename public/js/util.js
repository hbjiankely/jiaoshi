define(['jquery'], function ($) {
   return {
       qs: function (key) {
           var local=location.search.substr(1);
           var result=null;
           if(local){
               var kv=local.split('&');
               $.each(kv, function (index,item) {
                  var kvw=item.split('=');
                   if(key==kvw[0]){
                       result=kvw[1];
                       //终止循环
                       return false;
                   }
               });
           }
           return result;
       },
       setMenu:function (path) {
           //出了个bug,a:[href==''],不能加冒号
           $(".aside .navs a[href='"+path+"']").addClass('active').closest('ul').show();
       }
   }
});