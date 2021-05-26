$(document).ready(function(){
    $('#signup-b').hide()
    $('.sidenav').sidenav();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
      });
      $('.slider').slider();
      $('.modal').modal();
    

    $('#signup-show').click(function(e){
        e.preventDefault()
        $('#signup-b').show()
        $('#signin-b').hide()
        $('#signin-b').css("transition", ".3s")
        $('#signup-b').css("transition", ".3s")
    })
    $('#login-show').click(function(e){
        e.preventDefault()
        $('#signup-b').hide()
        $('#signin-b').show()
        $('#signin-b').css("transition", ".3s")
        $('#signup-b').css("transition", ".3s")
    })
    
    const token = Cookies.get('token')
    axios({
        method: 'get',
        url: 'https://mosioatunya.herokuapp.com/api/v1/auth/me',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res=>{
        console.log(res)
        let userid = res.data.data._id
        let details = res.data.data
        Cookies.set('userid',userid)
        $('#profile-box').html(`
                <div class="card">
                <div class="card-image">
                    <img src="./assets/images/pitch.jpg"/>
                </div>
                <div class="card-content">
                    <div class="card-title">
                        ${details.username}
                    </div>
                    <p>${details.firstname} ${details.lastname}</p>
                    <p>${details.mobile}</p>
                    <p>${details.email}</p>
                </div>
            </div>
        `)

    })).catch(err=>console.error(err))
    let userId = Cookies.get('userid')


    axios({
        method: 'get',
        url: `https://mosioatunya.herokuapp.com/api/v1/pitch/user/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res=>{
        console.log(res.data.data)
        let data = res.data.data
        data.forEach(element => {
            let output = `
            <div class="col s12 m3 mx-auto">
            <div class="card">
                <div class="card-image">
                    <img src="./assets/images/pitch.jpg"/>
                </div>
                <div class="card-content">
                    <div class="card-title">
                        ${element.title}
                    </div>
                    <span>${element.description}</span>
                    <span>${element.pitchvideo}</span>
                    <span>${element.groupmembers}</span>
                </div>
            </div>
            </div>
            `
            console.log(output)
            if(data.length==0 && !token){
                $('#card-render-box').html(`
                    <p>Please login to submit a pitch</p>
                `)
            }
            $('#card-render-box').html(output)
        });
        
        
    })).catch(err=>console.error(err))

    // console.log(token)
    if(token){
        $('#acc-box').html(`
            <li>
                <a class="waves-effect" id="logout" href="#!">
                    <i class="material-icons">power_settings_new</i>
                    Logout
                </a>
            </li>
        `)
        $('#dynamic-btn').html(`
            
            <a href="./profile.html" class="white-text"><i class="material-icons">person</i></a>
            
        `)
        $('#account-ctrl').html(`
        <a id="logout-h" class="waves-effect" href="./login.html" style="float:right; right:-100px;top:-63px"
          ><i class="material-icons left">power_settings_new</i>Logout</a
        >
        
        `)
    }
    // $('#login-form').submit(function(e){
    //     e.preventDefault();
    //     let email = $('#email-b').val()
    //     let password = $('#password-l').val()

    //     console.log(email, password)
    //     axios({
    //         method: 'post',
    //         url: "https://mosioatunya.herokuapp.com/api/v1/auth/login",
    //         data: {
    //             email: email,
    //             password: password
    //         },
    //     }).then((result) => {
    //         Cookies.set('token', `${result.data.token}`)
    //         let token = Cookies.get('token')
    //         window.location.replace('/index.html')
    //     }).catch((err) => {
            
    //     });
    // })

    $('#logout').click(function(e){
        e.preventDefault()
        let token = Cookies.get('token')
        axios({
            method: 'get',
            url: 'https://mosioatunya.herokuapp.com/api/v1/auth/logout',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res=>{
            console.log(res)
            Cookies.set('token','')
            window.location.reload()
        })).catch(err=>console.error(err))
    })
    $('#logout-h').click(function(e){
        e.preventDefault()
        let token = Cookies.get('token')
        axios({
            method: 'get',
            url: 'https://mosioatunya.herokuapp.com/api/v1/auth/logout',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res=>{
            console.log(res)
            Cookies.set('token','')
            window.location.reload()
        })).catch(err=>console.error(err))
    })
    
    $('#submit-pitch').click(function(e){
        e.preventDefault()
        let title = $('#title').val()
        let desc = $('#desc').val()
        let web = $('#web').val()
        let mem = $('#group-mem').val()
        let token = Cookies.get('token')
        console.log(title, desc, web, mem)

        axios({
            method: 'post',
            url: 'https://mosioatunya.herokuapp.com/api/v1/pitch',
            data: {
                title: title,
                description: desc,
                pitchvideo: web,
                groupmembers: mem
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res=>{
            console.log(res)
            window.location.reload()
            
            

        })).catch(err=>console.error(err))
    })
    $('#login-form').submit(function(e){
        e.preventDefault();
        let email = $('#email-b').val()
        let password = $('#password-l').val()

        console.log(email, password)
        axios({
            method: 'post',
            url: "https://mosioatunya.herokuapp.com/api/v1/auth/login",
            data: {
                email: email,
                password: password
            },
        }).then((result) => {
            Cookies.set('token', `${result.data.token}`)
            let token = Cookies.get('token')
            window.location.replace('https://cephaschapa.github.io/motpitch/')
        }).catch((err) => {
            alert('Invalid Credentials')
        });
    })

    $('#signin-form').submit(function(e){
        e.preventDefault()
        let username = $('#username').val()
        let fname = $('#fname').val()
        let lname = $('#lname').val()
        let mobile = $('#mobile').val()
        let email = $('#email').val()
        let password = $('#password-s').val()

        console.log($(this))
        axios({
            method: 'post',
            url: "https://mosioatunya.herokuapp.com/api/v1/auth/register",
            data: {
                username:username,
                firstname: fname,
                lastname: lname,
                mobile:mobile,
                email: email,
                password: password
            },
        }).then((result) => {
            Cookies.set('token', `${result.data.token}`)
            let token = Cookies.get('token')
            window.location.replace('/index.html')
        }).catch((err) => {
            alert('Something went wrong')
        });
    })

})