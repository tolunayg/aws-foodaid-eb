
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IGetDistributionPoints } from '../models/IGetDistributionPoints';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

interface Props {
    distributionPoint?: IGetDistributionPoints;
    showModal: boolean;
    handleCloseModal: () => void;
  }


function DistributionPointDetail({ showModal, handleCloseModal, distributionPoint }: Props) {

    const navigate = useNavigate()
    
    const handleEditClicked = (id:string) => {
        console.log("EDIT CLICKED!!");
        navigate('/distribution-points/add', { state: { distributionPointId: id } });
      };
    
    return (
        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
            <Modal.Title>{distributionPoint?.city}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>City: {distributionPoint?.city}</p>
            <p>District: {distributionPoint?.district}</p>
            <p>DistributionPointName: {distributionPoint?.distributionPointName}</p>
            <p>Address: {distributionPoint?.address}</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
                Close
            </Button>
            <Button variant="primary" onClick={() => distributionPoint?._id && handleEditClicked(distributionPoint._id)}>
                Edit
            </Button>
            </Modal.Footer>
        </Modal>
        );
}

// export default withAuthenticationRequired(DistributionPointDetail);
export default DistributionPointDetail;