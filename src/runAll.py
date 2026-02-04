'''
Created on Jan 30, 2026

@author: John Bradley
'''
import common
import persons2json
import locationList2json
import locationPersons2json
import archdData2json
import archdPersons2json
import regData2json
import regPersons2json
import countyPersons2json
import dioceseOrd2json
import appEventData2json
import ordEventData2json
import fixedLists2json
import eventsPersons2json

print("Script runAll starts...\n\n")
dbConnection = common.getConnection()

# this creates the "person" files:
# * persons.js is a JSON file containing an object holding names and career date information 
# * personOrder.js is a JSON array of person keys putting them in alphabetical order by name
persons2json.doTheWork(dbConnection)

# These two create CCE "location" data as JSON files:
# * the first creates file Location1.js: a JSON object containing names of CCE locations
# * the second creates file Location2.js: containing arrays of person IDs associated with locations 
locationList2json.doTheWork(dbConnection)
locationPersons2json.doTheWork(dbConnection)

# this creates file countyPers.js which lists person IDs of persons associated with each county
countyPersons2json.doTheWork(dbConnection)

# these two create Archdeaconry data:
# * the first creates archDData.js: contains the names of the Archdeaconries
# * the second creates archDPers.js: contains arrays of person IDs associated with each Archdeaconry
archdData2json.doTheWork(dbConnection)
archdPersons2json.doTheWork(dbConnection)

# these two create CCE Region data:
# * the first creates regData.js: contains the names of the CCE regions
# * the second creates regPers.js: contains arrays of person IDs associated with each Region
regData2json.doTheWork(dbConnection)
regPersons2json.doTheWork(dbConnection)

# this creates file DiocOrds.js which contains lists of bishops associated with each diocese
dioceseOrd2json.doTheWork(dbConnection)

# this creates file eventsPersons.js which lists persons associated with each CM event type
eventsPersons2json.doTheWork(dbConnection)

# these two create files containing data about persons and CM event data:
# * the first creates file appEventData.js: contains filtering data for appointment records
# * the second creates file ordEventData.js: contains filtering data for ordination records
appEventData2json.doTheWork(dbConnection)
ordEventData2json.doTheWork(dbConnection)

# this creates lists of items to be used to display fixed dropdowns in the advanced search menu (that are always the same):
#     they are Offices, Clerical status, Patronage Type and Patron Gender
fixedLists2json.doTheWork(dbConnection)

print("All done!!!")