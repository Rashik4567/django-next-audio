from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, filters
from rest_framework import status

from . import serializers
from client.models import Song


class Routes(APIView):
    def get(self, request):
        routes = {
            "api/": "This page. Api routes list.",
            "api/list": "List of all the available musics.",
            "api/post": "Post songs"
        }
        return Response(routes)


class ListSongs(generics.ListAPIView):
    queryset = Song.objects.all()
    serializer_class = serializers.SongSerializer
    search_fields = ['name']
    filter_backends = (filters.SearchFilter, )


class PostSongsView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = serializers.SongSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DetailSong(generics.RetrieveAPIView):
    queryset = Song.objects.all()
    serializer_class = serializers.SongSerializer
