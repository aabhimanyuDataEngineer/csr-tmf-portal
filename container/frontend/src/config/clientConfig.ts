// Simple client configuration for single-client deployment
export interface ClientConfig {
  clientName: string;
  clientLogo: string;
  myLogo: string;
  backgroundImage?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

// Get client configuration from environment variables
export const getCurrentClientConfig = (): ClientConfig => {
  return {
    clientName: process.env.REACT_APP_CLIENT_NAME || 'Clinical Portal',
    clientLogo: '/assets/client/logo.png',
    myLogo: '/assets/logos/usefulbi_logo.png',
    backgroundImage: process.env.REACT_APP_BACKGROUND_IMAGE || '/assets/backgrounds/picture1.jpg',
    primaryColor: process.env.REACT_APP_PRIMARY_COLOR || '#007AFF',
    secondaryColor: process.env.REACT_APP_SECONDARY_COLOR || '#1D1D1F',
    accentColor: process.env.REACT_APP_ACCENT_COLOR || '#FF9500'
  };
};