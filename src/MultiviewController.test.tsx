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

    it("makes http request", () => {
      const scope = nock('http://localhost:9876').get('/whatever').reply(200, '{}');
      const multiviewState = new MultiviewController();
      const handleMultiviewControllerChange = sinon.spy()
      multiviewState.subscribe('reconfigure url', handleMultiviewControllerChange);
      multiviewState.publish('reconfigure url', 'whatever');
      sinon.assert.calledOnce(handleMultiviewControllerChange)
    });

    it("calls callback", () => {
      const multiviewState = new MultiviewController();
      const handleMultiviewControllerChange = sinon.spy()
      multiviewState.subscribe('reconfigure url', handleMultiviewControllerChange);
      multiviewState.publish('reconfigure url', 'whatever');
      sinon.assert.calledOnce(handleMultiviewControllerChange)
    });
  })
})
