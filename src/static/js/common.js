const enter = document.querySelectorAll(".auth_enter");
const blockContainer = document.querySelector(".block-container");
const authProfile = document.querySelector(".auth-profile_container");
const authContainer = document.querySelector(".auth-container_enter");
const dayTime = 86400000;
const second = 600000;
let news = [];
let eis = []
let profile = {}
let contact_phone = ''
let entryStatus = false;
let profileStatus = false;
let docFull = false;
// let reqDebug = "http://localhost:8000";
let reqDebug = 'http://enrollee.by'

const alertWindow = document.createElement("div");
alertWindow.classList.add("alert");
alertWindow.innerHTML =
  "<div class='alert-text'></div>" +
  "<div class='alert-buttons f jc-sb'>" +
  "<div class='alert-button' id='alert-first'></div>" +
  "</div>";
// console.log(alertWindow)
const createAlert = (text, actionFirst = "ОК", actionLast = null) => {
  alertWindow.querySelector(".alert-text").innerHTML = text;
  if (actionFirst)
    alertWindow.querySelector("#alert-first").innerHTML = actionFirst;
  if (actionLast) {
    alertWindow.querySelector(".alert-buttons").innerHTML +=
      "<div class='alert-button' id='alert-last'></div>";
    alertWindow.querySelector("#alert-last").innerHTML = actionLast;
  } else {
    if (alertWindow.querySelector("#alert-last"))
      alertWindow
        .querySelector(".alert-buttons")
        .removeChild(alertWindow.querySelector("#alert-last"));
  }

  if (blockContainer.querySelector(".alert"))
    blockContainer.removeChild(blockContainer.querySelector(".alert"));
  blockContainer.append(alertWindow);
  alertWindow.classList.add("show");
  if (alertWindow.querySelector("#alert-first"))
    alertWindow.querySelector("#alert-first").addEventListener("click", () => {
      alertWindow.classList.remove("show");

      if (alertWindow.querySelector("#alert-last"))
        alertWindow
          .querySelector(".alert-buttons")
          .removeChild(alertWindow.querySelector("#alert-last"));
    });
};
// createAlert('hello', 'ok', 'regret')

const clearParent = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const filter = (selector, activeItem, activeClass) => {
  console.log(activeItem);
  document.querySelectorAll(selector).forEach((e) => {
    e != activeItem
      ? e.classList.remove(activeClass)
      : e.classList.add(activeClass);
  });
};

if (document.getElementById("tel")) {
  IMask(document.getElementById("tel"), {
    mask: "+{375}-00-000-00-00",
  });
}

const setWithExpiry = (key, value, ttl) => {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

const myProfileInit = async (data) => {
  if (getWithExpiry("token")) {
    return new Promise((resolve, reject) => {
      fetch(reqDebug.concat("/api/v1/users/profiles/my/"), {
        method: "POST",
        headers: {
          Host: reqDebug,
          Authorization: "Bearer " + getWithExpiry("token"),
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken":
            "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
        },
        body: JSON.stringify({
          first_name: data.name,
          last_name: data.surname,
          middle_name: data.lastname,
          gender: data.gender,
          registration_address: data?.registrate_place,
          living_address: data?.living_place,
          profile_photo: null,
          birth_date: data.date,
        }),
      });
    });
  }
};

const myProfileName = async (data) => {
  if (getWithExpiry("token")) {
    return new Promise((resolve, reject) => {
      fetch(reqDebug.concat("/api/v1/users/profiles/my/"), {
        method: "PATCH",
        headers: {
          Host: reqDebug,
          Authorization: "Bearer " + getWithExpiry("token"),
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken":
            "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
        },
        body: JSON.stringify({
          first_name: data?.name,
          last_name: data?.surname,
          middle_name: data?.lastname,
          gender: data?.gender,
          registration_address: data?.registrate_place,
          living_address: data?.living_place,
          profile_photo: null,
          birth_date: data?.date,
        }),
      });
    });
  }
};

const myProfilePrivil = async (data) => {
  if (getWithExpiry("token")) {
    return new Promise((resolve, reject) => {
      fetch(reqDebug.concat("/api/v1/users/profiles/my/"), {
        method: "PATCH",
        headers: {
          Host: reqDebug,
          Authorization: "Bearer " + getWithExpiry("token"),
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken":
            "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
        },
        body: JSON.stringify({
          privilege_document: {
            name: data?.privil,
            series: data?.privil_series,
            number: data?.privil_number,
            emission_date: data?.privil_date,
            agency_name: data?.privil_place,
          },
        }),
      });
    });
  }
};

const myProfilePersonal = async (data) => {
  console.log(data)
  if (getWithExpiry("token")) {
    return new Promise((resolve, reject) => {
      fetch(reqDebug.concat("/api/v1/users/profiles/my/"), {
        method: "PATCH",
        headers: {
          Host: reqDebug,
          Authorization: "Bearer " + getWithExpiry("token"),
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken":
            "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
        },
        body: JSON.stringify({
          personal_document: {
            number: data?.doc_number,
            series: data?.doc_serial,
            document_type: data?.doc,
            emission_date: data?.doc_date,
            agency_name: data?.doc_place,
            identification_number: data?.doc_id,
          },
        }),
      });
    });
  }
};

const myProfileFather = async (data) => {
  if (getWithExpiry("token")) {
    return new Promise((resolve, reject) => {
      fetch(reqDebug.concat("/api/v1/users/profiles/my/"), {
        method: "PATCH",
        headers: {
          Host: reqDebug,
          Authorization: "Bearer " + getWithExpiry("token"),
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken":
            "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
        },
        body: JSON.stringify({
          father: {
            first_name: data?.dad_name,
            last_name: data?.dad_surname,
            middle_name: data?.dad_lastname,
            living_address: data?.dad_address,
            // phone_number: data["dad-tel"],
            phone_number: data?.dad_tel,
          },
        }),
      });
    });
  }
};

const myProfileMother = async (data) => {
  if (getWithExpiry("token")) {
    return new Promise((resolve, reject) => {
      fetch(reqDebug.concat("/api/v1/users/profiles/my/"), {
        method: "PATCH",
        headers: {
          Host: reqDebug,
          Authorization: "Bearer " + getWithExpiry("token"),
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken":
            "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
        },
        body: JSON.stringify({
          mother: {
            first_name: data?.mom_name,
            last_name: data?.mom_surname,
            middle_name: data?.mom_lastname,
            living_address: data?.mom_address,
            // phone_number: data["mom-tel"],
            phone_number: data?.mom_tel,
          },
        }),
      });
    });
  }
};

const myProfileGrads = async (data) => {
  if (getWithExpiry("token")) {
    return new Promise((resolve, reject) => {
      fetch(reqDebug.concat("/api/v1/users/profiles/my/"), {
        method: "PATCH",
        headers: {
          Host: reqDebug,
          Authorization: "Bearer " + getWithExpiry("token"),
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken":
            "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
        },
        body: JSON.stringify({
          graduations: [
            {
              institution_name: data?.ed_name0,
              year: data?.ed_date0,
            },
            // {
            //   institution_name: data?.ed_name1,
            //   year: data?.ed_date1,
            // },
            // {
            //   institution_name: data?.ed_name2,
            //   year: data?.ed_date2,
            // },
            // {
            //   institution_name: data?.ed_name3,
            //   year: data?.ed_date3,
            // },
            // {
            //   institution_name: data?.ed_name4,
            //   year: data?.ed_date4,
            // },
          ],
        }),
      });
    });
  }
};

const myProfileSub = async (data) => {
  if (getWithExpiry("token")) {
    return new Promise((resolve, reject) => {
      fetch(reqDebug.concat("/api/v1/users/profiles/my/"), {
        method: "PATCH",
        headers: {
          Host: reqDebug,
          Authorization: "Bearer " + getWithExpiry("token"),
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken":
            "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
        },
        body: JSON.stringify({
          average_mark: data?.ct,
          subjects: [
            {
              name: data?.subname1,
              result: data?.submark1,
            },
            {
              name: data?.subname2,
              result: data?.submark2,
            },
            {
              name: data?.subname3,
              result: data?.submark3,
            },
            {
              name: data?.subname4,
              result: data?.submark4,
            },
          ],
        }),
      });
    });
  }
};


const myProfileGet = () => {
  console.log(getWithExpiry("token"));
  if (getWithExpiry("token")) {
    return new Promise((resolve, reject) => {
      fetch(reqDebug.concat("/api/v1/users/profiles/my/"), {
        method: "GET",
        headers: {
          Host: reqDebug,
          Authorization: "Bearer " + getWithExpiry("token"),
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken":
            "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
        },
      }).then((response) => {
        resolve(response.json());
        // console.log(response.json())
        // console.log("Bearer " +getWithExpiry("token"))
      });
    });
  } else {
    console.log("sadasd");
  }
};

const institutionsGet = async (params) => {
  // console.log(encodeURI(reqDebug.concat("/api/v1/institutions/", params)));
  // let enc = new string_transcoder("utf-8");

  const uri = encodeURI(reqDebug.concat("/api/v1/institutions/", params));
  console.log(uri, decodeURI(uri));
  return new Promise((resolve, reject) => {
    fetch(decodeURI(uri), {
      method: "GET",
      headers: {
        Host: reqDebug,
        // Authorization: "Bearer " + getWithExpiry("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken":
          "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
      },
    }).then((response) => {
      resolve(response.json());
      // console.log(response.json())
      // console.log("Bearer " +getWithExpiry("token"))
    });
  });
};


const institutionID = async (id) => {
  // console.log(encodeURI(reqDebug.concat("/api/v1/institutions/", params)));
  // let enc = new string_transcoder("utf-8");

  const uri = encodeURI(reqDebug.concat("/api/v1/institutions/", id));
  console.log(uri, decodeURI(uri));
  return new Promise((resolve, reject) => {
    fetch(decodeURI(uri), {
      method: "GET",
      headers: {
        Host: reqDebug,
        // Authorization: "Bearer " + getWithExpiry("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken":
          "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
      },
    }).then((response) => {
      resolve(response.json());
      // console.log(response.json())
      // console.log("Bearer " +getWithExpiry("token"))
    });
  });
};

const newsGet = async () => {
  return new Promise((resolve, reject) => {
    fetch(reqDebug.concat("/api/v1/documents/articles/"), {
      method: "GET",
      headers: {
        Host: reqDebug,
        // Authorization: "Bearer " + getWithExpiry("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken":
          "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
      },
    }).then((response) => {
      resolve(response.json());
      // console.log(response.json())
      // console.log("Bearer " +getWithExpiry("token"))
    });
  });
};

const signUp = async (form) => {
  return new Promise((resolve, reject) => {
    fetch(reqDebug.concat("/api/v1/users/"), {
      method: "POST",
      headers: {
        Host: reqDebug,
        // Authorization:
        //   "Bearer " +
        //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIwMTE5NzQwLCJqdGkiOiIwMzM4OWYwNjI4ZDk0ODhiYTYwOWU5NDI4OWY5ZmYyYSIsInVzZXJfaWQiOjF9.y_LMYmJEvp9tQObj2YUzz8NftoXjwJi64PBD4GWyjxg",
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken":
          "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
      },
      body: JSON.stringify({
        email: form?.email,
        password: form?.pass,
      }),
    }).then((response) => {
      resolve(response.json());
      // console.log(resolve(response.json().email))
    });
  });
};

const logIn = async (form) => {
  return new Promise((resolve, reject) => {
    fetch(reqDebug.concat("/api/v1/users/token/"), {
      method: "POST",
      headers: {
        Host: reqDebug,
        // Authorization:
        //   "Bearer " +
        //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIwMTE5NzQwLCJqdGkiOiIwMzM4OWYwNjI4ZDk0ODhiYTYwOWU5NDI4OWY5ZmYyYSIsInVzZXJfaWQiOjF9.y_LMYmJEvp9tQObj2YUzz8NftoXjwJi64PBD4GWyjxg",
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken":
          "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
      },
      body: JSON.stringify({
        email: form?.email,
        password: form?.pass,
      }),
    }).then((response) => {
      resolve(response.json());
      // console.log(resolve(response.json().email))
    });
  });
};
const getResult = async (func) => {
  // console.log(func)
  let result = func;

  return result;
};

const doTask = async (info) => {
  let data = await getResult(info);
  console.log(info);
  console.log(data)
  profile = data
  if (document.getElementById("login-button")) {
    if (data.status_code) {
      if (data?.status_code == 401) {
        createAlert("Вход запрещен, проверьте введеные данные");
      }

      if (data?.status_code == 400) {
      }
    } else {
      setWithExpiry("token", data?.access, dayTime);
      entryStatus = true;
      createAlert('Вход произошел успешно! Нажмите "ОК" для завершения входа');
      alertWindow
        .querySelector("#alert-first")
        .addEventListener("click", () => {
          document.location.href = "/auth-profile.html";
        });
    }
  }
  if(data?.contact_phone) contact_phone = data?.contact_phone
  console.log(profileStatus)
    if (data?.detail !== "Объекта не существует") {
      
      profileStatus = true
      docFull = true;
      // console.log(docFull, 123)
    } else {
      profileStatus = false
    }
  
  if (document.querySelector('.contact-search')) {
    if (data[0]?.alias) {
      eis = data
    }
  }

  if (document.querySelector('.post-filters_main')) {
    if (data[0]?.alias) {
      eis = data
    }
  }

  if (document.getElementById("signup-button")) {
    if (data?.status_code == 400) {
      createAlert(
        "Пользователь с указанной электронной почтой уже существует!",
        "Забыли пароль",
        "Отмена"
      );
      alertWindow.querySelector("#alert-last").addEventListener("click", () => {
        window.location.reload(true);
      });
      console.log(data?.status_code);
    } else {
      createAlert(
        "Для подтвеждения регистрации аккаунта было отправлено письмо на почту, перейдите для дальнейшей работы"
      );
      console.log(data?.status_code);
    }
  }
  if (document.querySelector(".news-main")) {
    console.log(data);
    if (data[0]?.title) {
      // console.log(data)
      news = data;
      console.log(news);
      //  .news_wrapper_item.f.f-col.m-b10
      //   //  .news_wrapper_item-title Защита проектов учащихся четвертой смены Национального детского технопарка завершилась
      //   //  .news_wrapper_item-text 25 мая завершилась работа четвёртой смены Национального детского технопарка...
      const newsWrapper = document.querySelector(".news_wrapper_items");
      news.forEach((e) => {
        newsWrapper.innerHTML +=
          "<div class='news_wrapper_item f f-col m-b10'>" +
          `<div class='news_wrapper_item-title'> ${e.title}</div>` +
          `<div class='news_wrapper_item-text'> ${e.body}</div>` +
          "</div>";
      });
    }

    // data.forEach((e,i)=> {
    //   news.psuh(e)
    //   console.log(news)
    // })
    // news =
  }
  // if(!getWithExpiry("token"))
};

// const frontAddress = 'http://localhost:3000'
const frontAddress = 'http://enrollee.by'

// doTask(newsGet())
console.log(frontAddress.concat('/send_documents.html'))
console.log(window.location.href)

if (frontAddress.concat('/index.html') == window.location.href || frontAddress == window.location.href) {
  console.log(document.querySelectorAll('.header-info_item'))
  let items = document.querySelectorAll('.header-info_item')
  items.forEach(e => {e.classList.remove('__main-link')})
  items[0].classList.add('__main-link')
};

if (frontAddress.concat('/statistics.html') == window.location.href) {
  console.log(document.querySelectorAll('.header-info_item'))
  let items = document.querySelectorAll('.header-info_item')
  items.forEach(e => {e.classList.remove('__main-link')})
  items[1].classList.add('__main-link')
};

if (frontAddress.concat('/documents.html') == window.location.href) {
  console.log(document.querySelectorAll('.header-info_item'))
  let items = document.querySelectorAll('.header-info_item')
  items.forEach(e => {e.classList.remove('__main-link')})
  items[2].classList.add('__main-link')
};

if (frontAddress.concat('/favourite.html') == window.location.href) {
  console.log(document.querySelectorAll('.header-info_item'))
  let items = document.querySelectorAll('.header-info_item')
  items.forEach(e => {e.classList.remove('__main-link')})
  items[3].classList.add('__main-link')
};

if (frontAddress.concat('/contacts.html') == window.location.href) {
  console.log(document.querySelectorAll('.header-info_item'))
  let items = document.querySelectorAll('.header-info_item')
  items.forEach(e => {e.classList.remove('__main-link')})
  items[4].classList.add('__main-link')
};

if (frontAddress.concat('/send_documents.html') == window.location.href) {
  console.log(document.querySelectorAll('.header-info_item'))
  let items = document.querySelectorAll('.header-info_item')
  items.forEach(e => {e.classList.remove('__main-link')})
  items[5].classList.add('__main-link')
};

if (frontAddress.concat('/auth.html') == window.location.href) {
  console.log(document.querySelectorAll('.header-info_item'))
  let items = document.querySelectorAll('.header-info_item')
  items.forEach(e => {e.classList.remove('__main-link')})
  items[6].classList.add('__main-link')
};

document.querySelector('.header-menu-icon').addEventListener('click', () => {

  document.querySelector('.header').classList.toggle('active')
})

// doTask(institutionsGet(""));
if (authContainer) {
  if (getWithExpiry("token")) {
    clearParent(authContainer);
    authContainer.innerHTML =
      "<div class = 'auth-reg f sc f-col'>" +
      "<a href='/auth-profile.html' class='auth-reg_link tac'>Редактировать/ввести личные данные</a>" +
      "<div class='auth-reg_link tac' id='logout'>Выйти</div>" +
      "</div>";

    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.reload("true");
    });
  } else {
    document.getElementById("signup").addEventListener("click", () => {
      const data = {};
      clearParent(authContainer);

      // document.createElement('')
      authContainer.classList.add("f-col");
      authContainer.innerHTML =
        "<h3 class='tac'>Регистрация</h3>" +
        "<div class='auth-input f f-col'>" +
        "<label for='email'>Email</label>" +
        "<input type='text' id='email' value='' name='email'>" +
        "</div>" +
        "<div class='auth-input f f-col'>" +
        "<label for='pass'>Пароль</label>" +
        "<input type='password' id='pass' name='pass'>" +
        // "<div class='auth_enter-forgot'>Забыли пароль?</div>"+
        "</div>" +
        "<div class='auth_enter-buttons f jc-sb'>" +
        "<div class='auth_enter-confirm' id='signup-button'>Зарегистрироваться</div>" +
        "<div class='auth_enter-back'>Отмена</div>" +
        "</div>";
      document.getElementById("email").onchange = (event) => {
        event.target.value;
        data[event.target.name] = event.target.value;
        console.log(data);
      };

      document.getElementById("pass").onchange = (event) => {
        event.target.value;
        data[event.target.name] = event.target.value;
        console.log(data);
      };
      console.log(document.querySelector(".auth_enter-confirm"));
      document
        .querySelector(".auth_enter-confirm")
        .addEventListener("click", () => {
          // console.log(logIn(data))
          doTask(signUp(data));
          // console.log(doTask(signUp(data)))
          // console.log(localStorage.getItem('email'))
          // window.location.reload(true)
        });
      document
        .querySelector(".auth_enter-back")
        .addEventListener("click", () => {
          window.location.reload(true);
        });
    });

    //   label(for="email") Email
    //     input(type="text", id="email", name="email")
    // .auth-input.f.f-col
    //     label(for="pass") Пароль
    //     input(type="password", id="pass", name="pass")

    document.getElementById("login").addEventListener("click", () => {
      const data = {};

      clearParent(authContainer);
      // document.createElement('')
      authContainer.classList.add("f-col");
      authContainer.innerHTML =
        "<h3 class='tac'>Вход в кабинет</h3>" +
        "<div class='auth-input f f-col'>" +
        "<label for='email'>Email</label>" +
        "<input type='text' id='email' name='email'>" +
        "</div>" +
        "<div class='auth-input f f-col'>" +
        "<label for='pass'>Пароль</label>" +
        "<input type='password' id='pass' name='pass'>" +
        "<div class='auth_enter-forgot m-t10'>Забыли пароль?</div>" +
        "</div>" +
        "<div class='auth_enter-buttons f jc-sb'>" +
        "<div class='auth_enter-confirm' id='login-button'>Войти</div>" +
        "<div class='auth_enter-back'>Отмена</div>" +
        "</div>";
      document.getElementById("email").onchange = (event) => {
        event.target.value;
        data[event.target.name] = event.target.value;
        console.log(data);
      };

      document.getElementById("pass").onchange = (event) => {
        event.target.value;
        data[event.target.name] = event.target.value;
        console.log(data);
      };
      document
        .querySelector(".auth_enter-confirm")
        .addEventListener("click", () => {
          // console.log(logIn(data))

          doTask(logIn(data));
          // TEST
          if (entryStatus) document.location.href = "/auth-profile.html";
          // doTask(myProfile())
          // console.log(localStorage.getItem('email'))
          // window.location.reload(true)
        });
      document
        .querySelector(".auth_enter-back")
        .addEventListener("click", () => {
          window.location.reload(true);
          // authContainer.innerHTML=enter[0].innerHTML
        });
    });
  }
}

// const links = document.querySelectorAll(".header-info_item")
console.log(getWithExpiry("token"));
if (!authContainer && !authProfile) {
  //TEST
  // if(false) {
  if (
    !document.querySelector(".news-main") &&
    !document.querySelector(".docs-list") &&
    !document.querySelector(".contact-title")
  ) {
    if (getWithExpiry("token")) {
  
      console.log(docFull);

      setTimeout(() => {
        console.log(docFull, 564);
        if (docFull) {
          console.log("YEP");
          if (document.querySelector(".post-filters_main")) {
            let form = {};
            let params = "";
            form.ed_type = "Платной";
            form.ei_type = "вуз";

            document.querySelectorAll(".ei-item").forEach((e) => {
              e.addEventListener("click", (event) => {
                console.log(1);
                filter(".ei-item", event.target, "active");
                if (e.innerText == "ВУЗ") {
                  form.ei_type = "вуз";
                } else {
                  form.ei_type = "суз";
                }

                if (form.region) {
                  params = "";
                  params = params.concat(
                    "?region=",
                    form.region,
                    "&type=",
                    form.ei_type
                  );
                  doTask(institutionsGet(params));
                  setEis()
                }
                console.log(form);
              });
            });

            // let region = document.getElementById('#region')
            document
              .getElementById("region")
              .addEventListener("change", (e) => {
                // console.log(e.target.value)
                if (e.target.value != "") {
                  form.region = e.target.value;
                  params = "";
                  params = params.concat(
                    "?region=",
                    form.region,
                    "&type=",
                    form.ei_type
                  );
                  doTask(institutionsGet(params));
                  setEis()

                } else delete form.region;
                console.log(form);
                console.log(params);
              });

            document.querySelectorAll(".ed-type").forEach((e) => {
              e.addEventListener("click", (event) => {
                console.log(1);
                filter(".ed-type", event.target, "active");
                if (e.innerText == "Платной") {
                  form.ed_type = "Платной";
                } else {
                  form.ed_type = "Бюджетной";
                }
                console.log(form);
              });
            });
            function setEis () {
              let ei = document.getElementById('name')
             
              setTimeout(()=>{console.log(eis)
                ei.innerHTML = ''
                eis.forEach((e,i) => {
                  ei.innerHTML+= 
                  `<option value=${e.name}>${e.alias}</option>`
                })},3000)
                
            }
          
            
            // ei.innerHTML+=
          }
        } else {
          console.log("Accepted");
      
          // clearParent(blockContainer);
          // blockContainer.innerHTML =
          //   "<div class='block-auth f f-col ai'>" +
          //   "<p>Для пользования ресурсами сайта необходимо заполнить профиль, для продолжения нажмите 'Согласен'</p>" +
          //   "<a href='/auth-profile.html' class='block-auth_container'>" +
          //   "<div class='block-auth_confirm'>Согласен</div>" +
          //   "</a>" +
          //   "</div>";
        }
      }, 2000);
    } else {
      console.log(1222);
      // clearParent(blockContainer);
      // blockContainer.innerHTML =
      //   "<div class='block-auth f f-col ai'>" +
      //   "<p>Для пользования ресурсами сайта необходимо зарегистрироваться или войти в аккаунт, для продолжения нажмите 'Согласен'</p>" +
      //   "<a href='/auth.html' class='block-auth_container'>" +
      //   "<div class='block-auth_confirm'>Согласен</div>" +
      //   "</a>" +
      //   "</div>";
    }
  } else {
    if (document.querySelector(".news-main")) {
      doTask(newsGet());
      //
      //   setTimeout(() => {
      //     console.log(news, 334);
      //     news.forEach(e=> {

      //     })
      //   }, 1000);

      //   console.log(news)
    }

    if (document.querySelector('.contact-title')) {
      if (document.querySelector(".contact-search")) {
        let form = {};
        let nameSelect = document.getElementById('name')
        let n
        let optValue = ''
        let params = "";
        form.ei_type = "вуз";

        document.querySelectorAll(".ei-item").forEach((e) => {
          e.addEventListener("click", (event) => {
            console.log(1);
            filter(".ei-item", event.target, "active");
            if (e.innerText == "ВУЗ") {
              form.ei_type = "вуз";
            } else {
              form.ei_type = "суз";
            }
            document.querySelector('.contact-info_phone').innerHTML= ''
          document.querySelector('.contact-info_alias').innerHTML= ''
          document.querySelector('.contact-info_name').innerHTML= ''

            if (form.region) {
              params = "";
              params = params.concat(
                "?region=",
                form.region,
                "&type=",
                form.ei_type
              );
              doTask(institutionsGet(params));
              setEis()
            }
            console.log(form);
          });
        });

        // let region = document.getElementById('#region')
        document
          .getElementById("region")
          .addEventListener("change", (e) => {
            document.querySelector('.contact-info_phone').innerHTML= ''
            document.querySelector('.contact-info_alias').innerHTML= ''
            document.querySelector('.contact-info_name').innerHTML= ''
            // console.log(e.target.value)
            if (e.target.value != "") {
              form.region = e.target.value;
              params = "";
              params = params.concat(
                "?region=",
                form.region,
                "&type=",
                form.ei_type
              );
              doTask(institutionsGet(params));
              setEis()

            } else delete form.region;
            console.log(form);
            console.log(params);
          });

       
        function setEis () {
          let ei = document.getElementById('name')
          setTimeout(()=>{console.log(eis)
            ei.innerHTML = '<option value="", selected> Наименование УО</option>'
            eis.forEach((e) => {
              optValue = ''
              optValue = optValue.concat(e.name, '|', e.id)
              
              ei.innerHTML+= 
              `<option value="${optValue}">${e.alias}</option>`
              
            }
            )
            console.log(nameSelect.querySelectorAll('option'))
            // nameSelect.querySelectorAll('option').forEach(e => {
            //   // console.log(e)
            //   e.addEventListener('select', ()=>{console.log(e)})
            // })
          },2000)
            
        }
        // console.log(
        //   document.getElementById('name'))
        
        nameSelect.addEventListener('change', (e)=> {
          n = nameSelect.options.selectedIndex;
          // console.log(nameSelect.options[n].text)
          console.log(optValue)
          let optValueSep = e.target.value.split('|')
          console.log(optValueSep)
          form.ed_alias = nameSelect.options[n].text
          form.ed_name = optValueSep[0]
          form.ed_id = optValueSep[1]
          console.log(form)
          console.log(e.target.text)
          document.querySelector('.contact-info_phone').innerHTML= ''
          document.querySelector('.contact-info_alias').innerHTML= ''
          document.querySelector('.contact-info_name').innerHTML= ''
          doTask(institutionID(form?.ed_id))
          setTimeout(() => {
            
            document.querySelector('.contact-info_alias').innerHTML= form?.ed_alias
            document.querySelector('.contact-info_name').innerHTML= form?.ed_name
            form.ed_phone = contact_phone
            document.querySelector('.contact-info_phone').innerHTML= form?.ed_phone
          },2000)
          
        })
        
        
        // ei.innerHTML+=
      }
    }
  }
} else {
  console.log(12);
}

if (authProfile) {
  
  doTask(myProfileGet())
  // console.log(pros)
  
  setTimeout(()=> {
    console.log(profile)
    
    document.getElementById("surname").value = profile?.last_name
    document.getElementById("name").value = profile?.first_name
    document.getElementById("lastname").value = profile?.middle_name
    document.getElementById("date").value = profile?.birth_date.split('.').reverse().join('-')
    document.getElementById("registrate_place").value = profile?.registration_address
    document.getElementById("living_place").value = profile?.living_address
    document.getElementById("tel").value = profile?.phone
    

    console.log(document.getElementById("date").value)
  },2000)
 
  console.log(1111);
  const form = {};

  document.getElementById("surname").onchange = (event) => {
    form[event.target.name] = event.target.value;
    console.log(form);
  };
  document.getElementById("name").onchange = (event) => {
    form[event.target.name] = event.target.value;
    console.log(form);
  };
  document.getElementById("lastname").onchange = (event) => {
    form[event.target.name] = event.target.value;
    console.log(form);
  };
  document.getElementById("date").onchange = (event) => {
    let date = event.target.value;
    date = date.split("-").reverse().join(".");

    form[event.target.name] = date;
    console.log(form);
  };
  document.getElementById("registrate_place").onchange = (event) => {
    form[event.target.name] = event.target.value;
    console.log(form);
  };
  document.getElementById("living_place").onchange = (event) => {
    form[event.target.name] = event.target.value;
    console.log(form);
    // console.log(form['living-place'])
  };
  document.getElementById("tel").onchange = (event) => {
    form[event.target.name] = event.target.value;
    console.log(form);
  };
  form.gender = "Мужской";
  // console.log(document.querySelectorAll(".auth-input_sex-item"))
  document.querySelectorAll(".sex-item").forEach((e) => {
    e.addEventListener("click", () => {
      console.log(1);
      filter(".sex-item", event.target, "active");
      if (e.innerText == "М") {
        form.gender = "Мужской";
      } else {
        form.gender = "Женский";
      }
      console.log(form);
    });
  });

  // document.getElementById("pass").onchange = (event) => {
  //   event.target.value
  //   form[event.target.name] = event.target.value
  //   console.log(form)
  // }

  document.getElementById("first-next").addEventListener("click", () => {
    document.querySelectorAll('input').forEach (e => {
      if (e.name == 'date') { form[e.name] = e.value.split('-').reverse().join('.');  }else form[e.name] = e.value
      
    })
    console.log(profileStatus);
    if (profileStatus) {
      doTask(myProfileName(form));
    } else {
      doTask(myProfileInit(form));
    }
    console.log(form);
    clearParent(authProfile);
    authProfile.innerHTML =
      "<div class='auth-input'>" +
      "<div class='f'>Данные документа удостоверящие личность" +
      "<div class='__red'>*</div>" +
      "</div>" +
      "<div class='auth-input_bullet-container f'>" +
      "<div class='auth-input_bullet-item doc-item active'>Паспорт РБ</div>" +
      "<select class='auth-input_bullet-item doc-item' id='select'>" +
      "<option value='' selected>Иной</option>" +
      "<option value='Паспорт иностранного государства' >Паспорт иностранного государства</option>" +
      "<option value='Вид на жительство в РБ' >Вид на жительство в РБ</option>" +
      "<option value='Удостоверение беженца' >Удостоверение беженца</option>" +
      "</select>" +
      "</div>" +
      "<div class='f'>" +
      "<div class='auth-input f f-col'>" +
      "<label class='f' for='doc_serial'>Серия документа" +
      "<div class='__red'>*</div>" +
      "</label>" +
      "<input type='text' value='' id='doc_serial' maxlength='5' name='doc_serial'>" +
      "</div>" +
      "<div class='auth-input f f-col'>" +
      "<label class='f' for='doc_number'>Номер документа" +
      "<div class='__red'>*</div>" +
      "</label>" +
      "<input type='text' id='doc_number' value='' name='doc_number'>" +
      "</div>" +
      "<div class='auth-input f f-col'>" +
      "<label class='f' for='doc_date'>Дата выдачи" +
      "<div class='__red'>*</div>" +
      "</label>" +
      "<input type='date' id='doc_date' value='' name='doc_date'>" +
      "</div>" +
      "</div>" +
      "<div class='auth-input f f-col'>" +
      "<label class='f' for='doc_place'>Наименование государственного органа, выдавшего документ" +
      "<div class='__red'>*</div>" +
      "</label>" +
      "<input type='text' id='doc_place' value='' name='doc_place'>" +
      "</div>" +
      "<div class='auth-input f f-col'>" +
      "<label for='doc_id'>Индификационный номер (при наличии)</label>" +
      "<input type='text' id='doc_id' value='' name='doc_id'>" +
      "</div>" +
      "<a class='auth-link f' href='#' class='f'>С порядком приема и подачи апелляции в учреждении образования ознакомлен(а)" +
      "<div class='__red'>*</div>" +
      "</a>" +
      "<div id='second-next' class='auth-next f'>Перейти далее<div class='auth-container_img'><img src='/img/svg/arrow-next.svg' alt=''></div></div>" +
      "</div>";

      document.getElementById("doc_serial").value = profile?.personal_document?.series
      document.getElementById("doc_number").value = profile?.personal_document?.number
      document.getElementById("doc_date").value = profile?.personal_document?.emission_date.split('.').reverse().join('-')
      document.getElementById("doc_place").value = profile?.personal_document?.agency_name
      document.getElementById("doc_id").value = profile?.personal_document?.identification_number
      

     

    


    document.getElementById("doc_serial").onchange = (event) => {
      form[event.target.name] = event.target.value;
      console.log(form);
    };
    document.getElementById("doc_number").onchange = (event) => {
      form[event.target.name] = event.target.value;
      console.log(form);
    };
    document.getElementById("doc_date").onchange = (event) => {
      let date = event.target.value;

      date = date.split("-").reverse().join(".");

      form[event.target.name] = date;
      console.log(form);
    };
    document.getElementById("doc_place").onchange = (event) => {
      form[event.target.name] = event.target.value;
      console.log(form);
    };
    document.getElementById("doc_id").onchange = (event) => {
      form[event.target.name] = event.target.value;
      console.log(form);
    };
    const select = document.getElementById("select");
    console.log(select.options);
    form.doc = "Паспорт РБ";
    // select.onchange((event)=> {
    //   form['doc']= event.target.value
    //   console.log(form)
    document.querySelectorAll(".doc-item").forEach((e) => {
      e.addEventListener("click", (event) => {
        console.log(1);
        filter(".doc-item", event.target, "active");
        if (e.innerText == "Паспорт РБ") {
          form.doc = "Паспорт РБ";
        } else {
          document.getElementById("select").addEventListener("change", (e) => {
            form.doc = e.target.value;
            console.log(form);
          });
        }
        console.log(form);
      });
    });

    // select.onselect(console.log(1))

    document.getElementById("second-next").addEventListener("click", () => {
      document.querySelectorAll('input').forEach (e => {
        if (e.name == 'doc_date') form[e.name] = e.value.split('-').reverse().join('.'); else form[e.name] = e.value
        console.log(e.name , e.value)
      })
      doTask(myProfilePersonal(form));
      clearParent(authProfile);
      authProfile.innerHTML =
        "<div class='auth-input f f-col'>" +
        // "<div>Нуждаюсь/не нуждаюсь в общежитии</div>" +
        "<div class='auth-input_bullet f'>" +
        "<div class='auth-input_bullet-text'>Нуждаюсь/не нуждаюсь в общежитии</div>" +
        "<div class='auth-input_bullet-container f'>" +
        "<div class='auth-input_bullet-item hostel-item active'>Да</div>" +
        "<div class='auth-input_bullet-item hostel-item'>Нет</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='auth-ed-container'>" +
        "<div class='auth-ed-item f'>" +
        "<div class='auth-input f f-col'>" +
        "<label for='ed_name' class='f'>Закончил(a) УО" +
        "<div class='__red'>*</div>" +
        "</label>" +
        "<input type='text' name='ed_name0' id='ed_name0'>" +
        "</div>" +
        "<div class='auth-input f f-col'>" +
        "<label for='ed_date' class='f'>В году " +
        "<div class='__red'>*</div>" +
        "</label>" +
        "<input type='text' name='ed_date0' id='ed_date0'>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='auth-ed-add m-b10'>Добавить ещё УО</div>" +
        "<div>" +
        "<div>Трудовой стаж по профилю специальности</div>" +
        "<div class='auth-exp f'>" +
        "<div class='auth-input f f-col'>" +
        "<label for='exp_years'>Лет</label>" +
        "<input type='text' id='exp_years' name='exp_years'>" +
        "</div>" +
        "<div class='auth-input f f-col'>" +
        "<label for='exp_months'>Месяцев</label>" +
        "<input type='text' id='exp_months' name='exp_months'>" +
        "</div>" +
        "</div>" +
        "<div id='third-next' class='auth-next f'>Перейти далее<div class='auth-container_img'><img src='/img/svg/arrow-next.svg' alt=''></div></div>";

      if (document.getElementById("exp_months")) {
        IMask(document.getElementById("exp_months"), {
          mask: Number,
          min: 0,
          max: 11,
        });
      }

      document.getElementById("ed_name0").onchange = (event) => {
        form[event.target.name] = event.target.value;
        console.log(form);
      };
      document.getElementById("ed_date0").onchange = (event) => {
        let date = event.target.value;
        date = date.split("-").reverse().join(".");

        form[event.target.name] = date;
        console.log(form);
      };
      document.getElementById("exp_years").onchange = (event) => {
        form[event.target.name] = event.target.value;
        console.log(form);
      };
      document.getElementById("exp_months").onchange = (event) => {
        form[event.target.name] = event.target.value;
        console.log(form);
      };
      let i = 0;
      document.querySelector(".auth-ed-add").addEventListener("click", (e) => {
        if (i <= 3) {
          let item =
            "<div class='auth-ed-item f'>" +
            "<div class='auth-input f f-col'>" +
            "<label class='f' for='ed_name'>Закончил(a) УО" +
            "<div class='__red'>*</div>" +
            "</label>" +
            "<input type='text' name='ed_name' id='ed_name'>" +
            "</div>" +
            "<div class='auth-input f f-col'>" +
            "<label class='f' for='ed_date'>В году " +
            "<div class='__red'>*</div>" +
            "</label>" +
            "<input type='text' name='ed_date' id='ed_date'>" +
            "</div>" +
            "</div>";

          document.querySelector(".auth-ed-container").innerHTML += item;

          let items = {};
          items = document.querySelectorAll(".auth-ed-item");

          console.log(items);
          items.forEach((e, i) => {
            // console.log(e,i)
            // console.log(e.querySelectorAll('input'))
            let inputs = e.querySelectorAll("input");
            inputs.forEach((e) => {
              if (i != 0) {
                e.id += i;
                e.name += i;
              }
              // if (form[e.id]) {console.log(e.id)
              //   e.value = form[e.id]
              //   console.log(form[e.id])
              // }

              e.onchange = (event) => {
                form[event.target.name] = event.target.value;
                console.log(form);
              };
            });
            // console.log(inputs)
          });
          // console.log(items, items[0], items)
          // console.log(i)
          i++;
          if (i == 4) e.target.remove();
        }
      });
      form.hostel = false;

      document.querySelectorAll(".hostel-item").forEach((e) => {
        e.addEventListener("click", (event) => {
          console.log(1);
          filter(".hostel-item", event.target, "active");
          if (e.innerText == "Да") {
            form.hostel = true;
          } else {
            form.hostel = false;
          }
          console.log(form);
        });
      });

      document.getElementById("third-next").addEventListener("click", () => {
        doTask(myProfileGrads(form));
        clearParent(authProfile);
        authProfile.innerHTML =
          "<div>Отец</div>" +
          "<div class='f'>" +
          "<div class='auth-input f f-col'>" +
          "<label class='f' for='dad_surname'>Фамилия" +
          "<div class='__red'>*</div>" +
          "</label>" +
          "<input type='text' id='dad_surname' name='dad_surname'>" +
          "</div>" +
          "<div class='auth-input f f-col'>" +
          "<label class='f' for='dad_name'>Имя" +
          "<div class='__red'>*</div>" +
          "</label>" +
          "<input type='text' id='dad_name' name='dad_name'>" +
          "</div>" +
          "<div class='auth-input f f-col'>" +
          "<label class='f' for='dad_lastname'>Отчество" +
          "<div class='__red'>*</div>" +
          "</label>" +
          "<input type='text' id='dad_lastname' name='dad_lastname'>" +
          "</div>" +
          "</div>" +
          "<div class='auth-input f f-col'>" +
          "<label class='f' for='dad_address'>Проживает по адресу" +
          "<div class='__red'>*</div>" +
          "</label>" +
          "<input type='text' id='dad_address' name='dad_address'>" +
          "</div>" +
          "<div class='auth-input f ai'>" +
          "<label class='f' for='dad_tel'>Мобильный номер" +
          "<div class='__red'>*</div>" +
          "</label>" +
          "<input type='text' id='dad_tel' name='dad_tel'>" +
          "</div>" +
          "<div id='fourth-next' class='auth-next f'>Перейти далее<div class='auth-container_img'><img src='/img/svg/arrow-next.svg' alt=''></div></div>";


          
      document.getElementById("dad_name").value = profile?.father?.first_name
      document.getElementById("dad_surname").value = profile?.father?.last_name
      document.getElementById("dad_lastname").value = profile?.father?.middle_name
      document.getElementById("dad_address").value = profile?.father?.living_address
      document.getElementById("dad_tel").value = profile?.father?.phone_number

        document.getElementById("dad_name").onchange = (event) => {
          form[event.target.name] = event.target.value;
          console.log(form);
        };
        document.getElementById("dad_surname").onchange = (event) => {
          form[event.target.name] = event.target.value;
          console.log(form);
        };
        document.getElementById("dad_lastname").onchange = (event) => {
          form[event.target.name] = event.target.value;
          console.log(form);
        };
        document.getElementById("dad_address").onchange = (event) => {
          form[event.target.name] = event.target.value;
          console.log(form);
        };
        IMask(document.getElementById("dad_tel"), {
          mask: "+{375}-00-000-00-00",
        });

        document.getElementById("dad_tel").onchange = (event) => {
          form[event.target.name] = event.target.value;
        };

        document.getElementById("fourth-next").addEventListener("click", () => {
          doTask(myProfileFather(form));
          clearParent(authProfile);
          authProfile.innerHTML =
            "<div>Мать</div>" +
            "<div class='f'>" +
            "<div class='auth-input f f-col'>" +
            "<label class='f' for='mom_surname'>Фамилия" +
            "<div class='__red'>*</div>" +
            "</label>" +
            "<input type='text' id='mom_surname' name='mom_surname'>" +
            "</div>" +
            "<div class='auth-input f f-col'>" +
            "<label class='f' for='mom_name'>Имя" +
            "<div class='__red'>*</div>" +
            "</label>" +
            "<input type='text' id='mom_name' name='mom_name'>" +
            "</div>" +
            "<div class='auth-input f f-col'>" +
            "<label class='f' for='mom_lastname'>Отчество" +
            "<div class='__red'>*</div>" +
            "</label>" +
            "<input type='text' id='mom_lastname' name='mom_lastname'>" +
            "</div>" +
            "</div>" +
            "<div class='auth-input f f-col'>" +
            "<label class='f' for='mom_address'>Проживает по адресу" +
            "<div class='__red'>*</div>" +
            "</label>" +
            "<input type='text' id='mom_address' name='mom_address'>" +
            "</div>" +
            "<div class='auth-input f ai'>" +
            "<label class='f' for='mom_tel'>Мобильный номер" +
            "<div class='__red'>*</div>" +
            "</label>" +
            "<input type='text' id='mom_tel' name='mom_tel'>" +
            "</div>" +
            "<div id='fifth-next' class='auth-next f'>Перейти далее<div class='auth-container_img'><img src='/img/svg/arrow-next.svg' alt=''></div></div>";


            document.getElementById("mom_name").value = profile?.mother?.first_name
            document.getElementById("mom_surname").value = profile?.mother?.last_name
            document.getElementById("mom_lastname").value = profile?.mother?.middle_name
            document.getElementById("mom_address").value = profile?.mother?.living_address
            document.getElementById("mom_tel").value = profile?.mother?.phone_number

          document.getElementById("mom_name").onchange = (event) => {
            form[event.target.name] = event.target.value;
            console.log(form);
          };
          document.getElementById("mom_surname").onchange = (event) => {
            form[event.target.name] = event.target.value;
            console.log(form);
          };
          document.getElementById("mom_lastname").onchange = (event) => {
            form[event.target.name] = event.target.value;
            console.log(form);
          };
          document.getElementById("mom_address").onchange = (event) => {
            form[event.target.name] = event.target.value;
            console.log(form);
          };

          IMask(document.getElementById("mom_tel"), {
            mask: "+{375}-00-000-00-00",
          });

          document.getElementById("mom_tel").onchange = (event) => {
            form[event.target.name] = event.target.value;
          };

          document
            .getElementById("fifth-next")
            .addEventListener("click", () => {
              doTask(myProfileMother(form));
              clearParent(authProfile);
              authProfile.innerHTML =
                "<div class='f f-col jc tac'>" +
                "<div>Льготы</div>" +
                "<div>(заполняется при наличии льгот)</div>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='privil'>Документ подтверджающий льготы" +
                "<div class='__red'>*</div>" +
                "</label>" +
                "<input type='text' id='privil' name='privil'>" +
                "</div>" +
                "<div class='f'>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='privil_series'>Серия" +
                "<div class='__red'>*</div>" +
                "</label>" +
                "<input type='text' id='privil_series' name='privil_series' maxlength='5'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='privil_number'>Номер" +
                "<div class='__red'>*</div>" +
                "</label>" +
                "<input type='text' id='privil_number' name='privil_number'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='privil_date'>Дата выдачи" +
                "<div class='__red'>*</div>" +
                "</label>" +
                "<input type='date' id='privil_date' name='privil_date'>" +
                "</div>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='privil_place'>Наименование государственного органа выдавшего документ" +
                "<div class='__red'>*</div>" +
                "</label>" +
                "<input type='text' id='privil_place' name='privil_place'>" +
                "</div>" +
                "<div id='sixth-next' class='auth-next f'>Перейти далее<div class='auth-container_img'><img src='/img/svg/arrow-next.svg' alt=''></div></div>";

                document.getElementById("privil").value = profile?.privilege_document?.name
                document.getElementById("privil_series").value = profile?.privilege_document?.series
                document.getElementById("privil_number").value = profile?.privilege_document?.number
                document.getElementById("privil_date").value = profile?.privilege_document?.emission_date.split('.').reverse().join('-')
                document.getElementById("privil_place").value = profile?.privilege_document?.agency_name


              document.getElementById("privil").onchange = (event) => {
                form[event.target.name] = event.target.value;
                console.log(form);
              };
              document.getElementById("privil_series").onchange = (event) => {
                form[event.target.name] = event.target.value;
                console.log(form);
              };
              document.getElementById("privil_number").onchange = (event) => {
                form[event.target.name] = event.target.value;
                console.log(form);
              };
              document.getElementById("privil_date").onchange = (event) => {
                let date = event.target.value;
                date = date.split("-").reverse().join(".");

                form[event.target.name] = date;

                console.log(form);
              };
              document.getElementById("privil_place").onchange = (event) => {
                form[event.target.name] = event.target.value;
                console.log(form);
              };
              document
                .getElementById("sixth-next")
                .addEventListener("click", () => {
                  doTask(myProfilePrivil(form));
                  clearParent(authProfile);
                  authProfile.innerHTML =
                    "<div>Результаты ЦТ</div>" +
                    "<div>Балл</div>" +
                    "<div class='f ai'><div>1</div>" +
                    "<select class='auth-input_sub-item'>" +
                    "<option value='' selected>Предмет</option>" +
                    "<option value='Биология' >Биология</option>" +
                    "<option value='Всемирная история' >Всемирная история</option>" +
                    "<option value='География' >География</option>" +
                    "<option value='Белорусский язык' >Белорусский язык</option>" +
                    "<option value='Русский язык' >Русский язык</option>" +
                    "<option value='Математика' >Математика</option>" +
                    "<option value='Иностранный язык' >Иностранный язык</option>" +
                    "<option value='История Беларуси' >История Беларуси</option>" +
                    "<option value='Математика' >Математика</option>" +
                    "<option value='Обществоведение' >Обществоведение</option>" +
                    "<option value='Химия' >Химия</option>" +
                    "<option value='Физика' >Физика</option>" +
                    "</select>" +
                    "<div class='auth-input'><input class='__mark' type='text'></div>" +
                    "</div>" +
                    "<div class='f ai'><div>2</div>" +
                    "<select class='auth-input_sub-item'>" +
                    "<option value='' selected>Предмет</option>" +
                    "<option value='Биология' >Биология</option>" +
                    "<option value='Всемирная история' >Всемирная история</option>" +
                    "<option value='География' >География</option>" +
                    "<option value='Белорусский язык' >Белорусский язык</option>" +
                    "<option value='Русский язык' >Русский язык</option>" +
                    "<option value='Математика' >Математика</option>" +
                    "<option value='Иностранный язык' >Иностранный язык</option>" +
                    "<option value='История Беларуси' >История Беларуси</option>" +
                    "<option value='Математика' >Математика</option>" +
                    "<option value='Обществоведение' >Обществоведение</option>" +
                    "<option value='Химия' >Химия</option>" +
                    "<option value='Физика' >Физика</option>" +
                    "</select>" +
                    "<div class='auth-input'><input class='__mark' type='text'></div>" +
                    "</div>" +
                    "<div class='f ai'><div>3</div>" +
                    "<select class='auth-input_sub-item'>" +
                    "<option value='' selected>Предмет</option>" +
                    "<option value='Биология' >Биология</option>" +
                    "<option value='Всемирная история' >Всемирная история</option>" +
                    "<option value='География' >География</option>" +
                    "<option value='Белорусский язык' >Белорусский язык</option>" +
                    "<option value='Русский язык' >Русский язык</option>" +
                    "<option value='Математика' >Математика</option>" +
                    "<option value='Иностранный язык' >Иностранный язык</option>" +
                    "<option value='История Беларуси' >История Беларуси</option>" +
                    "<option value='Математика' >Математика</option>" +
                    "<option value='Обществоведение' >Обществоведение</option>" +
                    "<option value='Химия' >Химия</option>" +
                    "<option value='Физика' >Физика</option>" +
                    "</select>" +
                    "<div class='auth-input'><input class='__mark' type='text'></div>" +
                    "</div>" +
                    "<div class='f ai'><div>4</div>" +
                    "<select class='auth-input_sub-item'>" +
                    "<option value='' selected>Предмет</option>" +
                    "<option value='Биология' >Биология</option>" +
                    "<option value='Всемирная история' >Всемирная история</option>" +
                    "<option value='География' >География</option>" +
                    "<option value='Белорусский язык' >Белорусский язык</option>" +
                    "<option value='Русский язык' >Русский язык</option>" +
                    "<option value='Математика' >Математика</option>" +
                    "<option value='Иностранный язык' >Иностранный язык</option>" +
                    "<option value='История Беларуси' >История Беларуси</option>" +
                    "<option value='Математика' >Математика</option>" +
                    "<option value='Обществоведение' >Обществоведение</option>" +
                    "<option value='Химия' >Химия</option>" +
                    "<option value='Физика' >Физика</option>" +
                    "</select>" +
                    "<div class='auth-input'><input class='__mark' type='text'></div>" +
                    "</div>" +
                    "<div class='auth-input ai f'><label for='ct'>Балл в аттестате</label><input type='text' id='ct'></div>" +
                    "<div id='last-next' class='auth-next f'>Подать документы<div class='auth-container_img'><img src='/img/svg/arrow-next.svg' alt=''></div></div>";


                    // document.getElementById("privil").value = profile?.privilege_document?.name

                    // document
                    // .querySelectorAll(".auth-input_sub-item")
                    // .forEach((elem, i) =>
                    //   elem.addEventListener("change", (e) => {
                    //     i += 1;
                    //     e.target.value = ;
                    //     i -= 1;
                    //     console.log(form);
                    //     // form[sub].name = e.target.value console.log(form)
                    //   })
                    // );

                  document
                    .querySelectorAll(".auth-input_sub-item")
                    .forEach((elem, i) =>
                      elem.addEventListener("change", (e) => {
                        i += 1;
                        form[`subname${i}`] = e.target.value;
                        i -= 1;
                        console.log(form);
                        // form[sub].name = e.target.value console.log(form)
                      })
                    );
                  if (document.getElementById("ct")) {
                    IMask(document.getElementById("ct"), {
                      mask: Number,
                      min: 0,
                      max: 10,
                    });
                    document.getElementById("ct").onchange = (e) => {
                      form.ct = e.target.value;
                    };
                  }

                  // form.ct = document.getElementById('ct').value
                  // document.querySelectorAll('input').forEach((elem,i)=>elem.addEventListener('change', (e)=>{
                  //   const sub= 'sub' +i+1
                  //   form[sub['mark']] = e.target.valueconsole.log(form)
                  // }))

                  document.querySelectorAll(".__mark").forEach((elem, i) => {
                    IMask(elem, {
                      mask: Number,
                      min: 0,
                      max: 100,
                    });
                    elem.onchange = (e) => {
                      i += 1;

                      form[`submark${i}`] = e.target.value;
                      i -= 1;
                      console.log(form);
                      // form[sub].target = e.target.valueconsole.log(form)
                    };
                  });

                  // document.getElementById('select').addEventListener('change', (e)=>{form.doc = e.target.value console.log(form)})
                  document
                    .getElementById("last-next")
                    .addEventListener("click", () => {
                      doTask(myProfileSub(form));
                      // doTask(myProfile(form));
                      // TEST

                      
                      document.location.href =
                        "/index.html";
                    });
                });
            });
        });
      });
    });
  });
} else {
  doTask(myProfileGet());
}
