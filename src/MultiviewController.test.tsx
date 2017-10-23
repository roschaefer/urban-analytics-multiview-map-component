import { expect } from 'chai';
import { MultiviewController } from './MultiviewController';
import * as sinon from 'sinon';
import * as nock from 'nock';

describe("MultiviewController", function() {
  describe.skip('change geojsonUrl', () => {
    it("nock works", () => {
      const scope = nock('http://localhost:9876').get('/whatever').reply(200, '{}');
      fetch('http://localhost:9876/whatever').then((resp)=> {console.log(resp);});
    });

    it("calls callback", () => {
      const scope = nock('http://localhost:9876').get('/whatever').reply(200, '{}');
      const multiviewState = new MultiviewController();
      const handleMultiviewControllerChange = sinon.spy()
      multiviewState.subscribe(handleMultiviewControllerChange);
      multiviewState.geojsonUrl = 'whatever';
      sinon.assert.calledOnce(handleMultiviewControllerChange)
    });

    it("makes http request", () => {
      const multiviewState = new MultiviewController();
      const handleMultiviewControllerChange = sinon.spy()
      multiviewState.subscribe(handleMultiviewControllerChange);
      multiviewState.geojsonUrl = 'whatever';
      sinon.assert.calledOnce(handleMultiviewControllerChange)
    });
  })
})
