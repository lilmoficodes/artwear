"use client";

import { fetchProducts } from '@/payloadBackend/GETProducts';
import { Products } from '@/payload-types';
import { useEffect, useState, useRef } from 'react';
import PaymentButton from '@/components/PaymentButton';
import Image from 'next/image';
import gsap from 'gsap';
import { GiShoppingCart } from "react-icons/gi";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
gsap.registerPlugin(ScrollTrigger);

const ProductsPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (cardsRef.current.length > 0) {
      cardsRef.current.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, [products]);

  return (
    <>
      <nav className="flex w-full justify-between px-4 items-center py-8 bg-gradient-to-b from-black via-gray-950 to-black">
        <h1 className="text-6xl font-black text-transparent
         bg-clip-text bg-gradient-to-r from-gray-300 to-white tracking-wider">
          <Link href={"/"}>
          Artwear
          </Link>
        </h1>
        <div>
          <GiShoppingCart size={30}/>
        </div>
      </nav>
      <main className="grid md:grid-cols-3 grid-cols-1 gap-8 p-6 bg-black">
        {products.length === 0 ? (
          <div className="text-white text-2xl md:text-4xl text-center absolute left-0 w-full">Products are Loading...</div>
        ) : (
          products.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group border border-gray-800 bg-gradient-to-br
               from-gray-900 via-black to-gray-900 rounded-2xl overflow-hidden flex flex-col 
               items-center shadow-xl hover:shadow-2xl transition-shadow
                duration-300"
            >
              {item.productImage && (
                <div className="relative w-full h-80 overflow-hidden">
                  <Image
                    src={item.productImage.url}
                    alt={item.productName}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col items-center text-white">
                <h2 className="text-2xl font-semibold mb-2">{item.productName}</h2>
                <div className="text-lg font-bold text-teal-400 mb-4">${item.productPrice}</div>
                <PaymentButton amount={item.productPrice} />
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
};

export default ProductsPage;
