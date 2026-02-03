/* The following functions are used to provide reusable access to JSON data stored in the data folder.
   For them to work, the appropriate file has to be laoded (via a <script tag elsewhere. */
function getThePersons(){
	if(window.persons == undefined){
		window.persons = getPersons();
	}
	return window.persons;
}

function getThePersonsOrder(){
	if(window.personsorder == undefined){
		window.personsorder = getPersonsOrder();
	}
	return window.personsorder;
}

function getLocationLists(){
	if(window.locationlist == undefined){
		window.locationlist = getLocationData();
	}
	return window.locationlist;
	
}

function getLocationPersonsData(){
	if(window.locationpersons == undefined){
		window.locationpersons = getLocationPersons();
	}
	return window.locationpersons;
}

/* Converts a person Key into a URL for that person's page.  All the code here uses this function to convert
 * a person key into a URL.  Change it here to indicate where person pages are. 
*/
function makePersonURL(pid){
	return `https://theclergydatabase.org.uk/jsp/persons/DisplayPerson.jsp?PersonID=${pid}`;
}


/* See use of this function in processIdDisplay. It takes the person ID (as a string), 
   checks to ensure that it is valid, and if it is, loads the display page in the displayFrame page
   which is the bottom right area in the frameset. Note use of getThePersons to check that a person
   with the given ID key actually xists.*/
function displayPerson(pid){
	if(!pid){
		window.alert("A ID for a persons in CCEd must be specified.");
		return false;
	}
	const pid2 = pid.trim();
	const intRegex = /^[0-9]+$/
	if(!intRegex.test(pid2)){
		window.alert("An ID for a person must consists of digits only.");
		return false;
	}
	const pdata = getThePersons()[pid2];
	if(!pdata){
		window.alert("No CCEd person has the ID '"+pid2+"'");
		return false;
	}
	turl = makePersonURL(pid2);
	target = window.open(turl, "displayFrame");
	// target.getLocation().replace(turl);
	return false;
}

/* used as an onclick function to fetch a person display for a ID specified in a form.
   * Parameter "personID" is the ID for a form element that contains the requested ID */
function processIdDisplay(personID){
	theInput = document.getElementById(personID);
	displayPerson(theInput.value);
	theInput.value = ""; // after the person has been fetched, clear the form
	return false;
}

/* ======================= Functions to support basic query form dynamic drop-downs ===================>

/* the next two functions support the dynamic generation of select options for the basic search form:
   for the year end, and for the locations associated with a diocese. In both cases they also clear the
   option list if the primrary "driving" select option is set to "-". */

/* generates the drop-down end year list when the form user chooses a start year.  This function is used 
   as the "onselect" function for the start year drop-down.
   * parameter eid is the ID for the end year form select element
   * parameter val is the value the user selected for the start year (as a string).*/
   function defineEndYearSelection(eid, val){
	ele = document.getElementById(eid);
	if(!val){
		ele.innerHTML = '<option value="">-</option>';
		return;
	}
	valInt = parseInt(val);
	options = "";
	for(let i = valInt+20; i<=1860; i=i+20){
		options = options+`<option value="${i}">${i}</option>`
	}
	ele.innerHTML = options;
}

/* generates the drop-down list of locations for the specified diocese (specified by its DB Key/id) when the form user chooses a dioceser.  This function is used 
   as the "onselect" function for the diocese drop-down.
   * parameter eid is the ID for the location form select element
   * parameter val is the id/DB Key the user selected for the diocese (as a string).*/
function defineLocationSelection(eid, val){
	ele = document.getElementById(eid);
	if(!val){
		ele.innerHTML = '<option value="">-</option>';
		return;
	}
	locList = getLocationLists()[val];
	if(!locList){
		ele.innerHTML = '<option value="">-</option>';
		return;
	}
	options = '<option value="0">(all locations)</option>';
	for(const litem of locList){
		options = options+`<option value="${litem[0]}">${litem[1]}</option>\n`
	}
	ele.innerHTML = options;	
}


/* ======================= Functions to support query processing for top form (display.html) =================== */

/* checks data from the form when the user pushes submit, and, if OK,  packages it as JSON which will be sent for processing
via the query part of a URL
* parameter fid: HTML id for the basic query form */
function handleSearchQuery(fid){
	theForm = document.getElementById(fid);
	formRslts = {};
	const formData = new FormData(theForm);
	if(formData.get("PersonID")){
		displayPerson(formData.get("PersonID"));
		return;
	}
	const fieldList = ["surname", "forename", "dioceseKey", "locationKey", "startYear", "endYear"];
	let critGiven = false;
	for(const fieldName of fieldList){
		theVal = formData.get("basic_"+fieldName);
		if(theVal)critGiven = true;
		formRslts[fieldName] = theVal;
	}
	if(!critGiven){
		window.alert("Some selection criteria need to be given in this form.");
		return;
	}
	theURL = "search.html?"+encodeURIComponent(JSON.stringify(formRslts));
	target = window.open(theURL, "leftFrame")
	return false;
}

/* used as onclick function for form reset.  */
function ResetBasicForm(fid){
	theForm = document.getElementById(fid);
	document.getElementById("basic_surname").value = "";
	document.getElementById("basic_forename").value = "";
	document.getElementById("basic_dioceseKey").value = "";
	document.getElementById("basic_locationKey").innerHTML='<option value="">-</option>';
	document.getElementById("basic_startYear").value = "";
	document.getElementById("basic_endYear").innerHTML='<option value="">-</option>';
	document.getElementById("PersonID").value = "";
}


/* ======================= Functions to support query processing within the left bottom frame (searchy.html) =================== */

/* When the user pushes "submit" in the top frame, the form data is checked and assembled there and then sent to the
   bottom-left frame for processing.  The remaining functions here handle that processing. */


/* used to display a message in the the bottom-left frame */
function displayMessage(content){
	ele = document.getElementById("rslt");
	ele.className="ct";
	ele.innerHTML = '<p>'+content+"</p>";
}

function mysql2re (theStr){
	theStr = theStr.trim();
	if(!theStr) return null;
	preChar = "^"
	postChar = "$"
	if(theStr.startsWith("%")){
		preChar = "";
		theStr = theStr.replace(/$\%+/, "");
	}
	if(theStr.endsWith("%")){
		postChar = "";
		theStr = theStr.replace(/\%$/, "");
	}
	theStr = theStr.replaceAll(/\%/g, ".*");
	theStr = theStr.replaceAll(/\_/g, ".");
	return new RegExp(preChar+theStr+postChar, "i");
}

/* given an item representing a person, this function checkes that the item meets the
   parts of the search query involving the person's name and date range.
   * parameter itm: an array from the JSON Person's data in persons.js 
   * parameters theSurname, theForename: names data from the query form (already converted to lowercase
   * parameters startYear, endyear: year range from the query form */
function testItem(itm, theSurname, theForename, startYear, endYear){
	// if(theSurname && (!itm[0].toLowerCase().startsWith(theSurname))) return false;
    // if(theForename && (!itm[1].toLowerCase().startsWith(theForname))) return false;
	if(theSurname && (!theSurname.test(itm[0]))) return false;
	if(theForename && (!theForename.test(itm[1]))) return false;
	if(startYear && endYear){
		if(endYear < itm[2])return false;
		if(itm[3] < startYear)return false;
	}
	return true;
}

/* using the constraints given in the parms and the JSON data derived from the database, this function actually
   locates the persons that match the criteria.  It returns the list (Javascript Array) of IDs/keys for persons
   that match the criteria.
   * parameter parms: a Javascript Object containing the criteria the user has provided in the query form, as
   processed in function handleSearchQuery(fid), defined above. */
function doSearch(parms){
	displayMessage("working...");
	persons = getThePersons();
	porder = getThePersonsOrder();
	theSurname = null;
	if(parms["surname"])theSurname = mysql2re(parms["surname"]);
	theForename = null;
	if(parms["forename"])theForename = mysql2re(parms["forename"]);
	startYear = 0;
	if(parms["startYear"])startYear = parseInt(parms["startYear"]);
	endYear = 0;
	if(parms["endYear"])endYear = parseInt(parms["endYear"]);
	
	/* each item in the list of person keys is tested below in the for loop. If there is no
	   location criteria, all persons are tested (the list "porder" in the full list of person keys
	   drawn from function getThePersonORder().  If there is a location criteria, then only the persons
	   who meet the critera (drawn from lists provided by getLocationPersonData() need be considered.*/
	   
	if(parms["dioceseKey"]){
		dkey = parms["dioceseKey"];
		lkey = parms["locationKey"];
		lpdata = getLocationPersonsData();
		porder = lpdata[dkey][lkey];
		if(!(theSurname || theForename || startYear > 0 || endYear > 0))return porder;
	}
	rsltList = [];
	for(const pkey of porder){
		if(testItem(persons[pkey], theSurname, theForename, startYear, endYear)){
			rsltList.push(pkey);
		}
	}
	return rsltList;
}

/* transforms the specified person data into a fragment of HTML which will be displayed as part of the results.
   * parameter pkey: the key/ID for the person
   * parameter pitm: an array containing the person's name and dates (from data held in persons.js */
function displayItem(pkey, pitm){
	[sn, fn, d1, d2] = pitm;
	return `<a target="displayFrame" href="${makePersonURL(pkey)}">${sn}, ${fn}</a> (${d1} - ${d2})`;
}

/* creates and inserts the HTML that displays the result of the search.
   * parameter rslts: a list (Javascript Array) of keys of persons who meet the criteria for the search. */
function displaySearch(rslts){
	if(!rslts) return;
	cnt = document.getElementById("cnt");
	cnt.innerHTML = `<h2>(${rslts.length} records retrieved)</h2>`;
	if(rslts.length == 0){
		displayMessage("Your selection critera did not match any person in the CCEd database.")
		return;
	}
	persons = getThePersons();
	rsltStr = "";
	for(const itm of rslts){
		rsltStr = rsltStr + "<li>"+displayItem(itm, persons[itm])+"</li>\n";
	}
	ele = document.getElementById("rslt");
	ele.className="lc lc1";
	ele.style.display = "block";
	ele.innerHTML = "<ul>\n"+rsltStr+"\n</ul>";
}

//Following function extracts search tips from XML file and adds an icon next to
//search criteria (each form elements) to provide additional help
// copied from config.t0.js which is no longer invoked.    JB

function AddTips() {
    $.get("search_tips.xml", function(data) {
        $("tip", data).each(function() {
            var labelID = $(this).attr("id");
            //alert("ID = " + labelID);
            var tipText = $(this).attr("text");
            //alert("Tip text = " + tipText);
            //Now add the tip to the form if the tip is not empty
            if (tipText != "") {
                var tipHtml = "<b class=\"g5\" title=\"|" + tipText + "\"></b>";
                $("label#" + labelID).append(tipHtml);
            }
        });
        $(".g5").cluetip({hoverIntent: true,
            cursor: 'pointer',
            width: 220,
            dropShadow: false,
            showTitle: false,
            activation: 'click',
            closePosition: 'top',
            sticky: true,
            splitTitle: '|'});
    })
}

 document.addEventListener(
      'DOMContentLoaded', () => {
      	AddTips();
        });
