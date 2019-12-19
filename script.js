function convPosfija(formula){
    var pila = []; 
    var formulastring = formula.split('');
    var formulaposfija = "";
    while(formulastring != ''){
        var simbolo = formulastring.shift();
        if(simbolo == '('){
            pila.push(simbolo);
        }
        else if(simbolo == ')'){
            while(pila[pila.length - 1] != '('){
                formulaposfija += pila.pop();
            }
            pila.pop();
        }
        else if(!isNaN(parseFloat(simbolo))){
            formulaposfija += simbolo;
        }else{
            while(pila.length != 0 && pila[pila.length - 1] != '(' &&  comparacionOperadores(simbolo,pila[pila.length - 1]) ){
                formulaposfija += pila.pop();
            }
            pila.push(simbolo);
        }
    }
    while(pila.length != 0){
        formulaposfija += pila.pop();
    }
    document.writeln(formulaposfija);
}

function comparacionOperadores(simbolo,simapila){
    if(simbolo == '+' || simbolo == '-'){
        if(simapila != simbolo){
            return true;
        }
        else{
            return false;
        }
    }
    else if(simbolo == '*' || simbolo == '/'){
        if(simapila == '^'){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return true;
    }
}

document.onload = convPosfija('(1+2)*3-(4-5)*(6+7)');