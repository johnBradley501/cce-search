'''
Created on Jan 20, 2026

@author: John Bradley
'''
# this create file events.Persons.js which lists persons associated with each CM event type

import MySQLdb
import json
import common

def createPersonList(dbConnection, outfile, tabname, tname):
    sql = """SELECT p.PersonID, p.Surname, p.Forename, p.FirstYear, p.LastYear
FROM CCEperson as p, """+tabname+""" as e, CMPerson as cmp
WHERE e.CMPersonKey = cmp.CMPersonKey AND cmp.PersonID = p.PersonID AND p.Surname<>""
ORDER BY p.Surname, p.Forename, p.FirstYear, p.lastYear""";

    cursor = dbConnection.cursor()
    cursor.execute(sql)
    print("Processing", tabname)
    
    theList = []
    cnt = 0
    for r in cursor:
        cnt += 1
        [personID, surname, forename, firstYear, lastYear] = r
        if personID not in theList:
            theList.append(personID)
    cursor.close()
    print("   Count: ",cnt)
    
    outfile.write("export function "+tname+"(){ return ")
    outfile.write(json.dumps(theList)) # , indent=4))
    outfile.write("; }\n\n")
        
def doTheWork(dbConnection):
    print("Creating Events to Persons data...")
    outfile = common.openFile("eventsPersons")
    createPersonList(dbConnection, outfile, "CMAppEvent", "getAppointmentPersonData")
    createPersonList(dbConnection, outfile, "CMBirthEvent", "getBirthPersonData")
    createPersonList(dbConnection, outfile, "CMDeathEvent", "getDeathPersonData")
    createPersonList(dbConnection, outfile, "CMOrdEvent", "getOrdinationPersonData")
    createPersonList(dbConnection, outfile, "CMSubEvent", "getSubscriptionPersonData")

    outfile.close()
    print("...Done!")
    
def main():
    dbConnection = common.getConnection()
    doTheWork(dbConnection)
    dbConnection.close()
    
if __name__ == "__main__":
    main()