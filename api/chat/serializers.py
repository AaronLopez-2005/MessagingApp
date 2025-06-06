from rest_framework import serializers
from .models import User

class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
            'password'
        ]
        extra_kwargs = {
            'password' : {
                'write_only' : True
            }
        }
    
    def create(self, validated_data):
        username = validated_data['username'].lower()
        first_name = validated_data['first_name'].lower()
        last_name = validated_data['last_name'].lower()
        print(username, first_name, last_name)

        user = User.objects.create(**validated_data)

        user.set_password(validated_data['password'])
        user.save()

        return user


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = [
            "username",
            "full_name",
            "thumbnail"
        ]
    
    def get_full_name(self, obj):
        return obj.first_name + " " + obj.last_name
    