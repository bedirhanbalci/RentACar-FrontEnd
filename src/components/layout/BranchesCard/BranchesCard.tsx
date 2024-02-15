import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllBranchesResponse } from "../../../models/branch/responses/GetAllBranchesResponse";
import branchService from "../../../services/branchService";

const BranchesCard: React.FC = () => {
  const [branches, setBranches] = useState<GetAllBranchesResponse[]>([]);

  const fetchBranch = async () => {
    try {
      await branchService.getAll().then((response: any) => {
        console.log(response);
        setBranches(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBranch();
  }, []);
  return (
    <div>
      {branches.map((branch, id) => (
        <div
          key={id}
          className="card"
          style={{
            width: "20rem",
            marginBottom: "1rem",
            fontFamily: "sans-serif",
          }}
        >
          <div className="card-body">
            <h5
              className="card-title"
              style={{ color: "#c31432", fontWeight: "bold" }}
            >
              {`${branch.city}  ${branch.address}`}
            </h5>
            <p className="card-text"> Phone Number: {branch.phoneNumber}</p>
            <p className="fw-bold">Monday-Sunday</p>
            <p>09:00-21:00</p>
            <Link
              to={`/reservation/${branch.id}`}
              className="btn btn-danger"
              style={{ textDecoration: "none" }}
            >
              Reservation
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BranchesCard;
