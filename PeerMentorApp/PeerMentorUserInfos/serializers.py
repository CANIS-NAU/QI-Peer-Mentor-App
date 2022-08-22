from rest_framework import serializers

from . import models


class PeerUserInfoSerializer(serializers.ModelSerializer):
    #Generate a username from authentication
    user_name = serializers.CharField(source='username', max_length=50)

    class Meta:
        fields = (
            'peer_user_info_id',
            'user_id',
            'user_name',
            'password',
            'email',
            'authority')
        model = models.PeerUserInfo


# Serializer for basic information of user-info model
class PeerUserSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='username', max_length=50)
    user_email = serializers.CharField(source='email', max_length=50)

    class Meta:
        fields = ('user_id',
                  'user_name',
                  'user_email')
        model = models.PeerUserInfo