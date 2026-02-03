'''
Created on Jan 15, 2026

@author: John Bradley
'''
# this creates regPers.js which contains arrays of person IDs associated with each Region

import MySQLdb
import json
import common

def doTheWork(dbConnection):
    print("Creating Region to Persons Data...")
    cursor = dbConnection.cursor()
    sql = """SELECT p.PersonID, p.Surname, p.Forename, p.FirstYear, p.LastYear, d.DioceseID, d.DioceseName, r.CceRegionKey, r.RegionName
    FROM CCEPerson as p, Diocese as d, CCERegion as r, LocUnit as lu, PersonEvid as pe
    WHERE p.PersonID = pe.PersonID AND lu.locUnitKey = pe.locUnitKey AND r.CceRegionKey = lu.CceRegionKey AND r.CceRegionKey = lu.CceRegionKey
    AND d.DioceseID = r.DioceseID AND d.DioceseID <> 1
    ORDER BY p.Surname, p.Forename, p.FirstYear, p.LastYear"""
    
    cursor.execute(sql)
    
    print("Processing starts")
    regData = {}
    cnt = 0;
    for r in cursor:
        cnt += 1
        [personID, surname, forename, firstYear, lastYear, dioceseID, dioceseName, cceRegionKey, regionName] = r
        if dioceseID not in regData:
            regData[dioceseID] = {}
            regData[dioceseID][0] = []
        if cceRegionKey not in regData[dioceseID]:
            regData[dioceseID][cceRegionKey] = []
        lst0 = regData[dioceseID][0]
        lstreg = regData[dioceseID][cceRegionKey]
        if personID not in lst0:
            lst0.append(personID)
        if personID not in lstreg:
            lstreg.append(personID)
    
    cursor.close()
    
    print("   Count:", cnt)
    common.writeFile(regData, "regPers", "getRegionPersons", True)
    print("...Done!")

def main():
    dbConnection = common.getConnection()
    doTheWork(dbConnection)
    dbConnection.close()
    
if __name__ == "__main__":
    main()