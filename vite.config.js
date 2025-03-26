import basicSsl from '@vitejs/plugin-basic-ssl'

export default {
  base: '/Lab2',
  plugins: [
    basicSsl({
      name: 'test',
      domains: ['*.custom.com'],
      certDir: 'LICENCE',
    }),
  ],
}