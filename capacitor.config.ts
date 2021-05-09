import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ir.mohammad.malekzad',
  appName: 'NC-Report',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      splashImmersive: true,
      launchShowDuration: 6000
    }
  }
};

export default config;
