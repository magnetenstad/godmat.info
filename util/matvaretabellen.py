import json
import requests

url = 'https://matvaretabellen.no/api/foods?&version=75'

print("Fetching data..")
r = requests.get(url)
print("Converting to json..")
data = json.loads(r.content)
foods = data["foods"]
print(f"Got {len(foods)} foods from matvaretabellen.no")
print("Optimizing..")

for i, food in enumerate(foods):
    newFood = {}
    newFood["nutrition"] = food
    foods[i] = newFood

    for key in (
            "groupId",
            "id",
            "name",
            "slug",
            "synonym"
            ):
        newFood[key] = food[key]
        del food[key]

    newFood["groupId"] = int(newFood["groupId"].split('.')[0])

    for key in (
            "sortName",
            "additionalInfo",
            "latinFamilyName",
            "latinName",
            "latinAuthor",
            "langualCodes"
            ):
        del food[key]
    
    for key, value in food.items():
        if type(value) == dict:
            food[key] = value["value"]
    for key, value in food.items():
        try:
            food[key] = float(value)
        except:
            pass
    
print("Writing to file..")
with open("static/matvaretabellen.json", "w") as file:
    json.dump(data, file, indent=2)
print("Success!")
