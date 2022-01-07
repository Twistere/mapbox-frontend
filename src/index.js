import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.TOKEN_MAP
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [6.58, 46.36],
    zoom: 9
})

map()
