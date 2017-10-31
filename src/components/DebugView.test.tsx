import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { MultiviewController } from '../MultiviewController';
import * as DebugView from './DebugView';
import * as sinon from 'sinon';
import * as fetchMock from 'fetch-mock';


describe('DebugView', () => {
  let multiviewController: MultiviewController;

  describe('form', () => {
    beforeEach(() => {
      fetchMock.get('*', {});
      multiviewController = new MultiviewController();
    });

    afterEach(() => {
      multiviewController.clearAllSubscriptions();
    });

    it('filled out featureId', () => {
      const wrapper = shallow(<DebugView.DebugView
        featureId={42}
        controller={multiviewController}
        />);
      expect(wrapper.find('input[name="featureId"]').first().props().value).to.equal(42);
    });

    it('filled out geojsonUrl', () => {
      const wrapper = shallow(<DebugView.DebugView
        geojsonUrl={'berlin.geojson'}
        controller={multiviewController}
        />);
      expect(wrapper.find('input[name="geojsonUrl"]').first().props().value).to.equal('berlin.geojson');
    })

    describe('controller', () => {
      describe('subscribe', () => {
        it('rerenders when other views publish', (done) => {
          const wrapper = mount(<DebugView.DebugView
            controller={multiviewController}
            />);
          multiviewController.subscribe('mcv.reconfigure.url', (msg:string, data:any) =>{
            expect(wrapper.find('input[name="geojsonUrl"]').first().props().value).to.equal('example.json');
            done();
          });
          multiviewController.publish('mcv.reconfigure.url', 'example.json');
        })
      })

      describe('publish', () => {
        it('called once for all form fields', () => {
          const publish = sinon.spy(multiviewController, 'publish');
          const wrapper = mount(<DebugView.DebugView
            featureId={4711}
            controller={multiviewController}
            geojsonUrl={'bundeslaender.geojson'}
            />);
          wrapper.find('form').first().simulate('submit');
          expect(publish).to.have.property('callCount', 3);
        })

        it('sends featureId as number', () => {
          const publish = sinon.spy(multiviewController, 'publish');
          const wrapper = mount(<DebugView.DebugView
            controller={multiviewController}
            featureId={4711}
            geojsonUrl={'bundeslaender.geojson'}
            />);
          wrapper.find('input[name="featureId"]').first().simulate('change', {
            target: {
              name: 'featureId',
              value: '123'
            }
          });
          wrapper.find('input[type="submit"]').first().simulate('submit');
          sinon.assert.calledWith(publish, 'mcv.select.highlight', 123);
        })
      })
    })
  })
})
