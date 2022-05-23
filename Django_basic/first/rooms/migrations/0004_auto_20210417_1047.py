# Generated by Django 2.2.5 on 2021-04-17 01:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0003_auto_20210417_1047'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='facilities',
            field=models.ManyToManyField(to='rooms.Facility'),
        ),
        migrations.AddField(
            model_name='room',
            name='house_rules',
            field=models.ManyToManyField(to='rooms.HouseRule'),
        ),
    ]
