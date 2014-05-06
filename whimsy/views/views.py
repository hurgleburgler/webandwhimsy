from django import http
from django.shortcuts import render
from django.template import RequestContext, loader
from whimsy.models import Job, Company, Skill, Task
from django.core import serializers

def interactive(request):
    context = {
        'jobs': Job.objects.all().order_by('-start'),
        'skills': Skill.objects.all(),
    }
    return render(request, 'interactive.html', context)
