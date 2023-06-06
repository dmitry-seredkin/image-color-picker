import { createObjectUrl } from "./create-object-url";

export const createImageElement = (blob: Blob): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const [url, revoke] = createObjectUrl(blob);
    const image = new Image();

    image.addEventListener(
      "load",
      () => {
        resolve(image);
        revoke();
      },
      { once: true }
    );

    image.addEventListener(
      "error",
      ({ error }) => {
        reject(error);
        revoke();
      },
      { once: true }
    );

    image.setAttribute("src", url);
  });
