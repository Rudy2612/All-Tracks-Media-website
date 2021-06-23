import React, { Component } from 'react'
import './dashboard.css'
import firebase from "firebase"

import BC1 from "../data/bloc1.png"
import BC2 from "../data/bloc2.png"
import BC3 from "../data/bloc3.png"
import BC4 from "../data/bloc4.png"
import BC5 from "../data/bloc5.png"
import BC6 from "../data/bloc6.png"


export default class editeur extends Component {

    state = {
        data: [],
        etape: 0,
        blocChange: [],
        name: "",
        popup: false,
    }


    componentDidMount() {

        var db = firebase.firestore();

        db.collection("files").get().then((querySnapshot) => {
            var data = []
            var datatemp = []
            querySnapshot.forEach((doc) => {
                datatemp = []
                console.log(doc.id, " => ", doc.data());
                datatemp.push(doc.id)
                datatemp.push(doc.data())
                data.push(datatemp)
            });
            // dans le tableau:
            // [0]; nom de la page
            // [1]: contenue de la page
            this.setState({ data: data })
        });
    }


    update = e => {
        var db = firebase.firestore();

        var washingtonRef = db.collection("files").doc(this.state.name);

        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            blocs: this.state.blocChange
        })
            .then(() => {
                console.log("Document successfully updated!");
                this.setState({
                    etape: 0,
                    popup: false
                })
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }


    selectProjet = e => {
        var id = e.target.id
        this.setState({
            blocChange: this.state.data[id][1].blocs,
            name: this.state.data[id][0],
            etape: 1,
        })
    }

    addBloc = e => {
        var idBloc = Number(e.target.id)
        if (idBloc === 1) {
            var newbloc = {
                id: 1,
                titre: "",
                photo: ""
            }
        }
        else if (idBloc === 2) {
            var newbloc = {
                id: 2,
                titre: "",
                photo: ""
            }
        }
        else if (idBloc === 3) {
            var newbloc = {
                id: 3,
                titre: "",
                photo1: "",
                photo2: ""
            }
        }
        else if (idBloc === 4) {
            var newbloc = {
                id: 4,
                photo1: "",
                photo2: "",
                photo3: ""
            }
        }
        else if (idBloc === 5) {
            var newbloc = {
                id: 5,
                photo: ""
            }
        }
        else if (idBloc === 6) {
            var newbloc = {
                id: 6,
                titre: "",
                para: ""
            }
        }

        var blocs = this.state.blocChange
        blocs.push(newbloc)
        this.setState({
            blocChange: blocs,
            popup: false
        })
    }

    uploadFile = e => {
        var id = e.target.id
        var params = id.split(',')
        console.log(params)
        var photo = e.target.files[0]
        console.log(photo)

        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child('images/' + e.target.files[0].name).put(photo);
        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error)
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    var blocs = this.state.blocChange
                    blocs[params[0]][params[1]] = downloadURL
                    this.setState({ blocChange: blocs })
                });
            }
        );
    }

    handleChange = e => {
        var id = e.target.id
        var params = id.split(',')
        var blocs = this.state.blocChange
        blocs[params[0]][params[1]] = e.target.value
        this.setState({ blocChange: blocs })
    }


    render() {


        var listProjets = Object.keys(this.state.data).map((key) => {
            return (
                <div className="macaron-project" id={key} onClick={this.selectProjet}>
                    <img className="img-maracon-project" id={key} src={this.state.data[key][1].PHOTO}></img>
                    <p id={key}>{this.state.data[key][0]}</p>
                </div>
            )
        })

        var blocs = this.state.blocChange
        var listBloc = Object.keys(this.state.blocChange).map((key) => {
            if (blocs[key].id === 1) {
                return (
                    <div className="body-bloc">
                        <h6>Photo avec titre</h6>
                        <div className="body-bloc-flex">
                            <div className="w-50-body-bloc">
                                <img className="photo-demi-body-bloc" src={blocs[key].photo}></img>
                                <p className="change-photo-bloc">Charger une nouvelle photo</p>
                                <input onChange={this.uploadFile} id={`${key},photo`} type="file" className="input-file-2"></input>
                                <br></br>
                            </div>
                            <div className="w-50-body-bloc">
                                <label className="form-label">Titre à coté de la photo</label>
                                <input className="input-form" style={{ background: "#F0F0F0" }} type="text" value={blocs[key].titre} id={`${key},titre`} onChange={this.handleChange}></input>
                            </div>
                        </div>
                    </div>
                )
            }
            else if (blocs[key].id === 2) {
                return (
                    <div className="body-bloc">
                        <h6>Photo avec titre</h6>
                        <div className="body-bloc-flex">
                            <div className="w-50-body-bloc">
                                <label className="form-label">Titre à coté de la photo</label>
                                <input className="input-form" style={{ background: "#F0F0F0" }} type="text" value={blocs[key].titre} id={`${key},titre`} onChange={this.handleChange}></input>
                            </div>
                            <div className="w-50-body-bloc">
                                <img className="photo-demi-body-bloc" src={blocs[key].photo}></img>
                                <p className="change-photo-bloc">Charger une nouvelle photo</p>
                                <input onChange={this.uploadFile} id={`${key},photo`} type="file" className="input-file-2"></input>
                                <br></br>
                            </div>
                        </div>
                    </div>
                )
            }
            else if (blocs[key].id === 3) {
                return (
                    <div className="body-bloc">
                        <h6>Double photo avec titre</h6>
                        <div className="body-bloc-flex">
                            <div className="w-50-body-bloc">
                                <img className="photo-demi-body-bloc" src={blocs[key].photo1}></img>
                                <p className="change-photo-bloc">Charger une nouvelle photo</p>
                                <input onChange={this.uploadFile} id={`${key},photo1`} type="file" className="input-file-2"></input>
                                <br></br>
                            </div>
                            <div className="w-50-body-bloc">
                                <img className="photo-demi-body-bloc" src={blocs[key].photo2}></img>
                                <p className="change-photo-bloc">Charger une nouvelle photo</p>
                                <input onChange={this.uploadFile} id={`${key},photo2`} type="file" className="input-file-2"></input>
                                <br></br>
                            </div>
                        </div>
                        <div style={{ width: "70%", marginLeft: "15%", marginTop: "25px" }}>
                            <label className="form-label">Titre en dessous (optionnel)</label>
                            <input className="input-form" style={{ background: "#F0F0F0" }} type="text" value={blocs[key].titre} id={`${key},titre`} onChange={this.handleChange}></input>
                        </div>
                    </div>
                )
            }
            else if (blocs[key].id === 4) {
                return (
                    <div className="body-bloc">
                        <h6>Double photo avec titre</h6>
                        <div className="body-bloc-flex">
                            <div className="w-50-body-bloc">
                                <img className="photo-demi-body-bloc" src={blocs[key].photo1}></img>
                                <p className="change-photo-bloc">Charger une nouvelle photo (paysage)</p>
                                <input onChange={this.uploadFile} id={`${key},photo1`} type="file" className="input-file-2"></input>
                                <br></br>
                                <br></br>
                                <img className="photo-demi-body-bloc" src={blocs[key].photo2}></img>
                                <p className="change-photo-bloc">Charger une nouvelle photo (paysage)</p>
                                <input onChange={this.uploadFile} id={`${key},photo2`} type="file" className="input-file-2"></input>
                                <br></br>
                            </div>
                            <div className="w-50-body-bloc">
                                <img className="photo-demi-body-bloc" src={blocs[key].photo3}></img>
                                <p className="change-photo-bloc">Charger une nouvelle photo (portrait)</p>
                                <input onChange={this.uploadFile} id={`${key},photo3`} type="file" className="input-file-2"></input>
                                <br></br>
                            </div>
                        </div>
                        <p className="note-text-bloc">Les tailles des photos seront ajustées sur la page du projet</p>
                    </div>
                )
            }
            else if (blocs[key].id === 5) {
                return (
                    <div className="body-bloc">
                        <h6>Double photo avec titre</h6>
                        <img className="photo-demi-body-bloc" src={blocs[key].photo}></img>
                        <p className="change-photo-bloc">Charger une nouvelle photo</p>
                        <input onChange={this.uploadFile} id={`${key},photo`} type="file" className="input-file-3"></input>
                        <br></br>
                    </div>
                )
            }
            else if (blocs[key].id === 6) {
                return (
                    <div className="body-bloc">
                        <h6>Titre et/ou paragraphe</h6>
                        <div style={{marginLeft: "10%"}}>
                            <label className="form-label">Titre</label>
                            <input className="input-form" style={{ background: "#F0F0F0" }} type="text" value={blocs[key].titre} id={`${key},titre`} onChange={this.handleChange}></input>
                            <br></br><br></br>
                            <label className="form-label">Paragraphe</label>
                            <textarea className="input-form" style={{ background: "#F0F0F0" }} type="text" value={blocs[key].titre} id={`${key},para`} onChange={this.handleChange}></textarea>
                            <br></br>
                        </div>
                    </div>
                )
            }
            else {
                return ("")
            }
        })

        return (
            <div className="body-page">

                {this.state.etape === 0 && <>
                    <h2 className="title-page-dahs">Éditeur de contenu</h2>
                    <div>
                        {listProjets}
                    </div>
                </>}

                {this.state.etape === 1 && <>
                    <h2 className="title-page-add">{this.state.name}</h2>
                    <div>
                        {listBloc}
                    </div>
                    <div className="bloc-new-bloc" onClick={() => { this.setState({ popup: true }) }}>
                        <p>Ajouter un bloc</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#a0a0a0" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="#a0a0a0" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="#a0a0a0" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                    </div>

                    <button className="btn" onClick={this.update}>Enregistrer la page</button>

                    {this.state.popup === true && <>
                        <div className="pop-up-choose-bloc">
                            <p className="title-pop-up">Choix du nouveau bloc</p>
                            <div className="content-bloc-choose">
                                <img id="1" onClick={this.addBloc} src={BC1}></img>
                                <img id="2" onClick={this.addBloc} src={BC2}></img>
                                <img id="3" onClick={this.addBloc} src={BC3}></img>
                                <img id="4" onClick={this.addBloc} src={BC4}></img>
                                <img id="5" onClick={this.addBloc} src={BC5}></img>
                                <img id="6" onClick={this.addBloc} src={BC6}></img>
                            </div>
                        </div>
                        <div className="back-black" onClick={() => { this.setState({ popup: false }) }}></div>
                    </>}
                </>}


            </div>
        )
    }
}
