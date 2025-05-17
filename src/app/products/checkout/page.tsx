"use client";

import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
interface FormData {
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  district: string;
  postcode?: string;
  phone: string;
  email: string;
  createAccount: boolean;
  differentAddress: boolean;
  orderNotes?: string;
  termsAndConditions: boolean;
  paymentMethod:
    | "directBankTransfer"
    | "chequePayment"
    | "cashOnDelivery"
    | "paypal";
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Page: FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Smart watches wood edition - Beige",
      price: 599.0,
      quantity: 1,
      image: "/smart-watch-beige.png",
    },
    {
      id: "2",
      name: "Smart watches wood edition - Black",
      price: 599.0,
      quantity: 1,
      image: "/smart-watch-black.png",
    },
  ]);

  const [shippingMethod, setShippingMethod] = useState<
    "flatRate" | "localPickup"
  >("flatRate");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = shippingMethod === "flatRate" ? 20.0 : 25.0;
  const total = subtotal + shippingCost;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      country: "Bangladesh",
      paymentMethod: "directBankTransfer",
      createAccount: false,
      differentAddress: false,
      termsAndConditions: false,
    },
  });

  const paymentMethod = watch("paymentMethod");

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form submitted:", data);
    console.log("Cart items:", cartItems);
    console.log("Shipping method:", shippingMethod);
    console.log("Total amount:", total);

    alert(
      "Order placed successfully! Payment gateway integration coming soon."
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing Details Form */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6 uppercase">
              Billing Details
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Company name (optional)
                </label>
                <input
                  type="text"
                  {...register("companyName")}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Country / Region <span className="text-red-600">*</span>
                </label>
                <select
                  {...register("country", { required: "Country is required" })}
                  className="w-full p-2 bg-slate-700 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
                {errors.country && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Street address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="House number and street name"
                  {...register("streetAddress", {
                    required: "Street address is required",
                  })}
                  className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.streetAddress && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.streetAddress.message}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  {...register("apartment")}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Town / City <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  {...register("city", { required: "City is required" })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.city && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Postcode / ZIP (optional)
                </label>
                <input
                  type="text"
                  {...register("postcode")}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+\-\s()]*$/,
                      message: "Invalid phone number format",
                    },
                  })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  Email address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="differentAddress"
                    {...register("differentAddress")}
                    className="mr-2 h-4 w-4 text-green-600"
                  />
                  <label htmlFor="differentAddress" className="text-sm">
                    Ship to a different address?
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  Order notes (optional)
                </label>
                <textarea
                  {...register("orderNotes")}
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  rows={4}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-bold mb-6 uppercase">Your Order</h2>

            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between font-semibold mb-4">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="mb-4">
                  <div className="flex items-start mb-2">
                    <div className="w-16 h-16 bg-gray-200 rounded-md mr-3 flex-shrink-0 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                        Product Image
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <div className="flex items-center mt-1">
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 border rounded-l"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-t border-b">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 border rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-b pb-4 mb-4">
              <h3 className="font-medium mb-2">Shipping</h3>

              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="flatRate"
                  name="shipping"
                  checked={shippingMethod === "flatRate"}
                  onChange={() => setShippingMethod("flatRate")}
                  className="mr-2 h-4 w-4 text-green-600"
                />
                <label
                  htmlFor="flatRate"
                  className="text-sm flex justify-between w-full"
                >
                  <span>Flat rate:</span>
                  <span>${shippingMethod === "flatRate" ? "20.00" : ""}</span>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="localPickup"
                  name="shipping"
                  checked={shippingMethod === "localPickup"}
                  onChange={() => setShippingMethod("localPickup")}
                  className="mr-2 h-4 w-4 text-green-600"
                />
                <label
                  htmlFor="localPickup"
                  className="text-sm flex justify-between w-full"
                >
                  <span>Local pickup:</span>
                  <span>
                    ${shippingMethod === "localPickup" ? "25.00" : ""}
                  </span>
                </label>
              </div>
            </div>

            <div className="border-b pb-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id="directBankTransfer"
                      value="directBankTransfer"
                      {...register("paymentMethod", { required: true })}
                      className="mr-2 h-4 w-4 text-green-600"
                    />
                    <label
                      htmlFor="directBankTransfer"
                      className="text-sm font-medium"
                    >
                      Direct bank transfer
                    </label>
                  </div>

                  {paymentMethod === "directBankTransfer" && (
                    <div className="ml-6 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      Make your payment directly into our bank account. Please
                      use your Order ID as the payment reference. Your order
                      won&lsquo;t be shipped until the funds have cleared in our
                      account.
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="chequePayment"
                      value="chequePayment"
                      {...register("paymentMethod", { required: true })}
                      className="mr-2 h-4 w-4 text-green-600"
                    />
                    <label
                      htmlFor="chequePayment"
                      className="text-sm font-medium"
                    >
                      Cheque Payment
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cashOnDelivery"
                      value="cashOnDelivery"
                      {...register("paymentMethod", { required: true })}
                      className="mr-2 h-4 w-4 text-green-600"
                    />
                    <label
                      htmlFor="cashOnDelivery"
                      className="text-sm font-medium"
                    >
                      Cash on delivery
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="paypal"
                      value="paypal"
                      {...register("paymentMethod", { required: true })}
                      className="mr-2 h-4 w-4 text-green-600"
                    />
                    <label
                      htmlFor="paypal"
                      className="text-sm font-medium flex items-center"
                    >
                      PayPal
                      <span className="ml-1 text-xs text-gray-500">
                        What is PayPal?
                      </span>
                    </label>
                  </div>

                  {paymentMethod === "paypal" && (
                    <div className="ml-6 mt-2">
                      <div className="flex items-center gap-1">
                        <div className="w-8 h-5 bg-blue-600 rounded"></div>
                        <div className="w-8 h-5 bg-red-600 rounded"></div>
                        <div className="w-8 h-5 bg-yellow-400 rounded"></div>
                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-6 text-sm text-gray-600">
                  <p>
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy policy
                    </a>
                    .
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="termsAndConditions"
                      {...register("termsAndConditions", {
                        required: "You must accept the terms and conditions",
                      })}
                      className="mt-1 mr-2 h-4 w-4 text-green-600"
                    />
                    <label htmlFor="termsAndConditions" className="text-sm">
                      I have read and agree to the website{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Terms and conditions
                      </a>{" "}
                      <span className="text-red-600">*</span>
                    </label>
                  </div>
                  {errors.termsAndConditions && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.termsAndConditions.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center flex-col w-full gap-4">
                  <button
                    type="submit"
                    className="p-3 w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded uppercase transition duration-200"
                  >
                    Place Order
                  </button>

                  <Link
                    href="/"
                    className="w-full text-center text-lg capitalize bg-green-600 text-white p-3 rounded cursor-pointer hover:bg-green-400 hover:text-black"
                  >
                    Cancel Order and Return to Home
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
