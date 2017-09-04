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
export declare class MultiviewState {
  subscribers: any[];
  private _featureId;
  private _geojsonUrl;
  private _geojson;
  constructor();
  featureId: number;
  geojsonUrl: string;
  geojson: any;
  subscribe(parent: any, callback: (multiviewState: MultiviewState, parent: any) => void): void;
  notify(): void;
}
export namespace MultiviewMap {
  export interface Props {
    context: any;
  }
  export interface State {
    context: any;
    geojsonUrl: string;
    geojson: any;
    color: string;
    featureId: number;
    lat: number;
    lng: number;
    zoom: number;
  }
}
export declare class MultiviewMap extends React.Component<MultiviewMap.Props, MultiviewMap.State> {
  constructor(props: MultiviewMap.Props);
  componentDidMount(): void;
  handleMultiviewStateChange(context: MultiviewState, that: MultiviewMap): void;
  handleSubmit(formData: DebugView.FormData): void;
  featureStyle(feature: any): Leaflet.PathOptions;
  onEachFeature(feature: any, layer: any): void;
  render(): JSX.Element;
}
export default MultiviewMap;
