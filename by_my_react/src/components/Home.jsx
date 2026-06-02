import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const categories = [
    { name: "Grocery", icon: "🥕" },
    { name: "Toys", icon: "🧸" },
    { name: "Mobiles", icon: "📱" },
    { name: "Offers", icon: "🔥" },
    { name: "Fashion", icon: "👕" },
    { name: "Profile", icon: "👤" }
  ];

  const handleClick = (category) => {
    switch (category) {
      case "Grocery":
        navigate("/product");
        break;

      case "Profile":
        navigate("/cart");
        break;

      default:
        alert(category + " clicked");
        break;
    }
  };

  return (
    <div className="home-container">

      <header className="home-header">
        <div className="logo">
          🛒 RETRO MART
        </div>

        <div className="welcome">
          Welcome to Retro Mart
        </div>
      </header>

      <div className="main-layout">

        <aside className="sidebar">

          <h2>Categories</h2>

          {categories.map((item, index) => (
            <button
              key={index}
              className="menu-btn"
              onClick={() => handleClick(item.name)}
            >
              <span>{item.icon}</span> {item.name}
            </button>
          ))}

        </aside>

        <section className="content">

          <h1>🛍️ Welcome to Retro Mart</h1>

          <p>
            One place for Grocery, Mobiles, Toys,
            Fashion and exciting Offers.
          </p>

        </section>

      </div>

    </div>
  );
}

export default Home;