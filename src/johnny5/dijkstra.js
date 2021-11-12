
let menorCaminho = (grafo, noCozinha, noFinal) => {
    // Distancia do nó de partida.
    let distancias = {};
    distancias[noFinal] = "Infinity";
    distancias = Object.assign(distancias, grafo[noCozinha]);
    
    // Caminhos para chegar ao nó final.
    let pais = { noFinal: null };
    for (let filha in grafo[noCozinha]) {
      pais[filha] = noCozinha;
    }
    //  Salvando nós visitados e procurando os próximos.
      let visited = [];
      let no = noMenorDistancia(distancias, visited);
    
    // Enquanto houver um nó mais próximo.
    while (no) {
    
    // Encontrar a distância do nó atual desde o no de partida, junto com filhas.
     let distancia = distancias[no];
     let filhas = grafo[no]; 
        //  Passar por todas as filhas.
         for (let filha in filhas){
          
            // Verificar se o nó filha é o nó inicial, se sim, retornar o caminho.
           if (String(filha) === String(noCozinha)){
            continue;
          } 
          else {
            
            // Agora salva a distancia entre o nó incial e a filha atual.
            let novadistancia = distancia + filhas[filha];
            
            // Se a distancia atual for menor que a distancia salva, atualiza.
            if (!distancias[filha] || distancias[filha] > novadistancia) {
              
            // Atualiza a distancia. 
              distancias[filha] = novadistancia;
              // Atualiza o no pais.
              pais[filha] = no;
            } 
          }
        }  
      // Adiciona o no atual aos visitados. 
        visited.push(no);
      // Procura o próximo no mais próximo.
        no = noMenorDistancia(distancias, visited);
      
      }
    
    // Retorna o caminho.
    let menorCaminho = [noFinal];
    let pai = pais[noFinal];
    
    // Enquanto o nó pai for diferente de null.
    while (pai){
      menorCaminho.push(pai);
      pai = pais[pai];
    }

    
    // Inverte o caminho.
    menorCaminho.reverse();
     
    // retorna o caminho mais curto.
    let resultado = {
      distancia: distancias[noFinal],
      caminho: menorCaminho,
    };

      return resultado;
   };

   let noMenorDistancia = (distancias, visited) => {

    // Cria um nó padrão.
        let menor = null;
        
        // Percorre todos os nós.
        for (let no in distancias) {
  
          // Se o nó não estiver visitado.
            let noAtualMenor = menor === null || distancias[no] < distancias[menor];
            // Se o nó não foi visitado e for menor que o atual.
            if (noAtualMenor && !visited.includes(no)) {
              // Atualiza o menor com o nó atual.
              menor = no;
            }
        }
        return menor;
    };


// Disposição das mesas do restaurante
let grafo = {
	cozinha: { A: 4.4, B: 3 },
	A: { cozinha: 1, C: 4, E: 2 },
	B: { cozinha: 1, C: 8, F: 7 },
	C: { A: 2, D: 6, B: 3 },
	D: { C: 1, F: 3, E: 4 },                          
  E: {A: 6, D: 2},
  F: {B: 7, D: 1, final: 1000},
	final: {},
};

// casos de testes

   console.log(menorCaminho(grafo, "cozinha", "A"));
   console.log(menorCaminho(grafo, "cozinha", "B"));
   console.log(menorCaminho(grafo, "cozinha", "C"));
   console.log(menorCaminho(grafo, "cozinha", "D"));
   console.log(menorCaminho(grafo, "cozinha", "E"));
   console.log(menorCaminho(grafo, "cozinha", "F"));
   console.log(menorCaminho(grafo, "cozinha", "final"));