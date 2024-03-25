import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";

export default function ProductCard({
    product,
    handleEditProduct,
    handleDeleteProduct,
}) {
    return (
        <>
            <Card key={product._id} sx={{ maxWidth: 345, margin: "10px" }}>
                <CardMedia
                    component="img"
                    height="200"
                    sx={{ objectFit: "contain", backgroundColor: "white" }}
                    image={product.imageUrl} // Replace product.image with the URL or path to your image
                    alt={product.name} // Replace product.name with the appropriate alt text for your image
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
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
                    </div>

                </CardContent>
            </Card>
        </>
    );
}
