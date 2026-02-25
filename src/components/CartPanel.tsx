import { useCartStore } from "@/stores/cartStore";
import { formatZAR } from "@/lib/currency";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CartPanel = () => {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, subtotal } =
    useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-foreground/30"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md sm:max-w-lg bg-background shadow-2xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-4 sm:px-6 py-3 sm:py-4">
                <h2 className="font-heading text-base sm:text-lg font-semibold">
                  Your Bag
                </h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-foreground/60 hover:text-foreground transition-colors p-1"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 sm:gap-4 text-muted-foreground">
                    <ShoppingBag size={40} strokeWidth={1} />
                    <p className="text-xs sm:text-sm">Your bag is empty</p>
                    <Link
                      to="/shop"
                      onClick={() => setCartOpen(false)}
                      className="text-xs sm:text-sm font-medium text-primary hover:underline"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 sm:gap-4">
                    {items.map((item) => (
                      <div
                        key={`${item.productId}-${item.size}-${item.color}`}
                        className="flex gap-3 border-b border-border pb-3 sm:pb-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-16 sm:h-24 sm:w-20 object-cover rounded-sm flex-shrink-0"
                        />
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <h3 className="font-body text-xs sm:text-sm font-medium truncate">
                              {item.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                              {item.size} / {item.color}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.size,
                                    item.color,
                                    item.quantity - 1,
                                  )
                                }
                                className="h-5 w-5 flex items-center justify-center border border-border rounded-sm hover:border-primary transition-colors flex-shrink-0"
                              >
                                <Minus size={10} strokeWidth={1.5} />
                              </button>
                              <span className="text-xs font-medium w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.size,
                                    item.color,
                                    item.quantity + 1,
                                  )
                                }
                                className="h-5 w-5 flex items-center justify-center border border-border rounded-sm hover:border-primary transition-colors flex-shrink-0"
                              >
                                <Plus size={10} strokeWidth={1.5} />
                              </button>
                            </div>
                            <p className="text-xs sm:text-sm font-semibold flex-shrink-0">
                              {formatZAR(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            removeItem(item.productId, item.size, item.color)
                          }
                          className="text-muted-foreground hover:text-foreground self-start flex-shrink-0 p-1"
                        >
                          <X size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-border px-4 sm:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Subtotal
                    </span>
                    <span className="font-heading text-base sm:text-lg font-semibold">
                      {formatZAR(subtotal())}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All prices include 15% VAT
                  </p>
                  <Link
                    to="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="block w-full text-center py-2.5 sm:py-3 bg-primary text-primary-foreground font-body text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all hover:bg-gold-dark"
                  >
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPanel;
