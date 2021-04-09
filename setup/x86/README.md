## Is this the first machine you're setting up in your private network?
If this is the first machine in your network, copy the contents of the **first** directory to **/run/homelab**.

If you are adding an additional machine into your network, copy the contents of the **add-on** directory to **/run/homelab**.

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
