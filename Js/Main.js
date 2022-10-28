var request = new Request('https://estagio.geopostenergy.com/WorldCup/GetAllTeams', {
    method: 'GET',
    headers: new Headers({'git-user' : 'w4lto'})
});

fetch(request)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(requestJson); 
    })
    .catch((error) => {
        console.error(error);
    });