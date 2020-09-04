
from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Student


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model."""

    class Meta:
        """Meta-data for serializer class:
        model - Database Model to serialize
        fields - Fields we want to serialize in the model
        """

        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class StudentSerializer(serializers.ModelSerializer):
    """Serializer for Student model."""

    user = UserSerializer(required=True)

    class Meta:
        """Meta-data for serializer class:
        model - Database Model to serialize
        fields - Fields we want to serialize in the model
        """

        model = Student
        fields = [
            "id", "first_name", "last_name", "city", "state", "level", "user"
        ]

    # Overide create method to instantiate User model that
    # is required to instantiate student model
    # user model is used mainly for authentication purposes.
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        student_data = validated_data

        user = UserSerializer.create(
            UserSerializer(), validated_data=user_data)

        student, _ = Student.objects.update_or_create(
            user=user,
            **student_data
        )
        return student
