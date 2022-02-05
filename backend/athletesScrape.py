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
    #soup = url2Soup("https://niagara2022games.ca/sports/#Athletics")
    soup = file2Soup(WORKING_DIRECTORY+"\\backend\\athletes.htm")
    table = soup.find("div",{'class':"col-sm-12 col-lg-9"}) 
    #table = soup.find("article") 
    #Athletes = list(table.descendants)

    Athletes = [i.get_text() for i in table.find_all("li")]
    #Athletes = [i.replace("\n"," ") for i in Athletes]
    #Athletes = [i.replace("|","") for i in Athletes]
    #Athletes = [i.replace("-","") for i in Athletes]

    Athletes = removeUnicodeSpace(Athletes)
    print(Athletes)
