const mssql = require('mssql');

const config = {
  user: 'sa',
  password: 'Sa123456*',
  server: 'DESKTOP-030', // veya sunucunuzun adı/IP'si
  database: 'mydb',
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

mssql.connect(config, async err => {
  if (err) console.log(err);
  else {
    console.log('Veritabanına bağlanıldı');

    for (let i = 1; i <= 100; i++) {
      const name = `User${i}`;
      const email = `user${i}@example.com`;
      const password = 'password';
      const bio = `Bio for User${i}`;
      const location = `Location${i}`;
  
      try {
        const request = new mssql.Request();
        await request.query(`INSERT INTO Users (name, email, password, bio, location) VALUES ('${name}', '${email}', '${password}', '${bio}', '${location}')`);
        console.log(`User${i} added`);
      } catch (err) {
        console.error(`User${i} eklenirken bir hata oluştu`, err);
      }
    }

    mssql.close();
  }
});
