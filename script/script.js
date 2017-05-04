//   ---- headerio spalvu animacija ----

$('#m, .m').hover(function () {
    $('.m').animate({ 'color': 'white' }, 200);
    },
    function () {
        $('.m').animate({ 'color': 'rgba(255, 255, 255, 0.3)' }, 200 );
    }
);

$('#a, .a').hover(function () {
    $('.a').animate({ 'color': 'white' }, 200);
    },
    function () {
        $('.a').animate({ 'color': 'rgba(255, 255, 255, 0.3)' }, 200 );
    }
);

$('#r, .r').hover(function () {
    $('.r').animate({ 'color': 'white' }, 200);
    },
    function () {
        $('.r').animate({ 'color': 'rgba(255, 255, 255, 0.3)' }, 200 );
    }
);

$('#t, .t').hover(function () {
    $('.t').animate({ 'color': 'white' }, 200);
    },
    function () {
        $('.t').animate({ 'color': 'rgba(255, 255, 255, 0.3)' }, 200 );
    }
);

$('#y, .y').hover(function () {
    $('.y').animate({ 'color': 'white' }, 200);
    },
    function () {
        $('.y').animate({ 'color': 'rgba(255, 255, 255, 0.3)' }, 200 );
    }
);

$('#n,.n').hover(function () {
    $('.n').animate({ 'color': 'white' }, 200);
    },
    function () {
        $('.n').animate({ 'color': 'rgba(255, 255, 255, 0.3)' }, 200 );
    }
);

$('#aa, .aa').hover(function () {
    $('.aa').animate({ 'color': 'white' }, 200);
    },
    function () {
        $('.aa').animate({ 'color': 'rgba(255, 255, 255, 0.3)' }, 200 );
    }
);

$('#s, .s').hover(function () {
    $('.s').animate({ 'color': 'white' }, 200);
    },
    function () {
        $('.s').animate({ 'color': 'rgba(255, 255, 255, 0.3)' }, 200 );
    }
);

// ----- Modalo iskvietimas----

$("#modal-image").click(function () {
    $('#exampleModal').modal('show'); 
  });

// ------  smooth scroll -----

var $root = $('html, body');
$('a').click(function() {
    $root.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 700);
});

//-----------------

$(document).ready(function(){
     $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('#back-to-top').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        
        $('#back-to-top').tooltip('show');

});