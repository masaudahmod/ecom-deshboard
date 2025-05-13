'use client';

import Image from 'next/image';
import React, { FC, useState } from 'react';

const Page: FC = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 399;
  const flatRate = 20;
  const subtotal = price * quantity;
  const total = subtotal + flatRate;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      <h2 className='text-2xl font-bold text-center '>Shopping Cart</h2>

      {/* Free Shipping Banner */}
      <div className="bg-slate-800 border border-green-200 p-4 rounded">
        <p>
          Add <span className="text-green-600 font-semibold">$1,101.00</span> to cart and get <span className="font-bold">free shipping!</span>
        </p>
        <div className="w-full h-3 mt-2 bg-gray-200 rounded">
          <div className="h-full bg-green-500 rounded" style={{ width: '25%' }}></div>
        </div>
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3 flex items-center gap-4">
                <Image src="/iphone-dock.png" alt="iPhone Dock" width={64} height={64} className="w-16 h-16 object-cover border" />
                <span>iPhone Dock - Gray</span>
              </td>
              <td className="p-3">${price.toFixed(2)}</td>
              <td className="p-3 flex items-center gap-2">
                <button
                  onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                  className="w-8 h-8 bg-gray-900 cursor-pointer hover:bg-gray-800 rounded"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-8 h-8 bg-gray-900 cursor-pointer hover:bg-gray-800 rounded"
                >
                  +
                </button>
              </td>
              <td className="p-3 text-green-600 font-semibold">${subtotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Coupon Input */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Coupon code"
          className="border p-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-400 hover:text-black">
          APPLY COUPON
        </button>
      </div>

      {/* Cart Totals */}
      <div className="border p-4 rounded max-w-md mx-auto space-y-4">
        <h2 className="text-xl font-bold">CART TOTALS</h2>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <div className="space-y-1 text-right">
            <div>Flat rate: <span className="text-green-600 font-semibold">${flatRate.toFixed(2)}</span></div>
            <div>Shipping to <span className="font-semibold">Bangladesh</span></div>
            <button className="text-green-600 text-sm underline cursor-pointer">Change address</button>
          </div>
        </div>

        <div className="flex justify-between text-xl font-bold border-t pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button className="w-full bg-green-600 text-white py-3 rounded cursor-pointer hover:bg-green-400 hover:text-black">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Page;