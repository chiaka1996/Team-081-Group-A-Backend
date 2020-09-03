
from rest_framework import generics

from .serializers import StudentSerializer


class StudentRegistrationView(generics.CreateAPIView):

    """Endpoint for registering Student users"""

    serializer_class = StudentSerializer
