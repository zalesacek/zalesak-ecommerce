export interface Product {
    _id: string;
    imageUrl: string;
    title: string;
    price: number;
}

export interface CartProduct {
    _id: string;
    imageUrl: string;
    title: string;
    price: number;
    quantity: number;
}

export interface IAuth {
    token: string;
    isAuthenticated: boolean;
    user: IUser;
    loading: boolean;
    error: string;
    register: (data: any) => void;
    login: (data: any) => void;
    logout: () => void;
    loadUser: (data: string) => void;
}

export interface IUser {
    _id: string;
    isAdmin: boolean;
    name: string;
    email: string;
    date: Date;
}

export interface ICart {
    items: [];
    addToCart: (data: any) => void;
    submitOrder: () => void;
}

export interface Order {
    _id: string;
    products: [
        {
            _id: string;
            productId: string;
            quantity: number;
            price: number;
        }
    ];
    user: {
        name: string;
        userId?: string;
    };
    date: Date;
}

export enum Layout {
    Shop,
    Admin,
    Blank,
}