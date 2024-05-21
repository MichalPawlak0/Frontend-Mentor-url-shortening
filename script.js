///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".button--mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
});

////////////////////////////////////////////////////////////
// API
const inputButton = document.getElementById('inputButton');
const inputEl = document.getElementById('textInput');
const resultsSection = document.getElementsByClassName("input__results")[0];

inputButton.addEventListener('click', makeURIAjaxCall);

textToCopy1 = ""
textToCopy2 = ""
textToCopy3 = ""

function makeURIAjaxCall(){
    let shortUrl = "";
    const url = 'https://spoo.me/';
    let longURL = inputEl.value;
    const data = new URLSearchParams();
    data.append('url', longURL);
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    
    // shortUrl = "me.me"
    // let newResultDiv = document.createElement("div");
    // newResultDiv.classList.add("result");
    // let newInputLinkDiv = document.createElement("div");
    // newInputLinkDiv.classList.add("input-link");
    // newInputLinkDiv.innerText = "longURL";
    // newResultDiv.appendChild(newInputLinkDiv);
    
    // let newResultsDiv = document.createElement("div");
    // newResultsDiv.classList.add("results");
    
    // let newShortenedUrlDiv = document.createElement("div");
    // newShortenedUrlDiv.classList.add("shortened-url");
    // newShortenedUrlDiv.innerText = shortUrl;
    
    // let newCopyButton = document.createElement("button");
    // newCopyButton.classList.add("copy-button");
    // newCopyButton.innerText = "COPY";
    
    // textToCopy1 = shortUrl;
    
    // newCopyButton.addEventListener('click',()=>{
    //     // Copy the text
    //     navigator.clipboard.writeText(textToCopy1);
    
    //     // Alert the copied text
    //     alert("Copied the text: " + textToCopy1);
    // });
    
    // newResultsDiv.appendChild(newShortenedUrlDiv);
    // newResultsDiv.appendChild(newCopyButton);
    
    // newResultDiv.appendChild(newResultsDiv);
    
    // resultsSection.appendChild(newResultDiv);
    
    // shortUrl = "o.o"
    // newResultDiv = document.createElement("div");
    // newResultDiv.classList.add("result");
    // newInputLinkDiv = document.createElement("div");
    // newInputLinkDiv.classList.add("input-link");
    // newInputLinkDiv.innerText = "longURL";
    // newResultDiv.appendChild(newInputLinkDiv);
    
    // newResultsDiv = document.createElement("div");
    // newResultsDiv.classList.add("results");
    
    // newShortenedUrlDiv = document.createElement("div");
    // newShortenedUrlDiv.classList.add("shortened-url");
    // newShortenedUrlDiv.innerText = shortUrl;
    
    // newCopyButton = document.createElement("button");
    // newCopyButton.classList.add("copy-button");
    // newCopyButton.innerText = "COPY";
    
    // textToCopy2 = shortUrl
    // newCopyButton.addEventListener('click',()=>{
    //     // Copy the text
    //     navigator.clipboard.writeText(textToCopy2);
    
    //     // Alert the copied text
    //     alert("Copied the text: " + textToCopy2);
    // });
    
    // newResultsDiv.appendChild(newShortenedUrlDiv);
    // newResultsDiv.appendChild(newCopyButton);
    
    // newResultDiv.appendChild(newResultsDiv);
    
    // resultsSection.appendChild(newResultDiv);
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                
                let json = xhr.responseText;
                shortUrl = JSON.parse(json).short_url;

                let newResultDiv = document.createElement("div");
                newResultDiv.classList.add("result");
                let newInputLinkDiv = document.createElement("div");
                newInputLinkDiv.classList.add("input-link");
                newInputLinkDiv.innerText = `${longURL.slice(0,15)}...`;
                newResultDiv.appendChild(newInputLinkDiv);
                
                let newResultsDiv = document.createElement("div");
                newResultsDiv.classList.add("results");
                
                let newShortenedUrlDiv = document.createElement("div");
                newShortenedUrlDiv.classList.add("shortened-url");
                newShortenedUrlDiv.innerText = shortUrl;
                
                let newCopyButton = document.createElement("button");
                newCopyButton.classList.add("copy-button");
                newCopyButton.innerText = "COPY";
                
                newResultsDiv.appendChild(newShortenedUrlDiv);
                newResultsDiv.appendChild(newCopyButton);
                
                newResultDiv.appendChild(newResultsDiv);
                
                const resultsDivs = document.getElementsByClassName("result");

                if(resultsDivs.length === 0){
                    textToCopy1 = shortUrl;
                    resultsSection.appendChild(newResultDiv);
                }else if(resultsDivs.length === 1){
                    textToCopy2 = textToCopy1;
                    textToCopy1 = shortUrl;
                    resultsSection.appendChild(newResultDiv);
                }else if(resultsDivs.length === 2){
                    textToCopy3 = textToCopy2;
                    textToCopy2 = textToCopy1;
                    textToCopy1 = shortUrl;
                    resultsSection.appendChild(newResultDiv);
                }else if(resultsDivs.length === 3){
                    resultsSection.firstChild.remove();
                    textToCopy3 = textToCopy2;
                    textToCopy2 = textToCopy1;
                    textToCopy1 = shortUrl;
                    resultsSection.appendChild(newResultDiv);
                }
                
                newCopyButton.addEventListener('click', (e)=>{
                    // Copy the text
                    navigator.clipboard.writeText(shortUrl);
                    e.target.classList.add("copied");
                    e.target.innerText = "Copied!";
                });
            } else {
                console.log(`HTTP error! Status: ${xhr.status}`);
            }
        }
    };
    xhr.send(data);
}