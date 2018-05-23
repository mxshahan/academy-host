module.exports = {
  server: {
    port: 3000,
    compress: false
  },
  db: {
		host: 'ds111565.mlab.com',
		dbName: 'blog',
		debug: false,
		options: {
			userName: 'root',
			passWord: '12345',
			port: 11565
		}
	},
	secret: [
    'yoursecretkey'
  ],
  "grant": {
    "server": {
      "host": "localhost:3000"
    }
  },
  baseUrl: 'http://localhost:3000'
};
