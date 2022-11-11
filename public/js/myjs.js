function loadCordinates(lalValue = 41.40338, lonValue = 2.17403, addValue = "Sagrada Familia")
{
    let lat = document.getElementById("lat");
    let lon = document.getElementById("lon");
    let add = document.getElementById("add");

    lat.value = lalValue;
    lon.value = lonValue;
    //add.value = addValue;
}