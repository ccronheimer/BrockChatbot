import sched
import requests,sys
from bs4 import BeautifulSoup
import pathlib

WORKING_DIRECTORY = str(pathlib.Path().resolve())


def url2Soup(url):
    page = requests.get(url)
    return BeautifulSoup(page.text, 'html.parser')

def file2Soup(fileLocation):
    with open(fileLocation, 'r') as f:
        page = f.read()
    return BeautifulSoup(page, 'html.parser')

def file2Soup2(filelocation):
    with open(filelocation, encoding='utf8') as f:
        page = f.read()
    return BeautifulSoup(page, 'html.parser')

def removeUnicodeSpace(list):
    return [i.replace(u"\xa0",u"").strip() for i in list]

def remove_from_back(table, times):
    for i in range(times):
        table.pop()
    return None

def remove_indices(table, begin, end):
    del table [begin:end]
    return None

def scrapeAthleteData_gemspro(filename="allAthletes.htm"):
    soup = file2Soup(WORKING_DIRECTORY+"\\backend\\allAthletes.htm")
    tables = soup.find_all('table')
    athlete_and_sports_table = tables[2]

    sports_table_to_scrap = athlete_and_sports_table.find_all('div', class_=("LM_SportName"))
    athlete_table_to_scrap = athlete_and_sports_table.find_all('a')
    sports_table = []
    athlete_table = []

    for sport in sports_table_to_scrap:
        sports_table.append(sport.get_text())
    
    for athlete in athlete_table_to_scrap:
        athlete_table.append(athlete.get_text())

    remove_from_back(athlete_table,14)
    remove_indices(athlete_table,0,7)
    return athlete_table

def scrapeCompetitors_nigaragames():
    soup = url2Soup("https://niagara2022games.ca/sports/#Athletics")
    table = soup.find("div",{'class':"col-sm-12 col-lg-9"}) 
    Athletes = [i.get_text() for i in table.find_all("li")]
    Athletes = removeUnicodeSpace(Athletes)
    return Athletes

def scrapeSchedule_niagaragames():
    soup = file2Soup(WORKING_DIRECTORY+"\\backend\\schedule.htm")
    table = soup.find('tbody', id = "ctl00_ctl00_ContentPlaceHolderBasicMaster_ContentPlaceHolder1_secGroup1_1_secGroup1_1_SectionContent") 
    schedule = [i.get_text() for i in table.find_all("tr")]
    stringSchedule="".join(schedule)
    schedule= stringSchedule.split("\n")
    schedule = [i for i in schedule if i]
    return schedule

def scrape_general_info():
    soup_wiki = file2Soup2("C:\\Users\\Yujie\\OneDrive\\Desktop\\Computer Science\\COSC 4P02\\BrockChatbot\\backend\\canadaGamesWiki.htm")
    wiki_info_box = soup_wiki.find_all('p')
    wiki_info = [i.get_text() for i in wiki_info_box]
    #First 2 indices of info holds the most important information
    #print(wiki_info[0] + wiki_info[1])

    soup_FAQ = file2Soup2("C:\\Users\\Yujie\\OneDrive\\Desktop\\Computer Science\\COSC 4P02\\BrockChatbot\\backend\\canadaGamesFAQ.htm")
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

if __name__ == "__main__":
    scrape_general_info()
    #athlete_table = scrapeAthleteData_gemspro()
    #print(len(athlete_table))

    #compeititors = scrapeCompetitors_nigaragames()
    #print(len(compeititors))

    #schedule = scrapeSchedule_niagaragames()
    #print(schedule)
    pass
