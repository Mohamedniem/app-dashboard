export interface IGetOccasionsResponse {
  message: string;
  metadata: IMetadata;
  occasions: IOccasion[];
}
export interface IGetOccasionResponse {
  message: string;
  occasion: IOccasion;
}
export interface IErrorResponse {
  message: string;
  error: string;
}

export interface IOccasion {
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

