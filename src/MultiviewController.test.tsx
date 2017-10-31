import { expect } from 'chai';
import { MultiviewController } from './MultiviewController';
import * as sinon from 'sinon';
import * as fetchMock from 'fetch-mock';

const aGeojson:any = {
  "type": "FeatureCollection",
  "features": [ ]
}

describe("MultiviewController", function() {
  describe('mcv.reconfigure.url', () => {

    it.skip("makes http request and calls callback", () => {
      const multiviewController = new MultiviewController();
      const handleGeometry = sinon.spy()
      multiviewController.subscribe('mcv.reconfigure.geometry', handleGeometry);
      fetchMock.get('empty.geojson', JSON.stringify(aGeojson));

      multiviewController.publish('mcv.reconfigure.url', 'empty.geojson');
      sinon.assert.calledWith(handleGeometry, 'mcv.reconfigure.geometry', {hello: 'world'});
    });

  })
})
