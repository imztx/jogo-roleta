from django.db import models
from django.utils import timezone
from datetime import datetime, timedelta

class Jogo(models.Model):
    game_name = models.CharField(max_length=200)
    cover = models.ImageField(
        null=True,
        blank=True
        )
    pub_date = models.DateTimeField("Data de publicação")
    
    def __str__(self):
        return self.game_name
    
    def was_published_recently(self):
        return timezone.now() >= self.pub_date >= timezone.now() - timedelta(days=1)
        


class Joinha(models.Model):
    question = models.ForeignKey(Jogo, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    
    def __str__(self):
        return self.choice_text

