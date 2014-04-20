from django import http
from django.views.decorators.csrf import requires_csrf_token
from django.template import Context, RequestContext, loader
from django.core import serializers
from django.db import models
import json

class needs_ride(models.Model):
    name = models.CharField(max_length=200)
    contact = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    departure_date = models.CharField(max_length=200)
    return_date = models.CharField(max_length=200)
    
class has_ride(models.Model):
    name = models.CharField(max_length=200)
    contact = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    departure_date = models.CharField(max_length=200)
    return_date = models.CharField(max_length=200)

# This can be called when CsrfViewMiddleware.process_view has not run, therefore
# need @requires_csrf_token in case the template needs {% csrf_token %}.
@requires_csrf_token
def rider(request):
    if request.method == 'POST':
        try:
            this_new_ride = needs_ride(name=request.POST['Name'],
                                       contact=request.POST['Contact'],
                                       location=request.POST['From'] or 'Tucson',
                                       departure_date=request.POST['Desired Departure'] or '05/31/2013',
                                       return_date=request.POST['Desired Return'] or '06/02/2013')

            this_new_ride.save()
            return http.HttpResponse(json.dumps({'status': True}))

        except Exception:
            return http.HttpResponse(json.dumps({'status': False}))

    else:
        data = serializers.serialize("json", needs_ride.objects.all())
        return http.HttpResponse(data)

@requires_csrf_token
def room(request):
    if request.method == 'POST':
        try:
            this_new_ride = has_ride(name=request.POST['Name'],
                                       contact=request.POST['Contact'],
                                       location=request.POST['From'] or 'Tucson',
                                       departure_date=request.POST['Desired Departure'] or '05/31/2013',
                                       return_date=request.POST['Desired Return'] or '06/02/2013')

            this_new_ride.save()
            return http.HttpResponse(json.dumps({'status': True}))

        except Exception:
            return http.HttpResponse(json.dumps({'status': False}))

    else:
        data = serializers.serialize("json", has_ride.objects.all())
        return http.HttpResponse(data)

