import axios from "axios";
import FormData from 'form-data'
const BASE_URL = "http://localhost:4000";

export function addProduct(product) {
    const data = new FormData();
    data.append('img', product.img, product.img);
    data.append('title', product.title);
    data.append('stock', product.stock.toString());
    data.append('price', product.price.toString());
    data.append('details', product.details);
    return axios.post(`${BASE_URL}/product`, data, { withCredentials: true });
}

export function fetchApprovedProducts() {
    return axios.get(`${BASE_URL}/products`, { withCredentials: true });
}

export function searchProducts(searchTerm) {
    return axios.get(`${BASE_URL}/searchProducts?search=${searchTerm}`, { withCredentials: true });
}

export function updateProduct(product) {
    const data = new FormData();
    if(product.img) {
        data.append('img', product.img, product.img);
    }
    data.append('title', product.title);
    data.append('stock', product.stock.toString());
    data.append('price', product.price.toString());
    data.append('details', product.details);
    return axios.put(`${BASE_URL}/product/${product._id}`, data, { withCredentials: true });
}

export function deleteProduct(productId) {
    return axios.delete(`${BASE_URL}/product/${productId}`, { withCredentials: true });
}

export function approveProduct(productId) {
    return axios.put(`${BASE_URL}/product/approve/${productId}`, {}, { withCredentials: true });
}

export function fetchMyProducts() {
    return axios.get(`${BASE_URL}/my-products`, { withCredentials: true });
}

export function fetchAllProducts() {
    return axios.get(`${BASE_URL}/all-products`, { withCredentials: true });
}



/**
 * Adds an item to the user's cart.
 *
 * @param {Object} item - The item to add to the cart, should contain item's id.
 * @returns {Promise} - A promise resolving to the server's response.
 */
export function addToCart(item) {
    return axios.post(`${BASE_URL}/addtocart`, { product: item }, { withCredentials: true });
}

/**
 * Fetches all items in the user's cart.
 *
 * @returns {Promise} - A promise resolving to an array of items in the cart.
 */
export function fetchCartItems() {
    return axios.get(`${BASE_URL}/cart`, { withCredentials: true });
}

export function getCart(){
    return axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:4000/cart"
    })
}


/**
 * Starts a new chat with another user.
 *
 * @param {string} userId - The ID of the user with whom to start a chat.
 * @returns {Promise} - A promise resolving to the newly created chat.
 */
export function startChat(userId) {
    return axios.post(`${BASE_URL}/start`, { userId }, { withCredentials: true });
}

/**
 * Sends a message in a specific chat.
 *
 * @param {string} chatId - The ID of the chat to send a message in.
 * @param {string} content - The content of the message.
 * @returns {Promise} - A promise resolving to the server's response.
 */
export function sendMessage(chatId, content) {
    return axios.post(`${BASE_URL}/message/${chatId}`, { content }, { withCredentials: true });
}

/**
 * Fetches all messages from a specific chat.
 *
 * @param {string} chatId - The ID of the chat from which to fetch messages.
 * @returns {Promise} - A promise resolving to an array of messages.
 */
export function fetchMessages(chatId) {
    return axios.get(`${BASE_URL}/messages/${chatId}`, { withCredentials: true });
}

/**
 * Retrieves all chats for the logged-in user.
 *
 * @returns {Promise} - A promise resolving to an array of chats.
 */
export function fetchUserChats() {
    return axios.get(`${BASE_URL}/chats`, { withCredentials: true });
}

export function fetchAllUsers() {
    return axios.get(`${BASE_URL}/users`, { withCredentials: true });
}


/**
 * Places an order using cart details.
 *
 * @param {Object} paymentDetails - The payment details.
 * @param {string} cartId - The ID of the cart.
 * @returns {Promise} - A promise resolving to the placed order.
 */
export function placeOrder(paymentDetails, cartId) {
    return axios.post(`${BASE_URL}/order`, { paymentDetails, cartId }, { withCredentials: true });
}

/**
 * Approves an order (Admin only).
 *
 * @param {string} orderId - The ID of the order.
 * @returns {Promise} - A promise resolving to the approved order.
 */
export function approveOrder(orderId) {
    return axios.put(`${BASE_URL}/order/approve/${orderId}`, {}, { withCredentials: true });
}

/**
 * Completes an order (Admin only).
 *
 * @param {string} orderId - The ID of the order.
 * @returns {Promise} - A promise resolving to the completed order.
 */
export function completeOrder(orderId) {
    return axios.put(`${BASE_URL}/order/complete/${orderId}`, {}, { withCredentials: true });
}

/**
 * Fetches all orders (Admin only).
 *
 * @returns {Promise} - A promise resolving to an array of orders.
 */
export function fetchAllOrders() {
    return axios.get(`${BASE_URL}/orders`, { withCredentials: true });
}

/**
 * Fetches the logged-in user's previous orders.
 *
 * @returns {Promise} - A promise resolving to an array of the user's orders.
 */
export function fetchMyOrders() {
    return axios.get(`${BASE_URL}/my-orders`, { withCredentials: true });
}

export function fetchSellerOrders() {
    return axios.get(`${BASE_URL}/seller-orders`, { withCredentials: true });
}



/**
 * Fetches the user details of the logged-in user.
 *
 * @returns {Promise} - A promise resolving to the user object or an empty object if not logged in.
 */
export function fetchLoggedInUserDetails() {
    return axios.get(`${BASE_URL}/users`, { withCredentials: true });
}




export function addEvent(event) {
    const data = new FormData();
    if(event.img) {
        data.append('img', event.img, event.img.name);
    }
    data.append('eventName', event.eventName);
    data.append('date', event.date);
    data.append('time', event.time);
    data.append('location', event.location);
    data.append('details', event.details);

    return axios.post(`${BASE_URL}/event`, data, { withCredentials: true });
}


export function updateEvent(event) {
    const data = new FormData();
    if(event.img) {
        data.append('img', event.img, event.img.name);
    }
    data.append('eventName', event.eventName);
    data.append('date', event.date);
    data.append('time', event.time);
    data.append('location', event.location);
    data.append('details', event.details);

    return axios.put(`${BASE_URL}/event/${event._id}`, data, { withCredentials: true });
}


// Delete an event by its ID
export function deleteEvent(eventId) {
    return axios.delete(`${BASE_URL}/event/${eventId}`, { withCredentials: true });
}

// Fetch all events
export function fetchAllEvents() {
    return axios.get(`${BASE_URL}/events`, { withCredentials: true });
}


export function fetchAllTutorials() {
    return axios.get(`${BASE_URL}/tutorial`, { withCredentials: true });
}

// Create a new tutorial
export function createTutorial(tutorialData) {
    return axios.post(`${BASE_URL}/tutorial/add`, tutorialData, { withCredentials: true });
}

// Update a tutorial by its ID
export function updateTutorial(tutorialId, tutorialData) {
    return axios.put(`${BASE_URL}/tutorial/${tutorialId}`, tutorialData, { withCredentials: true });
}

// Enroll in a tutorial by its ID
export function enrollInTutorial(tutorialId) {
    return axios.post(`${BASE_URL}/tutorial/enroll/${tutorialId}`, {}, { withCredentials: true });
}

export function unrollInTutorial(tutorialId) {
    return axios.post(`${BASE_URL}/tutorial/unenroll/${tutorialId}`, {}, { withCredentials: true });
}


// Get tutorials with 'PENDING' status
export function fetchPendingTutorials() {
    return axios.get(`${BASE_URL}/tutorial/pending`, { withCredentials: true });
}

// Get tutorials with 'APPROVED' status
export function fetchApprovedTutorials() {
    return axios.get(`${BASE_URL}/tutorial/approved`, { withCredentials: true });
}

export function fetchMyTutorials() {
    return axios.get(`${BASE_URL}/tutorial/my`, { withCredentials: true });
}

export function approveTutorial(tutorialId) {
    return axios.put(`${BASE_URL}/tutorial/approve/${tutorialId}`, {}, { withCredentials: true });
}

// Get tutorials with 'CLOSED' status
export function fetchClosedTutorials() {
    return axios.get(`${BASE_URL}/tutorial/closed`, { withCredentials: true });
}


export function removeFromCart(product) {
    return axios.post(`${BASE_URL}/removefromcart/`, {product: product}, { withCredentials: true });
}


