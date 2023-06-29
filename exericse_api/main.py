import requests
from dotenv import load_dotenv
import os
import json

load_dotenv()

urls = [
        "https://exercisedb.p.rapidapi.com/exercises",
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        "https://exercisedb.p.rapidapi.com/exercises/targetList",
        "https://exercisedb.p.rapidapi.com/exercises/equipmentList"
      ]

OUTPUT_DIR = "../workout-client/assets/data/"
MEDIA_DIR = OUTPUT_DIR + "media/"
headers = {
	"X-RapidAPI-Key": os.getenv("API_KEY"),
	"X-RapidAPI-Host": os.getenv("HOST"),
}

def fetchList():
  for url in urls:
    response = requests.get(url, headers=headers)
    filename = url.split("/")[-1]
    with open(f"{OUTPUT_DIR}/{filename}.json", "w") as f:
      jsonObj = json.dumps(response.json(), indent = 2)
      f.write(jsonObj)

#fetchList()


def fetchGifs():
  gifUrl = urls[0]
  res = requests.get(gifUrl, headers=headers).json() 
  for item in res: 
    imgURL = item.get("gifUrl")
    if imgURL:
      image = requests.get(imgURL, allow_redirects=True)
      if image.status_code < 300: 
        with open(f"{MEDIA_DIR}/{item['id']}.gif", "wb") as f:
          f.write(image.content)
      else:
        print("Cant find file " + imgURL)

# fetchGifs()


def addRequires():
  with open(f"{OUTPUT_DIR}/exercises_orig.json", "r") as f:
    data = json.load(f)
    for obj in data: 
      obj["imgSrc"] = f"require('../../assets/data/media/{obj['id']}.gif')"
    with open(f"{OUTPUT_DIR}/exercises.json", "w") as f2:        
      jsonObj = json.dumps(data, indent = 2)
      f2.write(jsonObj)

addRequires()
       

