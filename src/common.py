'''
Created on Jan 30, 2026

@author: John Bradley
'''
import MySQLdb
import json

# change the following line to point to the location where the connection.json file for MySQL is kept
db_credentials = "c:/usr/local/etc/mysql/connection.json"
# this line specifies which credential set in the credential file is to be used
dbName = "cce"

def getConnection():
    infile = open(db_credentials, "r",encoding='utf-8')
    cred = json.loads(infile.read())
    infile.close()
    cdata = cred[dbName]
    return MySQLdb.connect(cdata["host"], cdata["user"], cdata["password"], cdata["db"])

# change the following line to specify where the output JSON file is to be put
# This is usually in the site/search/data directory
workdir = "D:/data/workspace/cce-search/site/search/data/"

def openFile(theFileName):
    outputFileName = workdir+theFileName+".js"
    return open(outputFileName, "w",encoding='utf-8')
    

def writeFile(theJson, theFileName, theFunctionName, export=False, theIndent=None):
    outfile = openFile(theFileName)
    print("   writing file:", theFileName+".js")
    functDef = ''
    if export:
        functDef = "export function "+theFunctionName+"(){ return "
    else:
        functDef = "function "+theFunctionName+"(){ return "
    outfile.write(functDef)
    outfile.write(json.dumps(theJson, indent=theIndent)) # , indent=4))
    outfile.write("\n; }")
    outfile.close()
