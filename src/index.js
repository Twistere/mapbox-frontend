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

map.addControl(new mapboxgl.FullscreenControl())


const addImage = () => {
    fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        .then(json => {
            var elem = document.getElementById('dateUser')
            elem.addEventListener('change', () => {
                let date = elem.options[elem.selectedIndex].text
                let iso = new Date(date);
                console.log(iso.toISOString());
                for (let i = 0; i < json.length; i++) {
                    if (iso.toISOString() == json[i].date) {
                        for (let j = 0; j < json[i].cadastre[0].image.length; j++) {

                            if (j == 0) {
                                console.log('prout')
                                let c1 = new Coordinates(json[i].cadastre[0].image[j].absoluteAltitude, [json[i].cadastre[0].image[j].gpsLongitude, json[i].cadastre[0].image[j].gpsLatitude], json[i].cadastre[0].image[j].gimballYawDegree + 180)
                                let CornerCoordinates1 = c1.calculateCoordinatesCorner(c1.altitude, c1.coordinates, c1.rotation)
                                let url1 = `http://localhost:3000/api/images/${json[i].cadastre[0].image[j].pathImg.slice(11)}`
                                map.addSource('radar1', {
                                    'type': 'image',
                                    'url': url1,
                                    'coordinates': CornerCoordinates1

                                });
                                map.addLayer({
                                    id: 'radar-layer1',
                                    'type': 'raster',
                                    'source': 'radar1',
                                    'paint': {
                                        'raster-fade-duration': 0,
                                        'raster-opacity': 1

                                    }

                                });
                            }

                            if (j == 1) {
                                let c2 = new Coordinates(json[i].cadastre[0].image[j].absoluteAltitude, [json[i].cadastre[0].image[j].gpsLongitude, json[i].cadastre[0].image[j].gpsLatitude], json[i].cadastre[0].image[j].gimballYawDegree + 180)
                                let CornerCoordinates2 = c2.calculateCoordinatesCorner(c2.altitude, c2.coordinates, c2.rotation)
                                let url2 = `http://localhost:3000/api/images/${json[i].cadastre[0].image[j].pathImg.slice(11)}`
                                map.addSource('radar2', {
                                    'type': 'image',
                                    'url': url2,
                                    'coordinates': CornerCoordinates2

                                });
                                map.addLayer({
                                    id: 'radar-layer2',
                                    'type': 'raster',
                                    'source': 'radar2',
                                    'paint': {
                                        'raster-fade-duration': 0,
                                        'raster-opacity': 1

                                    }

                                });
                            }


                            if (j == 2) {
                                let c3 = new Coordinates(json[i].cadastre[0].image[j].absoluteAltitude, [json[i].cadastre[0].image[j].gpsLongitude, json[i].cadastre[0].image[j].gpsLatitude], json[i].cadastre[0].image[j].gimballYawDegree + 180)
                                let CornerCoordinates3 = c3.calculateCoordinatesCorner(c3.altitude, c3.coordinates, c3.rotation)
                                let url3 = `http://localhost:3000/api/images/${json[i].cadastre[0].image[j].pathImg.slice(11)}`
                                map.addSource('radar3', {
                                    'type': 'image',
                                    'url': url3,
                                    'coordinates': CornerCoordinates3

                                });
                                map.addLayer({
                                    id: 'radar-layer3',
                                    'type': 'raster',
                                    'source': 'radar3',
                                    'paint': {
                                        'raster-fade-duration': 0,
                                        'raster-opacity': 1

                                    }

                                });
                            }

                        }
                    }


                }

            })

        });
}

addImage()

map.on('dblclick', (e) => {

    const marker = new mapboxgl.Marker({
        color: "#fda",
        draggable: true
    }).setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map).setPopup( new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>Coordonnées de l'arbre</h3>
            <p>longtitude : ${e.lngLat.lng}</p>
            <p>lagitude : ${e.lngLat.lat}</p>`
        ))
})


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

