'''
Created on Jan 22, 2026

@author: Bearded Guru
'''
# this creates file DiocOrds.js which contains lists of bishops associated with each diocese

import MySQLdb
import json
import common

def doTheWork(dbConnection):
    print("Creating Diocese Person Data...")
    cursor = dbConnection.cursor()
    sql = """SELECT d.DioceseID, d.DioceseName, ot.OrdTenID, o.OrdinaryID, o.OrdinaryName
    FROM Diocese as d, Ordinary as o, OrdinaryTenure as ot
    WHERE d.DioceseID = ot.DioceseID AND ot.OrdinaryID = o.OrdinaryID AND d.DioceseID > 2
    ORDER BY d.DioceseID, o.OrdinaryName
    """
    
    cursor.execute(sql)
    diocOrdData = {}
    cnt = 0
    for r in cursor:
        cnt += 1
        [dioceseID, dioceseName, ordTenID, ordinaryID, ordinaryName] = r
        if dioceseID not in diocOrdData:
            diocOrdData[dioceseID] = []
        theList = diocOrdData[dioceseID]
        theList.append([ordTenID, ordinaryName, ordinaryID])
        
    cursor.close()
    
    print("   Count:", cnt)
    common.writeFile(diocOrdData, "DiocOrds", "getDioceseOrdinaries", True)
    print("...Done!")

def main():
    dbConnection = common.getConnection()
    doTheWork(dbConnection)
    dbConnection.close()
    
if __name__ == "__main__":
    main()