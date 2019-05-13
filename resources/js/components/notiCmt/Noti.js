import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import io from 'socket.io-client';
// import { ScaleLoader } from 'react-spinners';
const socketUrl ="http://localhost:8002";
export default class NotiContent extends Component {
    constructor(props) {
        super(props);
        this.state = { mess: null, allCmt: null, messTemp:null,socket:null,idUser:null,
            next_page :null,
            info:null
         }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.getIdUser();
    }

    componentDidMount() {
        this.getMess();
        // console.log(this.state.idUser);
    }


    handleSubmit(event) {
        event.preventDefault(this.state.mess);
        // this.sendnewMessage(this.state.mess);
        const url = window.location.pathname;
        const temp=url.split("/");
        console.log(temp[2]);
        axios.post('/messages',{
                message: this.state.mess,
                user_id_receive:temp[2]}
            )
            .then(response => {
                console.log(response.status);
            })
            .catch(error => {
                this.errors = []
                if (error.response.data.errors.name) {
                    console.log(error.response.data.errors.name)
                }
                if (error.response.data.errors.price) {
                    this.errors.push(error.response.data.errors.price)
                }
            })
            this.setState({mess:""})
    }

    getMess(){
        console.log("goi getMess ne");

            if(this.state.next_page == null){
                const url = window.location.pathname;
                const temp=url.split("/");
                console.log(temp[2]);
            //get user id
            axios.get('/cmtThread/'+temp[2])
                .then(response => {
                    this.setState({ 
                        allCmt: response.data
                    });
                })
                .catch(function (error) {
                    console.log(error);
                })
            }else{
                console.log(this.state.next_page);
                axios.get(this.state.next_page)
                .then(response => {
                    // for(i=0,i<response.data.data,i++){
                    //     this.newMessage(response.data.data.i)
                    // }
                    this.setState({
                        allCmt : [...this.state.allCmt, ...response.data.data],
                        next_page:response.data.next_page_url,
                        loading: false,
                    });
                    if(!response.data.next_page_url){
                        this.removeScrollEvent();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            }

        
    }


   initSocket(channel){
        const socket = io(socketUrl);
        // const channel = 'private-chat.'+this.state.idUser;
        console.log(channel);
        socket.on(channel, (response) => {this.newMessage(response.message)})

        socket.on("ahihi", (response) => {console.log(response)})
        socket.emit("ahihi",'cacac');
    }
    newMessage(m) {
       // const messages = this.state.allCmt;
       // messages.push(m);

       this.state.allCmt.push(m)
        this.setState(
          this.state
        )
        this.state
       console.log(m);
    }

    handleChange(event) {
        this.setState({
            mess: event.target.value,
        })
    }

    contentCmt(cmt) {
        // console.log(this.state.idUser+'ahihi');
        if (cmt instanceof Array) {
        return cmt.map(function(value){
            return (
                 <div className="col-md-8">
                <div className="comments-list">
                  <div className="media">
                    <h2 className="media-heading user_name">{value.body}</h2>
                    {value.body}
                    <p><small><a href>Like</a> - <a href>Share</a></small></p>
                     <br />
                  </div>
                </div>
              </div>

            );
        });
        }
    }


    render() {
        // {this.addNewMess()}
        return (

          <div className="container">
            <div className="row">
                 {this.contentCmt(this.state.allCmt)}
            </div>
          </div>


        );
    }
}
if (document.getElementById('contentNoti')) {
    ReactDOM.render(<NotiContent />, document.getElementById('contentNoti'));
}
