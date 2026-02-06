# the /src folder
The process involved in setting up the "static page" search mechanism involves first extracting data from the CCE's MySQL database.
This extracted data is presented in the JSON format, and is the material used by the JavaScript-based search engine.  This extraction process is
written in Python code (version 3.9 is the version I used), and the extraction scripts can be found in the `/src` folder. If all goes well,
these only need to be executed once with the final version of the CCE database to create the required JSON files.

The Python code makes use of the module "MySQLdb" to provide access to the MySQL database. The python scripts defined here operate by
taking materials from CCE's MySQL database -- so, in order to run these scripts you must have access to MySQL and the correct version of the cce database.  Furthermore, 
before you run run any of the Python scripts in the `/src` folder you need to first set things up by making a few changes in the `common.py` module
file.  See [`common.py` setup](commonSetup.md) for information about this.

## What's in the /src folder
Most of the python scripts (the ones with names that end "...2json.py") are scripts that generate one of more of the JSON/JS files that are needed in the web site's search/data
folder.  They all pull data from CCEd's MySQL database, and they all access it through the `getConnection()` function in `common.py`. Be sure, then, that you have access
to the database, and have reviewed (and likely) edited `common.py` so that the database can be found, and that the correct place to deposit the files these scripts create
has been specified. As just mentioned above, see [`common.py` setup](commonSetup.md) for information about this.

The script `runAll.py` runs all the "...2json.py" scripts, one by one, and can be used to completely update the JSON/JavaScript data files in one go.  On my machine this takes about 15-20 minutes to run.

Here is a summary of what each of the "...2json.py" scripts do:

### `persons2json.py`

This creates the "person" files (used in several ways in both the basic and advanced search):
* `persons.js` is a JSON file containing an object holding names and career date information.
* `personOrder.js` is a JSON array of person IDs/keys that presents them in alphabetical order by name and career date.

### `locationList2json.py` and `locationPersons2json.py`
These two create CCE "location" data as JSON files. "Locations" in CCE are the places where the church had posts. Thus, most of the
locations are parishes, but there are other kinds of posts too.  Location is one of the choices on the basic search screen.
* `locationList2json.py` creates file `location1.js`: a JSON object containing names of CCE locations grouped by diocese.
* `locationPersons2json.py` creates file `location2.js`: containing arrays of person IDs associated with these CCE locations. 

### `countyPersons2json.py`
This creates file JSON/JS file `countyPers.js` which lists person IDs of persons associated with each county, and is used in
the advanced search.

### `archdData2json.py` and `archdPersons2json.py`
These two create Archdeaconry data (used in the advanced search):
* `archdData2json.py` creates `archDData.js`: contains the names of the Archdeaconries.
* `archdPersons2json.py` creates `archDPers.js`: contains arrays of person IDs associated with each Archdeaconry.

### `regData2json.py` and `regPersons2json.py`
These two create CCE Region data (used in the advanced search):
* `regData2json.py` creates `regData.js`: contains the names of the CCE regions.
* `regPersons2json.py` creates `regPers.js`: contains arrays of person IDs associated with each Region.

### `dioceseOrd2json.py`
This creates file `DiocOrds.js` which contains lists of bishops (called "Ordinaries" in CCE) associated with each diocese. Used
in the advanced search.

### `eventsPersons2json.py`
This creates file `eventsPersons.js` which lists persons associated with each CM event type. Used in the advanced search.

### `appEventData2json.py` and `ordEventData2json.py`
These two create files containing data about persons and CM event data (used in the advanced search):
* `appEventData2json.py` creates file `appEventData.js`: contains filtering data for appointment records (this script runs for the longest
time of any of the scripts).
* `ordEventData2json.py` creates file `ordEventData.js`: contains filtering data for ordination records.

### `fixedLists2jso.py`
This creates lists of items to be used to display fixed dropdowns in the advanced search menu (dropdown lists that are always the same):
they are Offices, Clerical status, Patronage Type and Patron Gender.
