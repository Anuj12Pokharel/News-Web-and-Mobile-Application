# news_app/urls.py
from django.urls import path
from .views import get_news

urlpatterns = [
    path('', get_news, name='get_news'),  # Matches /api/news/
    # You can add more patterns here if needed, e.g.:
    # path('latest/', latest_news, name='latest_news'),
]
