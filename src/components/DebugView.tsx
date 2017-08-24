import * as React from "react";
export interface DebugViewProps {
    featureId: number;
    geojsonUrl: string;
    handleSubmit: (featureId: number, geojsonUrl: string) => void;
}

export class DebugView extends React.Component<DebugViewProps, DebugViewProps> {
	constructor(props: DebugViewProps) {
		super(props);
		this.state = {
			featureId: props.featureId,
			geojsonUrl: props.geojsonUrl,
			handleSubmit: props.handleSubmit
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event: any) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

	handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
				<button type="submit" value="Submit" />
			</form>
		);
	}
}
