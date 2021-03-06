import React,{Component} from 'react';
import { StyleSheet, Text, View , TouchableOpacity , TextInput } from 'react-native';
import MyHeader from "../components/appHeader"
import db from '../config'
import firebase from 'firebase'


import { Alert } from 'react-native';
export default class SettingsScreen extends Component{
    constructor(){
    super();
    this.state = {
        emailid:"",
        firstName: "",
        lastName: "",
        address:"",
        docId:"",

    }
    
    }
    getUserDetails=()=>{
        var email = firebase.auth().currentUser.email
        db.collection("users").where("emailid", "==", email).get().then(snapshot => {
            snapshot.forEach(doc =>{
                var data = doc.data()
                this.setState({
                    emailid: data.emailid ,
                    firstName:  data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    contact:data.contact,
                    docId: doc.id
                })
            })
        })
    }
    updateUserDetails = ()=>{
        db.collection("users").doc(this.state.docId).update({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address:this.state.address,
            contact:this.state.contact,

        })
        Alert.alert("profile updated successfully")
    }
    componentDidMount(){
        this.getUserDetails()
    }
    render(){
        return(
            <View style = {styles.container}>
                <MyHeader title = "Settings" navigation = {this.props.navigation}/>
                <View style = {styles.formContainer}>
                    <TextInput style = {styles.formTextInput}
                    placeholder = {"first name"}
                    maxLength = {8}
                    onChangeText = {(text)=>{
                        this.setState({firstName:text})
                    }}
                    value = {this.state.firstName}/>

<TextInput style = {styles.formTextInput}
                    placeholder = {"last name"}
                    maxLength = {8}
                    onChangeText = {(text)=>{
                        this.setState({lastName:text})
                    }}
                    value = {this.state.lastName}/>

<TextInput style = {styles.formTextInput}
                    placeholder = {"contact"}
                    maxLength = {10}
                    keybpoardType={"numeric"}
                    onChangeText = {(text)=>{
                        this.setState({contact:text})
                    }}
                    value = {this.state.contact}/>

<TextInput style = {styles.formTextInput}
                    placeholder = {"address"}
                    multiline = {true}
                    onChangeText = {(text)=>{
                        this.setState({address:text})
                    }}
                    value = {this.state.address}/>
                    <TouchableOpacity style =  {styles.button} onPress = {()=>{
                        this.updateUserDetails()
                    }}>
                        <Text style = {styles.buttonText}> Save </Text>
                            </TouchableOpacity>
                </View>
                <Text>Settings</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({ container : { flex:1, alignItems: 'center', justifyContent: 'center' }, 
formContainer:{ flex:1, width:'100%', alignItems: 'center' }, formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, }, button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, },
 shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, 
 buttonText:{ fontSize:25, fontWeight:"bold", color:"#fff" } })