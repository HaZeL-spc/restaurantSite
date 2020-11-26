import json
import io
from PIL import Image

from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework import status
from rest_framework import viewsets
from rest_framework import generics

from .serializers import MealSerializer, IngredientSerializer, ContactSerializer
from .models import Meal, Ingredient, ContactMessage


@api_view(["GET"])
def apiOverview(request):
    api_urls = {
        "Meal list":"/meal-list/",
        "Meal create":"/meal-create/", 
        "Meal delete":"/meal-delete/<str:pk>/", 
        "Meal update":"/meal-update/<str:pk>/", 
        "Meal detail":"/meal-detail/<str:pk>/", 

        "Ingredient create":"/ingredient-create/",
        "Ingredient list":"/ingredient-list/", 
        "Contact list": "contact-list/",
    }

    return Response(api_urls)

@api_view(["GET"])
def mealList(request):
    meals = Meal.objects.all()
    serializer = MealSerializer(meals, many=True)

    return Response(serializer.data)

@api_view(["GET"])
def mealDetail(request,slug):
    meal = Meal.objects.get(slug=slug)
    serializer = MealSerializer(meal, many=False)

    return Response(serializer.data)

class mealCreate(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data['ingredients'] = []

        new_meal = Meal.objects.create(name = data['name'], image = data['image'], slug=data['slug'])

        for item in json.loads(request.data['ingredients']):
            ingredient = Ingredient.objects.get(name = item['name'])
            new_meal.ingredients.add(ingredient)
        
        new_meal.save()
        serializer = MealSerializer(new_meal)
        return Response(serializer.data)

@api_view(["DELETE"])
def mealDelete(request, pk):
    meal = Meal.objects.get(id=pk)
    meal.delete()

    return Response("item successfully deleted")

@api_view(["POST"])
def mealUpdate(request, pk):
    meal = Meal.objects.get(id=pk)
    serializer = MealSerializer(instance = meal, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(["GET"])
def ingredientList(request):
    ingredients = Ingredient.objects.all()
    serializer = IngredientSerializer(ingredients, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def ingredientCreate(request):
    serializer = IngredientSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(["DELETE"])
def ingredientDelete(request, pk):
    ingredient = Ingredient.objects.get(id=pk)
    ingredient.delete()

    return Response("item successfully deleted")

class contactMessageInfo(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        serializer = ContactSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

    def get(self, request, *args, **kwargs):
        messages = ContactMessage.objects.all()
        serializer = ContactSerializer(messages, many=True)
        return Response(serializer.data) 