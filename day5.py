import os
import requests
from bs4 import BeautifulSoup

os.system("clear")

URL = "https://www.iban.com/currency-codes"
dict = {}


def extract_country():
    result = requests.get(URL)
    soup = BeautifulSoup(result.text, "html.parser")
    country = soup.select("tr>td:nth-of-type(1)")
    currency = soup.select("tr>td:nth-of-type(3)")

    for i in range(len(country)):
        if currency[i].string == None:
            pass
        else:
            dict[i+1] = [country[i].string, currency[i].string]

        try:
            print(f"# {i+1} {dict[i+1][0]}")
        except:
            pass


def user_input():
    try:
        user = int(input("#:"))
        if user in dict:
            print(
                f"You choose {dict[user][0]}\nThe currency code is {dict[user][1]}")
        else:
            print("Choose a number from the list.")
            user_input()
    except:
        print("That wasn't a number.")
        user_input()


print("Hello Please choose select a country by number")
extract_country()
user_input()
