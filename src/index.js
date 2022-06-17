import mapboxgl from 'mapbox-gl'
import Coordinates from './coordinates'
import getInseeCode from './map'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';

mapboxgl.accessToken = process.env.TOKEN_MAP
const imgMarker = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAwCAYAAAFms2q7AAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAFKADAAQAAAABAAAAMAAAAAClVFsDAAAF4klEQVRIDe1Wa2xURRSeO/fu3VcXum3ptvJotSl0uygIUYtp6UMqUF4lURITi2ko5SUmCIoxYohoxAgKAaSlFCgSE/iDsQUEtO8EFZAqUGxahELJWgq77b66d/c+nDPNvbRbCYT4gx9McmfOfOecb2bOzJw7CJEyYV/Ja9CitH0lbyikTG1arzAAgCALEsLQQT4xtJ2fv4nK96/su5dMpI4XujsUBhjAlj1c/Dnr7LkTHu6ojaSq5H5Jxvby0ikAHEhbjlJ8VoSNLKaW9oqSfFNa7ClQns/6gqFgY2PjJwA8YsnZv9HgOFT6gerO2A8sqzKlRC9WgXhvwIABsPp16FzmZoo7OT5II+MyhFBIEikoh6S7bHSuYyQfY5xW2VVLwcIZFsuQZUq9wt2Wedvi2Obm5iUzldQ/TjLt2dv1C7ZmZGQ0M5GrYRjmrDqT/7OlUwJCx8HlewzJI5aigWjSMcJ9IZcUEJIuL/rGx0w7ssYo2HQBZmAPEIQhkY1GrfrbSHXqv+k9zvX19683Yp4ypAfj0cGZ71IZwvPymY+orLeZC+jQz/+0TsF6loL/VfVf69uszXHyj2uCrJnXRxr6O3rf+au4fMfAGSXaCzO/MvLO8BXVUJEVNKtnXBYYAUYZB4f4n1CfeWdPw6JPR8/frzqJohikhuQ6MA0NDeswxhZVqbbE6Oe8vLwGtf84t1ocYZJwR7GFnSuG5I5EZkxNffHGoDp5aji+vDTOMNrcpiPHWFUgRUHB656Ky4vLSgFjZx9frRdizL2cRWfSjEAgp4izGqZa8xyJPUfP1zDp3608ZhxrKQCdIinIEbYhp+RGbvNAOoAd0neHTRwfZ6RGYFjlWIEmxiWDiPJPbqDGcPzcPm8hZlhtu9F46xhqBFUia9VkzHITsBwU76hI0emt9Jq23L5KDm63CiPZL1YzjoPLNhmejh44oZrqngBp8MKMLQy+VFT2MWG9p4mQBKdvJ0CY3FpF6PKsiNDTrhQIh1qLylZTQ6haiyvKxF6hh2oHVcIN/0K1qy15rpRaiEjM1MI7xbbWkrITap8pLy/X2e32DQBU9ZzJaIl35Sv+cHibqZCmLnKYOzMzMytxamrqe6rXW6Om/WLqkm6+z+XSewK4LMtJ0HI6ne4iuQovQAfKZ6PnH6BCREVPT21tbTbHca9E6IDNm52dvQUiE6l70n+0CAy510ABqbrXH8hlePy2zqJPx3qchNTrIslIFuTOsFdoVULyzmizqe7Moq/7Bw+tEU4tLzUFzewR3maejQ0qw2DT4bIUEGXhlqcFy3L+5ZJKF1hQQvve0jl8gvkQN5KPHu72YETyCL3iLX/RpdKKGsZRVpzOPWU5zlmN9HRq7iRDpfhj0IdTXkf22HH0x9Tm6kKbzh1GHUYXYlhtcdRFdAWvi07PHCyZ+QJs1A0lIybpgg19m78WTYp/BvEsh3SYoznp0KtrSRKL18ZVBWzikqUo3WyMJPkaZLXIAlmv9W5nJIxglk6pdxgOHGSjOpm0qlWxrAkdMyREvTTcSkHWAK8lPxgEniSRywU/kp3O6nyBOTQQjj1LJ3M201EuxpA8jPQhgLC7/0bYGVx4Zdme37XI2vcuSWJHGL7XJ0RNHtj7h2AikQp1+y+inkDhxZX7/gYPLdtdKansNIdwdrDLexqRv8eDiiLLKNjlqWV93HSVbAghdH59c4dnVGJ8QfCmdzek9vsV8pxDwnXvXoNXmtVSvG3IDmlLhjdCXV3ddJJWX4R3QoO3LalGbFsgxrAjBxOzbtEzV0n7Icc64RrkQvL9lpub26jmQ0rY1NQ0b3CmVQmCssjuul1fcCPWPwkpDDPWbWpZNWr6CfLaGvYzggdjVlZWNQfO4XD4WZKNVR6tNWBOWpswo9otBk7BRlltJkFTRgjAQaBquint7e1fwh8kwkbrWjmTAJ8GRAjgCxwAazFUbSCW9fX1KcToOYJZyVJGkDhFgZ5gPqL3ENFNsD9zcnKuqrED/ZPyJAKPSwT+BSrgZIc4xKNRAAAAAElFTkSuQmCC';
const doc = new jsPDF('portrait');
var marker;
var markerArray = [];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
    center: [5.547961, 46.670920],
    zoom: 13,
    preserveDrawingBuffer: true
})

map.addControl(new mapboxgl.FullscreenControl())



const addImage = () => {

    var elem = document.getElementById('dateUser');
    elem.addEventListener('change', () => {
        // On fait plus 1 pour commencer à l'index 1;
        const idUser = document.getElementById('dateUser').selectedIndex + 1;

        fetch(`http://localhost:3000/api/users/${idUser}`)
            .then(response => response.json())
            .then(json => {

                let longMid = 0;
                let latMid = 0;
                
                for (let j = 0; j < json.cadastre[0].image.length; j++) {
                    console.log(json)
                    let c = new Coordinates(json.cadastre[0].image[j].absoluteAltitude, [json.cadastre[0].image[j].gpsLongitude, json.cadastre[0].image[j].gpsLatitude], json.cadastre[0].image[j].gimballYawDegree + 180)
                    let CornerCoordinates = c.calculateCoordinatesCorner(c.altitude, c.coordinates, c.rotation)
                    longMid += (CornerCoordinates[0][0] + CornerCoordinates[2][0]) / 2
                    latMid += (CornerCoordinates[0][1] + CornerCoordinates[2][1]) / 2
                    let url = `http://localhost:3000/api/images/${json.cadastre[0].image[j].pathImg.slice(11)}`
                    map.addSource(j.toString(), {
                        'type': 'image',
                        'url': url,
                        'coordinates': CornerCoordinates

                    });
                    map.addLayer({
                        id: j.toString(),
                        'type': 'raster',
                        'source': j.toString(),
                    });


                }

                latMid = latMid / json.cadastre[0].image.length;
                longMid = longMid / json.cadastre[0].image.length;
                console.log(longMid, latMid);
                map.flyTo({
                    center: [longMid, latMid],
                    zoom: 17
                })

            })

    });
}

addImage()



map.on('dblclick', (e) => {

    marker = new mapboxgl.Marker({
        color: "#42BE45",
        draggable: true
    }).setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map).setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3 id="test">Coordonnées de l'arbre</h3>
            <p id="long">Longitude : ${e.lngLat.lng}</p>
            <p id="lat">Latitude : ${e.lngLat.lat}</p>`
            ))

    marker.on('dragend', () => {
        const long = document.getElementById('long');
        const lat = document.getElementById('lat');
        long.innerHTML = `<p id="long">Longitude : ${marker.getLngLat().lng}</p>`;
        lat.innerHTML = `<p id="lat">Latitude : ${marker.getLngLat().lat}</p>`;

    })
    markerArray.push([marker.getLngLat().lng, marker.getLngLat().lat]);
    for (let i = 0; i < markerArray.length; i++)
        console.log(markerArray[i]);

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


document.getElementById('pdf').addEventListener('click', async () => {

    html2canvas(document.getElementById('map')).then((canvas) => {
        const img = canvas.toDataURL('image/jpeg', 1);

        /* https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
           Stack qui explique le code de randomId.
        */
        const randomId = (Math.random() + 1).toString(36).substring(2);
        console.log(randomId);
        const date = new Date();
        doc.text(60, 20, 'Rapport ONF du ' + date.toLocaleDateString('fr-FR', { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
        doc.addImage(imgMarker, 'PNG', 30, 100, 2, 4);
        doc.setFontSize(7);
        let y = 102;

        for (let i = 0; i < markerArray.length; i++) {
            doc.text(35, y, `Latitude : ${markerArray[i][1]}, Longitude : ${markerArray[i][0]}`);
            console.log(`Latitude : ${markerArray[i][1]}, Longitude : ${markerArray[i][0]}`);
            y = y + 5;
        }
        doc.addImage(img, 'JPEG', 30, 40, 160, 50);
        doc.save('rapport_' + randomId + '.pdf');

    })

})

