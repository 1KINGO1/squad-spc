const parseSymbols = ["H", "e", "l", "l", "o", "D", "u", "d", "e", "!"];

const parseSteamIdToHash = (steamId: string) => {
  return steamId
    .split('')
    .slice(-8)
    .map((char) => parseSymbols[+char || 0])
    .join('');
}

export default parseSteamIdToHash;