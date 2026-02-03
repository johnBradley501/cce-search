# the /src folder
The process involved in setting up the "static page" search mechanism involves first extracting data from the CCE's MySQL database
which the JavaScript code given to the site user uses as the basis for doing the search.  This extraction process, which is expressed
as Python code (version 3.9 is the version I used) can be found in the `/src` folder, and needs to be only done
once, with the final version of the CCE database, to create the JSON files.

The Python code makes use of the module "MySQLdb" to support access to the MySQL database. The python scripts defined here operate by
taking materials from CCE's MySQL database -- so, in order to run these scripts you must have access to MySQL and a cce database.  Furthermore, 
before you run run any of the Python scripts in the `/src` folder you need to first set things up by making a few changes in the `common.py` module
file.  See [`common.py` setup](commonSetup.md) for information about this.

