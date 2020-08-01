import React from 'react';
import { BrowserRouter, Route, Switch, HashRouter,Redirect } from 'react-router-dom';
import history from '../history';
import Users from '../pages/usersmanagment/users/users';
import UserRole from '../pages/usersmanagment/userrole/userrole';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Dashboard from '../pages/dashboard/dashboard';
import UserRoleToRights from '../pages/usersmanagment/userroletorights/userroletorights';
import Profile from '../pages/profile/profile';
import AddUser from '../pages/usersmanagment/adduser/adduser';
import Category from '../pages/categorymanagment/category/category';
import SubCategory from '../pages/categorymanagment/subcategory/subcategory';
import AddCategory from '../pages/categorymanagment/addcategory/addcategory';
import AddSubCategory from '../pages/categorymanagment/addsubcategory/addsubcategory';
import AddUserRole from '../pages/usersmanagment/adduserrole/adduserrole';
import CountryManagment from '../pages/locationmanagment/countrymanagment/countrymanagment';
import AddCountry from '../pages/locationmanagment/addcountry/addcountry';
import StateManagment from '../pages/locationmanagment/statemanagment/statemanagment';
import AddState from '../pages/locationmanagment/addstate/addstate';
import City from '../pages/locationmanagment/citymanagment/city';
import AddCity from '../pages/locationmanagment/addcity/addcity';
import ViewUser from '../pages/usersmanagment/viewuser/viewuser';
import ViewUserRole from '../pages/usersmanagment/viewuserrole/viewuserrole';
import ViewCategory from '../pages/categorymanagment/viewcategory/viewcategory';
import ViewSubCategory from '../pages/categorymanagment/viewsubcategory/viewsubcategory';
import ViewCity from '../pages/locationmanagment/viewcity/viewcity';
import ViewState from '../pages/locationmanagment/viewstate/viewstate';
import ViewCountry from '../pages/locationmanagment/viewcountry/viewcountry';
import Tables from '../component/tables/table';
import Coupon from '../pages/couponmanagment/couponmanagment';
import Merchant from '../pages/merchantmanagment/merchant/merchant';
import MerchantBusiness from '../pages/merchantmanagment/business-management/business';
import MerchantReview from '../pages/merchantmanagment/review-management/reviewmanagement';
import AddProduct from '../pages/productmanagment/addproduct/addproduct';
import ImageProduct from '../pages/productmanagment/imageproduct/imageproduct';
import InventoryProduct from '../pages/productmanagment/inventoryproduct/inventoryproduct';
import ListProduct from '../pages/productmanagment/listproduct/listproduct';
import ViewProduct from '../pages/productmanagment/viewproduct/viewproduct';
import ProductReview from '../pages/productmanagment/reviewproduct/reviewproduct';
import AddOnProduct from '../pages/productmanagment/addonmanagment/addonmanagment';
import DeliveryManagement from '../pages/deliverymanagment/deliverymanagment';
import AddDelivery from '../pages/deliverymanagment/adddelivery/adddelivery';
import ViewDelivery from '../pages/deliverymanagment/viewdelivery/viewdelivery';
import ListProductImage from '../pages/productmanagment/listimageproduct/listimageproduct';
import ViewProductImage from '../pages/productmanagment/viewproductimage/viewproductimage';
import ListMerchantReview from '../pages/merchantmanagment/listreview/listreview';
import ListProductInventory from '../pages/productmanagment/listinventory/listinventory';
import ViewProductInventory from '../pages/productmanagment/viewproductinventory/viewinventory';
import ListProductReview from '../pages/productmanagment/listproductreview/listproductreview';
import ViewProductReview from '../pages/productmanagment/viewproductreview/viewproductreview';
import ViewMerchantReview from '../pages/merchantmanagment/viewmerchantreview/viewmerchantreview';
import OrderManagement from '../pages/ordermanagment/order/order';
import ListOrderManagement from '../pages/ordermanagment/listorder/listorder';
import OrderCartManagement from '../pages/ordermanagment/cart/cart';
import ViewOrderManagement from '../pages/ordermanagment/vieworder/vieworder';
import ListCartManagement from '../pages/ordermanagment/listcart/listcart';
import ViewCartManagement from '../pages/ordermanagment/viewcart/viewcart';
import ListUser from '../pages/customermanagment/listuser/listuser';
import AddCustomer from '../pages/customermanagment/adduser/adduser';
import ViewCustomer from '../pages/customermanagment/viewuser/viewuser';
import ListAddress from '../pages/customermanagment/listaddress/listaddress';
import AddAddress from '../pages/customermanagment/addaddress/addaddress';
import ViewAddress from '../pages/customermanagment/viewaddress/viewaddress';
import ListCard from '../pages/customermanagment/listcard/listcard';
import AddCard from '../pages/customermanagment/addcard/addcard';
import ViewCard from '../pages/customermanagment/viewcard/viewcard';
import ChangePassword from '../pages/chnagepassword/changepassword';
import ResetPassword from '../pages/resetpassword/resetpassword';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class Main extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <React.Suspense fallback={loading}>
            {/* <Route exact path='/' render={(props: any) => <Login {...props} />} />
            <Route exact path='/login' render={(props: any) => <Login {...props} />} /> */}
            <Route exact path='/dashboard' name='Dashboard' render={(props: any) => <Dashboard {...props} />} />
            <Route exact path='/signup' render={(props: any) => <Signup {...props} />} />
            {/* <Route exact path='/forgotpassword' render={(props: any) => <ForgotPassword {...props} />} /> */}
            <Route exact path='/users' render={(props: any) => <Users {...props} />} />
            <Route exact path='/userrole' render={(props: any) => <UserRole {...props} />} />
            <Route exact path='/userroletorights' render={(props: any) => <UserRoleToRights {...props} />} />
            <Route exact path='/profile' render={(props: any) => <Profile {...props} />} />
            <Route exact path='/adduser' render={(props: any) => <AddUser {...props} />} />
            <Route exact path='/edituser/:id' render={(props: any) => <AddUser {...props} />} />
            <Route exact path='/category' render={(props: any) => <Category {...props} />} />
            <Route exact path='/subcategory' render={(props: any) => <SubCategory {...props} />} />
            <Route exact path='/addcategory' render={(props: any) => <AddCategory {...props} />} />
            <Route exact path='/editcategory/:id' render={(props: any) => <AddCategory {...props} />} />
            <Route exact path='/addsubcategory' render={(props: any) => <AddSubCategory {...props} />} />
            <Route exact path='/editsubcategory/:id' render={(props: any) => <AddSubCategory {...props} />} />
            <Route exact path='/adduserrole' render={(props: any) => <AddUserRole {...props} />} />
            <Route exact path='/edituserrole/:id' render={(props: any) => <AddUserRole {...props} />} />
            <Route exact path='/country' render={(props: any) => <CountryManagment {...props} />} />
            <Route exact path='/addcountry' render={(props: any) => <AddCountry {...props} />} />
            <Route exact path='/editcountry' render={(props: any) => <AddCountry {...props} />} />
            <Route exact path='/state' render={(props: any) => <StateManagment {...props} />} />
            <Route exact path='/addstate' render={(props: any) => <AddState {...props} />} />
            <Route exact path='/editstate' render={(props: any) => <AddState {...props} />} />
            <Route exact path='/city' render={(props: any) => <City {...props} />} />
            <Route exact path='/addcity' render={(props: any) => <AddCity {...props} />} />
            <Route exact path='/editcity' render={(props: any) => <AddCity {...props} />} />
            <Route exact path='/viewuser/:id' render={(props: any) => <ViewUser {...props} />} />
            <Route exact path='/viewuserrole/:id' render={(props: any) => <ViewUserRole {...props} />} />
            <Route exact path='/viewcategory/:id' render={(props: any) => <ViewCategory {...props} />} />
            <Route exact path='/viewsubcategory/:id' render={(props: any) => <ViewSubCategory {...props} />} />
            <Route exact path='/viewcity' render={(props: any) => <ViewCity {...props} />} />
            <Route exact path='/viewstate' render={(props: any) => <ViewState {...props} />} />
            <Route exact path='/viewcountry' render={(props: any) => <ViewCountry {...props} />} />
            <Route exact path='/table' render={(props: any) => <Tables {...props} />} />
            <Route exact path='/coupon' render={(props: any) => <Coupon {...props} />} />
            <Route exact path='/merchant' render={(props: any) => <Merchant {...props} />} />
            <Route exact path='/merchant-business' render={(props: any) => <MerchantBusiness {...props} />} />
            <Route exact path='/merchant-review' render={(props: any) => <MerchantReview {...props} />} />
            <Route exact path='/product' render={(props: any) => <AddProduct {...props} />} />
            <Route exact path='/edit-product' render={(props: any) => <AddProduct {...props} />} />
            <Route exact path='/view-product' render={(props: any) => <ViewProduct {...props} />} />
            <Route exact path='/product-image' render={(props: any) => <ImageProduct {...props} />} />
            <Route exact path='/product-inventory' render={(props: any) => <InventoryProduct {...props} />} />
            <Route exact path='/list-product' render={(props: any) => <ListProduct {...props} />} />
            <Route exact path='/product-review' render={(props: any) => <ProductReview {...props} />} />
            <Route exact path='/product-addondetail' render={(props: any) => <AddOnProduct {...props} />} />
            <Route exact path='/delivery' render={(props: any) => <DeliveryManagement {...props} />} />
            <Route exact path='/add-delivery' render={(props: any) => <AddDelivery {...props} />} />
            <Route exact path='/editdelivery' render={(props: any) => <AddDelivery {...props} />} />
            <Route exact path='/viewdelivery' render={(props: any) => <ViewDelivery {...props} />} />
            <Route exact path='/list-product-image' render={(props: any) => <ListProductImage {...props} />} />
            <Route exact path='/edit-product-image' render={(props: any) => <ImageProduct {...props} />} />
            <Route exact path='/view-product-image' render={(props: any) => <ViewProductImage {...props} />} />
            <Route exact path='/list-merchant-review' render={(props: any) => <ListMerchantReview {...props} />} />
            <Route exact path='/list-product-inventory' render={(props: any) => <ListProductInventory {...props} />} />
            <Route exact path='/edit-product-inventory' render={(props: any) => <InventoryProduct {...props} />} />
            <Route exact path='/view-product-inventory' render={(props: any) => <ViewProductInventory {...props} />} />
            <Route exact path='/list-product-review' render={(props: any) => <ListProductReview {...props} />} />
            <Route exact path='/view-product-review' render={(props: any) => <ViewProductReview {...props} />} />
            <Route exact path='/view-merchant-review' render={(props: any) => <ViewMerchantReview {...props} />} />
            <Route exact path='/list-order' render={(props: any) => <ListOrderManagement {...props} />} />
            <Route exact path='/add-order' render={(props: any) => <OrderManagement {...props} />} />
            <Route exact path='/edit-order-details' render={(props: any) => <OrderManagement {...props} />} />
            <Route exact path='/view-order-details' render={(props: any) => <ViewOrderManagement {...props} />} />
            <Route exact path='/order-cart' render={(props: any) => <OrderCartManagement {...props} />} />
            <Route exact path='/list-cart' render={(props: any) => <ListCartManagement {...props} />} />
            <Route exact path='/view-cart-order' render={(props: any) => <ViewCartManagement {...props} />} />
            <Route exact path='/list-user' render={(props: any) => <ListUser {...props} />} />
            <Route exact path='/add-user' render={(props: any) => <AddCustomer {...props} />} />
            <Route exact path='/edit-user' render={(props: any) => <AddCustomer {...props} />} />
            <Route exact path='/view-user' render={(props: any) => <ViewCustomer {...props} />} />
            <Route exact path='/list-address' render={(props: any) => <ListAddress {...props} />} />
            <Route exact path='/add-address' render={(props: any) => <AddAddress {...props} />} />
            <Route exact path='/edit-address' render={(props: any) => <AddAddress {...props} />} />
            <Route exact path='/view-address' render={(props: any) => <ViewAddress {...props} />} />
            <Route exact path='/list-card' render={(props: any) => <ListCard {...props} />} />
            <Route exact path='/add-card' render={(props: any) => <AddCard {...props} />} />
            <Route exact path='/edit-card' render={(props: any) => <AddCard {...props} />} />
            <Route exact path='/view-card' render={(props: any) => <ViewCard {...props} />} />
            <Route exact path='/change-password' render={(props: any) => <ChangePassword {...props} />} />
            <Route exact path='/resetpassword/:guid' render={(props: any) => <ResetPassword {...props} />} />
             {/* <Redirect from="/" to="/login" /> */}
          </React.Suspense>
        </Switch>
      </HashRouter>
    )
  }
}

export default Main;