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

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const rentalState = useSelector((store: any) => store.rental);

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
      console.log(response.data.data.dailyPrice);
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
    <>
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
                setIsAdded(!isAdded);
                setAssuranceId(card.id);
                changeAddible(card.id);
              }}
              className="btn btn-danger"
            >
              {card.addible ? "Remove" : "Add"}
            </button>
          </div>
        </Col>
      ))}
      <button
        onClick={() => {
          if (isAdded === true) dispatch(addAssurance(assuranceId));
          navigate("/additional-feature");
        }}
        className="btn btn-danger"
      >
        Continue
      </button>
    </>
  );
};

export default AssurancePackage;
