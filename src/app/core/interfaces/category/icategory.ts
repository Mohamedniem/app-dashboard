export interface IGetCategoriesResponse {
  message: string;
  metadata: IMetadata;
  categories: ICategory[];
}
export interface IGetCategoryResponse {
  message: string;
  category: ICategory;
}
export interface IErrorResponse {
  message: string;
  error: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
}

export interface IMetadata {
  totalPages: number;
  totalItems: number;
}
