export class Observable {
    constructor() {
        this._featureId = '';
        this._geojsonUrl = null;
        this.subscribers = [];
    }
    get featureId() {
        return this._featureId;
    }
    set featureId(theFeatureId) {
        this._featureId = theFeatureId;
        this.notify();
    }
    get geojsonUrl() {
        return this._geojsonUrl;
    }
    set geojsonUrl(theGeometry) {
        this._geojsonUrl = theGeometry;
        this.notify();
    }
    subscribe(parent, callback) {
        this.subscribers.push({ parent: parent, callback: callback });
    }
    notify() {
        this.subscribers.forEach((subscriber) => {
            subscriber.callback(this, subscriber.parent);
        });
    }
}
export default Observable;
