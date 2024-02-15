import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import AssurancePackageService from "../../services/assurancePackageService";
import { GetAllAssurancePackagesResponse } from "../../models/assurancePackage/responses/GetAllAssurancePackagesResponse";
import { useDispatch, useSelector } from "react-redux";
import {
  addAssurance,
  addAssurancePrice,
} from "../../store/slices/rentalSlice";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { formatCurrency } from "../../utils/formatCurrency";

type Props = {};

const AssurancePackage = (props: Props) => {
  const [isAdded, setIsAdded] = useState(false);
  const [assuranceList, setAssuranceList] = useState<
    GetAllAssurancePackagesResponse[]
  >([]);
  const [counter, setCounter] = useState(0);

  const [assuranceId, setAssuranceId] = useState(0);

  const [tempPrice, setTempPrice] = useState(0);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const rentalState = useSelector((store: any) => store.rental);

  const [totalPrice, setTotalPrice] = useState(rentalState.rentalPrice);

  const fetchAssurance = async () => {
    try {
      await AssurancePackageService.getAll().then((response: any) => {
        setAssuranceList(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [assuranceList]);

  const fetchAssurancePrices = async (id: any): Promise<any> => {
    try {
      let data = {
        id: id,
        startDate: rentalState.startDate.startDate,
        endDate: rentalState.endDate.endDate,
      };

      const response = await AssurancePackageService.addAssurancePrice(data);
      return response.data.data.dailyPrice;
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = async (card: any) => {
    if (
      isAdded &&
      assuranceId !== card.id &&
      card.totalPrice &&
      card.totalPrice !== tempPrice &&
      assuranceId !== 0
    ) {
      setTotalPrice((prevTotalPrice: any) => prevTotalPrice - tempPrice);
      setTotalPrice((prevTotalPrice: any) => prevTotalPrice + card.totalPrice);
    } else {
      if (
        !isAdded &&
        assuranceId !== card.id &&
        card.totalPrice &&
        card.totalPrice !== tempPrice &&
        assuranceId !== 0
      ) {
        setTotalPrice(
          (prevTotalPrice: any) => prevTotalPrice + card.totalPrice
        );
      }
    }

    if (assuranceId !== card.id && assuranceId !== 0) {
      setIsAdded(true);
    }

    await changeAddible(card.id);
    if (
      !isAdded &&
      card.totalPrice &&
      (card.id === assuranceId || assuranceId === 0)
    ) {
      setTotalPrice((prevTotalPrice: any) => prevTotalPrice + card.totalPrice);
    } else {
      if (card.totalPrice && card.id === assuranceId) {
        setTotalPrice(
          (prevTotalPrice: any) => prevTotalPrice - card.totalPrice
        );
      }
    }
    if (card.totalPrice) setTempPrice(card.totalPrice);
    setAssuranceId(card.id);
    if (assuranceId === card.id || assuranceId === 0) {
      setIsAdded(!isAdded);
    }
  };

  const calculateAssurancePrice = async () => {
    const updatedAssuranceList = await Promise.all(
      assuranceList.map(async (assurance) => {
        const totalPrice = await fetchAssurancePrices(assurance.id);
        return { ...assurance, totalPrice: totalPrice, addible: false };
      })
    );
    setAssuranceList(updatedAssuranceList);
  };

  const changeAddible = async (id: any) => {
    const newAssuranceList = [...assuranceList];

    newAssuranceList.forEach((item) => {
      if (item.id === id) {
        item.addible = !item.addible;
      } else {
        item.addible = false;
      }
    });
    setAssuranceList(newAssuranceList);
  };

  function calculateDateDifference(
    startDateStr: string,
    endDateStr: string
  ): string {
    // String tarihleri Date nesnelerine dönüştür
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // İki tarih arasındaki farkı hesapla
    const timeDifference = endDate.getTime() - startDate.getTime();

    // Bir günün milisaniye cinsinden değeri
    const oneDay = 1000 * 60 * 60 * 24;

    // Farkı gün cinsine dönüştür
    const differenceInDays = Math.floor(timeDifference / oneDay);

    // Gün hesaplaması

    const days = Math.floor((differenceInDays % 365) % 30);

    // Sonucu formatlı bir şekilde döndür
    return `For ${days + 1} days`;
  }

  useEffect(() => {
    fetchAssurance();
  }, []);

  useEffect(() => {
    console.log(assuranceId);
  }, [assuranceId]);

  useEffect(() => {
    if (counter === 1) {
      calculateAssurancePrice();
    }
    setCounter(counter + 1);
  }, [assuranceList]);

  return (
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
            Assurance Packages
          </h1>
        </Container>
      </section>
      <div className="container mt-5 mb-5 ">
        <div className="row justify-content-center">
          {assuranceList.map((card, index) => (
            <Col key={index} md={4}>
              <div className={"card"}>
                <img
                  style={{ height: "50%", padding: "35px" }}
                  src={card.imagePath}
                  className="card-img-top"
                  alt={`Card ${index + 1}`}
                />
                <h5 className="card-header fw-bold">{card.name}</h5>
                <div className="card-body">
                  <p className="card-text">
                    {card.detail.length > 100
                      ? card.detail.substring(0, 100) + "..."
                      : card.detail}
                  </p>
                  <p className="card-text text-muted">
                    {calculateDateDifference(
                      rentalState.startDate.startDate,
                      rentalState.endDate.endDate
                    )}
                  </p>
                  <p className="card-text fw-bold">
                    {" "}
                    {formatCurrency(card.totalPrice)}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => handleOnClick(card)}
                    className="btn btn-danger ms-2"
                    style={{ borderRadius: "20px" }}
                  >
                    {card.addible ? "Remove" : "Add"}
                  </button>
                </div>
              </div>
            </Col>
          ))}
          <hr />
          <div className="card-text text-center">
            {" "}
            Total Price: {formatCurrency(totalPrice)}
            <div style={{ display: "inline-block", marginLeft: "10px" }}>
              <button
                onClick={() => {
                  if (isAdded === true) dispatch(addAssurance(assuranceId));
                  dispatch(addAssurancePrice(totalPrice));
                  navigate("/additional-feature");
                }}
                className="btn btn-danger rounded-4 btn-lg"
              >
                Next Step
                <i className="bi bi-arrow-right-circle ps-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssurancePackage;
