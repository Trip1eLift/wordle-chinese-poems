const yellow = "#C9B458";
const green = "#6AAA64";
const grey = "lightgrey";
const greenChar = "🟩";
const yelloChar = "🟨";
const blackChar = "⬛";

export default class progressColor {
    constructor(answer) {
        this.answer = answer;
    }

    resultDisplay(progress, output) {
        let result = [output];
        const answer = this.answer;
        for (let row = 0; row < 6; row++) {
            let rowResult = "";
            if (progress.attempts[row] === "")
                break;
            for (let col=0; col < 5; col++) {
                const word = progress.attempts[row][col];
                const colorLabel = this.wordCheck(word, col);
                if (colorLabel === "green")
                    rowResult = rowResult + greenChar;
                else if (colorLabel === "yellow")
                    rowResult = rowResult + yelloChar;
                else if (colorLabel === "black")
                    rowResult = rowResult + blackChar;
            }
            result.push(rowResult);
        }
        let performance = result.length - 1;
        if (performance === 6 && this.answer !== progress.attempts[5])
            performance = "X";
        else
            performance = performance.toString();
        result[0] = result[0] + " " + performance + "/6";
        return result;
    }
    
    getColor(word, column) {
        const colorLabel = this.wordCheck(word, column);
        if (colorLabel === "green")
            return green;
        else if (colorLabel === "yellow")
            return yellow;
        else if (colorLabel === "black")
            return grey;
    }

    wordCheck(word, column) {
        const answer = this.answer;
        //console.log(column, word, answer);
        if (word === answer[column])
            return "green";
        else {
            let hit = false;
            for (let i = 0; i < 5; i++) {
                if (answer[i] === word)
                    hit = true;
            }
            if (hit)
                return "yellow";
            else
                return "black"
        }
    }

    getBacktrackColor(word, progress) {
        const colorLabel = this.wordBacktrackCheck(word, progress);
        if (colorLabel === "green")
            return green;
        else if (colorLabel === "yellow")
            return yellow;
        else if (colorLabel === "black")
            return "grey";
        else
            return "lightgrey";
    }

    wordBacktrackCheck(word, progress) {
        if (this.findHistory(word, progress, "green"))
            return "green";
        else if (this.findHistory(word, progress, "yellow"))
            return "yellow";
        else if (this.findHistory(word, progress, "black"))
            return "black";
        else
            return "white";
    }


    findHistory(word, progress, colorLabel) {
        let row = progress.row - 1;
        while (row >= 0) {
            for (let column = 0; column < progress.attempts[row].length; column++) {
                if (word === progress.attempts[row][column] && colorLabel === this.wordCheck(word, column)) {
                    return true;
                }
            }
            row--;
        }
        return false;
    }
}