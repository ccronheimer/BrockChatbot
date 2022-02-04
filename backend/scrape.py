import requests,sys
from bs4 import BeautifulSoup


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

if __name__ == "__main__":
    #soup = url2Soup("https://cg2019.gems.pro/Result/ShowPerson_List.aspx?SetLanguage=en-CA")
    soup = file2Soup("C:\\Users\\Yujie\\OneDrive\\Desktop\\Computer Science\\COSC 4P02\\BrockChatbot\\backend\\allAthletes.htm")
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
    print(athlete_table)
    #athletes_sports = [i.get_text() for i in tables.find_all("td")]

    #athletes_sports = removeUnicodeSpace(athletes_sports)
    #print(athletes_sports)
