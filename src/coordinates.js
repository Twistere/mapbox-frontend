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
    calculateCoordinatesCorner(altitude, coordinates, rotation1) {

        // Caractéristique de la caméra du drone.
        const Ray = 6371
        const Kilometers = ((2 * Math.PI) * Ray ) / 360
        const radius = 78
        const rotation = rotation1 * Math.PI / 180

        // Calcul en mètre terreste de la demi longueur et de la demi hauteur.
        const distanceBetwenCenterLat = altitude * Math.tan((radius / 2) * Math.PI / 180) / 1000
        const distanceBetwenCenterLong = altitude * Math.tan((radius / 2) * Math.PI / 180) / 1000

        // Calcul des des coordonnées gps en degrés des 4 coints de l'image.
        let latUpRight = (distanceBetwenCenterLat / Kilometers) + coordinates[0]
        let latUpLeft = (distanceBetwenCenterLat / Kilometers) + coordinates[0]

        let latDownRight = coordinates[0] - (distanceBetwenCenterLat / Kilometers)
        let latDownLeft = coordinates[0] - (distanceBetwenCenterLat / Kilometers)

        let longUpRight = (distanceBetwenCenterLong / (Kilometers * Math.cos(coordinates[0]))) + coordinates[1]
        let longUpLeft = (distanceBetwenCenterLong / (Kilometers * Math.cos(coordinates[0]))) + coordinates[1]

        let longDownRight = coordinates[1] - (distanceBetwenCenterLong / (Kilometers * Math.cos(coordinates[0])))
        let longDownLeft = coordinates[1] - (distanceBetwenCenterLong / (Kilometers * Math.cos(coordinates[0])))

        //Calcul de la rotation de l'image
        let latUpLeftAfterRotation = (latUpLeft - coordinates[0]) * Math.sin(rotation) + (longUpLeft - coordinates[1]) * Math.cos(rotation) + coordinates[0]
        let longUpLeftAfterRotation = (latUpLeft - coordinates[0]) * Math.cos(rotation) - (longUpLeft - coordinates[1]) * Math.sin(rotation) + coordinates[1]

        let latUpRightAfterRotation = (latUpRight - coordinates[0]) * Math.sin(rotation) + (longUpRight - coordinates[1]) * Math.cos(rotation) + coordinates[0]
        let longUpRightAfterRotation = (latUpRight - coordinates[0]) * Math.cos(rotation) + (longUpRight - coordinates[1]) * Math.sin(rotation) + coordinates[1]

        let latBottomRightAfterRotation = (latDownRight - coordinates[0]) * Math.sin(rotation) - (longDownRight - coordinates[1]) * Math.cos(rotation) + coordinates[0]
        let longBottomRightAfterRotation = (latDownRight - coordinates[0]) * Math.cos(rotation) + (longDownRight - coordinates[1]) * Math.sin(rotation) + coordinates[1]

        let latBottomLeftAfterRotation = (latDownLeft - coordinates[0]) * Math.sin(rotation) - (longDownLeft - coordinates[1]) * Math.cos(rotation) + coordinates[0]
        let longBottomLefttAfterRotation = (latDownLeft - coordinates[0]) * Math.cos(rotation) - (longDownLeft - coordinates[1]) * Math.sin(rotation) + coordinates[1]
        
        const finalCoordinates = [
            [latUpLeftAfterRotation, longUpLeftAfterRotation],
            [latUpRightAfterRotation, longUpRightAfterRotation],
            [latBottomLeftAfterRotation, longBottomLefttAfterRotation],
            [latBottomRightAfterRotation, longBottomRightAfterRotation],
        ]
        return finalCoordinates;

    }

}


