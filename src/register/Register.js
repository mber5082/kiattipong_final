import React, {Component} from "react";
import axios from "axios";
import {ip,port} from "../setIP/setting";

export default class Register extends Component{
    constructor() {
        super();
        this.state = {
            idkey:"",
            firstname:"",
            lastname:"",
            class:"",
            level:"",
            email:"",
            class_array:[]
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
    }
    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleClicked(){
        let url = `https://localhost:3000/data`;
        let data = {
            idkey:this.state.idkey,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            class:this.state.class,
            level:this.state.level,
            email:this.state.email
        }
        console.log(data) //
        axios.post(url,data)
        this.setState({
            idkey:"",
            firstname:"",
            lastname:"",
            class:"",
            level:"",
            email:""
        });
    }
    //class
    componentDidMount() {
        console.log("before get data");
        this.getData();
        console.log("after get data");
   }
   getData = () => {
       console.log("before fetch data");
       fetch('/class')//name in data base
           .then(res => res.json())
           .then(list => this.setState({ class_array:list }))
       console.log("after fetch data");
   }

    render() {
        return(
            <div>
                <div className="App">
                <h2 className="my-4">Register<br/></h2>
                    <hr/>
                </div>
                <form className="container">
                <div className="form-group">
                        <label className="text-white"  htmlFor="idkey">รหัสนักศึกษา</label>
                        <input type="text" className="form-control" size="10" id="idkey" onChange={this.handleChang} value={this.state.idkey}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white" >ชื่อ</label>
                        <input type="text" className="form-control" id="firstname" onChange={this.handleChang} value={this.state.firstname}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  >นามสกุล</label>
                        <input type="text" className="form-control" id="lastname" onChange={this.handleChang} value={this.state.lastname}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  htmlFor="level">ชั้นปี</label>
                        <input type="text" className="form-control" size="10" id="level" onChange={this.handleChang} value={this.state.level}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  htmlFor="email">Email</label>
                        <input type="text" className="form-control" size="10" id="email" onChange={this.handleChang} value={this.state.email}/>
                    </div>
                    <div>
                    <label className="text-white"  >ห้อง</label>
                    <select className="form-control" id="class" onChange={this.handleChang} value={this.state.class} required> 
                            <option>Select class </option>
                            {this.state.class_array.map(users => {return <option value={users.class}></option>})}
                    </select>
                    </div>
                    <a href="/Showdata">
                    <button type="button" className="btn btn-primary" onClick={this.handleClicked}>Submit</button>
                    </a>
                </form>
            </div>
        );
    }
}