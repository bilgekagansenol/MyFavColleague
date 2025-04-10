from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from meetings_api import serializers
from meetings_api import models


class MeetingItemAPIView(APIView):
    """Handle creating and updating profiles"""
    permission_classes = [permissions.IsAuthenticated]
    

    def get(self , request):
        """for getting  all meeting item"""
        meeting = models.MeetingItem.objects.filter(user = request.user)
        serializer =  serializers.MeetingItemSerializer(meeting ,many = True)
        return Response(serializer.data)

    def post(self, request):
        """"creating meeting item with audio"""
        serializer = serializers.MeetingItemSerializer(
            data = request.data,
            context={'request':request}
        )
        if serializer.is_valid():
            instance = serializer.save(user=request.user)
            return Response(
                serializers.MeetingItemSerializer(instance).data,
                status= status.HTTP_201_CREATED
            )
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
