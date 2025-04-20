from rest_framework import serializers
from meetings_api import view ,models


class MeetingItemSerializer(serializers.ModelSerializer):
    """handle serialization  data """
    class Meta:
        model = models.MeetingItem
        fields = '__all__'
        extra_kwargs = {
           'user' : {
              'read_only': True
           },
           'meeting_created_on':{
              'read_only': True
           }
        }
    def create(self, validated_data):
        """create function  that takes audio and user"""
        meeting = models.MeetingItem.objects.create_MeetingItem(
            user = self.context['request'].user,
            audio = validated_data['meeting_audio_recording'],
            )
        
        return meeting
    

 




