from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, ProfileView, ChangePasswordView, NoteViewSet

router = DefaultRouter()
router.register('notes', NoteViewSet, basename='note')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('', include(router.urls)),
]
