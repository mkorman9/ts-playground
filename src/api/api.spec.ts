import chai from 'chai';
import chaiHttp from 'chai-http';
import dayjs from 'dayjs';
import app from '../app';
import * as ip from '../providers/ip';

chai.use(chaiHttp);

describe('API', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return 200 when calling GET /', async () => {
    const response = await chai.request(app).get('/');
    expect(response.statusCode).toEqual(200);
  });

  it('should return 200 when calling GET /health/readiness', async () => {
    const response = await chai.request(app).get('/health/readiness');
    expect(response.statusCode).toEqual(200);
  });

  it('should return 200 when calling GET /health/liveness', async () => {
    const response = await chai.request(app).get('/health/liveness');
    expect(response.statusCode).toEqual(200);
  });

  it('should return 500 when calling GET /error', async () => {
    const response = await chai.request(app).get('/error');
    expect(response.statusCode).toEqual(500);
  });

  it('should return 200 when sending valid payload to PUT /payload', async () => {
    const payload = {
      name: 'John Doe',
      age: 37,
      timestamp: dayjs().toISOString()
    };
    const response = await chai.request(app)
      .put('/payload')
      .set('Content-Type', 'application/json')
      .send(payload);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(payload);
  });

  it('should return 400 when sending invalid payload to PUT /payload', async () => {
    const response = await chai.request(app)
      .put('/payload')
      .set('Content-Type', 'application/json')
      .send({
        name: '',
        age: 37.5,
        timestamp: 'invalidDate'
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.violations.length).toEqual(3);
  });

  it('should return given IP address when calling GET /ip', async () => {
    const givenIp = '10.0.0.1';
    const findPublicIpSpy = jest.spyOn(ip, 'findPublicIp')
      .mockReturnValue(Promise.resolve(givenIp));

    const response = await chai.request(app).get('/ip');
    expect(response.statusCode).toEqual(200);
    expect(response.body.ip).toEqual(givenIp);
    expect(findPublicIpSpy).toBeCalled();
  });
});
