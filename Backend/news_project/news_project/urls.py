from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the News App Home Page!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/news/', include('news_app.urls')),  # The API endpoint is /api/news/
    path('', home, name='home'),
]
