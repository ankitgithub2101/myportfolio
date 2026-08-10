import React, { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../api/axios";
import Swal from "sweetalert2";

function Contact() {
  const dispatch = useDispatch();

  // Contact form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    msg: "",
  });

  // Custom loader
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[a-zA-Z0-9.]+(?:.[a-zA-Z]{2,})+$/;

    return emailRegex.test(email);
  };

  // Mobile validation
  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;

    return mobileRegex.test(mobile);
  };

  // Submit contact form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate name
    if (!formData.name.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please enter your name",
      });
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      return Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Enter a valid email",
      });
    }

    // Validate mobile
    if (!validateMobile(formData.mobile)) {
      return Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Enter a valid 10-digit mobile number",
      });
    }

    // Validate message
    if (!formData.msg.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please enter your message",
      });
    }

    setLoading(true);

    try {
      // =====================================================
      // USING AXIOS
      // =====================================================

      const res = await api.post("/api/users/contact", formData);

      const data = res.data;

      if (data.success) {
        showToast("Message sent successfully!", "success");

        setFormData({
          name: "",
          email: "",
          mobile: "",
          msg: "",
        });
      } else {
        showToast(data.message || "Failed to send message.");
      }

      // =====================================================
      // OLD FETCH VERSION
      // =====================================================

      // const response = await fetch("http://localhost:5000/api/users/contact", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     mobile: formData.mobile,
      //     msg: formData.msg,
      //   }),
      // });

      // const data = await response.json();

      // if (data.success) {
      //   Swal.fire({
      //     icon: "success",
      //     title: "Message Sent!",
      //     text: "Message sent successfully. I will get back to you soon.",
      //     confirmButtonText: "OK",
      //   });

      //   setFormData({
      //     name: "",
      //     email: "",
      //     mobile: "",
      //     msg: "",
      //   });
      // } else {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Failed!",
      //     text: data.message || "Failed to send message.",
      //     confirmButtonText: "OK",
      //   });
      // }
    } catch (error) {
      console.error("Contact form error:", error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text:
          error.response?.data?.message ||
          "Unable to send message. Please try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              border: "4px solid rgba(255, 255, 255, 0.3)",
              borderTop: "4px solid #ffffff",
              borderRadius: "50%",
              animation: "contactLoaderSpin 0.8s linear infinite",
            }}
          ></div>

          <style>
            {`
        @keyframes contactLoaderSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}
          </style>
        </div>
      )}

      <section className="face face--contact-form">
        <p className="kicker">Contact — 8</p>

        <h1 className="face__title">Get In Touch</h1>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Mobile
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="10"
            />
          </label>

          <label>
            Message
            <textarea
              rows="4"
              name="msg"
              value={formData.msg}
              onChange={handleChange}
            ></textarea>
          </label>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </>
  );
}

export default Contact;
