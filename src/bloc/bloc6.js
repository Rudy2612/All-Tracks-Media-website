import React, { Component } from 'react'
import "./bloc.css"

export default class bloc6 extends Component {

    state = {
        titre: "",
        para: ""
    }

    componentDidMount() {
        this.setState({
            titre: this.props.titre,
            para: this.props.para,
        })
    }

    

    render() {
        return (
            <div>
                <div className="">
                    <h4 className="title-bloc-princ">{this.state.titre}</h4>
                    <p className="para-bloc-princ">{this.state.para}</p>
                </div>
            </div>
        )
    }
}
