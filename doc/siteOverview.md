# Overview of the `/site` directory
The `/site` folder contains the material that is meant to be integrated into the static web pages for CCEd. It's structure is as follows:
* Inside the folder are two folders.
* `/Assets` is meant to be exactly the same as the folder with this name that is already present in the static web pages.  It is here because the HTML material in
the `/search` folder (which is that actual new stuff) makes reference to the CCS and some of the JS material that was present in the server-based
CCEd site, and (presumably) remains present in the static web page collection too.  This folder is meant to be the same as what is already present
and need not be copied from here.
* `/search` is the new material and contains the files that implement the search mechanism for CCEd. This is the folder that will need to be copied into the
static website.

## Trying out the `/site` material
Because of CORS restrictions (of course!!!), the HTML and Javascript pages present here cannot be directly operated by simply pointing a browser at the HTML pages.
Instead, one needs to access the materials via the http or https protocol.  For me at least, the simplest way to do this was to use the simple http server that
already comes with python.  To use it:
* open a command prompt window and navigate via the `cd` command to the `/site` folder.
* when this is done, launch the python simple http server with the command:

	python -m http.server
	
* launch your browser and set its URL to `http://localhost:8000`
* if it launches in the `/site` folder, use the display to navigate to the `/search` folder.
* the basic search screen should appear.
* if you wish to test out the advanced search, click on what looks like the "Advanced Search" near the top.

## Overview of the `/site/search` directory
The heart of the matter for the site directory is the content of the /search` directory.
* the search HTML pages operate through HTML frames.
* the basic search screen has its frameset in `index.html`.
* the advanced search screen has its frameset in `advanced.html`.
* one switches between the basic and advanced by clicking on the Basic and Advanced tab above the query form.

For the basic search (whose top level frameset is found in `index.html`:
* the top frame (containing the basic query form) is specified in `display.html`.
* the bottom right frame (which displays query results) is specified in `search.html`.
* the bottom left frame (which displays details about clergy) is specified initially at least with `text.html`.

Similarly, for the advanced search (whose top level frameset if found in`advanced.html`:
* the top frame (containing the advanced query form) is specified in `advdisp.html`.
* the bottom right frame (which displays query results) is specified in `advsearch.html`.
* the bottom left frame (which displays details about clergy) is specified initially at least with `text.html`.

Other files in `/site/search` are:
* `search.js`: contains the JavaScript functions that support the basic search.
* `advsearch.js`: contains the extra functions needed to support the advanced search
(some functions in `search.js` are also used in the advanced search).
* `search_tips.xml`: contains the text to be displayed as a help message when the user clicks on one of the "?" buttons in the query form.
This is supported by the cluetip library found in `../Assets/p/s/jq.cluetip.js`.
* `tab.html` originally implemented a button which could hide and display the lower left panel, but it didn't seem to work properly here,
and seemed to me to be unncessary.  Although it is still in this directory, it is no longer used.

Finally, `/site/search` contains a subfolder `data`, which contains all the JSON/JS data which has been extracted from the CCEd database and which
powers the basic and advanced search mechanisms.  These are the files generated with the python code in `/src` in this project.

A brief overview of how the JavaScript files work to support searching can be found [here](jsOverview.md).