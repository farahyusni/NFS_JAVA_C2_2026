export async function fetchApiInfo() {
<<<<<<< HEAD
    const response = await fetch("/api/v1/info");
    
    if (!response.ok) {
        throw new Error(`API info request failed with status ${response.status}`);
    }

    return response.json();
}

export async function fetchApiDocs(){
    const response = await fetch("/api/docs");
    
    if (!response.ok) {
        throw new Error(`API docs request failed with status ${response.status}`);
    }

    return response.json();
}
=======
  const response = await fetch('/api/v1/info');

  if (!response.ok) {
    throw new Error(`API info request failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchApiDocs() {
  const response = await fetch('/api/docs');

  if (!response.ok) {
    throw new Error(`API docs request failed with status ${response.status}`);
  }

  return response.json();
}
>>>>>>> a2ba22e3d184f5cd9d97030666c810b5a4fc122d
