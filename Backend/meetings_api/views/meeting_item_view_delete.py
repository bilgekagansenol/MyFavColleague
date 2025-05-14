from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions , status
from meetings_api.models import MeetingItem


class DeleteMeetingItem(APIView):
    '''deleting meeting from database'''
    permission_classes = [permissions.IsAuthenticated]
    def delete(self , request , meeting_id ):
        try:
            meeting = MeetingItem.objects.get(id = meeting_id , user = request.user)
        except MeetingItem.DoesNotExist:
            return Response({"error":"meeting not found"}, status=status.HTTP_404_NOT_FOUND)

        meeting.delete()
        return Response({
            "message":"meeting deleted"
        }, status=status.HTTP_204_NO_CONTENT)    
