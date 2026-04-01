export function checkGuess(guess, solution) {
  let inputLetterObjArr = [];
  [...guess.toUpperCase()].forEach((element, index) => {
    inputLetterObjArr.push({ index: index, letter: element });
  });
  let solutionLetterPool = [];
  solution.forEach((element, index) => {
    solutionLetterPool.push({ index: index, letter: element });
  });
  let final = [];

  inputLetterObjArr.forEach(({ letter, index }) => {
    if (
      letter === solutionLetterPool.find((elem) => elem.index === index).letter
    ) {
      final.push({ index, letter, color: "green" });

      solutionLetterPool = solutionLetterPool.filter(
        (elem) => elem.index !== index,
      );
      inputLetterObjArr = inputLetterObjArr.filter(
        (elem) => elem.index !== index,
      );
    }
  });
  inputLetterObjArr.forEach(({ letter, index }) => {
    let found = solutionLetterPool.find((elem) => elem.letter === letter);
    if (found != undefined) {
      final.push({ index, letter, color: "yellow" });

      solutionLetterPool = solutionLetterPool.filter(
        (elem) => elem.index !== found.index,
      );
      inputLetterObjArr = inputLetterObjArr.filter(
        (elem) => elem.index !== index,
      );
    }
  });
  inputLetterObjArr.forEach(({ letter, index }) => {
    final.push({ index, letter, color: "grey" });

    solutionLetterPool = solutionLetterPool.filter(
      (elem) => elem.index !== index,
    );
    inputLetterObjArr = inputLetterObjArr.filter(
      (elem) => elem.index !== index,
    );
  });

  final = final.sort((a, b) => a.index - b.index);
  return final;
}
