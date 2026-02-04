# Overview of the /site directory
The `/site` folder contains the material that is meant to be integrated into the static web pages for CCEd. It's structure is as follows:
* Inside the folder are two folders.
* `/Assets` is meant to be exactly the same as that folder already present in the static web pages.  It is here because the HTML material in
the `/search` folder (which is that actual new stuff) makes reference to the CCS and some of the JS material that was present in the server-based
CCEd site, and (presumably) remains present in the static web page collection too.  This folder is meant to be the same as what is already present
and need not be copied from here.
* `/search` is the new material and contains the files that implement the search mechanism for CCEd.