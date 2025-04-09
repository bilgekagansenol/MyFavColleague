#!/usr/bin/env bash

set -e

# GIT repo URL (senin projen)
PROJECT_GIT_URL='https://github.com/bilgekagansenol/MyFavColleague.git'

# Kurulumun yapılacağı ana dizin
PROJECT_BASE_PATH='/usr/local/apps/profiles-rest-api'

# Ubuntu dil ayarı (gerekli değilse kaldırabilirsin)
locale-gen en_GB.UTF-8

# Gerekli paketlerin kurulumu
echo "Installing dependencies..."
apt-get update
apt-get install -y python3-dev python3-venv sqlite3 python3-pip supervisor nginx git

# Uygulama klasörünü oluştur
mkdir -p $PROJECT_BASE_PATH

# Repo'yu doğru branch ile klonla
git clone --branch bilgebackend $PROJECT_GIT_URL $PROJECT_BASE_PATH

# Backend klasörüne gir (orası senin esas kodların)
cd $PROJECT_BASE_PATH/Backend

# Sanal ortam oluştur
python3 -m venv env

# Gerekli Python paketlerini yükle
env/bin/pip install --upgrade pip
env/bin/pip install -r requirements.txt uwsgi==2.0.21

# Veritabanı işlemleri
env/bin/python manage.py migrate

# Supervisor servisini ayarla
cp deploy/supervisor_profiles_api.conf /etc/supervisor/conf.d/profiles_api.conf
supervisorctl reread
supervisorctl update
supervisorctl restart profiles_api

# Nginx yapılandırması
cp deploy/nginx_profiles_api.conf /etc/nginx/sites-available/profiles_api.conf
rm -f /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/profiles_api.conf /etc/nginx/sites-enabled/profiles_api.conf
systemctl restart nginx.service

echo "✅ Deployment tamamlandı!"
