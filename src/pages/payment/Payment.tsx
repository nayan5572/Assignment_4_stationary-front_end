
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51NYRyfKTzmdU21JYmYlQ3VYe2clSCUfGBAcwtmK3UsLaIK48eCxuM749imCD4UCsJMuQtRY1YoUmhAIUKRqRT46c007ivjL7C7');

const Payment = () => (
  <div className="min-h-screen bg-[#F9F9FB] flex items-center justify-center">
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default Payment;
