
var current_roulette_rotation = 0;
var current_ball_rotation = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const casa = {
    0: '0',
    1: '32',
    2: '15',
    3: '19',
    4: '4',
    5: '21',
    6: '2',
    7: '25',
    8: '17',
    9: '34',
    10: '6',
    11: '27',
    12: '13',
    13: '36',
    14: '11',
    15: '30',
    16: '8',
    17: '23',
    18: '10',
    19: '5',
    20: '24',
    21: '16',
    22: '33',
    23: '1',
    24: '20',
    25: '14',
    26: '31',
    27: '9',
    28: '22',
    29: '18',
    30: '29',
    31: '7',
    32: '28',
    33: '12',
    34: '35',
    35: '3',
    36: '26',
    37: '0'
}
async function rodar_roleta() {
    
    document.getElementById("roleta").style.transitionDuration = '7s';
    document.getElementById("bola").style.transitionDuration = '8s';
    
    current_roulette_rotation += 1080 + (Math.floor(Math.random()*37))*(360/37);
    current_ball_rotation += 4320 + (Math.floor(Math.random()*37))*(360/37);

    document.querySelector("#roleta").style.transform = 'rotate(' + current_roulette_rotation + 'deg)';
    document.querySelector("#bola").style.transform = 'rotate(' + current_ball_rotation + 'deg)';

    if (current_ball_rotation%360 < current_roulette_rotation%360) {
        var diff = current_ball_rotation%360 - current_roulette_rotation%360 + 360
    } else {
        var diff = current_ball_rotation%360 - current_roulette_rotation%360
    }


    if (Math.round(diff/(360/37)) == 0 || Math.round(diff/(360/37)) == 37) {
        var cor = 'Verde'
    } else if (Math.round(diff/(360/37))%2 == 1) {
        var cor = 'Vermelho'
    } else {
        var cor = 'Preto'
    }
    
    document.getElementById("texto_controle1").innerHTML = 'Roleta: ' + current_roulette_rotation%360 + 'deg';

    document.getElementById("texto_controle2").innerHTML = 'Bola: ' + current_ball_rotation%360 + 'deg';

    document.getElementById("texto_controle3").innerHTML = 'Diff: ' + diff + 'deg';

    document.getElementById("texto_controle4").innerHTML = 'Casa: ' + casa[Math.round(diff/(360/37))];

    document.getElementById("texto_controle5").innerHTML = 'Cor: ' + cor;

    await sleep(8000)
  
    
    document.getElementById("roleta").style.transitionDuration = '0s';
    document.getElementById("bola").style.transitionDuration = '0s';

}