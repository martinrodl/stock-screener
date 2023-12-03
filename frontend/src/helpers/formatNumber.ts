export function formatBigNumber(value: number, toFixed: number = 0) {
  const absValue = Math.abs(value);
  let formattedNumber;

  if (absValue >= 1e9) {
    // For absolute values in billions
    formattedNumber = `$${(absValue / 1e9).toFixed(toFixed)}B`;
  } else if (absValue >= 1e6) {
    // For absolute values in millions
    formattedNumber = `$${(absValue / 1e6).toFixed(toFixed)}M`;
  } else if (absValue >= 1e3) {
    // For absolute values in thousands
    formattedNumber = `$${(absValue / 1e3).toFixed(toFixed)}K`;
  } else {
    formattedNumber = `$${absValue.toFixed(toFixed)}`; // For absolute values less than 1000
  }

  // Reapply the negative sign if the original value was negative
  return value < 0 ? `-${formattedNumber}` : formattedNumber;
}
