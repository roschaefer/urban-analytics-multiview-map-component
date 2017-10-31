import * as React from "react";
import { MultiviewController } from '../MultiviewController';

export interface Props {
  controller: MultiviewController;
  featureId?: number;
  focusId?: number;
  geojsonUrl?: string;
}
export interface State{
  controller: MultiviewController;
  featureId: number;
  focusId: number;
  geojsonUrl: string;
}

export class DebugView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      controller: props.controller,
      featureId: props.featureId,
      focusId: props.focusId,
      geojsonUrl: props.geojsonUrl
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHighlight= this.handleHighlight.bind(this);
    this.handleFocus= this.handleFocus.bind(this);
    this.handleUrl= this.handleUrl.bind(this);
  }

  componentDidMount(){
    this.state.controller.subscribe('mcv.select.focus', this.handleFocus);
    this.state.controller.subscribe('mcv.select.highlight', this.handleHighlight);
    this.state.controller.subscribe('mcv.reconfigure.url', this.handleUrl);
  }

  handleHighlight(msg:string, data:any) {
    this.setState({
      featureId: data,
    });
  }

  handleFocus(msg:string, data:any) {
    this.setState({
      focusId: data,
    });
  }

  handleUrl(msg:string, data:any) {
    this.setState({
      geojsonUrl: data,
    });
  }

  handleInputChange(event: any){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    this.state.controller.publish('mcv.select.highlight', Number(this.state.featureId) || null);
    this.state.controller.publish('mcv.select.focus', Number(this.state.focusId) || null);
    this.state.controller.publish('mcv.reconfigure.url', this.state.geojsonUrl);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          FeatureId:
          <input
          type="number"
          name='featureId'
          value={this.state.featureId || ''}
          onChange={this.handleInputChange} />
        </label>
        <label>
          FocusId:
          <input
          type="number"
          name='focusId'
          value={this.state.focusId || ''}
          onChange={this.handleInputChange} />
        </label>
        <label>
          GeoJsonURL:
          <input
          type="text"
          name='geojsonUrl'
          value={this.state.geojsonUrl || ''}
          onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
