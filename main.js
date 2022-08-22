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

converBtn.addEventListener('click', mainSelector);

function mainSelector() {
    let x = selectBaseN.value;
    let y = selectBaseM.value;
    if (x == 10) {
        resu.innerHTML = 'result: ' + convertDecToBaseLetter(parseInt(numN.value));
    }else if(y == 10) {
        resu.innerHTML = 'result: ' + convertBaseToDecLetter(numN.value);
    }else {
        resu.innerHTML = 'result: ' + convertBasetoBaseLetter();
    }
}

//manage the converters in order to convert base to base
//base to dec and then dec to base
//example (base: 2 to base: 9): base 2 to base 10 & base 10 to base 9


function convertBasetoBaseLetter() {
    return convertDecToBaseLetter(convertBaseToDecLetter(numN.value));
}

// convert from base x to dec

function convertBaseToDecLetter(n) {
    let x = selectBaseN.value;
    let answer = 0;
    let exp = 0;  
    for(let i = n.length-1; i >= 0; i--) {
        if(n[i].charCodeAt() > 58) {
            let o = convertLetterToNum(n[i]);
            answer += ((Math.pow(x, exp))*o);
            exp++;
        }else {
            answer += ((Math.pow(x, exp))*parseInt(n[i]));
            exp++;
        }
    }
    return answer.toString();
}

//convert from decimal to base x

function convertDecToBaseLetter(n) {
    let x = parseInt(selectBaseM.value);
    let answer = [];

    while(n >= x) {
        if((n%x) >= 10) {
            answer.push(convertNumToLetter(n%x));
            n = Math.floor(n/x);
        }else {
            answer.push(n%x);
            n = Math.floor(n/x);
        }
    }
    answer.push(n);
    return invertAnswerLetter(answer);
}

//converts a number to it's equivalent in letter.

function convertNumToLetter(x) {
    for (n of letterList) {
        if(x == n.number)
        return n.letter;
    }
}

function convertLetterToNum(x) {
    for (n of letterList) {
        let u = x.toUpperCase();
        if(u === n.letter)
        return n.number;
    }
}

//inverts the answer.

function invertAnswerLetter(a) {
    let y = '';
    for(let i = a.length-1; i >= 0; i--) {
        if (a[i] >= 10) {
            y += convertNumToLetter(a[i]);
        }else {
            y += a[i];    
        }
    }
    return y;
}
