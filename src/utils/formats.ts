export const formatNumberWithSuffix = (value: number): string => {
  const suffixes: string[] = ['', 'K', 'M', 'B', 'T'];

  let formattedValue: number = value;
  let suffixIndex: number = 0;

  while (formattedValue >= 1000) {
    formattedValue /= 1000;
    suffixIndex++;
  }

  return `${formattedValue.toFixed(3)}${suffixes[suffixIndex]}`;
};

export const abbreviateAddress = (address: string) => {
  const prefixLength: number = 5;
  const suffixLength: number = 4;
  const abbreviation: string = `${address.slice(
    0,
    prefixLength
  )}...${address.slice(-suffixLength)}`;
  return abbreviation;
};

const createNumberFormatter = (
  minimumFractionDigits: number | undefined = undefined,
  maximumFractionDigits: number | undefined = undefined
): Intl.NumberFormat => {
  const options = {
    minimumFractionDigits,
    maximumFractionDigits,
  };

  return new Intl.NumberFormat('en-US', options);
};

export const numFor = createNumberFormatter(0, 0);
export const numFor2 = createNumberFormatter(2, 2);
export const numFor3 = createNumberFormatter();
export const numFor6 = createNumberFormatter(undefined, 6);
