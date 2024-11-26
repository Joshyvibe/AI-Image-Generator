
from django.contrib import admin
from django.urls import path
from api.views import GradioImageGenerateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("generate-gradio/", GradioImageGenerateView.as_view(), name="generate_gradio_image"),
]


if settings.DEBUG: 
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
