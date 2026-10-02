const { readProducts, writeProducts, getNextId } = require("../utils/productStore");

function getAllProducts(req, res) {
  const products = readProducts();

  res.json({
    count: products.length,
    data: products
  });
}

function getProductById(req, res) {
  const id = Number(req.params.id);
  const products = readProducts();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(product);
}

function createProduct(req, res) {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      message: "name, price, and category are required"
    });
  }

  const products = readProducts();
  const newProduct = {
    id: getNextId(products),
    name: String(name).trim(),
    price: Number(price),
    category: String(category).trim()
  };

  if (!newProduct.name || Number.isNaN(newProduct.price) || newProduct.price <= 0) {
    return res.status(400).json({ message: "Invalid product data" });
  }

  products.push(newProduct);
  writeProducts(products);

  return res.status(201).json(newProduct);
}

function updateProduct(req, res) {
  const id = Number(req.params.id);
  const { name, price, category } = req.body;
  const products = readProducts();
  const productIndex = products.findIndex((item) => item.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (!name || !price || !category) {
    return res.status(400).json({
      message: "name, price, and category are required"
    });
  }

  products[productIndex] = {
    ...products[productIndex],
    name: String(name).trim(),
    price: Number(price),
    category: String(category).trim()
  };

  writeProducts(products);
  return res.json(products[productIndex]);
}

function deleteProduct(req, res) {
  const id = Number(req.params.id);
  const products = readProducts();
  const productIndex = products.findIndex((item) => item.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const [deletedProduct] = products.splice(productIndex, 1);
  writeProducts(products);

  return res.json({
    message: "Product deleted successfully",
    deletedProduct
  });
}

function searchProducts(req, res) {
  const keyword = (req.query.keyword || "").toString().trim().toLowerCase();
  const products = readProducts();
  const results = products.filter((product) =>
    product.name.toLowerCase().includes(keyword)
  );

  return res.json(results);
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
};
