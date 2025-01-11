let btn = document.querySelector('#mic');
let content = document.querySelector('#content');
let voice = document.querySelector('#voice');
let robo = document.querySelector('#robo');

const speak = (text) => {
    let speak_text = new SpeechSynthesisUtterance(text);
    speak_text.lang = 'en-us';
    speak_text.rate = 1;
    speak_text.pitch = 1;
    speak_text.volume = 1;
    speak_text.voice = window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.speak(speak_text); //speak the text by assistant
}

const wishMe = () => {
    let date = new Date();
    let hour = date.getHours();
    if(hour >= 0 && hour < 12){
        speak('Good Morning');
    }
    else if(hour >= 12 && hour < 16){
        speak('Good Afternoon');
    }
    else{
        speak('Good Evening');
    }
}
window.addEventListener('load', () => {
    wishMe(); //wish me function
})

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase()); //take command function
    // console.log(event);
    
}


btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
    robo.style.opacity = "0.9";
    let x = window.matchMedia("(max-width: 600px)"); //media query for small screen
    if(x.matches) {
    robo.style.width = "110vw";
    }else{
    robo.style.width = "60vw";
    }
    
})

let takeCommand = (message) => {
    voice.style.display = "none";
    btn.style.display = "flex";//voice icon
    robo.style.opacity = "0.5";
    let x = window.matchMedia("(max-width: 600px)");
    if(x.matches){
    robo.style.width = "100vw";
    } else {
    robo.style.width = "55vw";
    }

if (message.includes("hello") || message.includes("hey")) {
    speak("Hello, How can I help you?");
} else if (message.includes("how are you")) {
    speak("I am fine, Thank you");
} else if (message.includes("what is your name")) {
    speak("My name is Shay");
} else if (message.includes("who are you")) {
    speak("I am virtual assistant, crated by yash");
} else if (message.includes("i am") || message.includes("about me"))
    {
    speak("i know you are human, name is yash ");
} else if (message.includes("open google")) {
    speak("Opening Google");
    window.open("https://www.google.com", "_blank");
} else if (message.includes("open youtube")) {
    speak("Opening Youtube");
    window.open("https://www.youtube.com", "_blank");
    }
    else if (message.includes("open facebook")) {
    speak("Opening Facebook");
    window.open("https://www.facebook.com", "_blank");
    }
    else if (message.includes("open instagram")) {
    speak("Opening Instagram");
    window.open("https://www.instagram.com", "_blank");
    }
    else if (message.includes("what are doing now")) {
    speak("I am here to help you");
    }
    else if (message.includes("open news")) {
    speak("Here are the latest news updates.");
    window.open("https://www.bbc.com/news", "_blank");
    }
    else if (message.includes("open games")) {
    speak("opening games");
    window.open("https://poki.com/", "_blank");
    }
    else if (message.includes("play music")) {
    speak("Sure, opening Spotify.");
    window.open("https://open.spotify.com/", "_blank");

}
else if (message.includes("play song")) {
    speak("sure, playing song");
    window.open("https://open.spotify.com/track/1hA697u7e1jX2XM8sWA6Uy", "_blank");
} else if (message.includes("open calculator")) {
    speak("opening calculator");
    window.open("https://calculator.com/", "_blank");
}
    else if (message.includes("open chatgpt")) {
    speak("opening chatgpt");
    window.open("https://openai.com/index/chatgpt/", "_blank");
}
else if (message.includes("joke") || message.includes("jokes")) {
        let joke = getRandomJoke();
        speak(joke); // Speak the joke
    }
else if (message.includes("my name is")) {
    let name = message.split("my name is")[1].trim();
    speak(`Nice to meet you, ${name}! How can I assist you?`);
} 
else if (message.includes("what is the date") || message.includes("date")) {
        const { day, date } = getDateAndTime();
        speak(`Today is ${day}, ${date}`);
    } 
else if (message.includes("time") || message.includes("current time")) {
        const { time } = getDateAndTime();
        speak(`The current time is ${time}`);
    } 
else if (message.includes("day")) {
        const { day } = getDateAndTime();
        speak(`Today is ${day}`);
    } 
else {
    let final_text = "this is what i found on internet regarding" + message.replace("shay", "");
    speak(final_text);
    window.open(`https://www.google.com/search?q= ${final_text}`, "_blank");
    }

}

const getDateAndTime = () => {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const date = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return { day, date, time };
};
const jokes = [
    
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "Why don't skeletons fight each other? They don't have the guts.",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "Why couldn’t the bicycle stand up by itself? It was two tired!",
    "I'm reading a book on anti-gravity. It's impossible to put down!",
    "What do you call fake spaghetti? An impasta!",
    "How does a penguin build its house? Igloos it together.",
    "Why did the math book look sad? Because it had too many problems.",
    "Why did the golfer bring two pairs of pants? In case he got a hole in one."
];
const getRandomJoke = () => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
};





