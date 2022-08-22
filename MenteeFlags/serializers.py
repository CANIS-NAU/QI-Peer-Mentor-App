from rest_framework import serializers
from . import models

class MenteeFlagsSerializers( serializers.ModelSerializer ):
	class Meta:
		fields = '__all__'
		model = models.MenteeFlags