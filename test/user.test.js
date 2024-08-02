const { expect } = require('chai');
const request = require('supertest');
const app = require('../server'); // Sunucu dosyanızın yolunu belirtin

describe('User API', () => {
  let token;

  before(async () => {
    // Test için bir kullanıcı oluşturun ve giriş yapın
    await request(app)
      .post('/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        bio: 'Test Bio',
        location: 'Test Location'
      });

    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password'
      });

    token = res.body.token;
  });

  it('should get list of users', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should like a user', async () => {
    const res = await request(app)
      .post('/like')
      .set('Authorization', `Bearer ${token}`)
      .send({ likedUserId: 1 });

    expect(res.status).to.equal(200);
  });

  it('should dislike a user', async () => {
    const res = await request(app)
      .post('/dislike')
      .set('Authorization', `Bearer ${token}`)
      .send({ dislikedUserId: 1 });

    expect(res.status).to.equal(200);
  });
});
