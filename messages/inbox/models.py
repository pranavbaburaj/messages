from django.db import models

# Create your models here.

class Messages(models.Model):
    from_person = models.TextField()
    to_person = models.TextField()
    read = models.TextField()
    title = models.TextField()
    body = models.TextField()
    time = models.TextField()

    def __repr__(self):
        return "Success"


