import React, { Component } from 'react'
import "./dashboard.css"

// import page 
import Page from "./page"
import Edit from "./editeur"
import Share from "./share"

export default class dashboard extends Component {

    state = {
        page: null
    }

    componentDidMount() {
        var id = this.props.id;
        if (id === null) {
            document.getElementById('home').classList.add('item-selected')
        }
        if (id === "add") {
            document.getElementById('add').classList.add('item-selected')
        }
        if (id === "edit") {
            document.getElementById('edit').classList.add('item-selected')
        }
        if (id === "share") {
            document.getElementById('share').classList.add('item-selected')
        }
        if (id === "stats") {
            document.getElementById('stats').classList.add('item-selected')
        }

        this.setState({
            page: id
        })
    }


    changePage = e => {
        var idPage = e.target.id;
        console.log(idPage)
        document.getElementById('home').classList.remove('item-selected')
        document.getElementById('add').classList.remove('item-selected')
        document.getElementById('edit').classList.remove('item-selected')
        document.getElementById('share').classList.remove('item-selected')
        // document.getElementById('stats').classList.remove('item-selected')

        document.getElementById(idPage).classList.add("item-selected")

        this.setState({
            page: idPage
        })
    }


    render() {
        return (
            <div className="body-dashboard">

                {/* left menu  */}
                <div className="left-menu">

                    <div className="bloc-menu">
                        <div className="item-in-menu" id="home" onClick={this.changePage}>
                            <svg xmlns="http://www.w3.org/2000/svg" id="home" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect id="home" width="256" height="256" fill="none"></rect><path id="home" d="M151.99414,207.99263v-48.001a8,8,0,0,0-8-8h-32a8,8,0,0,0-8,8v48.001a8,8,0,0,1-7.999,8l-47.99414.00632a8,8,0,0,1-8.001-8v-92.4604a8,8,0,0,1,2.61811-5.91906l79.9945-72.73477a8,8,0,0,1,10.76339-.00036l80.0055,72.73509A8,8,0,0,1,216,115.53887V207.999a8,8,0,0,1-8.001,8l-48.00586-.00632A8,8,0,0,1,151.99414,207.99263Z" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                        </div>

                        <div className="item-in-menu" id="add" onClick={this.changePage}>
                            <svg xmlns="http://www.w3.org/2000/svg" id="add" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect id="add" width="256" height="256" fill="none"></rect><line id="add" x1="40" y1="128" x2="216" y2="128" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line id="add" x1="128" y1="40" x2="128" y2="216" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                        </div>

                        <div className="item-in-menu" id="edit" onClick={this.changePage}>
                            <svg xmlns="http://www.w3.org/2000/svg" id="edit" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect id="edit" width="256" height="256" fill="none"></rect><polygon id="edit" points="128 160 96 160 96 128 192 32 224 64 128 160" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polygon><line id="edit" x1="168" y1="56" x2="200" y2="88" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path id="edit" d="M216,120v88a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h88" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                        </div>

                        <div className="item-in-menu" id="share" onClick={this.changePage}>
                            <svg xmlns="http://www.w3.org/2000/svg" id="share" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" id="share" height="256" fill="none"></rect><polyline id="share" points="176 152 224 104 176 56" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><path id="share" d="M192,216H40a8,8,0,0,1-8-8V88" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path id="share" d="M75.0245,175.99967A96.04041,96.04041,0,0,1,168,104h56" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                        </div>

                        {/* <div className="item-in-menu" id="stats" onClick={this.changePage}> */}
                            {/* <svg xmlns="http://www.w3.org/2000/svg" id="stats" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect id="stats" width="256" height="256" fill="none"></rect><polyline id="stats" points="44 208 44 136 100 136" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><line id="stats" x1="228" y1="208" x2="28" y2="208" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><polyline id="stats" points="100 208 100 88 156 88" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><rect id="stats" x="156" y="40" width="56" height="168" stroke-width="16" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"></rect></svg> */}
                        {/* </div> */}
                    </div>

                </div>

                <div className="page-content">

                    {this.state.page === "add" && <Page />}


                    {this.state.page === "edit" && <Edit />}

                    
                    {this.state.page === "share" && <Share />}

                </div>


            </div>
        )
    }
}
