# Generated by Django 2.2 on 2020-11-08 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20201108_1956'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meal',
            name='slug',
            field=models.SlugField(blank=True, max_length=250, unique='name'),
        ),
    ]
