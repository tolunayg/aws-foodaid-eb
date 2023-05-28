import React, { useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { getCollectionPoints, getProducts, addInventory } from '../../service'; // Replace 'your-api-file' with the actual file containing the API functions
import { IGetProducts } from '../../models/IGetProducts'; // Replace 'your-models-file' with the actual file containing the interfaces
import { IGetCollectionPoints } from '../../models/IGetCollectionPoints'; // Replace 'your-models-file' with the actual file containing the interfaces

function InventoryForm() {
  interface IInventoryItem {
    product: string;
    quantity: number;
    customFields: {
      [key: string]: string;
    };
  }

  const [collectionPoints, setCollectionPoints] = useState<IGetCollectionPoints[]>([]);
  const [products, setProducts] = useState<IGetProducts[]>([]);

  const formik = useFormik({
    initialValues: {
      collectionPointId: '',
      items: [{ product: '', quantity: 0, customFields: {} }],
    },
    onSubmit: async (values) => {
      try {
        const accessToken = '123'; // Replace with your access token retrieval logic
        console.log('API request:', JSON.stringify(values));
        const response = await addInventory(accessToken, values);
        console.log('API response:', response);
        // Handle success response
      } catch (error) {
        console.error('API error:', error);
        // Handle error
      }
    },
    validate: (values) => {
      const errors: {
        collectionPointId?: string;
        items?: Array<{ product?: string; unit?: string }>;
      } = {};
  
      if (!values.collectionPointId) {
        errors.collectionPointId = 'Collection Point is required';
      }
  
      values.items.forEach((item, index) => {
        if (!item.product) {
          if (!errors.items) {
            errors.items = [];
          }
          if (!errors.items[index]) {
            errors.items[index] = {};
          }
          errors.items[index].product = 'Product is required';
        }
  
        if (!item.quantity) {
          if (!errors.items) {
            errors.items = [];
          }
          if (!errors.items[index]) {
            errors.items[index] = {};
          }
          errors.items[index].unit = 'Unit is required';
        }
      });
  
      // console.log(errors)
      return errors;
    },

  });

  useEffect(() => {
    const fetchCollectionPoints = async () => {
      try {
        const accessToken = '123'; // Replace with your access token retrieval logic
        const points = await getCollectionPoints(accessToken);
        setCollectionPoints(points);
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

    fetchCollectionPoints();
    fetchProducts();
  }, []);

  const handleAddItem = () => {
    const newItems = [...formik.values.items, { product: '', quantity: 0, customFields: {} }];
    formik.setFieldValue('items', newItems);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newItems = [...formik.values.items];
    newItems[index].product = event.target.value;
    formik.setFieldValue('items', newItems);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newItems = [...formik.values.items];
    newItems[index].quantity = Number(event.target.value);
    formik.setFieldValue('items', newItems);
  };

  // Function to handle changes in custom fields for a specific request item
  const handleCustomFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index: number,
    field: string
  ) => {
    const newItems: IInventoryItem[] = [...formik.values.items];
    newItems[index].customFields[field] = event.target.value;
    formik.setFieldValue('items', newItems);
  };


  return (
    <>
      <h1>Add Inventory</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Collection Point</Form.Label>
          <Form.Select
            id="collectionPointId"
            name="collectionPointId"
            value={formik.values.collectionPointId}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.collectionPointId} // Highlight invalid field
          >
            <option value="">Select a collection point</option>
            {collectionPoints.map((point) => (
              <option key={point._id} value={point._id}>
                {point.collectionPointName}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.collectionPointId}
          </Form.Control.Feedback>
        </Form.Group>

        {formik.values.items.map((item, index) => (
          <div key={index} className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Select
                value={item.product}
                onChange={(event) => handleProductChange(event, index)}
                isInvalid={!!(formik.errors.items?.[index] as FormikErrors<{
                  product: string;
                  unit: number;
                  customFields: {};
                }>)?.product} // Highlight invalid field
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {(formik.errors.items?.[index] as FormikErrors<{
                  product: string;
                  unit: number;
                  customFields: {};
                }>)?.product}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Quantity {`(${products.find((product) => product._id === item.product)?.unit})`}
              </Form.Label>
              <Form.Control
                type="number"
                value={item.quantity}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleQuantityChange(event, index)}
                isInvalid={ // Highlight invalid field
                  !!(formik.errors as any)[`requestItems[${index}].unit`] ||
                  (item.quantity === 0 && formik.touched.items?.[index]?.quantity)
                }
                required // Add the "required" attribute
              />
              <Form.Control.Feedback type="invalid">
                {(formik.errors as any)[`requestItems[${index}].unit`]}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Render custom fields for the selected product */}
            {item.product && products.find((product) => product._id === item.product)?.fields && (
              <>
                {Object.entries(
                  (products.find((product) => product._id === item.product)?.fields || {}) as { [key: string]: string }
                ).length > 0 && (
                  <Form.Label>Custom Fields</Form.Label>
                )}
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
        <Button variant="success" onClick={handleAddItem}>Add Item</Button>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </>
  );
}

export default InventoryForm;
