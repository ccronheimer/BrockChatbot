from pymongo import MongoClient
import pymongo
import scrape
import pickle
## Need to pip install dnspython
CONNECTION_STRING = "mongodb+srv://dbUser:Cosc4P01@chatbot.lorgj.mongodb.net/test"

## STILL NEEDS EDGE CASES

## Establish connection to db.
def getTemplate(template):
    templates = {
        "schedule":{"time":"","sport": "","gender": "","pool": "","location": ""},
        "athletes":{"name":"","cont":"","hometown":"","type":"","sport":"","age":"","height":"","weight":""}
    }
    return templates[template].copy()


## Provide the mongodb atlas url to connect python to mongodb using pymongo
def get_database():
    return MongoClient(CONNECTION_STRING)["SummerGames"]

## Inserts into specified table. Format should be a list of dictionary.
def insertManyIntoTable(tableName,data):
    db = get_database()
    table = db[tableName]
    c=1
    cd=len(data)
    for j in data:
        template = getTemplate(tableName)
        template_keys = list(template.keys())
        for i in range(len(template_keys)):
            temp_key =template_keys[i]
            template[temp_key]=j[temp_key]

        template["key"]="".join(j.values())
        
        table.insert_one(template)
        
        print(str(c)+"/"+str(cd))
        c+=1
    ## keyGen and check
    
        
## Inserts into specified table. Format should be a list.
def insertIntoTable(tableName,data):
    db = get_database()
    table = db[tableName]
    template = getTemplate(tableName)
    template_keys = list(template.keys())
    for i in range(len(template_keys)):
        temp_key =template_keys[i]
        template[temp_key]=data[temp_key]
    template["key"]="".join(data)
    ## keyGen and check
    if checkIfExists(table,template["key"]):
        table.insert_one(template)

## Return a list of dictionaries in table.
def returnTableData(tableName):
    db = get_database()
    return [i for i in db[tableName].find()]

## Compares key to existing table to check if it exists.
def checkIfExists(table,key):
    if len(list(table.find())) > 0:
        keys = [i["key"] for i in table.find()]
        if key in keys:
            return True
    return False
    
def readPickle(file):
    with open(file, 'rb') as handle:
        b = pickle.load(handle)
    return b

if __name__ == "__main__":
    ## Example use cases:
    
    #insertManyIntoTable("athlete_sport",scrape.scrapeAthleteData_gemspro())
    #returnTableData("athlete_sport")

    ##test
    #insertIntoTable("schedule",["1","2","3","4","5"])
    
    
    # insertManyIntoTable("schedule",scrape.scrapeSchedule_niagaragames())
    # returnTableData("schedule")
    data = readPickle("data.pickle")
    
    insertManyIntoTable("athletes",data)
    #returnTableData("athletes")
    
    pass