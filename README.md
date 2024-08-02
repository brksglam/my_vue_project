# NodeJS Challenge

## Project Setup

### Prerequisites
- Node.js (>= 12.x)
- npm (>= 6.x)
- SQL Server (MSSQL)

### Clone the Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```
## Install Dependencies

```bash
npm install
```
npm install

## Configure Environment Variables
```bash
DATABASE_URL="sqlserver://sa:Sa*****@DESKTOP-**/database=mydb;encrypt=true"
JWT_SECRET="your_secret_key"
```
## Initialize Prisma
```bash
npx prisma init
npx prisma migrate dev --name init
```
## Start the Server
```bash
node server.js
```
## API Endpoints
## Register: POST /register
```bash
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password",
  "bio": "Test Bio",
  "location": "Test Location"
}
```
## Login: POST /login
```bash
{
  "email": "test@example.com",
  "password": "password"
}
```
## Get Users: GET /users
```bash
Headers: { "Authorization": "Bearer <token>" }
```
## Like User: POST /like
```bash
{
  "likedUserId": "<user_id>"
}
```
## Bulk Insert Users
```bash
const mssql = require('mssql');

const config = {
  user: 'sa',
  password: 'Sa123456*',
  server: 'DESKTOP-030',
  database: 'mydb',
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true
  },
  port: 1433
};

mssql.connect(config, async err => {
  if (err) {
    console.error('Veritabanına bağlanırken hata:', err);
  } else {
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
        console.error('Kullanıcı eklenirken hata oluştu:', err);
      }
    }
    process.exit();
  }
});

```
## To run the bulk insert script:
```bash
node bulkUsers.js

```



