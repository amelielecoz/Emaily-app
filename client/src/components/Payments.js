import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payment extends Component {
    render() {
        return (
            <StripeCheckout 
                name="Emaily"
                description="Pay $5 to get 5 credits"
                amount={500} 
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add credits
                </button>
                </StripeCheckout>
        )
    }
 }

 export default connect(null, actions)(Payment);