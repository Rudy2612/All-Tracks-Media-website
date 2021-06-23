import React, { Component } from 'react'
import "./dashboard.css"
import firebase from "firebase"

export default class page extends Component {

    state = {
        etape: 0,
        data: [],
        EditOption: 1,

        EDITNomPage: "",
        EDITDescPage: "",


        // create page
        name: "",
        url: "",
        title: "",
        desc: "",
        image: "",
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
            console.log(data)
            // dans le tableau:
            // [0]; nom de la page
            // [1]: contenue de la page
            this.setState({ data: data })
        });
    }


    deletePage = e => {
        if (window.confirm("Voulez-vous supprimer la page " + e.target.id + " définitivement ?")) {
            var db = firebase.firestore();
            db.collection("files").doc(e.target.id).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
            this.setState({
                etape: 0
            })
        }
    }

    setName = e => {
        var mots = e.target.value
        var url = mots.replace(' ', '-')
        this.setState({
            name: mots,
            url: url
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    fileCharge = e =>{
        var photo = e.target.files[0]

        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child('images/' + e.target.files[0].name).put(photo);
        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                var doc = document.getElementById('stateCharge')
                doc.innerHTML=`${progress}%`
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
                    var doc = document.getElementById('stateCharge')
                    doc.innerHTML=`Téléchagement terminé !`
                    console.log('File available at', downloadURL);
                    
                    this.setState({ PHOTO: downloadURL })
                });
            }
        );
    }



    changePage = e => {
        this.setState({
            etape: Number(e.target.id)
        })
    }

    createPage = e => {
        console.log("j'ai cliqué")
        var db = firebase.firestore();
        // Add a new document in collection "cities"
        db.collection("files").doc(this.state.url).set({
            URL: this.state.url,
            titre: this.state.name,
            desc: this.state.desc,
            PHOTO: this.state.PHOTO,
            blocs: []
        })
            .then(() => {
                console.log("Document successfully written!");
                this.setState({etape: 0})
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    EditPage = e => {
        var cle = e.target.id
        var data = this.state.data
        this.setState({
            nomEdit: cle,
            EDITNomPage: data[cle][1].titre,
            EDITDescPage: data[cle][1].desc,
            EditOption: 2
        })
    }

    modificationPage = e => {
        var db = firebase.firestore();
        // Add a new document in collection "cities"
        console.log(this.state.data[this.state.nomEdit][0])
        db.collection("files").doc(this.state.data[this.state.nomEdit][0]).update({
            titre: this.state.EDITNomPage,
            desc: this.state.EDITDescPage,
        })
            .then(() => {
                this.setState({
                    EditOption: 1,
                    etape: 0
                })
            })
    }


    render() {

        var listDeletePage = Object.keys(this.state.data).map((key) => {
            return (
                <div className="list-delete-item" id={this.state.data[key][0]} onClick={this.deletePage}>
                    <span id={this.state.data[key][0]}>{this.state.data[key][0]}</span>
                    <svg id={this.state.data[key][0]} xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect id={this.state.data[key][0]} width="256" height="256" fill="none"></rect><line id={this.state.data[key][0]} x1="215.99609" y1="56" x2="39.99609" y2="56.00005" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line id={this.state.data[key][0]} x1="104" y1="104" x2="104" y2="168" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line id={this.state.data[key][0]} x1="152" y1="104" x2="152" y2="168" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path id={this.state.data[key][0]} d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path id={this.state.data[key][0]} d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                </div>
            )
        })


        var listEditPage = Object.keys(this.state.data).map((key) => {
            return (
                <div className="list-delete-item" id={key} onClick={this.EditPage}>
                    <span id={key}>{this.state.data[key][0]}</span>
                    <svg id={key} xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect id={key} width="256" height="256" fill="none"></rect><path id={key} d="M96,216H48a8,8,0,0,1-8-8V163.31371a8,8,0,0,1,2.34315-5.65686l120-120a8,8,0,0,1,11.3137,0l44.6863,44.6863a8,8,0,0,1,0,11.3137Z" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><line id={key} x1="136" y1="64" x2="192" y2="120" fill="none" stroke="CurrentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                </div>
            )
        })

        return (
            <div className="body-page">


                {/* // starting menu */}

                {this.state.etape === 0 && <div>
                    <h2 className="title-page-dahs">Éditeur de pages du site</h2>

                    <div className="bloc-menu-page">
                        <div className="item-menu-page" id="1" onClick={this.changePage}>
                            <svg xmlns="http://www.w3.org/2000/svg" id="1" width="192" height="192" fill="#ec612d" viewBox="0 0 256 256"><rect id="1" width="256" height="256" fill="none"></rect><line id="1" x1="40" y1="128" x2="216" y2="128" fill="none" stroke="#ec612d" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line id="1" x1="128" y1="40" x2="128" y2="216" fill="none" stroke="#ec612d" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                            <span id="1">Créer une nouvelle page</span>
                        </div>

                        <div className="item-menu-page" id="2" onClick={this.changePage}>
                            <svg xmlns="http://www.w3.org/2000/svg" id="2" width="192" height="192" fill="#ec612d" viewBox="0 0 256 256"><rect id="2" width="256" height="256" fill="none"></rect><line id="2" x1="215.99609" y1="56" x2="39.99609" y2="56.00005" fill="none" stroke="#ec612d" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line id="2" x1="104" y1="104" x2="104" y2="168" fill="none" stroke="#ec612d" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line id="2" x1="152" y1="104" x2="152" y2="168" fill="none" stroke="#ec612d" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path id="2" d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="#ec612d" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path id="2" d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="#ec612d" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                            <span id="2">Supprimer une page</span>
                        </div>

                        <div className="item-menu-page" id="3" onClick={this.changePage}>
                            <svg xmlns="http://www.w3.org/2000/svg" id="3" width="192" height="192" fill="#ec612d" viewBox="0 0 256 256"><rect id="3" width="256" height="256" fill="none"></rect><path id="3" d="M92.68629,216H48a8,8,0,0,1-8-8V163.31371a8,8,0,0,1,2.34315-5.65686l120-120a8,8,0,0,1,11.3137,0l44.6863,44.6863a8,8,0,0,1,0,11.3137l-120,120A8,8,0,0,1,92.68629,216Z" fill="none" stroke="#ec612d" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><line id="3" x1="136" y1="64" x2="192" y2="120" fill="none" stroke="#ec612d" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line id="3" x1="95.48882" y1="215.48882" x2="40.5088" y2="160.5088" fill="none" stroke="#ec612d" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                            <span id="3">Éditer le titre d’une page</span>
                        </div>
                    </div>
                </div>}


                {this.state.etape === 1 && <div>
                    <h2 className="title-page-add">Créer une nouvelle page</h2>
                    <div className="bloc-form">
                        <div className="flex-form">
                            <div className="w-50-form">
                                <label className="form-label">Titre de la page</label>
                                <input className="input-form" type="text" id="name" onChange={this.setName}></input>
                            </div>
                            <div className="w-50-form">
                                <label className="form-label">URL DE LA PAGE</label>
                                <input className="input-form" type="text" value={this.state.url} disabled></input>
                            </div>
                        </div>
                        {/* <div className="line-form"> */}
                        {/* <label className="form-label">Titre haut de page</label> */}
                        {/* <input className="input-form" style={{ width: "95%" }} type="text" id="title" onChange={this.handleChange}></input> */}
                        {/* </div> */}
                        <div className="line-form">
                            <label className="form-label">Description de la page</label>
                            <textarea className="input-form" style={{ width: "95%" }} type="text" id="desc" onChange={this.handleChange}></textarea>
                        </div>
                        <div className="line-form">
                            <label className="form-label">Image (Menu principal)</label>
                            <div className="bloc-upload">
                                <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="86 81.989 128 40 170 81.989" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><line x1="128" y1="152" x2="128" y2="40.02943" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M216,152v56a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V152" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                                <input className="input-file-form-page" type="file" onChange={this.fileCharge}></input>
                            </div>
                            <p className="warning-import-file" style={{color: "black"}} id="stateCharge"></p>
                            <p className="warning-import-file">Image au format PNG / JPEG</p>
                        </div>
                        <div className="line-form">
                            <button className="btn" onClick={this.createPage}>Enregistrer</button>
                        </div>
                    </div>
                </div>}



                {this.state.etape === 2 && <div>
                    <h2 className="title-page-add">Supprimer une page</h2>
                    <div className="list-bloc-delete">
                        {listDeletePage}
                    </div>

                </div>}


                {this.state.etape === 3 && <div>
                    <h2 className="title-page-add">Éditer une page</h2>
                    {this.state.EditOption === 1 && <div className="list-bloc-delete">
                        {listEditPage}
                    </div>}

                    {this.state.EditOption === 2 && <div>

                        <div className="bloc-form">
                            <div className="line-form">
                                <label className="form-label">Titre de la page</label>
                                <input className="input-form" style={{ width: "95%" }} type="text" id="EDITNomPage" value={this.state.EDITNomPage} onChange={this.handleChange}></input>
                            </div>
                            <div className="line-form">
                                <label className="form-label">Description de la page</label>
                                <textarea className="input-form" style={{ width: "95%" }} type="text" id="EDITDescPage" value={this.state.EDITDescPage} onChange={this.handleChange}></textarea>
                            </div>

                            <div className="line-form">
                                <button className="btn" onClick={this.modificationPage}>Enregistrer</button>
                            </div>
                        </div>

                    </div>}
                </div>}


            </div>
        )
    }
}
