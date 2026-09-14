type OrderFailedProps = {
  onClose: () => void
}

const OrderFailed = ({ onClose }: OrderFailedProps) => {
  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600">
        ×
      </div>

      <div>
        <h2 className="font-primary text-2xl text-charcoal">Payment failed</h2>
        <p className="mt-2 font-secondary text-sm text-charcoal/70">
          Something went wrong while processing your payment. Please try again.
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-full rounded-md bg-terracotta px-4 py-3 font-primary text-lg text-cream transition hover:opacity-90"
      >
        Try Again
      </button>
    </div>
  )
}

export default OrderFailed
