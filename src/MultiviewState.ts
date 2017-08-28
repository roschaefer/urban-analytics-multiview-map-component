export class MultiviewState {
  subscribers: any[];
  private _featureId: number;
  private _geojsonUrl: string;
  private _geojson: any;

  constructor() {
    this.subscribers = [];
  }

  get featureId(): number {
    return this._featureId;
  }
  set featureId(theFeatureId: number) {
    this._featureId = theFeatureId;
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

  subscribe(parent: any, callback: (multiviewState: MultiviewState, parent: any) => void) {
    this.subscribers.push({ parent: parent, callback: callback });
  }

  public notify() {
    this.subscribers.forEach((subscriber) => {
      subscriber.callback(this, subscriber.parent);
    });
  }
}

