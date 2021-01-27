@ECHO OFF
cls & python messages/manage.py makemigrations 
python messages/manage.py migrate 