let userScore=0;
let compScore=0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");


const genCompChoice = ()=>{
    const option = ["rock","paper","scissors"];
    const randomIdx =Math.floor(Math.random() * 3);
    return option[randomIdx];
};

const DrawGame = ()=>{
    msg.innerText = "Game is Draw , Play again!";
    msg.style.backgroundColor = "#081b31";

}

const showWinner=(userWin,userChoice,compChoice)=>{

    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText =`You win! Yours ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }else{
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lost ${compChoice} beats Yours ${userChoice}`;
        msg.style.backgroundColor = "red";

    }

};

const playGame=(userChoice)=>{
    //Genrate computer choice
    const compChoice = genCompChoice();
    if(userChoice === compChoice){
        //Draw
        DrawGame();
    }else{
        let userWin = true;
        if(userChoice ==="rock"){
            //scissors,paper
            userWin =compChoice ==="paper" ? false:true;
        }else if(userChoice ==="paper"){
            //rock,scissors
            userWin =compChoice ==="scissors" ? false:true;

        }else{
            //rock,paper
            userWin = compChoice ==="rock" ? false: true;
        }
        showWinner(userWin,userChoice,compChoice);
    }

};

choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoice = choice.getAttribute("id");
        //console.log("Choice was clicked",userChoice);
        playGame(userChoice);

    });
});