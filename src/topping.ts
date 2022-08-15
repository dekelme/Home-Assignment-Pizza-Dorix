import emitter from'./emitter';

const TOPPINGS_CHEFS_NUM = 3
const TOPPINGS_WORKING_TIME = 4000
type IToppingsList = Array<string>;


export class ToppingsHandler {
    waiting :IToppingsList = [];
    inProcess: Array<boolean> = Array(TOPPINGS_CHEFS_NUM).fill(false);

    constructor(){
        emitter.on('readyForToppings', this.receiveNewOrders.bind(this))
    }

    receiveNewOrders (order : Array<string>){
        console.log(order)
        this.waiting.push(...order)
        this.inProcess.forEach((item, index) => {
            if (!this.inProcess[index]) {
                this.inProcess[index] = true;
                this.prepareToppings(index)
            }
        })
    }

    async processTopings(){
        await new Promise(resolve => setTimeout(resolve,TOPPINGS_WORKING_TIME ));
    }



    async prepareToppings (index: number){
        try{
            while(this.waiting.length != 0){
                const current = this.waiting.shift();
                console.log('Start Topping')
                await this.processTopings()
                console.log('End Topping')
            }
            this.inProcess[index] = false

        }catch(e){
            console.log(e);
        }
    }
    passToOven(order : Array<string>){
        emitter.emit('readyForOven', order)
    }
}
