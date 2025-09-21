#!/bin/bash

# Start the frontend development server
echo "Starting AI-Powered Clinical Documentation Portal Frontend..."

cd Container/frontend

# Clean install with legacy peer deps to resolve conflicts
echo "Installing dependencies with legacy peer deps..."
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Start the development server
echo "Starting development server on http://localhost:3000"
npm start