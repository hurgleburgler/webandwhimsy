from tastypie.resources import ModelResource
from tastypie import fields
from whimsy.models import Job, Task, Skill, Company

class SkillResource(ModelResource):
    class Meta:
        queryset = Skill.objects.all()
        resource_name = 'skills'

class TaskResource(ModelResource):
    class Meta:
        queryset = Task.objects.all()
        resource_name = 'tasks'

class CompanyResource(ModelResource):
    class Meta:
        queryset = Company.objects.all()
        resource_name = 'companies'

class JobResource(ModelResource):
    company = fields.ToOneField(CompanyResource, 'company', full=True)
    tasks = fields.ToManyField(TaskResource, 'tasks', full=True)
    skills = fields.ToManyField(SkillResource, 'skills', full=True)

    class Meta:
        queryset = Job.objects.all().order_by('-start')
        resource_name = 'jobs'

