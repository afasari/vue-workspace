#!/bin/bash

cd vue-vite-pokedex
npm run build
cd ..
cp index.html dist/
npm run deploy