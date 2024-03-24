import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import {
    createData,
    deleteData,
    fetchData,
    updateData,
} from "../../helpers/ApiHelper";
import AddProductModal from "./AddProductModal";
import ProductCard from "./ProductCard";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [cateogories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        getProduts();
    }, []);

    const getProduts = async () => {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        await fetchData("products", config).then((data) => {
            if (data.length > 0) {
                setProducts(data);
            }
        });
        await fetchData("categories", config).then((data) => {
            if (data.length > 0) {
                setCategories(data);
            }
        });
    };

    const handleAddProduct = (data) => {
        setIsModalOpen(false);
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        if (data._id) {
            const product = {
                id: data._id,
                name: data.name,
                description: data.description,
                categoryId: data.categoryId,
                price: data.price,
                imageUrl: data.imageUrl,
            };
            updateData("products", product, config).then((data) => {
                if (data) {
                    getProduts();
                }
            });
        } else {
            createData("products", data, config).then((data) => {
                if (data) {
                    getProduts();
                }
            });
        }
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteProduct = (product) => {
        swal({
            title: "Delete Product",
            text: "Are you sure you want to delete?",
            button: "Ok!",
        }).then(async (data) => {
            if (data) {
                deleteProduct(product);
            }
        });
    };

    const deleteProduct = async (product) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        await deleteData(`products/product/${product._id}`, config).then((data) => {
            getProduts();
        });
    };

    return (
        <React.Fragment>
            <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
            >
                Products List
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ marginLeft: "auto" }}
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Product
                </Button>
            </Typography>
            {isModalOpen ? (
                <AddProductModal
                    onSubmit={handleAddProduct}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    initialValues={selectedProduct}
                    categories={cateogories}
                />
            ) : null}
            <ProductCard
                products={products}
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct}
            />
        </React.Fragment>
    );
}
