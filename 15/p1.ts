const data = (await Deno.readTextFile("input")).trim().split(",");

export function hash(str: string) {
  return str
    .split("")
    .reduce((acc, char) => ((acc + char.charCodeAt(0)) * 17) % 256, 0);
}
console.dir(data.map(hash).reduce((acc, cur) => acc + cur));
