import mapboxgl from 'mapbox-gl';
import Coordinates from './coordinates';
import getJson from './map'

mapboxgl.accessToken = process.env.TOKEN_MAP

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [5.85, 46.53],

    zoom: 13


})


let c1 = new Coordinates(100, [5.851752, 46.542342], 0)
let arrayCor = c1.calculateCoordinatesCorner(c1.altitude, c1.coordinates, c1.rotation)
console.log(arrayCor)
let c2 = new Coordinates(100, [5.852, 46.53], 90)
let arrayCor1 = c2.calculateCoordinatesCorner(c2.altitude, c2.coordinates, c2.rotation)
let c3 = new Coordinates(100, [5.851, 46.531], 120)
let arrayCor2 = c3.calculateCoordinatesCorner(c3.altitude, c3.coordinates, c3.rotation)


map.on('load', () => {
    map.addSource('radar', {
        'type': 'image',
        'url': 'https://i.postimg.cc/L5wD7hxj/DJI-0692.jpg',
        'coordinates': arrayCor


    });
    map.addLayer({
        id: 'radar-layer',
        'type': 'raster',
        'source': 'radar',
        'paint': {
            'raster-fade-duration': 0,
            'raster-opacity': 0.5,
        }
    });

    map.addSource('radar1', {
        'type': 'image',
        'url': 'https://i.ibb.co/hKtg3F4/default.jpg',
        'coordinates': arrayCor1
    });
    map.addLayer({
        id: 'radar-layer1',
        'type': 'raster',
        'source': 'radar1',
        'paint': {
            'raster-fade-duration': 0,
            'raster-opacity': 0.5
        }
    });

    map.addSource('radar2', {
        'type': 'image',
        'url': 'https://i.ibb.co/hKtg3F4/default.jpg',
        'coordinates': arrayCor2
    });
    map.addLayer({
        id: 'radar-layer2',
        'type': 'raster',
        'source': 'radar2',
        'paint': {
            'raster-fade-duration': 0,
            'raster-opacity': 0.5
        }
    });

    map.addSource('maine', {
        'type': 'geojson',
        'data': 'https://apicarto.ign.fr/api/cadastre/commune?code_insee=39442'

    });

    // Add a new layer to visualize the polygon.
    map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine', // reference the data source
        'layout': {},
        'paint': {
            'fill-color': '#fff6dc', // blue color fill
            'fill-opacity': 0.1
        }
    });
    // Add a black outline around the polygon.
    map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'maine',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 3
        }
    });
});
