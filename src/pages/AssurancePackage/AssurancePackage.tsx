import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import AssurancePackageService from "../../services/assurancePackageService";
import { GetAllAssurancePackagesResponse } from "../../models/assurancePackage/responses/GetAllAssurancePackagesResponse";
import { useDispatch, useSelector } from "react-redux";
import { addAssurance } from "../../store/slices/rentalSlice";
import { useNavigate } from "react-router-dom";

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
        console.log(response);
        setAssuranceList(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(assuranceList);
  }, [assuranceList]);

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

  const calculateAssurancePrice = async () => {
    const updatedAssuranceList = await Promise.all(
      assuranceList.map(async assurance => {
        const totalPrice = await fetchAssurancePrices(assurance.id);
        return { ...assurance, totalPrice: totalPrice, addible: false };
      })
    );
    setAssuranceList(updatedAssuranceList);
  };

  const changeAddible = async (id: any) => {
    const newAssuranceList = [...assuranceList];

    newAssuranceList.forEach(item => {
      if (item.id === id) {
        item.addible = !item.addible;
      } else {
        item.addible = false;
      }
    });
    setAssuranceList(newAssuranceList);
  };

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
    <div className="mt-5 mb-5">
      {assuranceList.map((card, index) => (
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
              <p className="card-text">{card.dailyPrice}</p>
              <p className="card-text">{card.totalPrice}</p>
            </div>

            <button
              onClick={() => {
                if (assuranceId !== card.id && card.totalPrice) {
                  setTotalPrice(
                    (prevTotalPrice: any) => prevTotalPrice - tempPrice
                  );
                  setTotalPrice(
                    (prevTotalPrice: any) => prevTotalPrice + card.totalPrice
                  );
                }
                if (assuranceId !== card.id) {
                  setIsAdded(!isAdded);
                }

                setIsAdded(!isAdded);

                setAssuranceId(card.id);

                changeAddible(card.id);

                if (!isAdded && card.totalPrice && card.id === assuranceId) {
                  setTotalPrice(
                    (prevTotalPrice: any) => prevTotalPrice + card.totalPrice
                  );
                } else {
                  if (card.totalPrice && card.id === assuranceId) {
                    setTotalPrice(
                      (prevTotalPrice: any) => prevTotalPrice - card.totalPrice
                    );
                  }
                }
                if (card.totalPrice) setTempPrice(card.totalPrice);
              }}
              className="btn btn-danger ms-2"
              style={{ borderRadius: "20px" }}
            >
              {card.addible ? "Remove" : "Add"}
            </button>
          </div>
        </Col>
      ))}
      <p className="card-text">{totalPrice}</p>
      <button
        onClick={() => {
          if (isAdded === true) dispatch(addAssurance(assuranceId));
          navigate("/additional-feature");
        }}
        className="btn btn-danger rounded-4 btn-lg"
      >
        Next Step
        <i className="bi bi-arrow-right-circle ps-3" />
      </button>
    </div>
  );
};

export default AssurancePackage;
