import React, { Component } from 'react'
import firebase from 'firebase';
import "./dashboard.css"

import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";

export default class share extends Component {

    state = {
        data: []
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


    render() {

        var listingShare = Object.keys(this.state.data).map((key) => {
            return (
                <div className="list-delete-item">
                    <span style={{cursor: "text"}}>{this.state.data[key][0]}</span>
                    <div>
                        <a href="mailto:mail@exemple.fr?subject=Nouvelle page !&body=[lien]">
                            <EmailIcon size={60} round={true} />
                        </a>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fgoogle.com%2F&amp;src=sdkpreparse" target="blank">
                            <FacebookIcon size={60} round={true} />
                        </a>
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://google.com" target="blank">
                            <LinkedinIcon size={60} round={true} />
                        </a>
                        <a href="https://twitter.com/intent/tweet?url=google.com" target="blank">
                            <TwitterIcon size={60} round={true} />
                        </a>
                        <a href="https://wa.me/?text={lien}" target="blank">
                            <WhatsappIcon size={60} round={true} />
                        </a>

                    </div>
                </div>
            )
        })

        return (
            <div className="body-page">
                <h2 className="title-page-add">Partager des pages spécifiques</h2>
                <div className="list-bloc-delete">
                    {listingShare}
                </div>
            </div>
        )
    }
}
