import ReactDOM from 'react-dom';
import React from 'react';

import Map from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import { Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorLayer} from 'ol/layer'
import {defaults as defaultControls} from 'ol/control';
import {fromLonLat, toLonLat} from 'ol/proj';
import {Draw, Modify, Snap} from 'ol/interaction';

require('ol/ol.css');

class MapPage extends React.Component {

    constructor(props) {
        super(props);
        this.addInteractions = this.addInteractions.bind(this);
        this.handleDraw = this.handleDraw.bind(this);

    }

    componentDidMount() {

        var geoJsonObject = {
            'type': 'Feature',
            'geometry': {
                'type': 'MultiPolygon',
                'coordinates': [
                    [
                        [
                            fromLonLat([79.08060, 22.14980]),
                            fromLonLat([79.08060, 23.14980]),
                            fromLonLat([85.08060, 25.14980]),
                            fromLonLat([85.08060, 22.14980])
                        ]
                    ]
                ]
            }
        }

        var styles = {
            'MultiPolygon': new Style({
                stroke: new Stroke({
                    color: 'yellow',
                    width: 1
                }),
                fill: new Fill({
                    color: 'rgba(255, 255, 0, 0.1)'
                })
            })
        }

        var styleFunction = function(feature) {
            return styles[feature.getGeometry().getType()];
        };

        var vectorSource = new VectorSource({
            features: (new GeoJSON()).readFeatures(geoJsonObject)
        });

        var vectorLayer = new VectorLayer({
            source: vectorSource,
            style: styleFunction
        });

        var vectorDrawSource = new VectorSource();
        var vectorDrawLayer = new VectorLayer({
            source: vectorDrawSource,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new CircleStyle({
                    radius: 7,
                    fill: new Fill({
                      color: '#ffcc33'
                    })
                })
            })
        });

        var modify = new Modify({source: vectorDrawSource});

        var map = new Map({
            target: this.refs.mapContainer,
            layers: [ new Tile({ source: new OSM({
                    url: 'https://{a-c}.tiles.mapbox.com/v4/openstreetmap.1b68f018/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3BlbnN0cmVldG1hcCIsImEiOiJhNVlHd29ZIn0.ti6wATGDWOmCnCYen-Ip7Q'
                })})],
            controls: defaultControls({
                attributionOptions: {
                    collapsible: false
                }
            }),
            view: new View({ center: fromLonLat([79.08060, 22.14980]), zoom: 4,})
        });
        map.on('moveend', this.handleMapZoom.bind(this));
        this.setState({  map: map});
        this.setState({  vectorLayer: vectorLayer});
        this.setState({  vectorDrawLayer: vectorDrawLayer});
        this.setState({  vectorDrawSource: vectorDrawSource});
        this.setState({  modify: modify});
    }

    addInteractions() {
        const draw = new Draw({
          source: this.state.vectorDrawSource,
          type: 'Polygon'
        });
        draw.on('drawend',this.handleDraw);
        this.state.map.addInteraction(draw);
        this.setState({draw});
        const snap = new Snap({source: this.state.vectorDrawSource});
        this.state.map.addInteraction(snap);
        this.setState({snap});
    }

    handleDraw(event) {
         const lonLat = toLonLat(event.feature.getGeometry().getCoordinates()[0][0]);
         console.log(lonLat);
    }

    handleMapZoom(event) {
        const zoomLevel = this.state.map.getView().getZoom();
        console.log(zoomLevel);
        if(this.state.map.getView().getZoom() === 6){
            this.state.map.addLayer(this.state.vectorLayer);
            this.state.map.addLayer(this.state.vectorDrawLayer);
            this.state.map.addInteraction(this.state.modify);
            this.addInteractions();
            alert("Works now");
        }
    }



    render () {
        return (
          <div ref="mapContainer" className="map"> </div>
        );
    }

}

export default MapPage;