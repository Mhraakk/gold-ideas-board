export function logGateway(event: string, detail: Record<string, string>): void {
  const line = JSON.stringify({ t: new Date().toISOString(), event, ...detail });
  console.info(line);
}
