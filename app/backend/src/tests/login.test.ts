import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
import * as bcrypt from 'bcryptjs'

chai.use(chaiHttp);

const { expect } = chai;

const mock = {
  id: 1,
  username: 'test',
  role: 'any',
  email: 'test@test.com',
  password: '123456',
}

const mockLogin = {
  email: 'test@test.com',
  password: '123456',
}

describe('login', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('login sucesso', async () => {
    sinon.stub(User, 'findOne').resolves(mock as any);
    sinon.stub(bcrypt, 'compareSync').returns(true);

    const response = await chai.request(app).post('/login').send(mockLogin);
    expect(response.body).to.have.key('token');
  })
})