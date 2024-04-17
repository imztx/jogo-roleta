from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.


class Wallet(models.Model):

    owner = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
    )

    quantity = models.FloatField(
        default=0.,
    )


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_wallet(instance, created, raw, **kwargs):
    if raw or not created:
        return
    Wallet.objects.create(owner=instance)
