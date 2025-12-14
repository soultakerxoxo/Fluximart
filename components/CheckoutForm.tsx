'use client'
import { useState } from 'react'

type Props = {
  image: { title: string; priceCents: number; previewUrl: string }
  pay: (formData: FormData) => Promise<void>
}

export default function CheckoutForm({ image, pay }: Props) {
  const [method, setMethod] = useState<'card' | 'paypal'>('card')
  return (
    <form action={pay} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <input type="hidden" name="method" value={method} />
      <div className="md:col-span-2 space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMethod('card')}
            className={`px-4 py-2 rounded-md ${method === 'card' ? 'bg-white/20' : 'border border-white/20'}`}
          >
            CREDIT / DEBIT CARD
          </button>
          <button
            type="button"
            onClick={() => setMethod('paypal')}
            className={`px-4 py-2 rounded-md ${method === 'paypal' ? 'bg-white/20' : 'border border-white/20'}`}
          >
            PayPal
          </button>
        </div>
        <div className="rounded-md border border-white/10 p-4">
          <div className="text-sm text-white/70 mb-3">All card information is fully encrypted, secure and protected</div>
          {method === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="card_name" className="px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="Name on Card" />
              <input name="card_number" className="px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="1234 5678 9012 3456" />
              <input name="expiry" className="px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="MM/YY" />
              <input name="cvc" className="px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="CVC" />
              <input name="billing_address" className="md:col-span-2 px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="Billing address" />
            </div>
          ) : (
            <div className="px-3 py-6 rounded-md bg-white/10 text-center">PayPal</div>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-md border border-white/10 p-4">
          <div className="font-medium mb-2">Order summary</div>
          <div className="text-sm text-white/70">{image.title}</div>
          <div className="text-2xl font-semibold mt-2">${(image.priceCents / 100).toFixed(2)}</div>
          <button className="mt-4 w-full px-4 py-2 rounded-md bg-brand text-black">
            {method === 'paypal' ? 'Continue to PayPal' : 'Complete checkout'}
          </button>
          <div className="text-xs text-white/60 mt-2">Taxes to be calculated</div>
        </div>
      </div>
    </form>
  )
}
