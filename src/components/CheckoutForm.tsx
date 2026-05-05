import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  ExpressCheckoutElement,
  PaymentElement,
  useCheckout,
} from '@stripe/react-stripe-js/checkout';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type LineItem = {
  id: string;
  name: string;
  priceLabel: string;
  thumbnailUrl: string;
  qty: number;
  tax: string;
};

const createId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `line-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const CheckoutForm = () => {
  const checkoutState = useCheckout();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [lines, setLines] = useState<LineItem[]>(() => [
    {
      id: createId(),
      name: 'Plano Love Digital',
      priceLabel: 'R$ 19,90',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=120&h=120&fit=crop',
      qty: 1,
      tax: '0',
    },
  ]);

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

    setMessage('Pagamento processado com sucesso.');
    setIsSubmitting(false);
  };

  const updateLine = (id: string, patch: Partial<LineItem>) => {
    setLines((prev) => prev.map((line) => (line.id === id ? { ...line, ...patch } : line)));
  };

  const fieldShell = 'rounded-xl border border-border bg-background';

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl space-y-8 text-left font-body"
    >
      <section className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="client-name">Nome</Label>
          <Input
            id="client-name"
            type="text"
            autoComplete="name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Seu nome"
            className={cn(fieldShell, 'h-11 border px-3')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client-email">
            E-mail <span className="text-destructive">*</span>
          </Label>
          <Input
            id="client-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seuemail@exemplo.com"
            className={cn(fieldShell, 'h-11 border px-3')}
          />
        </div>
      </section>

      <Separator className="bg-border" />

      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
          Produto
        </h2>

        <div className="grid grid-cols-[1fr_auto_auto] items-end gap-2 text-xs font-medium text-muted-foreground sm:grid-cols-[minmax(0,1fr)_5.5rem_5.5rem_auto] sm:gap-3">
          <span>Item</span>
          <span className="text-center sm:text-left">
            Qtd <span className="text-destructive">*</span>
          </span>
        </div>

        <ul className="space-y-3">
          {lines.map((line) => (
            <li
              key={line.id}
              className={cn(
                fieldShell,
                'grid grid-cols-1 gap-3 p-3 sm:grid-cols-[minmax(0,1fr)_5.5rem_5.5rem_auto] sm:items-center sm:gap-3 sm:p-3.5'
              )}
            >
              <div className="flex min-w-0 items-start gap-3">
                <img
                  src={line.thumbnailUrl}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-lg border border-border object-cover"
                />
                <div className="min-w-0 space-y-0.5">
                  <Input
                    value={line.name}
                    onChange={(e) => updateLine(line.id, { name: e.target.value })}
                    className="h-auto border-0 bg-transparent p-0 text-sm font-medium shadow-none focus-visible:ring-0"
                  />
                  <p className="text-xs text-muted-foreground">{line.priceLabel}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:justify-center">
                <Label htmlFor={`qty-${line.id}`} className="sr-only">
                  Quantidade
                </Label>
                <Input
                  id={`qty-${line.id}`}
                  type="number"
                  min={1}
                  value={line.qty}
                  onChange={(e) =>
                    updateLine(line.id, { qty: Math.max(1, Number(e.target.value) || 1) })
                  }
                  className={cn(fieldShell, 'h-9 w-full border px-2 text-center text-sm sm:w-14')}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Separator className="bg-border" />

      <section className="space-y-4">
        <ExpressCheckoutElement onConfirm={() => {}} />
        <div className={cn(fieldShell, 'overflow-hidden p-4')}>
          <PaymentElement />
        </div>
        <Button
          type="submit"
          className="h-11 w-full rounded-xl font-medium"
          disabled={!checkoutState || checkoutState.type !== 'success' || isSubmitting}
        >
          {isSubmitting ? 'Processando...' : 'Pagar agora'}
        </Button>
        {message ? (
          <p className="text-center text-sm text-muted-foreground" role="status">
            {message}
          </p>
        ) : null}
      </section>
    </form>
  );
};

export default CheckoutForm;
