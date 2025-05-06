from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from meetings_api.serializers import MeetingItemSerializer
from meetings_api.models import MeetingItem



class MeetingItemShowOneObject(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self , request , meeting_id):
        try:
            meeting = MeetingItem.objects.get(id = meeting_id , user = request.user)
        except MeetingItem.DoesNotExist:
            if not meeting:
                return Response({"error":"Meeting can not found"}, status=status.HTTP_404_NOT_FOUND)
        

        serializer = MeetingItemSerializer(meeting)
        return Response(serializer.data , status=status.HTTP_200_OK)
    