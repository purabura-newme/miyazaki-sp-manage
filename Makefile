up:
	docker compose stop
	docker compose down --remove-orphans
	docker compose up -d
build:
	docker compose build --no-cache --force-rm
create-project:
	mkdir -p src
	@make build
	@make up
	@make fresh
init:
	docker compose down --remove-orphans
	docker compose up -d --build
	docker compose exec web composer install
	docker compose exec web php artisan vendor:publish --provider="Encore\Admin\AdminServiceProvider"
	docker compose exec web chmod -R 777 storage bootstrap/cache
	@make fresh
dev:
	@make destroy
	@make build
	@make up
	@make cache-clear
	docker compose exec web php artisan migrate:fresh
	docker compose exec web php artisan db:seed
	docker compose exec web php artisan db:seed --class=AdminTablesSeeder
clean:
	docker-compose down --volumes
remake:
	@make destroy
	@make init
stop:
	docker compose stop
down:
	docker compose down --remove-orphans
down-v:
	docker compose down --remove-orphans --volumes
restart:
	@make down
	@make up
destroy:
	docker compose down --rmi all --volumes --remove-orphans
ps:
	docker compose ps
logs:
	docker compose logs
logs-watch:
	docker compose logs --follow
log-web:
	docker compose logs web
log-web-watch:
	docker compose logs --follow web
log-app:
	docker compose logs app
log-app-watch:
	docker compose logs --follow app
log-db:
	docker compose logs db
log-db-watch:
	docker compose logs --follow db
web:
	docker compose exec web bash
app:
	docker compose exec web bash
migrate:
	docker compose exec web php artisan migrate
fresh:
	docker compose exec web php artisan migrate:fresh --seed
seed:
	docker compose exec web php artisan db:seed
dacapo:
	docker compose exec web php artisan dacapo
rollback-test:
	docker compose exec web php artisan migrate:fresh
	docker compose exec web php artisan migrate:refresh
tinker:
	docker compose exec web php artisan tinker
test:
	docker compose exec web php artisan test
optimize:
	docker compose exec web php artisan optimize
optimize-clear:
	docker compose exec web php artisan optimize:clear
cache:
	docker compose exec web composer dump-autoload -o
	@make optimize
	docker compose exec web php artisan event:cache
	docker compose exec web php artisan view:cache
cache-clear:
	docker compose exec web rm -f composer.lock
	docker compose exec web composer install -q -n --no-ansi --no-dev --no-scripts --no-progress --prefer-dist
	docker compose exec web composer update
	docker compose exec web composer clear-cache
	@make optimize-clear
	docker compose exec web php artisan vendor:publish --provider="Encore\Admin\AdminServiceProvider"
	docker compose exec web php artisan event:clear
	docker compose exec web php artisan cache:clear
	docker compose exec web php artisan config:clear
	docker compose exec web php artisan route:clear
	docker compose exec web php artisan view:clear
db:
	docker compose exec mysql bash
sql:
	docker compose exec mysql bash -c 'mysql -u $$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE'
redis:
	docker compose exec redis redis-cli
ide-helper:
	docker compose exec web php artisan clear-compiled
	docker compose exec web php artisan ide-helper:generate
	docker compose exec web php artisan ide-helper:meta
	docker compose exec web php artisan ide-helper:models --nowrite
