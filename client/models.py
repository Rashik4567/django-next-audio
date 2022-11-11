from django.db import models

from django.contrib.auth import get_user_model

# Create your models here.


class Song(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    song = models.FileField(upload_to='songs/', null=True)
    uploader = models.ForeignKey(
        get_user_model(), null=True, blank=True, on_delete=models.SET_NULL)
    album = models.ImageField(upload_to='album/', null=True)
    date = models.DateTimeField(auto_now_add=True, auto_created=True)

    def __str__(self) -> str:
        return "'{}' by {}".format(self.name, self.artist)
