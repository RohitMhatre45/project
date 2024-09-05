import React from 'react'
import { Carousel, Card, Row, Col, CardImg, Button } from 'react-bootstrap';
import styled from 'styled-components';


import Image1 from './utility/Book1.jpg';
import Image2 from './utility/Book2.jpg';
import Image3 from './utility/Book3.jpg';
import Image4 from './utility/Book4.jpg';
import Image5 from './utility/Book5.jpg';
import Image6 from './utility/Book6.jpg';
import Image7 from './utility/Book7.jpg';
import Image8 from './utility/Book8.jpg';
import Image9 from './utility/Book9.jpg';
import Image10 from './utility/Book10.jpg';
import Image11 from './utility/Book11.jpg';
import Image12 from './utility/Book12.jpg';

import Image13 from './utility/Carausal1.jpg';
import Image14 from './utility/Carausal2.jpg';
import Image15 from './utility/Carausal3.jpg';
import Image16 from './utility/Carausal4.jpg';
import Image17 from './utility/Carausal5.jpg';

const Stylecard = styled(Card)`
  flex: 1 1 auto;
  padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
  color: var(--bs-card-color);
  border: 1px solid #black;
  border-radius: 4px;
  padding: 5px;
  width: 200px;
  margin-bottom: 10px;
  margin-top: 7px;
  margin-left: 10px;
`;

const StyledCardText = styled(Card.Text)`
  font-weight: normal;
  span.bold {
    font-weight: bold;
  }
`;

const PriceButton = styled(Button)`
  background-color: #fff;
  color: green;
  border: 1px solid green;
  &:hover {
    background: #397d58 !important;
    color: #fff !important;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Separator = styled.hr`
  border: none;
  border-top: 5px solid #333;
  margin: 20px 0;
`;

const CenteredDiv = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;


const Cards = () => {
  return (
    <>
    <Carousel>
    <Carousel.Item>
        <img className="d-block w-100" src={Image13} alt="First slide" />
    </Carousel.Item>
    <Carousel.Item>
        <img className="d-block w-100" src={Image14} alt="Second slide" />
    </Carousel.Item>
    <Carousel.Item>
        <img className="d-block w-100" src={Image15} alt="Third slide" />
    </Carousel.Item>
    <Carousel.Item>
        <img className="d-block w-100" src={Image16} alt="Fourth slide" />
    </Carousel.Item>
    <Carousel.Item>
        <img className="d-block w-100" src={Image17} alt="Fifth slide" />
    </Carousel.Item>
</Carousel>
<Separator />

</>


  )
}

export default Cards