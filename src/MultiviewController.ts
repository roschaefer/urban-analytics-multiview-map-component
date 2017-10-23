import PubSub = require('pubsub-js');

export class MultiviewController {
  private _featureId: number;
  private _geojsonUrl: string;
  private _geojson: any;
  private _focusId: number;

  get featureId(): number {
    return this._featureId;
  }
  set featureId(theFeatureId: number) {
    this._featureId = theFeatureId;
    this.notify();
  }
  get focusId(): number {
    return this._focusId ;
  }
  set focusId(theFocusId: number) {
    this._focusId =theFocusId;
    this.notify();
  }
  get geojsonUrl(): string {
    return this._geojsonUrl;
  }
  set geojsonUrl(theGeojsonUrl: string) {
    if(this._geojsonUrl !== theGeojsonUrl){
      this._geojsonUrl = theGeojsonUrl;
      fetch(theGeojsonUrl, {
        credentials: "same-origin"
      }).then((resp) => resp.json()).then((response) => {
        this._geojson = response;
        this.notify();
      }).catch((err) => {
        console.log(err);
      })
    }
  }
  get geojson():any {
    return this._geojson;
  }
  set geojson(theGeojson:any) {
    this._geojson = theGeojson;
    this.notify();
  }

  subscribe(subscriber: (msg:string, data:any) => void) {
    PubSub.subscribe('X', subscriber);
  }

  public notify() {
    PubSub.publish('X', 'hello world');
  }
}

