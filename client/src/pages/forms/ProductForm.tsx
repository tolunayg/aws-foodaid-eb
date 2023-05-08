import React, { ChangeEvent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { getProductById } from '../../service';

enum Mode {
    Add = 'add',
    Edit = 'edit'
}

type Props = {
    mode: Mode;
  };

interface CustomField {
  name: string;
  value: string;
}

function ProductForm() {
    // const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const { state } = useLocation();
    const productId = state?.productId;
    const mode:Mode = productId ? Mode.Edit : Mode.Add;
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      unit: '',
    },
    onSubmit: (values) => {
        const customFieldsObj: Record<string, string> = {};
        customFields.forEach((customField) => {
          customFieldsObj[customField.name] = customField.value;
        });
        const newValues = { ...values, customFields: customFieldsObj };
        console.log(newValues);
      },
      
  });


  useEffect(() => {
    // Make API call to get product details based on `productId`
    // Set the initial values
    if (mode === 'edit' && productId) {
        const fetchData = async () => {

        try {
            // const accessToken = await getAccessTokenSilently();
            const accessToken = '123';
            const data = await getProductById(accessToken, productId);
            console.log(data);
            // Set form values from data
            const updatedInitialValues = {
              name: data.name,
              category: data.productCategoryId,
              unit: data.unit,
            };
            // Set the form values from the updated initial values
            formik.setValues(updatedInitialValues);

        } catch (error) {
            console.error(error);
        }
        };
        fetchData();
    }
}, [mode, productId]);
 

  const handleAddCustomField = () => {
    setCustomFields([...customFields, { name: '', value: '' }]);
  };

  const handleSubmitButton = () => {
    if (mode === 'edit' && productId) {
        console.log("IN EDIT MODE, UPDATE")
        
    }
    else {
        console.log("IN ADD MODE, CREATE")
    }
  };

  const handleCustomFieldNameChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newCustomFields = [...customFields];
    newCustomFields[index].name = event.target.value;
    setCustomFields(newCustomFields);
  };

  const handleCustomFieldValueChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newCustomFields = [...customFields];
    newCustomFields[index].value = event.target.value;
    setCustomFields(newCustomFields);
  };

  const handleClear = () => {
    formik.resetForm();
    setCustomFields([]);
  };
  
  const headingText = mode === Mode.Add ? 'Add New Food' : 'Edit Food';
  
  return (

    <>
      <h1>{headingText}</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" id="category" name="category" value={formik.values.category} onChange={formik.handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Unit</Form.Label>
          <Form.Control type="text" id="unit" name="unit" value={formik.values.unit} onChange={formik.handleChange} />
        </Form.Group>

        {customFields.map((field, index) => (
          <div className="mb-3" key={index}>
            <Form.Label>Custom Field Name</Form.Label>
            <Form.Control type="text" value={field.name} onChange={(event: ChangeEvent<HTMLInputElement>) => handleCustomFieldNameChange(event, index)} />


            <Form.Label>Custom Field Value</Form.Label>
            <Form.Control type="text" value={field.value} onChange={(event: ChangeEvent<HTMLInputElement>) => handleCustomFieldValueChange(event, index)} />

          </div>
        ))}

        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-3">
          <Button variant="primary" type="submit" onClick={handleSubmitButton}>Submit</Button>
          <Button variant="success" type="button" onClick={handleAddCustomField}>New Field</Button>
          <Button variant="warning" type="button" onClick={() => setCustomFields([])}>Clear Custom Fields</Button>
          <Button variant="danger" type="button" onClick={() => handleClear()}>Clear All</Button>
        </div>
      </Form>
    </>
  );
}

// export default withAuthenticationRequired(ProductForm);
export default ProductForm;
