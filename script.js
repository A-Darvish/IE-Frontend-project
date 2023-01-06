// when user hit submit button we start our process
document.getElementById('btn1').addEventListener('click', showProf);

// showProf function is our main function which handles 
// the whole getting input username information process.
function showProf(){
    console.log('showing profile');

    let uName = document.getElementById('uname').value;
    let name = 'not defined';
    let blog = 'not defined';
    let bio = 'not defined';
    let location = 'not defined';
    
    // using local storage
    let localstrg = JSON.parse(localStorage.getItem(uName));

    // checking if we have it already in local storage so we wouldn't have to send request.
    if(localstrg != null) {
        console.log("reading from local storage");
        if(localstrg.name != null){
            name = localstrg.name;
        }
        if(localstrg.blog != ""){
            blog = localstrg.blog;
        }
        if(localstrg.location != null){
            location = localstrg.location;
        }
        if(localstrg.bio != null){
            bio = localstrg.bio;
        }
        document.getElementById('result').innerHTML =`
            <img src="${localstrg.avatar_url}" alt="avatar">
            <p>Name : ${name}</p>
            <p>Blog : ${blog}</p>
            <p>Location : ${location}</p>
            <pre>Bio : ${bio}</pre>
            <style type="text/css">
                img {
                    width: 50%;
                    border-radius: 50%;
                }
                p{
                    font-size:17px;
                    font-family: "Times New Roman", Times, serif;
                }
                pre{
                    font-size:17px;
                    font-family: "Times New Roman", Times, serif;
                }
            </style>
        `
        
    } else {
        // if we didnt have the information alredy we have to send request.
        let link = 'http://api.github.com/users/' + uName
    
        // calling api
        fetch(link).then(res=>res.json()).then(data=>{
            //this part is for showing that user not found
            if(data.message){
                document.getElementById('result').innerHTML =`
                    <img src="./not_found.png" alt="avatar">
                    <style type="text/css">
                    img {
                        width: 50%;
                    }
                    </style>
                    <h2> User Not found </h2>
                `
            }else {
                // in here our request was a success and
                // we got answer first we gonna store it in our local storage so the next time 
                // we wouldn't send request for the same username.
                let tmp = JSON.stringify(data)
                localStorage.setItem(uName, tmp);
                if(data.name != null){
                    name = data.name
                }
                if(data.blog != ""){
                    blog = data.blog
                }
                if(data.location != null){
                    location = data.location
                }
                if(data.bio != null){
                    bio = data.bio
                }
                document.getElementById('result').innerHTML =`
                    <img src="${data.avatar_url}" alt="avatar">
                    <p>Name : ${name}</p>
                    <p>Blog : ${blog}</p>
                    <p>Location : ${location}</p>
                    <pre>Bio : ${bio}</p>
                    <style type="text/css">
                        img {
                            width: 50%;
                            border-radius: 50%;
                        }
                        p{
                            font-size:17px;
                            font-family: "Times New Roman", Times, serif;
                        }
                        pre{
                            font-size:17px;
                            font-family: "Times New Roman", Times, serif;
                        }
                    </style>
                `
            }
        }).catch(e=>{
            console.log(e)
        })
    }
}