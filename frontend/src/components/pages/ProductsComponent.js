import React, {useEffect, useState} from "react";
import {Card, Button, Image} from 'react-bootstrap';
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {fetchApprovedProducts, addToCart} from "../../context/Database";
import AddProduct from "./AddProduct";
import {FaCartPlus} from 'react-icons/fa';

export default function ProductsComponent() {
    const {currentUser} = useAuth();
    const navigation = useNavigate();
    const [products, setProducts] = useState([]);
    const [showAddProductModal, setShowAddProductModal] = useState(false);

    const handleShow = () => setShowAddProductModal(true);
    const handleClose = () => setShowAddProductModal(false);

    useEffect(() => {
        fetchApprovedProducts().then(res => {
            setProducts(res.data);
        });
    }, []);

    const handleAddToCart = (product) => {
        if (!currentUser) {
            navigation("/login");
            return;
        }
        addToCart(product).then(res => {
            alert("product added")
            fetchApprovedProducts().then(res => {
                setProducts(res.data);
            });
        });
    };

    return (
        <div className="min-vh-100">
            <div className="dashboard-info">
                <div className="home-info-content">
                    <h2>Items on Sale from Various Students</h2>
                    <p>Please see below for product images and descriptions.</p>
                    {currentUser && (
                        <>
                            <Button variant="primary" className={"mb-2"} onClick={handleShow}>
                                Add New Product
                            </Button>
                            <AddProduct show={showAddProductModal} handleClose={handleClose}/>
                        </>
                    )}

                    <div className="row">
                        {products.map(product => (
                            <div className="col-12 col-md-4 col-lg-3 mb-4" key={product._id}>
                                <Card className="h-100" style={{maxHeight: '350px'}}>
                                    <Card.Img
                                        variant="top"
                                        src={product.picture}
                                        alt={product.title}
                                        style={{maxHeight: '120px', objectFit: 'contain'}}
                                    />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                            <p><strong>Seller:</strong> {product.seller.name}</p>
                                            <p><strong>Stock:</strong> {product.stock}</p>
                                            <p>{product.details}</p>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="d-flex justify-content-between align-items-center">
                                        <span className="font-weight-bold">${product.price.toFixed(2)}</span>
                                        <Button disabled={(currentUser &&
                                            currentUser._id === product.seller._id) || product.stock <=0 }
                                                variant="primary" onClick={() => handleAddToCart(product)}>
                                            <FaCartPlus style={{marginRight: '5px'}}/> Add to Cart
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
