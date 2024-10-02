import React from 'react'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

const AnimalDescription = ({ animal }) => {
  return (
    <Card style={{borderRadius :'0', height: "100%"}} className='justify-content-center'>
       <Row className="no-gutters m-0 p-0">
            <Col>
                <Card.Body>
                    <Card.Title>{animal.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{animal.description}</Card.Subtitle>
                    <Card.Img
                        src={animal.imageUrl}
                        alt={animal.name}
                    />
                    <Card.Text>
                        {animal.story}
                    </Card.Text>
                </Card.Body>
            </Col>
        </Row> 
    </Card>
  )
}

export default AnimalDescription