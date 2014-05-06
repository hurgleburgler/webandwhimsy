from django.db import models


class Job(models.Model):
    company = models.ForeignKey('Company')
    title = models.CharField(max_length=40)
    department = models.CharField(max_length=40)
    short_title = models.CharField(max_length=20)
    start = models.DateField()
    end = models.DateField(blank=True, null=True)
    skills = models.ManyToManyField('Skill')
    tasks = models.ManyToManyField('Task')

    def __str__(self):
        return '%s: %s' % (self.company, self.title)

class Company(models.Model):
    short_name = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=50, unique=True)
    link = models.URLField(unique=True)
    location = models.CharField(max_length=40)

    def __str__(self):
        return self.name

class Skill(models.Model):
    name = models.CharField(max_length=40, unique=True)
    link = models.URLField(unique=True)
    weight = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.name

class Task(models.Model):
    description = models.TextField()
