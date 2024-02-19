import { useEffect, useState } from "react";
import { GetByIdUserResponse } from "../../models/user/responses/GetByIdUserResponse";
import UserService from "../../services/userService";
import { useSelector } from "react-redux";
import UserUpdateForm from "../../components/layout/UserUpdateForm/UserUpdateForm";
import { Container, Card, Button, Modal } from "react-bootstrap";

type Props = {};

const Profile = (props: Props) => {
  const [user, setUser] = useState<GetByIdUserResponse>();
  const [customer, setCustomer] = useState<any>();
  const authState = useSelector((store: any) => store.auth);
  const [editable, setEditable] = useState(false);
  const [updated, setUpdated] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const fetchUser = async () => {
    try {
      await UserService.getById(parseInt(authState.id)).then(
        (response: any) => {
          setUser(response.data[1]);
          setCustomer(response.data[0]);
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [updated]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
              Personal Informations
            </h1>
          </Container>
        </section>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Card className="mt-3 mb-5">
                <Card.Header className="fw-bold">User Details</Card.Header>
                <Card.Body>
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
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-6">
              <Card className="mt-3 mb-5">
                <Card.Header className="fw-bold">
                  Customer Information
                </Card.Header>
                <Card.Body>
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
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Button
                variant="danger"
                className="rounded-4 mt-3"
                onClick={() => {
                  setEditable(!editable);
                  setUpdated(false);
                  openModal();
                }}
              >
                Update My Information
                <i className="bi bi-arrow-right-circle ps-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            Edit Personal Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <UserUpdateForm
                  user={user}
                  customer={customer}
                  setUpdate={setUpdated}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
