

function moveSquartPage()
{
    location.href = "/squart";
}




$(document).ready(function(){
    $('#button').click(function(){
        let sendName = $('#name').val();
        let sendPassword = $('#password').val();

        let sendData = {
            "name" : sendName,
            "password" : sendPassword
        }
        
        $.ajax({
            contentType : "application/json; charset=utf-8",
            type : 'post',
            url : 'api/users/login',
            data : JSON.stringify(sendData),
            dataType : 'JSON',

            success : function(datas) {
                if (datas.loginSuccess)
                {
                    moveSquartPage()
                }
                else
                {
                    alert(datas.message)
                }
            }
        })
    })
})
