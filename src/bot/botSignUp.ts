import { signUpGame } from "../playing/signUpGame";

async function botSignUp() {
  try {
    console.log("bot sign up called ..");
    
    let botData = {
      playerName: "Bot",
      sign: null,
      isBot: true,
    }
    let fakeSocket = {
      id: "fakeSocketId"
    }
    await signUpGame(botData, fakeSocket)
  } catch (error) {
    console.log('botSignUp ERROR :: >>', error);
  }
}

export { botSignUp }
