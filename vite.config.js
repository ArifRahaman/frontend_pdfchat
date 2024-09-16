// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//     server: {
//     port: 5173,
//   },

// })
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: process.env.PORT || 5173,  // Use the PORT provided by Render or fallback to 3000 for local
//     host: '0.0.0.0',  // Bind to 0.0.0.0 so it's accessible externally
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Set the port to 5173
    host: '0.0.0.0',  // Ensure it binds to all network interfaces
  },
});
