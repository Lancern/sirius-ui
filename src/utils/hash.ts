export function getStringHash(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; ++i) {
    const cp = s.codePointAt(i) as number;
    hash = ((hash << 5) - hash) + cp;
    hash |= 0;  // Convert hash to 32-bit integer
  }

  return hash;
}
