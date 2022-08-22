from django.db import models
from django.utils.timezone import utc
from datetime import datetime

# Create your models here.
class MenteeFlags(models.Model):
    flag_id = models.IntegerField(default=0, db_column = 'flag_id')
    mentee_id = models.IntegerField(default = 0, db_column = 'mentee_id')
    flagged_by = models.IntegerField(default = 0, db_column = 'flagged_by')
    flagged_at = models.DateTimeField(default = datetime(1979, 12, 31, 0, 0,  0, 000000, tzinfo = utc),
                                                db_column = 'flagged_at')
    unflagged_by = models.IntegerField(default = 0, db_column = 'unflagged_by')
    unflagged_at = models.DateTimeField(default = datetime(1979, 12, 31, 0, 0,  0, 000000, tzinfo = utc),
                                                db_column = 'unflagged_at')
    flag_reason = models.TextField(default = "", db_column = 'flag_reason')
    unflag_reason = models.TextField(default = "", db_column = 'unflag_reason')

