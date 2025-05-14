from django.urls import path , include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from user_api.views import (
    UserProfileViewSet,
    UserLoginApiView,
    ChangePasswordView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    ProfileImageUpdateAPIView,
)
from meetings_api.views.meeting_item_view import MeetingItemAPIView
from meetings_api.views.MeetingItemListAPIView import MeetingItemListAPIView
from meetings_api.views.meeting_item_view_favourite import UpdateFavouriteAPIView
from meetings_api.views.meeting_item_view_titlechange import meetingItemTitleChangeAPIView
from meetings_api.views.meetng_showing_oneobject import MeetingItemShowOneObject
from meetings_api.views.meeting_item_view_delete import DeleteMeetingItem
from tasks_api import urls


from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title= "API Documentation",
        default_version='v1',
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

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
    path('api/meeting/<int:meeting_id>/favourite/', UpdateFavouriteAPIView.as_view()),
    path('api/meeting/<int:meeting_id>/titlechange/', meetingItemTitleChangeAPIView.as_view()),
    path('api/meeting/<int:meeting_id>/', MeetingItemShowOneObject.as_view()),
    path('api/profile-image/' , ProfileImageUpdateAPIView.as_view(), name='update-profile-image'),
    path('',include('tasks_api.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/',   schema_view.with_ui('redoc',   cache_timeout=0), name='schema-redoc'),
    path('api/meeting/<int:meeting_id>/delete/', DeleteMeetingItem.as_view(),  name='meeting-delete'), 
]   

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    