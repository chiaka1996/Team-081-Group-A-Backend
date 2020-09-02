
from django.db import models

from django.contrib.auth.models import User


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    city = models.CharField(max_length=60)
    state = models.CharField(max_length=60)
    level = models.CharField(max_length=60)

    def __str__(self):
        return "<Student: {}>".format(self.first_name)
