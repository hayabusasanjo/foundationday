const Game = {
    isPlaying: false,

    init: function() {
        this.isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
        window.playerData = GameStorage.load();
        Leaderboard.init();
        Progression.updateHUD();

        Campus.init();
        Player.init();
        Interaction.init();
        Minimap.init();
        Facilities.init();
        NPCManager.init();
        if (typeof Joystick !== 'undefined') {
            Joystick.init();
        }
        
        // FOUNDATION DAY CELEBRATION EFFECTS!
        this.startConfetti();
        this.startBalloons();
        
        this.effectsEnabled = true;
        document.getElementById('btn-toggle-celebration').addEventListener('click', () => {
            this.effectsEnabled = !this.effectsEnabled;
            const btn = document.getElementById('btn-toggle-celebration');
            if (this.effectsEnabled) {
                document.body.classList.remove('hide-celebration');
                btn.textContent = '🎉 OFF';
                btn.style.background = '#e74c3c';
            } else {
                document.body.classList.add('hide-celebration');
                btn.textContent = '🎉 ON';
                btn.style.background = '#2ecc71';
            }
        });
        
        // DO NOT pre-fill inputs so new players don't inherit old names!
        document.getElementById('player-name-input').value = ''; 
        
        // New Player Logout Button
        document.getElementById('btn-logout-fixed').addEventListener('click', () => {
            localStorage.removeItem(GameStorage.SAVE_KEY);
            location.reload();
        });

        const btnMale = document.getElementById('btn-male');
        const btnFemale = document.getElementById('btn-female');
        
        // Default to Male on title screen for fresh look
        document.querySelector('#player .player-sprite').classList.remove('female');
        btnFemale.classList.remove('active');
        btnMale.classList.add('active');

        // Dedicated click listeners for each button to prevent issues
        btnMale.addEventListener('click', (e) => {
            e.preventDefault();
            btnFemale.classList.remove('active');
            btnMale.classList.add('active');
            // Wait, we don't preview the sprite on the title screen, it's just buttons.
            // Just ensure it's saved correctly.
        });

        btnFemale.addEventListener('click', (e) => {
            e.preventDefault();
            btnMale.classList.remove('active');
            btnFemale.classList.add('active');
        });

        document.getElementById('btn-play').addEventListener('click', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('player-name-input').value.trim();
            
            if (nameInput === "") {
                alert("Please enter your student name to start!");
                return;
            }
            
            const gender = btnFemale.classList.contains('active') ? 'female' : 'male';
            const finalName = nameInput;

            // RESET PROGRESSION for a new session
            window.playerData = JSON.parse(JSON.stringify(GameStorage.defaultSave));
            window.playerData.name = finalName;
            window.playerData.gender = gender;
            
            GameStorage.save(window.playerData);
            Progression.updateHUD(); // Refresh HUD to show 0 XP and Level 1
            
            document.getElementById('hud-player-name').innerText = window.playerData.name;
            if (gender === 'female') {
                document.querySelector('#player .player-sprite').classList.add('female');
            } else {
                document.querySelector('#player .player-sprite').classList.remove('female');
            }

            this.startGame();
        });

        requestAnimationFrame(() => this.loop());
    },

    startGame: function() {
        document.getElementById('title-screen').classList.remove('active');
        document.getElementById('campus-screen').classList.add('active');
        this.isPlaying = true;
    },

    enterBuilding: function(building) {
        this.isPlaying = false;
        document.getElementById('interaction-prompt').classList.add('hidden');
        document.getElementById('quiz-screen').classList.add('active');
        Quiz.startBuilding(building);
    },

    returnToCampus: function() {
        document.getElementById('quiz-screen').classList.remove('active');
        Player.y += 40; 
        Interaction.activeBuilding = null;
        this.isPlaying = true;
    },

    loop: function() {
        if (this.isPlaying) {
            Player.update();
            Interaction.update();
            NPCManager.update();
            Minimap.update();
        }
        requestAnimationFrame(() => this.loop());
    },

    startConfetti: function() {
        const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#e67e22'];
        const container = document.getElementById('game-container');
        const isMobile = window.innerWidth < 768 || (pointer => pointer && pointer.matches)(window.matchMedia('(pointer: coarse)'));
        const count = isMobile ? 22 : 60;
        for (let i = 0; i < count; i++) {
            const c = document.createElement('div');
            c.className = 'confetti-piece';
            c.style.left = Math.random() * 100 + 'vw';
            c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            c.style.animationDuration = (Math.random() * 3 + 3) + 's';
            c.style.animationDelay = (Math.random() * 5) + 's';
            if (Math.random() > 0.5) c.style.borderRadius = '50%';
            container.appendChild(c);
        }
    },
    
    startBalloons: function() {
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'];
        const container = document.getElementById('game-container');
        const isMobile = window.innerWidth < 768 || (pointer => pointer && pointer.matches)(window.matchMedia('(pointer: coarse)'));
        const count = isMobile ? 6 : 15;
        for (let i = 0; i < count; i++) {
            const b = document.createElement('div');
            b.className = 'balloon';
            b.style.left = Math.random() * 100 + 'vw';
            b.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            b.style.animationDuration = (Math.random() * 5 + 8) + 's';
            b.style.animationDelay = (Math.random() * 10) + 's';
            container.appendChild(b);
        }
    }
};

window.onload = () => {
    Game.init();
};
