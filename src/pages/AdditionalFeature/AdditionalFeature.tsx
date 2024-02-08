import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addAdditional } from "../../store/slices/rentalSlice";
import { GetAllAdditionalFeaturesResponse } from "../../models/additionalFeature/responses/GetAllAdditionalFeaturesResponse";
import AdditionalFeatureService from "../../services/additionalFeatureService";

type Props = {};

const AdditionalFeature = (props: Props) => {
  const [isAdded, setIsAdded] = useState(false);
  const [additionalList, setAdditionalList] = useState<
    GetAllAdditionalFeaturesResponse[]
  >([]);
  const [counter, setCounter] = useState(0);

  const [quantityInfo, setQuantityInfo] = useState([{ quantity: 1, id: 0 }]);

  const [additionalId, setAdditionalId] = useState(0);

  const dispatch = useDispatch();

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

  const updatedQuantityInfo = async (
    updatedQuantityInfo: any,
    card: any
  ): Promise<any> => {
    const itemIndex = updatedQuantityInfo.findIndex(
      (item: any) => item.id === card.id
    );
  };

  const calculateAdditionalPrice = async (): Promise<any> => {
    const updatedAdditionalList = await Promise.all(
      additionalList.map(async additional => {
        const totalPrice = await fetchAdditionalPrices(additional.id);
        return { ...additional, totalPrice: totalPrice };
      })
    );
    setAdditionalList(updatedAdditionalList);
  };

  useEffect(() => {
    fetchAdditional();
  }, []);

  useEffect(() => {
    console.log(additionalId);
  }, [additionalId]);

  useEffect(() => {
    if (counter === 1) {
      calculateAdditionalPrice();
    }
    setCounter(counter + 1);
  }, [additionalList]);

  return (
    <>
      {additionalList.map((card, index) => {
        const totalPrice = updatedQuantityInfo(quantityInfo, card); // updatedQuantityInfo fonksiyonunu async olarak işaretlemek gerekmiyor
        return (
          // return anahtar kelimesi eklendi
          <Col key={index} md={4}>
            <div className={"card"}>
              <img
                src="assets/Driver.png"
                className="card-img-top"
                alt={`Card ${index + 1}`}
              />
              <h5 className="card-header">{card.name}</h5>
              <div className="card-body">
                <p className="card-text">{card.detail}</p>
                {/* <p className="card-text">{totalPrice}</p> */}
                <p className="card-text">{card.dailyPrice}</p>
                <p className="card-text">{card.totalPrice}</p>
              </div>
              <button
                onClick={() => {
                  const item = quantityInfo.find(item => item.id === card.id);
                  setQuantityInfo(prevQuantityInfo => [
                    ...prevQuantityInfo,
                    { id: card.id, quantity: item?.quantity ?? 1 },
                  ]);
                }}
                className="btn btn-danger"
              >
                Increase
              </button>
              <button
                onClick={() => {
                  setQuantityInfo(prevQuantityInfo => {
                    const updatedQuantityInfo = [...prevQuantityInfo];
                    const itemIndex = updatedQuantityInfo.findIndex(
                      item => item.id === card.id
                    );
                    if (itemIndex !== -1) {
                      if (updatedQuantityInfo[itemIndex].quantity > 1) {
                        updatedQuantityInfo[itemIndex].quantity -= 1;
                      } else {
                        updatedQuantityInfo.splice(itemIndex, 1);
                      }
                    }
                    return updatedQuantityInfo;
                  });
                }}
                className="btn btn-danger"
              >
                Decrease
              </button>

              <button
                onClick={() => {
                  setIsAdded(!isAdded);
                  setAdditionalId(card.id);
                }}
                className="btn btn-danger"
              >
                {isAdded && additionalId === card.id ? "Remove" : "Add"}
              </button>
            </div>
          </Col>
        );
      })}
      <button
        onClick={() => {
          if (isAdded === true) dispatch(addAdditional([]));
        }}
        className="btn btn-danger"
      >
        Continue
      </button>
    </>
  );
};

export default AdditionalFeature;
