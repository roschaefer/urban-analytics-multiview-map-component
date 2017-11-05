import * as React from "react";
import { MultiviewController } from '../MultiviewController';

export interface Props {
  controller: MultiviewController;
  focusedId?: number;
  highlightedId?: number;
  geojsonUrl?: string;
}
export interface State{
  controller: MultiviewController;
  highlightedId: number;
  focusedId: number;
  geojsonUrl: string;
}

export class DebugView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      controller: props.controller,
      highlightedId: props.highlightedId || 0,
      focusedId: props.focusedId || 0,
      geojsonUrl: props.geojsonUrl || ''
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
      highlightedId: data[0],
    });
  }

  handleFocus(msg:string, data:any) {
    this.setState({
      focusedId: data[0],
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
    this.state.controller.publish('mcv.select.highlight', Array.of(Number(this.state.highlightedId)));
    this.state.controller.publish('mcv.select.focus', Array.of(Number(this.state.focusedId)));
    this.state.controller.publish('mcv.reconfigure.url', this.state.geojsonUrl);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First highlighted Id:
          <input
          type='number'
          name='highlightedId'
          value={this.state.highlightedId}
          onChange={this.handleInputChange} />
        </label>
        <label>
          FocusId:
          <input
          type="number"
          name='focusedId'
          value={this.state.focusedId}
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
