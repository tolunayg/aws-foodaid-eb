
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IGetCollectionPoints } from '../models/IGetCollectionPoints';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import './CollectionPointDetail.css';

interface Props {
    collectionPoint?: IGetCollectionPoints;
    showModal: boolean;
    handleCloseModal: () => void;
  }


function CollectionPointDetail({ showModal, handleCloseModal, collectionPoint }: Props) {

    const navigate = useNavigate()
    
    const handleEditClicked = (id:string) => {
        console.log("EDIT CLICKED!!");
        navigate('/collection-points/add', { state: { distributionPointId: id } });
      };
    
    return (
        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
            <Modal.Title>{collectionPoint?.city}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="collection-point-details">
                <p><span className="label">City:</span> {collectionPoint?.city}</p>
                <p><span className="label">District:</span> {collectionPoint?.district}</p>
                <p><span className="label">Collection Point Name:</span> {collectionPoint?.collectionPointName}</p>
                <p><span className="label">Address:</span> {collectionPoint?.address}</p>
            </div>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
                Close
            </Button>
            <Button variant="primary" onClick={() => collectionPoint?._id && handleEditClicked(collectionPoint._id)}>
                Edit
            </Button>
            </Modal.Footer>
        </Modal>
        );
}

export default CollectionPointDetail;