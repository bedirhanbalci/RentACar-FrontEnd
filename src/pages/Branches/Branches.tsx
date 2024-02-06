import React, { useEffect, useState } from "react";
import { BranchMap } from "../../components/layout/BranchMap/BranchMap";
import { Container } from "react-bootstrap";
import { GetByIdBranchResponse } from "../../models/branch/responses/GetByIdBranchResponse";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";

type Props = {};

const Branches = (props: Props) => {
  const { id } = useParams();
  const [branches, setBrances] = useState<GetByIdBranchResponse[]>([]);

  const fetchCar = async () => {
    try {
      const response = await axiosInstance(`/cars/getById/${id}`);

      setBrances(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

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
          <div className="lg-4 sm-12"></div>
          <div className="lg-8 sm-12">
            <BranchMap />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Branches;
