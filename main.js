const form = document.querySelector('#converter-main');
const numN = document.querySelector('#numN');
const numM = document.querySelector('#numM');
const selectBaseN = document.querySelector('#baseN');
const selectBaseM = document.querySelector('#baseM');

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
