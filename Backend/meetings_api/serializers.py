from rest_framework import serializers
from meetings_api import views ,models


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
        
    

 




