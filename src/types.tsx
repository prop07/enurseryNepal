
export interface cart {
    quantity: number;
}

export interface product {
    name: string;
    sku: number;
    price: number;
    categories: {
        [category_id: string]: boolean;
    }
}

export interface catageory {
    name: string;
}

export interface user {
    name: string;
    email: string;
    phone: number;
    tel?: number;
}