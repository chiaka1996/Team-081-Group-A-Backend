
from rest_framework.views import APIView
from rest_framework.response import Response


class SampleView(APIView):
    """Temporary view pending project takeoff"""

    def get(self, request):
        return Response({"message": "Hello, World!"})
