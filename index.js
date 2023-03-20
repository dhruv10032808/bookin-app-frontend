var form=document.getElementById('form');
var list=document.getElementById('list');
var username=document.getElementById('username');
var email=document.getElementById('email');
var number=document.getElementById('number');
form.addEventListener('submit',local)
function local(e){
    e.preventDefault();
    var username=e.target.username.value;
    var number=e.target.number.value;
    var email=e.target.email.value;
   let obj={
    username,
    number,
    email
   };
   axios.post('http://localhost:3000/add-user',obj)
   .then((res)=>{
    console.log(res)
    onsubmit(res.data.newUserDetail);
   })
   .catch((err)=>{
    document.body.innerHTML=document.body.innerHTML+`<h4>Something went wrong</h4>`
})
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/get-user')
        .then((res)=>{
            for(var i=0;i<res.data.newUserDetail.length;i++){
                onsubmit(res.data.newUserDetail[i]);
            }
            console.log(res)
        })
        .catch((err)=>console.log(err));

     })

function onsubmit(user){
    var btn=document.createElement('button');
    btn.appendChild(document.createTextNode('Edit Expense'));
    var btn2=document.createElement('button');
    btn2.appendChild(document.createTextNode('Delete Expense'));
    btn2.setAttribute('onclick',"del('"+user.id+"')");
    console.log(btn2);
    btn.setAttribute('onclick',"edit('"+user.id+"','"+user.username+"','"+user.number+"','"+user.email+"')");
    var li=document.createElement('li');
    li.id=user.id;
    console.log(li);
    li.appendChild(document.createTextNode(user.username +"-"+ user.email));
    li.appendChild(btn) ;
    li.appendChild(btn2) ;
    list.appendChild(li);
}
function edit(userId,uname,num,em){
        username.value=uname;
        number.value=num;
        email.value=em;
        del(userId);
}

function del(userId){ 
    axios.delete(`http://localhost:3000/delete-user/${userId}`)
    .then((response)=>{
    const curr=document.getElementById(userId);
    list.removeChild(curr);
    })
    .catch((err)=>console.log(err));
}