import * as React from 'react';
import { addToCart } from "../../context/Database";
import { useAuth } from "../../context/AuthContext";

export function ItemComponent(props) {
    console.log(props.item);
    const { currentUser } = useAuth();
    const item = props.item;

    const addItemToCart = () => {
        addToCart(item).then(res => {
            console.log(res);
            alert("Item added to cart");
        });
    }

    return (
        <div className="col-md-6 col-lg-6 col-xl-4 mb-4">
            <div className="card h-100 shadow-sm border-0 rounded">
                <img src={item.picture}
                     className="card-img-top rounded-top"
                     alt="Item"
                     style={{
                         maxWidth: "200px",
                         maxHeight: "200px",
                         height: "200px",
                         width: "200px",
                         margin: "auto"
                     }}
                />
                <div className="card-body">
                    <h5 className="card-title text-center">{item.title}</h5>
                    <p className="text-muted text-center">Price: ${item.price}</p>
                    <p className="text-center">
                        Quantity available: {item.quantity}
                    </p>
                    {currentUser && currentUser.role === "user" && (
                        <div className="text-center">
                            <button className="btn btn-primary" onClick={addItemToCart}>
                                Add to cart
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
