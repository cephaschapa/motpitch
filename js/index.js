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
        Cookies.set('userid',userid)

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
            <div class="card">
                <div class="card-content">
                    <div class="card-title">
                        ${element.title}
                    </div>
                </div>
            </div>`
            console.log(output)
            if(!output && !token){
                $('#card-render-box').html(`
                    <p>Please login to submit a pitch</p>
                `)
            }
            $('#card-render-box').html(output)
        });
        
        
    })).catch(err=>console.error(err))

    console.log(token)
    if(token){
        $('#acc-box').html(`
            <li>
                <a class="waves-effect" id="logout" href="#!">
                    <i class="material-icons">power_settings_new</i>
                    Logout
                </a>
            </li>
        `)
    }
    $('#login-form').submit(function(e){
        e.preventDefault();
        let email = $('#email-b').val()
        let password = $('#password').val()

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
            window.location.replace('/index.html')
        }).catch((err) => {
            
        });
    })

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
            // window.location.reload()
            
            

        })).catch(err=>console.error(err))
    })
})