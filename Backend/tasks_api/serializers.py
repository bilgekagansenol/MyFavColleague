from rest_framework import serializers
from tasks_api.models import TaskItem


class TaskItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskItem
        # user’ı listeden çıkar – istemciden beklemiyoruz
        fields = ["id", "title", "due_date", "is_completed", "created_at"]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        user = self.context["request"].user
        return TaskItem.objects.create(user=user, **validated_data)