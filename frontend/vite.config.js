import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        welcome: './index.html',
        feed: './feed/index.html',
        myProfile: './MyProfile/index.html',
        post: './post/index.html',
        authLogin: './auth/login/index.html',
        authRegister: './auth/register/index.html',
      },
    },
    target: 'esnext',
  },
  server: {
    port: 3000,
  },
});
