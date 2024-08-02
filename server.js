const express = require('express');
const bodyParser = require('body-parser');
const mssql = require('mssql');
const app = express();

app.use(bodyParser.json());

const config = {
  user: 'sa',
  password: 'Sa123456*',
  server: 'DESKTOP-030', // veya sunucunuzun adı/IP'si
  database: 'mydb',
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true // Bu seçeneği ekleyerek SSL sertifika sorunlarını bypass edebilirsiniz.
  },
  port: 1433 // SQL Server portu
};

mssql.connect(config, err => {
  if (err) {
    console.error('Veritabanına bağlanırken hata:', err);
  } else {
    console.log('Veritabanına bağlanıldı');
  }
});

// Kullanıcı kayıt işlemi
app.post('/register', async (req, res) => {
  const { name, email, password, bio, location } = req.body;
  try {
    const request = new mssql.Request();
    await request.query(`INSERT INTO Users (name, email, password, bio, location) VALUES ('${name}', '${email}', '${password}', '${bio}', '${location}')`);
    res.status(200).send('Kullanıcı başarıyla kaydedildi');
  } catch (err) {
    res.status(500).send('Kullanıcı kaydedilirken bir hata oluştu');
  }
});

// Kullanıcı giriş işlemi
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const request = new mssql.Request();
    const result = await request.query(`SELECT * FROM Users WHERE email='${email}' AND password='${password}'`);
    if (result.recordset.length > 0) {
      res.status(200).json({ message: 'Giriş başarılı' });
    } else {
      res.status(401).send('Geçersiz email veya şifre');
    }
  } catch (err) {
    res.status(500).send('Giriş işlemi sırasında bir hata oluştu');
  }
});

// Kullanıcı listesi
app.get('/users', async (req, res) => {
  try {
    const request = new mssql.Request();
    const result = await request.query('SELECT * FROM Users');
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send('Kullanıcılar alınırken bir hata oluştu');
  }
});

const port = 8080; // Portu 8080 olarak değiştirdik
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
