import { useEffect, useState } from "react";
import { GetByIdUserResponse } from "../../models/user/responses/GetByIdUserResponse";
import userService from "../../services/userService";
import { useSelector } from "react-redux";
import UserUpdateForm from "../../components/layout/UserUpdateForm/UserUpdateForm";

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
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card mt-3">
              <div className="card-header">User Details</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Email: {user?.email || "N/A"}
                </li>
                <li className="list-group-item">
                  Phone: {user?.phoneNumber || "N/A"}
                </li>
                <li className="list-group-item">
                  Address: {user?.address || "N/A"}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mt-3">
              <div className="card-header">Customer Information</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Name: {customer?.firstName} {customer?.lastName || "N/A"}
                </li>
                <li className="list-group-item">
                  TC KIMLIK NO: {customer?.nationalityNo || "N/A"}
                </li>
                <li className="list-group-item">
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
          </div>
        </div>
      </div>

      <button
        className="btn btn-danger rounded-4"
        onClick={() => {
          setEditable(!editable);
          setUpdated(false);
        }}
      >
        Update My Information
        <i className="bi bi-arrow-right-circle ps-3" />
      </button>

      {editable && (
        <UserUpdateForm
          user={user}
          customer={customer}
          setUpdate={setUpdated}
        />
      )}
    </>
  );
};

export default Profile;
