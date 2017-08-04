var React = require('react');

class MultiviewMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featureId: '',
      context: props.context
    };
    // Subscribe to featureId events.
    this.state.context.subscribe(this, this.onFeatureId);
  }
  onFeatureId(featureId, that) {
    // Update the state value for featureId.
    that.setState({ featureId: featureId });
  }
  render() {
    return (
      <div className='alert alert-success' role='alert'>
      <h3>Hello, from React!</h3>
      <span>
      { this.state.featureId }
      </span>
      </div>
    );
  }
}

export default MultiviewMapComponent;
