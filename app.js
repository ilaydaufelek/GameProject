//buttonlar
const allButton=document.querySelector("#allButton")
const mmorpgB=document.querySelector("#mmorpg")
const cardGameB=document.querySelector("#cardGame")
const socialB=document.querySelector("#social")
const shooterB=document.querySelector("#shooter")
const fightingB=document.querySelector("#fighting")
const arpgB=document.querySelector("#arpg")
const actionRpgB=document.querySelector("#actionRpg")
const battleRoyelB=document.querySelector("#battleRoyel")
const strategyB=document.querySelector("#strategy")

const inputSearch=document.querySelector("#search")

eventListener()





// API'den veri çekme
const dataBase = async () => {
    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '4b06c5ee08msh1744ea930d5f573p107db8jsn600871654a8d',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();  
        console.log(result);      
        return result;
        
          
    } catch (error) {
        console.error(error);
    }
}


const creatGames = async (games) => {
    const container = document.querySelector(".container");
    container.innerHTML = ""; 

    games.forEach(game => {
        const gameElement = document.createElement("div");
        gameElement.classList.add("w-[350px]", "h-auto","mt-[2rem]"); 

        gameElement.innerHTML += `
            <div class="w-[350px] h-[230px] rounded-lg overflow-hidden  ">
                <a href="${game.game_url}"><img class="rounded-lg " src="${game.thumbnail}" alt=""></a>
            </div>
            <div class="flex items-center justify-between ">
                <span id="gamesName" class="text-[15px]  text-[#ffff] ml-[0.5rem]">${game.title}</span>
               
            </div>`;

        container.appendChild(gameElement); 
    });
}

const init = async () => {
    const games = await dataBase(); 
    if (games) {
        creatGames(games); 
    }                                                                   
}

const filterGenre=async(genre)=>{
    const games= await dataBase();
    if(games){
        const filterGames=games.filter(game=>game.genre.toLowerCase().trim()===genre.toLowerCase().trim())
        creatGames(filterGames);
    }
}








function eventListener(){
    allButton.addEventListener("click", () => init());
    mmorpgB.addEventListener("click", () => filterGenre("MMORPG"));
    cardGameB.addEventListener("click", () => filterGenre("Card Game"));
    socialB.addEventListener("click", () => filterGenre("Social"));
    shooterB.addEventListener("click", () => filterGenre("Shooter"));
    fightingB.addEventListener("click", () => filterGenre("Fighting"));
    arpgB.addEventListener("click", () => filterGenre("ARPG"));
    actionRpgB.addEventListener("click", () => filterGenre("Action RPG"));
    battleRoyelB.addEventListener("click", () => filterGenre("Battle Royale"));
    strategyB.addEventListener("click", () => filterGenre("Strategy"));
}

inputSearch.addEventListener("input", (e) => {
    const search = inputSearch.value.toLowerCase().trim();
    const gameNames = document.querySelectorAll("#gamesName"); 

    gameNames.forEach((gameName) => {
        const gameElement = gameName.parentElement.parentElement; 
        if (gameName.innerHTML.trim().toLowerCase().includes(search)) {
            gameElement.style.display = "block"; 
        } else {
            gameElement.style.display = "none"; 
        }
    });
});











init();