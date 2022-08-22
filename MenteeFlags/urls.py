from django.urls import path
from . import views

urlpatterns = [
	path('MenteeFlags' , views.MenteeFlags.as_view()),
	path('FlagsOnMentee/<int:user_id>' , views.FlagsOnMentee.as_view()),
	path('FlagsByMentor/<int:user_id>' , views.FlagsByMentor.as_view())
]