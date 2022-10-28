const api_url = "https://estagio.geopostenergy.com/WorldCup/GetAllTeams"; 

var request = new Request('https://estagio.geopostenergy.com/WorldCup/GetAllTeams', {
    method: 'GET',
    headers: new Headers({'git-user' : 'w4lto'})
});

let obj;

fetch(request)
    .then((response) => response.json())
    .then(data => {
        obj = data
    })
    .then(() => {
        // console.log(obj)
    });

    
let selecoes = ["Alemanha",
"Arábia Saudita",
"Argentina",
"Austrália",
"Bélgica",
"Brasil",
"Camarões",
"Canadá",
"Catar",
"Coreia do Sul",
"Costa Rica",
"Croácia",
"Dinamarca",
"Equador",
"Espanha",
"Estados Unidos",
"França",
"Gana",
"Holanda",
"Inglaterra",
"Irã",
"Japão",
"Marrocos",
"México",
"País de Gales",
"Polônia",
"Portugal",
"Senegal",
"Sérvia",
"Suíça",
"Tunísia",
"Uruguai"]

// selecoes = obj    

console.log(selecoes)
    
let p = []
    
for(let i = 0;i < 8;i++){
    for(let j = 0;j < 4;j++)
    p.push(i)
}
    
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    
while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
}

return array;
}

shuffle(p)

let group = [[], [], [], [], [], [], [], []];

cnt = 0
p.forEach(element => {
    group[element].push(selecoes[cnt])
    cnt++
});

groupClassification = {}
group.forEach(element => {
    for(let i = 0;i < 4;i++){
        groupClassification[element[i]] = [0, 0]
    }
});


console.log(group)

for(let g = 0;g < 8;g++){
    for(let i = 0;i < 4;i++){
        for(let j = i + 1;j < 4;j++){
            let score1 = 0
            let score2 = 0
            for(let minute = 0;minute < 90;minute++){
                let x = Math.random()
                let probability_of_goal_per_minute = 2.74 / 90
                
                if(x <= probability_of_goal_per_minute){
                    let y = Math.random()
                    if(y <= 0.5){ // time 1
                        score1++
                    } else { // time 2
                        score2++
                    }
                }
            }

            
            groupClassification[group[g][i]][0] += 3 * (score1 > score2) + 1 * (score1 == score2)
            groupClassification[group[g][i]][1] += score1 - score2
            groupClassification[group[g][j]][0] += 3 * (score2 > score1) + 1 * (score1 == score2)
            groupClassification[group[g][j]][1] += score2 - score1            
        }
    }
}

console.log(groupClassification)

function comp(a, b){
    if(groupClassification[a][0] == groupClassification[b][0])
        return groupClassification[a][1] - groupClassification[b][1]
    return groupClassification[a][0] - groupClassification[b][0]
}

for(let i = 0;i < 8;i++){
    group[i] = group[i].sort(comp)
    console.log(group[i])
}

top16 = []

for(let i = 0;i < 8;i++){
    for(let j = 2;j < 4;j++){
        top16.push({token: group[i][j]})    
    }
}

shuffle(top16)
console.log(top16)

function simulateMatch(a, b){
    let score1 = 0
    let score2 = 0
    for(let minute = 0;minute < 90;minute++){
        let x = Math.random()
        let probability_of_goal_per_minute = 2.74 / 90
        
        if(x <= probability_of_goal_per_minute){
            let y = Math.random()
            if(y <= 0.5){ // time 1
                score1++
            } else { // time 2
                score2++
            }
        }
    }

    let penaltyScore1 = 0
    let penaltyScore2 = 0
    if(score1 == score2){
        let successful_penalty_prob = 0.76 // https://blog.innerdrive.co.uk/sports/the-psychology-of-perfect-penalties#:~:text=Research%20shows%20that%20if%20a,the%20outcome%20of%20the%20match.
        
        let penaltyCnt = 0
        while(true){
            penaltyCnt++

            let result1 = Math.random() <= successful_penalty_prob
            let result2 = Math.random() <= successful_penalty_prob
            penaltyScore1 += result1
            penaltyScore2 += result2
            if(penaltyCnt <= 5){
                let mx = Math.max(penaltyScore1, penaltyScore2)
                let mn = Math.min(penaltyScore1, penaltyScore2)
                if(mn + (5 - penaltyCnt) < mx)
                    break
            } else if(penaltyScore1 != penaltyScore2) {
                break
            }
        }
    }

    return {
        "equipeA" : a.token,
        "equipeB" : b.token,
        "golsEquipeA" : score1,
        "golsEquipeB" : score2,
        "golsPenaltyTimeA": penaltyScore1,
        "golsPenaltyTimeB": penaltyScore2,
    }
}

function getWinner(x){
    if(x.golsEquipeA == x.golsEquipeB)
        return x.golsPenaltyTimeA > x.golsPenaltyTimeB ? {token: x.equipeA} : {token: x.equipeB}
    return x.golsEquipeA > x.golsEquipeB ? {token: x.equipeA} : {token: x.equipeB}
}

let top8 = []
for(let i = 0;i < 16;i += 2){
    top8.push(getWinner(simulateMatch(top16[i], top16[i + 1])))
}

console.log(top8)

let top4 = []
for(let i = 0;i < 8;i += 2){
    top4.push(getWinner(simulateMatch(top8[i], top8[i + 1])))
}

console.log(top4)

let top2 = []
for(let i = 0;i < 4;i += 2){
    top2.push(getWinner(simulateMatch(top4[i], top4[i + 1])))
}

console.log(top2)

let top1 = []
for(let i = 0;i < 2;i += 2){
    top1.push((simulateMatch(top2[i], top2[i + 1])))
}

console.log(top1)