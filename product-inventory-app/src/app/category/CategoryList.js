import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { createData, deleteData, fetchData, updateData } from "../../helpers/ApiHelper";
import AddCategoryModal from "./AddCategoryModal";

export default function Categories() {
    const [cateogories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        await fetchData("categories", config).then((data) => {
            if (data.length > 0) {
                setCategories(data);
            }
        });
    };

    const handleAddCategory = (data) => {
        setIsModalOpen(false);
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        if (data._id) {
            const category = {
                "id": data._id,
                "name": data.name,
                "description": data.description,
            }
            updateData("categories", category, config).then((data) => {
                if (data) {
                    getCategories();
                }
            });
        } else {
            createData("categories", data, config).then((data) => {
                if (data) {
                    getCategories();
                }
            });
        }
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleDeleteCategory = (category) => {
        swal({
            title: "Delete Category",
            text: "Are you sure you want to delete?",
            button: "Ok!",
        }).then(async (data) => {
            if (data) {
                deleteCategory(category);
            }
        });
    };

    const deleteCategory = async (category) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        await deleteData(`categories/category/${category._id}`, config).then(
            (data) => {
                getCategories();
            }
        );
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
                Categories List
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ marginLeft: "auto" }}
                    onClick={() => { setIsModalOpen(true); setSelectedCategory(null) }}
                >
                    Add Category
                </Button>
            </Typography>
            {isModalOpen ? (
                <AddCategoryModal
                    onSubmit={handleAddCategory}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    initialValues={selectedCategory}
                />
            ) : null}
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cateogories.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell sx={{ maxWidth: "50%", width: "40%" }}>
                                {row.name}
                            </TableCell>
                            <TableCell sx={{ maxWidth: "50%", width: "40%" }}>
                                {row.description}
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    color="primary"
                                    onClick={() => handleEditCategory(row)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    onClick={() => handleDeleteCategory(row)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
