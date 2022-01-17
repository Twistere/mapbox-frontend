export default async function getJson(url){
    let reponse = await fetch(url)
    return reponse.json()
}
