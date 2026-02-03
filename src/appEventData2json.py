'''
Created on Jan 26, 2026

@author: John Bradley
'''
# this creates file appEventData.js containing filtering data for CM appointment records

import MySQLdb
import json
import common

# https://stackoverflow.com/questions/17020224/difference-between-b-and-s-in-regular-expression#:~:text=%5Cs%20Whitespace.%20%5Cs%20on%20the%20other%20hand,match%20all%20the%20spaces%20between%20the%20words.

def buildPatronNameData(dbConnection):
    cursor = dbConnection.cursor()
    sql2 = "SELECT p.CDBAppRedID, p.GenderID, t.TitleName, p.Pat_fore, p.Pat_surn FROM CDBPatron as p, Title as t WHERE p.TitleID = t.TitleID"
    rslt = {}
    cursor.execute(sql2)
    print("...Building Patron name data")
    cnt = 0
    for r in cursor:
        cnt += 1
        [appID, genderID, titleName, patFore, patSurn] = r
        pname = ""
        sep = ""
        if patFore != "":
            pname = patFore
            sep = " "
        if patSurn != "":
            pname += sep + patSurn
        if titleName != "":
            pname += " "+titleName
        pname = pname.strip()
        if pname != "":
            if appID in rslt:
                rslt[appID] += "\n"+pname
            else:
                rslt[appID] = pname
    print("   Count:", cnt)
    cursor.close()
    return rslt

def doTheWork(dbConnection):
    print("Creating Appointment event Data...")
    nameData = buildPatronNameData(dbConnection)

    cursor = dbConnection.cursor()
    sql = """SELECT l.juriDiocese, a.OrdTenID, p.PersonID, e.OffTypeID, a.PtTypeID, a.GenderID, a.CDBAppRedID, lu.ArchdID, p.Surname, p.Forename, p.FirstYear, p.LastYear
    FROM Location as l, CCEperson as p, CMAppEvent as e, CDBappointment as a, LocUnit as lu, CMCDBLink as lk 
    WHERE e.CMAppEventKey = lk.CMEventKey AND l.locKey = e.LocKey AND a.CDBAppRedID = lk.CDBEvidKey AND lu.locUnitKey = a.locUnitKey AND l.locKey = lu.locKey AND p.PersonID = a.PersonID
    AND l.juriDiocese<>1 AND lk.CMEventTypeKey=1 AND lk.CDBEvidTypeKey=1
    ORDER BY juriDiocese, p.Surname, p.Forename, p.FirstYear, p.LastYear"""
    cursor.execute(sql)
    
    print("...Main processing begins...")
    appData = {}
    cnt = 0
    for r in cursor:
        cnt += 1
        [dioceseID, ordTenID, personID, offTypeID, ptTypeID, genderID, cdbAppRedID, archdID, surname, forename, firstYear, lastYear] = r
        if dioceseID not in appData:
            appData[dioceseID] = []
        ptext = ""
        if cdbAppRedID in nameData:
            ptext = nameData[cdbAppRedID]
        if genderID.strip() == "":
            genderID = "?"
        appData[dioceseID].append([personID, ordTenID, archdID, offTypeID, ptTypeID, genderID, ptext])
    
    cursor.close()
    
    print("   Count:", cnt)
    common.writeFile(appData, "appEventData", "getAppointmentEventData", True)
    print("...Done!")

def main():
    dbConnection = common.getConnection()
    doTheWork(dbConnection)
    dbConnection.close()
    
if __name__ == "__main__":
    main()