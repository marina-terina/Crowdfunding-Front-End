from django.urls import path
from . import views

urlpatterns = [
    path('users/public/<int:pk>/', views.PublicUserDetail.as_view(), name='public-user-detail'),
] 