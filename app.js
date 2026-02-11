// small refactor for project organization
const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = process.env.PORT || 3000; // Puedes cambiar el puerto si lo deseas

const productManager = new ProductManager('products.json'); // Asegúrate de tener un archivo products.json con productos

app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await productManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos.' });
    }
});

app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        const product = await productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
