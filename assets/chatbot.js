const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotWindow = document.querySelector(".chatbot-window");
const closeBtn = document.querySelector(".chat-close-btn");
const chatBox = document.querySelector(".chat-box");
const chatInput = document.querySelector(".chat-input-area textarea");
const sendBtn = document.querySelector(".send-btn");

let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;

// API Key not needed for this simple rule-based bot, but structured for future AI integration
// const API_KEY = "PASTE-YOUR-API-KEY"; 

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const li = document.createElement("div");
    li.classList.add("chat-message", className);
    
    let chatContent = className === "bot" 
        ? `<div class="bot-icon">✂</div><div class="message-text">${message}</div>` 
        : `<div class="message-text">${message}</div>`;
    
    li.innerHTML = chatContent;
    return li;
}

const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector(".message-text");

    // Simple Rule-Based Logic
    const lowerMsg = userMessage.toLowerCase();
    let response = "I'm not sure about that. You can call us at +44 20 7916 9285 for more info.";

    // Keywords and responses
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
        response = "Hello! Welcome to Elite Barbers. How can I help you today?";
    } else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("much")) {
        response = "Our cuts start at £17. A Wash, Cut & Style is £24. You can check our <a href='#services' style='color: #D4AF37; text-decoration: underline;'>full price list here</a>.";
    } else if (lowerMsg.includes("book") || lowerMsg.includes("appointment") || lowerMsg.includes("reservation")) {
        response = "You can book your appointment online instantly! <a href='https://www.fresha.com/lvp/elite-barbers-marchmont-street-YKGwb3/booking' target='_blank' style='color: #D4AF37; text-decoration: underline;'>Click here to book now</a>.";
    } else if (lowerMsg.includes("location") || lowerMsg.includes("where") || lowerMsg.includes("address")) {
        response = "We are located at 69 Marchmont St, London WC1N 1AP. <a href='#contact' style='color: #D4AF37; text-decoration: underline;'>See map</a>.";
    } else if (lowerMsg.includes("hours") || lowerMsg.includes("open") || lowerMsg.includes("time")) {
        response = "We are open Mon-Sat 9:00 AM - 7:30 PM, and Sun 10:00 AM - 6:00 PM.";
    } else if (lowerMsg.includes("service") || lowerMsg.includes("beard") || lowerMsg.includes("shave")) {
        response = "We offer haircuts, beard trims, hot towel shaves, and full grooming packages. <a href='#services' style='color: #D4AF37; text-decoration: underline;'>View services</a>.";
    }

    // Simulate "typing" delay
    setTimeout(() => {
        messageElement.innerHTML = response;
        chatBox.scrollTo(0, chatBox.scrollHeight);
    }, 600);
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    // Clear buffer
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append User Message
    chatBox.appendChild(createChatLi(userMessage, "user"));
    chatBox.scrollTo(0, chatBox.scrollHeight);

    // Append "Thinking..." Bot Message
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "bot");
        chatBox.appendChild(incomingChatLi);
        chatBox.scrollTo(0, chatBox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 400);
}

chatInput.addEventListener("input", () => {
    // Adjust height
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
