# Code for CCE static website search
Provides code required to support searching in the Clergy of the Church of England (https://theclergydatabase.org.uk/) static web site.

For years CCE has been published through a Tomcat web server, and provided searching facilities by running queries on the backing MySQL database.
When the website was changed to a static site (made up only of HTML, images, CCS and JavaScript pages) the server which provided a search
access for the data was no longer available.  To replace this, a set of pages were created that exploited data stored as JSON and generated
from the original MySQL database, and then drew on this JSON data via JavaScript code.

All the code for this is contained here in this repo.
* The directory "src" contains Python code that creates the JSON data by running SQL queries against the database and turning it into JSON. See more
about this [here](doc/srcOverfiew.md).
* The directory "site" contains the search folder which contains the web pages that implement the service: HTML and JavaScript files.

-- John Bradley (john.bradley@kcl.ac.uk) (February 2026)
