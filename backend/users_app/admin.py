from django.contrib import admin
from .models import Profile, Note

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'date_of_birth', 'gender', 'mobile_number', 'address')
    search_fields = ('user__username', 'full_name', 'mobile_number')

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'created_at', 'modified_at')
    search_fields = ('title', 'description')
