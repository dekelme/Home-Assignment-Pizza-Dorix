import emitter from'./emitter';

const WAITER_WORKING_TIME = 5000;
const WAITERS_NUM = 2
type IOvenList = Array<string>;

export class WaiterHandler {
    waiting : IOvenList = [];
    inProcess: Array<boolean> = Array(WAITERS_NUM).fill(false);

    constructor(){
        emitter.on('readyForWaiter', this.receiveNewOrders)
    }

    receiveNewOrders (order : Array<string>){
        this.waiting.push(...order)
        this.inProcess.forEach((item, index) => {
            if (!this.inProcess[index]) {
                this.inProcess[index] = true;
                this.prepareWaiter(index)
            }
        })
    }

    async processWaiter(){
        await new Promise(resolve => setTimeout(resolve,WAITER_WORKING_TIME ));
    }



    async prepareWaiter (index: number){
        try{
            while(this.waiting.length != 0){
                const current = this.waiting.shift();
                console.log('Start Waiter')
                await this.processWaiter()
                console.log('End Waiter')
                
            }
            this.inProcess[index] = false

        }catch(e){
            console.log(e);
        }
    }
}
