export function getDictionary(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      return response.text();
    })
    .then((text) => {
      return text.split("\n");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
