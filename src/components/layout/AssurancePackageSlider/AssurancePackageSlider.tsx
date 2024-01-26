import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import './AssurancePackageSlider.css';

interface Card {
  image: string;
  title: string;
  description: string;
}

interface AssurancePackageSliderProps {
  cards: Card[];
}

const AssurancePackageSlider: React.FC<AssurancePackageSliderProps> = ({ cards }) => {
  const cardsPerSlide = 3;

  const renderSlides = () => {
    const slides: JSX.Element[] = [];
    for (let i = 0; i < cards.length; i += cardsPerSlide) {
      const end = i + cardsPerSlide;
      slides.push(
        <Carousel.Item key={i / cardsPerSlide}>
          <Container>
            <Row className="scroll-container">
              {renderCards(i, end)}
            </Row>
          </Container>
        </Carousel.Item>
      );
    }
    return slides;
  };

  const renderCards = (start: number, end: number) => {
    const cardItems = cards.slice(start, end).map((card, index) => (
      <Col key={index} md={4}>
        <div className={"card"}>
          <img src={card.image} className="card-img-top" alt={`Card ${index + 1}`} />
          <h5 className="card-header">{card.title}</h5>
          <div className="card-body">
            <p className="card-text">{card.description}</p>
          </div>
        </div>
      </Col>
    ));
    return cardItems;
  };

  return (
    <div className="carousel-container">
      <Carousel
        interval={null}
        indicators={false}
        wrap={false}
      >
        {renderSlides()}
      </Carousel>
      <div className="scroll-bar">
        {/* Scroll bar burada */}
      </div>
    </div>
  );
};

export default AssurancePackageSlider;
