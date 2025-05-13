from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404

from tasks_api.models import TaskItem
from tasks_api.serializers import TaskItemSerializer


class TaskItemListCreateAPIView(APIView):
    """
    GET  /tasks/  → kullanıcının tüm görevlerini listeler
    POST /tasks/  → yeni görev oluşturur
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        tasks = TaskItem.objects.filter(user=request.user)
        serializer = TaskItemSerializer(tasks, many=True)
        return Response(serializer.data)
    def post(self, request):
        # 🔄 DEĞİŞTİ: context ekledik
        serializer = TaskItemSerializer(
            data=request.data,
            context={"request": request}  # DEĞİŞTİ
        )
        if serializer.is_valid():
            serializer.save()             # DEĞİŞTİ — user parametresi kalktı
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskItemDetailAPIView(APIView):
    """
    GET    /tasks/<id>/ → tek görevi getirir
    PATCH  /tasks/<id>/ → (kısmi) günceller
    DELETE /tasks/<id>/ → siler
    """
    permission_classes = [permissions.IsAuthenticated]

    def _get_task(self, request, id):
        return get_object_or_404(TaskItem, user=request.user, id=id)

    def get(self, request, id):
        task = self._get_task(request, id)
        serializer = TaskItemSerializer(task)  # (context gerekmez)
        return Response(serializer.data)

    
    def patch(self, request, id):
        task = self._get_task(request, id)
        #  DEĞİŞTİ: context ekledik
        serializer = TaskItemSerializer(
            task,
            data=request.data,
            partial=True,
            context={"request": request}  #  DEĞİŞTİ
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, id):
        task = self._get_task(request, id)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)  # 204, gövde yok
