from rest_framework import generics
from .serializers import PublicUserSerializer  # You'll need to create this

# Add this new view class
class PublicUserDetail(APIView):
    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        user = self.get_object(pk)
        serializer = PublicUserSerializer(user)  # Use the new serializer
        return Response(serializer.data) 