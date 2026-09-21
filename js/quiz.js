const Quiz = {
    currentBuilding: null,
    currentLevelData: null,
    currentQuestionIndex: 0,
    score: 0,
    xpEarned: 0,

    startBuilding: function(building) {
        this.currentBuilding = building;
        document.getElementById('building-title').innerText = building.id + " BUILDING";
        document.getElementById('building-subtitle').innerText = building.fullName;
        
        if (building.id === "ICS") {
            document.getElementById('intro-dialogue').innerText = '"Welcome to ICS! Let\'s see what you know about computers."';
        } else if (building.id === "ITE") {
            document.getElementById('intro-dialogue').innerText = '"Welcome to ITE! Ready to learn about teaching?"';
        } else if (building.id === "IBE") {
            document.getElementById('intro-dialogue').innerText = '"Welcome to IBE! Let\'s test your business acumen."';
        }

        document.getElementById('btn-start-quiz').style.display = 'block';
        this.showPanel('quiz-intro');
    },

    startChallenge: function(department) {
        // Shuffle the pool of questions
        const allQuestions = [...questionDatabase[department][1]];
        allQuestions.sort(() => Math.random() - 0.5);
        
        // Take a random selection (up to 10)
        this.currentLevelData = allQuestions.slice(0, 10);
        
        // Shuffle choices for each question
        this.currentLevelData.forEach(q => {
            q.choices.sort(() => Math.random() - 0.5);
        });

        this.currentQuestionIndex = 0;
        this.score = 0;
        this.xpEarned = 0;

        this.showPanel('quiz-active');
        this.loadQuestion();
    },

    loadQuestion: function() {
        const q = this.currentLevelData[this.currentQuestionIndex];
        document.getElementById('quiz-progress').innerText = `Question ${this.currentQuestionIndex + 1}/${this.currentLevelData.length}`;
        document.getElementById('question-text').innerText = q.question;
        
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = '';
        
        q.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = choice;
            btn.onclick = () => this.handleAnswer(btn, choice, q);
            choicesContainer.appendChild(btn);
        });

        document.getElementById('feedback-container').className = 'hidden';
    },

    handleAnswer: function(btn, selected, q) {
        const btns = document.querySelectorAll('.choice-btn');
        btns.forEach(b => b.disabled = true);

        const feedback = document.getElementById('feedback-container');
        const title = document.getElementById('feedback-title');
        const text = document.getElementById('feedback-text');
        
        if (selected === q.answer) {
            btn.classList.add('correct');
            feedback.className = 'correct-fb';
            title.innerText = "🎉 Correct! +" + q.xpReward + " XP";
            text.innerText = q.explanation;
            this.score++;
            this.xpEarned += q.xpReward;
        } else {
            btn.classList.add('incorrect');
            btns.forEach(b => { if(b.innerText === q.answer) b.classList.add('correct'); });
            
            feedback.className = 'incorrect-fb';
            title.innerText = "💡 Almost!";
            text.innerText = q.explanation;
        }

        const nextBtn = document.getElementById('btn-next-question');
        if (this.currentQuestionIndex < this.currentLevelData.length - 1) {
            nextBtn.innerText = "Next Question";
            nextBtn.onclick = () => {
                this.currentQuestionIndex++;
                this.loadQuestion();
            };
        } else {
            nextBtn.innerText = "Finish Challenge";
            nextBtn.onclick = () => this.showResults();
        }
    },

    showResults: function() {
        this.showPanel('quiz-results');
        document.getElementById('results-score').innerText = `Score: ${this.score}/${this.currentLevelData.length}`;
        
        const rewards = `+${this.xpEarned} XP`;
        document.getElementById('rewards-container').innerText = rewards;
        
        Progression.addXp(this.xpEarned);
        Progression.addCoins(this.score * 5);
        
        Leaderboard.addScore(this.currentBuilding.id, window.playerData.name, window.playerData.gender, this.score);
        
        window.playerData.completedLevels[this.currentBuilding.id + "_1"] = true;
        GameStorage.save(window.playerData);
    },

    showPanel: function(panelId) {
        document.querySelectorAll('.quiz-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(panelId).classList.add('active');
    }
};

document.getElementById('btn-start-quiz').addEventListener('click', () => {
    if (Quiz.currentBuilding) {
        Quiz.startChallenge(Quiz.currentBuilding.id);
    }
});
document.getElementById('btn-leave-building').addEventListener('click', () => {
    Game.returnToCampus();
});
document.getElementById('btn-return-campus').addEventListener('click', () => {
    Game.returnToCampus();
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const quizScreen = document.getElementById('quiz-screen');
        if (quizScreen.classList.contains('active')) {
            const introPanel = document.getElementById('quiz-intro');
            const activePanel = document.getElementById('quiz-active');
            const resultsPanel = document.getElementById('quiz-results');
            
            if (introPanel.classList.contains('active')) {
                document.getElementById('btn-start-quiz').click();
            } else if (activePanel.classList.contains('active')) {
                const feedback = document.getElementById('feedback-container');
                if (!feedback.classList.contains('hidden')) {
                    document.getElementById('btn-next-question').click();
                }
            } else if (resultsPanel.classList.contains('active')) {
                document.getElementById('btn-return-campus').click();
            }
        }
    }
});
