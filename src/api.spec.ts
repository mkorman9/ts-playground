import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './app';
import dayjs from 'dayjs';

chai.use(chaiHttp);

describe('API', () => {
  test('it should return 200 when calling GET /', async () => {
    const response = await chai.request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('it should return 200 when calling GET /health/readiness', async () => {
    const response = await chai.request(app).get('/health/readiness');
    expect(response.statusCode).toBe(200);
  });

  test('it should return 200 when calling GET /health/liveness', async () => {
    const response = await chai.request(app).get('/health/liveness');
    expect(response.statusCode).toBe(200);
  });

  test('it should return 500 when calling GET /error', async () => {
    const response = await chai.request(app).get('/error');
    expect(response.statusCode).toBe(500);
  });

  test('it should return 200 when sending valid payload to PUT /payload', async () => {
    const payload = {
      name: 'John Doe',
      age: 37,
      timestamp: dayjs().toISOString()
    };
    const response = await chai.request(app)
      .put('/payload')
      .set('Content-Type', 'application/json')
      .send(payload);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(payload);
  });

  test('it should return 400 when sending invalid payload to PUT /payload', async () => {
    const response = await chai.request(app)
      .put('/payload')
      .set('Content-Type', 'application/json')
      .send({
        name: '',
        age: 37.5,
        timestamp: 'invalidDate'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.violations.length).toBe(3);
  });
});
