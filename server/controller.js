const ctrl={
    compliments = ["Gee, you're a smart cookie!",
    "Cool shirt!",
    "Your Javascript skills are stellar.",
    ],

    randomCompliment:()=>{
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randCompliment = compliments[randomIndex];
        return randCompliment  
    },
    
}
export default ctrl