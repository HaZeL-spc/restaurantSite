from django.urls import path, include
from . import views

from django.conf import settings
from django.conf.urls.static import static

from rest_framework import routers

# router = routers.DefaultRouter()
# router.register('meal-create', views.mealCreate, basename="queryset")

urlpatterns = [
    path("", views.apiOverview, name="api-overview"),
    path("meal-list/", views.mealList, name="meal-list"),
    path("meal-create/", views.mealCreate.as_view(), name="meal-create"),
    path("meal-delete/<str:pk>/", views.mealDelete, name="meal-delete"),
    path("meal-update/<str:pk>/", views.mealUpdate, name="meal-update"),
    path("meal-detail/<str:slug>/", views.mealDetail, name="meal-detail"),

    path("ingredient-create/", views.ingredientCreate, name="ingredient-create"),
    path("ingredient-list/", views.ingredientList, name="ingredient-list"),
    path("ingredient-delete/<str:pk>/", views.ingredientDelete, name="ingredient-delete"),

    path("contact-list/", views.contactMessageInfo.as_view(), name="contact-list"),
]
# urlpatterns += router.urls

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)