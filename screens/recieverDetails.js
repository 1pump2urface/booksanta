import React,{Component} from 'react';
import db from '../config'
import firebase from 'firebase'
import {Card, Header , Icon} from "react-native-elements"
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput , TouchableOpacity, Alert } from 'react-native';
export default class RecieverDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            userid:firebase.auth().currentUser().email,
            receiverid:this.props.navigation.getParam["details"]["userid"] ,
            requestid:this.props.navigation.getParam["details"]["requestid"],
            bookName:this.props.navigation.getParam["details"]["book name"],
            reason:this.props.navigation.getParam["details"]["reason"],
            receiverName:"",
            receiverContact:"",
            receiverAddress:"",
            receiverRequestDocId:""

        }
        
    }
    getReceiverDetails(){
        db.collection("users").where("email_id", "==",this.state.receiverid).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.setState({
                    receiverName:doc.data().first_name,
                    receiverContact:doc.data().contact,
                    receiverAddress:doc.data().address,
                })
            });
        })
        db.collection("Requested_Books").where("requestid", "==", this.state.requestid).get()
        .then(snapshot => {
            this.setState({receiverRequestDocId:doc.id})
        })
    }
    componentDidMount(){
        this.getReceiverDetails()
    }
    updateStatus = ()=>{
        db.collection("all_donations").add({
            bookName:this.state.bookName,
            requestid:this.state.requestid,
            requestedBy:this.state.receiverName,
            donorid:this.state.userid,
            requestStatus:'donor interested'
        })
    }
    render(){
        return(
            <View style = {styles.container}>
                
                <View style = {{flex:0.1}}>
                    <Header
                    leftComponent = {<Icon name = "arrow-left" type = "feather" color = "blue" onPress = {()=>this.props.navigation.goBack()}/>}
                    centerComponent = {{text:"donateBooks", style:{color:"red", fontSize:20,fortWeight:"bold"}}
               
                <Text>Reciever Details</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({ container: { flex:1, }, 
    buttonContainer : { flex:0.3, justifyContent:'center', 
    alignItems:'center' }, button:{ width:200, height:50, justifyContent:'center', 
    alignItems : 'center', borderRadius: 10, 
    backgroundColor: 'orange', shadowColor: "#000",
     shadowOffset: { width: 0, height: 8 }, elevation : 16 } }})