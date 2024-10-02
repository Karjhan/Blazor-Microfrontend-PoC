import React from 'react'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';

const CharityDescription = ({charity, toyId, clickToBuyToy}) => {
  return (
        <Card style={{borderRadius :'0', height: "100%"}} className='justify-content-center'>
            <Row className="no-gutters m-0 p-0 align-items-center">
                <Col xs={12} md={4} className='d-flex justify-content-center align-items-center p-0'>
                    <Card.Img
                        src={charity.logoUrl}
                        alt={charity.name}
                        className='charity-image'
                    />
                </Col>
                <Col xs={12} md={8} className='p-0'>
                    <Card.Body>
                        <Card.Title>{charity.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{charity.location}</Card.Subtitle>
                        <Card.Text>
                            {charity.story}
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <ProgressBar animated now={((charity.currentStage/charity.goalPrice)*100)} label={`${((charity.currentStage/charity.goalPrice)*100)}%`} />
                        <div className='d-flex justify-content-between mb-4'>
                            <small>{charity.currentStage + " $"}</small>
                            <small>{charity.goalPrice + " $"}</small>
                        </div>
                        <div className='m-0 p-0 w-100 d-flex justify-content-center'>
                            <Button onClick={() => clickToBuyToy(toyId)}>Support Us</Button>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
  )
}

export default CharityDescription