'''
Created on Jan 23, 2026

@author: John Bradley
'''
import MySQLdb
import json
import common
# this creates file ordEventData.js containing filtering data for CM ordination records

def doTheWork(dbConnection):
    print("Creating Ordination event Data...")
    cursor = dbConnection.cursor()
    sql = """SELECT p.PersonID, cs.ClStatID, cs.Cler_Stat, e.OrdTenID, d.DioceseID, ot.ArchdID, d.DioceseName, o.OrdinaryName, p.Surname, p.Forename, p.FirstYear, p.LastYear
    FROM CCEPerson as p, CMPerson as cmp, Clerical_Status as cs, CMOrdEvent as e, Diocese as d, Ordinary as o, OrdinaryTenure as ot
    WHERE e.CMPersonKey = cmp.CMPersonKey AND p.PersonID = cmp.PersonID AND e.ClStatID = cs.ClStatID AND e.OrdTenID = ot.OrdTenID AND
    d.DioceseID = ot.DioceseID AND o.OrdinaryID = ot.OrdinaryID AND d.DioceseID <> 1
    ORDER BY d.DioceseID, p.Surname, p.Forename, p.FirstYear, p.LastYear
    """
    cursor.execute(sql)
    
    print("Processing begins...")
    ordData = {}
    cnt = 0
    for r in cursor:
        cnt += 1
        [personID, clStatID, clerStat, ordTenID, dioceseID, archdID, dioceseName, ordinaryName, surname, forename, firstYear, lastYear] = r
        if dioceseID not in ordData:
            ordData[dioceseID] = []
        ordData[dioceseID].append([personID, ordTenID, archdID, clStatID])
    
    cursor.close()
    
    print("   Count:", cnt)
    common.writeFile(ordData, "ordEventData", "getOrdinationEventData", True)
    print("...Done!")

def main():
    dbConnection = common.getConnection()
    doTheWork(dbConnection)
    dbConnection.close()
    
if __name__ == "__main__":
    main()    