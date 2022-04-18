import React, { Component } from 'react'
import './static.css'

import Logo from "../data/logo.png"
import Top from "../data/top.jpg"

import Car1 from "../data/Car1.jpg"
import Car2 from "../data/Car2.jpg"
import Car3 from "../data/Car3.jpg"

import Blocphoto1 from "../data/blocphoto1.jpg"
import Blocphoto2 from "../data/blocphoto2.jpg"
import Blocphoto3 from "../data/blocphoto3.jpg"
import Blocphoto4 from "../data/blocphoto4.jpg"
import Blocphoto5 from "../data/blocphoto5.jpg"
import Blocphoto6 from "../data/blocphoto6.jpg"


import SSV from "../data/ssvmedia.png"
import QUAD from "../data/quadmedia.png"

import { Link } from "react-router-dom"
import { init } from 'emailjs-com';
import emailjs from 'emailjs-com';

export default class all extends Component {

    state = {
        IDActive: 1,

        nom: "",
        prenom: "",
        mail: "",
        entreprise: "",
        objet: "",
        message: "",
    }

    sendMail = e => {
        var templateParams = {
            object: this.state.objet,
            message: this.state.message,
            nom: this.state.nom,
            prenom: this.state.prenom,
            mail: this.state.mail,
            entreprise: this.state.entreprise,
        };

        emailjs.send('service_wbheih6', 'template_z340z5f', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                if(response.status === 200){
                    document.getElementById('confirm-mail').innerHTML="Le message a bien été envoyé"
                }
            }, function (error) {
                console.log('FAILED...', error);
            });
    }

    handlechange = e =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentDidMount() {

        init("user_TwUUvcstEqoWC6zzQRCxj");


        // boucle carrousel
        setInterval(() => {
            var IDactive;
            var Car1 = document.getElementById('1')
            var Car2 = document.getElementById('2')
            var Car3 = document.getElementById('3')

            if (this.state.IDActive === 1) {
                if (Car1 && Car2) {
                    Car1.classList.add('arrived')
                    Car2.classList.add('active')
                    IDactive = 2
                    setTimeout(() => {
                        Car1.classList.remove('active')
                        Car1.classList.remove('arrived')
                    }, 1000);
                }
            }

            if (this.state.IDActive === 2) {
                if (Car3 && Car2) {
                    Car2.classList.add('arrived')
                    Car3.classList.add('active')
                    IDactive = 3
                    setTimeout(() => {
                        Car2.classList.remove('active')
                        Car2.classList.remove('arrived')
                    }, 1000);
                }
            }

            if (this.state.IDActive === 3) {
                if (Car3 && Car1) {
                    Car3.classList.add('arrived')
                    Car1.classList.add('active')
                    IDactive = 1
                    setTimeout(() => {
                        Car3.classList.remove('active')
                        Car3.classList.remove('arrived')
                    }, 1000);
                }
            }

            this.setState({ IDActive: IDactive })
        }, 5000);
    }

    render() {
        return (
            <div>

                <section className="section-all" style={{ background: `url("${Top}")`, backgroundSize: "cover", backgroundPosition: "center" }}>
                    <img className="logo-all-t" alt="All Tracks Media" src={Logo}></img>
                </section>


                <section className="section-all" id="photo">
                    <div className="section-flex">
                        <div className="section-50">
                            <div className="bloc-text-photo">
                                <h2 className="title-photo">PHOTOGRAPHIE</h2>
                                <p className="sous-title-photo">ÉVÉNEMENTIEL, INDUSTRIEL ET SPORTS MECANIQUES.</p>
                                <p className="para-photo">Faites revivre vos événements aux participants et mettez en valeur vos partenaires grâce à des photos haute définition de qualité professionnelle</p>
                                <Link to="/photographie">
                                    <p className="website-photo">
                                        SITE INTERNET
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="64" y1="192" x2="192" y2="64" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><polyline points="88 64 192 64 192 168" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>
                                    </p>
                                </Link>
                            </div>
                        </div>
                        <div className="section-50">
                            <div className="bloc-photo">
                                <div className="miniflex-photo">
                                    <div className="w-33">
                                        <img className="bloc-img-30" src={Blocphoto1}></img>
                                    </div>
                                    <div className="w-33">
                                        <img className="bloc-img-30" src={Blocphoto2}></img>
                                    </div>
                                    <div className="w-33">
                                        <img className="bloc-img-30" src={Blocphoto3}></img>
                                    </div>
                                </div>
                                <div className="miniflex-photo" style={{ marginTop: "20px" }}>
                                    <div className="w-50">
                                        <img className="bloc-img-30" src={Blocphoto4}></img>
                                    </div>
                                    <div className="w-50">
                                        <img className="bloc-img-30 l30l30" src={Blocphoto5}></img>
                                        <img className="bloc-img-30 l30l30" src={Blocphoto6} style={{ marginTop: "15px" }}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="section-all" id="media">
                    <div className="section-flex">
                        <div className="section-40">

                            <div className="body-caroussel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active" id="1">
                                        <img className="carIMG" id="1" src={Car1}></img>
                                    </div>
                                    <div className="carousel-item" id="2">
                                        <img className="carIMG" id="2" src={Car2}></img>
                                    </div>
                                    <div className="carousel-item" id="3">
                                        <img className="carIMG" id="3" src={Car3}></img>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="section-60">
                            <h3 className="arr-title-media">2 MEDIAS</h3>
                            <h3 className="title-media">REPORTAGES / REDACTION</h3>

                            <br></br>
                            <br></br>

                            <div className="align-media">
                                <img alt="SSV MEDIA" className="logo-media" src={SSV}></img>
                                <p className="para-media">“PREMIER SITE FRANÇAIS SUR LES SSV”</p>
                                <a className="website-Media" href="https://ssvmedia.fr/">SITE INTERNET</a>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="align-media">
                                <img alt="SSV MEDIA" className="logo-media" src={QUAD}></img>
                                <a className="website-Media" href="https://quadmedia.fr/">SITE INTERNET</a>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="section-all sec-contact" id="contact">
                    <h4 className="title-contact">NOUS CONTACTER</h4>
                    <p className="confirm-mail" id="confirm-mail"></p>
                    <div className="form-contact">
                        <div className="section-flex">
                            <div className="section-50">
                                <input type="text" className="input-form-contact" id="nom" placeholder="Nom" onChange={this.handlechange}></input>
                            </div>
                            <div className="section-50">
                                <input type="text" className="input-form-contact" id="prenom" placeholder="Prenom" onChange={this.handlechange}></input>
                            </div>
                        </div>
                        <br></br>
                        <div className="section-flex">
                            <div className="section-50">
                                <input type="text" className="input-form-contact" id="mail" placeholder="Mail"  onChange={this.handlechange}></input>
                            </div>
                            <div className="section-50">
                                <input type="text" className="input-form-contact" id="entreprise" placeholder="Entreprise" onChange={this.handlechange}></input>
                            </div>
                        </div>
                        <br></br>
                        <input type="text" className="input-form-contact" style={{ width: "98%" }} id="objet" placeholder="Objet du message" onChange={this.handlechange}></input>
                        <br></br>
                        <br></br>
                        <textarea type="text" rows="3" className="input-form-contact" style={{ width: "98%", height: "auto" }} id="message" placeholder="Message" onChange={this.handlechange}></textarea>
                        <div style={{ textAlign: "center" }}>
                            <div className="button-send-contact" id="send-contact" onClick={this.sendMail}>Envoyer</div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}
