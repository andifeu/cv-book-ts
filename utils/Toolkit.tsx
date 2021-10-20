export default class Toolkit {
    
    static delayedExecution(functionToCall: () => void, delay: number = 0, timer?: number): number {
        if (timer) {
            clearTimeout(timer);
        }
        return window.setTimeout(functionToCall, delay);
    }
}
