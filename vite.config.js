import basicSsl from '@vitejs/plugin-basic-ssl'

export default {
  plugins: [
    basicSsl({
      name: 'test',
      domains: ['*.custom.com'],
      certDir: 'LICENCE',
    }),
  ],
}