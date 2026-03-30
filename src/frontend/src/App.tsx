import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitMessage } from "@/hooks/useQueries";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Clock,
  Droplets,
  Facebook,
  FileText,
  Inbox,
  Instagram,
  Loader2,
  MapPin,
  PartyPopper,
  PenLine,
  Phone,
  Plus,
  Scissors,
  Send,
  ShoppingBag,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiPinterest, SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

const categories = [
  {
    name: "Stationery",
    icon: PenLine,
    color: "bg-blue-100",
    iconColor: "text-blue-700",
    description: "Pens, pencils, rulers, scissors & everyday writing tools",
    image: "/assets/generated/category-stationery.dim_600x440.jpg",
    products: [
      {
        id: "sta-1",
        name: "Blue Ballpoint Pen",
        price: 10,
        image: "/assets/generated/product-sta-1-blue-pen.dim_400x400.jpg",
      },
      {
        id: "sta-2",
        name: "HB Pencil Set (12 pcs)",
        price: 45,
        image: "/assets/generated/product-sta-2-pencil-set.dim_400x400.jpg",
      },
      {
        id: "sta-3",
        name: "30cm Ruler",
        price: 20,
        image: "/assets/generated/product-sta-3-ruler.dim_400x400.jpg",
      },
      {
        id: "sta-4",
        name: "Scissors (Medium)",
        price: 55,
        image: "/assets/generated/product-sta-4-scissors.dim_400x400.jpg",
      },
    ] as Product[],
  },
  {
    name: "All Papers",
    icon: FileText,
    color: "bg-yellow-100",
    iconColor: "text-yellow-700",
    description: "A4, craft paper, chart paper, tissue & specialty sheets",
    image: "/assets/generated/category-papers.dim_600x440.jpg",
    products: [
      {
        id: "pap-1",
        name: "A4 Paper Ream (500 sheets)",
        price: 250,
        image: "/assets/generated/product-pap-1-a4-ream.dim_400x400.jpg",
      },
      {
        id: "pap-2",
        name: "Colour Chart Paper (10 sheets)",
        price: 30,
        image: "/assets/generated/product-pap-2-chart-paper.dim_400x400.jpg",
      },
      {
        id: "pap-3",
        name: "Craft Paper Roll",
        price: 80,
        image: "/assets/generated/product-pap-3-craft-roll.dim_400x400.jpg",
      },
      {
        id: "pap-4",
        name: "Tissue Paper Pack",
        price: 40,
        image: "/assets/generated/product-pap-4-tissue-paper.dim_400x400.jpg",
      },
    ] as Product[],
  },
  {
    name: "Types of Glues",
    icon: Droplets,
    color: "bg-orange-100",
    iconColor: "text-orange-700",
    description: "Fevicol, glue sticks, hot glue, fabric glue & more",
    image: "/assets/generated/category-glues.dim_600x440.jpg",
    products: [
      {
        id: "glu-1",
        name: "Fevicol (200 ml)",
        price: 60,
        image: "/assets/generated/product-glu-1-fevicol.dim_400x400.jpg",
      },
      {
        id: "glu-2",
        name: "Glue Stick (Large)",
        price: 25,
        image: "/assets/generated/product-glu-2-glue-stick.dim_400x400.jpg",
      },
      {
        id: "glu-3",
        name: "Hot Glue Sticks (20 pcs)",
        price: 50,
        image: "/assets/generated/product-glu-3-hot-glue.dim_400x400.jpg",
      },
      {
        id: "glu-4",
        name: "Fabric Glue Tube",
        price: 70,
        image: "/assets/generated/product-glu-4-fabric-glue.dim_400x400.jpg",
      },
    ] as Product[],
  },
  {
    name: "Crafting Materials",
    icon: Scissors,
    color: "bg-purple-100",
    iconColor: "text-purple-700",
    description: "Ribbons, foam sheets, glitter, washi tape & tools",
    image: "/assets/generated/category-crafting.dim_600x440.jpg",
    products: [
      {
        id: "cra-1",
        name: "Satin Ribbon Roll (5 m)",
        price: 35,
        image: "/assets/generated/product-cra-1-ribbon.dim_400x400.jpg",
      },
      {
        id: "cra-2",
        name: "Foam Sheets Pack (10 pcs)",
        price: 60,
        image: "/assets/generated/product-cra-2-foam-sheets.dim_400x400.jpg",
      },
      {
        id: "cra-3",
        name: "Glitter Shaker Set (6 colours)",
        price: 90,
        image: "/assets/generated/product-cra-3-glitter.dim_400x400.jpg",
      },
      {
        id: "cra-4",
        name: "Washi Tape (3-pack)",
        price: 75,
        image: "/assets/generated/product-cra-4-washi-tape.dim_400x400.jpg",
      },
    ] as Product[],
  },
  {
    name: "Birthday Items",
    icon: PartyPopper,
    color: "bg-pink-100",
    iconColor: "text-pink-700",
    description: "Balloons, banners, candles, party sets & decorations",
    image: "/assets/generated/category-birthday.dim_600x440.jpg",
    products: [
      {
        id: "bdy-1",
        name: "Balloon Pack (30 pcs)",
        price: 50,
        image: "/assets/generated/product-bdy-1-balloons.dim_400x400.jpg",
      },
      {
        id: "bdy-2",
        name: "Happy Birthday Banner",
        price: 40,
        image: "/assets/generated/product-bdy-2-banner.dim_400x400.jpg",
      },
      {
        id: "bdy-3",
        name: "Birthday Candles Set",
        price: 30,
        image: "/assets/generated/product-bdy-3-candles.dim_400x400.jpg",
      },
      {
        id: "bdy-4",
        name: "Party Confetti Pouch",
        price: 25,
        image: "/assets/generated/product-bdy-4-confetti.dim_400x400.jpg",
      },
    ] as Product[],
  },
  {
    name: "Paper Bags",
    icon: ShoppingBag,
    color: "bg-green-100",
    iconColor: "text-green-700",
    description: "Gift bags, kraft bags, printed & plain carry bags",
    image: "/assets/generated/category-paperbags.dim_600x440.jpg",
    products: [
      {
        id: "bag-1",
        name: "Kraft Gift Bag (Medium)",
        price: 20,
        image: "/assets/generated/product-bag-1-kraft-bag.dim_400x400.jpg",
      },
      {
        id: "bag-2",
        name: "Printed Carry Bag (Pack of 5)",
        price: 45,
        image: "/assets/generated/product-bag-2-printed-bag.dim_400x400.jpg",
      },
      {
        id: "bag-3",
        name: "Luxury Gift Bag (Large)",
        price: 60,
        image: "/assets/generated/product-bag-3-luxury-bag.dim_400x400.jpg",
      },
      {
        id: "bag-4",
        name: "Plain White Paper Bag (10 pcs)",
        price: 35,
        image: "/assets/generated/product-bag-4-white-bag.dim_400x400.jpg",
      },
    ] as Product[],
  },
  {
    name: "Baskets",
    icon: Inbox,
    color: "bg-amber-100",
    iconColor: "text-amber-700",
    description: "Decorative, gifting & storage baskets in various sizes",
    image: "/assets/generated/category-baskets.dim_600x440.jpg",
    products: [
      {
        id: "bas-1",
        name: "Small Gift Basket",
        price: 120,
        image: "/assets/generated/product-bas-1-small-basket.dim_400x400.jpg",
      },
      {
        id: "bas-2",
        name: "Medium Wicker Basket",
        price: 180,
        image: "/assets/generated/product-bas-2-wicker-basket.dim_400x400.jpg",
      },
      {
        id: "bas-3",
        name: "Storage Basket (Round)",
        price: 220,
        image: "/assets/generated/product-bas-3-storage-basket.dim_400x400.jpg",
      },
      {
        id: "bas-4",
        name: "Decorative Woven Tray",
        price: 150,
        image: "/assets/generated/product-bas-4-woven-tray.dim_400x400.jpg",
      },
    ] as Product[],
  },
  {
    name: "MDF Boxes",
    icon: Box,
    color: "bg-rose-100",
    iconColor: "text-rose-700",
    description: "Wooden MDF gift boxes, keepsake boxes & decorative sets",
    image: "/assets/generated/category-mdfboxes.dim_600x440.jpg",
    products: [
      {
        id: "mdf-1",
        name: "Square MDF Gift Box (Small)",
        price: 95,
        image: "/assets/generated/product-mdf-1-square-box.dim_400x400.jpg",
      },
      {
        id: "mdf-2",
        name: "Rectangle Keepsake Box",
        price: 140,
        image: "/assets/generated/product-mdf-2-rectangle-box.dim_400x400.jpg",
      },
      {
        id: "mdf-3",
        name: "Heart-Shaped MDF Box",
        price: 110,
        image: "/assets/generated/product-mdf-3-heart-box.dim_400x400.jpg",
      },
      {
        id: "mdf-4",
        name: "MDF Decorative Tray",
        price: 175,
        image: "/assets/generated/product-mdf-4-mdf-tray.dim_400x400.jpg",
      },
    ] as Product[],
  },
];

const navLinks = [
  "Home",
  "Shop All",
  "Bestsellers",
  "Local Goods",
  "About Us",
  "Contact",
];

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("home");
  const submitMessage = useSubmitMessage();

  const activeCat = categories.find((c) => c.name === currentPage) ?? null;

  function navigateTo(page: string) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFormChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitMessage.mutateAsync(formData);
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  }

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast.success("You're subscribed! Thanks for joining.");
    setNewsletterEmail("");
  }

  function addToCart(product: Product, categoryName: string) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          category: categoryName,
        },
      ];
    });
    toast.success(`${product.name} added to cart!`);
  }

  function removeFromCart(id: string) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const currentYear = new Date().getFullYear();

  // Shared header component render
  const header = (
    <header className="bg-parchment-header border-b border-border shadow-xs sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => navigateTo("home")}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          aria-label="Go to home page"
        >
          <div className="w-9 h-9 rounded-lg bg-forest flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-serif font-bold text-sm leading-tight text-foreground">
              Lucky Paper
            </p>
            <p className="text-[11px] text-muted-foreground leading-tight">
              & Stationery Mart
            </p>
          </div>
        </button>

        {/* Nav — only on home */}
        {currentPage === "home" && (
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                data-ocid={`nav.${link.toLowerCase().replace(" ", "-")}.link`}
                className="text-[13px] text-foreground/70 hover:text-foreground transition-colors font-sans"
              >
                {link}
              </a>
            ))}
          </nav>
        )}

        {/* Back button on category pages */}
        {currentPage !== "home" && (
          <button
            type="button"
            onClick={() => navigateTo("home")}
            data-ocid="category.back_button"
            className="hidden md:flex items-center gap-2 text-sm text-forest font-semibold hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            All Categories
          </button>
        )}

        {/* Cart */}
        <button
          type="button"
          data-ocid="cart.open_modal_button"
          aria-label={`Shopping cart${cartCount > 0 ? ` — ${cartCount} items` : ""}`}
          onClick={() => setCartOpen(true)}
          className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
        >
          <ShoppingCart className="w-5 h-5 text-foreground/70" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-forest text-white text-[10px] font-bold flex items-center justify-center leading-none">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );

  // Shared floating WhatsApp
  const whatsapp = (
    <a
      href="https://wa.me/919890090481"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-ocid="whatsapp.button"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 px-4 py-3"
    >
      <SiWhatsapp className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );

  // Cart sheet (shared)
  const cartSheet = (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0"
        data-ocid="cart.sheet"
      >
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-serif text-xl flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart
            {cartCount > 0 && (
              <span className="ml-auto text-sm font-normal text-muted-foreground">
                {cartCount} item{cartCount !== 1 ? "s" : ""}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div
            data-ocid="cart.empty_state"
            className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-parchment flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-foreground mb-1">
                Your cart is empty
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Browse our categories and tap <strong>+ Add</strong> to add
                items here for reference.
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => setCartOpen(false)}
            >
              Browse Categories
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <ul className="space-y-3">
                {cartItems.map((item, idx) => (
                  <li
                    key={item.id}
                    data-ocid={`cart.item.${idx + 1}`}
                    className="flex items-center gap-3 bg-card rounded-xl px-4 py-3 shadow-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.category}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          ₹{item.price} × {item.quantity}
                        </span>
                        <span className="text-xs font-bold text-foreground">
                          = ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      data-ocid={`cart.delete_button.${idx + 1}`}
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeFromCart(item.id)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <div className="px-6 py-5 border-t border-border space-y-3">
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-semibold text-foreground">
                  Subtotal
                </span>
                <span className="font-serif text-xl font-bold text-forest">
                  ₹{cartSubtotal}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                This is a reference list only. Visit our shop or call us to
                place your order.
              </p>
              <a
                href="tel:9890090481"
                data-ocid="cart.primary_button"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "oklch(0.42 0.09 150)" }}
              >
                <Phone className="w-4 h-4" />
                Call to Order — 9890090481
              </a>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );

  // ── CATEGORY PAGE ─────────────────────────────────────────────────────────
  if (activeCat) {
    return (
      <div className="min-h-screen bg-parchment">
        <Toaster richColors position="top-right" />
        {whatsapp}
        {cartSheet}
        {header}

        {/* Category header */}
        <div className="relative h-52 md:h-64 overflow-hidden">
          <img
            src={activeCat.image}
            alt={activeCat.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6 max-w-6xl mx-auto">
            <button
              type="button"
              onClick={() => navigateTo("home")}
              data-ocid="category.back_button"
              className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold mb-3 w-fit transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Categories
            </button>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full ${activeCat.color} flex items-center justify-center shadow-md flex-shrink-0`}
              >
                <activeCat.icon className={`w-5 h-5 ${activeCat.iconColor}`} />
              </div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
                  {activeCat.name}
                </h1>
                <p className="text-white/80 text-sm mt-0.5">
                  {activeCat.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products grid */}
        <main className="max-w-6xl mx-auto px-4 py-10">
          <p className="text-muted-foreground text-sm mb-6">
            {activeCat.products.length} products
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {activeCat.products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                data-ocid={`products.item.${idx + 1}`}
                className="bg-card rounded-2xl overflow-hidden shadow-card flex flex-col"
              >
                {/* Square image */}
                <div className="aspect-square overflow-hidden bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Info */}
                <div className="p-3 flex flex-col flex-1 gap-1">
                  <p className="font-serif font-medium text-sm md:text-base text-foreground leading-snug line-clamp-2">
                    {product.name}
                  </p>
                  <p className="font-bold text-base md:text-lg text-forest mt-auto pt-1">
                    ₹{product.price}
                  </p>
                  <button
                    type="button"
                    onClick={() => addToCart(product, activeCat.name)}
                    data-ocid={`products.add_button.${idx + 1}`}
                    aria-label={`Add ${product.name} to cart`}
                    className="mt-2 w-full flex items-center justify-center gap-1.5 py-2.5 min-h-11 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: "oklch(0.42 0.09 150)" }}
                  >
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // ── HOME PAGE ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-parchment">
      <Toaster richColors position="top-right" />
      {whatsapp}
      {cartSheet}
      {header}

      {/* Hero */}
      <section
        id="home"
        className="relative min-h-[520px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-stationery.dim_1400x600.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-4xl md:text-5xl lg:text-[54px] font-bold leading-tight mb-4"
            style={{ color: "oklch(0.965 0.015 80)" }}
          >
            Your Home for Thoughtful Tools
            <span className="block"> & Crafted Goods.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-base md:text-lg mb-8 leading-relaxed"
            style={{ color: "oklch(0.88 0.02 75)" }}
          >
            Discover our curated collection of premium stationery, art supplies,
            and thoughtful gifts — lovingly sourced for every creative spirit.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="#shop-all"
              data-ocid="hero.primary_button"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "oklch(0.765 0.08 55)",
                color: "oklch(0.195 0.03 55)",
              }}
            >
              Shop Bestsellers
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section id="shop-all" className="py-16 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Tap a category to see all products with images and prices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              type="button"
              onClick={() => navigateTo(cat.name)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-ocid={`categories.item.${i + 1}`}
              className="block w-full text-left rounded-xl overflow-hidden shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer bg-card focus-visible:outline-2 focus-visible:outline-forest"
            >
              {/* Image tile */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div
                  className={`absolute bottom-2 right-2 w-8 h-8 rounded-full ${cat.color} flex items-center justify-center shadow-sm`}
                >
                  <cat.icon className={`w-4 h-4 ${cat.iconColor}`} />
                </div>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-semibold text-base text-foreground">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {cat.description}
                  </p>
                </div>
                <ArrowRight className="ml-2 flex-shrink-0 w-4 h-4 text-forest" />
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Visit + Contact */}
      <section id="contact" className="py-16 px-6 bg-parchment-header">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl font-bold text-center mb-10"
          >
            Come Say Hello
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visit */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="bg-card rounded-2xl p-8 shadow-card"
            >
              <h3 className="font-serif text-2xl font-bold mb-6 text-foreground">
                Visit Our Shop
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-forest mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Our Address</p>
                    <p className="text-muted-foreground">
                      1609 New Shukrawar Peth, Bori Ali, Pune, Maharashtra
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-forest mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Opening Hours
                    </p>
                    <p className="text-muted-foreground">
                      Mon – Sat: 10:00am – 8:00pm
                    </p>
                    <p className="text-muted-foreground">
                      Sunday: 11:00am – 2:00pm
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-forest mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <a
                      href="tel:9890090481"
                      className="text-muted-foreground hover:text-forest transition-colors"
                    >
                      9890090481
                    </a>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <form
                onSubmit={handleContactSubmit}
                data-ocid="contact.modal"
                className="rounded-2xl p-8 shadow-card"
                style={{ backgroundColor: "oklch(0.895 0.045 60)" }}
              >
                <h3 className="font-serif text-2xl font-bold mb-6 text-foreground">
                  Get In Touch
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="contact-name"
                      className="text-sm font-medium text-foreground mb-1 block"
                    >
                      Your Name
                    </Label>
                    <Input
                      id="contact-name"
                      data-ocid="contact.input"
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      className="bg-background/70 border-peach/40 focus:border-forest"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contact-email"
                      className="text-sm font-medium text-foreground mb-1 block"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="contact-email"
                      data-ocid="contact.input"
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleFormChange("email", e.target.value)
                      }
                      className="bg-background/70 border-peach/40 focus:border-forest"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contact-message"
                      className="text-sm font-medium text-foreground mb-1 block"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="contact-message"
                      data-ocid="contact.textarea"
                      placeholder="Tell us how we can help..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        handleFormChange("message", e.target.value)
                      }
                      className="bg-background/70 border-peach/40 focus:border-forest resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    data-ocid="contact.submit_button"
                    disabled={submitMessage.isPending}
                    className="w-full bg-forest hover:bg-forest-light text-white font-semibold transition-all"
                  >
                    {submitMessage.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                  {submitMessage.isSuccess && (
                    <p
                      data-ocid="contact.success_state"
                      className="text-center text-sm text-forest font-medium"
                    >
                      ✓ Message received! We'll be in touch shortly.
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-parchment-dark pt-14 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <p className="font-serif font-bold text-foreground">
                  Lucky Paper & Stationery Mart
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your neighborhood stationery destination. Curated goods for
                writers, artists, and curious minds.
              </p>
            </div>

            {/* Quick links + hours */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-serif font-semibold text-sm mb-3 text-foreground">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {[
                    "Home",
                    "Shop All",
                    "Bestsellers",
                    "About Us",
                    "Contact",
                  ].map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase().replace(" ", "-")}`}
                        data-ocid={`footer.${link.toLowerCase().replace(" ", "-")}.link`}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-serif font-semibold text-sm mb-3 text-foreground">
                  Store Hours
                </h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>Mon – Sat: 10am – 8pm</li>
                  <li>Sunday: 11am – 2pm</li>
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-serif font-semibold text-sm mb-3 text-foreground">
                Stay in the Loop
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Get updates on new arrivals and special offers.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  data-ocid="newsletter.input"
                  placeholder="Your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-background/60 border-border text-sm flex-1"
                  required
                />
                <button
                  type="submit"
                  data-ocid="newsletter.submit_button"
                  aria-label="Subscribe to newsletter"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0 transition-colors hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.42 0.09 150)" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Lucky Paper & Stationery Mart. Built with{" "}
              <span aria-label="love">♥</span> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.facebook.link"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-forest transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.instagram.link"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-forest transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.pinterest.link"
                aria-label="Pinterest"
                className="text-muted-foreground hover:text-forest transition-colors"
              >
                <SiPinterest className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
