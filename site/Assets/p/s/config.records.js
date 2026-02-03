$(document).ready(function(){
    $(".ut2 ul li.i2 a").click(function() {
        var theHref = $(this).attr('href');
        window.opener.parent.location.href = theHref;
        window.close();
        return false;
    });
    $(".ut2 ul li.ix a").click(function() {
        window.close();
        return false;
    });
    $(".cg table td a.s1").click(function() {
        var theHref = $(this).attr('href');
        window.opener.parent.location.href = theHref;
        window.close();
        return false;
    });

    var showText = "show details";
    var hideText = "hide details";
    var showStateClass = "s1";
    var hideStateClass = "s2";
    $(".hm .cg.s2").prev('h3').prepend('<a href="#" class="g2 ' + hideStateClass + '" title="Click to ' + hideText + '">' + hideText + '</a>');
    $(".hm .cg.s1").prev('h3').prepend('<a href="#" class="g2 ' + showStateClass + '" title="Click to ' + showText + '">' + showText + '</a>');
    $('.hm .cg.s1').hide();
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
        if (hmcontext = 'HTMLDivElement') {
            $(this).parent().next('div').toggle('fast');
        }
        return false;
    });

});


