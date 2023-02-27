const SERVER_IP = "localhost";
const SERVER_PORT = "3000";

const USE_OVERLAY = false;
const getLocalFlag = () => {
    try{
        let lo = localStorage.getItem("local_flag") === 'true';
        console.log("Inansdsnns", lo);
      return lo
    } catch(e){
      return false
    }
  }
var SERVER_URL = ""
const token=localStorage.getItem('login')
if(token)
  var ACCESS_TOKEN = "Bearer "+token
  console.log("gererereerererere", ACCESS_TOKEN)
if (getLocalFlag()){
    console.log("in if")
    SERVER_URL="http://43.252.197.60:8001"
    //SERVER_URL = "http://localhost:8000";
}
else{
    console.log("in else")
    //SERVER_URL="https://cb56-112-140-191-212.in.ngrok.io"
    // SERVER_URL = "http://192.168.1.44:8000";
     SERVER_URL = "http://43.252.197.60:8001";
    // const SERVER_URL = "https://d7edf369be0e55.localhost.run";

}

//SERVER_URL = "http://" + SERVER_IP + ":" + SERVER_PORT;

// SERVER_URL = "https://c9a9-111-235-75-237.in.ngrok.io";


export { SERVER_URL, USE_OVERLAY, ACCESS_TOKEN, token };
