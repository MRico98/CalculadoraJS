/**
 * Inicio de la calculadora
 * @param formula String con la formula
 */
function inicioCalculadora(formula){
    formula = cadenaToArray(formula);
    diferenciaOperadoresOperandos(formula);
    construccioNegativos(formula);
    comprobacionOperadores(formula);
    document.write(formula);
}

/**
 * Transformacion de cadena a array
 * ejemplo:
 * String 1+23
 * Array[0] = 1, Array[1] = +, Array[2] = 2, Array[3] = 3
 * @param formula String con la formula
 */
function cadenaToArray(formula){
    return formula.split('');
}

/**
 * Se hace la diferenciacion entre operadores y operandos en espacios de memoria
 * ejemplo:
 * String = 13+54 -> array[0] = 13, array[1] = +, array[2] = 54
 * ejemplo2:
 * String = 3.5+(3-4) -> array[0] = 3.5, array[1] = +, array[2] = (, array[3] = 3, array[4] = -, array[5] = 4, array[6] = )
 * @param formula 
 */
function diferenciaOperadoresOperandos(arregloformula){
    if(isNaN(parseFloat(arregloformula[0])) && arregloformula[0] != '-' && arregloformula[0] != '.' && arregloformula[0] != '(' && arregloformula[0] != ')'){
        throw "Error"; 
    }
    for(var contador=1;contador<arregloformula.length;contador++){
        if(!isNaN(parseFloat(arregloformula[contador])) || arregloformula[contador] == '.'){
            if(!isNaN(parseFloat(arregloformula[contador - 1])) || arregloformula[contador - 1] == '.'){
                arregloformula[contador-1] += arregloformula[contador];
                arregloformula = eliminarEspacio(arregloformula,contador);
                contador--;
            }
        }
    }
}

function construccioNegativos(arregloformula){
    var banderaoperador = false;
    for(var contador=0;contador<arregloformula.length;contador++){
        if(!isNaN(parseFloat(arregloformula[contador])) && arregloformula[contador - 1] == '-' && isNaN(parseFloat(arregloformula[contador - 2])) && arregloformula[contador - 2] != ')'){
            arregloformula[contador-1] += arregloformula[contador];
            arregloformula = eliminarEspacio(arregloformula,contador);
            contador--;
        }
    }
}

function comprobacionOperadores(arregloformula){
    for(var contador=0;contador<arregloformula.length;contador++){
        if(isNaN(parseFloat(arregloformula[contador])) && arregloformula[contador] != ')' && arregloformula[contador] != '(' && isNaN(parseFloat(arregloformula[contador + 1])) && arregloformula[contador + 1] != '('){
            document.write(arregloformula[contador] + '<br>');
            document.write("mal escrito <br>");
        }
    }
}

function eliminarEspacio(arreglo,espacioeliminar){
    for(var contador = espacioeliminar;contador < arreglo.length - 1;contador++){
        arreglo[contador] = arreglo[contador + 1];
    }
    arreglo.pop();
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
}

function comparacionOperadores(simbolo,simapila){
    if(simbolo == '+' || simbolo == '-'){
        if(simapila != "+" || simapila != '-'){
            return true;
        }
        else{
            return false;
        }
    }
    else if(simbolo == '*' || simbolo == '/'){
        if(simapila != '^'){
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

document.onload = inicioCalculadora('13-*-.4+(-46*-3)-3*3');