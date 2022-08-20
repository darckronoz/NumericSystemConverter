const form = document.querySelector('#converter-main');
const numN = document.querySelector('#numN');
const selectBaseN = document.querySelector('#baseN');
const selectBaseM = document.querySelector('#baseM');
const converBtn = document.querySelector('#cnvbtn');
const resu = document.querySelector('#result');

//fill both selects

const options = [];
for(let i = 2; i < 37; i++) {
    let optionN = document.createElement('option');
    let v = i.toString();
    optionN.innerHTML = v
    optionN.setAttribute('value', v);
    options.push(optionN);
}

for(n of options) {
    selectBaseM.append(n);
}

const options2 = [];
for(let i = 2; i < 37; i++) {
    let optionN = document.createElement('option');
    let v = i.toString();
    optionN.innerHTML = v
    optionN.setAttribute('value', v);
    options2.push(optionN);
}

for(n of options2) {
    selectBaseN.append(n);
}

//operations

class letter {
    constructor(number, letter) {
        this.number = number;
        this.letter = letter;
    }
}

const letterList = []

function fillLetterList() {
    for(let i = 0; i < 26; i++) {
        let x = new letter(i+10, String.fromCharCode((i+10)+55));
        letterList.push(x);
    }
}

fillLetterList();

// convert from binary to dec *temporary*

converBtn.addEventListener('click', convertBin);

function convertBin() {
    let n = numN.value;
    let x = selectBaseN.value;
    let y = selectBaseM.value;
    let answer = 0;
    let exp = 0;

    for(let i = n.length-1; i >= 0; i--) {
        answer += ((Math.pow(x, exp))*parseInt(n[i]));
        exp++;
    }

    resu.innerHTML = 'result: ' + answer.toString();
}

