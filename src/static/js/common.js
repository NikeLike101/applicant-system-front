const enter = document.querySelectorAll(".auth_enter");
const blockContainer = document.querySelector(".block-container");
const authProfile = document.querySelector(".auth-profile_container");
const authContainer = document.querySelector(".auth-container_enter");
const dayTime = 86400000;
const second = 600000;
let news = [];
let eis = [];
let adminStatus = false;
let profile = {};
let prof = {};
let profileInAdmin = {};
let specStatus = false;
let adminInfo = [];
let adminSpecs = [];
let profileInited = true;
let contact_phone = "";
let entryStatus = false;
let profileStatus = false;
let docFull = false;
let specs = [];
// let reqDebug = "http://localhost:8000";
let reqDebug = "http://enrollee.by";

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
      window.location.reload();
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

// const CorrectInput = (text) => {
//   if (text.id == 'name') {
//     console.log(text)
//     const RegEx = new RegExp("[А-Яа-яЁё]");
//     console.log(RegEx)
//     const myArray = RegEx.exec("text");
//     console.log(myArray)
//     text.innerHTML = myArray.toString()
//   }
// }

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
          first_name: data?.name,
          last_name: data?.surname,
          middle_name: data?.lastname,
          gender: data?.gender,
          registration_address: data?.registrate_place,
          living_address: data?.living_place,
          profile_photo: null,
          birth_date: data?.date,
          phone: data?.tel,
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
          phone: data?.tel,
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
  console.log(data);
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
//zxc

const specAccept = (id) => {
  console.log(getWithExpiry("token"));
  console.log(parseInt(id));
  if (getWithExpiry("token")) {
    return new Promise((resolve, reject) => {
      fetch(reqDebug.concat(`/api/v1/users/request_specialization/${id}/`), {
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
          approved: true,
        }),
      }).then((response) => {
        resolve(response.json());
        // console.log(response.json())
        // console.log("Bearer " +getWithExpiry("token"))
      });
    });
  }
};

const forgot = (email) => {
  // console.log(getWithExpiry("token"));
  // console.log(prof?.id, parseInt(id));
  // if (getWithExpiry("token")) {
  return new Promise((resolve, reject) => {
    fetch(reqDebug.concat("/api/v1/users/reset_password/"), {
      method: "POST",
      headers: {
        Host: reqDebug,
        // Authorization: "Bearer " + getWithExpiry("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken":
          "Gzadcved0Ggks9TOH0ckzm3iUTXyO951KwZihb3oPDoYxbrRX5Ia38PqHxuelQQz",
      },
      body: JSON.stringify({
        email,
      }),
    }).then((response) => {
      resolve(response.json());
      // console.log(response.json())
      // console.log("Bearer " +getWithExpiry("token"))
    });
  });
  // } else {
  // }
};

const specPost = (id) => {
  console.log(getWithExpiry("token"));
  console.log(prof?.id, parseInt(id));
  if (getWithExpiry("token")) {
    return new Promise((resolve, reject) => {
      fetch(reqDebug.concat("/api/v1/users/request_specialization/"), {
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
          profile: prof?.id,
          specialization: parseInt(id),
        }),
      }).then((response) => {
        resolve(response.json());
        // console.log(response.json())
        // console.log("Bearer " +getWithExpiry("token"))
      });
    });
  }
};

const specInfoGet = (id) => {
  // console.log(getWithExpiry("token"));
  // console.log(prof?.id, parseInt(id));
  if (getWithExpiry("token")) {
    return new Promise((resolve, reject) => {
      fetch(reqDebug.concat(`/api/v1/institutions/specializations/${id}`), {
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
  }
};

const specGet = (form) => {
  // console.log(getWithExpiry("token"));
  // console.log(prof?.id, parseInt(id));
  let params;
  if (form.pass_id) {
    params = `?last_name=${form.surname}&first_name=${form.name}&middle_name=${form.lastname}&identification_number=${form.pass_id}`;
  } else {
    params = `?last_name=${form.surname}&first_name=${form.name}&middle_name=${form.lastname}`;
  }

  if (getWithExpiry("token")) {
    return new Promise((resolve, reject) => {
      fetch(reqDebug.concat(`/api/v1/users/request_specialization/${params}`), {
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
  console.log(data);
  profile = data;

  // if (document.querySelector(".admin-panel")) {
  //   // if (data)

  //   if (data[0]?.is_budget == true || data[0]?.is_budget == false) {
  //     adminInfo = data;
  //   }

  //   if ((data?.alias && data?.budget_rate == null) || data?.budget_rate) {
  //     adminSpecs = data;
  //   }
  // }
  console.log(data);
  if (data !== undefined) {
    if (data[0]?.approved == true || data[0]?.approved == false) {
      console.log(123);
      profileInAdmin = data[0]?.profile;
    }
  }

  if (data?.non_field_errors) {
    specStatus = true;
    createAlert(
      "Заявка на эту специальность уже была подана, проверьте введенные данные"
    );
  }

  if (
    document.querySelector(".post-filters_spec") ||
    document.querySelector(".stats")
  ) {
    console.log(data);
    if (data?.alias && data?.contact_phone) {
      eis = data;
      console.log(1);
      specs = data?.specializations;
      console.log(specs);

      if (document.querySelector(".stats")) {
        let table = document.querySelector(".stats-info");

        specs.forEach((e) => {
          table.innerHTML +=
            "<tr class='fav-ei_item f jc-sb'>" +
            `<td>${e.alias}</td><td>${e.name}</td><td>${
              e?.budget_rate || "Балл не известен"
            }</td><td>${e?.paid_rate || "Балл не известен"}</td>` +
            "</tr>";
        });
      }

      if (document.getElementById("specs")) {
        document.getElementById("specs").innerHTML = "";
        specs.forEach((e) => {
          let specInfo = "";
          specInfo = specInfo.concat(
            e?.alias,
            "|",
            e?.id,
            "|",
            e?.institution,
            "|",
            e?.name
          );
          //qwe

          document.getElementById(
            "specs"
          ).innerHTML += `<option value='${specInfo}'>${e.alias}</option>`;
        });
      }
    }
    if (data?.birth_date) {
      prof = data;
    }
  }

  if (document.querySelector(".auth-profile")) {
    if (profile === undefined) profileInited = false;
  }

  if (document.getElementById("login-button")) {
    if (data.status_code) {
      if (data?.status_code == 401) {
        createAlert("Вход запрещен, проверьте введеные данные");
      }

      if (data?.status_code == 400) {
      }
    } else {
      if (data?.access) {
        setWithExpiry("token", data?.access, dayTime);
        createAlert(
          'Вход произошел успешно! Нажмите "ОК" для завершения входа'
        );
        if (data?.admin == true) {
          setWithExpiry("admin", true, dayTime);
          alertWindow
            .querySelector("#alert-first")
            .addEventListener("click", () => {
              document.location.href = "/admin-panel.html";
            });
        } else {
          alertWindow
            .querySelector("#alert-first")
            .addEventListener("click", () => {
              document.location.href = "/auth-profile.html";
            });
        }
        entryStatus = true;
      }
    }
  }
  if (data?.contact_phone) contact_phone = data?.contact_phone;
  console.log(profileStatus);
  if (data?.detail !== "Объекта не существует") {
    profileStatus = true;
    docFull = true;
    // console.log(docFull, 123)
  } else {
    profileStatus = false;
  }

  if (
    document.querySelector(".contact-search") ||
    document.querySelector(".post-filters_main") ||
    document.querySelector(".stats")
  ) {
    if (data[0]?.alias) {
      eis = data;
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

// const frontAddress = "http://localhost:3000";
const frontAddress = "http://enrollee.by";

// doTask(newsGet())
console.log(frontAddress.concat("/send_documents.html"));
console.log(window.location.href);
let items = document.querySelectorAll(".header-info_item");
if (
  frontAddress.concat("/index.html") == window.location.href ||
  frontAddress == window.location.href
) {
  console.log(document.querySelectorAll(".header-info_item"));
  // let items = document.querySelectorAll(".header-info_item");
  items.forEach((e) => {
    e.classList.remove("__main-link");
  });
  items[0].classList.add("__main-link");
}

if (frontAddress.concat("/statistics.html") == window.location.href) {
  console.log(document.querySelectorAll(".header-info_item"));
  // let items = document.querySelectorAll(".header-info_item");
  items.forEach((e) => {
    e.classList.remove("__main-link");
  });
  items[1].classList.add("__main-link");
}

if (frontAddress.concat("/documents.html") == window.location.href) {
  console.log(document.querySelectorAll(".header-info_item"));
  // let items = document.querySelectorAll(".header-info_item");
  items.forEach((e) => {
    e.classList.remove("__main-link");
  });
  items[2].classList.add("__main-link");
}

if (frontAddress.concat("/favourite.html") == window.location.href) {
  console.log(document.querySelectorAll(".header-info_item"));
  // let items = document.querySelectorAll(".header-info_item");
  items.forEach((e) => {
    e.classList.remove("__main-link");
  });
  items[3].classList.add("__main-link");
}

if (frontAddress.concat("/contacts.html") == window.location.href) {
  console.log(document.querySelectorAll(".header-info_item"));
  // let items = document.querySelectorAll(".header-info_item");
  items.forEach((e) => {
    e.classList.remove("__main-link");
  });
  items[4].classList.add("__main-link");
}

if (frontAddress.concat("/send_documents.html") == window.location.href) {
  console.log(document.querySelectorAll(".header-info_item"));
  // let items = document.querySelectorAll(".header-info_item");
  items.forEach((e) => {
    e.classList.remove("__main-link");
  });
  items[5].classList.add("__main-link");
}

if (frontAddress.concat("/auth.html") == window.location.href) {
  // let items = document.querySelectorAll(".header-info_item");
  items.forEach((e) => {
    e.classList.remove("__main-link");
  });
  items[6].classList.add("__main-link");
  // console.log(getWithExpiry('admin'))
}
if (getWithExpiry("token")) {
  if (!getWithExpiry("admin")) {
    // console.log(document.querySelectorAll(".header-info_item"));

    items[6].innerHTML = "Выход/ Редактирование данных";
  } else {
    items[6].innerHTML = "Выход/ Просмотреть заявки";
  }
}
document.querySelector(".header-menu-icon").addEventListener("click", () => {
  document.querySelector(".header").classList.toggle("active");
});

// doTask(institutionsGet(""));
if (authContainer) {
  if (getWithExpiry("token")) {
    clearParent(authContainer);
    if (!getWithExpiry("admin")) {
      authContainer.innerHTML =
        "<div class = 'auth-reg f sc f-col'>" +
        "<a href='/auth-profile.html' class='auth-reg_link tac'>Редактировать/ввести личные данные</a>" +
        "<div class='auth-reg_link tac' id='logout'>Выйти</div>" +
        "</div>";
    } else {
      authContainer.innerHTML =
        "<div class = 'auth-reg f sc f-col'>" +
        "<a href='/admin-panel.html' class='auth-reg_link tac'>Просмотреть заявки</a>" +
        "<div class='auth-reg_link tac' id='logout'>Выйти</div>" +
        "</div>";
    }

    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
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
        '<div class="auth_enter-forgot m-t10">' +
        '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#fff" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M463.315,48.684c-64.91-64.912-170.529-64.912-235.439,0c-42.666,42.666-58.166,104.143-43.068,160.789L4.878,389.403 c-3.122,3.122-4.877,7.356-4.877,11.771v94.177c0,9.194,7.454,16.648,16.648,16.648h94.177c4.415,0,8.649-1.755,11.771-4.877 l23.544-23.544c3.122-3.122,4.876-7.356,4.876-11.771v-30.44h30.44c4.415,0,8.649-1.754,11.771-4.876l23.545-23.545 c3.122-3.122,4.876-7.356,4.876-11.771v-30.44h30.44c4.415,0,8.649-1.755,11.771-4.877l38.664-38.664 c56.652,15.1,118.123-0.403,160.789-43.068C528.227,219.216,528.227,113.597,463.315,48.684z M439.774,260.581 c-35.956,35.956-88.336,48.228-136.702,32.026c-5.988-2.007-12.595-0.452-17.06,4.013l-40.816,40.816h-40.192 c-9.194,0-16.648,7.454-16.648,16.648v40.192l-13.793,13.793h-40.192c-9.194,0-16.648,7.454-16.648,16.648v40.192l-13.791,13.793 H33.298V408.07l182.081-182.081c4.465-4.465,6.02-11.072,4.014-17.06c-16.201-48.366-3.929-100.746,32.026-136.702 c51.93-51.928,136.424-51.929,188.355,0C491.702,124.157,491.702,208.653,439.774,260.581z"/> </g></g><g><g><path d="M416.229,95.773c-25.965-25.966-68.213-25.966-94.177,0c-25.965,25.965-25.965,68.211,0,94.177 c25.964,25.965,68.211,25.966,94.177,0C442.194,163.986,442.194,121.739,416.229,95.773z M392.685,166.405 c-12.982,12.981-34.106,12.981-47.089,0c-12.982-12.982-12.982-34.106,0-47.089c12.982-12.981,34.106-12.982,47.089,0 C405.667,132.299,405.667,153.423,392.685,166.405z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>' +
        "</div>" +
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
        .querySelector(".auth_enter-forgot")
        .addEventListener("click", () => {
          if (data?.email) {
            doTask(forgot(data?.email));
            createAlert("Ключ к восстановлению пароля отправлен на Вашу почту");
          } else {
            createAlert("Введите вашу почту для восстановления пароля");
          }
        });

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
    !document.querySelector(".stats") &&
    !document.querySelector(".contact-title")
  ) {
    if (getWithExpiry("token")) {
      // if(true) {
      console.log(docFull);

      setTimeout(() => {
        console.log(docFull, 564);
        if (docFull || document.querySelector(".admin-panel")) {
          console.log("YEP");
          if (document.querySelector(".post-filters_main")) {
            let form = {};
            let nameSelect = document.getElementById("name");
            let n;
            let optValue = "";
            let params = "";
            form.ei_type = "вуз";
            form.ed_type = "Платной";

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
                  if (!prof?.specializations[0]) {
                    doTask(institutionsGet(params));
                  } else {
                    doTask(institutionID(prof?.specializations[0].institution));
                  }
                  setEis();
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
                  if (!prof?.specializations[0]) {
                    doTask(institutionsGet(params));
                  } else {
                    doTask(institutionID(prof?.specializations[0].institution));
                  }
                  setEis();
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
            function setEis() {
              let ei = document.getElementById("name");
              console.log(prof, 1444);

              setTimeout(() => {
                console.log(eis);
                ei.innerHTML =
                  '<option value="", selected> Наименование УО</option>';
                if (!prof?.specializations[0]) {
                  eis.forEach((e) => {
                    optValue = "";
                    optValue = optValue.concat(e.name, "|", e.id);

                    ei.innerHTML += `<option value="${optValue}">${e.alias}</option>`;
                  });
                } else {
                  // console.log(object)
                  form.ed_name = eis?.name;
                  optValue = "";
                  optValue = optValue.concat(eis.name, "|", eis.id);
                  ei.innerHTML += `<option selected value="${optValue}">${eis.alias}</option>`;
                }

                console.log(nameSelect.querySelectorAll("option"));
              }, 3000);
            }
            nameSelect.addEventListener("change", (e) => {
              n = nameSelect.options.selectedIndex;
              // console.log(nameSelect.options[n].text)
              console.log(optValue);
              let optValueSep = e.target.value.split("|");
              console.log(optValueSep);
              form.ed_alias = nameSelect.options[n].text;
              form.ed_name = optValueSep[0];
              form.ed_id = optValueSep[1];
              console.log(form);
              console.log(e.target.text);
              doTask(institutionID(form.ed_id));

              //asd
            });
            document
              .querySelector(".post-send")
              .addEventListener("click", (e) => {
                console.log(e.target);
                let d = document.getElementById("specs").options.selectedIndex;
                if (specs[0].alias) {
                  doTask(
                    specPost(
                      document
                        .getElementById("specs")
                        .options[d].value.split("|")[1]
                    )
                  );
                }
                if (!specStatus) {
                  createAlert(
                    `Ваше заявление отправлено на рассмотрение представителю учережднения "${form?.ed_name}". Для подтверждения вашей заявки необходимо подтвердить свои данные в выбранном УО. Хотите отправить еще одно заявление?`,
                    "Да",
                    "Нет"
                  );
                  alertWindow
                    .querySelector("#alert-first")
                    .addEventListener("click", () => {
                      document.location.href = "/send_documents.html";
                    });
                  alertWindow
                    .querySelector("#alert-last")
                    .addEventListener("click", () => {
                      document.location.href = "/favourite.html";
                    });
                }
              });
            // ei.innerHTML+=
          }

          if (document.querySelector(".fav")) {
            // console.log(profile);
            const specs = profile.specializations;
            console.log(specs);
            let table = document.querySelector(".fav-ei");
            specs.forEach((e) => {
              table.innerHTML +=
                "<tr class='fav-ei_item f jc-sb'>" +
                `<td>${e.name}</td><td>${e.alias}</td><td>${
                  e.institution_alias
                }</td><td>${e?.budget_rate || "Балл не известен"}</td><td>${
                  e?.paid_rate || "Балл не известен"
                }</td>` +
                "</tr>";
            });
          } else console.log(112);
          if (document.querySelector(".admin-panel")) {
            const form = [];
            document.getElementById("name").onchange = (event) => {
              form[event.target.name] = event.target.value;
              console.log(form);
            };
            document.getElementById("surname").onchange = (event) => {
              form[event.target.name] = event.target.value;
              console.log(form);
            };
            document.getElementById("lastname").onchange = (event) => {
              form[event.target.name] = event.target.value;
              console.log(form);
            };
            document.getElementById("pass_id").onchange = (event) => {
              form[event.target.name] = event.target.value;
              console.log(form);
            };

            // document.querySelectorAll('input').forEach(e => {
            //   e.onchange = (event) => {
            //     form[event.target.name] = event.target.value;
            //   }
            // })

            const fillInfo = () => {
              console.log(profileInAdmin);
              let prof = Object.entries(profileInAdmin);
              console.log(prof);
              let info = document.querySelector(".admin-info");

              info.innerHTML =
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Фамилия" +
                "</label>" +
                "<input type='text' id='last_name' maxlength='15' value='' name='last_name'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Имя" +
                "</label>" +
                "<input type='text' id='first_name' maxlength='15' value='' name='first_name'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Отчество" +
                "</label>" +
                "<input type='text' id='middle_name' maxlength='15' value='' name='middle_name'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Пол" +
                "</label>" +
                "<input type='text' id='gender' maxlength='15' value='' name='gender'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Адрес регистрации" +
                "</label>" +
                "<input type='text' id='registration_address' value='' name='registration_address'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Адрес проживания" +
                "</label>" +
                "<input type='text' id='living_address' value='' name='living_address'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Дата рождения" +
                "</label>" +
                "<input type='date' id='birth_date'  value='' name='birth_date'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Номер телефона" +
                "</label>" +
                "<input type='text' id='phone'='15' value='' name='phone'>" +
                "</div>" +





                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Документ" +
                "</label>" +
                "<input type='text' id='document_type' maxlength='15' value='' name='document_type'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Номер документа" +
                "</label>" +
                "<input type='text' id='number' maxlength='15' value='' name='number'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Дата выдачи" +
                "</label>" +
                "<input type='text' id='emission_date' maxlength='15' value='' name='emission_date'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Индификационный номер" +
                "</label>" +
                "<input type='text' id='identification_number' maxlength='15' value='' name='identification_number'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Серия документа" +
                "</label>" +
                "<input type='text' id='series' maxlength='15' value='' name='series'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Учереждение выдачи" +
                "</label>" +
                "<input type='text' id='agency_name' maxlength='15' value='' name='agency_name'>" +
                "</div>" +





                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Фамилия отца" +
                "</label>" +
                "<input type='text' id='father_last_name' value='' name='father_last_name'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Имя отца" +
                "</label>" +
                "<input type='text' id='father_first_name' maxlength='15' value='' name='father_first_name'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Отчество отца" +
                "</label>" +
                "<input type='text' id='father_middle_name' maxlength='15' value='' name='father_middle_name'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Адрес отца" +
                "</label>" +
                "<input type='text' id='father_living_address' maxlength='15' value='' name='father_living_address'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Номер телефона отца" +
                "</label>" +
                "<input type='text' id='father_phone_number' maxlength='15' value='' name='father_phone_number'>" +
                "</div>" +





                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Фамилия матери" +
                "</label>" +
                "<input type='text' id='mother_last_name'  value='' name='mother_last_name'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Имя матери" +
                "</label>" +
                "<input type='text' id='mother_first_name' maxlength='15' value='' name='mother_first_name'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Отчество матери" +
                 "</label>" +
                "<input type='text' id='mother_middle_name' maxlength='15' value='' name='mother_middle_name'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Адрес матери" +
                  "</label>" +
                "<input type='text' id='mother_living_address' maxlength='15' value='' name='mother_living_address'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Номер телефона матери" +
                 "</label>" +
                "<input type='text' id='mother_phone_number' maxlength='15' value='' name='mother_phone_number'>" +
                "</div>" +




                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Документ подтверджающий льготы" +
                "</label>" +
                "<input type='text' id='privilege_name' maxlength='15' value='' name='privilege_name'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Серия документа" +
                "</label>" +
                "<input type='text' id='privilege_series' maxlength='15' value='' name='privilege_series'>" +
                "</div>" +
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Номер документа" +
                "</label>" +
                "<input type='text' id='privilege_number' maxlength='15' value='' name='privilege_number'>" +
                "</div>"+
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Дата выдачи документа" +
                "</label>" +
                "<input type='text' id='privilege_emisson_date' maxlength='15' value='' name='privilege_emisson_date'>" +
                "</div>"+
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>Наименование государственного органа выдавшего документ" +
                "</label>" +
                "<input type='text' id='privilege_agency_name' maxlength='15' value='' name='privilege_agency_name'>" +
                "</div>"+




                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>1-ый предмет" +
                "</label>" +
                "<input type='text' id='result1' maxlength='15' value='' name='result1'>" +
                "</div>"+
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>2-ой предмет" +
                "</label>" +
                "<input type='text' id='result2' maxlength='15' value='' name='result2'>" +
                "</div>"+
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>3-ий предмет" +
            
                "</label>" +
                "<input type='text' id='result3' maxlength='15' value='' name='result3'>" +
                "</div>"+
                "<div class='auth-input f f-col'>" +
                "<label class='f' for='doc_number'>4-ый предмет" +
                
                "</label>" +
                "<input type='text' id='result4' maxlength='15' value='' name='result4'>" +
                "</div>"
                
                
            };

            document
              .querySelector(".admin-panel_search")
              .addEventListener("click", () => {
                console.log(Object.keys(form).length);
                if (Object.keys(form).length >= 3) {
                  doTask(specGet(form));
                  setTimeout(() => {
                    fillInfo();
                  }, 3000);
                } else {
                  createAlert("Ошибка. Заполните все поля.");
                }
              });
          }
        } else {
          console.log("Accepted");

          clearParent(blockContainer);
          blockContainer.innerHTML =
            "<div class='block-auth f f-col ai'>" +
            "<p>Для пользования ресурсами сайта необходимо заполнить профиль, для продолжения нажмите 'Согласен'</p>" +
            "<a href='/auth-profile.html' class='block-auth_container'>" +
            "<div class='block-auth_confirm'>Согласен</div>" +
            "</a>" +
            "</div>";
        }
      }, 2000);
    } else {
      console.log(1222);
      clearParent(blockContainer);
      blockContainer.innerHTML =
        "<div class='block-auth f f-col ai'>" +
        "<p>Для пользования ресурсами сайта необходимо зарегистрироваться или войти в аккаунт, для продолжения нажмите 'Согласен'</p>" +
        "<a href='/auth.html' class='block-auth_container'>" +
        "<div class='block-auth_confirm'>Согласен</div>" +
        "</a>" +
        "</div>";
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

    if (document.querySelector(".contact-title")) {
      if (document.querySelector(".contact-search")) {
        let form = {};
        let nameSelect = document.getElementById("name");
        let n;
        let optValue = "";
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
            document.querySelector(".contact-info_phone").innerHTML = "";
            document.querySelector(".contact-info_alias").innerHTML = "";
            document.querySelector(".contact-info_name").innerHTML = "";

            if (form.region) {
              params = "";
              params = params.concat(
                "?region=",
                form.region,
                "&type=",
                form.ei_type
              );
              doTask(institutionsGet(params));
              setEis();
            }
            console.log(form);
          });
        });

        // let region = document.getElementById('#region')
        document.getElementById("region").addEventListener("change", (e) => {
          document.querySelector(".contact-info_phone").innerHTML = "";
          document.querySelector(".contact-info_alias").innerHTML = "";
          document.querySelector(".contact-info_name").innerHTML = "";
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
            setEis();
          } else delete form.region;
          console.log(form);
          console.log(params);
        });

        function setEis() {
          let ei = document.getElementById("name");
          setTimeout(() => {
            console.log(eis);
            ei.innerHTML =
              '<option value="", selected> Наименование УО</option>';
            eis.forEach((e) => {
              optValue = "";
              optValue = optValue.concat(e.name, "|", e.id);

              ei.innerHTML += `<option value="${optValue}">${e.alias}</option>`;
            });
            console.log(nameSelect.querySelectorAll("option"));
            // nameSelect.querySelectorAll('option').forEach(e => {
            //   // console.log(e)
            //   e.addEventListener('select', ()=>{console.log(e)})
            // })
          }, 2000);
        }
        // console.log(
        //   document.getElementById('name'))

        nameSelect.addEventListener("change", (e) => {
          n = nameSelect.options.selectedIndex;
          // console.log(nameSelect.options[n].text)
          console.log(optValue);
          let optValueSep = e.target.value.split("|");
          console.log(optValueSep);
          form.ed_alias = nameSelect.options[n].text;
          form.ed_name = optValueSep[0];
          form.ed_id = optValueSep[1];
          console.log(form);
          console.log(e.target.text);
          document.querySelector(".contact-info_phone").innerHTML = "";
          document.querySelector(".contact-info_alias").innerHTML = "";
          document.querySelector(".contact-info_name").innerHTML = "";
          doTask(institutionID(form?.ed_id));
          setTimeout(() => {
            document.querySelector(".contact-info_alias").innerHTML =
              form?.ed_alias;
            document.querySelector(".contact-info_name").innerHTML =
              form?.ed_name;
            form.ed_phone = contact_phone;
            document.querySelector(".contact-info_phone").innerHTML =
              form?.ed_phone;
          }, 2000);
        });

        // ei.innerHTML+=
      }
    }
    if (document.querySelector(".stats")) {
      let form = {};
      let nameSelect = document.getElementById("name");
      let n;
      let optValue = "";
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

          if (form.region) {
            params = "";
            params = params.concat(
              "?region=",
              form.region,
              "&type=",
              form.ei_type
            );
            doTask(institutionsGet(params));
            setEis();
          }
          console.log(form);
        });
      });

      // let region = document.getElementById('#region')
      document.getElementById("region").addEventListener("change", (e) => {
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
          setEis();
        } else delete form.region;
        console.log(form);
        console.log(params);
      });

      function setEis() {
        let ei = document.getElementById("name");
        setTimeout(() => {
          console.log(eis);
          ei.innerHTML = '<option value="", selected> Наименование УО</option>';
          eis.forEach((e) => {
            optValue = "";
            optValue = optValue.concat(e.name, "|", e.id);

            ei.innerHTML += `<option value="${optValue}">${e.alias}</option>`;
          });
          console.log(nameSelect.querySelectorAll("option"));
          // nameSelect.querySelectorAll('option').forEach(e => {
          //   // console.log(e)
          //   e.addEventListener('select', ()=>{console.log(e)})
          // })
        }, 2000);
      }
      // console.log(
      //   document.getElementById('name'))

      nameSelect.addEventListener("change", (e) => {
        n = nameSelect.options.selectedIndex;
        // console.log(nameSelect.options[n].text)
        console.log(optValue);
        let optValueSep = e.target.value.split("|");
        console.log(optValueSep);
        form.ed_alias = nameSelect.options[n].text;
        form.ed_name = optValueSep[0];
        form.ed_id = optValueSep[1];
        console.log(form);
        // console.log(e.target.text);
      });

      document
        .querySelector(".stats-selects_update")
        .addEventListener("click", () => {
          document.querySelector(".stats-info").innerHTML = ''
          if (form.ed_alias != 'ИУП') {
            document.querySelector(".stats-info").innerHTML =
            '<tr class="fav-ei_item f jc-sb">' +
            "<td>Специальность</td>" +
            "<td>Полное название</td>" +
            "<td>Проходной балл Бюджет</td>" +
            "<td>Проходной балл Платный</td>" +
            "</tr>";
          if (nameSelect.value != "") doTask(institutionID(form?.ed_id));
          } else {
            document.querySelector(".stats-info").innerHTML = "<img src='./img/chiup1.png'><img src='./img/chiup2.png'><img src='./img/chiup3.png'><img src='./img/chiup4.png'>"
          }
         
        });
    }
  }
} else {
  console.log(12);
}

if (authProfile) {
  doTask(myProfileGet());
  // console.log(pros)

  setTimeout(() => {
    console.log(profile);
    if (profileInited) {
      document.getElementById("surname").value = profile?.last_name;
      document.getElementById("name").value = profile?.first_name;
      document.getElementById("lastname").value = profile?.middle_name;
      document.getElementById("date").value = profile?.birth_date
        .split(".")
        .reverse()
        .join("-");
      document.getElementById("registrate_place").value =
        profile?.registration_address;
      document.getElementById("living_place").value = profile?.living_address;
      document.getElementById("tel").value = profile?.phone;
    }

    console.log(document.getElementById("date").value);
  }, 2000);

  console.log(1111);
  const form = {};

  document.getElementById("surname").onchange = (event) => {
    form[event.target.name] = event.target.value;
    console.log(form);
  };
  document.getElementById("name").onchange = (event) => {
    form[event.target.name] = event.target.value;
    // CorrectInput(event.target)
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
    // console.log(prof)
    document.querySelectorAll("input").forEach((e) => {
      if (e.name == "date") {
        form[e.name] = e.value.split("-").reverse().join(".");
      } else form[e.name] = e.value;
    });
    console.log(form?.name);
    if (
      form?.date != undefined &&
      form?.date != "" &&
      form?.name != undefined &&
      form?.name != "undefined" &&
      form?.surname != undefined &&
      form?.surname != "undefined" &&
      form?.lastname != undefined &&
      form?.lastname != "undefined" &&
      form?.registrate_place != undefined &&
      form?.registrate_place != "undefined" &&
      form?.living_place != undefined &&
      form?.living_place != "undefined"
    ) {
      // if(form?.name != 'undefined'){
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
        "<input type='text' value='' id='doc_serial' maxlength='5' name='doc_serial' pattern=''>" +
        "</div>" +
        "<div class='auth-input f f-col'>" +
        "<label class='f' for='doc_number'>Номер документа" +
        "<div class='__red'>*</div>" +
        "</label>" +
        "<input type='text' id='doc_number' maxlength='15' value='' name='doc_number'>" +
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
        "<input type='text' id='doc_place' value='' maxlength='100' name='doc_place'>" +
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
      if (profileInited) {
        document.getElementById("doc_serial").value =
          profile?.personal_document?.series;
        document.getElementById("doc_number").value =
          profile?.personal_document?.number;
        document.getElementById("doc_date").value =
          profile?.personal_document?.emission_date
            .split(".")
            .reverse()
            .join("-");
        document.getElementById("doc_place").value =
          profile?.personal_document?.agency_name;
        document.getElementById("doc_id").value =
          profile?.personal_document?.identification_number;
      }

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
            document
              .getElementById("select")
              .addEventListener("change", (e) => {
                form.doc = e.target.value;
                console.log(form);
              });
          }
          console.log(form);
        });
      });

      // select.onselect(console.log(1))

      document.getElementById("second-next").addEventListener("click", () => {
        document.querySelectorAll("input").forEach((e) => {
          if (e.name == "doc_date")
            form[e.name] = e.value.split("-").reverse().join(".");
          else form[e.name] = e.value;
          console.log(e.name, e.value);
        });
        if (
          form?.doc_date != undefined &&
          form?.doc_date != "" &&
          form?.doc_serial != undefined &&
          form?.doc_serial != "undefined" &&
          form?.doc_number != undefined &&
          form?.doc_number != "undefined" &&
          form?.doc_place != undefined &&
          form?.doc_place != "undefined"
        ) {
          console.log(form?.doc_date);
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
            "</label>" +
            "<input type='text' name='ed_name0' id='ed_name0'>" +
            "</div>" +
            "<div class='auth-input f f-col'>" +
            "<label for='ed_date' class='f'>В году " +
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
          document
            .querySelector(".auth-ed-add")
            .addEventListener("click", (e) => {
              if (i <= 3) {
                let item =
                  "<div class='auth-ed-item f'>" +
                  "<div class='auth-input f f-col'>" +
                  "<label class='f' for='ed_name'>Закончил(a) УО" +
                  "</label>" +
                  "<input type='text' name='ed_name' id='ed_name'>" +
                  "</div>" +
                  "<div class='auth-input f f-col'>" +
                  "<label class='f' for='ed_date'>В году " +
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

          document
            .getElementById("third-next")
            .addEventListener("click", () => {
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

              if (profileInited) {
                document.getElementById("dad_name").value =
                  profile?.father?.first_name;
                document.getElementById("dad_surname").value =
                  profile?.father?.last_name;
                document.getElementById("dad_lastname").value =
                  profile?.father?.middle_name;
                document.getElementById("dad_address").value =
                  profile?.father?.living_address;
                document.getElementById("dad_tel").value =
                  profile?.father?.phone_number;
              }
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

              document
                .getElementById("fourth-next")
                .addEventListener("click", () => {
                  document.querySelectorAll("input").forEach((e) => {
                    form[e.name] = e.value;
                    console.log(e.name, e.value);
                  });
                  if (
                    form?.dad_address != undefined &&
                    form?.dad_address != "" &&
                    form?.dad_lastname != undefined &&
                    form?.dad_lastname != "undefined" &&
                    form?.dad_name != undefined &&
                    form?.dad_name != "undefined" &&
                    form?.dad_surname != undefined &&
                    form?.dad_surname != "undefined" &&
                    form?.dad_tel != undefined &&
                    form?.dad_tel != "undefined"
                  ) {
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

                    if (profileInited) {
                      document.getElementById("mom_name").value =
                        profile?.mother?.first_name;
                      document.getElementById("mom_surname").value =
                        profile?.mother?.last_name;
                      document.getElementById("mom_lastname").value =
                        profile?.mother?.middle_name;
                      document.getElementById("mom_address").value =
                        profile?.mother?.living_address;
                      document.getElementById("mom_tel").value =
                        profile?.mother?.phone_number;
                    }
                    document.getElementById("mom_name").onchange = (event) => {
                      form[event.target.name] = event.target.value;
                      console.log(form);
                    };
                    document.getElementById("mom_surname").onchange = (
                      event
                    ) => {
                      form[event.target.name] = event.target.value;
                      console.log(form);
                    };
                    document.getElementById("mom_lastname").onchange = (
                      event
                    ) => {
                      form[event.target.name] = event.target.value;
                      console.log(form);
                    };
                    document.getElementById("mom_address").onchange = (
                      event
                    ) => {
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
                        document.querySelectorAll("input").forEach((e) => {
                          form[e.name] = e.value;
                          console.log(e.name, e.value);
                        });
                        if (
                          form?.mom_address != undefined &&
                          form?.mom_address != "" &&
                          form?.mom_lastname != undefined &&
                          form?.mom_lastname != "undefined" &&
                          form?.mom_name != undefined &&
                          form?.mom_name != "undefined" &&
                          form?.mom_surname != undefined &&
                          form?.mom_surname != "undefined" &&
                          form?.mom_tel != undefined &&
                          form?.mom_tel != "undefined"
                        ) {
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
                          if (profileInited) {
                            document.getElementById("privil").value =
                              profile?.privilege_document?.name;
                            document.getElementById("privil_series").value =
                              profile?.privilege_document?.series;
                            document.getElementById("privil_number").value =
                              profile?.privilege_document?.number;
                            document.getElementById("privil_date").value =
                              profile?.privilege_document?.emission_date
                                .split(".")
                                .reverse()
                                .join("-");
                            document.getElementById("privil_place").value =
                              profile?.privilege_document?.agency_name;
                          }

                          document.getElementById("privil").onchange = (
                            event
                          ) => {
                            form[event.target.name] = event.target.value;
                            console.log(form);
                          };
                          document.getElementById("privil_series").onchange = (
                            event
                          ) => {
                            form[event.target.name] = event.target.value;
                            console.log(form);
                          };
                          document.getElementById("privil_number").onchange = (
                            event
                          ) => {
                            form[event.target.name] = event.target.value;
                            console.log(form);
                          };
                          document.getElementById("privil_date").onchange = (
                            event
                          ) => {
                            let date = event.target.value;
                            date = date.split("-").reverse().join(".");

                            form[event.target.name] = date;

                            console.log(form);
                          };
                          document.getElementById("privil_place").onchange = (
                            event
                          ) => {
                            form[event.target.name] = event.target.value;
                            console.log(form);
                          };
                          document
                            .getElementById("sixth-next")
                            .addEventListener("click", () => {
                              document
                                .querySelectorAll("input")
                                .forEach((e) => {
                                  if (e.name == "privil_date")
                                    form[e.name] = e.value
                                      .split("-")
                                      .reverse()
                                      .join(".");
                                  else form[e.name] = e.value;
                                  console.log(e.name, e.value);
                                });
                              if (
                                form?.privil_date != undefined &&
                                form?.privil_date != "" &&
                                form?.privil_number != undefined &&
                                form?.privil_number != "undefined" &&
                                form?.privil_place != undefined &&
                                form?.privil_place != "undefined" &&
                                form?.privil_series != undefined &&
                                form?.privil_series != "undefined" &&
                                form?.privil != undefined &&
                                form?.privil != "undefined"
                              ) {
                                doTask(myProfilePrivil(form));
                                clearParent(authProfile);
                                authProfile.innerHTML =
                                  "<div class='auth-profile_ct'>" +
                                  "<div class = 'f jc-sb'>" +
                                  "<div>Результаты ЦТ</div>" +
                                  "<div>Балл</div>" +
                                  "</div>" +
                                  "<div class = 'f f-col'>" +
                                  "<div class='f ai jc-sb'><div>1</div>" +
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
                                  "<div class='f ai jc-sb'><div>2</div>" +
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
                                  "<div class='f ai jc-sb'><div>3</div>" +
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
                                  "<div class='f ai jc-sb'><div>4</div>" +
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
                                  "</div>" +
                                  "</div>" +
                                  "<div class='auth-input ai f'><label for='ct'>Балл в аттестате</label><input type='text' value= '' id='ct'></div>" +
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
                                  document.getElementById("ct").onchange = (
                                    e
                                  ) => {
                                    form.ct = e.target.value;
                                  };
                                }

                                document.getElementById("ct").onchange = (
                                  event
                                ) => {
                                  form.ct = event.target.value;
                                  console.log(form);
                                };
                                document
                                  .querySelectorAll(".__mark")
                                  .forEach((elem, i) => {
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
                                      "/send_documents.html";
                                  });
                              } else {
                                createAlert('Заполните поля с знаком "*"');
                              }
                            });
                        } else {
                          createAlert('Заполните поля с знаком "*"');
                        }
                      });
                  } else {
                    createAlert('Заполните поля с знаком "*"');
                  }
                });
            });
        } else {
          createAlert('Заполните поля с знаком "*"');
        }
      });
    } else {
      createAlert('Заполните поля с знаком "*"');
    }
  });
} else {
  if (!document.querySelector(".admin-panel")) doTask(myProfileGet());
}
