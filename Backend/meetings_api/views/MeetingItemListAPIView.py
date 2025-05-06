from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from meetings_api.models import MeetingItem
from meetings_api.serializers import MeetingItemSerializer


class MeetingItemListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self , request):
        meetings = MeetingItem.objects.filter(user = request.user).order_by('-meeting_is_favourite', '-meeting_created_on')
        serializer = MeetingItemSerializer(meetings ,many = True)
        return Response(serializer.data)
    

