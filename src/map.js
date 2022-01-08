
 export async function getJson(url){

    const reponse = await fetch(url)
    const responseJson = await reponse.json();
    let object = JSON.parse(JSON.stringify(responseJson))
    const ArrayLength = object.features[0].geometry.coordinates[0][0].length
    for(let j = 0; j < ArrayLength; j++)
        for(let i = 0; i < ArrayLength; i++){
            let k = object.features[0].geometry.coordinates[0][0][j]
            console.log(k)

        }
}


