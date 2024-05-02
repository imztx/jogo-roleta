from django.db import models
from django.db.models import F
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save


class Wallet(models.Model):

    owner = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
    )

    quantity = models.FloatField(
        default=0.,
    )
    
    def get_balance(self):
        # Obtém todos os movimentos associados a esta carteira
        movements = self.movement_set.all()
        
        # Calcula o saldo somando os valores dos movimentos
        balance = sum(movement.value for movement in movements)
        
        return balance

class Movement(models.Model):

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    wallet = models.ForeignKey(
        Wallet,
        on_delete=models.CASCADE,
    )

    description = models.TextField(

    )

    value = models.FloatField(

    )



@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_wallet(instance, created, raw, **kwargs):
    if raw or not created:
        return
    Wallet.objects.create(owner=instance)


@receiver(post_save, sender=Movement)
def update_wallet(instance, created, raw, **kwargs):
    if raw or not created:
        return
    wallet = instance.wallet
    wallet.quantity = F('quantity') + instance.value
    wallet.save()
