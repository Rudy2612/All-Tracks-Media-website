import React, { Component } from 'react'
import firebase from "firebase"
import "./home.css"
import { Link, Redirect } from "react-router-dom"

export default class home extends Component {

    state = {
        data: [],
        moov: true,
        redirect: false,
        redirectionLink: "",
    }


    componentDidMount() {
        var db = firebase.firestore();

        db.collection("files").get().then((querySnapshot) => {
            var data = []
            var datatemp = []
            querySnapshot.forEach((doc) => {
                datatemp = []
                console.log(doc.id, " => ", doc.data());
                var datar = doc.data()
                datatemp.push(datar.titre)
                datatemp.push(doc.data())
                data.push(datatemp)
            });
            // dans le tableau:
            // [0]; nom de la page
            // [1]: contenue de la page
            this.setState({ data: data })
        });

    }

    setIMG = e => {
        var elements = e.target.id
        var photo = elements.split(',')
        photo = photo[0]
        var image = document.getElementById('imgHover')
        image.src = photo
    }

    targetIMG = e => {

        var image = document.getElementById('imgHover')
        if (this.state.moov === true) {
            image.style.left = e.clientX + "px";
            image.style.top = e.clientY + "px";
        }
        var opa = Number(image.style.opacity)
        if (Math.round((e.clientX / window.screen.width) * 100) >= 60) {
            opa = opa - 0.02
            image.style.opacity = opa
        }
        else {
            if (opa < 0.2) {
                opa = opa + 0.02
                image.style.opacity = opa
            }
        }

        var hauteurPage = Math.round((e.clientY / window.screen.height) * 100)
        var progress = document.getElementById('progress-bar')
        progress.style.height = `${hauteurPage / 1.35}%`
    }


    redirect = e => {
        var elements = e.target.id
        var lien = elements.split(',')
        lien = lien[1]
        
        this.setState({ moov: false })
        var photog = document.getElementById('imgHover')
        photog.classList.add('agrandissement')
        photog.style.left = "0px";
        photog.style.top = "0px";
        photog.style.transform = "translate(0,0)";

        setTimeout(()=>{
            this.setState({
                redirectionLink: lien,
                redirect: true,
            })
        }, 600)
    }


    render() {

        var listingMenu = Object.keys(this.state.data).map((key) => {
            return (<>
                {/* <Link to={`/project/${this.state.data[key][1].URL}`}> */}
                <div onClick={this.redirect} id={`${this.state.data[key][1].PHOTO},${this.state.data[key][1].URL}`}>
                    <h1 className="item-listingMenu" id={`${this.state.data[key][1].PHOTO},${this.state.data[key][1].URL}`} onMouseOver={this.setIMG}>
                        {this.state.data[key][0]}
                    </h1>
                </div>
                {/* </Link> */}</>
            )
        })


        return (
            <>
                {this.state.redirect === true && <>
                    <Redirect to={`/project/${this.state.redirectionLink}`} />
                </>}

                <div className="progress-bar-left"></div>
                <div className="progress-bar-left" id="progress-bar" style={{ background: "white", height: "0", transition: "200ms" }}></div>
                <div className="contact-button">CONTACT</div>
                <div className="photo-title">PHOTOGRAPHIE</div>
                <div className="reseaux-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="40" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="16"></circle><rect x="36" y="36" width="184" height="184" rx="48" stroke-width="16" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" fill="none"></rect><circle cx="180" cy="75.99998" r="12"></circle></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><path d="M168,88.00094H152a24,24,0,0,0-24,24v112" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><line x1="96" y1="144.00094" x2="160" y2="144.00094" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                </div>
                <div className="body-menu" onMouseMove={this.targetIMG}>
                    <div className="linstingMenu">
                        {listingMenu}
                    </div>
                    <img id="imgHover" className="img-listingMenu" style={{ opacity: "0.2" }} src={""}></img>
                </div>
            </>
        )
    }
}
