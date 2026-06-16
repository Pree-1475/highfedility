import os
from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get("DJANGO_DEBUG", "True").lower() == "true"

# SECURITY WARNING: keep the secret key used in production secret!
if not os.environ.get("DJANGO_SECRET_KEY"):
    SECRET_KEY = "django-insecure-#_y0wlb8gua@*1fenwj5yj!j-se#8b2*y*l+-8dchl*jj_a=xc"

# SECURITY WARNING: define the correct hosts in production!
if not os.environ.get("DJANGO_ALLOWED_HOSTS"):
    ALLOWED_HOSTS = ["*"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

try:
    from .local import *
except ImportError:
    pass
