#!/bin/bash

echo "🚀 Creating Simple Clinical Documentation Portal UI"
echo "================================================="

# Create a fresh React app with TypeScript
echo "📦 Creating fresh React app..."
npx create-react-app clinical-portal-ui --template typescript

# Navigate to the new app
cd clinical-portal-ui

# Install Material-UI
echo "🎨 Installing Material-UI..."
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

# Install React Router
echo "🔗 Installing React Router..."
npm install react-router-dom

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. cd clinical-portal-ui"
echo "2. Copy the UI components from Container/frontend/src/components"
echo "3. npm start"
echo ""
echo "This creates a clean React app that will definitely work!"