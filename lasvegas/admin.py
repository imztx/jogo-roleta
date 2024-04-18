from django.contrib import admin
from lasvegas.models import *
# Register your models here.

@admin.register(Movement)
class MovementAdmin(admin.ModelAdmin):
    list_display = [
        'created_at',
        'value',
        'description',
        'wallet',
    ]

