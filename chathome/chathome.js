

async function postchat(event){
    event.preventDefault();


try{
   
    const chat  = document.getElementById("chatinput").value;

   
   const groupid =  document.getElementsByName("sendbutton")[0].id

   

    const chatObj = {
        chat,
        groupid
        }
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




window.addEventListener("DOMContentLoaded", async (event) => {

    event.preventDefault();

   

    if(localStorage.getItem("token") == null || undefined){
        window.location.href ='../signin/signin.html';
    }
 
    
    const response =await axios.get("http://localhost:1000/chat/getchat", {headers :{ "Authorization": localStorage.getItem("token") }})
    .then(response => {return (response.data)})   
   

    const chatbox = response.chats
    printgroupslist()
     printMessages(chatbox);
     

    //  const groupchats =  response.groupchats
    //  localStorage.setItem("groupchats",JSON.stringify(groupchats))

    
    // const groupchatList = JSON.parse(localStorage.getItem("groupchats"));
})

    

//    setInterval(async ()=>{
//     console.log("printing at each second")
// const chats = JSON.parse(localStorage.getItem("chats"))

// const lastmessageid= chats[chats.length-1].id
// console.log(lastmessageid)


// const response = await axios.get(`http://localhost:1000/chat/getchat?id=${lastmessageid}&`, {headers :{ "Authorization": localStorage.getItem("token") }})
// .then(response =>  (response.data)) 

// console.log(response.chats)
//     if (response.chats != undefined){
//         const chatbox = response.chats
        
// if(chatbox.length>200){
//     localStorage.setItem("chats",JSON.stringify(chatbox.slice(chatbox.length-200)))
// } else if( chatbox.length < 200){
   
//     localStorage.setItem("chats",JSON.stringify(chatbox))
// }

// printMessages();

//     }},1000)





 function printMessages(){
    console.log("entering pm")
    const chats = JSON.parse(localStorage.getItem("chats"))
    console.log(chats)
    
    const parent = document.getElementById("messageprinter")

    parent.innerHTML="";
    for( let i =0; i< chats.length;i++){
       
        
        if(chats[i].groupid ==  document.getElementsByName("sendbutton")[0].id){
            parent.innerHTML+= ` <div class="message">
            <p class="text-secondary">${chats[i].userLogin.name} : ${chats[i].chat}</p>
        </div>`
        } else{
            continue;
        }
       
    }
}




 function printgroupslist(){
    const chats = JSON.parse(localStorage.getItem("groupchats"))
    // console.log(chats)

    if(chats != undefined){
        document.getElementsByName("sendbutton")[0].id = chats[0].groupid;
        for (let i=0; i<chats.length;i++){
            document.getElementById("gclist").innerHTML+=`<li class="list-group-item "><a href="#" id ="${chats[i].groupid}" onclick="getGroupId(event)" >${chats[i].groupname}</a></li>`;
        }
        }
    }

   function getGroupId(event){
    // var text = link.innerHTML;
   
    document.getElementsByName("sendbutton")[0].id = event.target.id
    printMessages();
        return event.target.id
   }