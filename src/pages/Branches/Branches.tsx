import BranchMap from "../../components/layout/BranchMap/BranchMap";
import { Container } from "react-bootstrap";
import BranchesCard from "../../components/layout/BranchesCard/BranchesCard";

type Props = {};

const Branches = (props: Props) => {
  const ScrollableContent = () => (
    <div style={{ height: "200px", overflowY: "scroll" }}>
      <BranchesCard />
    </div>
  );

  return (
    <div>
      <section
        className="page-header mb-5"
        style={{
          background: `linear-gradient(to top, #c31432, #ff4e50)`,
          minHeight: "80px",
        }}
      >
        <Container
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
        </Container>
      </section>

      <Container>
        <div className="row">
          <div className="col-lg-4 sm-12">
            <div className="fw-bold">
              <h4>Kiralama Lokasyonu Ara</h4>
            </div>
            <form>
              <input
                placeholder="İl ya da İlçe Ara …"
                className="form-control md-4"
              />
            </form>
            <div>{<ScrollableContent />} </div>
          </div>
          <div className="col-lg-8 sm-12">
            <BranchMap />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Branches;
