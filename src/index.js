import mapboxgl from 'mapbox-gl'
import Coordinates from './coordinates'
import getInseeCode from './map'

mapboxgl.accessToken = process.env.TOKEN_MAP

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [5.547961, 46.670920],
    zoom: 13,
    

})

const marker = new mapboxgl.Marker({
    color: "#fda"
}).setLngLat([5.8512113, 46.5425118])
    .addTo(map)



let c2 = new Coordinates(99.5, [5.8512113,  46.5425118], 108.50 + 180)
let CornerCoordinates = c2.calculateCoordinatesCorner(c2.altitude, c2.coordinates, c2.rotation)

map.on('load', () => {

    map.addSource('radar1', {
        'type': 'image',
        'url': 'https://i.ibb.co/nBGJhSf/default.jpg',
        'coordinates': CornerCoordinates


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

});

document.getElementById('fit').addEventListener('click', async () => {
    let code = prompt('Quel est le nom de votre commune ?')
    let postalCode = await getInseeCode(code)
    console.log(postalCode)
    let url = `https://apicarto.ign.fr/api/cadastre/commune?code_insee=${postalCode[0].code}`
    map.addSource('maine', {
        'type': 'geojson',
        'data': url

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
})