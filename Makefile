start:
	docker-compose up -d

stop:
	docker-compose down

clean:
	docker-compose down --volumes
