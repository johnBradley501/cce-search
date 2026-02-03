'''
Created on Jan 15, 2026

@author: John Bradley
'''
# this creates regData.js: contains the names of the CCE regions

import MySQLdb
import json
import common

def doTheWork(dbConnection):
    print("Creating Region List Data...")
    cursor = dbConnection.cursor()
    sql = """SELECT d.DioceseID, d.DioceseName, r.CceRegionKey, r.RegionName, Count(lu.locUnitKey) AS Occurrences
    FROM Diocese as d, CceRegion as r, LocUnit as lu
    Where d.DioceseID = r.DioceseID AND r.CceRegionKey = lu.CceRegionKey AND r.CceRegionKey = lu.CceRegionKey
    GROUP BY d.DioceseID, d.DioceseName, r.CceRegionKey, r.RegionName
    HAVING d.DioceseID<>1 AND r.CceRegionKey<>1
    ORDER BY d.DioceseID, r.RegionName, Occurrences DESC"""
    cursor.execute(sql)
    
    regData = {}
    pkey = 0
    cnt = 0
    lst = []
    for r in cursor:
        cnt += 1
        [dioceseID, dioceseName, cceRegionID, regionName, occurrences] = r
        regionName = regionName.strip()
        if dioceseID != pkey:
            lst = []
            regData[dioceseID] = lst
            pkey = dioceseID
        lst.append([cceRegionID, regionName])
    
    cursor.close()
    
    print("   Count:", cnt)
    common.writeFile(regData, "regData", "getRegData", True)
    print("...Done!")

def main():
    dbConnection = common.getConnection()
    doTheWork(dbConnection)
    dbConnection.close()
    
if __name__ == "__main__":
    main()