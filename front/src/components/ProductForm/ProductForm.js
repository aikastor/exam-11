import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../UI/Form/FormElement";

class ProductForm extends Component {
  state = {
    category: '',
    title: '',
    price: '',
    image: '',
    description: null
  };

  submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      let value = this.state[key];

      if (key === 'description') {
        value = JSON.stringify(value);
      }

      formData.append(key, value);
    });

    formData.append('seller',this.props.seller);

    this.props.onSubmit(formData);
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  fileChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.files[0]
    })
  };

  render() {
    return (
      <Form onSubmit={this.submitFormHandler}>
        <FormElement
          type="select"
          id="category"
          value={this.state.category}
          onChange={this.inputChangeHandler}
          propertyName='category'
          title='Category'
          required={true}
        >

          <option value="">Please select a category...</option>
          {this.props.options.map(category => (
            <option key={category._id} value={category._id}>{category.title}</option>
          ))}
        </FormElement>
        <FormElement
          propertyName='title'
          type='text'
          value={this.state.title}
          title='title'
          onChange={this.inputChangeHandler}
        />
        <FormElement
          propertyName='price'
          type='number'
          title='price'
          required='true'
          onChange={this.inputChangeHandler}
        />
        <FormElement
          propertyName='description'
          type='text'
          value={this.state.description}
          title='description'
          onChange={this.inputChangeHandler}
        />
        <FormElement
          propertyName='image'
          title='image'
          type='file'
          onChange={this.fileChangeHandler}
          required={true}
        />

        <FormGroup row>
          <Col sm={{offset:2, size: 10}}>
            <Button type="submit" color="primary">Save</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default ProductForm;