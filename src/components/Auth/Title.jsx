import React from 'react';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Title() {
  return (
    <Form>
      <h3 className="card-title">
        sign
        <span>up</span>
      </h3>
      <FormGroup>
        <Label for="exampleEmail">Username</Label>
        <Input type="username" name="username" placeholder="snow" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" placeholder="snowice@company.com" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Password</Label>
        <Input type="password" name="password" placeholder="password" pattern="[a-zA-Z0-9]" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Confirm Password</Label>
        <Input type="password" name="password" placeholder="password" pattern="[a-zA-Z0-9]" />
      </FormGroup>
      <div className="card-action">
        <Button>Signup</Button>
      </div>
      <div className="card-spacer" />
      <div className="card-footer">
        <p>
          Already have an account?
          <a href="../signinTemplate/signin.html">sign in</a>
        </p>
        <p>
          By signing up you agree to all
          <Link to="/"> Terms and conditions</Link>
        </p>
      </div>
    </Form>
  );
}
