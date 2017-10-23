import * as React from "react";
import * as ReactDOM from "react-dom";
import { MultiviewMap, MultiviewController } from 'urban-analytics-multiview-map-component';

let controller = new MultiviewController();


ReactDOM.render(
  <MultiviewMap controller={controller} lat={undefined} lng={undefined} zoom={5}/>,
  document.getElementById('multiview-map-component')
);

setTimeout(function() {
  controller.publish('select highlight', 1);
  controller.publish('reconfigure url', 'data/bundeslaender.geojson');
}, 1000);
