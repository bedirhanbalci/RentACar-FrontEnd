import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import "./CampaignSlider.css";
import { GetAllAdditionalFeaturesResponse } from "../../../models/additionalFeature/responses/GetAllAdditionalFeaturesResponse";

interface CampaignSliderProps {
  cards: GetAllAdditionalFeaturesResponse[];
}

const CampaignSlider: React.FC<CampaignSliderProps> = ({ cards }) => {
  const cardsPerSlide = 3;

  const renderSlides = () => {
    const slides: JSX.Element[] = [];
    for (let i = 0; i < cards.length; i += cardsPerSlide) {
      const end = i + cardsPerSlide;
      slides.push(
        <Carousel.Item key={i / cardsPerSlide}>
          <Container>
            <Row className="scroll-container">{renderCards(i, end)}</Row>
          </Container>
        </Carousel.Item>
      );
    }
    return slides;
  };

  const renderCards = (start: number, end: number) => {
    const cardItems = cards.slice(start, end).map((card, index) => (
      <Col key={index} md={4}>
        <div className={"card camp-card-body"}>
          <img
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
            <p className="card-text">{card.detail}</p>
          </div>
        </div>
      </Col>
    ));
    return cardItems;
  };

  return (
    <div className="carousel-container">
      <Carousel interval={null} indicators={false} wrap={false}>
        {renderSlides()}
      </Carousel>
    </div>
  );
};

export default CampaignSlider;
