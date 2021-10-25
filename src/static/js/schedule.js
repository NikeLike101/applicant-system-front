
const frontAddress = "http://localhost:3000";
// const frontAddress = 'enrollee.by'
console.log(document.querySelector(".back-to-choose"));
document.querySelector(".back-to-choose").addEventListener("click", () => {
    console.log("zxc");
    localStorage.setItem("location", "");
    window.location.href=frontAddress
  });

  if(localStorage.getItem('location') !== 'schedule') {
    console.log(1);
    window.location.href=frontAddress
    
  }