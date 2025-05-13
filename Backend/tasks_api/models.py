from django.db import models
from django.core.exceptions import ValidationError
from django.conf import settings





class TaskItem(models.Model):


    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='tasks'
    )
    title = models.CharField(max_length=255 , blank=False )
    due_date = models.DateField()  # örnek: 2025-05-13
    is_completed =models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    