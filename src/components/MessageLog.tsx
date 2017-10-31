import * as React from "react";
import { MultiviewController } from '../MultiviewController';

export interface  Props {
  controller: MultiviewController;
}

export interface  State {
  controller: MultiviewController;
  messages: [string, any][];
}

export class MessageLog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      controller: props.controller,
      messages: []
    };

    this.handleMessage = this.handleMessage.bind(this);
  }

  handleMessage(msg:string, data:any) {
    let temp = this.state.messages;
    temp.push([msg, data]);
    this.setState({
      messages: temp
    });
  }


  componentDidMount(){
   // this.state.controller && this.state.controller.subscribe(this, this.handleMultiviewControllerChange);
    if(this.state.controller) {
      this.state.controller.subscribe('mcv', this.handleMessage);
    }
  }


  render() {
    return (
      <div className="multiview-message-log">
      <h1>Message Log</h1>
      <ul>
      {
        this.state.messages.map(function(messages, index){
          return <li key={ index }>{messages[0]}</li>;
        })
      }
      </ul>
      </div>
    );
  }
}

export default MessageLog;
