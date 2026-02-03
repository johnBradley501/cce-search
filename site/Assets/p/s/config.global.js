$(document).ready(function() {

    $('A[rel="popup"]').click( function() {
        window.open( $(this).attr('href'),this,'width=840,height=350,scrollbars=yes' );
        return false;
    });

    $('html').addClass('j');
    $('#t1 .g1').hide('slow');
    $('#t1 .lc').fadeIn('slow');
    $('#t2 .ut a').click(function() {
        $(this).toggleClass("s1");
        top.subFrame.toggleFrame('leftFrame');
    });
    var showText = "show details";
    var hideText = "hide details";
    var showAllText = "Show all records";
    var hideAllText = "Hide all records";
    var showStateClass = "s1";
    var hideStateClass = "s2";
    $(".lc li ul").parent('li').prepend('<a href="#" class="g2 ' + showStateClass + '" title="Click to ' + showText + '">' + showText + '</a>');
    $('.lc li ul').hide();
    $('.lc li a.g2').click(function() {
        if ($(this).text() == showText) {
            $(this).removeClass("s1");
            $(this).addClass("s2");
            $(this).attr({title: "Click to " + hideText});
            $(this).text(hideText);
        }
        else {
            $(this).attr({title: "Click to " + showText});
            $(this).text(showText);
            $(this).removeClass("s2");
            $(this).addClass("s1");
        }
        $(this).parent().children('ul').toggle('fast');
        return false;
    });


    $(".hm p").prev('h3').prepend('<a href="#" class="g2 ' + showStateClass + '" title="Click to ' + showText + '">' + showText + '</a>');
    $('.hm p').hide();
    $(".hm ul.s2").prev('h3').prepend('<a href="#" class="g2 ' + hideStateClass + '" title="Click to ' + hideText + '">' + hideText + '</a>');
    $(".hm ul.s1").prev('h3').prepend('<a href="#" class="g2 ' + showStateClass + '" title="Click to ' + showText + '">' + showText + '</a>');
    $('.hm ul.s1').hide();
    $(".hm .tb.s2").prev('h3').prepend('<a href="#" class="g2 ' + hideStateClass + '" title="Click to ' + hideText + '">' + hideText + '</a>');
    $(".hm .tb.s1").prev('h3').prepend('<a href="#" class="g2 ' + showStateClass + '" title="Click to ' + showText + '">' + showText + '</a>');
    $('.hm .tb.s1').hide();
    $('.hm a.g2').click(function() {
        var hmcontext = $(this).parent().next().get(0);
        if ($(this).text() == showText) {
            $(this).removeClass("s1");
            $(this).addClass("s2");
            $(this).attr({title: "Click to " + hideText});
            $(this).text(hideText);
        }
        else {
            $(this).attr({title: "Click to " + showText});
            $(this).text(showText);
            $(this).removeClass("s2");
            $(this).addClass("s1");
        }
        if (hmcontext = 'HTMLParagraphElement') {
            $(this).parent().next('p').toggle('fast');
        }
        if (hmcontext = 'HTMLDivElement') {
            $(this).parent().next('div').toggle('fast');
        }
        if (hmcontext = 'HTMLLIElement') {
            $(this).parent().next('ul').toggle('fast');
        }
        return false;
    });

//    $(".hm:first").prepend('<a href="#" class="g3 ' + showStateClass + '" title="' + showAllText + '">' + showAllText + '</a>');
    $(".ut2 li.i1").after('<li><a href="#" class="g3 ' + showStateClass + '" title="' + showAllText + '">' + showAllText + '</a></li>');
//    $('.ct a.g3').click(function() {
    $('.ut2 li a.g3').click(function() {    
        if ($(this).text() == showAllText) {
           $(this).removeClass("s1");
           $(this).addClass("s2");
           $(this).attr({title: hideAllText});
           $(this).text(hideAllText);
           $('.hm a.g2').text(hideText);
           $('.hm a.g2').removeClass("s1");
           $('.hm a.g2').addClass("s2");
           $('.hm a.g2').attr({title: "Click to " + hideText});
           $('.hm p').show();
           $('.hm .tb.s1').show();
           $('.hm .tb.s1').addClass("s2");
           $('.hm .tb.s1').removeClass("s1");
           $('.hm ul.s1').show();
           $('.hm ul.s1').addClass("s2");
           $('.hm ul.s1').removeClass("s1");
        }
        else {
           $(this).removeClass("s2");
           $(this).addClass("s1");
           $(this).attr({title: showAllText});
           $(this).text(showAllText);
           $('.hm a.g2').text(showText);
           $('.hm a.g2').removeClass("s2");
           $('.hm a.g2').addClass("s1");
           $('.hm a.g2').attr({title: "Click to " + showText});
           $('.hm p').hide();
           $('.hm .tb.s2').hide();
           $('.hm .tb.s2').addClass("s1");
           $('.hm .tb.s2').removeClass("s2");
           $('.hm ul.s2').hide();
           $('.hm ul.s2').addClass("s1");
           $('.hm ul.s2').removeClass("s2");
        }
        return false;
    });

});




