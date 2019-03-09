const scoreboardView = {
    init(controller){
      
        this.controller = controller;
        this.scoreboard = document.getElementById('scoreboard');

        const winners = JSON.parse(localStorage.getItem('winners'));
        
       const reducer= function(accumulator,currentValue){
            if(accumulator[currentValue] == undefined){
                accumulator[currentValue] = 1;
            }else{
                const current_value = accumulator[currentValue] +1;
                accumulator[currentValue] = current_value;
            
            }
        return accumulator;
           
         
        };

        const result = winners.reduce(reducer,[]);
        console.log(result);
        console.log(Object.keys(result));
        console.log(Object.values(result));
     
        
        for (const [key,value] of Object.entries(result).sort(function(a,b){return b[1]-a[1]})) {
      
             
         this.scoreboard.innerHTML +='<tr><td>'+`${key}`+'<td>'+                                     
                                    '<td>'+`${value}`+'</td></tr>';
               
             }
          



           
            
           

          
           

          
     
      
    },

  


    hidescore(){
        this.scoreboard.style.display = "none";
    },

    showscore(){
        this.init();
        this.scoreboard.style.display ="block";
       
    }
}


export default scoreboardView;