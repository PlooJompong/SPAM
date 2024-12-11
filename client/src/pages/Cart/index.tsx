import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { GoPlus } from 'react-icons/go';
import { HiMinusSm } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomerHeader from '../../components/CustomerHeader';
import Container from '../../components/Container';

const Cart: React.FC = () => {
  const { cart, calculateTotalPrice, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleQuantityChange = (itemId: string, change: number) => {
    updateQuantity(itemId, change);
  };

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert('Varukorgen är tom. Lägg till något innan du beställer!');
      return;
    }

    if (!user) {
      alert('Du måste vara inloggad för att lägga en beställning.');
      return;
    }

    // Skapa beställdOrder
    const createdOrder = {
      name: user.username, // Använd användarens namn från AuthContext
      items: cart.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        vegetarian: item.vegetarian,
        ingredients: item.ingredients,
        quantity: item.quantity,
      })),
      totalPrice: calculateTotalPrice(),
      orderDate: new Date().toISOString(),
      locked: false,
      done: false,
      comment,
    };

    try {
      const response = await fetch(
        'http://localhost:8000/orders',
        // 'https://node-mongodb-api-ks7o.onrender.com/orders',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(createdOrder),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setError('Din session har gått ut. Logga in igen');
          console.log('Din session har gått ut. Logga in igen');
          sessionStorage.removeItem('token');
          navigate('/login');
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      /* alert("Din beställning har skickats!"); */
      console.log('Beställning skickad:', data);
      // navigate('/confirmation',  {
      //   state: { order: createdOrder },
      // });

      navigate('/confirmation', {
        state: { order: data.order || createdOrder }, // Använd backend-data om möjligt
      });

      // Skicka till orderhistorik
      // await addToOrderHistory({
      //   // userId: user.username, // Unik användaridentifierare
      //   name: user.username,
      //   items: cart,
      //   totalPrice: calculateTotalPrice(),
      // });

      // Rensa varukorgen efter beställning
      clearCart();
    } catch (error) {
      console.error('Kunde inte skicka beställningen:', error);
      alert(
        'Ingredienser för vald pizza är slut, vänligen kontakta restaurangen.'
      );
    }
  };

  // const addToOrderHistory = async (order: {
  //   // userId: string;
  //   name: string;
  //   items: Array<{
  //     _id: string;
  //     name: string;
  //     price: number;
  //     vegetarian: boolean;
  //     ingredients: string[];
  //   }>;
  //   totalPrice: number;
  // }) => {
  //   try {
  //     const response = await fetch(
  //       // 'https://node-mongodb-api-ks7o.onrender.com/orderhistory',
  //       'https://localhost:8000/orderhistory',
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(order),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log('Order tillagd i historik:', data);
  //   } catch (error) {
  //     console.error('Kunde inte lägga till order i historik:', error);
  //   }
  // };

  return (
    <>
      <CustomerHeader />
      <Container>
        <section className="flex flex-col justify-center sm:w-full md:w-96 mt-8 m-auto items-center rounded-lg shadow border border-zinc-200 bg-white p-4 font-sans">
          <h1 className="text-teal-900 text-lg font-bold">Varukorg</h1>
          <ul className="text-teal-900 flex flex-col max-w-[320px] w-full">
            {cart.map((item, index) => (
              <li
                key={`${item._id}-${index}`}
                className="mb-2 flex justify-between w-full flex-col"
              >
                <article className="flex justify-between w-full">
                  <span>{item.name} </span>
                  <span> {item.price} kr</span>
                </article>
                <article className="flex justify-between w-full">
                  <span className="flex items-center gap-2 justify-center w-16 border rounded-2xl mt-1 border-zinc-200 p-1 text-teal-900">
                    <HiMinusSm
                      className="text-teal-900 cursor-pointer"
                      onClick={() => handleQuantityChange(item._id, -1)}
                    />
                    <p>{item.quantity}</p>
                    <GoPlus
                      className="text-teal-900 cursor-pointer"
                      onClick={() => handleQuantityChange(item._id, 1)}
                    />
                  </span>
                  <span className="text-gray-400">
                    {item.quantity * item.price} kr
                  </span>
                </article>
              </li>
            ))}
          </ul>
          {cart.length === 0 && (
            <>
              <p className="text-center">Varukorgen är tom.</p>
              <p className="text-center">
                Logga in för att göra en beställning.
              </p>
            </>
          )}

          {cart.length > 0 && (
            <section className="flex flex-col max-w-[320px] w-full">
              <hr className="mt-6 mb-2"></hr>
              <h2 className="text-teal-900 flex justify-between max-w-[320px] w-full">
                <span>Totalpris:</span>
                <span>{calculateTotalPrice()} kr</span>
              </h2>
              <textarea
                className="border border-zinc-300 rounded p-2 w-full mt-4 text-sm"
                placeholder="Lägg till en kommentar för din order..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <article className="flex max-w-[320px] w-full justify-between text-teal-900 mt-4">
                <p>Betalningsmetod</p>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="selected:outline-teal-900
                focus:outline-teal-900
              active:outline-teal-900"
                >
                  <option>PayPal</option>
                  <option>ApplePay</option>
                  <option>Betalkort</option>
                  <option>Klarna</option>
                  <option>Betala på plats</option>
                </select>
              </article>

              {paymentMethod === 'Betalkort' && (
                <form className="mt-4">
                  <article className="flex flex-col">
                    <label className="text-teal-900 mb-2">
                      Kortnummer:
                      <input
                        type="text"
                        pattern="\d*"
                        maxLength={16}
                        className="border border-zinc-300 rounded p-2 w-full mt-1 focus:outline-teal-900"
                        placeholder="1234 5678 9012 3456"
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          target.value = target.value.replace(/\D/g, '');
                        }}
                      />
                    </label>
                    <label className="text-teal-900 mb-2">
                      Giltigt t.o.m.:
                      <input
                        type="text"
                        pattern="\d*"
                        maxLength={5}
                        className="border border-zinc-300 rounded p-2 w-full mt-1 focus:outline-teal-900"
                        placeholder="MM/ÅÅ"
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          let value = target.value.replace(/\D/g, '');

                          if (value.length > 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }

                          if (value.length > 0 && value.length <= 2) {
                            const month = parseInt(value.slice(0, 2), 10);
                            if (month > 12) {
                              value = '12';
                            }
                          }

                          target.value = value;
                        }}
                      />
                    </label>
                    <label className="text-teal-900 mb-2">
                      CVC:
                      <input
                        type="text"
                        pattern="\d*"
                        maxLength={3}
                        className="border border-zinc-300 rounded p-2 w-full mt-1 focus:outline-teal-900"
                        placeholder="123"
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          target.value = target.value.replace(/\D/g, '');
                        }}
                      />
                    </label>
                  </article>
                </form>
              )}

              <article className="flex justify-between gap-4">
                {/*                 <motion.button
                  onClick={handleOrder}
                  className="bg-teal-900 text-white rounded-lg px-2 py-1 mt-8 mb-2 cursor-pointer hover:bg-teal-800"
                  whileTap={{ scale: 0.9 }}
                >
                  Beställ
                </motion.button>
                <motion.button
                  onClick={clearCart}
                  className="bg-red-900 text-white rounded-lg px-2 py-1 mt-8 mb-2 cursor-pointer hover:bg-red-800"
                  whileTap={{ scale: 0.9 }}
                >
                  Rensa varukorg
                </motion.button> */}

                <motion.button
                  onClick={clearCart}
                  className="bg-red-900 text-white rounded-lg px-2 py-1 mt-8 mb-2 cursor-pointer hover:bg-red-800"
                  whileTap={{ scale: 0.9 }}
                >
                  Rensa varukorg
                </motion.button>
                <motion.button
                  onClick={handleOrder}
                  className="bg-teal-900 text-white rounded-lg px-2 py-1 mt-8 mb-2 cursor-pointer hover:bg-teal-800"
                  whileTap={{ scale: 0.9 }}
                >
                  Beställ
                </motion.button>
              </article>
            </section>
          )}
        </section>
      </Container>
    </>
  );
};

export default Cart;
