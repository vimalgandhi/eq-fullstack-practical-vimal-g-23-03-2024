import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function AddProductModal({ onSubmit, initialValues, isOpen, onClose, categories }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues
    });
    const [selectedCategory, setSelectedCategory] = useState(initialValues ? initialValues.category : '');


    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="add-product-modal-title"
            aria-describedby="add-product-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    minWidth: 300,
                }}
            >
                <Typography id="add-product-modal-title" variant="h6" component="h2" gutterBottom>
                    {initialValues ? "Edit Product" : "Add Product"}
                </Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        {...register('name', { required: true })}
                        error={!!errors.name}
                        helperText={errors.name && "Name is required"}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Description"
                        {...register('description', { required: true })}
                        error={!!errors.description}
                        helperText={errors.description && "Description is required"}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Price"
                        type="number"
                        {...register('price', { required: true })}
                        error={!!errors.price}
                        helperText={errors.price && "Price is required"}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Image URL"
                        {...register('imageUrl')}
                        error={!!errors.imageUrl}
                        helperText={errors.imageUrl && "Image URL is required"}
                    />
                    <TextField
                        fullWidth
                        select
                        margin="normal"
                        label="Category"
                        {...register('category', { required: true })}
                        error={!!errors.category}
                        helperText={errors.category && "Category is required"}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};
