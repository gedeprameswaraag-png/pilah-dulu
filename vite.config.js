import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' membuat hasil build bisa di-host di subfolder (GitHub Pages, dll).
export default defineConfig({ plugins: [react()], base: './' })
