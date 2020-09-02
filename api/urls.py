from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views


urlpatterns = [
    path(
        'user/student/new',
        views.StudentRegistrationView.as_view(),
        name="student_registration"
    ),
    path(
        'auth/token',
        TokenObtainPairView.as_view(),
        name="token_obtain_pair"
    ),
    path(
        'auth/token/refresh',
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),
]
