from django.urls import path
from . import views

urlpatterns = [
    path('', views.Routes.as_view()),
    path('list', views.ListSongs.as_view()),
    path('post', views.PostSongsView.as_view()),
    path('<int:pk>', views.DetailSong.as_view()),
]
