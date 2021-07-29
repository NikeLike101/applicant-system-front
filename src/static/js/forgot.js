console.log(this.location.href,1)

const token = window.location.href.slice(33)
// console.log('enrollee.by/users/reset_password/asd'.slice(33))

document.querySelector('.forgot-btn').addEventListener('click', ()=> {
    const passes = [document.getElementById('first_pass').value, document.getElementById('second_pass').value]
    console.log(passes)
    
    console.log(passes[0] != passes[1])
    if(passes[0] != passes[1]) {
        document.querySelector('.forgot-status').innerHTML='Пароли не совпадают, проверьте введеные данные'
    } else {
        fetch(`http://enrollee.by/api/v1/users/reset_password_confirm/${token}/`, {
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