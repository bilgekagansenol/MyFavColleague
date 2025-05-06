from django.urls import path , include
from django.contrib import admin

from rest_framework.routers import DefaultRouter
from user_api.views import (
    UserProfileViewSet,
    UserLoginApiView,
    ChangePasswordView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
)
from meetings_api.views.meeting_item_view import MeetingItemAPIView
from meetings_api.views.MeetingItemListAPIView import MeetingItemListAPIView
from meetings_api.views.meeting_item_view_favourite import UpdateFavouriteAPIView
router = DefaultRouter()
router.register('user', UserProfileViewSet, basename='user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', UserLoginApiView.as_view()),
    path('api/', include(router.urls)),
    path('api/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('api/reset-password/', PasswordResetRequestView.as_view(), name='reset-password'),
    path('api/reset-password-confirm/', PasswordResetConfirmView.as_view(), name='reset-password-confirm'),
    path('api/meeting/send/', MeetingItemAPIView.as_view(),name='meeting'),
    path('api/meeting/list/',MeetingItemListAPIView.as_view(), name='meeting-list'),
    path('api/meeting/<int:meeting_id>/favourite/', UpdateFavouriteAPIView.as_view())

]
    