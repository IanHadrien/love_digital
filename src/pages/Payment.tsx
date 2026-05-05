import { CheckoutElementsProvider } from '@stripe/react-stripe-js/checkout';
import {loadStripe} from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import CheckoutForm from '@/components/CheckoutForm';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim();

if (!stripePublishableKey) {
  throw new Error('Defina VITE_STRIPE_PUBLISHABLE_KEY no arquivo .env');
}
if (!API_BASE_URL) {
  throw new Error('Defina VITE_API_BASE_URL no arquivo .env');
}

const stripePromise = loadStripe(stripePublishableKey);

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClientSecret = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart: [
              {
                name: 'Plano Love Digital',
                price: 19.9,
                qty: 1,
              },
            ],
          }),
        });

        if (!response.ok) {
          throw new Error(`Falha ao criar sessao de checkout (${response.status}).`);
        }

        const data = await response.json();

        if (!data?.clientSecret) {
          throw new Error('Resposta invalida do backend: clientSecret ausente.');
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro inesperado no checkout.';
        setError(message);
      }
    };

    loadClientSecret();
  }, []);

  return (
    <div className="mx-auto w-full max-w-xl space-y-8 text-left py-12">
      <header className="space-y-1 border-b border-border pb-6">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Pagamentos
        </h1>
        <p className="text-sm text-muted-foreground">
          Revise os dados e finalize o pagamento com segurança.
        </p>
      </header>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      {!clientSecret && !error ? (
        <p className="text-sm text-muted-foreground">Carregando checkout...</p>
      ) : null}

      {clientSecret ? (
        <CheckoutElementsProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <CheckoutForm />
        </CheckoutElementsProvider>
      ) : null}
    </div>
  );
};

export default PaymentPage;