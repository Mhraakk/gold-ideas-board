export function fnv1a(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function hex8(n: number): string {
  return n.toString(16).padStart(8, "0");
}

export function pick<T>(list: readonly T[], seed: number, salt = 0): T {
  const i = (seed + salt * 2654435761) % list.length;
  return list[i]!;
}
