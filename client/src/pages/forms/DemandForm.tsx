import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { getDistributionPoints, getProducts } from '../../service'; // Replace 'your-api-file' with the actual file containing the API functions
import { IGetProducts } from '../../models/IGetProducts'; // Replace 'your-models-file' with the actual file containing the interfaces
import { IGetDistributionPoints } from '../../models/IGetDistributionPoints'; // Replace 'your-models-file' with the actual file containing the interfaces






function DemandForm() {
  interface IRequestItem {
    product: string;
    unit: number;
    customFields: {
      [key: string]: string;
    };
  }
  
  const [distributionPoints, setDistributionPoints] = useState<IGetDistributionPoints[]>([]);
  const [products, setProducts] = useState<IGetProducts[]>([]);

  const formik = useFormik({
    initialValues: {
      distributionPoint: '',
      requestItems: [{ product: '', unit: 0, customFields: {} }],
    },
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
    },
  });

  useEffect(() => {
    const fetchDistributionPoints = async () => {
      try {
        const accessToken = '123'; // Replace with your access token retrieval logic
        const points = await getDistributionPoints(accessToken);
        setDistributionPoints(points);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProducts = async () => {
      try {
        const accessToken = '123'; // Replace with your access token retrieval logic
        const products = await getProducts(accessToken);
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDistributionPoints();
    fetchProducts();
  }, []);

  const handleAddRequestItem = () => {
    const newRequestItems = [...formik.values.requestItems, { product: '', unit: 0, customFields: {} }];
    formik.setFieldValue('requestItems', newRequestItems);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newRequestItems = [...formik.values.requestItems];
    newRequestItems[index].product = event.target.value;
    formik.setFieldValue('requestItems', newRequestItems);
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRequestItems = [...formik.values.requestItems];
    newRequestItems[index].unit = Number(event.target.value);
    formik.setFieldValue('requestItems', newRequestItems);
  };

  // Function to handle changes in custom fields for a specific request item
  const handleCustomFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index: number,
    field: string
  ) => {
    const newRequestItems: IRequestItem[] = [...formik.values.requestItems];
    newRequestItems[index].customFields[field] = event.target.value;
    formik.setFieldValue('requestItems', newRequestItems);
  };
  


  return (
    <>
      <h1>Add New Demand</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Distribution Point</Form.Label>
          <Form.Select
            id="distributionPoint"
            name="distributionPoint"
            value={formik.values.distributionPoint}
            onChange={formik.handleChange}
          >
            <option value="">Select a distribution point</option>
            {distributionPoints.map((point) => (
              <option key={point._id} value={point._id}>
                {point.distributionPointName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {formik.values.requestItems.map((item, index) => (
          <div key={index} className="mb-3">
            <Form.Label>Request Item {index + 1}</Form.Label>
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Select
                value={item.product}
                onChange={(event) => handleProductChange(event, index)}
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
            <Form.Control
              type="number"
              value={item.unit}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUnitChange(event, index)}
            />
          </Form.Group>


           {/* Render custom fields for the selected product */}
          {item.product && products.find((product) => product._id === item.product)?.fields && (
            <>
              <Form.Label>Custom Fields</Form.Label>
              {Object.entries(
                (products.find((product) => product._id === item.product)?.fields || {}) as { [key: string]: string }
              ).map(([field, fieldType]) => (
                <Form.Group key={field} className="mb-3">
                  <Form.Label>{field}</Form.Label>
                  <Form.Control
                    type={fieldType}
                    value={(item.customFields as { [key: string]: string })[field] || ''}
                    onChange={(event) => handleCustomFieldChange(event, index, field)}
                  />
                </Form.Group>
              ))}

            </>
          )}

          </div>
        ))}
        <Button variant="success" onClick={handleAddRequestItem}>Add Request Item</Button>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </>
  );
}

export default DemandForm;
