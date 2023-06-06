export const createObjectUrl = (blob: Blob): [string, () => void] => {
  const url = URL.createObjectURL(blob);

  const revoke = () => URL.revokeObjectURL(url);

  return [url, revoke];
};
