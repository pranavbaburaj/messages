from django.db import models

# Create your models here.

class Users(models.Model):
    name = models.TextField()
    username = models.TextField()
    password = models.TextField()

    def __repr__(self):
        return "Saved successfully"