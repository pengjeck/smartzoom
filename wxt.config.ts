import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "SmartZoom",
    description: "SmartZoom without touchpad",
    default_locale: "en",
    author: "JackPen",
    permissions: ['contextMenus', 'activeTab']
  },
  vite: () => ({
    plugins: [react()],
  }),
});
