# Generated by Django 2.2 on 2020-11-08 03:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_meal_ingredients'),
    ]

    operations = [
        migrations.AddField(
            model_name='meal',
            name='ingredients',
            field=models.ManyToManyField(to='api.Ingredient'),
        ),
    ]
