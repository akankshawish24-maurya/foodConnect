
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-badge">
            🍃 Together Against Food Waste
          </p>

          <h1>
            Reduce Food Waste.
            <br />
            Share More. Help More.
          </h1>

          <p className="hero-description">
            FoodConnect helps donors, receivers and volunteers
            work together to rescue surplus food and deliver it
            to people who need it.
          </p>

          <div className="hero-buttons">

            <Link to="/register">
              <button className="btn btn-primary">
                Get Started
              </button>
            </Link>

            <Link to="/about">
              <button className="btn btn-secondary">
                Learn More
              </button>
            </Link>

          </div>

        </div>

      </section>


      {/* How It Works */}
      <section className="home-section">

        <h2 className="section-title">
          How FoodConnect Works
        </h2>

        <p className="section-subtitle">
          A simple process that connects surplus food with people
          and organizations who can use it.
        </p>


        <div className="steps-grid">

          <div className="home-card">
            <div className="home-icon">
              🍱
            </div>

            <h3>
              1. Post Food
            </h3>

            <p>
              Donors post surplus food with quantity,
              location and availability details.
            </p>
          </div>


          <div className="home-card">
            <div className="home-icon">
              🤝
            </div>

            <h3>
              2. Claim Food
            </h3>

            <p>
              Receivers can discover available food
              and submit a claim.
            </p>
          </div>


          <div className="home-card">
            <div className="home-icon">
              🚚
            </div>

            <h3>
              3. Pickup & Deliver
            </h3>

            <p>
              Volunteers accept pickup requests and
              help transport the food.
            </p>
          </div>


          <div className="home-card">
            <div className="home-icon">
              🌱
            </div>

            <h3>
              4. Reduce Waste
            </h3>

            <p>
              Successful deliveries help keep surplus
              food out of the waste stream.
            </p>
          </div>

        </div>

      </section>


      {/* Impact Section */}
      <section className="impact-section">

        <h2>
          Our Impact
        </h2>

        <div className="impact-grid">

          <div>
            <h3>🍽️</h3>
            <strong>Meals Rescued</strong>
            <p>Help reduce unnecessary food waste.</p>
          </div>

          <div>
            <h3>🤝</h3>
            <strong>Community</strong>
            <p>Connect donors, receivers and volunteers.</p>
          </div>

          <div>
            <h3>🌱</h3>
            <strong>Sustainability</strong>
            <p>Track meaningful redistribution activity.</p>
          </div>

        </div>

      </section>


      {/* Call to Action */}
      <section className="cta-section">

        <h2>
          Have surplus food?
        </h2>

        <p>
          Turn extra food into a meaningful contribution.
        </p>

        <Link to="/register">
          <button className="btn btn-primary">
            Join FoodConnect
          </button>
        </Link>

      </section>

    </div>
  );
}

export default Home;