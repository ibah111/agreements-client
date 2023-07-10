export default function getName(...vars: (string | null)[]) {
  const tmp = [];
  for (const value of vars) {
    if (value) {
      tmp.push(value);
    }
  }
  return tmp.join(" ");
}
