const api_url = "https://estagio.geopostenergy.com/WorldCup/GetAllTeams"; 
// Header : "git-user : w4lto";
// Response : JSON; 

var request = new Request('https://estagio.geopostenergy.com/WorldCup/GetAllTeams', {
    method: 'GET',
    headers: new Headers({'git-user' : 'w4lto'})
});

// let x = undefined

// var obj

// fetch(request)
//     .then((response) => response.json())
//     .then((responseJson) => { 
//         obj = responseJson;
//     })
//     .then(() =>{
//         console.log(obj);
//     })
//     .catch((error) => {
//         console.error(error);
//     });


var obj

fetch(request)
    .then((response) => response.json())
    .then(data => { 
        obj = data;
    })
    .then(() => {
        console.log(obj);
    })
    .catch((error) => {
        console.error(error);
    })


// times = fetch(request).then(); 

// console.log(x, "AAAAAA"); 
    
