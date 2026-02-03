'''
Created on Dec 18, 2025

@author: John Bradley
'''
# this creates the "person" files:
# * persons.js is a JSON file containing an object holding names and career date information 
# * personOrder.js is a JSON array of person keys putting them in alphabetical order by name

import MySQLdb
import json
import common

def doTheWork(dbConnection):
    print("Creating Persons Data...")
    cursor = dbConnection.cursor()

    cursor.execute("SELECT PersonID, Surname, Forename, FirstYear, LastYear FROM CCEPerson order by Surname, Forename, FirstYear")
    persons = {}
    porder = []
    cnt = 0
    for r in cursor:
        cnt += 1
        [personID, surname, forename, firstYear, lastYear] = r
        if surname != "" or forename != "":
            persons[personID] = [surname, forename, firstYear, lastYear]
            porder.append(str(personID))

    cursor.close()

    print("   Count:",cnt)
    common.writeFile(persons, "persons", "getPersons")
    common.writeFile(porder, "personOrder", "getPersonsOrder")
    print("...Done!\n")

def main():
    dbConnection = common.getConnection()
    doTheWork(dbConnection)
    dbConnection.close()
    
if __name__ == "__main__":
    main()