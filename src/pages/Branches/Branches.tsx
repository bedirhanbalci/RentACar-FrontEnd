import { useState } from "react";
import BranchMap from "../../components/layout/BranchMap/BranchMap";
import BranchesCard from "../../components/layout/BranchesCard/BranchesCard";

type Props = {};

const Branches = (props: Props) => {
  const [cityInput, setCityInput] = useState<string>("");
  const ScrollableContent = () => (
    <div className="mt-5" style={{ height: "250px", overflowY: "scroll" }}>
      <BranchesCard cityInput={cityInput} />
    </div>
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "67.5vh" }}
    >
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
            Branches
          </h1>
        </div>
      </section>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="row ">
            <div className="col-lg-4 sm-12">
              <div className="fw-bold">
                <h4>Search Rental Location</h4>
              </div>
              <form>
                <input
                  placeholder="Search by City"
                  className="form-control md-4"
                  onChange={e => {
                    setCityInput(e.target.value);
                  }}
                  value={cityInput}
                />
              </form>
              <br />
              <div>{<ScrollableContent />} </div>
            </div>
            <div className="col-lg-8 sm-12">
              <BranchMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Branches;
