// console.log(localStorage.getItem("ipAddress"));
const ipAddress = localStorage.getItem("ipAddress");
const ipinfoContainer = document.getElementById("ipinfo-container");
const iframeContainer = document.getElementById("iframe-container");
const postCardContainer = document.getElementById("post-card-container");

async function fetchData(ipAddress) {
  const res = await fetch(`https://ipapi.co/${ipAddress}/json/`);
  const data = await res.json();

  const postres = await fetch(
    `https://api.postalpincode.in/pincode/${data.postal}`
  );
  const postDataArray = await postres.json();

  const postData = postDataArray[0];
  //   console.log(postData);
  //   console.log(data);
  createipInfoCard(data);
  createMap(data.latitude, data.longitude);
  createMoreInfoCard(data.postal, data.timezone, postData.Message);
  const postOfficeArray = postData.PostOffice;

  const searchInput = document.getElementById("search");
  searchInput.addEventListener("keyup", (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    const resultArray = postOfficeArray.filter((postOffice) => {
      return (
        postOffice.Name.toLowerCase() + postOffice.BranchType.toLowerCase()
      ).includes(searchValue.toLowerCase());
    });
    // console.log(resultArray);
    if (resultArray.length != 0) {
      createPostCards(resultArray);
    } else {
      postCardContainer.innerHTML = `<h1 style="color:gold;">No Post Office Avaialable</h1>`;
    }
  });
  createPostCards(postOfficeArray);
}

function createPostCards(postOfficeArray) {
  postCardContainer.innerHTML = "";
  for (let i = 0; i < postOfficeArray.length; i++) {
    const postCardData = postOfficeArray[i];
    // console.log(postCardData);
    const postCardDiv = document.createElement("div");
    postCardDiv.className = "post-card";
    postCardDiv.innerHTML = `
          <p>Name: <span class="white-color">${postCardData.Name}</span></p>
          <p>Branch Type: <span class="white-color">${postCardData.BranchType}</span></p>
          <p>Delivery Status: <span class="white-color">${postCardData.DeliveryStatus}</span></p>
          <p>District: <span class="white-color">${postCardData.District}</span></p>
          <p>Division: <span class="white-color">${postCardData.Division}</span></p>
        `;
    postCardContainer.appendChild(postCardDiv);
  }
}

function createMoreInfoCard(pin, timeZone, message) {
  const div = document.createElement("div");
  const moreInfo = document.getElementById("more-info");
  const dateTime = new Date().toLocaleString("en-Us", {
    timeZone: `${timeZone}`,
  });
  div.innerHTML = `
    <p>Time Zone: <span class="white-color">${timeZone}</span></p>
    <p>Date and Time: <span class="white-color">${dateTime}</span></p>
    <p>Pincode: <span class="white-color">${pin}</span></p>
    <p>Message: <span class="white-color">${message}</span></p>
   `;

  moreInfo.appendChild(div);
}

function createMap(lat, long) {
  const iframe = document.createElement("iframe");
  //   <iframe src="https://maps.google.com/maps?q=35.856737, 10.606619&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>
  iframe.src = `https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed`;

  iframeContainer.appendChild(iframe);
}

function createipInfoCard(data) {
  ipinfoContainer.innerHTML = `<p>ip address : <span class="white-color">${data.ip}</span></p>
    <div id="data-container">
      <div>
        <p>Lat:  <span class="white-color">${data.latitude}</span></p>
        <p>Long:  <span class="white-color">${data.longitude}</span></p>
      </div>
      <div>
        <p>City:  <span class='white-color'>${data.city}</span></p>
        <p>Region:  <span class='white-color'>${data.region}</span></p>
      </div>
      <div>
        <p>Organisation:  <span class='white-color'>${data.org}</span></p>
        <p>City:  <span class='white-color'>${data.country_code}</span></p>
      </div>
    </div>`;
}

fetchData(ipAddress);

/*
{
    "ip": "116.72.95.120",
    "network": "116.72.80.0/20",
    "version": "IPv4",
    "city": "Aurangabad",
    "region": "Maharashtra",
    "region_code": "MH",
    "country": "IN",
    "country_name": "India",
    "country_code": "IN",
    "country_code_iso3": "IND",
    "country_capital": "New Delhi",
    "country_tld": ".in",
    "continent_code": "AS",
    "in_eu": false,
    "postal": "431007",
    "latitude": 19.861,
    "longitude": 75.3929,
    "timezone": "Asia/Kolkata",
    "utc_offset": "+0530",
    "country_calling_code": "+91",
    "currency": "INR",
    "currency_name": "Rupee",
    "languages": "en-IN,hi,bn,te,mr,ta,ur,gu,kn,ml,or,pa,as,bh,sat,ks,ne,sd,kok,doi,mni,sit,sa,fr,lus,inc",
    "country_area": 3287590,
    "country_population": 1352617328,
    "asn": "AS17488",
    "org": "Hathway IP Over Cable Internet"
}

{
    "Name": "Adgaon BK",
    "Description": null,
    "BranchType": "Branch Post Office",
    "DeliveryStatus": "Delivery",
    "Circle": "Maharashtra",
    "District": "Aurangabad",
    "Division": "Aurangabad(Maharashtra)",
    "Region": "Aurangabad",
    "Block": "Aurangabad",
    "State": "Maharashtra",
    "Country": "India",
    "Pincode": "431007"
}

{
    "Name": "Adgaon BK",
    "Description": null,
    "BranchType": "Branch Post Office",
    "DeliveryStatus": "Delivery",
    "Circle": "Maharashtra",
    "District": "Aurangabad",
    "Division": "Aurangabad(Maharashtra)",
    "Region": "Aurangabad",
    "Block": "Aurangabad",
    "State": "Maharashtra",
    "Country": "India",
    "Pincode": "431007"
}
*/
