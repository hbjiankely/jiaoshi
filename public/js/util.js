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
                       //÷’÷π—≠ª∑
                       return false;
                   }
               });
           }
           return result;
       }
   }
});