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
        const Ray = 6371
        const Kilometers = ((2 * Math.PI) * Ray) / 360
        const radius = 78
        const radians = rotation * (Math.PI / 180)

        // Calcul en mètre terreste de la demi longueur et de la demi hauteur.
        const distanceBetwenCenterLat = altitude * Math.tan((radius / 2) * Math.PI / 180) / 1000
        const distanceBetwenCenterLong = altitude * Math.tan((radius / 2) * Math.PI / 180) / 1000

        // Calcul des des coordonnées gps en degrés des 4 coints de l'image.
        let latUp = (distanceBetwenCenterLat / Kilometers) + coordinates[0]

        let latDown = coordinates[0] - (distanceBetwenCenterLat / Kilometers)

        let longUp = (distanceBetwenCenterLong / (Kilometers * Math.cos(coordinates[0]))) + coordinates[1]

        let longDown = coordinates[1] - (distanceBetwenCenterLong / (Kilometers * Math.cos(coordinates[0])))

        let midCoordinates = [
            [latUp, longUp],
            [latDown, longUp],
            [latDown, longDown],
            [latUp, longDown]
        ]
        // Rotation de l'image.
        function rotate(lat, long) {

            let nlat = (Math.cos(radians) * (lat - coordinates[0])) + (-Math.sin(radians) * (long - coordinates[1])) + coordinates[0]
            let nlong = (Math.cos(radians) * (long - coordinates[1])) + (Math.sin(radians) * (lat - coordinates[0])) + coordinates[1]
            // test
            return [nlat, nlong]

        }

        const finalCoordinates = []
        for (let i = 0; i < midCoordinates.length; i++)
            finalCoordinates[i] = rotate(midCoordinates[i][0], midCoordinates[i][1])


        return finalCoordinates


    }

}