import PubSub = require('pubsub-js');

export class MultiviewController {
  private _geojsonUrl: string;

  public subscribe(msg:string, callback: (msg:string, data:any) => void) {
    PubSub.subscribe(msg, callback);
  }

  public publish(msg:string, data:any) {
        console.log(msg, data)
    if (msg === 'mcv.reconfigure.url'){
      if((this._geojsonUrl == null) || (this._geojsonUrl !== data)){
        this._geojsonUrl = data;
        fetch(data, {
          credentials: "same-origin"
        }).then((resp) => resp.json()).then((response) => {
          console.log('response', response)
          this.publish('mcv.reconfigure.geometry', response);
        }).catch((err) => {
          console.log(err);
        })
      }
    }
    PubSub.publish(msg, data);
  }

  public clearAllSubscriptions() {
    PubSub.clearAllSubscriptions();
  }
}

