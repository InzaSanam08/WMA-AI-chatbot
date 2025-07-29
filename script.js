
const promptInput = document.querySelector("#prompt");
const imageButton = document.querySelector("#image");
const submitButton = document.querySelector("#submit"); 
const chatContainer = document.querySelector(".chat-container"); 
const imageFileInput = document.querySelector("#image-input"); 
const deleteButton = document.querySelector("#delete"); 

const API_KEY = "YOUR_API_KEY"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

let userData = {
    message: null,
    file: {
        mimeType: null,
        data: null
    }
};

const createChatBox = (html, className) => {
    const chatDiv = document.createElement("div"); 
    chatDiv.innerHTML = html;
    chatDiv.classList.add(className); 
    return chatDiv;
};

const handleChatResponse = async (message) => {
    userData.message = message;

    let userChatHtml = `
        <div class="user-chat-area">
            <p>${userData.message}</p>
            ${userData.file.data ? `<img src="data:${userData.file.mimeType};base64,${userData.file.data}" alt="Chosen Image" class="choose-image">` : ''}
        </div>
    `;

    const userChatBox = createChatBox(userChatHtml, "user-chat-box");
    chatContainer.appendChild(userChatBox);

    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth"
    });

    promptInput.value = "";

    imageButton.querySelector("img").src = "image.svg";
    imageButton.querySelector("img").classList.remove("choose-class");
    userData.file.mimeType = null;
    userData.file.data = null;

    setTimeout(() => {
        const aiChatHtml = `
            <img src="ai.png" alt="AI Image" id="ai-image">
            <div class="ai-chat-area">
                <img src="loading.gif" alt="Loading" class="load">
            </div>
        `;
        const aiChatBox = createChatBox(aiChatHtml, "ai-chat-box");
        chatContainer.appendChild(aiChatBox);

        chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: "smooth"
        });

        generateResponse(aiChatBox);
    }, 600); 
};

const generateResponse = async (aiChatBox) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: userData.message
                },
                ...(userData.file.data ? [{
                    inlineData: {
                        mimeType: userData.file.mimeType,
                        data: userData.file.data
                    }
                }] : [])
                ]
            }]
        })
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();

        const apiResponse = data.candidates[0].content.parts[0].text
            .replace(/\*/g, "").trim();

        const aiChatArea = aiChatBox.querySelector(".ai-chat-area");
        aiChatArea.innerHTML = `<p>${apiResponse}</p>`;

    } catch (error) {
        console.error("Error generating response:", error);
        const aiChatArea = aiChatBox.querySelector(".ai-chat-area");
        aiChatArea.innerHTML = `<p>Oops! Something went wrong. Please try again.</p>`;
    } finally {
        chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: "smooth"
        });
    }
};

promptInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && promptInput.value.trim() !== "") {
        handleChatResponse(promptInput.value.trim());
    }
});

submitButton.addEventListener("click", () => {
    if (promptInput.value.trim() !== "") {
        handleChatResponse(promptInput.value.trim());
    }
});

imageButton.addEventListener("click", () => {
    imageFileInput.click(); 
});

imageFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0]; 
    if (!file) return; 

    const reader = new FileReader(); 
    reader.onload = (event) => {
        userData.file.data = event.target.result.split(",")[1]; 
        userData.file.mimeType = file.type; 

        const imgElement = imageButton.querySelector("img");
        imgElement.src = event.target.result;
        imgElement.classList.add("choose-class"); 
    };

    reader.readAsDataURL(file); 
});

deleteButton.addEventListener("click", () => {
    promptInput.value = "";
    userData.file.mimeType = null;
    userData.file.data = null;
    const imgElement = imageButton.querySelector("img");
    imgElement.src = "image.svg";
    imgElement.classList.remove("choose-class");
});




























////////////////////////////////////////////////


















// const promptInput = document.querySelector("#prompt");  
// const imageButton = document.querySelector("#image"); 
// const submitButton = document.querySelector("#submit");  
// const chatContainer = document.querySelector(".chat-container"); 
// const imageFileInput = document.querySelector("#image-input");  

// const API_KEY = "YOUR_API_KEY"; 
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

// let userData = {
//     message: null,
//     file: {
//         mimeType: null,
//         data: null
//     }
// };

// const createChatBox = (html, className) => {
//     const chatDiv = document.createElement("div"); 
//     chatDiv.innerHTML = html;
//     chatDiv.classList.add(className); 
//     return chatDiv;
// };

// const handleChatResponse = async (message) => {
//     userData.message = message;

//     let userChatHtml = `
//         <div class="user-chat-area">
//             <p>${userData.message}</p>
//             ${userData.file.data ? `<img src="data:${userData.file.mimeType};base64,${userData.file.data}" alt="Chosen Image" class="choose-image">` : ''}
//         </div>
//     `;

//     const userChatBox = createChatBox(userChatHtml, "user-chat-box");
//     chatContainer.appendChild(userChatBox);

//     chatContainer.scrollTo({
//         top: chatContainer.scrollHeight,
//         behavior: "smooth"
//     });

//     promptInput.value = "";

//     imageButton.querySelector("img").src = "image.svg";
//     imageButton.querySelector("img").classList.remove("choose-class");
//     userData.file.mimeType = null;
//     userData.file.data = null;

//     setTimeout(() => {
//         const aiChatHtml = `
//             <img src="ai.png" alt="AI Image" id="ai-image">
//             <div class="ai-chat-area">
//                 <img src="loading.gif" alt="Loading" class="load">
//             </div>
//         `;
//         const aiChatBox = createChatBox(aiChatHtml, "ai-chat-box");
//         chatContainer.appendChild(aiChatBox);

//         chatContainer.scrollTo({
//             top: chatContainer.scrollHeight,
//             behavior: "smooth"
//         });

//         generateResponse(aiChatBox);
//     }, 600); 
// };

// const generateResponse = async (aiChatBox) => {
//     const requestOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             contents: [{
//                 parts: [{
//                     text: userData.message
//                 },
//                 ...(userData.file.data ? [{
//                     inlineData: {
//                         mimeType: userData.file.mimeType,
//                         data: userData.file.data
//                     }
//                 }] : [])
//                 ]
//             }]
//         })
//     };

//     try {
//         const response = await fetch(API_URL, requestOptions);
//         const data = await response.json();

//         const apiResponse = data.candidates[0].content.parts[0].text
//             .replace(/\*/g, "").trim();

//         const aiChatArea = aiChatBox.querySelector(".ai-chat-area");
//         aiChatArea.innerHTML = `<p>${apiResponse}</p>`;

//     } catch (error) {
//         console.error("Error generating response:", error);
//         const aiChatArea = aiChatBox.querySelector(".ai-chat-area");
//         aiChatArea.innerHTML = `<p>Oops! Something went wrong. Please try again.</p>`;
//     } finally {
//         chatContainer.scrollTo({
//             top: chatContainer.scrollHeight,
//             behavior: "smooth"
//         });
//     }
// };

// promptInput.addEventListener("keydown", (e) => {
//     if (e.key === "Enter" && promptInput.value.trim() !== "") {
//         handleChatResponse(promptInput.value.trim());
//     }
// });

// submitButton.addEventListener("click", () => {
//     if (promptInput.value.trim() !== "") {
//         handleChatResponse(promptInput.value.trim());
//     }
// });

// imageButton.addEventListener("click", () => {
//     imageFileInput.click(); 
// });

// imageFileInput.addEventListener("change", (e) => {
//     const file = e.target.files[0]; 
//     if (!file) return; 

//     const reader = new FileReader(); 
//     reader.onload = (event) => {
//         userData.file.data = event.target.result.split(",")[1]; 
//         userData.file.mimeType = file.type; 

//         const imgElement = imageButton.querySelector("img");
//         imgElement.src = event.target.result;
//         imgElement.classList.add("choose-class"); 
//     };

//     reader.readAsDataURL(file); 
// });


















