# REQUIREMENTS
phpmyadmin
php > 8.1

# CONFIG
setup .env:
DATABASE_URL
API_URL

# INSTALLATION
composer install
php bin/console doctrine:database:create
php bin/console doctrine:fixtures:load
php bin/console doctrine:schema:update