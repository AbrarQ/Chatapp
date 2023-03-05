

async function postchat(event){
    event.preventDefault();


try{
   
    const chat  = document.getElementById("chatinput").value;
    

    const chatObj = {
        chat    }
    // console.log(signinObj)

    await axios.post("http://localhost:1000/chat/postchat",chatObj, {headers :{ "Authorization": localStorage.getItem("token") }})
    .then(response =>{
       console.log(response)  
        document.getElementById("chatinput").value = "" ;
        
    })   
    .catch(err=> {
        console.log(err)
    })
} catch(e){

    console.log(e)
}
    

}




window.addEventListener("DOMContentLoaded", async () => {

    const response =await axios.get("http://localhost:1000/chat/getchat", {headers :{ "Authorization": localStorage.getItem("token") }})
    .then(response => {return (response.data.chat)})   
    
    let validator = response.length
    
    if(response != null){
        printMessages(response,0)
    }


    

//    setInterval(async ()=>{
//     console.log("printing at each second")
// const checker = await axios.get("http://localhost:1000/chat/getchat", {headers :{ "Authorization": localStorage.getItem("token") }})
// .then(response => {return (response.data.chat)})   
//     console.log("checker length",checker.length)
//     console.log("validator length",validator)
// if(checker.length > validator){
//   printMessages(checker,validator)
//   validator = checker.length;
// }},1000)



})


 function printMessages(response,x){
    console.log("printing")
    for( let i =x; i< response.length;i++){
        const parent = document.getElementById("messageprinter")
        parent.innerHTML+= ` <div class="message">
                                 <p class="text-secondary">${response[i].userLogin.name} : ${response[i].chat}</p>
                             </div>`
    }
}