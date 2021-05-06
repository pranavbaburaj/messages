import requests

url = 'http://localhost:5000/register?username=edwed&password=keofer&email=eodewdw'
headers = {
  'Content-Type': 'application/json'
}
data = "{\n  \"data\": \"0\"\n}"
response = requests.request(
  'POST',
  'http://localhost:5000/register?username=edwed&password=keofer&email=eodewdw',
  data=data,
  headers=headers,
)

print(response)