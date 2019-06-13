import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Form, FormGroup, Label, Input,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Side from '../Side';
import img from '../../../assets/developers_2_A1_Rectangle_58_pattern.png';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  onChange = (e) => {
    const { onInputChange } = this.props;
    onInputChange({ field: e.target.name, value: e.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className="wrapper">
          <section className="col-12 col-lg-8 col-md-10 col-sm-10">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-10 col-lg-7 signup-container text-center">
                  <Side img={img} />
                </div>
                <div className="col-12 col-md-10 col-lg-5 sign-up">
                  <Form onSubmit={this.onSubmit}>
                    <h3 className="sign-up-title mt-4 text-center">
                      sign
                      <span>in</span>
                    </h3>
                    <FormGroup>
                      <Label className="label-color">Email</Label>
                      <Input
                        className="input-color"
                        type="email"
                        name="email"
                        placeholder="snowice@company.com"
                        onChange={this.onChange}
                        value="email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="label-color">Password</Label>
                      <Input
                        className="input-color"
                        type="password"
                        name="password1"
                        placeholder="password"
                        pattern="[a-zA-Z0-9]"
                        onChange={this.onChange}
                        value="password"
                      />
                    </FormGroup>
                    <div className="text-center mb-4">
                      <button type="button" className="sign-up-btn">Login</button>
                    </div>

                    <div className="sign-up-footer">
                      <p>
                        Don't have an account?
                        <a href="/sign-up"> sign up</a>
                      </p>
                      <p>
                        By signing up you agree to all
                        <Link to="/"> Terms and conditions</Link>
                      </p>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </section>

        </div>
      </Fragment>
    );
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => ({

});

export const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
