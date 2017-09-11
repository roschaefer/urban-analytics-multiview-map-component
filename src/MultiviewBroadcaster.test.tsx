import { expect } from 'chai';
import { MultiviewBroadcaster } from './MultiviewBroadcaster';
import * as sinon from 'sinon';
import * as nock from 'nock';

describe("MultiviewBroadcaster", function() {
  describe.skip('change geojsonUrl', () => {
    it("nock works", () => {
      const scope = nock('http://localhost:9876').get('/whatever').reply(200, '{}');
      fetch('http://localhost:9876/whatever').then((resp)=> {console.log(resp);});
    });

    it("calls callback", () => {
      const scope = nock('http://localhost:9876').get('/whatever').reply(200, '{}');
      const multiviewState = new MultiviewBroadcaster();
      const handleMultiviewBroadcasterChange = sinon.spy()
      multiviewState.subscribe(this, handleMultiviewBroadcasterChange);
      multiviewState.geojsonUrl = 'whatever';
      sinon.assert.calledOnce(handleMultiviewBroadcasterChange)
    });

    it("makes http request", () => {
      const multiviewState = new MultiviewBroadcaster();
      const handleMultiviewBroadcasterChange = sinon.spy()
      multiviewState.subscribe(this, handleMultiviewBroadcasterChange);
      multiviewState.geojsonUrl = 'whatever';
      sinon.assert.calledOnce(handleMultiviewBroadcasterChange)
    });
  })
})
