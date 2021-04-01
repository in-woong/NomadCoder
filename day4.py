import requests
import os


def get_URL():
    print("Welcome to ISItDown.py!")
    print("Please write a URL of URLS you want to check.(separated by comma)")
    urls = input().split(',')
    for url in urls:
        name = url.strip()
        if ".com" not in name:
            print(f"{name} is not a valid URL")
            reset()
        elif "http://" not in name:
            name = "http://" + name
        try:
            req = requests.get(name)
            if req.status_code == 200:
                print(f"{name} is up!")
            else:
                print(f"{name} is down!")

        except:
            print(f"{name} is down!")
    reset()


def reset():
    print("Do you want to start over? [y/n]")
    answer = input()
    if answer == "y":
        os.system('clear')
        get_URL()
    elif answer == "n":
        print("k bye!")
        exit()
    else:
        print("That's not a valid answer")
        reset()


def init():
    os.system('clear')
    get_URL()


init()
