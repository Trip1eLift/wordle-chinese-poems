import data from './5word4line.json';

export default class problemGenerator {
    constructor(seed) {
        this.seed = seed;
        const answer = this.manualAnswers(this.seed);
        let wordPool = this.associationWordPooling(answer);
        wordPool = this.shuffleWordPool(wordPool);
        this.answer = answer;
        this.wordPool = wordPool;
    }

    getInit() {
        return [this.answer, this.wordPool];
    }

    getSeed() {
        return this.seed;
    }

    shuffleWordPool(wordPool) {
        let wordPoolArr = [];
        for (let i=0; i<wordPool.length; i++) {
            wordPoolArr.push(wordPool[i]);
        }
        wordPoolArr = this.shuffleArr(wordPoolArr);
        wordPool = "";
        wordPoolArr.forEach((word) => {
            wordPool = wordPool + word;
        });
        return wordPool;
    }

    shuffleArr(array) {
        // copy from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    associationWordPooling(answer) {
        // Assume answer does not have repeat words
        const associativeWord = this.wordScore(answer);
        let wordPool = {};
        let wordList = answer;
        for (let i=0; i<5; i++)
            wordPool[answer[i]] = true;
        let stop = false;
        for (let poemIndex = 0; poemIndex < data.length && stop === false; poemIndex++) {
            for (let lineIndex = 0; lineIndex < data[poemIndex].lyrics.length && stop === false; lineIndex++) {
                let hit = false;
                for (let wordIndex = 0; wordIndex < data[poemIndex].lyrics[lineIndex].length; wordIndex++) {
                    const word = data[poemIndex].lyrics[lineIndex][wordIndex];
                    if (word === associativeWord[0] || word  === associativeWord[1])
                        hit = true;
                }

                if (hit === true) {
                    // Insert word it Pool and List
                    for (let wordIndex = 0; wordIndex < data[poemIndex].lyrics[lineIndex].length; wordIndex++) {
                        const word = data[poemIndex].lyrics[lineIndex][wordIndex];
                        if (wordPool[word] !== true) {
                            wordPool[word] = true;
                            wordList = wordList + word;
                        }
                    }
                }

                if (wordList.length > 30)
                    stop = true;
            }
        }

        // If not enough word, just add anyword topdown
        if (wordList.length < 30) {
            stop = false;
            for (let poemIndex = 0; poemIndex < data.length && stop === false; poemIndex++) {
                for (let lineIndex = 0; lineIndex < data[poemIndex].lyrics.length && stop === false; lineIndex++) {
                    for (let wordIndex = 0; wordIndex < data[poemIndex].lyrics[lineIndex].length; wordIndex++) {
                        const word = data[poemIndex].lyrics[lineIndex][wordIndex];
                        if (wordPool[word] !== true) {
                            wordPool[word] = true;
                            wordList = wordList + word;
                        }
                    }
                    if (wordList.length > 30)
                        stop = true;
                }
            }
            
        }
        wordList = wordList.substring(0, 30);
        //console.log(wordList);
        return wordList;
    }

    wordScore(answer) {
        let score = [0, 0, 0, 0, 0];
        data.forEach((poem) => {
            poem.lyrics.forEach((line) => {
                for (let i=0; i<5; i++) {
                    for (let j=0; j<5; j++) {
                        if (line[i] === answer[j])
                            score[j]++;
                    }
                }
            });
        });
        //console.log(score);
        let highScoreIndex1 = 0;
        for (let i = 1; i < 5; i++) {
            if (score[i] > score[highScoreIndex1])
                highScoreIndex1 = i;
        }
        let highScoreIndex2 = 0;
        if (highScoreIndex1 === 0)
            highScoreIndex2 = 1;
        for (let i = 1; i < 5; i++) {
            if (score[i] > score[highScoreIndex2] && i !== highScoreIndex1)
                highScoreIndex2 = i;
        }
        const result = [answer[highScoreIndex1], answer[highScoreIndex2]];
        //console.log(result);
        return result;
    }

    manualAnswers(index) {
        const answers = ['床前明月光', '空山不見人', '不敢問來人', '深林人不知', '不知心恨誰', '江流石不轉', '不敢問來人', '萬徑人蹤滅', '歸山深淺去', '返景入深林'];
        return answers[index % answers.length];
    }

    wordSampling() {
        let allword = "";
        data.forEach((poem) => {
            poem.lyrics.forEach((line) => {
                allword = allword + line;
            });
        });
        let wordMap = {};
        for (let i = 0; i < allword.length; i++) {
            if (wordMap[allword[i]] === undefined)
                wordMap[allword[i]] = 1;
            else
                wordMap[allword[i]]++;
        }
        let wordEntries = Object.entries(wordMap);
        wordEntries.sort((a, b) => b[1] - a[1]);
        console.log(wordEntries);

        // Results:
        /**
         * [ '不', 13 ], [ '人', 12 ], [ '山', 9 ], [ '來', 7 ], [ '深', 6 ],
            [ '知', 6 ],  [ '日', 5 ],  [ '上', 5 ], [ '明', 5 ], [ '歸', 5 ],
            [ '落', 4 ],  [ '宮', 4 ],  [ '林', 4 ], [ '月', 4 ], [ '春', 4 ],
            [ '君', 4 ],  [ '故', 4 ],  [ '鄉', 4 ], [ '前', 4 ], [ '寒', 4 ],
            [ '夜', 4 ],  [ '時', 4 ],  [ '處', 4 ], [ '莫', 4 ], [ '子', 4 ],
            [ '古', 3 ],  [ '花', 3 ],  [ '紅', 3 ], [ '頭', 3 ], [ '坐', 3 ],
            [ '黃', 3 ],  [ '入', 3 ],  [ '欲', 3 ], [ '千', 3 ], [ '一', 3 ],
            [ '三', 3 ],  [ '未', 3 ],  [ '復', 3 ], [ '獨', 3 ], [ '相', 3 ],
            [ '中', 3 ],  [ '暮', 3 ],  [ '國', 3 ], [ '多', 3 ], [ '晚', 3 ],
            [ '天', 3 ],  [ '雪', 3 ],  [ '帶', 3 ], [ '今', 3 ], [ '是', 3 ],
            [ '近', 3 ],  [ '江', 3 ],  [ '啼', 3 ], [ '聲', 3 ], [ '松', 3 ],
            [ '雲', 3 ],  [ '白', 2 ],  [ '在', 2 ], [ '盡', 2 ], [ '流', 2 ],
            [ '里', 2 ],  [ '更', 2 ],  [ '下', 2 ], [ '手', 2 ], [ '姑', 2 ],
            [ '小', 2 ],  [ '空', 2 ],  [ '見', 2 ], [ '但', 2 ], [ '聞', 2 ],
            [ '照', 2 ],  [ '青', 2 ],  [ '幽', 2 ], [ '裡', 2 ], [ '彈', 2 ],
            [ '年', 2 ],  [ '綠', 2 ],  [ '南', 2 ], [ '枝', 2 ], [ '此', 2 ],
            [ '思', 2 ],  [ '自', 2 ],  [ '應', 2 ], [ '新', 2 ], [ '無', 2 ],
            [ '七', 2 ],  [ '敢', 2 ],  [ '低', 2 ], [ '美', 2 ], [ '淚', 2 ],
            [ '恨', 2 ],  [ '向', 2 ],  [ '陽', 2 ], [ '只', 2 ], [ '得', 2 ],
            [ '絃', 2 ],  [ '嶺', 2 ],  [ '絕', 2 ], [ '問', 2 ], [ '舟', 2 ],
            ... 255 more items
         */
    }
}

//const pg = new problemGenerator(1);
//pg.wordSampling();
