import requests
import json
import hashlib
from getpass import getpass

secret = None
address= '10.0.0.69:9877'
hashed = None

def get_ses():
    global hashed
    if secret is None:
        print("You need to enter the secret first")
        return False
    else:
        r = requests.get("http://"+address+"/ses")
        print(r.status_code, r.reason)
        b = json.loads(r.text)
        #print(b['data'])
        ses = b['data']
        hashed = hashlib.sha512(str(ses).encode('utf-8')+str(secret).encode('utf-8')).hexdigest()
        return True

def get_status():
    r = requests.get("http://"+address+"/")
    print(r.status_code, r.reason)
    try:
        b = json.loads(r.text)
        print(b)
    except:
        print("no json")

def turn_on():
    if get_ses():
        #print(hashed)
        r = requests.post("http://"+address+"/start", data={'data': hashed})
        print(r.status_code, r.reason)
        try:
            b = json.loads(r.text)
            print(b)
        except:
            print("no json")
    else:
        print("failed to get session")

def turn_off():
    if get_ses():
        #print(hashed)
        r = requests.post("http://"+address+"/stop", data={'data': hashed})
        print(r.status_code, r.reason)
        try:
            b = json.loads(r.text)
            print(b)
        except:
            print("no json")
    else:
        print("failed to get session")

def restart():
    if get_ses():
        #print(hashed)
        r = requests.post("http://"+address+"/restart", data={'data': hashed})
        print(r.status_code, r.reason)
        try:
            b = json.loads(r.text)
            print(b)
        except:
            print("no json")
    else:
        print("failed to get session")


def print_menu():
    print(30 * "-" , "MENU" , 30 * "-")
    print("1. Start")
    print("2. Stop")
    print("3. Enter secret")
    print("4. get status")
    print("5. restart")
    print("6. Exit")
    print(67 * "-")

loop=True
while loop:
    print_menu()
    choice = input("Enter your choice [1-6]: ")
    print("\n"*5)
    if choice=='1':
        turn_on()
    elif choice=='2':
        turn_off()
    elif choice=='3':
        secret = getpass()
    elif choice=='4':
        get_status()
    elif choice=='5':
        restart()
    elif choice=='6':
        exit(0)
    else:
        print("wrong input")
    print("\n"*5)