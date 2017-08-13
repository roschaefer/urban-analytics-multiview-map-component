import React, { Component }  from 'react'
export class DebugViewComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			featureId: props.featureId,
			geojsonUrl: props.geojsonUrl,
			handleSubmit: props.handleSubmit
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

	handleSubmit(event) {
		console.log('A featureId was submitted: ', this.state.featureId);
		console.log('A geojsonUrl was submitted: ', this.state.geojsonUrl);
		this.state.handleSubmit(this.state.featureId, this.state.geojsonUrl);
		event.preventDefault();
	}

	render() {
		console.log('rendering the debug view');
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					FeatureId:
					<input
						type="text"
						name='featureId'
						value={this.state.featureId}
						onChange={this.handleInputChange} />
				</label>
				<label>
					GeoJsonURL:
					<input
						type="text"
						name='geojsonUrl'
						value={this.state.geojsonUrl}
						onChange={this.handleInputChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}
