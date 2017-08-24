/// <reference types="react" />
import * as React from "react";
export declare class MultiviewState {
    subscribers: any[];
    private _featureId;
    private _geojsonUrl;
    constructor();
    featureId: number;
    geojsonUrl: string;
    subscribe(parent: any, callback: () => void): void;
    notify(): void;
}
export interface DebugViewProps {
    featureId: number;
    geojsonUrl: string;
    handleSubmit: (featureId: number, geojsonUrl: string) => void;
}
export declare class DebugView extends React.Component<DebugViewProps, DebugViewProps> {
    constructor(props: DebugViewProps);
    handleInputChange(event: any): void;
    handleSubmit(event: any): void;
    render(): JSX.Element;
}
export interface MultiviewMapProps {
    context: any;
}
export interface MultiviewMapState {
    context: any;
    geojsonUrl: string;
    geojson: any;
    color: string;
    featureId: number;
    lat: number;
    lng: number;
    zoom: number;
}
export declare class MultiviewMap extends React.Component<MultiviewMapProps, MultiviewMapState> {
    constructor(props: MultiviewMapProps);
    componentDidMount(): void;
    onChange(context: any, that: MultiviewMap): void;
    handleSubmit(featureId: number, geojsonUrl: string): void;
    reverseLongLat(coordinates: any, levels: number): any;
    features(): any;
    polygonColor(feature: any): "red" | "blue";
    render(): JSX.Element;
}
export default MultiviewMap;
