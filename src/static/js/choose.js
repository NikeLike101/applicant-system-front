console.log("zxc");

let frontAddress = "http://localhost:3000";
// let frontAddress = "http://enrollee.by";



document.querySelectorAll(".choose-item p").forEach((elem) =>
  elem.addEventListener("click", () => {
    console.log(elem.innerHTML);
    if (elem.innerHTML === "Расписание") {
        elem.classList.add('zxc')
        localStorage.setItem('location', 'schedule')
        window.location.href = frontAddress.concat('/schedule.html')
    
    } else {
        localStorage.setItem('location', 'applicant')
        window.location.href = frontAddress.concat('/news.html')
    }
  })
);
