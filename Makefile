PHONY: network dbuild drun dstop

network:
	docker network create recipify-network || true

dbuild:
	docker build -t recipify-local-image:local .

drun:
	docker compose up

dstop:
	docker compose down