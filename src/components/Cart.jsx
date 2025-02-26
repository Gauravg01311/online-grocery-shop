import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Sync cart state with localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  // Calculate total price using useMemo
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price, 0),
    [cart]
  );

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Your Cart
        </Typography>

        {cart.length === 0 && (
          <Typography
            variant="h6"
            color="textSecondary"
            align="center"
            sx={{ mt: 2 }}
          >
            Your cart is empty.
          </Typography>
        )}

        <Stack spacing={2} mt={2}>
          {cart.map((product) => (
            <Card
              key={product.id}
              sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 2 }}
            >
              <img
                src={product.image}
                alt={product.name}
                width={60}
                height={60}
                style={{ borderRadius: "8px" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1" fontWeight="bold">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeFromCart(product.id)}
                sx={{ minWidth: "80px", px: 1 }} // Reduced width
              >
                Remove
              </Button>+
              
            </Card>
          ))}
        </Stack>

        {/* Always Show Total Price, Even if Cart is Empty */}
        <Typography variant="h6" align="center" mt={3}>
          Total: ${totalPrice.toFixed(2)}
        </Typography>

        {/* Buttons Always Visible */}
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/grocery")}
            sx={{ flex: 1, mr: 1 }}
          >
            Continue Shopping
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/checkout", { state: { totalPrice } })}
            sx={{ flex: 1, ml: 1 }}
            disabled={cart.length === 0}
          >
            Checkout
          </Button>
        </Box>

        {/* Clear Cart Button (Hidden When Cart is Empty) */}
        {cart.length > 0 && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="outlined" color="secondary" onClick={clearCart}>
              Clear Cart
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
