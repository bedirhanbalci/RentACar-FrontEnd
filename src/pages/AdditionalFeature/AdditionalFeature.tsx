import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addAdditional } from "../../store/slices/rentalSlice";
import { GetAllAdditionalFeaturesResponse } from "../../models/additionalFeature/responses/GetAllAdditionalFeaturesResponse";
import AdditionalFeatureService from "../../services/additionalFeatureService";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/validation/formatCurrency";

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
        console.log(response);
        setAdditionalList(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(additionalList);
  }, [additionalList]);

  const fetchAdditionalPrices = async (id: any): Promise<any> => {
    try {
      let data = {
        id: id,
        startDate: rentalState.startDate.startDate,
        endDate: rentalState.endDate.endDate,
        quantity: 1,
      };

      const response = await AdditionalFeatureService.addAdditionalPrice(data);
      console.log(response.data.data.dailyPrice);
      return response.data.data.dailyPrice;
    } catch (error) {
      console.log(error);
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

  const increaseQuantity = async (id: any) => {
    const newAdditionalList = [...additionalList];

    newAdditionalList.forEach(item => {
      if (item.id === id && item.quantity < 2) {
        item.quantity = item.quantity + 1;
      }
    });
    setAdditionalList(newAdditionalList);
  };

  const decreaseQuantity = async (id: any) => {
    const newAdditionalList = [...additionalList];

    newAdditionalList.forEach(item => {
      if (item.id === id) {
        if (item.quantity !== 0) item.quantity = item.quantity - 1;
      }
    });
    setAdditionalList(newAdditionalList);
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

  // const mappedToAdditionalList = async () => {
  //   const newAdditionalList = additionalList.map(item => {
  //     return { ...item, amount: 1, finalPrice: 0 };
  //   });
  //   setAdditionalList(newAdditionalList);
  // };

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
    const newAdditionalList = [...additionalList];

    let totalPrice = 0;

    newAdditionalList.forEach(item => {
      totalPrice += item.finalPrice;
    });
    setAdditionalTotalPrice(totalPrice);
  };

  useEffect(() => {
    calculateAdditionalTotalPrice();
  }, [additionalList]);

  useEffect(() => {
    fetchAdditional();
  }, []);

  useEffect(() => {
    if (counter === 1) {
      calculateAdditionalPrice();
      console.log(additionalList);
    }
    setCounter(counter + 1);
    console.log(additionalList);
  }, [additionalList]);

  return (
    <div className="mt-5 mb-5">
      {additionalList.map((card, index) => {
        return (
          <Col key={index} md={4}>
            <div className={"card"}>
              <img
                src="assets/Driver.png"
                className="card-img-top"
                alt={`Card ${index + 1}`}
              />
              <h5 className="card-header fw-bold">{card.name}</h5>
              <div className="card-body">
                <p className="card-text">{card.detail}</p>
                <p className="card-text">{formatCurrency(card.dailyPrice)}</p>
                <p className="card-text">{card.totalPrice}</p>
              </div>

              <div className="d-flex justify-content-start align-items-center">
                <button
                  onClick={() => {
                    calculateAmountDecrease(card);
                    calculateQuantityWithTotalPrice(card);
                  }}
                  className="btn btn-danger rounded-circle btn-sm me-2"
                  style={{ width: "32px", height: "32px" }}
                >
                  -
                </button>

                <div
                  className="border border-1 rounded text-center overflow-hidden"
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
                  style={{ width: "32px", height: "32px" }}
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
                        { quantity: card.quantity, id: card.id },
                      ]);
                    } else {
                      setAdditionalCard(
                        additionalCard.filter((x: any) => x.id !== card.id)
                      );
                    }
                  }}
                  className="btn btn-danger ms-2"
                  style={{ borderRadius: "20px" }}
                >
                  {additionalCard.some((item: any) => item.id === card.id)
                    ? "Remove"
                    : "Add"}
                </button>
              </div>
            </div>
          </Col>
        );
      })}
      <p>{formatCurrency(additionalTotalPrice)}</p>
      <button
        onClick={() => {
          dispatch(addAdditional(additionalCard));
          navigate("/rental");
        }}
        className="btn btn-danger rounded-4 btn-lg"
      >
        Next Step<i className="bi bi-arrow-right-circle ps-3"></i>
      </button>
    </div>
  );
};

export default AdditionalFeature;
