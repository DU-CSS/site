"use client"

export interface StripeProduct {
  productId: string;
  priceId: string;
  name: string;
  description?: string;
  images: string[];
  unitPrice: number;
}