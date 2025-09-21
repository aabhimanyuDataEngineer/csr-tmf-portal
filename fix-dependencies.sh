#!/bin/bash

echo "🔧 Fixing dependency conflicts..."

cd Container/frontend

# Remove problematic dependencies
rm -rf node_modules package-lock.json

# Install specific versions that work together
echo "📦 Installing compatible versions..."

# Install core React dependencies first
npm install react@18.2.0 react-dom@18.2.0 --save

# Install TypeScript and types
npm install typescript@4.9.5 --save-dev
npm install @types/react@18.0.28 @types/react-dom@18.0.11 @types/node@16.18.12 --save-dev

# Install Material-UI with compatible versions
npm install @mui/material@5.11.10 @emotion/react@11.10.5 @emotion/styled@11.10.5 @mui/icons-material@5.11.9

# Install React Router
npm install react-router-dom@6.8.1

# Install React Scripts last with force flag
npm install react-scripts@5.0.1 --save --force

# Install remaining dev dependencies
npm install @testing-library/jest-dom@5.16.5 @testing-library/react@13.4.0 @testing-library/user-event@14.4.3 web-vitals@2.1.4 --save-dev

echo "✅ Dependencies fixed! Starting development server..."
npm start