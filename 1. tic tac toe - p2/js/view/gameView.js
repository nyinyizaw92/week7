const gameView = {

    init(controller){
        this.controller = controller;
        //select all checkbox
        this.checkboxes = document.querySelectorAll(".game-view input[type='checkbox']");
        this.restartGame = document.querySelector('#restart-game');
        this.playerName = document.querySelectorAll('.current-player');
        this.currentView = document.getElementById('gameBoard');
        this.endGame = document.getElementById('end-game');

        this.endGame.addEventListener('click',(event) => this.controller.turnregister(event));

       
        

        for(const box of this.checkboxes){
            box.addEventListener("change",(event)=>this.checkboxChange(event));
               
            }

            this.restartGame.addEventListener('click',() =>
                this.controller.restartGame()
            );
        },


        render(){
            this.show();

            for(const object of this.playerName){
                object.textContent = this.controller.getCurrentPlayer().name;
            }

            this.clearBoard();
            const allPlayers = this.controller.getAllPlayer();

            for(const player of allPlayers){
               // console.log(player);
                for(const position of player.position){
                    const selector = `.game-view input[data-block='${position}']`;
                   // const selector = document.querySelector();
                   // console.log(selector);
                    const current_checkbox = document.querySelector(selector);
                    current_checkbox.checked = true;
                    current_checkbox.disabled = true;
                    current_checkbox.parentNode.querySelector('label').textContent = player.mark;
                }
               
            }
           
        },
        
        clearBoard(){
            for(const box of this.checkboxes){
                box.checked = false;
                box.disabled = false;
                box.parentNode.querySelector('label').textContent = "";
            }
        },
    

    checkboxChange(event){
        const checkbox_obj = event.target;
        
        //console.log(event.target.dataset.block);
        const current_block = parseInt(event.target.dataset.block);
        checkbox_obj.disabled =true;
        this.controller.addPosition(current_block);
    },

    
    hide(){
        this.currentView.style.display = "none";
    },

    show(){
        this.currentView.style.display ="block";
    }

    
}


export default gameView;