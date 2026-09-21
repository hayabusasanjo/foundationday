const GameStorage = {
    SAVE_KEY: "campus_quest_save_2026",
    LEADERBOARD_KEY: "campus_quest_leaderboard_2026",

    defaultSave: {
        xp: 0,
        level: 1,
        coins: 0,
        completedLevels: {},
        badges: []
    },

    load: function() {
        try {
            const data = localStorage.getItem(this.SAVE_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {
            console.error("Failed to load save data", e);
        }
        return JSON.parse(JSON.stringify(this.defaultSave));
    },

    save: function(data) {
        try {
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error("Failed to save game data", e);
        }
    }
};

const Leaderboard = {
    scores: { ICS: [], ITE: [], IBE: [] },
    
    init: function() {
        try {
            const data = localStorage.getItem(GameStorage.LEADERBOARD_KEY);
            if (data) this.scores = JSON.parse(data);
        } catch(e) {}
        this.render();
    },
    
    addScore: function(dept, name, gender, score) {
        this.scores[dept].push({ name, gender, score });
        // Sort highest score first
        this.scores[dept].sort((a, b) => b.score - a.score);
        // Keep top 3 only
        this.scores[dept] = this.scores[dept].slice(0, 3); 
        localStorage.setItem(GameStorage.LEADERBOARD_KEY, JSON.stringify(this.scores));
        this.render();
    },
    
    render: function() {
        ['ICS', 'ITE', 'IBE'].forEach(dept => {
            const list = document.getElementById('list-' + dept);
            if (!list) return;
            list.innerHTML = '';
            if (this.scores[dept].length === 0) {
                list.innerHTML = '<li class="empty-lb">No scores yet</li>';
            } else {
                this.scores[dept].forEach(entry => {
                    const li = document.createElement('li');
                    const icon = entry.gender === 'female' ? '👧' : '👦';
                    li.innerHTML = `<span class="lb-name">${icon} ${entry.name}</span> <span class="lb-score">${entry.score} pts</span>`;
                    list.appendChild(li);
                });
            }
        });
    }
};
