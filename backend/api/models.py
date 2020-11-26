from django.db import models
from django.utils.translation import gettext_lazy as _

def upload_to(instance, filename):
    print(instance, filename)
    return 'images/{filename}'.format(filename=filename)

class Ingredient(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Meal(models.Model):
    name = models.CharField(max_length=50)
    ingredients = models.ManyToManyField(Ingredient, blank=False)
    image = models.ImageField(_("Image"), upload_to=upload_to, default='images/default.jpg' )
    slug = models.SlugField(null=True, blank=True)

    def __str__(self):
        return self.name

class ContactMessage(models.Model):
    topic = models.CharField(max_length=40)
    message = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
