import React from 'react';
import './App.css';
import CharityDescription from './components/CharityDescription';
import { Col, Container, Row } from 'react-bootstrap';
import AnimalDescription from './components/AnimalDescription';

function App({ animal, charity, toggleModal }) {
  return (
    <div className="App">
      <Container fluid className='w-100 p-0' style={{maxWidth: 3000}}>
        <Row className='w-100 m-0 justify-content-center'>
          <Col xs={12} md={4} xl={6} className='p-0'>
            <AnimalDescription animal={animal}/>
          </Col>
          <Col xs={12} md={8} xl={6} className='p-0'>
            <CharityDescription charity={charity} toyId={animal.id} clickToBuyToy={toggleModal}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
