const fetchFunction = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export async function getCategories() {
  return fetchFunction('https://api.mercadolibre.com/sites/MLB/categories');
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId.length > 0 && query.length > 0) {
    return fetchFunction(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  }
  if (categoryId.length > 0) {
    return fetchFunction(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  }
  if (query.length > 0) {
    return fetchFunction(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  }
}

export async function productsByTheId(id) {
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await response.json();
  return data;
}
