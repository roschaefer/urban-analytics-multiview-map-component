import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { MapComponent } from './MapComponent';
import { MultiviewCoordinator } from '../MultiviewCoordinator';
import * as fetchMock from 'fetch-mock';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const aGeojson:any = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              5.712890625,
              47.040182144806664
            ],
            [
              15.073242187499998,
              47.040182144806664
            ],
            [
              15.073242187499998,
              54.99022172004893
            ],
            [
              5.712890625,
              54.99022172004893
            ],
            [
              5.712890625,
              47.040182144806664
            ]
          ]
        ]
      }
    }
  ]
}

describe("MapComponent", function() {
  describe('controller', ()=> {
    let multiviewController: MultiviewCoordinator;

    beforeEach(() => {
      fetchMock.get('*', {});
      multiviewController = new MultiviewCoordinator();
    });

    afterEach(() => {
      multiviewController.clearAllSubscriptions();
    });

    it("renders", () => {
      const wrapper = mount(<MapComponent controller={multiviewController}/>);
      expect(wrapper.find('.multiview-map-component')).to.have.length(1);
    });

    it.skip("renders .leaflet-container", () => {
      const wrapper = mount(<MapComponent controller={multiviewController}/>);
      wrapper.update();
      expect(wrapper.find('.leaflet-pane')).to.have.length(1);
    });

    describe('publish geometry', () => {
      it.skip('renders GeoJSON as svg', (done)=>{
        const wrapper = mount(<MapComponent controller={multiviewController}/>);
        multiviewController.subscribe('mcv.reconfigure.geometry', (msg:string, data:any) =>{
          wrapper.update();
          expect(wrapper.find('svg')).to.have.length(1);
          done();
        });
        multiviewController.publish('mcv.reconfigure.geometry', 'something.geojson');
        multiviewController.publish('mcv.reconfigure.geometry', aGeojson);
      });
    })
  })
})
