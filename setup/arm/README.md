## Is this the first machine you're setting up in your private network?
If this is the first machine in your network, copy the contents of the **first** directory to **/run/homelab**.

If you are adding an additional machine into your network, copy the contents of the **add-on** directory to **/run/homelab**.

If you are starting a new swarm, copy the contents of the **swarm** directory to **/run/homelab**.

## Considerations
Before copying anything, make sure your machine is set up correctly:
- update the machine's IP address with a Fixed Allocation from your DHCP provider (probably your home router)
- set up [docker and docker-compose](https://linuxhint.com/install_docker_raspberry_pi-2/)
- run the following command:
  ```
  sudo groupadd homelab ; sudo usermod -aG homelab $(whoami) ; sudo mkdir /run/homelab -m775 ; sudo chgrp homelab /run/homelab
  ```
- log out and back in for the above to take effect

*Once you've copied the files over, make sure to update **/run/homelab/compose/infrastructure/docker-compose.yaml** to replace **${hostname}** with your machine's hostname.*

## The Easy Button
If you're setting up a new machine and want to skip the hassle of copying the files down yourself, just run the code here to do it for you:
- first machine
```
wget https://cinderblockgames.github.io/homelab.express/setup/arm/homelab.express-first.sh
sh homelab.express-first.sh
```
- add-on machine
```
wget https://cinderblockgames.github.io/homelab.express/setup/arm/homelab.express-add-on.sh
sh homelab.express-add-on.sh
```

You'll still need to complete the steps under **Considerations** first, but you won't need to update the yaml file by hand; the scripts here take care of that for you.

## What now?

Head to `/run/homelab/compose/infrastructure/` and run `docker-compose up -d`.. and that's it!

If you've got your new lab's IP set in your hosts file, head to one of the following URLs to check out your new environment:
- https://manage.homelab.express
  - you will be prompted to set a password for access to portainer
- https://{hostname}.homelab.express
  - replace {hostname} with the hostname of your machine to view the traefik dashboard

Congratulations; you've hit the ground running!

(If this is an add-on machine, you'll need to add it to your portainer endpoints at https://manage.homelab.express.  The portainer agent on your add-on machine runs on port 9001.)

## Adding more containers

When standing up additional containers, all you need to do to have them served correctly by traefik behind our certificate is to ensure it's on the same network as traefik (`network_mode: bridge`) and add the following labels:
```
      - 'traefik.enable=true'
      - 'traefik.http.routers.{your-container}.rule=Host(`{your-subdomain}.homelab.express`)'
      - 'traefik.http.routers.{your-container}.entrypoints=web-secure'
      - 'traefik.http.routers.{your-container}.tls'
      - 'traefik.http.services.{your-container}.loadbalancer.server.port={your-port}'
```

Here is an example with the [whoami](https://hub.docker.com/r/containous/whoami) container, which stands up a lightweight demo server:
```
version: '3.8'

services:
  whoami:
    image: 'containous/whoami'
    container_name: whoami
    restart: always
    network_mode: bridge
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.whoami.rule=Host(`whoami.homelab.express`)'
      - 'traefik.http.routers.whoami.entrypoints=web-secure'
      - 'traefik.http.routers.whoami.tls'
      - 'traefik.http.services.whoami.loadbalancer.server.port=80'
```
