import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function ProductCard({ products, handleEditProduct, handleDeleteProduct }) {
    return (
        <>
            {products.map((product) => (
                <Card key={product._id} sx={{ maxWidth: 345, margin: '10px' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                        <IconButton
                            color="primary"
                            onClick={() => handleEditProduct(product)}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            color="primary"
                            onClick={() => handleDeleteProduct(product)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}
