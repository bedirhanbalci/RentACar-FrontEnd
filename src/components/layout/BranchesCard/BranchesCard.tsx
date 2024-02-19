import React, { useEffect, useState } from "react";
import { GetAllBranchesResponse } from "../../../models/branch/responses/GetAllBranchesResponse";
import BranchService from "../../../services/branchService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  cityInput: string;
};

const BranchesCard: React.FC<Props> = props => {
  const [branches, setBranches] = useState<GetAllBranchesResponse[]>([]);
  const navigate = useNavigate();

  const fetchBranch = async () => {
    try {
      if (props.cityInput !== "") {
        await BranchService.getByCity(props.cityInput).then((response: any) => {
          setBranches(response.data);
        });
      } else {
        await BranchService.getAll().then((response: any) => {
          setBranches(response.data.data);
        });
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
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
              style={{ color: "#ad0a27", fontWeight: "bold" }}
            >
              {`${branch.city} - ${branch.address}`}{" "}
              <i className="bi bi-building"></i>
            </h5>

            <p className="card-text">Phone Number: {branch.phoneNumber}</p>
            <p className="fw-bold">Monday - Sunday</p>

            <p>09:00-21:00</p>
            <div
              onClick={() =>
                navigate("/reservation", {
                  state: { branch: branch.id },
                })
              }
              className="btn btn-danger rounded-4"
              style={{ textDecoration: "none" }}
            >
              Reservation
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BranchesCard;
