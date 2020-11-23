import time
import subprocess
import select
import requests
import json

filename = "/var/log/apache2/access.log"

f = subprocess.Popen(['tail','-F',filename],\
        stdout=subprocess.PIPE,stderr=subprocess.PIPE)
p = select.poll()
p.register(f.stdout)


url ="http://localhost:3000/"

while True:
    if p.poll(1):
        try:
            data = f.stdout.readline()
            resp = requests.post(url, data=data)
            print(resp.text)
        except:
            print("Exception occurred")

