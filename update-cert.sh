#!/bin/sh

source="https://raw.githubusercontent.com/cinderblockgames/homelab.express/main/web/cert/"
cer="wildcard.homelab.express.cer"
key="wildcard.homelab.express.key"
pfx="wildcard.homelab.express.pfx"

# keep files current
wget "$source$cer" -O "/var/www/html/cert/$cer"
wget "$source$key" -O "/var/www/html/cert/$key"
wget "$source$pfx" -O "/var/www/html/cert/$pfx"
