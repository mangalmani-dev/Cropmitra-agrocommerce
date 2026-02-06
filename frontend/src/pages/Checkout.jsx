import { useEffect, useState } from "react";
import { useAddressStore } from "../store/addressStore";
import { useCartStore } from "../store/cartStore";
import { useOrderStore } from "../store/orderStore";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

  const navigate = useNavigate();

  const { addresses, fetchAddresses } = useAddressStore();
  const { cart, clearCart } = useCartStore();
  const { placeOrder, loading } = useOrderStore();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");


  // Redirect if cart empty
  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);


  // Fetch addresses
  useEffect(() => {
    fetchAddresses();
  }, []);


  // Auto select default address
  useEffect(() => {

    if(addresses.length === 0) return;

    const defaultAddr =
      addresses.find(a => a.isDefault) || addresses[0];

    if (!selectedAddress && defaultAddr) {
      setSelectedAddress(defaultAddr._id);
    }

  }, [addresses, selectedAddress]);


  const totalAmount = cart.reduce(
    (sum, item) => sum + item.crop.price * item.quantity,
    0
  );


  const handlePlaceOrder = async () => {

    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    const success = await placeOrder({
      items: cart.map(item => ({
        crop: item.crop._id,
        quantity: item.quantity,
        farmer: item.crop.farmer,
        price: item.crop.price
      })),
      address: selectedAddress,
      totalAmount,
      paymentMethod
    });

    if(success){
      clearCart();
      navigate("/orders");
    }

  }; // ⭐ FUNCTION CLOSED HERE



  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-extrabold mb-10">
          Checkout 🧾
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* ADDRESS */}
          <div>

            <h2 className="text-2xl font-bold mb-5">
              Select Delivery Address
            </h2>

            <div className="space-y-4">

              {addresses.map(addr => (

                <div
                  key={addr._id}
                  onClick={() => setSelectedAddress(addr._id)}
                  className={`
                    cursor-pointer
                    border-2
                    rounded-2xl
                    p-5
                    transition
                    ${
                      selectedAddress === addr._id
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200 hover:border-green-400"
                    }
                  `}
                >

                  <p className="font-bold">
                    {addr.fullName}
                  </p>

                  <p className="text-gray-600">
                    {addr.addressLine}
                  </p>

                  <p className="text-gray-500">
                    {addr.city}, {addr.state}
                  </p>

                  <p className="text-sm mt-1">
                    📞 {addr.phone}
                  </p>

                </div>

              ))}

            </div>
          </div>



          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-3xl p-7 shadow-lg h-fit">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            {cart.map(item => (

              <div
                key={item.crop._id}
                className="flex justify-between mb-2"
              >
                <span>
                  {item.crop.name} × {item.quantity}
                </span>

                <span className="font-semibold">
                  ₹{item.crop.price * item.quantity}
                </span>
              </div>

            ))}

            <hr className="my-6" />

            <div className="flex justify-between text-2xl font-bold mb-6">
              <span>Total</span>
              <span className="text-green-600">
                ₹{totalAmount}
              </span>
            </div>


            {/* PAYMENT */}
            <div className="mb-6">

              <p className="font-semibold mb-2">
                Payment Method
              </p>

              <div
                onClick={() => setPaymentMethod("COD")}
                className={`
                  border
                  rounded-xl
                  p-3
                  cursor-pointer
                  ${
                    paymentMethod === "COD"
                      ? "bg-green-50 border-green-500"
                      : ""
                  }
                `}
              >
                Cash on Delivery
              </div>

            </div>


            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="
                w-full
                bg-gradient-to-r
                from-green-600
                to-emerald-500
                text-white
                py-3
                rounded-2xl
                font-semibold
                hover:scale-[1.02]
                active:scale-95
                transition
                disabled:opacity-50
              "
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
