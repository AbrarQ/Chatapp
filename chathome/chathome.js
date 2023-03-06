

async function postchat(event){
    event.preventDefault();


try{
   
    const chat  = document.getElementById("chatinput").value;
    

    const chatObj = {
        chat    }
    // console.log(signinObj)

    await axios.post("http://localhost:1000/chat/postchat",chatObj, {headers :{ "Authorization": localStorage.getItem("token") }})
    .then(response =>{
  
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

    localStorage.removeItem("recentChats")
    const response =await axios.get("http://localhost:1000/chat/getchat", {headers :{ "Authorization": localStorage.getItem("token") }})
    .then(response => {return (response.data.chat)})   
   
    
    let validator = response.length
    
    const ls = localStorage.getItem("recentChats");
    
    if(ls != null){
        printMessages(ls)
  }else if( ls == null){
    savetoLS(validator,response)
    printMessages(response)

  }


    


    

   setInterval(async ()=>{
    console.log("printing at each second")
const checker = await axios.get("http://localhost:1000/chat/getchat", {headers :{ "Authorization": localStorage.getItem("token") }})
.then(response => {return (response.data.chat)})   
   
if(checker.length > validator){

  printMessages(checker.slice(validator))
  validator = checker.length;
  savetoLS(checker.length,checker)
}
},1000)



})


 function printMessages(response){
    
    for( let i =0; i< response.length;i++){
        const parent = document.getElementById("messageprinter")
        parent.innerHTML+= ` <div class="message">
                                 <p class="text-secondary">${response[i].userLogin.name} : ${response[i].chat}</p>
                             </div>`
    }
}


function savetoLS(chatLength, chatArr){

    const recentChatLength = chatLength-10;
    
    const recentChat = chatArr.slice(recentChatLength)

    console.log(JSON.stringify(recentChat))
   
  localStorage.setItem("recentChats",JSON.stringify(recentChat) )
    
}