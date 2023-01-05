export function NormalCasing(item: string) {
  if (!item) {
    return ""
  }
  let words = item.split(" ")
  let newWords = []
  for (let word of words) {
    newWords.push([word[0].toUpperCase(), ...[word.toLowerCase().substring(1)]].reduce((a, b) => "" + a + b))
  }
  let str =  newWords.reduce((a, b) => a + " " + b)
  return str
}
