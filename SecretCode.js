/**
 * Secret Key Input Checker
 *
 * @param {array} CODE - An array of integers that will be checked agains keyboard input
 * @param {string} SUCCESS_EVENT - The name for the success / code matched event
 * @param {number} CODE_CLEAR_TIMEOUT - The number of milliseconds until the input buffer is cleared
 * @return {object} - Returns a clear() function to unbind the checking event, and the success event name
 *
 * @example
 *
 * const KONAMI_CODE = [38,38,40,40,37,39,37,39,66,65,13];
 *
 * let konami = new SecretCode(KONAMI_CODE, "konami code");
 *
 * window.addEventListener(konami.SUCCESS_EVENT, ()=>{
 *   konami.clear();
 *   console.log("~~~POWER UPS~~~");
 * });
 */
function SecretCode(CODE = [49, 50, 51, 52, 53], SUCCESS_EVENT = "SecretCodeMatch", CODE_CLEAR_TIMEOUT = 850) {

    const checkExact = (bufferA, bufferB) => bufferA.join("") === bufferB.join("");
    const checkPartial = (bufferA, bufferB) => new RegExp(bufferA.join("")).test(bufferB.join(""));
    const checkLength = (bufferA, bufferB) => bufferA.length <= bufferB.length;
    const inputCheck = [checkExact, checkPartial, checkLength];
    
    let inputBuffer = [];
    let timer = null;

    const checkCode = (e) => {
        inputBuffer.push(e.keyCode);

        if (timer) { clearTimeout(timer); };

        if (!checkLength(inputBuffer, CODE)) {
            inputBuffer = [];
            return;
        }

        if (!checkPartial(inputBuffer, CODE)) {
            inputBuffer = [];
            return;
        }

        if (inputCheck.reduce((a, b) => a && b(inputBuffer, CODE), true)) {
            inputBuffer = [];
            let success = new Event(SUCCESS_EVENT);
            window.dispatchEvent(success);
            return;
        }

        timer = setTimeout(() => {
            inputBuffer = [];
        }, CODE_CLEAR_TIMEOUT)

    };

    window.addEventListener("keydown", checkCode);

    const clear = () => {
        window.removeEventListener("keydown", checkCode);
    }

    return {
        clear,
        SUCCESS_EVENT,
    }

}
