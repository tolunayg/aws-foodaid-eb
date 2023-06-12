
import React, { useEffect, useState } from 'react'
import { getDistributionPoints } from '../service'
import { IGetDistributionPoints } from '../models/IGetDistributionPoints';
import { Button, Card, Col, Modal, Nav, Row } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import DistributionPointDetail from '../components/DistributionPointDetail';

function DistributionPoint() {
  const [distributionPointData, setDistributionPointData] = useState<IGetDistributionPoints[]>()
  const [showModal, setShowModal] = useState(false);
  const [selectedDistributionPoint, setSelectedDistributionPoint] = useState<IGetDistributionPoints>();

  useEffect(() => {
    const fetchData = async () => {

      try {
        const accessToken = localStorage.getItem('token');
        const data = await getDistributionPoints(accessToken!);
        setDistributionPointData(data);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (distributionPoint: IGetDistributionPoints) => {
    setSelectedDistributionPoint(distributionPoint);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDistributionPoint(undefined);
    setShowModal(false);
  };


  return (
    <>
      <h1 className="display-4">Distribution Point</h1>

      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
        <NavLink to="/distribution-points/add">
          <Button variant="success" type="submit">Add Distribution Point</Button>
        </NavLink>
        {/* <NavLink to="/distribution-point/edit">
          <Button variant="warning" type="submit">Edit Distribution Point</Button>
        </NavLink> */}
      </div>


      <Row xs={1} md={2} lg={2} xl={3} className="g-4">
        {distributionPointData?.map((distributionPoint) => (
          <Col key={distributionPoint._id}>
            <Card onClick={() => handleCardClick(distributionPoint)} className="card-hover">
              <Card.Body>
                <Card.Title className="text-truncate" style={{ maxHeight: '3.6em' }}>{distributionPoint.distributionPointName}</Card.Title>
                <Card.Text className="text-truncate" style={{ maxHeight: '3.6em' }}>
                  This is a summary of {distributionPoint.distributionPointName}.
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


      <DistributionPointDetail distributionPoint={selectedDistributionPoint} showModal={showModal} handleCloseModal={handleCloseModal} />


      {/* <Form/>
        <MyComponent/>  */}

    </>
  )
}

// export default withAuthenticationRequired(DistributionPoint);
export default DistributionPoint;
