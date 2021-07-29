
const url = window.location.href.split('/')
const token = url[url.length-1]
console.log(token)


document.querySelector('.forgot-btn').addEventListener('click', ()=> {
    const passes = [document.getElementById('first_pass').value, document.getElementById('second_pass').value]
    console.log(passes)
    
    console.log(passes[0] != passes[1])
    if(passes[0] != passes[1]) {
        document.querySelector('.forgot-status').innerHTML='Пароли не совпадают, проверьте введеные данные'
    } else {
        fetch(`http://enrollee.by/api/v1/users/reset_password_confirm/${token}/`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-CSRFToken":
                "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
            },
            body: JSON.stringify({
              password1: passes[0],
              password2: passes[1],
            }),
          }).then((response) => {
              if (response.ok) {
                  window.location.replace("http://enrollee.by");
              }
          });
    }
})