export interface IGetProductsResponse {
  message: string;
  metadata: IMetadata;
  products: IProduct[];
}
export interface IGetProductResponse {
  message: string;
  product: IProduct;
}
export interface IErrorResponse {
  message: string;
  error: string;
}

export interface IProduct {
  rateAvg: number;
  rateCount: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isSuperAdmin: boolean;
  sold: number;
  id: string;
}


export interface IMetadata {
  totalPages: number;
  totalItems: number;
}