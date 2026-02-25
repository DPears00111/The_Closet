import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { useCartStore } from "@/stores/cartStore";
import { formatZAR } from "@/lib/currency";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCartStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const shipping = subtotal() >= 1000 ? 0 : 100;
  const total = subtotal() + shipping;

  const handlePayNow = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowSuccess(true);
      clearCart();
    }, 2000);
  };

  if (items.length === 0 && !showSuccess) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-muted-foreground">Your bag is empty.</p>
          <Link
            to="/shop"
            className="text-primary hover:underline mt-2 inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 max-w-6xl">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-8 sm:mb-10">
          Checkout
        </h1>

        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 sm:py-20"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6">
                <Check
                  size={32}
                  strokeWidth={1.5}
                  className="text-primary-foreground"
                />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold mb-2">
                Payment Successful
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-8">
                Thank you for your order! You'll receive a confirmation email
                shortly.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-primary text-primary-foreground px-6 sm:px-8 py-2.5 sm:py-3 font-body text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-gold-dark transition-all"
              >
                Continue Shopping
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                {/* Shipping Form */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="font-heading text-lg sm:text-xl font-semibold mb-4">
                      Shipping Address
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <input
                        placeholder="First Name"
                        className="col-span-1 border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                      />
                      <input
                        placeholder="Last Name"
                        className="col-span-1 border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                      />
                      <input
                        placeholder="Street Address"
                        className="col-span-1 sm:col-span-2 border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                      />
                      <input
                        placeholder="City"
                        className="border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                      />
                      <input
                        placeholder="Province"
                        className="border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                      />
                      <input
                        placeholder="Postal Code"
                        className="border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                      />
                      <input
                        placeholder="Phone Number"
                        className="col-span-1 sm:col-span-2 border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Payment */}
                  <div>
                    <h2 className="font-heading text-lg sm:text-xl font-semibold mb-4">
                      Payment Method
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                      <div className="flex items-center gap-2 px-4 py-3 border border-primary rounded-sm bg-card">
                        <CreditCard
                          size={18}
                          strokeWidth={1.5}
                          className="text-primary flex-shrink-0"
                        />
                        <span className="text-sm font-medium">Card</span>
                      </div>
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 text-muted-foreground">
                        <span className="text-xs font-bold tracking-wider">
                          VISA
                        </span>
                        <span className="text-xs font-bold tracking-wider">
                          MC
                        </span>
                        <span className="text-xs font-bold tracking-wider">
                          PayPal
                        </span>
                        <span className="text-xs font-bold tracking-wider">
                          G Pay
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <input
                        placeholder="Card Number"
                        className="w-full border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                      />
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <input
                          placeholder="MM / YY"
                          className="border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                        />
                        <input
                          placeholder="CVC"
                          className="border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-card p-4 sm:p-6 rounded-sm lg:sticky lg:top-24">
                    <h2 className="font-heading text-lg font-semibold mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div
                          key={`${item.productId}-${item.size}-${item.color}`}
                          className="flex justify-between text-xs sm:text-sm gap-2"
                        >
                          <span className="text-muted-foreground truncate">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="flex-shrink-0 font-medium">
                            {formatZAR(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border pt-2 sm:pt-3 space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">
                          {formatZAR(subtotal())}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">
                          {shipping === 0 ? "Free" : formatZAR(shipping)}
                        </span>
                      </div>
                      <div className="flex justify-between font-heading text-base sm:text-lg font-semibold pt-1 sm:pt-2 border-t border-border">
                        <span>Total</span>
                        <span>{formatZAR(total)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                      All prices include 15% VAT
                    </p>

                    <button
                      onClick={handlePayNow}
                      disabled={processing}
                      className="w-full py-2.5 sm:py-3.5 bg-primary text-primary-foreground font-body text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all hover:bg-gold-dark disabled:opacity-60"
                    >
                      {processing ? "Processing..." : `Pay ${formatZAR(total)}`}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Checkout;
