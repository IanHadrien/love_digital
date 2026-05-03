import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  ExpressCheckoutElement,
  PaymentElement,
  useCheckout,
} from '@stripe/react-stripe-js/checkout';

const CheckoutForm = () => {
  const checkoutState = useCheckout();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!checkoutState || checkoutState.type !== 'success') return;
    if (!email.trim()) {
      setMessage('Informe seu e-mail para continuar.');
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const result = await checkoutState.checkout.confirm({
      email: email.trim(),
    });

    if (result.type === 'error') {
      setMessage(result.error.message ?? 'Nao foi possivel processar o pagamento.');
      setIsSubmitting(false);
      return;
    }

    // In successful flows Stripe may redirect; keep fallback feedback here.
    setMessage('Pagamento processado com sucesso.');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="seuemail@exemplo.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <ExpressCheckoutElement onConfirm={() => {}} />
      <PaymentElement />
      <button
        type="submit"
        disabled={!checkoutState || checkoutState.type !== 'success' || isSubmitting}
      >
        {isSubmitting ? 'Processando...' : 'Pagar agora'}
      </button>
      {message ? <p>{message}</p> : null}
    </form>
  );
};

export default CheckoutForm;