import requests
from django.http import JsonResponse

# Your GNews API key
GNEWS_API_KEY = "85755b7821b51da05bf81651b9f09784"

# Mapping simple categories to GNews API category parameters
CATEGORY_MAPPING = {
    "general": "general",
    "business": "business",
    "entertainment": "entertainment",
    "health": "health",
    "science": "science",
    "sports": "sports",
    "technology": "technology",
}

def get_news(request):
    # Get the category from query parameters; default to 'general'
    category = request.GET.get('category', 'general')
    category_param = CATEGORY_MAPPING.get(category, "general")

    # Build the URL and parameters for GNews API
    url = "https://gnews.io/api/v4/top-headlines"
    params = {
        "apikey": GNEWS_API_KEY,
        "category": category_param,
        "lang": "en",       # Adjust as needed
        "country": "us",    # Adjust as needed
        "max": 10
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an error for non-2xx responses
        data = response.json()
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse(data)
