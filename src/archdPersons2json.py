'''
Created on Jan 14, 2026

@author: John Bradley
'''
# the creates archDPers.js which contains arrays of person IDs associated with each archdeaconry

import MySQLdb
import json
import common

def doTheWork(dbConnection):
    print("Creating Archdeaconry to Persons Data...")
    cursor = dbConnection.cursor()
    sql = """SELECT p.PersonID, p.Surname, p.Forename, p.FirstYear, p.LastYear, a.ArchdID, a.ArchdName, d.DioceseID, d.DioceseName
    FROM ccePerson as p, archdeaconry as a, diocese as d, personEvid as pe, locUnit as lu
    WHERE p.PersonID = pe.PersonID AND lu.locUnitKey = pe.locUnitKey AND a.ArchdID = lu.ArchdID AND d.DioceseID = a.DioceseID
    AND a.ArchdID<>1 AND d.DioceseID<>1 
    ORDER BY p.Surname, p.Forename, p.FirstYear, p.LastYear"""
    cursor.execute(sql)
    
    print("Processing starts")
    archData = {}
    cnt = 0;
    for r in cursor:
        cnt += 1
        [personID, surname, forename, firstYear, lastYear, archdID, displayName, dioceseID, dioceseName] = r
        if dioceseID not in archData:
            archData[dioceseID] = {}
            archData[dioceseID][0] = []
        if archdID not in archData[dioceseID]:
            archData[dioceseID][archdID] = []
        lst0 = archData[dioceseID][0]
        lstarch = archData[dioceseID][archdID]
        if personID not in lst0:
            lst0.append(personID)
        if personID not in lstarch:
            lstarch.append(personID)
    
    cursor.close()
    
    print("   Count:", cnt)
    common.writeFile(archData, "archDPers", "getArchdPersons", True)
    print("...Done!")
 
def main():
    dbConnection = common.getConnection()
    doTheWork(dbConnection)
    dbConnection.close()
    
if __name__ == "__main__":
    main()   