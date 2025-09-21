#!/bin/bash

echo "🚀 Quick Start: Clinical Documentation Portal UI"
echo "=============================================="

# Navigate to frontend directory
cd Container/frontend

# Clean any existing installations
echo "🧹 Cleaning previous installations..."
rm -rf node_modules package-lock.json

# Install with legacy peer deps to avoid conflicts
echo "📦 Installing dependencies (this may take a few minutes)..."
npm install --legacy-peer-deps

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🌐 Starting development server..."
    echo "   The UI will open at: http://localhost:3000"
    echo ""
    echo "🎯 What you'll see:"
    echo "   • Professional clinical documentation interface"
    echo "   • CSR/TMF document navigation"
    echo "   • Advanced search with multiple modes"
    echo "   • AI summary panel with citations"
    echo "   • Regulatory compliance features"
    echo ""
    
    # Start the development server
    npm start
else
    echo "❌ Installation failed. Trying alternative approach..."
    echo ""
    echo "🔧 Manual installation steps:"
    echo "1. cd Container/frontend"
    echo "2. npm install --force"
    echo "3. npm start"
fi