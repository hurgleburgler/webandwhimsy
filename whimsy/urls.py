from django.conf.urls import patterns
from django.views.generic import TemplateView

urlpatterns = patterns('',
    ('^interactive$', TemplateView.as_view(template_name='interactive.html')),
    ('^standard$', TemplateView.as_view(template_name='standard.html')),
    ('^$', TemplateView.as_view(template_name='home.html')),
)
