
setup-monitor:
	docker compose -f ./docker/docker-compose.yml up -d

setup-edge-driver:
	curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
	sudo install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
	sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge.list'
	sudo apt update
	sudo apt install microsoft-edge-stable

run:
	sitespeed.io https://kiosk-sit3.qa.spdigital.sg/payment \
      --config config/config.json \
      --cpu \
      --slug myTest
	make setup-static-server

setup-static-server:
	docker compose -f ./docker/docker-compose.yml up -d sitespeed-server
