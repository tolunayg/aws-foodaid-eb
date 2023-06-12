
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IGetDistributionPoints } from '../models/IGetDistributionPoints';
import { useNavigate } from 'react-router-dom';
import './DistributionPointDetail.css';

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
            <div className="distribution-point-details">
                <p><span className="label">City:</span> {distributionPoint?.city}</p>
                <p><span className="label">District:</span> {distributionPoint?.district}</p>
                <p><span className="label">Distribution Point Name:</span> {distributionPoint?.distributionPointName}</p>
                <p><span className="label">Address:</span> {distributionPoint?.address}</p>
            </div>

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