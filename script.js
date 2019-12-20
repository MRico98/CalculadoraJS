/**
 * Funcion para convertir un string a un arreglo con operadores y operandos.
 * Formula = 12+4*(4-5)
 * Arreglo[0] = 12
 * Arreglo[1] = +
 * Arreglo[2] = 4
 * Arreglo[3] = *
 * Arreglo[4] = (
 * Arreglo[5] = 4
 * Arreglo[6] = -
 * Arreglo[7] = 5
 * Arreglo[8] = )
 * @param formula String con formula 
 */
function formulatToArreglo(formula){
    var banderapunto = false;
    var arregloformula = formula.split('');
    if(isNaN(parseFloat(arregloformula[0])) && arregloformula[0] != '-' && arregloformula[0] != '.'){
        throw "Error de sintaxis en el espacio 1"; 
    }
    for(var contador=1;contador<arregloformula.length;contador++){
        if(!isNaN(parseFloat(arregloformula[contador]))){
            arregloformula[contador-1] += arregloformula[contador];
            arregloformula = eliminarEspacio(arregloformula,contador);
            contador--;
        }
        else if(arregloformula[contador] == '.'){
            if(banderapunto){
                throw "Error de sintaxis en el espacio " + contador ;
            }
            else{
                arregloformula = eliminarEspacio(arregloformula,contador);
                contador--;
                banderapunto = true;
            }
        }
        else{
            
            banderapunto = false;
        }
    }
}

function eliminarEspacio(arreglo,espacioeliminar){
    document.write(arreglo + '<br>');
    for(var contador = espacioeliminar;contador < arreglo.length - 1;contador++){
        arreglo[contador] = arreglo[contador + 1];
    }
    arreglo.pop();
    document.write(arreglo + '<br>');
    return arreglo;
}

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
            while(pila.length != 0 && pila[pila.length - 1] != '(' &&  comparacionOperadores(simbolo,pila[pila.length - 1])){
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

document.onload = formulatToArreglo('1+342+3');