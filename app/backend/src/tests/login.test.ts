import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

chai.use(chaiHttp);

const { expect } = chai;

const mock: any = {
  id: 1,
  username: 'test',
  role: 'any',
  email: 'test@test.com',
  password: '123456',
}

describe('login', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('login sucess', async () => {
    sinon.stub(User, 'findOne').resolves(mock as any);

    const response = await chai.request(app).post('/login');
    expect(response.body).to.have.key('token');
  })
})