import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import io from 'socket.io-client';
import Echo from "laravel-echo";
// import { ScaleLoader } from 'react-spinners';
const socketUrl ="http://localhost:8002";
export default class NotiContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mess: null, allCmt: null, messTemp:null,socket:null,idUser:null,
            next_page :null,
            info:null,
            cmtSocket : null
         }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.getIdUser();
    }

    componentDidMount() {
        this.getMess();
        // console.log(this.state.idUser);
        // this.initSocket();
        // this.getCmtSocket();
        
    }

    componentWillMount(){
        this.getCmtSocket();
    }

    handleChange(event) {
        this.setState({
            mess: event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault(this.state.mess);
        // this.sendnewMessage(this.state.mess);
        const url = window.location.pathname;
        const temp=url.split("/");
        console.log(temp[2]);

            axios.post('/comment/create/'+temp[2],
                {
                    body: this.state.mess,
                }
            )
            .then(response => {
                console.log(response.status);
            })
            .catch(error => {
                this.errors = []
                // if (error.response.data.errors.name) {
                //     console.log('err');
                //     // console.log(error.response.data.errors.name)
                // }
                // if (error.response.data.errors.price) {
                //     // this.errors.push(error.response.data.errors.price)
                // }
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


   initSocket(){
        // window.io = require('socket.io-client');

        // window.Echo = new Echo({
        //     broadcaster: 'socket.io',
        //     host: window.location.hostname + ':7000',
        //     transports: ['websocket', 'polling', 'flashsocket'] // Fix CORS error!
        // });
    }

    newCmt(cmt) {
       // const messages = this.state.allCmt;
       // messages.push(m);

       this.state.allCmt.push(cmt)
        this.setState(
          this.state
        )
        this.state
       console.log(cmt);
    }

    getCmtSocket(){
        window.io=require('socket.io-client');

        const url = window.location.pathname;
        const temp=url.split("/");
        const threadId = temp['2'];
        // alert(threadId);
        console.log(temp[2]);

        // var userId = 2;
        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: window.location.hostname + ':7000',
            transports: ['websocket', 'polling', 'flashsocket'] // Fix CORS error!
        });
        window.Echo.channel('thread.'+threadId)
        .listen('MessageSend',(cmt) => {
                var cmtSocket = {'body' : cmt.contentCmt.cmt};
                this.newCmt(cmtSocket);
                console.log(this.state.allCmt);
        });
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
                <div className="row">
                    <div className="col-md-8">
                     <form onSubmit={(event) => this.handleSubmit(event)}>
                    <legend>Create comment</legend>
                    <div className="form-group">
                      <input onChange={(event) => this.handleChange(event)} type="text" className="form-control" name="body" id placeholder="Input..." />
                    </div>
                     <input value="Send" type="submit" />
                    </form>
                    </div>
                </div>
          </div>

        // form
       

        );
    }
}
if (document.getElementById('contentNoti')) {
    ReactDOM.render(<NotiContent />, document.getElementById('contentNoti'));
}
