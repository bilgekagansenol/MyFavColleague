from django.db import models
from django.core.exceptions import ValidationError
from django.conf import settings #for user model

class MeetingItemManager(models.Manager):
    """ to Handle Meeting Item"""
    
    def create_MeetingItem(self,user, audio):
        """creating meeting item  audio is requirement in code"""
        if not audio:
            raise ValidationError("Audio file is required at creation")
        meeting = self.create(
            user = user,
            meeting_audio_recording = audio
        )
        return meeting
    def delete_meeting(self,pk,user):
        """deleting meeting with audio if its there"""
        try:
            meeting = self.get(pk=pk , user= user)
        except self.model.DoesNotExist:
            raise ValueError("Meeting not found")
        
        if meeting.meeting_audio_recording:
            meeting.meeting_audio_recording.delete(save=False)
        
        meeting.delete()

def validate_audiofile(file):
    """checking is audio mp3(it can changeble with needings) or not"""
    if not file.name.endswith('.mp3'):
        raise ValidationError('Only MP3 files are allowed')


class MeetingItem(models.Model):
    """
    Meeting model consider:
    meeting_name
    meeting_summary
    meeting_key_points
    id
    meeting_favorite
    meeting_created_on
    meeting_audio_recording  (shortly stored)
    meeting_plaintext        (shortly stored)
    """
    objects = MeetingItemManager()

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='meetings'
    )

    meeting_name = models.CharField(max_length=100,default='new Meeting')
    meeting_summary = models.CharField(
        max_length=2000,
        blank=True,
        null=True
        )
    meeting_key_points = models.JSONField(
        blank=True,
        null=True
    )
    meeting_is_favourite = models.BooleanField(default=False)
    meeting_created_on = models.DateTimeField(auto_now_add=True)
    meeting_audio_recording = models.FileField(
        upload_to='meeting_audios/',
        validators=[validate_audiofile],
        blank= False,
        null= True
    )
    meeting_plain_text = models.CharField(
        max_length= 5000,
        blank=True,
        null= True
    )

