from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions , status
from meetings_api.models import MeetingItem

class UpdateFavouriteAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]


    def patch(self , request , meeting_id):
        try:
            meeting = MeetingItem.objects.get(id=meeting_id , user = request.user)
        except MeetingItem.DoesNotExist:
            return Response({"error":"Meeting not found"}, status=status.HTTP_404_NOT_FOUND)
        
        is_favourite = request.data.get("is_favourite")
        if not isinstance(is_favourite,bool):
            return Response({"error": "is_favourite must be true or false"}, status=status.HTTP_400_BAD_REQUEST)

        meeting.meeting_is_favourite= is_favourite
        meeting.save()

        return Response({
            "message":"Favourite status updated",
            "is_favourite": meeting.meeting_is_favourite
        })