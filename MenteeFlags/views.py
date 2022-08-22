from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_condition import Or

from .models import MenteeFlags
from .serializers import MenteeFlagsSerializers
from django.db.utils import IntegrityError

# Create your views here.
class MenteeFlags(APIView):
    def get(self, request):
        queryset = MenteeFlags.objects.all()
        serializer = MenteeFlagsSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
	
    def post(self, request):
        try:
			# expecting camelcase from java, double check if needed to be changed.
            mentee_id = request.data["menteeID"]
            flagged_by = request.data["flaggedBy"]
            flagged_at = request.data["flaggedAt"]
            unflagged_by = request.data["unflaggedBy"]
            unflagged_at = request.data["unflaggedAt"]
            flag_reason = request.data["flagReason"]
            unflag_reason = request.data["unflagReason"]
        except KeyError:
            return Response({"error": "Wrong Json Format"}, status = status.HTTP_409_CONFLICT)

        try:
            new_flag = MenteeFlags.objects.create(mentee_id = mentee_id, flagged_by = flagged_by, flagged_at = flagged_at, unflagged_by = unflagged_by, unflagged_at = unflagged_at, flag_reason = flag_reason, unflag_reason = unflag_reason)
            new_flag.save()
            return Response({"Mentee Flag": new_flag.flag_id})
        except IntegrityError:
            return Response({"error": "Flag already exists with this mentor & mentee combination."}, status=status.HTTP_409_CONFLICT)


class FlagsOnMentee(APIView):
	def get( self, request, user_id ):
		try:
			query = MenteeFlags.objects.filter( menteeID=user_id )
			serializer = MenteeFlagsSerializers( query , many=True)
			return Response( serializer.data, status=status.HTTP_200_OK)
		except MenteeFlags.DoesNotExist:
			return Response({"error": "No access codes created by provided user"} , status=status.HTTP_404_NOT_FOUND)

class FlagsByMentor(APIView):
	def get( self, request, user_id ):
		try:
			query = MenteeFlags.objects.filter( flaggedBy=user_id )
			serializer = MenteeFlagsSerializers( query , many=True)
			return Response( serializer.data, status=status.HTTP_200_OK)
		except MenteeFlags.DoesNotExist:
			return Response({"error":"No access codes created by provided user"} , status=status.HTTP_404_NOT_FOUND)