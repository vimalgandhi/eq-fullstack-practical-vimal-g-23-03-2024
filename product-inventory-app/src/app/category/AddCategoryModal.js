import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useForm } from 'react-hook-form';


export default function AddCategoryModal({ onSubmit, initialValues, isOpen, onClose }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues // Set initial values for form fields
    });

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="add-category-modal-title"
            aria-describedby="add-category-modal-description"
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
                <Typography id="add-category-modal-title" variant="h6" component="h2" gutterBottom>
                    {initialValues ? "Edit Category" : "Add Category"}
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
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};