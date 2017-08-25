import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import * as DebugView from './DebugView';
import * as sinon from 'sinon';

describe('DebugView', () => {
  describe('form', () => {
    it('filled out featureId', () => {
      const wrapper = shallow(<DebugView.DebugView
        featureId={42}
        geojsonUrl={null}
        onSubmit={(formData: DebugView.FormData) => {}}
        />);
      expect(wrapper.find('input[name="featureId"]').first().props().value).to.equal(42);
    });

    it('filled out geojsonUrl', () => {
      const wrapper = shallow(<DebugView.DebugView
        featureId={null}
        geojsonUrl={'berlin.geojson'}
        onSubmit={(formData: DebugView.FormData) => {}}
        />);
      expect(wrapper.find('input[name="geojsonUrl"]').first().props().value).to.equal('berlin.geojson');
    })

    describe('onSubmit', () => {
      it('called when form is submitted', () => {
        const onSubmit = sinon.spy();
        const wrapper = mount(<DebugView.DebugView
          featureId={4711}
          geojsonUrl={'bundeslaender.geojson'}
          onSubmit={onSubmit}
          />);
        wrapper.find('form').first().simulate('submit');
        expect(onSubmit).to.have.property('callCount', 1);
      })

      it('sends featureId as number', () => {
        const onSubmit = sinon.spy();
        const wrapper = mount(<DebugView.DebugView
          featureId={4711}
          geojsonUrl={'bundeslaender.geojson'}
          onSubmit={onSubmit}
          />);
        wrapper.find('input[name="featureId"]').first().simulate('change', {
          target: {
            name: 'featureId',
            value: '123'
          }
        });
        wrapper.find('input[type="submit"]').first().simulate('submit');
        sinon.assert.calledWith(onSubmit, {
          featureId: 123,
          geojsonUrl: 'bundeslaender.geojson'
        })
      })
    })
  })
})
