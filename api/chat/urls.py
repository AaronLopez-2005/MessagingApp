from django.urls import path
from .views import SignInView, SignUpView

urlpatterns = [
    path('signIn/', SignInView.as_view()),
    path('signUp/', SignUpView.as_view())
]