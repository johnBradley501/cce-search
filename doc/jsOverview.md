# Overview of JavaScript operations.
The JavaScript code that implements the search can be found in the two files `search/search.js` and `search/advsearch.js`. `search.js` supports the basic search, and `advsearch.js` adds functions that support the significantly more complex advanced search.

## Setting up `search.js`
Before we look at the code overall, we need to discuss one change that will need to be made to properly integrate the search tool into the static website.

Like the original server-supported application, the list of selected clergy are displayed in the lower left frame.  When the user clicks on one of th e selected clergymen
the information CCEd has about him is displayed in the larger right frame. This information will come from the web pages in the static website, and should be linked here using
a relative URL. However, when this code was developed I didn't have the static pages, but it was useful to check the workings of the site by supporting clicks of the list of selected clergymen from the left frame.  For this, I chose to make the clergyman link refer to what was then the current CCEd server-supported website.
This will have to be changed when the search mechanism is incorporated into web pages.

The creation of the URL for a particular clergyman is managed by the function `makePersonURL(pid)` in `search.js` (starting on our about line 35). Currently it looks like this:

	function makePersonURL(pid){
		return `https://theclergydatabase.org.uk/jsp/persons/DisplayPerson.jsp?PersonID=${pid}`;
	}

Suppose that the correct relative URL for a clergyman page (say, for person with ID 8) in the static site is this: `../persons/person8.html', then this function should be changed
to:

	function makePersonURL(pid){
		return `../persons/person${pid}.html`;
	}

## JavaScript Search files and the Three frames
The flow of control for a search (both basic and advanced) is that the user fills in a form in the top frame, pushs the submit button which sends the information about
the search form to the bottom left frame, which carries out the selection process and displays the result in itself.  The generated list of selected clergymen will
have links that invoke the `makePersonURL()` function (just discussed) to display information about any selected clergyman in the bottom right frame.  Information about the form is sent to the bottom left frame by turning the form values into a JSON object which gets attached to the URL as query information (following a URL "?") which is directed to the bottom left frame

In both the basic and advanced search the form display is somewhat dynamic and changes as the user chooses things in it.  Thus, JavaScript is needed to manage this dynamic character. Hence, as a consequence of this flow of control between the form display at the top, and the selection operation and display in the left the two search Javascript files have functions that are used in both the top (form-based) section, and the selection process run in the lower left frame.

## `search.js` and its three sections
The JavaScript functions in `search.js` can be divided into three sections.

### Top section: data access functions
The file starts with functions that provide reusable access to JSON data stored in the data folder. For them to work, the appropriate data file has to be loaded (via a <script tag in the `display.html` file.  These access functions are:

	function getThePersons(){
	function getThePersonsOrder(){
	function getLocationLists(){
	function getLocationPersonsData()

This section also contains the generic function that maps clergyman's ID to the relative URL: `makePersonURL(pid)`)

### Middle Section: managing the query form
Next are the functions that interact with the query form in `display.html`. 
First are the functions that support the loading of a person display from their ID number (first form element labelled "Retrieve Record:")

	function displayPerson(pid)
	function processIdDisplay(personID)

Function `processIdDisplay()` is invoked via the form's "Go" button and it takes the given record value provided in the form
and passes it to function `displayPerson()` which checks that the ID is valid: issuing a message if it is not, and opens the person page
in the bottom right form if it is valid.

Following this are the functions that support the dynamic drop-downs that appear in the basic query form: the link between Diocese and Locations, and 
the management of the Date Range.

	function defineEndYearSelection(eid, val)
	function defineLocationSelection(eid, val)

`defineLocationSelection` uses the data in `data/location1.js` to establish the keys and names for the locations associated with the diocese. `defineEndYearSelection()` doesn't need any external data: it's work is based on simple year calculations.

Following this is the functions that operates in the `display.html` frame to process the form data when the user pushes the submit button. This function is linked
to the onclick action attached to the "Search" button.

	function handleSearchQuery(fid)

Notice that the data in the form is turned into a JSON string, and this is sent to the bottom left frame (`search.html`) as the URL query:

	theURL = "search.html?"+encodeURIComponent(JSON.stringify(formRslts));
	target = window.open(theURL, "leftFrame")


Finally in this section we have the function that clears the form when the user pushes the "Reset" button.

	function ResetBasicForm(fid)

## Bottom section: running the query
When the user pushes "submit" in the top frame, the form data is checked and assembled there and then sent to the
bottom-left frame for processing.  The remaining functions here handle that processing (down to the AddTips() section).

If you look in `search.html` you can see near the bottom the script code:

	theData = window.location.search;
	if(theData) {
		theData2 = JSON.parse(decodeURIComponent(theData.substring(1)));
		displaySearch(doSearch(theData2));
	} else {
		displayMessage("If your search matches career model records in the database, they are listed here. Clicking the Person name will 		display the full record on the right.");
	}
		
The first line of this block of code fetches the query part of the URL that launched this page.  If the fetched query portion is empty the message "If your search..." is shown
here.  Otherwise, the query part of the URL is transformed into a proper JSON object.  This will contain the query parameters from the search query form.

The query form data is passed to `doSearch()`, which processes the query and returns a list (JavaScript Array) of seleted person IDs.  This list is passed into `doSearch()` which writes it into this frame -- thus displaying the list to the user.

Both `displaySearch()` and `doSearch()` are defined in `search.js`. The remaining functions in `search.js` are used within the search and display functions:

	function displayMessage(content)
	function mysql2re (theStr)
	function testItem(itm, theSurname, theForename, startYear, endYear)
	function displayItem(pkey, pitm)

### `AddTips()`
The very bottom JavaScript material manages the display of the "tips": the small displays that appear when the user clicks on the "?" buttons that appear within the query
form.  The text to be displayed is defined in file `search_tips.xml`.  The code is borrowed from one of the JavaScript files that was not written with me: `../Assets/p/s/config.t0.js`.

## A few words about `advsearch.js`
The functions in this file are used to support the rather more complex processing required for the advance search.  Overall, the flow of processing between the top display
frame and the search processing is very similar to that used for the basic search.  Also, similar to `search.js`, the functions are presented in three groups:
* data access functions
* functions to manage the query form
* functions to run the query

### async processing
There is quite a bit of data from the database needed to spport the broad range of requests possible in the advanced search, but usually only a small subset of the full set will be needed for any particular query.  If all the files had been made available via the HTML `<script` method, a considerable amount of data would need to be pre-loaded.  Instead, therefore, this code uses the JavaScript `import` keyword to dynamically load one of the files only if it is needed for the particular 
query being processed.  The `import` keyword operates asynchronously.  Thus, the entire processing (starting with the top level search function `doAdvancedSearch()` has to operate asynchronously as well.
