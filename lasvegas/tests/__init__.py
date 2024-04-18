import django
from django.apps import apps
from django.test.utils import setup_databases, setup_test_environment
if not apps.ready:
    django.setup() # Normal Django setup
    setup_test_environment() # This does a lot of stuff inside Django tests
    # The next one is very important: it creates test databases and changes settings.DATABASES to point to them
    # otherwise tests will run against live database.
    setup_databases(verbosity=1, interactive=False, keepdb=True)
    # keepdb probably should be a setting inside vscode.
    # Our project takes an hour to run migrations from scratch, so we need keepdb, 
    # but normally no one wants to keep test databases around.
