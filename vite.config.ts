// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa'; // <--- Import the plugin

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    VitePWA({ // <--- Add the PWA plugin configuration
      registerType: 'autoUpdate', // Automatically updates the service worker when new content is available
      injectRegister: 'auto', // Let the plugin handle service worker registration
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,woff,ttf,eot}'], // Files to precache
        runtimeCaching: [ // Cache network requests (e.g., API calls, images)
          {
            urlPattern: /^https:\/\/source\.unsplash\.com\/.*/i, // Cache Unsplash images
            handler: 'CacheFirst', // Strategy: Cache first, then network
            options: {
              cacheName: 'unsplash-images-cache',
              expiration: {
                maxEntries: 60, // Max number of images to cache
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200] // Cache successful responses
              }
            }
          },
          // Add more caching rules if needed (e.g., for your Gemini API if you implement it)
          // {
          //   urlPattern: /^https:\/\/generativelanguage\.googleapis\.com\/.*/i,
          //   handler: 'NetworkFirst', // Strategy: Network first, then cache
          //   options: {
          //     cacheName: 'api-cache',
          //     networkTimeoutSeconds: 10, // Timeout for network request
          //     expiration: {
          //       maxEntries: 50,
          //       maxAgeSeconds: 24 * 60 * 60 // 1 Day
          //     },
          //     cacheableResponse: {
          //       statuses: [0, 200]
          //     }
          //   }
          // }
        ]
      },
      includeAssets: ['robots.txt', 'icons/*.png', 'icons/*.svg'], // Include specific assets from public dir
      manifest: {
        name: 'Travel-Lore',
        short_name: 'TravelLore',
        description: 'Discover beautiful travel itineraries inspired by Vincent van Gogh',
        theme_color: '#324577', // Example: Van Gogh Navy - Adjust as needed for splash screen/toolbar
        background_color: '#1A1F2C', // Example: Van Gogh Blue - Adjust as needed for splash screen background
        display: 'standalone', // Makes the app look like a native app
        scope: '/',
        start_url: '/',
        icons: [ // --- IMPORTANT: You need to create these icons ---
          {
            src: 'icons/icon-192x192.png', // Path relative to 'public' folder
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png', // Path relative to 'public' folder
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true // Enable PWA features in development (optional, for testing)
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));