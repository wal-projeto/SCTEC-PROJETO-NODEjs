const { Client } = require('pg');

const client = new Client({
  user: 'postgres',         // seu usuário do postgres
  host: 'localhost',
  database: 'sctec_db', 
  password: '28026',
  port: 5432,
});

client.connect()
  .then(() => {
    console.log('✅ Sucesso! Conectado ao banco.');
    return client.end();
  })
  .catch(err => {
    console.error('❌ Erro de conexão:', err.message);
  });
