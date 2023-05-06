import React, { ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Button, Form } from 'react-bootstrap';

interface CustomField {
  name: string;
  value: string;
}

type CustomFields = {
    name: string;
    value: string;
    [key: string]: string; // index signature allowing string keys with string values
  }[];

function ProductForm() {
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
  

  const handleAddCustomField = () => {
    setCustomFields([...customFields, { name: '', value: '' }]);
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
  

  return (
    <>
      <h1>Add New Food</h1>
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
          <Button variant="primary" type="submit">Submit</Button>
          <Button variant="success" type="button" onClick={handleAddCustomField}>New Field</Button>
          <Button variant="warning" type="button" onClick={() => setCustomFields([])}>Clear Custom Fields</Button>
          <Button variant="danger" type="button" onClick={() => handleClear()}>Clear All</Button>
        </div>
      </Form>
    </>
  );
}

export default withAuthenticationRequired(ProductForm);
