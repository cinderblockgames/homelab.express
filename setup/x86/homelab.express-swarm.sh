#!/bin/sh

homelab="/run/homelab"

if [ ! -d $homelab ]; then

  yellow=`tput setaf 3`
  reset=`tput sgr0`

  echo "Directory $homelab has not been set up."
  echo "Please run the following commands and log out and back in before running this script."
  echo
  echo "${yellow}sudo groupadd homelab ; sudo usermod -aG homelab $(whoami) ; sudo mkdir $homelab -m775 ; sudo chgrp homelab $homelab${reset}"
  echo "${yellow}docker swarm init${reset}"
  echo "${yellow}docker network create --opt encrypted --driver overlay swarm${reset}"
  echo

else

  compose="$homelab/compose"
  storage="$homelab/storage"

  # make folder structure
  mkdir -p $compose/infrastructure
  mkdir -p $storage/portainer
  mkdir -p $storage/traefik/config/certs

  # download files
  base="https://cinderblockgames.github.io/homelab.express/setup/x86/swarm"
  wget $base/compose/infrastructure/docker-compose.yaml -O $compose/infrastructure/docker-compose.yaml
  wget $base/storage/traefik/traefik.toml -O $storage/traefik/traefik.toml
  wget $base/storage/traefik/config/certs.toml -O $storage/traefik/config/certs.toml

fi
