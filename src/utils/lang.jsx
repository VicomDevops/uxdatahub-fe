import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeLng } from '../actions/authActions';
// import { Input } from 'reactstrap';
import France from "../assets/france_flag.svg"
import UK from "../assets/england_flag.svg"
import "./utils.css";

class Lang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lngActive: this.props.auth.lng
        }
    }

    onChangeLang = ({ target: { value } }) => {
        this.setState({
            lngActive: value
        });
        this.props.changeLng(value);
    };
    render() {
        return (
            <div className="lang__ctn">
                <img src={France} alt="" className='lang' onClick={()=>this.props.changeLng("Fr")}/>
                <img src={UK} alt="" className='lang' onClick={()=>this.props.changeLng("En")}/>
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

Lang.propTypes = {
    auth: PropTypes.object
  };

export default connect(mapStateToProps, { changeLng })(Lang);
