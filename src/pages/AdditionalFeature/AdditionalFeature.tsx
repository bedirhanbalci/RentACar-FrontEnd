import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdditional,
  addAdditionalPrice,
} from "../../store/slices/rentalSlice";
import { GetAllAdditionalFeaturesResponse } from "../../models/additionalFeature/responses/GetAllAdditionalFeaturesResponse";
import AdditionalFeatureService from "../../services/additionalFeatureService";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { toast } from "react-toastify";

type Props = {};

const AdditionalFeature = (props: Props) => {
  const [additionalList, setAdditionalList] = useState<
    GetAllAdditionalFeaturesResponse[]
  >([]);
  const [counter, setCounter] = useState(0);

  const [additionalCard, setAdditionalCard] = useState<any>([]);

  const [additionalTotalPrice, setAdditionalTotalPrice] = useState(0);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const rentalState = useSelector((store: any) => store.rental);

  const fetchAdditional = async () => {
    try {
      await AdditionalFeatureService.getAll().then((response: any) => {
        setAdditionalList(response.data.data);
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {}, [additionalList]);

  const fetchAdditionalPrices = async (id: any): Promise<any> => {
    try {
      let data = {
        id: id,
        startDate: rentalState.startDate.startDate,
        endDate: rentalState.endDate.endDate,
        quantity: 1,
      };

      const response = await AdditionalFeatureService.addAdditionalPrice(data);
      return response.data.data.dailyPrice;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const calculateAdditionalPrice = async (): Promise<any> => {
    const updatedAdditionalList = await Promise.all(
      additionalList.map(async additional => {
        const totalPrice = await fetchAdditionalPrices(additional.id);
        return {
          ...additional,
          totalPrice: totalPrice,
          amount: 0,
          finalPrice: 1,
        };
      })
    );
    setAdditionalList(updatedAdditionalList);
  };

  const calculateQuantityWithTotalPrice = async (card: any) => {
    const newAdditionalList = [...additionalList];

    newAdditionalList.forEach(item => {
      if (item.id === card.id) {
        if (item.totalPrice && item.amount !== 0) {
          item.finalPrice = item.amount * item.totalPrice;
        }
      }
    });
    setAdditionalList(newAdditionalList);
  };

  const calculateAmountIncrease = async (card: any) => {
    const newAdditionalList = [...additionalList];

    newAdditionalList.forEach(item => {
      if (item.id === card.id && item.amount < 2) {
        item.amount += 1;
      }
    });
    setAdditionalList(newAdditionalList);
  };

  const calculateAmountDecrease = async (card: any) => {
    const newAdditionalList = [...additionalList];

    newAdditionalList.forEach(item => {
      if (item.id === card.id && item.amount !== 0) {
        item.amount -= 1;
      }
    });
    setAdditionalList(newAdditionalList);
  };

  const calculateAdditionalTotalPrice = async () => {
    let totalPrice = 0;

    additionalCard.forEach((item: any) => {
      totalPrice += item.amount * item.totalPrice;
    });
    setAdditionalTotalPrice(totalPrice);
  };

  function calculateDateDifference(
    startDateStr: string,
    endDateStr: string
  ): string {
    const startDate = new Date(startDateStr);

    const endDate = new Date(endDateStr);

    const timeDifference = endDate.getTime() - startDate.getTime();

    const oneDay = 1000 * 60 * 60 * 24;

    const differenceInDays = Math.floor(timeDifference / oneDay);

    const days = Math.floor((differenceInDays % 365) % 30);

    return `For ${days + 1} days`;
  }

  useEffect(() => {
    calculateAdditionalTotalPrice();
  }, [additionalCard]);

  useEffect(() => {
    fetchAdditional();
  }, []);

  useEffect(() => {
    if (counter === 1) {
      calculateAdditionalPrice();
    }
    setCounter(counter + 1);
  }, [additionalList]);

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
            Extras
          </h1>
        </div>
      </section>

      <div className="container mt-5 mb-5 ">
        <div className="row justify-content-center">
          {additionalList.map((card, index) => {
            return (
              <div
                className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3 mb-sm-0 mt-3"
                key={card.id}
              >
                <Col key={index} md={4}>
                  <div className={"card"}>
                    <img
                      style={{ padding: "35px", maxHeight: "200px" }}
                      src={card.imagePath}
                      className="card-img-top"
                      alt={`Card ${index + 1}`}
                    />
                    <h5
                      style={{ height: "65px" }}
                      className="card-header text-danger fw-bold d-flex justify-content-center align-items-center text-center"
                    >
                      {card.name}
                    </h5>
                    <div className="card-body">
                      <p className="card-text" style={{ textAlign: "justify" }}>
                        {card.detail.length > 80
                          ? card.detail.substring(0, 80) + "..."
                          : card.detail}
                      </p>
                      <p className="card-text text-muted">
                        {calculateDateDifference(
                          rentalState.startDate.startDate,
                          rentalState.endDate.endDate
                        )}
                      </p>
                      <p className="card-text fw-bold">
                        {formatCurrency(
                          card.totalPrice ? card.totalPrice * card.amount : 0
                        )}
                      </p>
                    </div>

                    <div className="d-flex justify-content-start align-items-center ms-3">
                      <button
                        onClick={() => {
                          calculateAmountDecrease(card);
                          calculateQuantityWithTotalPrice(card);
                        }}
                        className="btn btn-danger rounded-circle btn-sm me-2 "
                        style={{
                          width: "32px",
                          height: "32px",
                        }}
                      >
                        -
                      </button>
                      <div
                        className="border border-1 rounded text-center overflow-hidden me-2"
                        style={{
                          width: "32px",
                          height: "32px",
                          lineHeight: "32px",
                          backgroundColor: "#fff",
                        }}
                      >
                        <span
                          className="d-inline-block"
                          style={{
                            maxWidth: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {card.amount}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          calculateAmountIncrease(card);
                          calculateQuantityWithTotalPrice(card);
                        }}
                        className="btn btn-danger rounded-circle btn-sm me-2"
                        style={{
                          width: "32px",
                          height: "32px",
                        }}
                      >
                        +
                      </button>

                      <button
                        onClick={() => {
                          const isAlreadyAdded = additionalCard.some(
                            (item: any) => item.id === card.id
                          );
                          if (!isAlreadyAdded) {
                            setAdditionalCard([
                              ...additionalCard,
                              {
                                quantity: card.amount,
                                id: card.id,
                                amount: card.amount,
                                totalPrice: card.totalPrice,
                              },
                            ]);
                          } else {
                            setAdditionalCard(
                              additionalCard.filter(
                                (x: any) => x.id !== card.id
                              )
                            );
                          }
                        }}
                        className="btn btn-danger ms-5 mb-1"
                        style={{ borderRadius: "20px" }}
                      >
                        {additionalCard.some((item: any) => item.id === card.id)
                          ? "Remove"
                          : "Add"}
                      </button>
                    </div>
                  </div>
                </Col>
              </div>
            );
          })}
          <hr />
          <div className="text-center">
            Total Price:{" "}
            <strong>
              {formatCurrency(
                additionalTotalPrice + rentalState.assurancePriceWithTotalPrice
              )}
            </strong>
            <div style={{ display: "inline-block", marginLeft: "10px" }}>
              <button
                onClick={() => {
                  dispatch(addAdditional(additionalCard));
                  dispatch(addAdditionalPrice(additionalTotalPrice));
                  navigate("/rental");
                }}
                className="btn btn-danger rounded-4 btn-lg "
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

export default AdditionalFeature;
