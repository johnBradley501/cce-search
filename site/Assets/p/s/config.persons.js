var formPath = "div#bs form";
function updateForm() {
    $(formPath).attr('action', 'banner.jsp');
    $(formPath).attr('target', '');
    $(formPath).submit();
}

function runQuery() {
    $(formPath).attr('target', 'leftFrame');
    $(formPath).attr('action', 'DisplayPersonList.jsp');
    $(formPath).submit();
}

function highlightLetter(letter) {
    $('div#bs ul.an a.s3').removeClass("s3");
    $('a[href=\"DisplayPersonList.jsp?init=' + letter + '\"]').addClass('s3');
}
$(document).ready(function() {
    $("div#bs ul.an a").click(function() {
        highlightLetter($(this).html());
        $(formPath + " input#init").val($(this).html());
        runQuery();
        return false;
    });
    $('#startYear,#endYear,#dioceseKey').change(function() {
        updateForm();
    });
});