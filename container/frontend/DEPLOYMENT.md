# Client Deployment Guide

## Simple Single-Client Deployment

This application supports easy branding for different clients through environment variables and asset files.

### Step 1: Prepare Client Assets

Place your client files in the `public/assets/client/` folder:

```
public/assets/client/
├── logo.png          # Client logo (recommended: 120x40px or similar aspect ratio)
└── background.jpg     # Background image (optional, recommended: 1920x1080px)
```

### Step 2: Configure Environment Variables

Create or update the `.env` file with your client information:

```bash
# Client Configuration
REACT_APP_CLIENT_NAME=YourClientName
REACT_APP_LOGO_IMAGE=/assets/client/logo.png
REACT_APP_BACKGROUND_IMAGE=/assets/client/background.jpg
REACT_APP_COMPANY_CODE=UBI
REACT_APP_PRIMARY_COLOR=#1976d2
REACT_APP_SECONDARY_COLOR=#dc004e

# System Configuration
SKIP_PREFLIGHT_CHECK=true
GENERATE_SOURCEMAP=false
```

### Step 3: Build and Deploy

```bash
npm run build
```

The built application will automatically use your client branding.

## Configuration Options

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_CLIENT_NAME` | Client company name | `Gilead`, `Exelixis`, `AbbVie` |
| `REACT_APP_LOGO_IMAGE` | Path to client logo | `/assets/client/logo.png` |
| `REACT_APP_BACKGROUND_IMAGE` | Path to background image | `/assets/client/background.jpg` |
| `REACT_APP_COMPANY_CODE` | Company code suffix | `CMC RA`, `UBI` |
| `REACT_APP_PRIMARY_COLOR` | Primary brand color | `#E91E63`, `#2196F3` |
| `REACT_APP_SECONDARY_COLOR` | Secondary brand color | `#1976d2`, `#FF9800` |

## Examples

### Gilead Deployment
```bash
REACT_APP_CLIENT_NAME=Gilead
REACT_APP_COMPANY_CODE=CMC RA
REACT_APP_PRIMARY_COLOR=#E91E63
```
**Result:** `🏢 Gilead | CMC RA` in top-right corner

### Exelixis Deployment
```bash
REACT_APP_CLIENT_NAME=Exelixis
REACT_APP_COMPANY_CODE=UBI
REACT_APP_PRIMARY_COLOR=#2196F3
```
**Result:** `🏢 Exelixis | UBI` in top-right corner

### AbbVie Deployment
```bash
REACT_APP_CLIENT_NAME=AbbVie
REACT_APP_COMPANY_CODE=UBI
REACT_APP_PRIMARY_COLOR=#673AB7
```
**Result:** `🏢 AbbVie | UBI` in top-right corner

## Docker Deployment

For containerized deployment, pass environment variables to the container:

```bash
docker run -e REACT_APP_CLIENT_NAME="Gilead" \
           -e REACT_APP_COMPANY_CODE="CMC RA" \
           -e REACT_APP_PRIMARY_COLOR="#E91E63" \
           your-clinical-portal-image
```

## File Structure

```
Container/frontend/
├── public/assets/client/
│   ├── logo.png              # Replace with client logo
│   └── background.jpg        # Replace with client background
├── .env                      # Environment configuration
└── src/config/clientConfig.ts # Configuration logic
```

That's it! The application will automatically display your client branding in the format: **`<Logo> ClientName | CompanyCode`**