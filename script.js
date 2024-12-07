let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn");

let leadsInLocalStorage = JSON.parse(localStorage.getItem("myLeads"));


if (leadsInLocalStorage) {
  myLeads = leadsInLocalStorage;
  render(myLeads);
}

//Save Tab button

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

// Rendering list function
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li><a target='_blank' href='${myLeads[i]}'>
     ${myLeads[i]}
     </a></li>`;
  }
  ulEl.innerHTML = listItems;
}

//Save button

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  console.log(myLeads);
  render(myLeads);
});

//Delete button

deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
