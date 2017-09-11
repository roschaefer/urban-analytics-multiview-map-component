import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { MultiviewMap } from './MultiviewMap';
import { MultiviewBroadcaster } from '../MultiviewBroadcaster';

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
    const multiviewState = new MultiviewBroadcaster();
    const wrapper = mount(<MultiviewMap context={multiviewState}/>);
    expect(wrapper.find('.multiview-map-component')).to.have.length(1);
  });

  it("renders .leaflet-container", () => {
    const multiviewState = new MultiviewBroadcaster();
    const wrapper = mount(<MultiviewMap context={multiviewState}/>);
    expect(wrapper.find('.leaflet-container')).to.have.length(1);
  });

  describe('handleMultiviewBroadcasterChange', () => {
    it('rerenders DebugView', () => {
    const multiviewState = new MultiviewBroadcaster();
    const wrapper = mount(<MultiviewMap context={multiviewState}/>);
    multiviewState.featureId = 43;
    expect(wrapper.find('input[name="featureId"]').first().props().value).to.eq(43);
    })
  })

  describe('.leaflet-container', ()=> {
    describe('click on feature', () => {
      it('updates featureId', ()=>{
        const multiviewState = new MultiviewBroadcaster();
        const wrapper = mount(<MultiviewMap context={multiviewState}/>);
        multiviewState.geojson = aGeojson;
      });
    })
  })
})
