import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team'

chai.use(chaiHttp);

const { expect } = chai;

const mock: any = {
    id: 1,
    teamName: "Avaí/Kindermann"
}

describe('team', () => {
  afterEach(() => {
    sinon.restore();
  })

  describe('getAllTeam', async () => {
    it('sucesso', async () => {
        sinon.stub(Team, 'findAll').resolves([mock])

        const response = await chai.request(app).get('/teams')
        expect(response.status).to.equal(200)
    })
  })

})