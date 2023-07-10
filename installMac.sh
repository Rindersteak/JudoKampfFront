#!/bin/bash

# Aktuelle Gatekeeper-Einstellungen speichern
current_setting=$(spctl --status)

# Gatekeeper-Einstellungen vorübergehend deaktivieren
sudo spctl --master-disable

# Skript ausführen
cd "$(dirname "$0")"  # Wechsel zum Ordner, in dem sich dieses Skript befindet
echo "Ausführen von 'npm install' ..."
npm install

echo "'npm install' abgeschlossen."

echo "Ausführen von 'npm run start' ..."
npm run start

# Gatekeeper-Einstellungen wiederherstellen
sudo spctl --$current_setting

read -p "Drücke eine beliebige Taste, um fortzufahren."
