/*
    Le lien du stackoverflow pour comprendre le principe de fonctionnement ->
    https://stackoverflow.com/questions/43891269/rotated-points-in-mapbox-are-skewed
*/
import * as turf  from '@turf/turf'
export default class Coordinates {

    constructor(altitude, coordinates, rotation) {
        this.altitude = altitude
        this.coordinates = coordinates
        this.rotation = rotation

    }
    // Fonction pour convertir des degrés minutes secondes en degrés
    convertCoordinatesInDegres() {

    }
    // Fonction pour calculer les coordonnees des 4 coins de l'image.
    calculateCoordinatesCorner(altitude, coordinates, rotation) {

        // Caractéristique de la caméra du drone.
        const Ray = 6378137
        const Kilometers = (Math.PI * Ray) / 180
        const radius = 78

        // Calcul en mètre terreste de la demi longueur et de la demi hauteur.
        const distanceBetwenCenterLat = altitude * Math.tan((radius / 2) * Math.PI / 180)  
        const distanceBetwenCenterLong = altitude * Math.tan((radius / 2) * Math.PI / 180) 

        // Calcul des des coordonnées gps en degrés des 4 coints de l'image.
        let latUp = coordinates[0] + (distanceBetwenCenterLat / Kilometers)

        let latDown = coordinates[0] - (distanceBetwenCenterLat / Kilometers)

        let longUp = coordinates[1] + (distanceBetwenCenterLong / (Kilometers * Math.cos(coordinates[0])))

        let longDown = coordinates[1] - (distanceBetwenCenterLong / (Kilometers * Math.cos(coordinates[0])))

        let midCoordinates = [

            [latUp, longDown],
            [latUp, longUp],
            [latDown, longUp],
            [latDown, longDown]
        ]
        console.log(midCoordinates)

        const bbox = [midCoordinates[0][0], midCoordinates[0][1], midCoordinates[2][0], midCoordinates[2][1]];
        const bboxPolygon = turf.bboxPolygon(bbox)
        const rotatedPolygon = turf.transformRotate(bboxPolygon, rotation)

        const rotatedCoords = (turf.getCoords(rotatedPolygon))[0].slice(0, 4);
        
        return rotatedCoords

    }

}