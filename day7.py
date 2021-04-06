import requests
from bs4 import BeautifulSoup
import csv


def save_to_file(jobs, title):
    file = open(f"{title}.csv", mode="w")
    writer = csv.writer(file)
    writer.writerow(["place", "title", "time", "pay", "date"])
    for job in jobs:
        writer.writerow(list(job.values()))
    return


def get_brand_url():
    result = requests.get("http://www.alba.co.kr")
    soup = BeautifulSoup(result.text, "html.parser")
    brands = soup.find_all("a", {"class": "brandHover"})
    links = []
    for brand in brands:
        brand_url = brand["href"]
        links.append(brand_url)
    return links


def get_last_page(url):
    result = requests.get(url)
    soup = BeautifulSoup(result.text, "html.parser")
    p = soup.find("p", {"class": "jobCount"})

    try:
        count = p.find("strong").string
        page = int(count)//50 + 1
    except:
        page = 1

    return page


def extract_jobs(last_page, url):
    jobs = []
    last_page = last_page+1
    for page in range(last_page)[1:]:
        print(f"Scrapping page{page}")
        result = requests.get(f"{url}/job/brand/?page={page}")
        soup = BeautifulSoup(result.text, "html.parser")
        results = soup.find_all("tr", {"class": ""})
        for result in results:
            # try:
            place = soup.find("td", {"class": "local"})
            if place:
                place = place.text.replace(u'\xa0', ' ')
            title = result.find("span", {"class": "company"})
            if title:
                title = title.text.strip()
                title = title.replace(u'\xa0', ' ')
            time = result.find("td", {"class": "time"})
            if time:
                time = time.text.replace(u'\xa0', ' ')
            pay = result.find("td", {"class": "pay"})
            if pay:
                pay = pay.text.replace(u'\xa0', ' ')
            date = soup.find("td", {"class": "regDate"})
            if date:
                date = date.text.replace(u'\xa0', ' ')
            jobs.append({'place': place, 'title': title,
                         'time': time, 'pay': pay, 'date': date})
            # except:
         #   pass
        print(jobs)
    #save_to_file(jobs, title)


def get_jobs():
    urls = get_brand_url()
    for url in urls:
        print(f"Scrapping {url}")
        last_page = get_last_page(url)
        extract_jobs(last_page, url)


get_jobs()
