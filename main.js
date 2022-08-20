const form = document.querySelector('#converter-main');
const numN = document.querySelector('#numN');
const numM = document.querySelector('#numM');
const selectBaseN = document.querySelector('#baseN');
const selectBaseM = document.querySelector('#baseM');

//fill both selects

const options1 = [];
const options2 = [];
for(let i = 2; i < 37; i++) {
    let optionN = document.createElement('option');
    let v = i.toString();
    optionN.innerHTML = v
    optionN.setAttribute('value', v);
    options1.push(optionN);
    options2.push(optionN);
}

for(let i = 0; i < options1.length; i++) {
    selectBaseN.append(options1[i]);
    selectBaseM.append(options2[i]);
}
