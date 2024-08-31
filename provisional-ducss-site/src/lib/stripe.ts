"use server"
import { StripeProduct } from "@/lib/store";
import { unstable_noStore as noStore } from 'next/cache';

const backendUrl = process.env.BACKEND_URL || "http://backend:8080";

export async function fetchProduct(productId: string): Promise<StripeProduct | null> {
  try {
    noStore();
    const response = await fetch(`${backendUrl}/fetchProduct/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productId),
    });

    if (!response.ok) {
      console.error("Failed to fetch product, status:", response.status);
      return null;
    }

    const data = await response.json();

    console.log("Individual fetch:", data.unitPrice);

    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function fetchProducts(): Promise<StripeProduct[] | null> {
  try {
    noStore();
    const response = await fetch(`${backendUrl}/fetchProducts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      console.error("Failed to fetch products, status:", response.status);
      return null;
    }

    const data = await response.json();

    const products: StripeProduct[] = [];

    console.log(products)

    for (const obj of data) {
      const jsonObj = JSON.parse(JSON.stringify(obj));
      jsonObj.key = jsonObj.productId;
      products.push(jsonObj);
    }

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export const checkout = async (body: string) => {
  try {
    const response = await fetch(`${backendUrl}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const data = await response.json()
    
    return data
  } catch (error) {
    console.error('Error during checkout:', error);
  }
}