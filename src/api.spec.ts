import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

chai.use(chaiHttp);

describe('API', () => {
  test('it should return 200 when calling /health/readiness', async () => {
    const response = await chai.request(app).get('/health/readiness');
    expect(response.statusCode).toEqual(200);
  });

  test('it should return 200 when calling /health/liveness', async () => {
    const response = await chai.request(app).get('/health/liveness');
    expect(response.statusCode).toEqual(200);
  });
});
