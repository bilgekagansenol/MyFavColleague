#!/usr/bin/env bash

set -e

PROJECT_BASE_PATH='/usr/local/apps/profiles-rest-api/Backend'

cd $PROJECT_BASE_PATH
git pull origin bilgebackend

./env/bin/python manage.py migrate
./env/bin/python manage.py collectstatic --noinput

supervisorctl restart profiles_api

echo "✅ GUNCELLEME TAMAMLANDI! "
