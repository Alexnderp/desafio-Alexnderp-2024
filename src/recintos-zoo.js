const animais = [
  { especie: "LEAO", tamanho: 3, bioma: ["savana"], tipo: "carnivoro" },
  { especie: "LEOPARDO", tamanho: 2, bioma: ["savana"], tipo: "carnivoro" },
  { especie: "CROCODILO", tamanho: 3, bioma: ["rio"], tipo: "carnivoro" },
  {
    especie: "MACACO",
    tamanho: 1,
    bioma: ["savana", "floresta"],
    tipo: "onivoro",
  },
  { especie: "GAZELA", tamanho: 2, bioma: ["savana"], tipo: "herbivoro" },
  {
    especie: "HIPOPOTAMO",
    tamanho: 4,
    bioma: ["savana", "rio"],
    tipo: "onivoro",
  },
];

const recintos = [
  {
    id: 1,
    bioma: "savana",
    tamanhoTotal: 10,
    animaisExistentes: 3,
    animal: "MACACO",
  },
  { id: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: 0 },
  {
    id: 3,
    bioma: "savana e rio",
    tamanhoTotal: 7,
    animaisExistentes: 2,
    animal: "GAZELA",
  },
  { id: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: 0 },
  {
    id: 5,
    bioma: "savana",
    tamanhoTotal: 9,
    animaisExistentes: 3,
    animal: "LEAO",
  },
];

class RecintosZoo {
  analisaRecintos(animal, quantidade) {
    const viaveis = { recintosViaveis: [] };

    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const animalEncontrado = animais.find((a) => a.especie === animal);
    if (!animalEncontrado) {
      return { erro: "Animal inválido" };
    }

    recintos.forEach((recinto) => {
      if (
        animalEncontrado.bioma.includes(recinto.bioma) ||
        (animalEncontrado.bioma.includes("savana") &&
          recinto.bioma === "savana e rio")
      ) {
        const espacoNecessario =
          quantidade * animalEncontrado.tamanho +
          (recinto.animaisExistentes > 0 &&
          animalEncontrado.especie !== recinto.animal
            ? 1
            : 0);

        if (
          recinto.animaisExistentes + espacoNecessario <=
          recinto.tamanhoTotal
        ) {
          if (animalEncontrado.especie === "MACACO") {
            if (quantidade > 1 && recinto.animaisExistentes === 0) {
              viaveis.recintosViaveis.push(
                `Recinto ${recinto.id} (espaço livre: ${
                  recinto.tamanhoTotal -
                  recinto.animaisExistentes -
                  espacoNecessario
                } total: ${recinto.tamanhoTotal})`
              );
            }
          }
          if (this.analisaConforto(recinto, animalEncontrado, quantidade)) {
            viaveis.recintosViaveis.push(
              `Recinto ${recinto.id} (espaço livre: ${
                recinto.tamanhoTotal -
                recinto.animaisExistentes -
                espacoNecessario
              } total: ${recinto.tamanhoTotal})`
            );
          }
        }
      }
    });

    if (viaveis.recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return viaveis;
  }

  analisaConforto(recinto, animal, quantidade) {
    const animaisNoRecinto = [
      { especie: recinto.animal, quantidade: recinto.animaisExistentes },
      { especie: animal.especie, quantidade },
    ];
    const carnivoros = animaisNoRecinto.filter((a) =>
      ["LEAO", "LEOPARDO", "CROCODILO"].includes(a.especie)
    );

    if (animal.especie === "CROCODILO" && recinto.bioma === "rio") {
      return true;
    }

    if (
      (carnivoros.length >= 1 &&
        animaisNoRecinto[0].especie !== animal.especie) ||
      animaisNoRecinto[0].quantidade === 0
    ) {
      return false;
    }

    if (animal.especie === "HIPOPOTAMO" && recinto.bioma !== "savana e rio") {
      return false;
    }

    if (
      animal.especie === "MACACO" &&
      quantidade === 1 &&
      recinto.animaisExistentes === 0
    ) {
      return false;
    }

    return true;
  }
}

// console.log(new RecintosZoo().analisaRecintos("MACACO", 3));

export { RecintosZoo as RecintosZoo };
