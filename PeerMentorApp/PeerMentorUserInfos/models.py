from django.db import models
from django.utils.timezone import utc
from datetime import datetime
from django.contrib.auth.models import AbstractUser


class UserInfo(AbstractUser):
    # integer field     user_b0_count = models.IntegerField(default=0, db_column="UserB0Count") # Red
    # user_current_mood_updated = models.DateTimeField(default=datetime(1979, 12, 31, 0, 0, 0, 000000, tzinfo=utc),
    #                                                 db_column='UserCurrentMoodUpdated')
    #user_current_location_lat = models.DecimalField(max_digits=5, decimal_places=2, default=0.0,
     #                                               db_column='UserCurrentLocationLat')

    user_info_id = models.AutoField(primary_key=True, db_column='UserInfoId')  # PK
    # username
    # password
    # authority level
    
    email = models.EmailField(unique=True)
    REQUIRED_FIELDS = ['email']#, 'user_name']

    def __str__(self):
        return self.username