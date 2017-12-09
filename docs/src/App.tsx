import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapComponent, MultiviewCoordinator, MessageLog, DebugView } from 'urban-analytics-multiview-map-component';

let controller = new MultiviewCoordinator();


ReactDOM.render(
  <MapComponent controller={controller}/>,
  document.getElementById('multiview-map-component')
);

ReactDOM.render(
  <DebugView controller={controller}/>,
  document.getElementById('multiview-debug-view')
);

ReactDOM.render(
  <MessageLog controller={controller}/>,
  document.getElementById('multiview-message-log')
);

setTimeout(function() {
  controller.publish('mcv.select.highlight', [1]);
  controller.publish('mcv.reconfigure.url', 'data/bundeslaender.geojson');
}, 1000);
