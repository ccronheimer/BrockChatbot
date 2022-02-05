def get_database():
    from pymongo import MongoClient
    import pymongo

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://dbUser:Cosc4P01@chatbot.lorgj.mongodb.net/test"

   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    try:
        client = MongoClient(CONNECTION_STRING, connect=False)
        print("Connected Successfully.")
    except:
        print("Connection Failed.")


    # Create the database for our example (we will use the same database throughout the tutorial
    return client["SummerGames"]


def split_games(games):
    for i in range(0, len(games), 5):
        yield games[i:i + 5]

# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":
    # Get the database
    dbname = get_database()

    collection_name = dbname["Games"]

    
    #Array list of all scraped data
    games = ['09:00', 'Tennis', 'Team Mix', 'Preliminary Pool A - Tie 01', 'Niagara-on-the-Lake Tennis Club', '09:00', 'Tennis', 'Team Mix', 'Preliminary Pool B - Tie 02', 'Niagara-on-the-Lake Tennis Club', '10:00', 'Baseball', 'Male', 'Preliminary | Pool A  - Game 1 - ON vs SK', 'Welland Baseball Stadium', '10:00', 'Baseball', 'Male', 'Preliminary | Pool A  - Game 2 - BC vs NS', 'Oakes Park', '10:00', 'Softball', 'Female', 'Preliminary | Pool A - Game 1 - BC vs PE', 'Southward Community Park', '11:00', 'Box Lacrosse', 'Female', 'Preliminary | Pool B - Game 01', 'Canada Games Park', '11:00', 'Box Lacrosse', 'Female', 'Preliminary | Pool B - Game 02', 'Canada Games Park', '11:00', 'Softball', 'Female', 'Preliminary | Pool B - Game 2 - NB vs NL', 'Southward Community Park', '12:00', 'Softball', 'Female', 'Preliminary | Pool B - Game 3 - AB vs QC', 'Southward Community Park', '13:00', 'Baseball', 'Male', 'Preliminary | Pool B - Game 3 - NB vs QC', 'Welland Baseball Stadium', '13:00', 'Baseball', 'Male', 'Preliminary | Pool B - Game 4 - AB vs PE', 'Oakes Park', '13:00', 'Softball', 'Female', 'Preliminary | Pool A - Game 4 - NS vs SK', 'Southward Community Park', '13:00', 'Swimming', '1500m Freestyle Female', 'Timed Final - Timed Final 1', 'Brock University-Eleanor Misener Aquatics Centre', '13:00', 'Swimming', '800m Freestyle Male', 'Timed Final - Timed Final 1', 'Brock University-Eleanor Misener Aquatics Centre', '14:00', 'Box Lacrosse', 'Female', 'Preliminary | Pool A - Game 03', 'Canada Games Park', '14:00', 'Box Lacrosse', 'Female', 'Preliminary | Pool A - Game 04', 'Canada Games Park', '14:00', 'Softball', 'Female', 'Preliminary | Pool B - Game 5 - NB vs ON', 'Southward Community Park', '14:00', 'Swimming', '200m (S1-5,S14) / 400m (S6-13) Freestyle Para Female', 'Timed Final - Timed Final 1 - 200m (S1-5, S14)', 'Brock University-Eleanor Misener Aquatics Centre', '14:00', 'Tennis', 'Team Mix', 'Preliminary Pool A - Tie 04', 'Niagara-on-the-Lake Tennis Club', '14:00', 'Tennis', 'Team Mix', 'Preliminary Pool B - Tie 05', 'Niagara-on-the-Lake Tennis Club', '14:00', 'Tennis', 'Team Mix', 'Preliminary Pool C - Tie 03', 'Welland Tennis Club', '14:10', 'Swimming', '200m (S1-5,S14) / 400m (S6-13) Freestyle Para Male', 'Timed Final - Timed Final 1 - 200m (S1-5, S14)', 
'Brock University-Eleanor Misener Aquatics Centre', '14:20', 'Swimming', '200m (S1-5,S14) / 400m (S6-13) Freestyle Para Female', 'Timed Final - Timed Final 1 - 400m (S6-13)', 'Brock University-Eleanor Misener Aquatics Centre', '14:30', 'Swimming', '200m (S1-5,S14) / 400m (S6-13) Freestyle Para Male', 'Timed Final - Timed Final 1 - 400m (S6-13)', 'Brock University-Eleanor Misener Aquatics Centre', '15:00', 'Swimming', '4 x 200m Freestyle Relay Female', 'Timed Final  - Timed Final 1', 'Brock University-Eleanor Misener Aquatics Centre', '15:00', 'Swimming', '4 x 200m Freestyle Relay Male', 'Timed Final - Timed Final 1', 'Brock University-Eleanor Misener Aquatics Centre', '16:00', 'Baseball', 'Male', 'Preliminary | Pool A  - Game 5 - NS vs SK', 'Welland Baseball Stadium', '16:00', 'Baseball', 'Male', 'Preliminary | Pool B - Game 6 - MB vs NL', 'Oakes Park', '16:00', 'Soccer', 'Male', 'Preliminary | Pool A - Game 1', 'Youngs Sportsplex', '16:00', 'Soccer', 'Male', 'Preliminary | Pool B - Game 2', 'Youngs Sportsplex', '16:15', 'Softball', 'Female', 'Preliminary | Pool A - Game 6 - BC vs MB', 'Southward Community Park', '17:00', 'Box Lacrosse', 'Female', 'Preliminary | Pool B - Game 05', 'Canada Games Park', '18:30', 'Softball', 'Female', 'Preliminary | Pool B - Game 7 - AB vs NL', 'Southward Community Park', '19:00', 'Baseball', 'Male', 'Preliminary | Pool A  - Game 7 - BC vs ON', 'Welland Baseball Stadium', '19:00', 'Soccer', 'Male', 'Preliminary | Pool C - Game 3', 'Youngs Sportsplex', '19:00', 'Soccer', 'Male', 'Preliminary | Pool D - Game 4', 'Youngs Sportsplex']

    #create a new list of the games split into their own arrays
    items = list(split_games(games))

    #counter for indexing id's
    id_counter = 0
   
    #traverse data, create item and add to db
    for i in range(0, len(items)):
        string = str(id_counter).zfill(4)
        item = {
            "_id": string,
            "time": items[i][0],
            "sport": items[i][1],
            "gender": items[i][2],
            "pool": items[i][3],
            "location": items[i][4]
        }
        id_counter += 1
        try:
            collection_name.insert_one(item)
        except:
            print("Id:"+string+" has already been added")
        
        