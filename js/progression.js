const Progression = {
    // Basic formula: level * 100 xp per level
    getXpRequiredForLevel: function(level) {
        return level * 100; 
    },
    
    addXp: function(amount) {
        window.playerData.xp += amount;
        let required = this.getXpRequiredForLevel(window.playerData.level);
        
        while (window.playerData.xp >= required) {
            window.playerData.xp -= required;
            window.playerData.level++;
            required = this.getXpRequiredForLevel(window.playerData.level);
            // Simple year logic
            if (window.playerData.level >= 4) window.playerData.year = 4;
            else if (window.playerData.level >= 3) window.playerData.year = 3;
            else if (window.playerData.level >= 2) window.playerData.year = 2;
        }
        
        GameStorage.save(window.playerData);
        this.updateHUD();
    },

    addCoins: function(amount) {
        window.playerData.coins += amount;
        GameStorage.save(window.playerData);
        this.updateHUD();
    },
    
    updateHUD: function() {
        document.getElementById('level-label').innerText = window.playerData.level;
        document.getElementById('coin-count').innerText = window.playerData.coins;
        
        // Ensure name is preserved if it exists
        if (window.playerData.name && document.getElementById('hud-player-name')) {
            document.getElementById('hud-player-name').innerText = window.playerData.name;
        }
        
        const required = this.getXpRequiredForLevel(window.playerData.level);
        const percent = (window.playerData.xp / required) * 100;
        document.getElementById('hud-xp-fill').style.width = percent + '%';
    }
};
