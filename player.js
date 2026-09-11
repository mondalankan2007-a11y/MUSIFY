const { spawn } = require("child_process");
const fs = require("fs");



const path = "./songs";

const songs = fs
  .readdirSync(path)
  .filter((el) => el.endsWith(".mp3"));


let childProcess = null;


let currentSong = 0;


let currentTime = 0;


let startTime = 0;


let isPaused = false;



console.log(`🎶 Welcome to the Songs App 🎶\n`);

for (let i = 0; i < songs.length; i++) {
  console.log(`${i + 1}: ${songs[i].split(".")[0]}`);
}

console.log(`
--------------------------------
1, 2, 3... → Play song
p           → Pause
r           → Resume
s           → Skip +10 seconds
n           → Next song
b           → Previous song
q           → Quit
--------------------------------
`);




process.stdin.setEncoding("utf-8");

process.stdin.on("data", (input) => {

  const command = input.toString().trim();


  if (!isNaN(command) && command !== "") {
    player(Number(command));
  }


  else if (command === "p") {
    pauseSong();
  }


  else if (command === "r") {
    resumeSong();
  }


  else if (command === "s") {
    skipSong();
  }


  else if (command === "n") {
    nextSong();
  }


  else if (command === "b") {
    previousSong();
  }


  else if (command === "q") {
    quitPlayer();
  }


  else {
    console.log("❌ Invalid command");
  }

});



function player(userInput) {


  if (userInput < 1 || userInput > songs.length) {
    console.log("❌ Invalid song number");
    return;
  }


  currentSong = userInput - 1;


  currentTime = 0;


  isPaused = false;

  playCurrentSong();
}




function playCurrentSong() {

  if (childProcess) {
    childProcess.kill();
    childProcess = null;
  }

  console.log(
    `🎵 Playing: ${songs[currentSong]}`
  );

  console.log(
    `⏱️ Starting from: ${Math.floor(currentTime)} seconds`
  );



  const newProcess = spawn("ffplay", [
    "-nodisp",
    "-autoexit",
    "-loglevel",
    "quiet",
    "-ss",
    String(currentTime),
    `./songs/${songs[currentSong]}`
  ]);



  childProcess = newProcess;


  startTime = Date.now();



  newProcess.on("close", () => {

    if (childProcess !== newProcess) {
      return;
    }

    childProcess = null;

    console.log("🎵 Song finished...");

    currentTime = 0;
  });
}



function pauseSong() {

  if (!childProcess) {
    console.log("❌ No song is playing");
    return;
  }


  const elapsedTime =
    (Date.now() - startTime) / 1000;


  currentTime += elapsedTime;

  childProcess.kill();

  childProcess = null;


  isPaused = true;

  console.log(
    `⏸️ Song paused at ${Math.floor(currentTime)} seconds`
  );
}




function resumeSong() {

  if (!isPaused) {
    console.log("❌ Song is not paused");
    return;
  }

  console.log("▶️ Resuming song...");

  isPaused = false;


  playCurrentSong();
}



function skipSong() {


  if (!childProcess && !isPaused) {
    console.log("❌ No song is playing");
    return;
  }



  if (childProcess) {

    const elapsedTime =
      (Date.now() - startTime) / 1000;

    currentTime += elapsedTime;
  }

  currentTime += 10;



  if (childProcess) {
    childProcess.kill();
    childProcess = null;
  }


  console.log(
    `⏭️ Skipped to ${Math.floor(currentTime)} seconds`
  );


  if (isPaused) {
    console.log("⏸️ Song remains paused");
    return;
  }



  playCurrentSong();
}




function nextSong() {


  currentSong++;


  if (currentSong >= songs.length) {
    currentSong = 0;
  }



  currentTime = 0;

  isPaused = false;

  playCurrentSong();
}



function previousSong() {


  currentSong--;



  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }



  currentTime = 0;

  isPaused = false;

  playCurrentSong();
}




function quitPlayer() {


  if (childProcess) {
    childProcess.kill();
    childProcess = null;
  }

  console.log("👋 Exiting Musify...");

  process.exit(0);
}