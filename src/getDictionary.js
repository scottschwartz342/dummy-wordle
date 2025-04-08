export function getDictionary(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      return response.text();
    })
    .then((text) => {
      return text;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
