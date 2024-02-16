export default function About() {
  return (
    <div className="mb-5" style={{ fontFamily: "sans-serif" }}>
      <section
        className="page-header mb-5"
        style={{
          background: `linear-gradient(to top, #c31432, #ff4e50)`,
          minHeight: "80px",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "80px",
            textAlign: "center",
          }}
        >
          <h1
            className="title"
            style={{
              color: "white",
              fontFamily: '"Open Sans", sans-serif',
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            About
          </h1>
        </div>
      </section>

      <div className="site-section style={{backgroundColor: '#fafaf5'}}">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-3 order-lg-2 img-border">
              <img
                src="/assets/about_image_1.jpg"
                alt="About Us"
                className="img-fluid rounded "
              />
            </div>
            <div className="col-lg-4">
              <h2 style={{ color: "#c31432" }}>
                Car Company: Where Performance Meets Sustainability
              </h2>
              <p>
                Car Company redefines the driving experience by blending
                top-notch performance with sustainable solutions. Our vehicles,
                designed for the modern commuter, deliver both power and
                eco-friendliness without compromise. With cutting-edge
                technology under the hood, every ride promises efficiency,
                safety, and a reduced carbon footprint.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-light mb-5 style={{backgroundColor: '#fafaf5'}} ">
        <div className="container">
          <div className="row justify-content-center text-center mb-5 section-2-title">
            <div className="col-md-6">
              <h2 className="mb-4" style={{ color: "#c31432" }}>
                Meet Our Team
              </h2>
            </div>
          </div>
          <div className="row align-items-stretch">
            <div className="col-lg-4 col-md-6 mb-5">
              <div
                className="post-entry-1 h-100 person-1"
                style={{ textAlign: "center" }}
              >
                <img
                  src="assets/person_1.jpg"
                  alt=""
                  className="img-fluid rounded-circle p-2"
                />

                <div className="post-entry-1-contents">
                  <span className="meta" style={{ fontWeight: "bold" }}>
                    Chief Technology Officer
                  </span>
                  <h2 style={{ color: "#c31432" }}>Tom Clark</h2>
                  <p>
                    Tom spearheads our tech innovations with a sharp eye for
                    emerging trends. His passion for sustainable tech drives us
                    forward.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-5">
              <div
                className="post-entry-1 h-100 person-1"
                style={{ textAlign: "center" }}
              >
                <img
                  src="assets/person_2.jpg"
                  alt=""
                  className="img-fluid rounded-circle p-2"
                />

                <div className="post-entry-1-contents">
                  <span className="meta" style={{ fontWeight: "bold" }}>
                    Human Resources Lead
                  </span>
                  <h2 style={{ color: "#c31432" }}>Emily Turner</h2>
                  <p>
                    Emily's leadership in HR cultivates our vibrant company
                    culture, attracting top talent while fostering professional
                    growth.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div
                className="post-entry-1 h-100 person-1"
                style={{ textAlign: "center" }}
              >
                <img
                  src="assets/person_3.jpg"
                  alt=""
                  className="img-fluid rounded-circle p-2"
                />

                <div className="post-entry-1-contents">
                  <span className="meta" style={{ fontWeight: "bold" }}>
                    Product Manager
                  </span>
                  <h2 style={{ color: "#c31432" }}>Sophia Martin </h2>
                  <p>
                    Sophia's expertise lies in delivering products that resonate
                    with our customers, ensuring quality and innovation are
                    always at the forefront.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div
                className="post-entry-1 h-100 person-1"
                style={{ textAlign: "center" }}
              >
                <img
                  src="assets/person_4.jpg"
                  alt=""
                  className="img-fluid rounded-circle p-2"
                />

                <div
                  className="post-entry-1-contents"
                  style={{ textAlign: "center" }}
                >
                  <span className="meta" style={{ fontWeight: "bold" }}>
                    Sales Director
                  </span>
                  <h2 style={{ color: "#c31432" }}>Alex Johnson </h2>
                  <p>
                    With a knack for communication, Alex transforms market
                    challenges into opportunities, fostering strong client
                    relationships.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div
                className="post-entry-1 h-100 person-1"
                style={{ textAlign: "center" }}
              >
                <img
                  src="assets/person_5.jpg"
                  alt=""
                  className="img-fluid rounded-circle p-2"
                />

                <div className="post-entry-1-contents">
                  <span className="meta" style={{ fontWeight: "bold" }}>
                    Customer Success Advocate
                  </span>
                  <h2 style={{ color: "#c31432" }}>Olivia King</h2>
                  <p>
                    Olivia is dedicated to creating exceptional customer
                    experiences, driving satisfaction through personalized
                    support and care.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div
                className="post-entry-1 h-100 person-1"
                style={{ textAlign: "center" }}
              >
                <img
                  src="assets/person_1.jpg"
                  alt=""
                  className="img-fluid rounded-circle p-2"
                />

                <div className="post-entry-1-contents">
                  <span className="meta" style={{ fontWeight: "bold" }}>
                    Marketing Manager
                  </span>
                  <h2 style={{ color: "#c31432" }}>Ethan Wright </h2>
                  <p>
                    Ethan's creative strategies in digital marketing have
                    consistently elevated our brand presence, engaging a broader
                    audience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section style={{backgroundColor: '#fafaf5'}} ">
        <div className="container ">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <img
                src="assets/hero_1_a.jpg"
                alt=""
                className="img-fluid rounded"
              />
            </div>
            <div
              className="col-lg-4 ml-auto"
              style={{ textAlign: "center", padding: "20px" }}
            >
              <h2 style={{ color: "#c31432" }}>Our History</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit
                suscipit, repudiandae similique accusantium eius nulla quam
                laudantium sequi.
              </p>
              <p>
                Debitis voluptates corporis saepe molestias tenetur ab quae, quo
                earum commodi, laborum dolore, fuga aliquid delectus cum ipsa?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
