import emitter from './emitter';

const DOUGH_CHEFS_NUM = 2
const DOUGH_WORKING_TIME = 7000

type IDoughList = Array<Array<string>>;


class DoughHandler {
    waiting: IDoughList = [[]];
    inProcess: Array<boolean> = Array(DOUGH_CHEFS_NUM).fill(false);
    receiveNewOrders(orders: Array<Array<string>>) {
        orders.forEach(order => this.waiting.push(order))
        this.inProcess.forEach((item, index) => {
            if (!this.inProcess[index]) {
                this.inProcess[index] = true;
                this.prepareDough(index)
            }
        })
    }

    async processDough() {
        await new Promise(resolve => setTimeout(resolve, DOUGH_WORKING_TIME));
    }

    async prepareDough(index: number) {
        try {

            while (this.waiting.length != 0) {
                const current = this.waiting.shift();
                console.log('Start Dough')
                await this.processDough()
                console.log('End Dough')
                this.passToToping(current)
            }
            this.inProcess[index] = false

        } catch (e) {
            console.log(e);
        }
    }

    passToToping(order: Array<string>) {
        emitter.emit('readyForToppings', order)
    }
}


export default DoughHandler;


