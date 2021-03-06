/// <reference types="react" />
import * as React from "react";
import * as Leaflet from "leaflet";

export declare class DebugView extends React.Component<DebugView.Props, DebugView.State> {
  constructor(props: DebugView.Props);
  componentDidMount(): void;
  handleHighlight(msg: string, data: any): void;
  handleFocus(msg: string, data: any): void;
  handleUrl(msg: string, data: any): void;
  handleInputChange(event: any): void;
  handleSubmit(event: React.FormEvent<HTMLFormElement>): void;
  render(): JSX.Element;
}
export namespace DebugView {
  export interface Props {
    controller: MultiviewCoordinator;
    focusedId?: number;
    highlightedId?: number;
    geojsonUrl?: string;
  }
  export interface State {
    controller: MultiviewCoordinator;
    highlightedId: number;
    focusedId: number;
    geojsonUrl: string;
  }
}
export declare class MultiviewCoordinator {
  private _geojsonUrl;
  subscribe(msg: string, callback: (msg: string, data: any) => void): void;
  publish(msg: string, data: any): void;
  clearAllSubscriptions(): void;
}
export namespace MapComponent {
  export interface Props {
    controller: any;
  }
  export interface State {
    controller: any;
    geojsonUrl?: string;
    geojson?: any;
    highlightedIds?: number[];
    focusedIds?: number[];
    layerList: any[];
  }
}
export declare class MapComponent extends React.Component<MapComponent.Props, MapComponent.State> {
  constructor(props: MapComponent.Props);
  handleHighlight(msg: string, data: any): void;
  handleFocus(msg: string, data: any): void;
  handleUrl(msg: string, data: any): void;
  handleGeometry(msg: string, data: any): void;
  componentDidMount(): void;
  featureStyle(feature: any): Leaflet.PathOptions;
  onEachFeature(feature: any, layer: any): void;
  bounds(): Leaflet.LatLngBounds;
  render(): JSX.Element;
}
export namespace MessageLog {
  export interface Props {
    controller: MultiviewCoordinator;
  }
  export interface State {
    controller: MultiviewCoordinator;
    messages: [string, any][];
  }
}
export declare class MessageLog extends React.Component<MessageLog.Props, MessageLog.State> {
  constructor(props: MessageLog.Props);
  handleMessage(msg: string, data: any): void;
  componentDidMount(): void;
  render(): JSX.Element;
}

export default MapComponent;
