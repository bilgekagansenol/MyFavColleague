from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions , status
from meetings_api.models import MeetingItem




class meetingItemTitleChangeAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]


    def patch(self ,request , meeting_id):
        try:
            meeting = MeetingItem.objects.get(id = meeting_id , user = request.user)
        except MeetingItem.DoesNotExist:
            return Response({"error":"Meeting not found"},status=status.HTTP_404_NOT_FOUND)
        
        meeting_name =request.data.get("meeting_name")

        if not isinstance(meeting_name , str):
            return Response({"error":"meeting_name must be string"}, status=status.HTTP_400_BAD_REQUEST)    

        meeting.meeting_name = meeting_name
        meeting.save()

        return Response({
            "message":"Title succesfully changed",
            "meeting_name":meeting.meeting_name
        })