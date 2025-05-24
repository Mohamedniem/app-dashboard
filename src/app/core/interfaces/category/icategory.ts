
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