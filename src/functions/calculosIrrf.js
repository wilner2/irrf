function calculo(salario, desconto, dependentes) {
  console.log(salario);
  console.log(desconto);

  console.log(dependentes);

  const valorDependentes = 164.56;
  const valorBase =
    parseFloat(salario) -
    parseFloat(desconto) -
    parseFloat(valorDependentes) * parseFloat(dependentes);

  if (salario <= 1903.98) {
    const descontoIRRF = valorBase * 0.0 - 0;
    return descontoIRRF;
  }
  if (salario >= 1903.98 && salario <= 2826.65) {
    const descontoIRRF = valorBase * 0.075 - 142.8;
    return descontoIRRF;
  } else if (salario >= 2826.65 && salario <= 3751.05) {
    const descontoIRRF = valorBase * 0.15 - 354.8;
    return descontoIRRF;
  } else if (salario >= 3751.05 && salario <= 4664.68) {
    const descontoIRRF = valorBase * 0.225 - 636.13;
    return descontoIRRF;
  } else if (salario >= 4664.68) {
    const descontoIRRF = valorBase * 0.27 - 869.36;
    return descontoIRRF;
  } else return 'Erro';
}
export const calculoIRRF = calculo;
