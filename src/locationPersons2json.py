'''
Created on Dec 31, 2025

@author: John Bradley
'''
# this creates file location2.js which containing arrays of person ID associated with locations
import MySQLdb
import json
import common

def doTheWork(dbConnection):
    print("Creating Location-Persons Data...")
    cursor = dbConnection.cursor()
    sql = """SELECT cp.PersonID, cp.Surname, cp.Forename, cp.FirstYear, cp.LastYear, loc.locKey, loc.displayName, d.DioceseID, d.DioceseName
    FROM CCEPerson as cp, Location as loc, LocUnit as lcu, Diocese as d, PersonEvid as pe
    WHERE cp.PersonID = pe.PersonID AND loc.locKey = lcu.locKey AND lcu.locUnitKey = pe.locUnitKey AND d.DioceseID = loc.juriDiocese
    AND loc.locKey <> 1 ORDER BY cp.Surname, cp.Forename, cp.FirstYear, cp.LastYear"""
    cursor.execute(sql)
    
    print("Processing starts")
    locData = {}
    cnt = 0;
    for r in cursor:
        cnt += 1
        [personID, surname, forename, firstYear, lastYear, locKey, displayName, dioceseID, dioceseName] = r
        if dioceseID not in locData:
            locData[dioceseID] = {}
            locData[dioceseID][0] = []
        if locKey not in locData[dioceseID]:
            locData[dioceseID][locKey] = []
        lst0 = locData[dioceseID][0]
        lstloc = locData[dioceseID][locKey]
        if personID not in lst0:
            lst0.append(personID)
        if personID not in lstloc:
            lstloc.append(personID)
    
    cursor.close()
    
    print("   Count:", cnt)
    common.writeFile(locData, "location2", "getLocationPersons")
    print("...Done!\n")

def main():
    dbConnection = common.getConnection()
    doTheWork(dbConnection)
    dbConnection.close()
    
if __name__ == "__main__":
    main()