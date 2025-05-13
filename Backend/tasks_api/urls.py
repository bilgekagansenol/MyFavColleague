
from django.urls import path
from tasks_api.views import TaskItemListCreateAPIView, TaskItemDetailAPIView

urlpatterns = [
    path("tasks/", TaskItemListCreateAPIView.as_view(), name="tasks-list-create"),
    path("tasks/<int:id>/", TaskItemDetailAPIView.as_view(), name="tasks-detail"),
]
 