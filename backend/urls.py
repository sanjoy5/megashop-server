from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


# def home(request):
#     return HttpResponse('Mega Shop is Running... ')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    # path('', home, name='home'),
    path('api/products/', include('base.urls.product_urls')),
    path('api/users/', include('base.urls.user_urls')),
    path('api/orders/', include('base.urls.order_urls'))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
