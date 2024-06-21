import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCart, placeOrder, removeFromCart } from "../../context/Database";

export default function Checkout() {
    const [products, setProducts] = useState([]);
    const [cartId, setCartId] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: "",
        expirationDate: "",
        cvv: ""
    });
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        getCart().then(res => {
            setProducts(res.data.cart);
            setCartId(res.data._id);
        });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if(name == "cvv" && value.length < 4){
            setPaymentDetails(prevDetails => ({ ...prevDetails, [name]: value }));
        }else if (name == "expirationDate"){
            setPaymentDetails(prevDetails => ({ ...prevDetails, [name]: value }));
        }else if(name == "cardNumber" && value.length <= 16){
            setPaymentDetails(prevDetails => ({ ...prevDetails, [name]: value }));
        }
        
    };

    const handlePlaceOrder = () => {
        
        
        if(paymentDetails.cvv == 4 || paymentDetails.cvv ==3){
            alert("cvv must be 3 or value digits");
            return;
        }else if(paymentDetails.cardNumber == 16){
            alert("Card number must be 16 digits");
            return;
        }

        if (products.length > 0) {
            placeOrder(paymentDetails, cartId).then(() => {
                navigate("/dashboard");
            });
        }
    };

    const calculateTotalPrice = () => {
        return products.reduce((total, product) => total + product.price, 0);
    };

    const handleRemoveProduct = (product) => {
        removeFromCart(product).then(() => {
            getCart().then(res => {
                setProducts(res.data.cart);
            });
        });
    };

    const aggregateProducts = () => {
        const productMap = {};

        products.forEach(product => {
            if (!productMap[product._id]) {
                productMap[product._id] = {
                    ...product,
                    quantity: 1
                };
            } else {
                productMap[product._id].quantity += 1;
            }
        });

        return Object.values(productMap);
    };

    const aggregatedProducts = aggregateProducts();

    return (
        <div className="container mt-5">
            <h2 className="mb-5">Checkout</h2>

            <div className="row">
                <div className="col-md-8">
                    {aggregatedProducts.map(product => (
                        <div key={product._id} className="d-flex mb-4 align-items-center">
                            <img src={product.picture} alt={product.title} width="100" className="mr-3" />
                            <div>
                                <h5>{product.title}</h5>
                                <p>{product.details}</p>
                                <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                                <p><strong>Quantity:</strong> {product.quantity}</p>
                                <button className="btn btn-danger btn-sm" onClick={() => handleRemoveProduct(product)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Payment Details</h3>
                            <h4 className="mb-4">Total Price: ${calculateTotalPrice().toFixed(2)}</h4>

                            <div className="mb-3">
                                <label className="form-label">Card Number:</label>
                                <input type="number" className="form-control" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Expiration Date:</label>
                                <input type="text" className="form-control" name="expirationDate" value={paymentDetails.expirationDate} onChange={handleInputChange} placeholder="MM/YY" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">CVV:</label>
                                <input type="number" className="form-control" name="cvv" value={paymentDetails.cvv} onChange={handleInputChange} />
                            </div>

                            {products.length > 0?
                                <button className="btn btn-primary btn-block" onClick={handlePlaceOrder}>Place Order</button>
                                :
                                <button className="btn btn-primary btn-block" onClick={() => {
                                navigate("/products")
                                }
                                }>See products</button>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
