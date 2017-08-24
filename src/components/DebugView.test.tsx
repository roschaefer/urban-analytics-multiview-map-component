import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { DebugView } from './DebugView';


describe('DebugView', function() {
    describe('form', function(){
        it('filled out featureId', function(){
            const wrapper = shallow(<DebugView
                featureId={42}
                geojsonUrl={null}
                handleSubmit={(formData) => {}}
                />);
            expect(wrapper.find('input[name="featureId"]').first().props().value).to.equal(42);
        });

        it('filled out geojsonUrl', function(){
            const wrapper = shallow(<DebugView
                featureId={null}
                geojsonUrl={'berlin.geojson'}
                handleSubmit={(formData) => {}}
                />);
            expect(wrapper.find('input[name="geojsonUrl"]').first().props().value).to.equal('berlin.geojson');
        })
    })
})
