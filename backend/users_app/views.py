from django.shortcuts import render
from rest_framework import generics, permissions, viewsets, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import (UserRegistrationSerializer, ProfileSerializer,UserSerializer, PasswordChangeSerializer, NoteSerializer)
from .models import *
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, created = Profile.objects.get_or_create(user=self.request.user)
        return profile


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = PasswordChangeSerializer
    model = User
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        if not self.object.check_password(serializer.validated_data['old_password']):
            return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
        
        self.object.set_password(serializer.validated_data['new_password'])
        self.object.save()
        return Response({'detail': 'Password updated successfully.'}, status=status.HTTP_200_OK)


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        return Note.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
