# Generated by Django 2.2 on 2020-11-08 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20201108_1957'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meal',
            name='slug',
            field=models.SlugField(max_length=250, null=True, unique='name'),
        ),
    ]