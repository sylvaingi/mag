#!/bin/bash
echo "Extracting bundle..."
tar xf bundle.tar.gz

echo "Reconfiguring fibers..."
cd bundle/server
rm -rf node_modules/fibers
npm uninstall fibers
npm install fibers

echo -e "\nLaunching app"
cd ..
export PORT="3000"
export MONGO_URL="mongodb://localhost:27017/mag"
nohup forever main.js > /dev/null &