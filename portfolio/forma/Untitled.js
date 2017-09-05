

$(document).ready(function () {
    
    $('.phone-input').keypress(function (e) {
       
       if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
          
          $("#errmsg").html("Tik skaičiai!").show().fadeOut("slow");
                 return false;
      }
    });
});