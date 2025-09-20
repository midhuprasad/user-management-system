from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
# Create your models here.


class Profile(models.Model):
    GENDER_CHOICES = (('M', 'Male'), ('F', 'Female'), ('O', 'Other'))
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=200, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    address = models.TextField(blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True)
    mobile_number = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.user.username

class Note(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    attachment = models.FileField(upload_to='attachments/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

