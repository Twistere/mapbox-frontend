import mapboxgl from 'mapbox-gl';
import Coordinates from './coordinates';

mapboxgl.accessToken = process.env.TOKEN_MAP

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [5.85, 46.53],

    zoom: 13


})

let c1 = new Coordinates(99.8, [5.85, 46.53], 50)
let arrayCor = c1.calculateCoordinatesCorner(c1.altitude, c1.coordinates, c1.rotation)
console.log(arrayCor)

map.on('load', () => {
    map.addSource('radar', {
        'type': 'image',
        'url': 'https://i.postimg.cc/L5wD7hxj/DJI-0692.jpg',
        'coordinates' : arrayCor
    });
    map.addLayer({
        id: 'radar-layer',
        'type': 'raster',
        'source': 'radar',
        'paint': {
            'raster-fade-duration': 0
        }
    });
});
