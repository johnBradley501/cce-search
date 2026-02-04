# Overview of the /site directory
The `/site` folder contains the material that is meant to be integrated into the static web pages for CCEd. It's structure is as follows:
* Inside the folder are two folders.
* `/Assets` is meant to be exactly the same as that folder already present in the static web pages.  It is here because the HTML material in
the `/search` folder (which is that actual new stuff) makes reference to the CCS and some of the JS material that was present in the server-based
CCEd site, and (presumably) remains present in the static web page collection too.  This folder is meant to be the same as what is already present
and need not be copied from here.
* `/search` is the new material and contains the files that implement the search mechanism for CCEd.

# Trying out the /site material
Because of CORS restrictions (of course!!!), the HTML and Javascript pages present here cannot be directly operated by simply pointing a browser at the HTML pages.
Instead, one needs to access the materials via the http or https protocol.  For me at least, the simplest way to do this was to use the simply http server that
comes with python.  To use it:
* open a command prompt window and navigate via the `cd` command to the `/site` folder.
* when it is the prompt window's directory, launch the python simple http server with the command:

	python -m http.server
	
* launch your browser to `http://localhost:8000`
* if it launches in the `/site` folder, use the display to navigate to the `/search` folder.
* the basic search screen should appear.