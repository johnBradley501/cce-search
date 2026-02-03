'''
Created on Jan 16, 2026

@author: John Bradley
'''
# this creates file countyPers.js which lists person IDs of persons associated with each county
import MySQLdb
import json
import common

def doTheWork(dbConnection):
    print("Creating County to Persons Data...")
    cursor = dbConnection.cursor()
    sql = """SELECT c.countyKey, c.countyName, p.PersonID, p.Surname, p.Forename, p.FirstYear, p.LastYear, Count(lu.locUnitKey) AS Occurrences
    FROM County as c, CCEPerson as p, LocCounty as lc, locUnit as lu, PersonEvid as pe
    WHERE c.countyKey = lc.countyKey AND lc.locKey = lu.locKey AND lu.locUnitKey = pe.locUnitKey AND p.PersonID = pe.PersonID
    GROUP BY c.countyKey, c.countyName, p.PersonID, p.Surname, p.Forename, p.FirstYear, p.LastYear
    HAVING c.countyKey<>1
    ORDER BY c.countyKey, p.Surname, p.Forename, p.FirstYear, p.LastYear"""
    cursor.execute(sql)
    
    print("Processing starts")
    countyData = {}
    cnt = 0;
    for r in cursor:
        cnt += 1
        [countyKey, countyName, PersonID, Surname, Forename, FirstYear, LastYear, occurrences] = r
        if countyKey not in countyData:
            countyData[countyKey] = []
        if PersonID not in countyData[countyKey]:
            countyData[countyKey].append(PersonID)
    
    cursor.close();
    
    print("   Count:", cnt)
    common.writeFile(countyData, "countyPers", "getCountyPersons", True)
    print("...Done!")
    
def main():
    dbConnection = common.getConnection()
    doTheWork(dbConnection)
    dbConnection.close()
    
if __name__ == "__main__":
    main()