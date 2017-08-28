import { expect } from 'chai';
import { MultiviewState } from './MultiviewState';
import * as sinon from 'sinon';
import * as nock from 'nock';

describe("MultiviewState", function() {
  describe.skip('change geojsonUrl', () => {
    it("nock works", () => {
      const scope = nock('http://localhost:9876').get('/whatever').reply(200, '{}');
      fetch('http://localhost:9876/whatever').then((resp)=> {console.log(resp);});
    });

    it("calls callback", () => {
      const scope = nock('http://localhost:9876').get('/whatever').reply(200, '{}');
      const multiviewState = new MultiviewState();
      const handleMultiviewStateChange = sinon.spy()
      multiviewState.subscribe(this, handleMultiviewStateChange);
      multiviewState.geojsonUrl = 'whatever';
      sinon.assert.calledOnce(handleMultiviewStateChange)
    });

    it("makes http request", () => {
      const multiviewState = new MultiviewState();
      const handleMultiviewStateChange = sinon.spy()
      multiviewState.subscribe(this, handleMultiviewStateChange);
      multiviewState.geojsonUrl = 'whatever';
      sinon.assert.calledOnce(handleMultiviewStateChange)
    });
  })
})
