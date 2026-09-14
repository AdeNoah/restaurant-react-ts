type OrderSuccessProps = {
  onClose: () => void
}

const OrderSuccess = ({ onClose }: OrderSuccessProps) => {
  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
        ✓
      </div>

      <div>
        <h2 className="font-primary text-2xl text-charcoal">Order placed successfully</h2>
        <p className="mt-2 font-secondary text-sm text-charcoal/70">
          Your payment has been confirmed and your meal is being prepared.
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-full rounded-md bg-terracotta px-4 py-3 font-primary text-lg text-cream transition hover:opacity-90"
      >
        Done
      </button>
    </div>
  )
}

export default OrderSuccess
