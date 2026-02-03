# Setting things up in common.py
All the Python files here draw on some rudimentary common code held in common.py. You will likely need to modify a few lines of code here
to make it work for you. Here is some information about what changes you are likely going to need to make.

## the MySQL database connection and the `getConnection()` function
All the Python files that process MySQL data make use of the `getConnection()` function to established the database connection. It, in
turn, invokes the `MySQLdb.connection()` function to established the connection.  The parameters to manage this are drawn from a simple 
JSON file which is not held within this repo itself.
* the location of the credentials JSON file is provided in the global variable "db_credentials".  Change the value assigned to it to provide
a path to where you keep your personal credential file. 
* the code in `getConnection()` assumes a particular structure for the credential file which is shown below.

The structure of the credential file is expressed in JSON, and is shown in this template:

	{
	   "cce": {
		"host": "<MySQLdb connection string here>",
		"user": "<MySQL account here>",
		"password": "<MySQL account password here>",
		"db": "<MySQL database name here>"
	   }
	}
	
## Managing generated JSON files
The Python files here generate JSON files (well, strictly speaking, JavaScript files -- see below). Some code in `common.py` manages this process.

First, the variable `workdir` in `common.py` provides a string that specifies the path to where the created JSON/JS files should be put.  The current
value places the generated files directly in the folder on my machine where they need to be to be in order to be used by the JavaScript search mechanism. You should
change this string to reflect the directory/folder structure you have on your machine.

The two functions `openFile()` and `writeFile()` are used in the other Python files to manage the creation of the JSON/JS files that hold the data
the search mechanism will use.  Most of the Python programs work by running an SQL data request and repacking what it fetches into a single JSON structure (OBJECT, or
sometimes ARRAY).  For them the `writeFile()` function can be used. However, a few of the generating programs do other, slightly more complex things.  For them
the `openFile()` function can be invoked to, at least, ensure that the JSON/JS files created are stored in the right place.

## JavaScript wrappers for the JS code
Although the data is represented in JSON, they are "wrapped" in a little bit of JavaScript code.  This is to ensure that conventional import processes (either `<script`
or JS "import" processes can be used in a straightforward fashion.  At the time this code was written there were hints in discussion groups that the importing of data in
formats like JSON into a JS process might be restricted or made more complex to do.  By wrapping the JSON data in simple JS, one avoids this potential future problem, I hope!

What is the wrapping like?  There are two forms:

If the data is loaded through the `<script` HTML element, a simple form is needed.  Here is a much shortened and slightly tidied up version of it:

	function getPersons(){ 
	   return {"111657": ["***idge", "E***", 1792, 1792], [...]
	   "160271": ["[not given]", "[not given]", 1835, 1835]}
	; }
	
(the full code can be found in the `site/search/data` folder, in file `persons.js`. The generated data is put inside a JS function, and is provided by a, rather long,
JS return statement.  The function name (here, `getPersons()`) is provided by the Python code that generates the data, and will be different for different JSON objects.

Alternatively, data is often loaded dynamically using the JS "import" keyword.  The wrapper is very similar:

	export function getArchDecData(){ 
	   return {"3": [[429, "Pagham deanery"], [...]
	      [657, "Navy"], [658, "Ships"]]}
	   ; }
	   
(this example in from the file `archDData.js`, also in the `site/search/data` folder) Here again, the JSON is wrapped in a function, but the function is described as "export"ed.  Here too, the wrapping function name is provided by the Python code and is
different for different JSON objects.

## Parameters for `writeFile()` function
the common.py writeFile() function has the following parameters:
* ``theJson``: provides the JSON object that is to be written to the file.
* ``theFileName``: provides the file name (without the ".js" extension) to be used.
* ``theFunctionName``: provides the name of the JavaScript function to be specified in the JS wrapping for the data.
* ``export``: (optional) if True, specifies that the function needs the "export" keyword in front of it (needed for
dynamic importing by JavaScript).  The default is "False".
* ``theIndent``: provides for a "pretty printing" export of the JSON data. This is useful for debugging, but makes the generated
file substantially bigger.

Here is an example of the use of the WriteFile function (found in persons2json.py):

	common.writeFile(persons, "persons", "getPersons")
