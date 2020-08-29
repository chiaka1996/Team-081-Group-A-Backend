from django.urls import path

from . import views


urlpatterns = [
    path('', views.SampleView.as_view(), name="sample")
]
