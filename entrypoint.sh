#! /usr/bin/sh -e
. .venv/*/bin/activate
python manage.py migrate

exec "$@"