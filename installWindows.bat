@echo off

cd /d "%~dp0"  REM Wechsel zum Ordner, in dem sich dieses Skript befindet

echo Ausführen von 'npm install' ...
npm install

REM Hier wird auf das Ende des npm install Befehls gewartet
REM Der Befehl TIMEOUT /T 1 wartet eine Sekunde, bevor er den nächsten Befehl ausführt
:WAIT_INSTALL
timeout /T 1 > nul
IF NOT EXIST node_modules\ (
    goto WAIT_INSTALL
)

echo 'npm install' abgeschlossen.

echo Ausführen von 'npm run start' ...
npm run start

pause
