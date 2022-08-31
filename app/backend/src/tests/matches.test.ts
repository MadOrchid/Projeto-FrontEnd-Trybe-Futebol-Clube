import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches'


chai.use(chaiHttp);

const { expect } = chai;

const mock: any = {
    id: 1,
    teamName: "Avaí/Kindermann"
}

const mockMatch = {
    "homeTeam": 1, 
    "awayTeam": 2, 
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }

describe('matches', () => {
  afterEach(() => {
    sinon.restore();
  })

  describe('getAll', () => {
    it('sucess', async () => {
        const response = await chai.request(app)
        .get('/matches')

        expect(response.status).to.equal(200)
    })
  })

  describe('finish', () => {
    it('finish', async () => {
        await chai.request(app)
        .patch('/matches/1/finish')
    })
  })

  describe('update', () => {
    it('update', async () => {
        await chai.request(app)
        .post('/matches')
        .send(mockMatch)
    })
  })

})
