
import React, { useEffect, useState } from 'react'
import { getCollectionPoints } from '../service'
import { IGetCollectionPoints } from '../models/IGetCollectionPoints';
import { Button, Card, Col, Modal, Nav, Row } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import CollectionPointDetail from '../components/CollectionPointDetail';

function CollectionPoint() {
  const [collectionPointData, setCollectionPointData] = useState<IGetCollectionPoints[]>()
  const [showModal, setShowModal] = useState(false);
  const [selectedCollectionPoint, setSelectedCollectionPoint] = useState<IGetCollectionPoints>();

  useEffect(() => {
    const fetchData = async () => {

      try {
        const accessToken = localStorage.getItem('token');
        const data = await getCollectionPoints(accessToken!);
        setCollectionPointData(data);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (collectionPoint: IGetCollectionPoints) => {
    setSelectedCollectionPoint(collectionPoint);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCollectionPoint(undefined);
    setShowModal(false);
  };


  return (
    <>
      <h1 className="display-4">Collection Point</h1>

      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
        <NavLink to="/collection-points/add">
          <Button variant="success" type="submit">Add Collection Point</Button>
        </NavLink>
        
      </div>


      <Row xs={1} md={2} lg={2} xl={3} className="g-4">
        {collectionPointData?.map((collectionPoint) => (
          <Col key={collectionPoint._id}>
            <Card onClick={() => handleCardClick(collectionPoint)} className="card-hover">
              <Card.Body>
                <Card.Title className="text-truncate" style={{ maxHeight: '3.6em' }}>{collectionPoint.collectionPointName}</Card.Title>
                <Card.Text className="text-truncate" style={{ maxHeight: '3.6em' }}>
                {collectionPoint.district} / {collectionPoint.city}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Description of the product
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleCloseModal}>Save changes</Button>
        </Modal.Footer>
      </Modal> */}


      <CollectionPointDetail collectionPoint={selectedCollectionPoint} showModal={showModal} handleCloseModal={handleCloseModal} />


      {/* <Form/>
        <MyComponent/>  */}

    </>
  )
}

export default CollectionPoint;
