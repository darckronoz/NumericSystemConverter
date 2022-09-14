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
    if(verifyInput(numN.value)) {
        if (x == 10) {
            resu.innerHTML = 'result: ' + convertDecToBaseLetter(numN.value);
        }else if(y == 10) {
            resu.innerHTML = 'result: ' + convertBaseToDecLetter(numN.value);
        }else {
            resu.innerHTML = 'result: ' + convertBasetoBaseLetter();
        }
    }else {
        resu.innerHTML = 'verify your input.'
        console.error('input incorrecto');

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
    if(verifyFloat(n)) {
        return manageBaseToDecFloat(splitFloat(n));
    }else {
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
}

//convert from decimal to base x

function convertDecToBaseLetter(n) {
    let x = parseInt(selectBaseM.value);
    let answer = [];
    if(verifyFloat(n)) {
        return manageDecToBaseFloat(splitFloat(n));
    }else {
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
}

//manage the float part, sum the float with the int part and that.

function manageBaseToDecFloat(n) {
    let intConverted = convertBaseToDecLetter(n[0]);
    let floatConverted = convertBaseToDecFloat(n[1], selectBaseN.value);
    let result = parseFloat(intConverted) + parseFloat(floatConverted);
    return result.toString();
}

function manageDecToBaseFloat(n) {
    let intConverted = convertDecToBaseLetter(n[0]);
    let floatConverted = convertDectoBaseFloat(convertBaseToDecFloat(n[1], 10));
    let result = intConverted + '.' + floatConverted;
    return result;
}


//base x to decimal but float

function convertBaseToDecFloat(n, x) {
    let exp = -1;
    let answer = 0;
    let dec = 4;
    for(let i = 0; i < n.length; i++) {
        if(n[i].charCodeAt() > 58) {
            let o = convertLetterToNum(n[i]);
            answer += parseFloat(((Math.pow(x, exp))*o).toFixed(dec));
            exp--;
        }else {
            answer += parseFloat(((Math.pow(x, exp))*parseInt(n[i])).toFixed(dec));
            exp--;
        }
    }
    return answer.toString();
}
//
//decimal to base x but float

function convertDectoBaseFloat(n) {
    let x = parseInt(selectBaseM.value);
    let y = n;
    let answer = '';
    let ob = false;
    let decCounter = 0;
    while(!ob && decCounter < 4) {
        y = (parseFloat(y)*x);
        let m = splitFloat(y.toString());
        if(m[1] == 0) {
            ob = true;
            answer += m[0];
            break;
        }
        else if(m[0] >= 10) {
            answer += convertNumToLetter(m[0]);
        }else {
        answer += m[0];
        }
        decCounter++;
        y = convertBaseToDecFloat(m[1], 10);
    }
    return answer;
}

//split the given float number in two, integer and float part
//returns a String array where [0]is the integer and [1]is the float part

function splitFloat(f) {
    let arr = [];
    arr[0] = '';
    arr[1] = '';
    let ob = false;
    let index = 0;
    while (!ob && index < f.length) {
        if(f[index] == '.') {
            ob = true;
            index++;
            break;
        }
        arr[0] += f[index];
        index++;
    }
    while(index < f.length) {
        arr[1] += f[index];
        index++;
    }
    if(arr[1] === '') {
        arr[1] += '0';
    }
    return arr;
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

//verifies if the number is a float number

function verifyFloat(a) {
    let comp = 'a';
    if(typeof(a) == typeof(comp)) {
        for(let i = 0; i < a.length; i++) {
            if(a[i] == '.') {
                return true;
            }
        }
        return false;
    }else {
        x = a.toString();
        for(let i = 0; i < x.length; i++) {
            if(x[i] == '.') {
                return true;
            }
        }
        return false;
    }
    
}
    //verifies the user input

    function verifyInput(input) {
        let n = parseInt(selectBaseN.value);
        let x = 0;
        for(let i = 0; i < input.length; i++) {
            if(input[i].charCodeAt() > 58) {
                x = convertLetterToNum(input[i]);
            }else {
                x = parseInt(input[i]);
            }
            
            if(x >= n) {
                return false;
            }
        }
        return true;
    }

