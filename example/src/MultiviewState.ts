export class MultiviewState {
    subscribers: any[];
    private _featureId: number;
    private _geojsonUrl: string;

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
        this._geojsonUrl = theGeojsonUrl;
        this.notify();
    }

    subscribe(parent: any, callback: () => void) {
        this.subscribers.push({ parent: parent, callback: callback });
    }

    public notify() {
        this.subscribers.forEach((subscriber) => {
            subscriber.callback(this, subscriber.parent);
        });
    }
}

