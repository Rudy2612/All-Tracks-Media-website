import React, { Component } from 'react'
import "./project.css"
import firebase from "firebase"
import { Link } from "react-router-dom"

import Blocs1 from "../bloc/bloc1"
import Blocs2 from "../bloc/bloc2"
import Blocs3 from "../bloc/bloc3"
import Blocs4 from "../bloc/bloc4"
import Blocs5 from "../bloc/bloc5"
import Blocs6 from "../bloc/bloc6"




export default class project extends Component {


    state = {
        data: [],
        blocs: [],
        otherProject: []
    }



    componentDidMount() {

        var db = firebase.firestore();

        var id = this.props.id

        var docRef = db.collection("files").doc(id);

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                var doc = doc.data()
                this.setState({
                    data: doc,
                    blocs: doc.blocs,
                    id: id
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });


        // GET ALL PROJECT
        var db = firebase.firestore();

        db.collection("files").get().then((querySnapshot) => {
            var data = []
            var dataAllTemps = []
            querySnapshot.forEach((doc) => {
                dataAllTemps = []
                console.log(doc.id, " => ", doc.data());
                var datar = doc.data()
                if (datar.URL != id) {
                    dataAllTemps.push(doc.data())
                    data.push(dataAllTemps)
                }
            });
            // dans le tableau:
            // [0]; nom de la page
            // [1]: contenue de la page
            if (data[0] != undefined)
                this.setState({ otherProject: data[0] })
            else
            this.setState({ otherProject: [] })
        });


        var documents = document.getElementById('project')
        console.log(documents)
        documents.addEventListener('wheel', (e) => {
            var photo = document.getElementById('img-princ-top-fond')
            var opacity = Number(photo.style.opacity)
            console.log(opacity)
            if (e.deltaY === 100) {
                opacity = opacity - 0.04

            }
            else {
                if (opacity < 0.3) {
                    opacity = opacity + 0.04
                }

            }
            photo.style.opacity = opacity
        })


    }




    render() {

        var blocs = this.state.blocs
        var renderBlocs = Object.keys(this.state.blocs).map((key) => {
            if (blocs[key].id === 1) {
                return (<div className="start-bloc"><Blocs1 titre={blocs[key].titre} photo={blocs[key].photo} /></div>)
            }
            else if (blocs[key].id === 2) {
                return (<div className="start-bloc"><Blocs2 titre={blocs[key].titre} photo={blocs[key].photo} /></div>)
            }
            else if (blocs[key].id === 3) {
                return (<div className="start-bloc"><Blocs3 titre={blocs[key].titre} photo1={blocs[key].photo1} photo2={blocs[key].photo2} /></div>)
            }
            else if (blocs[key].id === 4) {
                return (<div className="start-bloc"><Blocs4 photo1={blocs[key].photo1} photo2={blocs[key].photo2} photo3={blocs[key].photo3} /></div>)
            }
            else if (blocs[key].id === 5) {
                return (<div className="start-bloc"><Blocs5 photo={blocs[key].photo} /></div>)
            }
            else if (blocs[key].id === 6) {
                return (<div className="start-bloc"><Blocs6 titre={blocs[key].titre} para={blocs[key].para} /></div>)
            }
        })


        var otherProject = Object.keys(this.state.otherProject).map((key) => {
            if (this.state.otherProject) {
                if (this.state.otherProject.length >= 1) {
                    if (key === "0")
                        return (
                            <div className="item-other-project">
                                <a href={`/project/${this.state.otherProject[key].URL}`}>
                                    <p>{this.state.otherProject[key].titre}</p>
                                    <img className="img-other-project" src={this.state.otherProject[key].PHOTO}></img>
                                </a>
                            </div>
                        )
                }
            }
        })


        return (
            <div id="project">
                <div className="bloc-top">
                    <h1 className="title-princ-top">{this.state.data.titre}</h1>
                    <p className="para-princ-top">{this.state.data.desc}</p>
                    <img className="img-princ-top-fond" id="img-princ-top-fond" style={{ opacity: "0.3" }} src={this.state.data.PHOTO}></img>
                </div>


                {/* // content  */}
                <div className="content-project">
                    {/* // FAIRE LOOP POUR AFFICHER LES BLOCS ICI  */}
                    {renderBlocs}
                </div>


                {/* Other project */}
                {this.state.otherProject.length >= 1 && <div className="bloc-other-project">
                    <h6>Autre projet</h6>
                    <div className="flex-other-project">
                        {otherProject}
                    </div>
                </div>}
            </div>
        )
    }
}
