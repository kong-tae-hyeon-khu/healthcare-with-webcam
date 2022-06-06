

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
// 회원가입용 
$(document).ready(function(){
    $('#register_button').click(function(){
        let sendName = $('#register_name').val();
        let sendPassword = $('#register_password').val();

        let sendData = {
            "name" : sendName,
            "password" : sendPassword
        }
        
        $.ajax({
            contentType : "application/json; charset=utf-8",
            type : 'post',
            url : 'api/users/register',
            data : JSON.stringify(sendData),
            dataType : 'JSON',

            success : function(datas) {
                if (datas.success)
                {
                    moveSquartPage()
                }
                else
                {
                    alert("회원가입 실패 (이름 중복 의심)")
                }
            }
        })
    })
})
