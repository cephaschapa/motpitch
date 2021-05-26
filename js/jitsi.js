$(document).ready(function(){
   $('#join-meeting').click(function(e){
        e.preventDefault()
        window.location.replace('https://meet.jit.si/mosioatunya')
        // const domain = 'meet.jit.si'
        // const options={
        //     roomName: 'mosioatunyapitch',
        //     with: 500,
        //     height: 500,
        //     parentNode: document.querySelector('#meet-modal-box'),
        //     userInfo: {
        //         email: 'email@jitsiexamplemail.com',
        //         displayName: 'John Doe'
        //     }
        // };
        // const api = new JitsiMeetExternalAPI(domain, options)
   })
    
})