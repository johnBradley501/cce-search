$(document).ready(function(){
	var div = jQuery('<div></div>').addClass('g1');div.prependTo('#t3 .ut form');
    $("#t3 .ut form label").overlabel({label_class: 's1', wrapper_class: 's2', hide_css:{"text-indent":"-10000px"}});
	var validator = $("#search").validate({
		errorElement: "label",
		errorClass: "s2",
		errorContainer: $("#t3 .ut .g1"),
		errorLabelContainer: $("#t3 .ut .g1"),
		rules: {'locKey': "required", 'PersonID': "required"},
		messages: {'locKey': "You must enter a Location ID",'PersonID': "You must enter a Person ID"}
	});

    $.tablesorter.defaults.widgets = ['zebra'];
    $(".hm table.s1").tablesorter();

});
