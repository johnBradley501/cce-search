'''
Created on Dec 30, 2025

@author: John Bradley
'''
# this creates file Location1.js which contains a JSON object containing names of CCE locations
import MySQLdb
import json
import common

def doTheWork(dbConnection):
    print("Creating Location Lists...")
    cursor = dbConnection.cursor()
    sql = "SELECT d.DioceseID, d.DioceseName, l.locKey, l.displayName FROM Diocese as d, Location as l WHERE d.DioceseID = l.juriDiocese ORDER BY d.DioceseID, l.displayName"
    cursor.execute(sql)

    locData = {}
    pkey = 0;
    cnt = 0
    lst = []
    for r in cursor:
        cnt += 1
        [dioceseID, dioceseName, locKey, locName] = r
        if locName != "":
            if dioceseID != pkey:
                lst = []
                locData[dioceseID] = lst
                pkey = dioceseID
            lst.append([locKey, locName])

    cursor.close()

    print("   Count:", cnt)
    common.writeFile(locData, "location1", "getLocationData")
    print("...Done!")

def main():
    dbConnection = common.getConnection()
    doTheWork(dbConnection)
    dbConnection.close()
    
if __name__ == "__main__":
    main()
