import { useContext } from "react";
import { CartContext } from "@/context/cart";
import Footer from "@/components/mainlayout/Footer";
import Navbar from "@/components/mainlayout/Navbar";
import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/BreadCrumbs";

const Cart = () => {
  
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    return <p>Cart context is not available.</p>;
  }

  const { clearCart, cartItems, decreaseQuantity, increaseQuantity, removeFromCart, getCartTotal } = cartContext;

  // Handle remove item from cart
  const handleRemoveItem = (id: number) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    if (item) {
      removeFromCart(item);
    }
  };

  // Handle total price calculation
  const getTotalPrice = () => {
    return getCartTotal(); // Ensure to return the value
  };

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className="container mx-auto py-8">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl leading-8 text-gray-900">
           Your cart ({cartItems.length})
          </h2>
          <p onClick={() => clearCart()} className=' text-sm hover:cursor-pointer text-red-500 p-2 rounded'>
            <h2>Clear All</h2>
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((item) =>{
               
              
                return (
                <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
                  <img
                    width={200}
                    height={200}
                    src={item.img}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-gray-600">Ksh {item.newPrice}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => decreaseQuantity(item)}
                        disabled={item.quantity <= 1}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-4 px-4 py-2 text-red-500 hover:text-red-400 rounded-lg"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">Ksh {item.newPrice *item.quantity}</p>
                  </div>
                </div>
              )})}
            </div>
          )}

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total:</h2>
            <p className="text-2xl font-bold">Ksh {getTotalPrice()}</p>
          </div>

          <button className="mt-6 px-6 py-3 bg-button text-white rounded-lg hover:bg-green-700">
            <Link to="/checkout">Proceed to Checkout</Link>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
