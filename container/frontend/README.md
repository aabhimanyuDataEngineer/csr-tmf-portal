# Clinical Documentation Portal - Frontend

This is the React frontend for the AI-Powered Clinical Documentation Portal.

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Running the Development Server

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Features Demonstrated

- **Professional Clinical UI**: Material-UI components optimized for clinical research
- **Document Navigator**: Toggle between CSR (ICH E3) and TMF (Reference Model) structures
- **Advanced Search Interface**: Keyword, semantic, and hybrid search modes with filters
- **AI Summary Panel**: Mock AI-powered summarization with citation provenance
- **Responsive Layout**: Professional dashboard layout with navigation sidebar
- **Compliance Features**: Audit trails, regulatory compliance indicators

### UI Components

- `AppLayout`: Main application layout with navigation
- `DocumentNavigator`: CSR/TMF document tree navigation
- `SearchInterface`: Advanced search with multiple modes and filters  
- `SearchResults`: Search results with citations and highlights
- `AISummaryPanel`: AI-powered document summarization
- `Dashboard`: Main dashboard combining all components

### Mock Data

The UI currently uses mock data to demonstrate functionality:
- Sample CSR documents following ICH E3 structure
- Sample TMF documents following TMF Reference Model
- Mock search results with citations and highlights
- Sample AI summaries with provenance tracking

### Next Steps

Once you're satisfied with the UI, the backend API integration will replace the mock data with real functionality from the FastAPI backend.

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier