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

if __name__ == "__main__":
    #soup = url2Soup("https://cg2022.gems.pro/Result/Calendar.aspx?SetLanguage=en-CA&Grouping=D")
    soup = file2Soup(WORKING_DIRECTORY+"\\backend\\schedule.htm")
    table = soup.find('tbody', id = "ctl00_ctl00_ContentPlaceHolderBasicMaster_ContentPlaceHolder1_secGroup1_1_secGroup1_1_SectionContent") 

    schedual = [i.get_text() for i in table.find_all("tr")]
    stringSchedual="".join(schedual)
    schedual= stringSchedual.split("\n")
    schedual = [i for i in schedual if i]
    #schedual = [i.replace("\n"," ") for i in schedual]
    #schedual = [i.replace("|","") for i in schedual]
    #schedual = [i.replace("-","") for i in schedual]
    print(schedual)
