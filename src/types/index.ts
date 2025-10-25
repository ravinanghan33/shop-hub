export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface ApiCart {
  id: number;
  userId: number;
  date: string;
  products: ApiCartProduct[];
}

export interface ApiCartProduct {
  productId: number;
  quantity: number;
}

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface CreateProductDto {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;

export interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;

export interface CreateCartDto {
  userId: number;
  date: string;
  products: ApiCartProduct[];
}

export type UpdateCartDto = Partial<CreateCartDto>;

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  searchQuery: string;
}
