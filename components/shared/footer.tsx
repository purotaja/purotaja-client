"use client";
import Link from "next/link";
import Logo from "./logo";
import useProducts from "@/hooks/use-product";
import { FaLinkedin, FaInstagram  } from "react-icons/fa";

const company = [
  { title: "Works", link: "/works" },
  { title: "Clients", link: "/clients" },
  { title: "Services", link: "/services" },
  { title: "Products", link: "/products" },
  { title: "Pricing", link: "/pricing" },
];

const legal = [
  { title: "Privacy Policy", link: "/privacy-policy" },
  { title: "Terms and Conditions", link: "/terms" },
  { title: "Refund Policy", link: "/refund" },
];

const FooterSection = () => {
  const { products, isLoading } = useProducts();

  return (
    <section className="w-full border-t mx-auto mt-10 md:mt-20">
      <div className="w-full max-w-screen-2xl px-[1rem] md:px-14 mx-auto flex flex-col md:flex-row items-start mt-10 md:justify-between gap-10">
        <div className="flex flex-col md:w-[30%] gap-4 justify-center md:pl-10">
          <div className="flex items-center gap-4 w-full">
            <Logo height={80} width={80} />
            <p className="text-2xl font-semibold">PuroTaja</p>
          </div>
          <p className="text-muted-foreground">
            © 2024 PuroTaja. All rights reserved.
          </p>
          <p className="text-muted-foreground">
          purotaja@gmail.com
          </p>
          <div className="flex gap-2 items-center">
            <Link href="">
              <FaLinkedin size={16} color="#9D9D9D"/>
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="">
              <FaInstagram  size={16} color="#9D9D9D"/>
            </Link>
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-8 md:gap-28 md:w-[60%] w-full">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">Company</p>
            {company.map((item, index) => (
              <Link key={index} href={item.link}>
                <span className="text-lg">{item.title}</span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">Legal</p>
            {legal.map((item, index) => (
              <Link key={index} href={item.link}>
                <span className="text-lg">{item.title}</span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">Products</p>
            <div className="flex gap-8">
              <div className="flex flex-col gap-2">
                {products.slice(0, 5).map((product, index) => (
                  <Link key={index} href={`/category/products/${product.id}`}>
                    <span className="text-lg">{product.name}</span>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {products.slice(0, 5).map((product, index) => (
                  <Link key={index} href={`/category/products/${product.id}`}>
                    <span className="text-lg">{product.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
