from django.db import models

class User(models.Model):
    ROLE_CHOICES = [
        ('Student', 'Student'),
        ('Admin', 'Admin')
    ]

    DEPARTMENT_CHOICES = [
        ('Khoury', 'Khoury'),
        ('COE', 'COE')
    ]


    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(primary_key=True)
    password = models.CharField(max_length=20)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='Student')
    created_at = models.DateTimeField(auto_now_add=True)
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES, default='Khoury')

    def __str__(self):
        return self.email


class Event(models.Model):
    event_id = models.AutoField(primary_key=True)
    event_name = models.CharField(max_length=255)
    event_description = models.TextField()
    event_location = models.CharField(max_length=255)
    event_time = models.DateTimeField()
    event_published_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        db_column='event_published_by'
    )
    event_created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.event_name