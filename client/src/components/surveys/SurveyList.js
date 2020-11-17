import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }
    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card" key={survey._id} >
                    <div className="card-content teal-text">
                        <span className="card-title">
                        {survey.title}
                        </span>
                        <p>{survey.body}</p>
                        <p className="right">
                            Sent On: { new Date(survey.dateSent).toLocaleDateString() }
                        </p>
                    </div>
                    <div className="card-action">
                        <a href="#">YES: {survey.yes}</a>
                        <a href="#">NO: {survey.no}</a>
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div>
                <h1 className="center grey-text">Your surveys</h1>
                {this.renderSurveys()}
            </div>
        )
    }
}

function mapStateToProps({ surveys }) {
    return { surveys }
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);