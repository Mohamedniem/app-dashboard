
export interface CategoryResponse {
  message: string;
  statistics: ICategory[];
}

export interface ICategory {
  _id: string;
  name: string;
  totalProducts: number;
  totalRevenue: number;
}

export interface ICategoryById {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin?: boolean;
}