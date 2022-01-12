export default class Coordinates {

    constructor(altitude, coordinates) {
        this.altitude = altitude;
        this.coordinates = coordinates;

    }
    // Fonction pour convertir des degrés minutes secondes en degrés
    convertCoordinatesInDegres() {

    }
    // Fonction pour calculer les coordonnees des 4 coins de l'image.
    calculateCoordinatesCorner(altitude, coordinates) {

        // Caractéristique de la caméra du drone.
        const Ray = 6371
        const Kilometers = ((2 * Math.PI) * Ray ) / 360
        const radius = 78

        // Calcul en mètre terreste de la demi longueur et de la demi hauteur.
        const distanceBetwenCenterLat = altitude * Math.tan((radius / 2) * Math.PI / 180) / 1000
        const distanceBetwenCenterLong = altitude * Math.tan((radius / 2) * Math.PI / 180) / 1000

        // Calcul des des coordonnées gps en degrés des 4 coints de l'image.
        let latUp = (distanceBetwenCenterLat / Kilometers) + coordinates[0]
        let latDown = coordinates[0] - (distanceBetwenCenterLat / Kilometers)

        //Calcul de la rotation de l'image...
        //Work in progress

        //On ajoute le degrés en au coordonnées.
        let longUp = (distanceBetwenCenterLong / (Kilometers * Math.cos(coordinates[0]))) + coordinates[1]
        let longDown = coordinates[1] - (distanceBetwenCenterLong / (Kilometers * Math.cos(coordinates[0])))

        const finalCoordinates = [
            [latUp, longUp],
            [latDown, longUp],
            [latDown, longDown],
            [latUp, longDown]
        ]
        return finalCoordinates;

    }

}

