function About() {
  return (
    <div>

      {/* Hero */}
      <section className="about-hero">

        <div className="about-hero-content">

          <p className="hero-badge">
            🍃 About FoodConnect
          </p>

          <h1>
            Connecting Surplus Food
            <br />
            With Communities
          </h1>

          <p>
            FoodConnect is a platform designed to help reduce
            food wastage by connecting food donors, receivers
            and volunteers through one simple system.
          </p>

        </div>

      </section>


      {/* Mission */}
      <section className="about-section">

        <div className="about-content">

          <h2>
            Our Mission
          </h2>

          <p>
            FoodConnect aims to create a simple digital platform
            where surplus food can be identified, shared and
            redistributed efficiently instead of being wasted.
          </p>

          <p>
            The platform brings together donors such as hostels,
            caterers and college canteens with receivers and
            volunteers who can help move food where it is needed.
          </p>

        </div>

      </section>


      {/* Roles */}
      <section className="about-section">

        <h2 className="section-title">
          How FoodConnect Connects People
        </h2>

        <p className="section-subtitle">
          Each user has a specific role in the redistribution process.
        </p>

        <div className="roles-grid">

          <div className="home-card">

            <div className="home-icon">
              🍱
            </div>

            <h3>
              Donor
            </h3>

            <p>
              Posts information about surplus food,
              including quantity, availability and pickup location.
            </p>

          </div>


          <div className="home-card">

            <div className="home-icon">
              🤝
            </div>

            <h3>
              Receiver
            </h3>

            <p>
              Discovers available food and submits
              claims for the quantities needed.
            </p>

          </div>


          <div className="home-card">

            <div className="home-icon">
              🚚
            </div>

            <h3>
              Volunteer
            </h3>

            <p>
              Accepts pickup requests and helps
              transport food from donors to receivers.
            </p>

          </div>


          <div className="home-card">

            <div className="home-icon">
              🛠️
            </div>

            <h3>
              Admin
            </h3>

            <p>
              Monitors platform activity, users,
              food listings, claims and pickups.
            </p>

          </div>

        </div>

      </section>


      {/* Process */}
      <section className="about-process">

        <h2>
          FoodConnect Process
        </h2>

        <div className="process-grid">

          <div>
            <span>01</span>
            <h3>Prevent</h3>
            <p>
              Use historical information to help
              understand food demand.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Rescue</h3>
            <p>
              List unavoidable surplus food on the platform.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Distribute</h3>
            <p>
              Connect claims with volunteers and pickups.
            </p>
          </div>

          <div>
            <span>04</span>
            <h3>Analyze</h3>
            <p>
              Track activity and measure platform impact.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="cta-section">

        <h2>
          Be Part of FoodConnect
        </h2>

        <p>
          Every successful connection can help make better use
          of surplus food.
        </p>

      </section>

    </div>
  );
}

export default About;