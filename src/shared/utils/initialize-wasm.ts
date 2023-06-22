const headers = new Headers();
headers.append("Content-Type", "application/wasm");

export const initializeWasm = async (url: string): Promise<boolean> => {
  try {
    // @ts-expect-error Global variable
    const go = new Go();
    const result = await WebAssembly.instantiateStreaming(fetch(url, { headers }), go.importObject);

    go.run(result.instance);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
