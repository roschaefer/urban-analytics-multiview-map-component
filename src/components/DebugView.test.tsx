import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import * as DebugView from './DebugView';
import { spy } from 'sinon';

describe('DebugView', () => {
    describe('form', () => {
        it('filled out featureId', () => {
            const wrapper = shallow(<DebugView.DebugView
                featureId={42}
                geojsonUrl={null}
                handleSubmit={(formData: DebugView.FormData) => {}}
                />);
            expect(wrapper.find('input[name="featureId"]').first().props().value).to.equal(42);
        });

        it('filled out geojsonUrl', () => {
            const wrapper = shallow(<DebugView.DebugView
                featureId={null}
                geojsonUrl={'berlin.geojson'}
                handleSubmit={(formData: DebugView.FormData) => {}}
                />);
            expect(wrapper.find('input[name="geojsonUrl"]').first().props().value).to.equal('berlin.geojson');
        })

        it('sends state on submit', () => {
            const onSubmit = spy();
            const wrapper = mount(<DebugView.DebugView
                featureId={4711}
                geojsonUrl={'bundeslaender.geojson'}
                handleSubmit={onSubmit}
                />);
            wrapper.find('form').first().simulate('submit');
            expect(onSubmit).to.have.property('callCount', 1);
        })
    })
})
