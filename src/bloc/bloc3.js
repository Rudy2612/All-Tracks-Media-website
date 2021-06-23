import React, { Component } from 'react'
import "./bloc.css"

export default class bloc3 extends Component {

    state = {
        photo1: "",
        photo2: "",
        titre: ""
    }

    componentDidMount() {
        this.setState({
            photo1: this.props.photo1,
            photo2: this.props.photo2,
            titre: this.props.titre,
        })
    }

    
    imgPOP = e => {
        this.setState({
            popIMG: true,
            imgClick: e.target.id
        })
    }

    closePOP = e =>{
        this.setState({
            popIMG: false,
            imgClick: ""
        })
    }


    render() {
        return (
            <>

                {/* IMAGE POP UP */}
                {this.state.popIMG === true && <>
                    <img className="img-click" src={this.state.imgClick}></img>
                    <div className="black-img-click" onClick={this.closePOP}></div>
                    <div className="close-img" onClick={this.closePOP}><svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="200" y1="56" x2="56" y2="200" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="200" y1="200" x2="56" y2="56" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg></div>
                </>}


                <div>
                    <div className="flex-bloc">
                        <div className="w-50-bloc">
                            <img className="img-bloc-50" src={this.state.photo1} onClick={this.imgPOP} id={this.state.photo1}></img>
                        </div>
                        <div className="w-50-bloc">
                            <img className="img-bloc-50" src={this.state.photo2} onClick={this.imgPOP} id={this.state.photo2}></img>
                        </div>
                    </div>
                    <h5 className="little-title-center">{this.state.titre}</h5>
                </div>

            </>
        )
    }
}
