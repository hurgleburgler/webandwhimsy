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

def standard(request):
    jobs = Job.objects.all().order_by('-start')
    companies = []
    for each_job in jobs:
        if not len(companies):
            companies.append({'company': each_job.company, 'jobs': [each_job]})
        else:
            if companies[-1]['company'].name != each_job.company.name:
                companies.append({'company': each_job.company, 'jobs': [each_job]})
            else:
                companies[-1]['jobs'].append(each_job)

    print Skill.objects.all().order_by('-weight')
    context = {
        'skills': Skill.objects.all().order_by('-weight'),
        'companies': companies,
    }

    return render(request, 'standard.html', context)

def home(request):
    context = RequestContext(request)
    print context
    return render(request, 'home.html', context)
