export default async function getInseeCode(name){
    const url = `https://geo.api.gouv.fr/communes?nom=${name}&fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=json&geometry=centre`
    let reponse = await fetch(url)
    let k = await reponse.json()
    let object = JSON.parse(JSON.stringify(k))
    return object
}
