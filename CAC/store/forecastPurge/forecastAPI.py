from os import getcwd
from os.path import isfile
import json
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
import requests

def purge():
    ano_ips_path = getcwd() + "/store/easy_antispam/ips.json"
    empty = ["12.13.14.15"]

    with open(ano_ips_path, 'w') as file:
        json.dump(empty, file, indent=4, separators=(',', ': '))
    
    print("IPs purged.")

    
def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(purge, 'interval', minutes=5)
    scheduler.start()

if __name__ == "__main__":
    purge()