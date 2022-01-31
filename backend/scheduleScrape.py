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

if __name__ == "__main__":
    #soup = url2Soup("https://cg2019.gems.pro/Result/ShowPerson_List.aspx?SetLanguage=en-CA")
    soup = file2Soup("F:\\Cosc 4p02\\BrockChatbot\\backend\\schedule.htm")
    table = soup.find('tbody', id = "ctl00_ctl00_ContentPlaceHolderBasicMaster_ContentPlaceHolder1_secGroup1_1_secGroup1_1_SectionContent") 


    schedual = [i.get_text() for i in table.find_all("tr")]
    schedual = [i.replace("\n","") for i in schedual]

    schedual = removeUnicodeSpace(schedual)
    print(schedual)
