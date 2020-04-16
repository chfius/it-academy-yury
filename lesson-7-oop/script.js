'use strict';

(function () {

  function Question(questNumber, quest, answers, rightAnswer) {
    this.questNumber = questNumber;
    this.quest = quest;
    this.answers = answers;
    this.rightAnswer = rightAnswer;
    this.showQuestion = function () {
      console.log(this.questNumber + '. ' + this.quest + '?');
      for (var i = 0; i < this.answers.length; i++) {
        console.log((i + 1) + ') ' + this.answers[i]);
      }
    }
    this.checkAnswer = function (answer) {
      return answer == this.rightAnswer;
    }
  }

  function askAnswers() {
    var askStr;
    var answersArr = [];
    do {
      askStr = prompt('Input an answer: (0 or Cancel for exit)') || '0';
      answersArr.push(askStr);
    } while (askStr !== '0');
    answersArr.length = answersArr.length - 1;
    return answersArr;
  }

  function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
  }

  var quest = [];
  var countQuestion = 1;
  do {
    var askQuestion = prompt('Input a question:') || '';
    var answers = askAnswers();
    do {
      var strAnsewrs = '';
      answers.forEach((item, index) => strAnsewrs += (index + 1) + ') ' + item + '\n');
      var rightAnswer = prompt(('Input number of right answer:\n' + strAnsewrs), '1') || '0';
    } while (rightAnswer <= 0 || rightAnswer > answers.length);
    quest.push(new Question(countQuestion, askQuestion, answers, rightAnswer));
    countQuestion++;
  } while (confirm('Add another question?'));

  var randomQuestion = randomDiap(0, quest.length - 1);
  quest[randomQuestion].showQuestion();

  var userAnswer = 0;
  do {
    userAnswer = prompt('Which number of your answer to question #' + quest[randomQuestion].questNumber+'?', '1') || 0;
  } while (userAnswer < 1 || userAnswer > answers[randomQuestion].length);

  if (quest[randomQuestion].checkAnswer(userAnswer)) {
    console.log('You are right!')
  } else { console.log('You are wrong!') }

}());
