const registerView = {
    init(controller){
        this.player1NameInput = document.getElementById("player1Name");
        this.player2NameInput = document.getElementById("player2Name");
        this.submitButton = document.getElementById("start");
        this.controller = controller;
        this.currentView = document.getElementById('registerView');

        this.submitButton.addEventListener('click',() =>{
            const player1Name = this.player1NameInput.value;
            const player2Name = this.player2NameInput.value;
            this.controller.startGame(player1Name,player2Name);
        });
    },

    hide(){
        this.currentView.style.display = "none";
    },

    show(){
        this.currentView.style.display ="block";
    },

    endgame(){
        this.player1NameInput.value = '';
        this.player2NameInput.value = '';
    }
}


export default registerView;