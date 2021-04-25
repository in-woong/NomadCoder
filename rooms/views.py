from django.utils import timezone
from django.shortcuts import render
from django.views.generic import ListView
from . import models


class HomeView(ListView):

    """ HomeView Definition """

    model = models.Room
    paginate_by = 10
    ordering = "created"
    paginate_orphans = 10
    page_kwarg = "page"
    context_object_name = "rooms"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        now = timezone.now()
        context["now"] = now
        return context


def room_detail(request, pk):
    print(pk)
    return render(request, "rooms/detail.html")
