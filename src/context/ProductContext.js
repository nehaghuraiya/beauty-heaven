import React, { createContext, useState, useContext, useEffect } from 'react';
import { products as productData } from '../data/productData';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Initialize products from productData on component mount
  useEffect(() => {
    // Convert productData to the format expected by the app
    const initialProducts = productData.map((product, index) => ({
      id: product.id || index + 1,
      name: product.name,
      category: product.category,
      price: typeof product.price === 'string' 
        ? parseFloat(product.price.replace(/[₹$]/g, ''))
        : product.price,
      originalPrice: product.originalPrice || product.price,
      stock: product.stock || Math.floor(Math.random() * 50) + 10,
      status: 'Active',
      image: product.image,
      description: product.description,
      rating: product.rating || (Math.random() * 2 + 3).toFixed(1),
      reviews: product.reviews || Math.floor(Math.random() * 100) + 20,
    }));
    
    setProducts(initialProducts);
  }, []);

  const addProduct = (newProduct) => {
    const product = {
      id: Date.now(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      originalPrice: parseFloat(newProduct.originalPrice) || parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      status: 'Active',
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 100) + 20,
    };
    setProducts(prevProducts => [...prevProducts, product]);
    return product;
  };

  const updateProduct = (productId, updatedProduct) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, ...updatedProduct }
          : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };

  const getProductsByCategory = (category) => {
    if (!category || category === 'All') return products;
    return products.filter(product => product.category === category);
  };

  const getProductById = (productId) => {
    return products.find(product => product.id === parseInt(productId));
  };

  const getActiveProducts = () => {
    return products.filter(product => product.status === 'Active');
  };

  const getLowStockProducts = () => {
    return products.filter(product => product.stock < 10 && product.stock > 0);
  };

  const getTotalProductsValue = () => {
    return products.reduce((total, product) => total + (product.price * product.stock), 0);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductsByCategory,
        getProductById,
        getActiveProducts,
        getLowStockProducts,
        getTotalProductsValue,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
} 