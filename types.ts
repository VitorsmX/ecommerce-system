export interface Store {
    id: string;
    name: string;
}

export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
}

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
}

export interface Product {
    id: string;
    category: Category;
    name: string;
    price: string;
    isFeatured: boolean;
    size: Size;
    quantity: number;
    brand: Brand;
    description: Description;
    images: Image[];
}

export interface ProductCard extends Product {
    itemQuantity: number; 
}

export interface Image {
    id: string;
    url: string;
}

export interface Size {
    id: string;
    name: string;
    value: string;
}

export interface Brand {
    id: string;
    name: string;
}

export interface Description {
    id: string;
    description: string;
}

export interface PaymentInfo {
    id: string,
    userName: string,
    address: string,
    value: string
}

export interface PaymentInfoFailure {
    id: string,
    productNames: string
}