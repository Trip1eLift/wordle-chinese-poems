export default function WordSquare({column, attempt, answer, currentRow, progressRow}) {
    const yellow = "#C9B458";
    const green = "#6AAA64";

    let squareStyle = {
        fontSize: "4rem",
        paddingTop: "0",
        paddingBottom: "0.6rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        borderRadius: "0",
        border: "solid",
        borderColor: "grey",
        cursor: "default",
        color: "white",
        userSelect: "none"
    };
    let word = "一";
    if (attempt.length > column) {
        word = attempt[column];
        delete squareStyle.color;
        delete squareStyle.userSelect;
    }
    if (progressRow > currentRow) {
        // Give hint
        if (word === answer[column])
            squareStyle['backgroundColor'] = green;
        else {
            let hit = false;
            for (let i = 0; i < 5; i++) {
                if (answer[i] === word)
                    hit = true;
            }
            if (hit)
                squareStyle['backgroundColor'] = yellow;
            else
                squareStyle['backgroundColor'] = "lightgrey";
        }
    }

    return <div style={squareStyle}>{word}</div>;
}