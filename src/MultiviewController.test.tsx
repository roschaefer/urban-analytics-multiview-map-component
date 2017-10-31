import { expect } from 'chai';
import { MultiviewController } from './MultiviewController';
import * as sinon from 'sinon';
import * as fetchMock from 'fetch-mock';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const aGeojson:any = {
  "type": "FeatureCollection",
  "features": [ ]
}

describe("MultiviewController", function() {
  describe('mcv.reconfigure.url', () => {

    it("makes http request and calls callback", (done) => {
      const multiviewController = new MultiviewController();
      const handleGeometry = (msg:string, data:any) => {
        expect(data['type']).to.eq('FeatureCollection');
        done();
      }
      multiviewController.subscribe('mcv.reconfigure.geometry', handleGeometry);
      fetchMock.get('some.geojson', JSON.stringify(aGeojson));

      multiviewController.publish('mcv.reconfigure.url', 'some.geojson');
    });

  })
})
