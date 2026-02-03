'''
Created on Jan 13, 2026

@author: John Bradley
'''
# this creates file archDData.js which contains the names of the Archdeaconries

import MySQLdb
import json
import common

def doTheWork(dbConnection):
    print("Creating Archdeaconry Lists...")
    cursor = dbConnection.cursor()
    sql = 'SELECT d.DioceseID, a.ArchdID, a.ArchdName FROM diocese as d, Archdeaconry as a WHERE d.DioceseID = a.DioceseID AND d.DioceseID<>1 AND a.ArchdName<>"" ORDER BY d.DioceseID, a.ArchdName'
    cursor.execute(sql)
    
    archdData = {}
    pkey = 0
    cnt = 0
    lst = []
    for r in cursor:
        cnt += 1
        [dioceseID, archdID, archdName] = r
        archdName = archdName.strip()
        if dioceseID != pkey:
            lst = []
            archdData[dioceseID] = lst
            pkey = dioceseID
        lst.append([archdID, archdName])
    
    cursor.close()
    
    print("   Count:", cnt)
    
    common.writeFile(archdData, "archDData", "getArchDecData", True)
    print("...Done!\n")

def main():
    dbConnection = common.getConnection()
    doTheWork(dbConnection)
    dbConnection.close()
    
if __name__ == "__main__":
    main()