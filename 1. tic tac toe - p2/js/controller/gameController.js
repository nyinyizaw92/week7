import Player from "../Player.js";
import gameView from "/js/view/gameView.js";
import gameModel from "/js/model/gameModel.js";
import registerView from "/js/view/registerView.js";
import scoreboardView from "/js/view/scoreboardView.js";

const gameController = {

    /**
     * init function for the main controller
     * object creation will happen here
     */
    init(){
       //const result =  this.isGameEnd([4],gameModel.wining_positions);
       //console.log(result);
      // registerView.init(this);
this.assignPlayer();
  
    gameView.init(this);
    registerView.init(this);
    scoreboardView.init(this);

    },
    
    assignPlayer(player1Name,player2Name){
        gameModel.player1 = new Player(player1Name,'0',[]);
       // localStorage.setItem('plname',gameModel.player1.name);
        gameModel.player2= new Player(player2Name,'X',[]);
        //localStorage.setItem('p2name',gameModel.player2.name);
    },
    /**
     * Check if the given position list is enough to end the game
     * 
     * @param {Array} positions 
     * @param {Array} wining_positions 
     */
    isGameEnd(positions,wining_positions){

        //looping over positions 
        for(const index in wining_positions){
            let is_game_end = true;

            //looping over item
            for(const j in wining_positions[index]){
                const current_wining_position = wining_positions[index][j];

                //if not matching item is found
                //End the search
                if(positions.indexOf(current_wining_position) === -1){
                    is_game_end = false;
                }
            }
            if(is_game_end){
                console.log("the game is end");
                return true;
            }
        }
        return false;
    },

    addPosition(position){
        //current player postion store
        
        gameModel.currentPlayer.position.push(position);
        console.log(gameModel.currentPlayer.position);

        //chek if the game is end
        const result = this.isGameEnd(
            gameModel.currentPlayer.position,
            //gameMode.currentPlayer.name,
            gameModel.wining_positions
        )

        console.log(result);
        //change the current user
        //do not change player if the game is already end
        if(!result){ this.changePlayer();}
        else{

            //save in the local storage
            const currentWinnerList = gameModel.winnerList;
             currentWinnerList.push(gameModel.currentPlayer.name);

            gameModel.winnerList = currentWinnerList;
            alert(`${gameModel.currentPlayer.name} won the game!`);
        }
       
        //re-render
       gameView.render();
    },

    changePlayer(){
        if(gameModel.current_player_index === 1){
            gameModel.current_player_index = 2;
        }
        else{
            gameModel.current_player_index = 1;
        }
    },

    getAllPlayer(){
        return [gameModel.player1,gameModel.player2];
    },

    getCurrentPlayer(){
        return gameModel.currentPlayer;
    },

    startGame(player1Name,player2Name){
        this.assignPlayer(player1Name,player2Name);
        registerView.hide();
        scoreboardView.hidescore();

        gameView.render();
    },  

    restartGame(){
        //restart the index
        gameModel.current_player_index = 1;
        //restart the player
        this.assignPlayer(gameModel.player1.name,gameModel.player2.name);
        //re-render
        gameView.render();
    },

    turnregister(event){
        const exitgame = confirm('Are you sure to want to exit');
        if(exitgame){
            gameView.hide();
            registerView.show();
            scoreboardView.showscore();
            registerView.endgame();
        }


    },


};

export default gameController;