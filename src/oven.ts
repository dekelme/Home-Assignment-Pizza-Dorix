import emitter from'./emitter';

const OVEN_WORKING_TIME = 10000;
type IOvenList = Array<Array<string>>;

export class OvenHandler {
    waiting : IOvenList = [[]];
    inProcess: Boolean = false;

    constructor(){
        emitter.on('readyForOven', this.receiveNewOrders)
    }

    receiveNewOrders (order : Array<string>){
        if(! this.inProcess){
            this.inProcess = true
            this.prepareOven()
        }
        else{
            this.waiting.push(order)
        }
    }

    async processOven(){
        await new Promise(resolve => setTimeout(resolve,OVEN_WORKING_TIME ));
    }



    async prepareOven (){
        try{
            while(this.waiting.length != 0){
                const current = this.waiting.shift();
                console.log('Start Oven')
                await this.processOven()
                console.log('End Oven')
            }
            this.inProcess = false

        }catch(e){
            console.log(e);
        }
    }
    passToWaiter(order : Array<string>){
        emitter.emit('readyForWaiter', order)
    }
}
