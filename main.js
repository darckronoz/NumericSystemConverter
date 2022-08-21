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
        resu.innerHTML = 'result: ' + convertDecToBase(parseInt(numN.value));
    }else if(y == 10) {
        resu.innerHTML = 'result: ' + convertBaseToDec(numN.value);
    }else if(x < 10 && y < 10) {
        resu.innerHTML = 'result: ' + convertBasetoBase();
    }
}

//manage the converters in order to comvert base to base
//base to dec and then dec to base
//example (base: 2 to base: 9): base 2 to base 10 & base 10 to base 9

function convertBasetoBase() {
    return convertDecToBase(convertBaseToDec(numN.value)); 
}

// convert from base [2 - 9] to dec *temporary*

function convertBaseToDec(n) {
    let x = selectBaseN.value;
    let y = selectBaseM.value;
    let answer = 0;
    let exp = 0;  

    for(let i = n.length-1; i >= 0; i--) {
        answer += ((Math.pow(x, exp))*parseInt(n[i]));
        console.log(answer);
        exp++;
    }
    console.log(answer);
    return answer.toString();
}

//convert from decimal to base [2-9]

function convertDecToBase(n) {
    let x = parseInt(selectBaseM.value);
    let answer = [];
    let counter = 0;
    console.log('x: ', x);
    console.log('n: ', n);

    while(n >= x) {
      answer.push(n%x);
      n = Math.floor(n/x);
      console.log('n: ', n);
      console.log('answer: ', answer[counter]);
      counter ++;
    }
    answer.push(n);
    return invertAnswer(answer);
}

//invert array and save it on string

function invertAnswer(a) {
    let y = '';
    while(a.length > 0) {
        y += (a.pop());
    }
    return y;
}


