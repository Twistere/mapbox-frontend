/*
    Le lien du stackoverflow pour comprendre le principe de fonctionnement ->
    https://stackoverflow.com/questions/43891269/rotated-points-in-mapbox-are-skewed
*/

import * as turf from '@turf/turf'
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
        const Kilometers = (2 * Math.PI * Ray) / 360
        const Fov = 76.26974131

        // Calcul en mètre terreste de la demi longueur et de la demi hauteur.
        const distanceBetwenCenterLong = altitude * Math.tan((Fov / 2 ) * Math.PI / 180)
        const distanceBetwenCenterLat = altitude * Math.tan((Fov / 2) * (9/16) * Math.PI / 180)

        // Calcul des des coordonnées gps en degrés des 4 coints de l'image.
        let longUp = coordinates[0] + (distanceBetwenCenterLong / (Kilometers * Math.cos(coordinates[0])))

        let longDown = coordinates[0] - (distanceBetwenCenterLong / (Kilometers * Math.cos(coordinates[0])))

        let latRigth = coordinates[1] + (distanceBetwenCenterLat / Kilometers)

        let latLeft = coordinates[1] - (distanceBetwenCenterLat / Kilometers)

        let midCoordinates = [
            [longUp, latLeft],
            [longUp, latRigth],
            [longDown, latRigth],
            [longDown, latLeft]

        ]

        const bbox = [midCoordinates[0][0], midCoordinates[0][1], midCoordinates[2][0], midCoordinates[2][1]];
        const bboxPolygon = turf.bboxPolygon(bbox) // Encadre l'image dans une boite carré.
        const rotatedPolygon = turf.transformRotate(bboxPolygon, rotation) // Rotation de la boite.

        const rotatedCoords = (turf.getCoords(rotatedPolygon))[0].slice(0, 4); // Récupère les 4 coordonnées.

        return rotatedCoords

    }

}