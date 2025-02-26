import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Button, Card, CardContent, Typography, Box, Stack } from "@mui/material";

export default function CheckoutForm() {
  const location = useLocation();
  const { totalPrice } = location.state || {}; // Get totalPrice from state if available
  const [form, setForm] = useState({ name: "", address: "", payment: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const WEB3FORMS_ACCESS_KEY = "f9b05731-abfe-4e9e-92b6-08b53b072e96";

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.payment) newErrors.payment = "Payment details are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("name", form.name);
      formData.append("address", form.address);
      formData.append("payment", form.payment);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (result.success) {
          setForm({ name: "", address: "", payment: "" });
          alert("Form submitted successfully!");
        } else {
          alert("Submission failed. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  // If totalPrice is not available, show a message and a button to go to the grocery page
  if (!totalPrice) {
    return (
      <Card sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3, boxShadow: 3, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No items bought.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/grocery")}
            sx={{ mt: 2 }}
          >
            Go to Grocery
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          Checkout Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              value={form.address}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
              fullWidth
            />
            <TextField
              label="Payment Details"
              name="payment"
              value={form.payment}
              onChange={handleInputChange}
              error={!!errors.payment}
              helperText={errors.payment}
              fullWidth
            />

            {/* Display Total Price as a disabled field */}
            <TextField
              label="Total Price"
              name="totalPrice"
              value={totalPrice.toFixed(2)}  // Display the totalPrice in the field
              disabled
              fullWidth
            />

            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button variant="contained" color="primary" type="submit" sx={{ flex: 1, mr: 1 }}>
                Complete Purchase
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate("/grocery")} sx={{ flex: 1, ml: 1 }}>
                Go to Home
              </Button>
            </Box>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
