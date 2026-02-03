'''
Created on Jan 17, 2026

@author: John Bradley
'''
# this creates lists of items to be used to display fixed dropdowns (that are always the same):
#    they are Offices, Clerical status, Patronage Type and Patron Gender

import MySQLdb
import json
import common

def createSimpleList(dbConnection, outfile, sql, fname):
    cursor = dbConnection.cursor()
    cursor.execute(sql)

    theList = []
    cnt = 0;
    for r in cursor:
        cnt += 1
        [name, key] = r
        theList.append([key, name])
    cursor.close()
    print("   Count:",cnt)
    if fname == "getGenderList":   # JD: I know... A clunky hack
        theList.append(["?", "Unspecified"])
    outfile.write("function "+fname+"(){ return ")
    outfile.write(json.dumps(theList)) # , indent=4))
    outfile.write("; }\n\n")

def createOfficeList(dbConnection, outfile):
    print("Doing Office Types")
    sql = """SELECT OfficeName, OffTypeID from OfficeType WHERE OffTypeID <> 1 ORDER BY OfficeName"""
    createSimpleList(dbConnection, outfile, sql, "getOfficeList")


def createPatronageTypeList(dbConnection, outfile):
    print("Doing PatronageTypes")
    sql = """SELECT Pat_Type, PtTypeID from PatronType WHERE PtTypeID <> 1 ORDER BY Pat_Type"""
    createSimpleList(dbConnection, outfile, sql, "getPatronageTypeList")
    
def createPatronageGenderList(dbConnection, outfile):
    print("Doing Patronage Genders")
    sql = """SELECT GenderName, GenderID from Gender WHERE GenderID != "" ORDER BY GenderName"""
    createSimpleList(dbConnection, outfile, sql, "getGenderList")

def createClericalStatusList(dbConnection, outfile):
    # attempts to fix missing ordering values in Cl_rder
    print("Doing Clerical Status")
    sql = """SELECT ClStatID, Cler_Stat, cl_Order FROM Clerical_status WHERE ClStatID <> 1"""
    cursor = dbConnection.cursor()
    cursor.execute(sql)

    theList = []
    cnt = 0;
    for r in cursor:
        cnt += 1
        theList.append(list(r))
    cursor.close()
    
    byName = {}
    for itm in theList:
        byName[itm[1]] = itm
    names = list(byName)
    names.sort()
    
    ordr = 20
    byOrder = {}
    for nm in names:
        itm = byName[nm]
        if itm[2] == 0 or itm[2] == None:
            itm[2] = ordr
            ordr += 1
        byOrder[itm[2]] = itm 
    orders = list(byOrder)
    orders.sort()
    
    rslt = []
    for ordr in orders:
        rslt.append(byOrder[ordr][:2])
    print("   Count: ",cnt)
    outfile.write("function getClericalStatuses(){ return ")
    outfile.write(json.dumps(rslt)) # , indent=4))
    outfile.write("; }\n\n")
   
def doTheWork(dbConnection):
    print("Creating Fixed List Data...")
    outfile = common.openFile("fixedLists")
    createOfficeList(dbConnection, outfile)
    createClericalStatusList(dbConnection, outfile)
    createPatronageTypeList(dbConnection, outfile)
    createPatronageGenderList(dbConnection, outfile)

    outfile.close()
    print("   file completed: fixedLists.js")
    print("...Done!")
    
def main():
    dbConnection = common.getConnection()
    doTheWork(dbConnection)
    dbConnection.close()
    
if __name__ == "__main__":
    main()