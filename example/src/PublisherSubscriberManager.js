export class PublisherSubscriberManager {
    constructor() {
        this._featureId = '';
        this._geometry = null;
        this.subscribers = [];
    }
    get featureId() {
        return this._featureId;
    }
    set featureId(theFeatureId) {
        this._featureId = theFeatureId;
        this.notify();
    }
    get geometry() {
        return this._geometry;
    }
    set geometry(theGeometry) {
        this._geometry = theGeometry;
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
export default PublisherSubscriberManager;
