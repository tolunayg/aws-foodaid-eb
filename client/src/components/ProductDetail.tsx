
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IGetProducts } from '../models/IGetProducts';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { URLEnum } from '../RouterEnum';

interface Props {
    product?: IGetProducts;
    showModal: boolean;
    handleCloseModal: () => void;
  }


function ProductDetail({ showModal, handleCloseModal, product }: Props) {

    const navigate = useNavigate()
    
    const handleEditClicked = (id:string) => {
        console.log("EDIT CLICKED!!");
        navigate('/food/add', { state: { productId: id } });
      };
    
    return (
        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
            <Modal.Title>{product?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>Description lorem ipsum</p>
            <p>Category: {product?.productCategoryId}</p>
            <p>Unit: {product?.unit}</p>
            <p>Id: {product?._id}</p>
            {product && Object.entries(product.fields).map(([key, value]) => (
                <p key={key}>{key}: {value}</p>
            ))}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
                Close
            </Button>
            <Button variant="primary" onClick={() => product?._id && handleEditClicked(product._id)}>
                Edit
            </Button>
            </Modal.Footer>
        </Modal>
        );
}

// export default withAuthenticationRequired(ProductDetail);
export default ProductDetail;