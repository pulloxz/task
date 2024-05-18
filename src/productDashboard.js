import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    IconButton,
    Collapse,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const ProductsDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ title: '', price: 0, description: '', category: '', image: '' });
    const [updateProduct, setUpdateProduct] = useState({ id: '', title: '', price: 0, description: '', category: '', image: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
        } catch (error) {
            console.error("There was an error fetching the products!", error);
        }
    };

    const handleAddProduct = async () => {
        try {
            const response = await axios.post('https://fakestoreapi.com/products', newProduct);
            setProducts([...products, response.data]);
        } catch (error) {
            console.error("error adding the product", error);
        }
    };

    const handleUpdateProduct = async () => {
        try {
            const response = await axios.put(`https://fakestoreapi.com/products/${updateProduct.id}`, updateProduct);
            const updatedProducts = products.map(product =>
                product.id === updateProduct.id ? response.data : product
            );
            setProducts(updatedProducts);
        } catch (error) {
            console.error("error updating the product", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`https://fakestoreapi.com/products/${id}`);
            const remainingProducts = products.filter(product => product.id !== id);
            setProducts(remainingProducts);
        } catch (error) {
            console.error("error deleting the product", error);
        }
    };

    const toggleExpandDescription = (id) => {
        setProducts(products.map(product => 
            product.id === id ? { ...product, expanded: !product.expanded } : product
        ));
    };


    return (
        <Container>
            <Typography variant="h4" sx={{ color: 'primary', fontWeight: 'bold', textAlign: 'center' }} gutterBottom>
                Products Management Dashboard
            </Typography>

            <Typography variant="h5" gutterBottom sx={{paddingTop:'40px'}} >Add New Product</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Price"
                        variant="outlined"
                        type="number"
                        fullWidth
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Category"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Image URL"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddProduct}>
                        Add Product
                    </Button>
                </Grid>
            </Grid>

            <Typography variant="h5" gutterBottom  sx={{paddingTop:'40px'}}>Update Product</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Product ID"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setUpdateProduct({ ...updateProduct, id: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setUpdateProduct({ ...updateProduct, title: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Price"
                        variant="outlined"
                        type="number"
                        fullWidth
                        onChange={(e) => setUpdateProduct({ ...updateProduct, price: parseFloat(e.target.value) })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setUpdateProduct({ ...updateProduct, description: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Category"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setUpdateProduct({ ...updateProduct, category: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Image URL"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setUpdateProduct({ ...updateProduct, image: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleUpdateProduct}>
                        Update Product
                    </Button>
                </Grid>
            </Grid>

            <Typography variant="h5" gutterBottom sx={{paddingTop:'40px'}}>Products List</Typography>
            <Grid container spacing={2}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.image}
                                alt={product.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" noWrap={!product.expanded}>
                                    {product.description}
                                </Typography>
                                <Collapse in={product.expanded} timeout="auto" unmountOnExit>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                </Collapse>
                                <Button size="small" onClick={() => toggleExpandDescription(product.id)}>
                                    {product.expanded ? 'Show Less' : 'Show More'}
                                </Button>
                            </CardContent>
                            <CardActions>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProduct(product.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductsDashboard;
