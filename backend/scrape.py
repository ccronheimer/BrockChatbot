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

if __name__ == "__main__":
    #athlete_table = scrapeAthleteData_gemspro()
    #print(len(athlete_table))

    #compeititors = scrapeCompetitors_nigaragames()
    #print(len(compeititors))

    #schedule = scrapeSchedule_niagaragames()
    #print(schedule)
