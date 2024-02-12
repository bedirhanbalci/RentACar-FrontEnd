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
    calculateAdditionalTotalPrice();
  }, [additionalCard]);

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
                src={card.imagePath}
                className="card-img-top"
                alt={`Card ${index + 1}`}
              />
              <h5 className="card-header fw-bold">{card.name}</h5>
              <div className="card-body">
                <p className="card-text">{card.detail}</p>
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
                        {
                          quantity: card.amount,
                          id: card.id,
                          amount: card.amount,
                          totalPrice: card.totalPrice,
                        },
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
      <p>
        {formatCurrency(
          additionalTotalPrice + rentalState.assurancePriceWithTotalPrice
        )}
      </p>
      <button
        onClick={() => {
          dispatch(addAdditional(additionalCard));
          dispatch(addAdditionalPrice(additionalTotalPrice));
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
