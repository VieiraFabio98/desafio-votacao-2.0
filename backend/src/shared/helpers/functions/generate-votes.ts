export function generateVotes(totalVotes: number) {
  const calculaDigito = (nums: number[], pesoInicial: number) => {
    let soma = 0;
    for (let i = 0; i < nums.length; i++) soma += nums[i] * (pesoInicial - i);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  while (true) {
    const nums: number[] = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    if (new Set(nums).size === 1) continue;
    const d1 = calculaDigito(nums, 10);
    const d2 = calculaDigito([...nums, d1], 11);
    const cpfArray = [...nums, d1, d2];
    if (new Set(cpfArray).size === 1) continue;
    return cpfArray.join('');
  }
}