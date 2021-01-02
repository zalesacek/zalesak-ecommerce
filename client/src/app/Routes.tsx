import Homepage from '../shop/components/Homepage/Homepage';
import NotFound from '../shop/components/NotFound/NotFound';
import ProductsList from '../shop/components/Products/ProductsList/ProductsList';
import ProductDetail from '../shop/components/Products/ProductDetail/ProductDetail';
import Login from '../shop/components/Auth/Login';
import Registration from '../shop/components/Auth/Registration';
import Cart from '../shop/components/Cart/Cart/Cart';
import UserProfile from '../shop/components/Profile/Info/Info';
import UserOrders from '../shop/components/Profile/Orders/Orders';
import AdminLogin from '../admin/components/Auth/Login';
import AdminProductsList from '../admin/components/Products/ProductsList/ProductsList';
import AdminProductDetail from '../admin/components/Products/ProductDetail/ProductDetail';
import AdminCreateProduct from '../admin/components/Products/CreateProduct/CreateProduct';
import AdminUsersList from '../admin/components/Users/UsersList/UsersList';
import AdminUserDetail from '../admin/components/Users/UserDetail/UserDetail';
import AdminOrders from '../admin/components/Orders/OrdersList/OrdersList';
import AdminOrderDetail from '../admin/components/Orders/OrderDetail/OrderDetail';
import { Layout } from '../app/Types';
 
export interface IRoute {
    path: string;
    exact?: boolean;
    component?: any;
    layout?: any;
    protected: boolean;
}

export const routesUrl = {
    Homepage: '/',
    ProductsList: '/products',
    ProductDetail: '/product-detail/',
    Login: '/login',
    Registration: '/registration',
    Cart: '/cart',
    UserProfile: '/profile',
    UserOrders: '/profile-orders',
    AdminProductsList: '/shop-admin/products',
    AdminProductDetail: '/shop-admin/product-detail/',
    AdminCreateProduct: '/shop-admin/new-product',
    AdminUsersList: '/shop-admin/users',    
    AdminUserDetail: '/shop-admin/user-detail/',
    AdminOrders: '/shop-admin/orders',
    AdminOrderDetail: '/shop-admin/order-detail/',
    AdminLogin: '/shop-admin/login',    
}

export const routes: IRoute[] = [
    {
        path: routesUrl.Homepage,
        exact: true,
        component: Homepage,
        layout: Layout.Shop,
        protected: false,
    },
    {
        path: routesUrl.Login,
        component: Login,
        layout: Layout.Shop,
        protected: false,
    },
    {
        path: routesUrl.Registration,
        component: Registration,
        layout: Layout.Shop,
        protected: false,
    },
    {
        path: routesUrl.ProductsList,
        component: ProductsList,
        layout: Layout.Shop,
        protected: false,
    },
    {
        path: routesUrl.ProductDetail + ':productId',
        component: ProductDetail,
        layout: Layout.Shop,
        protected: false,
    },
    {
        path: routesUrl.Cart,
        component: Cart,
        layout: Layout.Shop,
        protected: false,
    },
    {
        path: routesUrl.UserProfile,
        component: UserProfile,
        layout: Layout.Shop,
        protected: false,
    },
    {
        path: routesUrl.UserOrders,
        component: UserOrders,
        layout: Layout.Shop,
        protected: false,
    },
    {
        path: routesUrl.AdminLogin,
        component: AdminLogin,
        layout: Layout.Blank,
        protected: false,
    },
    {
        path: routesUrl.AdminProductsList,
        component: AdminProductsList,
        layout: Layout.Admin,
        protected: true,
    },
    {
        path: routesUrl.AdminProductDetail + ':productId',
        component: AdminProductDetail,
        layout: Layout.Admin,
        protected: true,
    },
    {
        path: routesUrl.AdminCreateProduct,
        component: AdminCreateProduct,
        layout: Layout.Admin,
        protected: true,
    },
    {
        path: routesUrl.AdminUsersList,
        component: AdminUsersList,
        layout: Layout.Admin,
        protected: true,
    },
    {
        path: routesUrl.AdminUserDetail + ':userId',
        component: AdminUserDetail,
        layout: Layout.Admin,
        protected: true,
    },
    {
        path: routesUrl.AdminOrders,
        component: AdminOrders,
        layout: Layout.Admin,
        protected: true,
    },
    {
        path: routesUrl.AdminOrderDetail + ':orderId',
        component: AdminOrderDetail,
        layout: Layout.Admin,
        protected: true,
    },
    {
        path: '',
        component: NotFound,
        layout: Layout.Shop,
        protected: false,
    },
];
