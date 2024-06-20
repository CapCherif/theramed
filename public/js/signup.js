
// $('.animation').show();
// $('#signup_form button').addClass('lighten').attr('disabled', true)
// setTimeout(() => {
//     $('.animation').hide();
//     $('#signup_form button').removeClass('lighten').attr('disabled', false)
// }, 3000);

$('#signup_form').submit((e)=>{
    e.preventDefault()

    // $('.animation').show()
    // $('#signup_form button').addClass('lighten').attr('disabled', true)

    var nom = $('#nom').val()
    var prenom = $('#prenom').val()
    var birth = $('#birth').val()
    var adresse = $('#adresse').val()
    var phone = $('#phone').val()
    var email = $('#email').val()
    var ville = $('#ville').val()
    var psw = $('#psw').val()
    var cpsw = $("#cpsw").val()
    var sexe = $("#sexe").val()

    // console.log(role, fullname, adresse, phone, email, psw, cpsw)

    if(psw.length < 6){

        // $('.animation').hide()
        // $('#signup_form button').removeClass('lighten').attr('disabled', false)
        $('.err').text('longueur du mot de passe: minimuim 6 caractères !!').show()
        setTimeout(() => {
            $('.err').hide().text('').hide()
        }, 3000);
    }
    else if(psw != cpsw){
        // $('.animation').hide()
        // $('#signup_form button').removeClass('lighten').attr('disabled', false)

        $('.err').text('Erreur de confirmation du mot de passe').show()
        setTimeout(() => {
            $('.err').hide().text('').hide()
        }, 3000);
    }
    else{
        // envoyer a la bd
        $('.animation').show();
        $('#signup_form button').addClass('lighten').attr('disabled', true)
        // setTimeout(() => {
        //     $('.animation').hide();
        //     $('#signup_form button').removeClass('lighten').attr('disabled', false)
        // }, 3000);
        $.ajax({
            type:'POST',
            url:'/signup',
            data: {nom, prenom, birth, adresse, ville, email, phone, sexe, psw},
            success:(res)=>{
                if(res.done){
                    $('.success').slideDown()
                    // setTimeout(() => {
                    //    $('.success').slideUp(); 
                    //    window.location.href="/compte"
                    // }, 2000);
                }
                else if(res.err){
                    $('.err').text(res.err).show()
                    setTimeout(() => {
                        $('.err').text('').hide();
                    }, 5000);
                }
                $('.animation').hide()
                $('#signup_form button').removeClass('lighten').attr('disabled', false)

                $('#nom').val("")
                $('#prenom').val("")
               
                $('#birth').val("")
                $('#adresse').val("")
                $('#phone').val("")
                 $('#email').val("")
                 $('#ville').val("")

                $('#psw').val("")
                $("#cpsw").val("")
            }
        })
    }
   
  
})