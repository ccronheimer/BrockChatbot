from pymongo import MongoClient
import pymongo
import scrape

## Need to pip install dnspython
CONNECTION_STRING = "mongodb+srv://dbUser:Cosc4P01@chatbot.lorgj.mongodb.net/test"

## Establish connection to db.
def getTemplate(template):
    templates = {
        "schedule":{"time":"","sport": "","gender": "","pool": "","location": ""},
        "athlete_sport":{"athlete":"","sport":""}
    }
    return templates[template].copy()


## Provide the mongodb atlas url to connect python to mongodb using pymongo
def get_database():
    try:
        client = MongoClient(CONNECTION_STRING, connect=False)
        print("Connected Successfully.")
    except:
        print("Connection Failed.")
  
    return client["SummerGames"]

## Inserts into specified table. Format should be a list of dictionary.
def insertManyIntoTable(tableName,data):
    db = get_database()
    table = db[tableName]
    
    template = getTemplate(tableName)
    template_keys = list(template.keys())
    input = []
    for i in range(len(data)):
        input.append({j:data[i][template_keys.index(j)] for j in template_keys})

    res = []
    ## keyGen and check
    for i in range(len(input)):
        input[i]["key"]="".join(data[i])
        if checkIfExists(table,input[i]["key"])==False:
            res.append(input[i])
    if len(res)>0:
        table.insert_many(res)
        print("inserted "+len(res)+" records successfully.")

## Inserts into specified table. Format should be a list.
def insertIntoTable(tableName,data):
    db = get_database()
    table = db[tableName]
    template = getTemplate(tableName)
    template_keys = list(template.keys())
    for i in range(len(template_keys)):
        template[template_keys[i]]=data[i]
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
    

if __name__ == "__main__":
    ## Example use cases:
    
    #insertManyIntoTable("athlete_sport",scrape.scrapeAthleteData_gemspro())
    #returnTableData("athlete_sport")

    #insertManyIntoTable("schedule",scrape.scrapeSchedule_niagaragames())
    #returnTableData("schedule")

    
    pass