// import ShoppingCart from '../components/ShoppingCart'
import PaymentMethod from '../components/PaymentMethod'
import OrderSummary from '../components/OrderSummary'
import ShippingAddress from '../components/ShippingAddress'
import BillingAddress from '../components/BillingAddress.jsx'

function CheckoutPage() {
    return (
      <div className='checkout-page'>
        <h1>CHECKOUT</h1>
        {/* <ShoppingCart /> */}
        <OrderSummary />
        <PaymentMethod />
        <BillingAddress />
        <ShippingAddress />
        <OrderSummary />

        <button>Submit Order</button>
      </div>
    );
  }
  
  export default CheckoutPage;
  