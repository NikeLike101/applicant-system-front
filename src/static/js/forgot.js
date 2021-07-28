
const url = window.location.href.split('/')
// tok[tok.length-1]
const token = url[url.length-1]
console.log(token)


document.querySelector('.forgot-btn').addEventListener('click', ()=> {
    const passes = [document.getElementById('first_pass').value, document.getElementById('second_pass').value]
    console.log(passes)
    
    console.log(passes[0] != passes[1])
    if(passes[0] != passes[1]) {
        document.querySelector('.forgot-status').innerHTML='Пароли не совпадают, проверьте введеные данные'
    } else {
        fetch(`enrollee.by/users/reset_password_confirm/${token}/`, {
            method: "PATCH",
            headers: {

              // Authorization:
              //   "Bearer " +
              //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIwMTE5NzQwLCJqdGkiOiIwMzM4OWYwNjI4ZDk0ODhiYTYwOWU5NDI4OWY5ZmYyYSIsInVzZXJfaWQiOjF9.y_LMYmJEvp9tQObj2YUzz8NftoXjwJi64PBD4GWyjxg",
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
            resolve(response.json());
            // console.log(resolve(response.json().email))
          });    
    }
})