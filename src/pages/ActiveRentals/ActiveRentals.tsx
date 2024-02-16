import { useEffect, useState } from "react";
import { GetByIdRentalResponse } from "../../models/rental/responses/GetByIdRentalResponse";
import { useParams } from "react-router-dom";
import RentalService from "../../services/rentalService";

type Props = {};

const ActiveRentals = (props: Props) => {
  const [rental, setRental] = useState<GetByIdRentalResponse[]>([]);
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRental = async () => {
      if (params.id) {
        try {
          await RentalService.getById(parseInt(params.id)).then(
            (response: any) => {
              setRental(response.data.data);
            }
          );
        } catch (err) {
          setError("Kiralama bilgileri yüklenirken bir hata oluştu.");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchRental();
  }, [params.id]);
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
            Active Rentals
          </h1>
        </div>
      </section>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="container">
          <div className="row">
            {rental.map(rental => (
              <div className="col-md-4 mb-4" key={rental.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Rental Information</h5>
                    <p className="card-text">Start Date: {rental.startDate}</p>
                    <p className="card-text">End Date: {rental.endDate}</p>
                    <p className="card-text">
                      Total Price: {rental.totalPrice}
                    </p>
                    {/* Diğer verileri de burada gösterebilirsiniz */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveRentals;
