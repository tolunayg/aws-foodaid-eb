import React, { ChangeEvent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { createProduct, getProductById, updateProduct, getProductCategories } from '../../service';
import { IGetProducts } from '../../models/IGetProducts';
import { IGetProductCategory } from '../../models/IGetProductCategories';
import { URLEnum } from '../../RouterEnum';

enum Mode {
  Add = 'add',
  Edit = 'edit'
}

type Props = {
  mode: Mode;
};

interface CustomField {
  name: string;
  type: string;
}


function ProductForm() {
  const navigate = useNavigate()
  const { state } = useLocation();
  const productId = state?.productId;
  const mode: Mode = productId ? Mode.Edit : Mode.Add;
  enum FieldType {
    Numeric = 'numeric',
    Text = 'text',
    Boolean = 'boolean',
  }

  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const [categories, setCategories] = useState<IGetProductCategory[]>([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      category: 0,
      unit: '',
    },
    onSubmit: (values) => {
      const customFieldsObj: Record<string, string> = {};
      customFields.forEach((customField) => {
        customFieldsObj[customField.name] = customField.type;
      });
      const newValues = { ...values, customFields: customFieldsObj };
      console.log(newValues);
      navigate(URLEnum.FOOD);
    },

  });

  const handleCustomFieldTypeChange = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
    const newCustomFields = [...customFields];
    newCustomFields[index].type = event.target.value;
    setCustomFields(newCustomFields);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        const categoryData = await getProductCategories(accessToken!);
        setCategories(categoryData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    // Make API call to get product details based on `productId`
    // Set the initial values
    if (mode === 'edit' && productId) {
      const fetchData = async () => {

        try {
          // const accessToken = await getAccessTokenSilently();
          const accessToken = localStorage.getItem('token');
          const data = await getProductById(accessToken!, productId);
          console.log(data);
          // Set form values from data
          const updatedInitialValues = {
            name: data.name,
            category: data.productCategoryId,
            unit: data.unit,
          };
          // Set the form values from the updated initial values
          formik.setValues(updatedInitialValues);


          // Create a new object with the custom field names and their values
          const customFieldsData = Object.entries(data.fields).map(([name, value]) => ({ name, type: 'text', value: String(value) }));
          console.log('customFieldsData: ', customFieldsData)
          setCustomFields(customFieldsData);


        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [mode, productId]);


  const handleAddCustomField = () => {
    setCustomFields([...customFields, { name: '', type: FieldType.Numeric }]);
  };

  const handleCustomFieldNameChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newCustomFields = [...customFields];
    newCustomFields[index].name = event.target.value;
    setCustomFields(newCustomFields);
  };

  // const handleCustomFieldTypeChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
  //   const newCustomFields = [...customFields];
  //   newCustomFields[index].type = event.target.value;
  //   setCustomFields(newCustomFields);
  // };

  const handleSubmitButton = async () => {
    const { name, category, unit } = formik.values;
    const fields = Object.fromEntries(customFields.map(customField => [customField.name, customField.type]));

    const product = {
      name,
      productCategoryId: category,
      unit,
      fields,
    };

    const accessToken = localStorage.getItem('token');

    if (mode === 'edit' && productId) {
      console.log("IN EDIT MODE, UPDATE");
      const updatedProduct = await updateProduct(accessToken!, productId, product);
      console.log(updatedProduct);
      // TODO: Update product and call
    } else {
      console.log("IN ADD MODE, CREATE");
      try {
        const createdProduct = await createProduct(accessToken!, product);
        console.log(createdProduct);
        // TODO: Handle successful creation
      } catch (error) {
        console.error(error);
        // TODO: Handle error
      }
    }
  };





  const handleClear = () => {
    formik.resetForm();
    setCustomFields([]);
  };

  const headingText = mode === Mode.Add ? 'Add New Food' : 'Edit Food';

  return (

    <>
      <h1 className="display-4">{headingText}</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
        </Form.Group>

        {/* <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" id="category" name="category" value={formik.values.category} onChange={formik.handleChange} />
        </Form.Group> */}

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" id="category" name="category" value={formik.values.category} onChange={formik.handleChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Unit</Form.Label>
          <Form.Control type="text" id="unit" name="unit" value={formik.values.unit} onChange={formik.handleChange} />
        </Form.Group>

        {customFields.map((field, index) => (
          <div className="mb-3" key={index}>
            <Form.Label>Custom Field Name</Form.Label>
            <Form.Control
              type="text"
              value={field.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) => handleCustomFieldNameChange(event, index)}
            />

            <Form.Label>Custom Field Type</Form.Label>
            <Form.Select
              value={field.type}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => handleCustomFieldTypeChange(event, index)}
            >
              <option value={FieldType.Numeric}>Numeric</option>
              <option value={FieldType.Text}>Text</option>
              <option value={FieldType.Boolean}>Boolean</option>
            </Form.Select>
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
