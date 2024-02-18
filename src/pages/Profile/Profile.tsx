import { useEffect, useState } from "react";
import { GetByIdUserResponse } from "../../models/user/responses/GetByIdUserResponse";
import userService from "../../services/userService";
import { useSelector } from "react-redux";
import UserUpdateForm from "../../components/layout/UserUpdateForm/UserUpdateForm";
import { Container } from "react-bootstrap";

type Props = {};

const Profile = (props: Props) => {
  const [user, setUser] = useState<GetByIdUserResponse>();
  const [customer, setCustomer] = useState<any>();
  const authState = useSelector((store: any) => store.auth);
  const [editable, setEditable] = useState(false);
  const [updated, setUpdated] = useState<boolean>(false);

  const fetchUser = async () => {
    try {
      await userService
        .getById(parseInt(authState.id))
        .then((response: any) => {
          setUser(response.data[1]);
          setCustomer(response.data[0]);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [updated]);

  return (
    <>
      <div className="mb-5" style={{ fontFamily: "sans-serif" }}>
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
              My Personal Information
            </h1>
          </Container>
        </section>
        <div className="row">
          <div>
            <div className="row">
              <div className="col-md-4 ms-5">
                <div className="card mt-3 mb-5">
                  <div className="card-header">User Details</div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item border-bottom">
                      Email: {user?.email || "N/A"}
                    </li>
                    <li className="list-group-item border-bottom">
                      Phone: {user?.phoneNumber || "N/A"}
                    </li>
                    <li className="list-group-item border-bottom">
                      Address: {user?.address || "N/A"}
                    </li>
                  </ul>
                </div>
                <div className="card mt-3">
                  <div className="card-header fw-bold ">
                    Customer Information
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item border-bottom">
                      Name: {customer?.firstName} {customer?.lastName || "N/A"}
                    </li>
                    <li className="list-group-item border-bottom">
                      TC KIMLIK NO: {customer?.nationalityNo || "N/A"}
                    </li>
                    <li className="list-group-item border-bottom">
                      Birthdate: {customer?.birthDate || "N/A"}
                    </li>
                    {customer?.companyName && (
                      <li className="list-group-item">
                        Company: {customer?.companyName}
                      </li>
                    )}
                    {customer?.contactTitle && (
                      <li className="list-group-item">
                        Contact Title: {customer?.contactTitle}
                      </li>
                    )}
                    {customer?.contactName && (
                      <li className="list-group-item">
                        Contact Name: {customer?.contactName}
                      </li>
                    )}
                    {customer?.taxNumber && (
                      <li className="list-group-item">
                        Tax Number: {customer?.taxNumber}
                      </li>
                    )}
                  </ul>
                </div>

                <div className="col-md-8 ms-3">
                  <button
                    className="btn btn-sm btn-danger rounded-4"
                    onClick={() => {
                      setEditable(!editable);
                      setUpdated(false);
                    }}
                  >
                    Update My Information
                    <i className="bi bi-arrow-right-circle ps-3" />
                  </button>
                </div>
              </div>
              {editable && (
                <div className="col-md-6">
                  <UserUpdateForm
                    user={user}
                    customer={customer}
                    setUpdate={setUpdated}
                  />{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
