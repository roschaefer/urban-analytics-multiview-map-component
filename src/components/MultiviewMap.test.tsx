import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { MultiviewMap } from './MultiviewMap';
import { MultiviewController } from '../MultiviewController';
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

describe("MultiviewMap", function() {
  it("renders", () => {
    const multiviewController = new MultiviewController();
    const wrapper = mount(<MultiviewMap controller={multiviewController}/>);
    expect(wrapper.find('.multiview-map-component')).to.have.length(1);
  });

  it("renders .leaflet-container", () => {
    const multiviewController = new MultiviewController();
    const wrapper = mount(<MultiviewMap controller={multiviewController}/>);
    expect(wrapper.find('.leaflet-container')).to.have.length(1);
  });

  describe('.leaflet-container', ()=> {
    describe('click on feature', () => {
      it('updates featureId', ()=>{
        const multiviewController = new MultiviewController();
        const wrapper = mount(<MultiviewMap controller={multiviewController}/>);
        multiviewController.publish('reconfigure geometry', aGeojson);
      });
    })
  })
})
