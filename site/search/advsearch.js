async function getTheArchdList(){
	if(window.archdList == undefined){
		let {getArchDecData} = await import("./data/archDData.js");
		window.archdList = getArchDecData();
	}
	return window.archdList;
}

async function getTheArchdPersons(){
	if(window.archdPer == undefined){
		let {getArchdPersons} = await import("./data/archDPers.js");
		window.archdPer = getArchdPersons();
	}
	return window.archdPer;
}

async function getTheRegList(){
	if(window.regList == undefined){
		let {getRegData} = await import("./data/regData.js");
		window.regList = getRegData();
	}
	return window.regList;
}

async function getTheRegionPersons(){
	if(window.regPer == undefined){
		let {getRegionPersons} = await import("./data/regPers.js");
		window.regPer = getRegionPersons();
	}
	return window.regPer;
}

async function getTheCountyPersons(){
	if(window.countyPer == undefined){
		let {getCountyPersons} = await import("./data/countyPers.js");
		window.countyPer = getCountyPersons();
	}
	return window.countyPer;
}

async function getTheDioceseOrdinaries(){
	if(window.diocOrd == undefined){
		let {getDioceseOrdinaries} = await import("./data/DiocOrds.js");
		window.diocOrd = getDioceseOrdinaries();
	}
	return window.diocOrd;
}

const BIRTH_TYPE = 2;
const SUBSCRIPTION_TYPE = 7;
const APPOINTMENT_TYPE = 3;
const ORDINATION_TYPE = 4;
const DEATH_TYPE = 5;

async function getEventData(forType){
	if(window["eventsPer"+forType] == undefined){
		let {getAppointmentPersonData,getBirthPersonData,getDeathPersonData,getOrdinationPersonData,getSubscriptionPersonData} = await import("./data/eventsPersons.js");
		window["eventsPer"+BIRTH_TYPE] = getBirthPersonData();
		window["eventsPer"+SUBSCRIPTION_TYPE] = getSubscriptionPersonData();
		window["eventsPer"+APPOINTMENT_TYPE] = getAppointmentPersonData();
		window["eventsPer"+ORDINATION_TYPE] = getOrdinationPersonData();
		window["eventsPer"+DEATH_TYPE] = getDeathPersonData();
	}
	return window["eventsPer"+forType];

}

function getTheOfficeList(){
	if(window.offlist == undefined){
		window.offlist = getOfficeList();
	}
	return window.offlist;
}

function getTheClericalStatuses(){
	if(window.clerstat == undefined){
		window.clerstat = getClericalStatuses();
	}
	return window.clerstat;
}

function getThePatronageTypeList(){
	if(window.pattype == undefined){
		window.pattype = getPatronageTypeList();
	}
	return window.pattype;
}

async function getTheOrdinationEventData(){
	if(window.ordEvent == undefined){
		let {getOrdinationEventData} = await import("./data/ordEventData.js");
		window.ordEvent = getOrdinationEventData();
	}
	return window.ordEvent;	
}

async function getTheAppointmentEventData(){
	if(window.appEvent == undefined){
		let {getAppointmentEventData} = await import("./data/appEventData.js");
		window.appEvent = getAppointmentEventData();
	}
	return window.appEvent;	
}

/* ======================= Functions to support advanced query form dynamic elements ===================>



function setDisabled(ele, val){
	if(val)ele.setAttribute("disabled", "disabled");
	else ele.removeAttribute("disabled");
}

function buildDropDown(eid, val, dlist, dname){
	ele = document.getElementById(eid);
	if(!val){
		ele.innerHTML = '<option value="">-</option>';
		setDisabled(ele, true);
		return;
	}
	itmList = dlist[val];
	if(!itmList){
		ele.innerHTML = '<option value="">-</option>';
		setDisabled(ele, true);
		return;
	}
	if(dname)options = `<option value="0">(all ${dname})</option>`;
	else options = '<option value="">-</option>';
	for(const itm of itmList){
		options = options+`<option value="${itm[0]}">${itm[1]}</option>\n`
	}
	ele.innerHTML = options;
	setDisabled(ele, false);
	
}

async function defineArchdeaconSelection(eid, val){
	const archdList = await getTheArchdList();
	buildDropDown(eid, val, archdList, "archdeaconries");
}

async function defineRegionSelection(eid, val){
	const regList = await getTheRegList();
	buildDropDown(eid, val, regList, "regions");
}

function handleJurisGeogDioceseDisabling(){
	jurisSelect = document.getElementById("stage1_jurisDioceseKey");
	geogSelect = document.getElementById("stage1_geogDioceseKey")
	regionSelect = document.getElementById("stage1_cceRegionKey")
	if(jurisSelect.value){
		setDisabled(geogSelect, true)
		geogSelect.value = ""
		if(regionSelect.value){
			regionSelect.innerHTML = '<option value="">-</option>';
			setDisabled(regionSelect, true);
		}
	} else {
		setDisabled(geogSelect, false)
	}
}

function setEventOption(eid, optlist){
	dd = document.getElementById(eid);
	if(optlist.length > 1){
		options = '<option value="">-</option>';
		for(const itm of optlist){
			options = options+`<option value="${itm[0]}">${itm[1]}</option>\n`
		}
		dd.innerHTML = options;
		setDisabled(dd, false);
	} else {
		options = '<option value="">-</option>';
		dd.innerHTML = options;
		setDisabled(dd, true);
	}
}
function clearAllEventOptions(){
	setEventOption("stage1_officeKey", []);
	setEventOption("stage1_ordinaryKey", []);
	setEventOption("stage1_clerStatusKey", []);
	setEventOption("stage1_patronTypeKey", []);
	setEventOption("stage1_patronGenderKey", []);
	nmEle = document.getElementById("stage1_patronName");
	nmEle.value = "";
	setDisabled(nmEle, true);
	
}

async function setupEventOptions(etype){
	const jurisD = document.getElementById("stage1_jurisDioceseKey").value;
	if(!jurisD){
		clearAllEventOptions();
		return;
	}
	if(etype){
		switch(parseInt(etype)) {
			case BIRTH_TYPE:
				clearAllEventOptions();
				break
			case SUBSCRIPTION_TYPE:
				clearAllEventOptions();
				break
			case APPOINTMENT_TYPE:
				setEventOption("stage1_officeKey", getTheOfficeList())
				setEventOption("stage1_ordinaryKey", []);
				setEventOption("stage1_clerStatusKey", []);
				setEventOption("stage1_officeKey", getTheOfficeList())
				setEventOption("stage1_patronTypeKey", getThePatronageTypeList());
				setEventOption("stage1_patronGenderKey", getGenderList());
				nmEle = document.getElementById("stage1_patronName");
				setDisabled(nmEle, false);
				break
			case ORDINATION_TYPE:
				setEventOption("stage1_officeKey", []);
				setEventOption("stage1_ordinaryKey", (await getTheDioceseOrdinaries())[jurisD]);
				setEventOption("stage1_clerStatusKey", getTheClericalStatuses());
				setEventOption("stage1_patronTypeKey", []);
				setEventOption("stage1_patronGenderKey", []);
				nmEle = document.getElementById("stage1_patronName");
				nmEle.value = "";
				setDisabled(nmEle, true);
				break
			case DEATH_TYPE:
				clearAllEventOptions();
				break
			default:
				clearAllEventOptions();		
		}
	} else {
		clearAllEventOptions();
	}
}

function ResetAdvancedForm(fid){
	theForm = document.getElementById(fid);
	document.getElementById("stage1_surname").value = "";
	document.getElementById("stage1_forename").value = "";
	document.getElementById("stage1_locFreeText").value = "";
	document.getElementById("stage1_jurisDioceseKey").value = "";
	archEle = document.getElementById("stage1_jurisArchdeaconryKey");
	setDisabled(archEle, true)
	archEle.value = "";
	archEle.innerHTML='<option value="">-</option>';
	geogEle = document.getElementById("stage1_geogDioceseKey")
	geogEle.value = "";
	setDisabled(geogEle, false);
	regEle = document.getElementById("stage1_cceRegionKey");
	regEle.value = "";
	regEle.innerHTML='<option value="">-</option>';
	setDisabled(regEle, true);
	document.getElementById("stage1_countyKey").value = "";
	document.getElementById("stage1_eventKey").value = "";
	clearAllEventOptions();
	document.getElementById("stage1_startYear").value = "";
	document.getElementById("stage1_endYear").innerHTML='<option value="">-</option>';
}


function handleAdvancedSearchQuery(fid){
	const theForm = document.getElementById(fid);
	let formRslts = {};
	const formData = new FormData(theForm);

	const fieldList=["surname", "forename", "locFreeText", "jurisDioceseKey", "jurisArchdeaconryKey", "geogDioceseKey", "cceRegionKey", 
		"countyKey", "eventKey", "officeKey", "ordinaryKey", "clerStatusKey", "patronTypeKey", "patronGenderKey", "patronName", "startYear", "endYear"]
	let critGiven = false;
	for(const fieldName of fieldList){
		theVal = formData.get("stage1_"+fieldName);
		if(theVal)critGiven = true;
		formRslts[fieldName] = theVal;
	}
	theURL = "advsearch.html?"+encodeURIComponent(JSON.stringify(formRslts));
	target = window.open(theURL, "leftFrame")
	return false;
}

/* ======================= Functions to support query processing for top form (advdisp.html) =================== */


async function processAdvancedSearch(theData) {
	if(theData) {
		theData2 = JSON.parse(decodeURIComponent(theData.substring(1)));
		displaySearch(await doAdvancedSearch(theData2));
	} else {
		displayMessage("If your search matches career model records in the database, they are listed here. Clicking the Person name will display the full record on the right.");
	}
}

function compPersons(a,b){
	pdata = getThePersons();
	[surname, forename, startyear, endyear] = pdata[a]
	aStr = `${surname} ${forename} ${startyear} ${endyear}`; // this works because all dates are 4 digita numbers except for missing (0)  JB
	[surname, forename, startyear, endyear] = pdata[b]
	bStr = `${surname} ${forename} ${startyear} ${endyear}`; // this works because all dates are 4 digita numbers except for missing (0)  JB
	if (aStr < bStr)return -1;
	if (bStr < aStr)return 1;
	return 0;
}

function processLocationString(lstr){
	pat = mysql2re(lstr);
	lrst = [];
	locs = getLocationLists();
	locpers = getLocationPersonsData();
	unmatched = true;
	for (dio in locs){
		for (loc of locs[dio]){
			if(pat.test(loc[1])){
				unmatched = false;
				locKey =loc[0];
				pers = locpers[dio][locKey];
				if(pers) for (per of pers){
					if(!lrst.includes(per))lrst.push(per);
				}
			}
		}
	}
	if(unmatched) window.alert(`The location pattern "${lstr}" didn't match any location name`);
	lrst.sort((a, b) => compPersons(a,b));
	return lrst;
}

async function filterOrdinationData(dioceseIDs, ordTenIDs, archdIDs, clStatIDs){
	const dioceseID = parseInt(dioceseIDs);
	const ordTenID = parseInt(ordTenIDs);
	const archdID = parseInt(archdIDs);
	const clStatID = parseInt(clStatIDs);

	const ordData = await getTheOrdinationEventData();
	const diocOrdData = ordData[dioceseID];
	/* if(!(ordTenID || archdID || clStatID)){
		let rslt = []
		for(itm of diocOrdData){
			[personID, ordTenID2, archdID2, clStatID2] = itm;
			if(!rslt.includes(personID))rslt.push(personID);
		}
		return rslt;
	} */
	rslt = [];
	for(itm of diocOrdData){
		[personID, ordTenID2, archdID2, clStatID2] = itm;
		if(ordTenID && (ordTenID != ordTenID2)) continue;
		if(archdID && (archdID != archdID2)) continue;
		if(clStatID && (clStatID != clStatID2)) continue;
		if(!rslt.includes(personID))rslt.push(personID);		
	}
	return rslt;
}

function mysql2re2 (theStr){
	theStr = theStr.trim();
	if(!theStr) return null;
	preChar = "\\b"
	postChar = "\\b"
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

async function filterAppointmentData(dioceseIDs, ordTenIDs, archdIDs, offTypeIDs, ptTypeIDs, genderID, ptexts){
	const dioceseID = parseInt(dioceseIDs);
	const ordTenID = parseInt(ordTenIDs);
	const archdID = parseInt(archdIDs);
	const offTypeID = parseInt(offTypeIDs);
	const ptTypeID = parseInt(ptTypeIDs);
	const ptext = mysql2re2(ptexts)
	
	const appData = await getTheAppointmentEventData();
	const diocAppData = appData[dioceseID];
	rslt = [];
	for(itm of diocAppData){
		[personID, ordTenID2, archdID2, offTypeID2, ptTypeID2, genderID2, ptext2] = itm;
		if(ordTenID && (ordTenID != ordTenID2)) continue;
		if(archdID && (archdID != archdID2)) continue;
		if(offTypeID && (offTypeID != offTypeID2)) continue;
		if(ptTypeID && (ptTypeID != ptTypeID2)) continue;
		if(genderID && (genderID != genderID2)) continue;
		if(ptexts && (!ptext.test(ptext2))) continue;

		if(!rslt.includes(personID))rslt.push(personID);		
	}
	return rslt;
}

function combineFacet(clist, nlist){
	if(nlist == undefined)return [];
	if(clist[0] == -1)return nlist;
	rslt = []
	for (itm of nlist){
		if(clist.includes(itm))rslt.push(itm);
	}
	return rslt;
}

async function handleFacets(parms){
	const areThereEventFilters = parms.officeKey || parms.ordinaryKey || parms.clerStatusKey || parms.patronTypeKey || parms.patronGenderKey || parms.patronName;

	let rslts = [];
	if(parms["locFreeText"]){
		rslts = processLocationString(parms["locFreeText"]);
		if(rslts.length == 0)return rslts;
	} else rslts = [-1];
	if(areThereEventFilters){
		let dta = []
		if(parms.eventKey == ORDINATION_TYPE)
			dta = await filterOrdinationData(parms.jurisDioceseKey, parms.ordinaryKey, parms.jurisArchdeaconryKey, parms.clerStatusKey)
		else if(parms.eventKey == APPOINTMENT_TYPE)
			dta = await filterAppointmentData(parms.jurisDioceseKey, parms.ordinaryKey, parms.jurisArchdeaconryKey, 
				parms.officeKey, parms.patronTypeKey, parms.patronGenderKey, parms.patronName)
		rslts = combineFacet(rslts, dta);
		if(rslts.length == 0)return rslts;
	} else {
		if(parms["eventKey"]){
			let dta = await getEventData(parms["eventKey"])
			rslts = combineFacet(rslts, dta);
			if(rslts.length == 0)return rslts;
		}
		if(parms["jurisDioceseKey"] && parms["jurisArchdeaconryKey"]){
			let dta = await getTheArchdPersons();
			rslts = combineFacet(rslts, dta[parms["jurisDioceseKey"]][parms["jurisArchdeaconryKey"]]);
			if(rslts.length == 0)return rslts;
		}
	}
	if(parms["geogDioceseKey"] && parms["cceRegionKey"]){
		let dta = await getTheRegionPersons();
		rslts = combineFacet(rslts, dta[parms["geogDioceseKey"]][parms["cceRegionKey"]]);
		if(rslts.length == 0)return rslts;
	}
	if(parms["countyKey"]){
		let dta = await getTheCountyPersons();
		rslts = combineFacet(rslts, dta[parms["countyKey"]]);
		if(rslts.length == 0)return rslts;
	}
	return rslts;
}

async function doAdvancedSearch(parms){
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
	fdta = await handleFacets(parms);
	if(fdta[0] != -1)porder = fdta;
	rsltList = [];
	for(const pkey of porder){
		if(testItem(persons[pkey], theSurname, theForename, startYear, endYear)){
			rsltList.push(pkey);
		}
	}
	return rsltList;
}