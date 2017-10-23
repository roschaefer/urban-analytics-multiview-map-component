/// <reference types="react" />
import * as React from "react";
import * as Leaflet from "leaflet";
export declare class DebugView extends React.Component<DebugView.Props, DebugView.State> {
  constructor(props: DebugView.Props);
  componentWillReceiveProps(props: DebugView.Props): void;
  handleInputChange(event: any): void;
  handleSubmit(event: React.FormEvent<HTMLFormElement>): void;
  render(): JSX.Element;
}
export namespace DebugView {
  export interface FormData {
    featureId: number;
    geojsonUrl: string;
  }
  export interface Props {
    featureId: number;
    geojsonUrl: string;
    onSubmit: (formData: FormData) => void;
  }
  export interface State {
    featureId: number;
    geojsonUrl: string;
    handleSubmit: (formData: FormData) => void;
  }
}
export declare class MultiviewController {
    private _geojsonUrl;
    subscribe(msg: string, callback: (msg: string, data: any) => void): void;
    publish(msg: string, data: any): void;
}
export namespace MultiviewMap {
  export interface Props {
    controller: any;
    lat?: number;
    lng?: number;
    zoom?: number;
  }
  export interface State {
    controller: any;
    geojsonUrl: string;
    geojson: any;
    featureId: number;
    featureList: any[];
    focusId: number;
    zoom: number;
  }
}
export declare class MultiviewMap extends React.Component<MultiviewMap.Props, MultiviewMap.State> {
    constructor(props: MultiviewMap.Props);
    handleHighlight(msg: string, data: any): void;
    handleFocus(msg: string, data: any): void;
    handleUrl(msg: string, data: any): void;
    handleGeometry(msg: string, data: any): void;
    componentDidMount(): void;
    handleSubmit(formData: DebugView.FormData): void;
    featureStyle(feature: any): Leaflet.PathOptions;
    onEachFeature(feature: any, layer: any): void;
    position(): Leaflet.LatLngExpression;
    render(): JSX.Element;
}
export namespace MessageLog {
  export interface Props {
    controller: MultiviewController;
  }
  export interface State {
    controller: MultiviewController;
    messages: [string, any][];
  }
}
export declare class MessageLog extends React.Component<MessageLog.Props, MessageLog.State> {
    constructor(props: MessageLog.Props);
    handleMessage(msg: string, data: any): void;
    componentDidMount(): void;
    render(): JSX.Element;
}

export default MultiviewMap;
