import mapboxgl from 'mapbox-gl';
import { getJson } from './map'

mapboxgl.accessToken = process.env.TOKEN_MAP

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [5.85, 46.53],

    zoom: 13


})

const marker = new mapboxgl.Marker({
    color: "#fda"
}).setLngLat([5.8503, 46.5308])
    .addTo(map)

const marker1 = new mapboxgl.Marker({
    color: "#fda"
}).setLngLat([5.8496, 46.5308])
    .addTo(map)

const marker2 = new mapboxgl.Marker({
    color: "#fda"
}).setLngLat([5.8496, 46.5291])
    .addTo(map)

const marker3 = new mapboxgl.Marker({
    color: "#fda"
}).setLngLat([5.8503, 46.5291])
    .addTo(map)

const marker4 = new mapboxgl.Marker({
    color: "#fda"
}).setLngLat([5.85, 46.53])
    .addTo(map)



map.on('load', () => {
    map.addSource('radar', {
        'type': 'image',
        'url': 'https://i.postimg.cc/L5wD7hxj/DJI-0692.jpg',
        'coordinates': [
            [5.8503, 46.5308],
            [5.8496, 46.5308],
            [5.8496, 46.5291],
            [5.8503, 46.5291],
        ]
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
