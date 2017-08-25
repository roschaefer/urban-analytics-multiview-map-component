import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { MultiviewMap } from './MultiviewMap';
import { MultiviewState } from '../MultiviewState';

describe("MultiviewMap", function() {
  it("true is true", function() {
    expect(true).to.be.true;
  });

  it("renders", function() {
    const multiviewState = new MultiviewState();
    const wrapper = mount(<MultiviewMap context={multiviewState}/>);
    expect(wrapper.find('.multiview-map-component')).to.have.length(1);
  });

  it("renders .leaflet-container", function() {
    const multiviewState = new MultiviewState();
    const wrapper = mount(<MultiviewMap context={multiviewState}/>);
    expect(wrapper.find('.leaflet-container')).to.have.length(1);
  });

  describe('handleMultiviewStateChange', () => {
    it('rerenders DebugView', () => {
    const multiviewState = new MultiviewState();
    const wrapper = mount(<MultiviewMap context={multiviewState}/>);
    multiviewState.featureId = 43;
    expect(wrapper.find('input[name="featureId"]').first().props().value).to.eq(43);
    })
  })
})
