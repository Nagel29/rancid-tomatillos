import React, { Component } from 'react';
import './Form.css';
import PropTypes from 'prop-types';

class Form extends Component {
    constructor() {
        super()
        this.state = {
            searchInput: '',
        }
    }

    componentDidMount() {
        this.filterMovies();
    }

    updateForm = (event) => {
        this.setState({searchInput: event.target.value}, this.filterMovies)
    }

    filterMovies() {
        this.props.filterByTitle(this.state.searchInput);
    }

    render() {
        return(
            <form>
                <label>
                Search by Title: 
                    <input
                        type='search'
                        placeholder={this.state.searchInput}
                        name='search'
                        value={this.state.searchInput}
                        onChange={(event) => this.updateForm(event)}
                    />
                </label>
            </form>
        )}
}

export default Form

Form.propTypes = {
    filterByTitle: PropTypes.func.isRequired,
}
