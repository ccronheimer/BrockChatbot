import requests
from bs4 import BeautifulSoup


def getSoup(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')
    #print(page.text)
    return soup



if __name__ == "__main__":
    soup = getSoup("https://www.pro-football-reference.com/players/C/CutlJa00.htm")

    table = soup.find("table",id = "passing")
    tb = table.find("tbody")
    td = tb.findAll("tr")
    for row in td:
        print([dp.text for dp in row])