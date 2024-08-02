# NodeJS Challenge

## Project Setup

### Prerequisites
- Node.js (>= 12.x)
- npm (>= 6.x)
- SQL Server (MSSQL)

npm install
Configure Environment Variables
Create a .env file in the root directory and add the following environment variables:


DATABASE_URL="sqlserver://sa:Sa*****@DESKTOP-**/database=mydb;encrypt=true"
JWT_SECRET="your_secret_key"
Initialize Prisma
If you encounter issues with automatic Prisma setup, you can download the Prisma CLI manually:

Download the Prisma CLI: Prisma CLI Download
Extract the CLI to a suitable directory.
Then, initialize Prisma:

npx prisma init
npx prisma migrate dev --name init
Start the Server

node server.js
Running the Project
Open your browser and navigate to http://localhost:8080.
API Endpoints
Register: POST /register
Request body:

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password",
  "bio": "Test Bio",
  "location": "Test Location"
}
Login: POST /login
Request body:

{
  "email": "test@example.com",
  "password": "password"
}
Get Users: GET /users
Headers: { "Authorization": "Bearer <token>" }
Like User: POST /like
Request body:

{
  "likedUserId": "<user_id>"
}
Headers: { "Authorization": "Bearer <token>" }
Bulk Insert Users
Create a script named bulkUsers.js to add multiple users:

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
To run the bulk insert script:
node bulkUsers.js
