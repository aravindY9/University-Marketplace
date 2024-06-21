import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { approveProduct, fetchAllProducts, deleteProduct } from "../../../context/Database";

export default function ProductsComponent() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchAllProducts().then(res => {
            setProducts(res.data);
        });
    }, []);

    const handleApprove = (productId) => {
        approveProduct(productId)
            .then(() => {
                setProducts(products.map(product => {
                    if (product._id === productId) {
                        product.status = "APPROVED";
                    }
                    return product;
                }));
            })
            .catch(err => {
                console.error("Failed to approve the product:", err);
            });
    };

    const handleDelete = (productId) => {
        deleteProduct(productId)
            .then(() => {
                setProducts(products.filter(product => product._id !== productId));
            })
            .catch(err => {
                console.error("Failed to delete the product:", err);
            });
    };

    return (
        <div className="container mt-5">
            <h2>Products List</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Seller</th>
                    <th>Title</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Details</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product._id}>
                        <td>{product.seller.name}</td>
                        <td>{product.title}</td>
                        <td>{product.stock}</td>
                        <td>{product.price}</td>
                        <td>{product.details.substring(0, 50)}{product.details.length > 50 ? "..." : ""}</td>
                        <td>{product.status}</td>
                        <td>
                            {product.status === "PENDING" &&
                                <button className="btn btn-success mr-2" onClick={() => handleApprove(product._id)}>Approve</button>
                            }
                            <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
