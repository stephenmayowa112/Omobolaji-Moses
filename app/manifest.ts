import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Omobolaji Moses | Producer & Director',
    short_name: 'Omobolaji Moses',
    description: 'Portfolio of Omobolaji Moses, Producer and Director specializing in 3D animation, short films, and feature films.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e1e1e',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
