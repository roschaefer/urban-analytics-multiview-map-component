import * as React from "react";
export interface FormData {
  featureId: number;
  geojsonUrl: string;
}
export interface Props {
  featureId: number;
  geojsonUrl: string;
  handleSubmit: (formData: FormData) => void;
}

export class DebugView extends React.Component<Props, Props> {
  constructor(props: Props) {
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
    this.state.handleSubmit({
      featureId: this.state.featureId,
      geojsonUrl: this.state.geojsonUrl
    });
    event.preventDefault();
  }

  render() {
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
