export async function fetchApiInfo() {
  const response = await fetch('/api/v1/info');

  if (!response.ok) {
    throw new Error(`API info request failed with status ${response.status}`);
  }

  return response.json();
}
