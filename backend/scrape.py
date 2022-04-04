import sched
import requests,sys
from requests_html import HTMLSession
import pickle
session = HTMLSession()

from bs4 import BeautifulSoup
import pathlib

WORKING_DIRECTORY = str(pathlib.Path().resolve())


## Returns the soup of a url

def url2Soup(url):
    session = HTMLSession()
    page = session.get(url)
    page.html.render(sleep=3.5)
    return BeautifulSoup(page.html.raw_html, 'html.parser')

## Returns the soup of an html file
def file2Soup(fileLocation):
    with open(fileLocation, 'r') as f:
        page = f.read()
    return BeautifulSoup(page, 'html.parser')

## Returns the soup of an html file with utf8 encoding
def file2Soup_utf(filelocation):
    with open(filelocation, encoding='utf8') as f:
        page = f.read()
    return BeautifulSoup(page, 'html.parser')

def grabEveryN_fromList(list,n):
    return [list[i*n:i*n+n] for i in range(int(len(list)/n))]

## Remove all trailing spaces from list items and space unicodes
def removeUnicodeSpace(list):
    return [i.replace(u"\xa0",u"").strip() for i in list]

## Returns scraped player+sport data from gemspro 2019 html for testing pruposes
## Scraped from https://cg2019.gems.pro/Result/ShowPerson_List.aspx?SetLanguage=en-CA
def scrapeAthleteData_gemspro(filename="allAthletes.htm"):
    soup = file2Soup_utf(WORKING_DIRECTORY+"\\backend\\allAthletes.htm")
    table = soup.find('table',id="ctl00_ContentPlaceHolder1_tblParticipant") 
    athletes_sports = [i.get_text() for i in table.find_all("td")]
    athletes_sports = removeUnicodeSpace(athletes_sports)
    athletes_sports = grabEveryN_fromList(athletes_sports,2)
    return athletes_sports

## Scraped from https://niagara2022games.ca/sports/#Athletics
def scrapeCompetitors_nigaragames():
    soup = url2Soup("https://niagara2022games.ca/sports/#Athletics")
    table = soup.find("div",{'class':"col-sm-12 col-lg-9"}) 
    Athletes = [i.get_text() for i in table.find_all("li")]
    Athletes = removeUnicodeSpace(Athletes)
    return Athletes

## Scraped from https://cg2019.gems.pro/Result/MedalList.aspx?SetLanguage=en-CA
def medalStandings_nigaragames():
    soup = url2Soup("https://cg2019.gems.pro/Result/MedalList.aspx?SetLanguage=en-CA")
    table = soup.find("td",{'class':"LM_MasterPageDataCell"}) 
    Medal = [i.get_text() for i in table.find_all("tr")]
    Medal = removeUnicodeSpace(Medal)
    return Medal

## Return the schedule on niagara games website.
## Scraped from https://cg2022.gems.pro/Result/Calendar.aspx?SetLanguage=en-CA&Grouping=D&Gems_ScreenWidth=1920&Gems_ScreenHeight=1080&Gems_ScreenAvailWidth=1920&Gems_ScreenAvailHeight=1080
def scrapeSchedule_niagaragames():
    soup = file2Soup_utf(WORKING_DIRECTORY+"\\backend\\schedule.htm")
    table = soup.find('tbody', id = "ctl00_ctl00_ContentPlaceHolderBasicMaster_ContentPlaceHolder1_secGroup1_1_secGroup1_1_SectionContent") 
    schedule = [i.get_text() for i in table.find_all("tr")]
    stringSchedule="".join(schedule)
    schedule= stringSchedule.split("\n")
    schedule = [i for i in schedule if i]
    schedule = grabEveryN_fromList(schedule,5)
    

    return schedule

def scrape_general_info():
    soup_wiki = file2Soup_utf("C:\\Users\\Yujie\\OneDrive\\Desktop\\Computer Science\\COSC 4P02\\BrockChatbot\\backend\\canadaGamesWiki.htm")
    wiki_info_box = soup_wiki.find_all('p')
    wiki_info = [i.get_text() for i in wiki_info_box]
    #First 2 indices of info holds the most important information
    #print(wiki_info[0] + wiki_info[1])

    soup_FAQ = file2Soup_utf("C:\\Users\\Yujie\\OneDrive\\Desktop\\Computer Science\\COSC 4P02\\BrockChatbot\\backend\\canadaGamesFAQ.htm")
    cg_containers = soup_FAQ.find_all('div', class_=('cg-container'))
    FAQ = []
    for cg_container in cg_containers:
        FAQ = FAQ + cg_container.find_all('div', attrs={'data-w-id' : True})
    FAQ_results = [i.get_text() for i in FAQ]
    #Index 5 and 7 holds info not from wiki page in general FAQ page
    #print(FAQ_results[5] + FAQ_results[7])

    general_info = wiki_info[0] + wiki_info[1] + FAQ_results[5] + FAQ_results[7]
    print(general_info)
    return general_info

def live_countdown_update():
    soup = url2Soup("https://niagara2022games.ca/")
    table = soup.find('ul', class_ = "pb-5 px-5 mb-5 m-0") 
    count_down = [i.get_text() for i in table.find_all("span")]
    return count_down

def getPlayerLinks(file):
    soup = file2Soup_utf(WORKING_DIRECTORY+"\\backend\\"+file)
    return ["https://cg2019.gems.pro/Result/"+link.get("href") for link in soup.findAll("a") if link.get("href") != None and "ShowPerson.aspx" in link.get("href")]


def grabPlayerData(url):
    try:
        soup = url2Soup(url)
        name = soup.find("span", id="txtPersonNameFML").getText()
        cont = soup.find("span", id="txtContingent").getText()
        if soup.find("span", id="txtHomeTown") != None:
            hometown = soup.find("span", id="txtHomeTown").getText()
        else:
            hometown = "NA"
        type = soup.find("span", id="txtParticipantTypeName").getText()
        sport = soup.find("span", id="txtSportName").getText()


        if soup.find("span", id="txtAge") != None:
            age = soup.find("span", id="txtAge").getText()
        else:
            age = "NA"
        if soup.find("span", id="txtHeight") != None:
            height = soup.find("span", id="txtHeight").getText()
        else:
            height = "NA"
        if soup.find("span", id="txtWeight") != None:
            weight = soup.find("span", id="txtWeight").getText()
        else:
            weight = "NA"


        return {"name":name,
        "cont":cont,
        "hometown":hometown,
        "type":type,
        "sport":sport,
        "age":age,
        "height":height,
        "weight":weight
        }
    except:
        pass

def writeToPickle(data,file):
    with open(file, 'wb') as handle:
        pickle.dump(data, handle, protocol=pickle.HIGHEST_PROTOCOL)

def readPickle(file):
    with open(file, 'rb') as handle:
        b = pickle.load(handle)
    return b
if __name__ == "__main__":
    ## Example use cases:

    # players = getPlayerLinks("allAthletes.htm")
    # print(len(players))
    
    
    # for player in players:
    #     print(str(players.index(player)+1)+"/"+str(len(players)))
    #     res = grabPlayerData(player)

    #     try:
    #         l = readPickle("data.pickle")
    #     except:
    #         l = []
    #     l.append(res)
    #     writeToPickle(l,"data.pickle")
        
    print(readPickle("data.pickle"))

    
    

    #scrape_general_info()

    #athlete_table = scrapeAthleteData_gemspro()
    #print(athlete_table)

    #medal = medalStandings_nigaragames()
    #print(medal)

    #compeititors = scrapeCompetitors_nigaragames()
    #print(compeititors)

    #count_down = live_countdown_update()
    #print(count_down)

    # athletes = atheleteAndSportList()
    # print(athletes)

    #schedule = scrapeSchedule_niagaragames()
    #print(schedule)
    pass
