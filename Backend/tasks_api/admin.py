from django.contrib import admin
from tasks_api.models import TaskItem


@admin.register(TaskItem)
class TaskItemAdmin(admin.ModelAdmin):
    list_display   = ("id", "user", "title", "due_date", "is_completed", "created_at")
    list_filter    = ("is_completed", "due_date")
    search_fields  = ("title",)
    ordering       = ("-created_at",)

   
    list_editable  = ("is_completed",)

   
    readonly_fields = ("created_at",)
