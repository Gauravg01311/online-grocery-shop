import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Select } from "./ui/Select";
import { SelectItem } from "./ui/SelectItem";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";
// import "./ProductCard.css";
// import CheckoutForm from "./CheckOutForm";  // Import the form

const products = [
  // Fruits
  {
    id: 1,
    name: "Apple",
    category: "Fruits",
    price: 1.5,
    rating: 4.5,
    image:
      "https://thumbs.dreamstime.com/b/red-apple-isolated-clipping-path-19130134.jpg",
  },
  {
    id: 6,
    name: "Banana",
    category: "Fruits",
    price: 0.6,
    rating: 4.4,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg",
  },
  {
    id: 7,
    name: "Orange",
    category: "Fruits",
    price: 1.2,
    rating: 4.6,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg",
  },

  // Dairy
  {
    id: 2,
    name: "Milk",
    category: "Dairy",
    price: 2.0,
    rating: 4.7,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwM-g9hikuZ1mb-t1UW4uRJnnQslu4zd-Dkw&s",
  },
  {
    id: 8,
    name: "Cheese",
    category: "Dairy",
    price: 3.5,
    rating: 4.5,
    image:
      "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt02cf680667522d24/66707e8470fb6fb1b0d72705/types-of-cheese-hero.jpg",
  },
  {
    id: 9,
    name: "Yogurt",
    category: "Dairy",
    price: 1.8,
    rating: 4.6,
    image:
      "https://www.allrecipes.com/thmb/TFYQ4bF-ynLfpQIjqyvxdXNOTgo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ar-fluffy-yogurt-2x1-7ea6ae3c360f4b6699ed4714835e120c.jpg",
  },

  // Bakery
  {
    id: 3,
    name: "Bread",
    category: "Bakery",
    price: 1.0,
    rating: 4.2,
    image: "https://thumbs.dreamstime.com/b/bread-cut-14027607.jpg",
  },
  {
    id: 10,
    name: "Croissant",
    category: "Bakery",
    price: 2.2,
    rating: 4.5,
    image:
      "https://media.istockphoto.com/id/147987270/photo/fresh-baked-croissants.jpg?s=612x612&w=0&k=20&c=7fEdqVxlvRK80hpGGEMGyw-_Cpi1ipb1D2rTim5yTuI=",
  },
  {
    id: 11,
    name: "Bagel",
    category: "Bakery",
    price: 1.5,
    rating: 4.3,
    image:
      "https://preppykitchen.com/wp-content/uploads/2023/01/Bagel-Recipe-Recipe-Card.jpg",
  },

  // Vegetables
  {
    id: 4,
    name: "Carrot",
    category: "Vegetables",
    price: 0.8,
    rating: 4.3,
    image:
      "https://media.istockphoto.com/id/1388403435/photo/fresh-carrots-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=XmrTb_nASc7d-4zVKUz0leeTT4fibDzWi_GpIun0Tlc=",
  },
  {
    id: 12,
    name: "Tomato",
    category: "Vegetables",
    price: 1.0,
    rating: 4.4,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
  },
  {
    id: 13,
    name: "Broccoli",
    category: "Vegetables",
    price: 2.5,
    rating: 4.5,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/03/Broccoli_and_cross_section_edit.jpg",
  },

  // Non-Veg
  {
    id: 5,
    name: "Egg",
    category: "Non-Veg",
    price: 2.0,
    rating: 4.3,
    image:
      "https://media.istockphoto.com/id/695954982/photo/wooden-bowl-of-raw-chicken-eggs.jpg?s=612x612&w=0&k=20&c=CmfnsbOPKGYfSCxq_hmLaq2BF8UXoGKFw19kkKWIMdo=",
  },
  {
    id: 14,
    name: "Chicken Breast",
    category: "Non-Veg",
    price: 5.0,
    rating: 4.6,
    image:
      "https://assets.tendercuts.in/product/C/H/594e4559-f6b7-417d-9aac-d0643b5711d3.jpg",
  },
  {
    id: 15,
    name: "Salmon",
    category: "Non-Veg",
    price: 8.0,
    rating: 4.7,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqjqAxhuRJEUWbhAfGqx7gm2GP8GZDWYT15w&s",
  },
];
export default function GroceryApp() {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("price");
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    updateCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sort === "price" ? a.price - b.price : b.rating - a.rating
  );

  // const handleCheckout = (formData) => {
  //   alert(`Checkout successful for ${formData.name}!`);
  // };

  return (
    <div className="p-4">
      <ResponsiveAppBar />
      <div className="flex flex-col mt-6 md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl ml-4 font-bold mb-4 md:mb-0">HarvestHub</h1>

        {/* Navigation Buttons */}
        <div className="ml-auto flex gap-4 flex-nowrap items-center justify-center mb-2">
          <Button
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={() => navigate("/cart")}
          >
            Go to Cart ({cart.length})
          </Button>
          <Button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/checkout", { state: { totalPrice } })}
          >
            Checkout (${totalPrice.toFixed(2)})
          </Button>
        </div>
      </div>

      {/* Filter & Sort Section */}
      <div className="flex gap-4 mb-4 items-center">
        <Select
          value={filter}
          onValueChange={setFilter}
          className="border p-2 rounded"
        >
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Fruits">Fruits</SelectItem>
          <SelectItem value="Dairy">Dairy</SelectItem>
          <SelectItem value="Bakery">Bakery</SelectItem>
          <SelectItem value="Vegetables">Vegetables</SelectItem>
          <SelectItem value="Non-Veg">Non-Veg</SelectItem>
        </Select>
        <Select
          value={sort}
          onValueChange={setSort}
          className="border p-2 rounded"
        >
          <SelectItem value="price">Price</SelectItem>
          <SelectItem value="rating">Rating</SelectItem>
        </Select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {sortedProducts.map((product) => (
          <Card
            key={product.id}
            className="p-4 product-card hover:scale-105 hover:shadow-lg transition-transform duration-300"
          >
            <CardContent className="p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <p className="text-lg font-semibold  mb-3">{product.name}</p>

              <p className="text-gray-600 text-sm mb-2">
                Category: {product.category}
              </p>
              <p className="text-green-700 font-bold text-base mb-2">
                Price: ${product.price.toFixed(2)}
              </p>
              <p className="text-yellow-500 font-medium text-sm mb-4">
                ⭐ {product.rating}
              </p>

              <Button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white w-full py-2 rounded-lg add-to-cart-button"
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
