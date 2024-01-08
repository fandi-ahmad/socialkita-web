import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// export default defineConfig(({ command, mode }) => {
//   const env = loadEnv(mode, process.cwd(), '');
//   return {
//     define: {
//       'process.env.SOCIALKITA_SERVER': JSON.stringify(env.SOCIALKITA_SERVER),
//       'process.env.BOOLEAN_VARIABLE': env.BOOLEAN_VARIABLE,
//       // If you want to exposes all env variables, which is not recommended
//       // 'process.env': env
//     },
//     plugins: [react()],
//   };
// });

export default defineConfig({
  plugins: [react()],
})