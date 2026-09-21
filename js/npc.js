const NPCManager = {
    npcs: [],
    
    init: function() {
        const map = document.getElementById('map');
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 4 : 10;
        
        for (let i = 0; i < count; i++) {
            const npc = document.createElement('div');
            npc.className = 'player-sprite npc';
            if (Math.random() > 0.5) {
                npc.classList.add('female');
            }
            
            // Random colors for variety
            const hairColor = ['#5d4037', '#e67e22', '#2c3e50', '#8e44ad'][Math.floor(Math.random()*4)];
            const shirtColor = ['#ffffff', '#f1c40f', '#3498db', '#e74c3c'][Math.floor(Math.random()*4)];
            
            // Random Food
            const holdsFood = Math.random() > 0.5;
            const foodType = holdsFood ? ['milktea', 'burger', 'fries'][Math.floor(Math.random()*3)] : null;
            if (foodType) {
                npc.classList.add(`holding-${foodType}`);
            }

            // Random quotes
            const quotes = [
                "Happy Foundation Day CDM! 🎉",
                "Happy Foundation Day everyone! 🥳",
                "Have a Happy Foundation Day! ❤️",
                "Happy Foundation Day 2026! ✨",
                "So happy it's Foundation Day! 🎊",
                "Happy Foundation Day to all! 🎉"
            ];
            const myQuote = quotes[Math.floor(Math.random() * quotes.length)];

            npc.innerHTML = `
                <div class="npc-chat" style="animation-delay: -${Math.random() * 15}s;">${myQuote}</div>
                <div class="player-head">
                    <div class="player-hair" style="background:${hairColor};"></div>
                    <div class="player-eyes"></div>
                </div>
                <div class="player-body" style="background:${shirtColor};">
                    <div class="player-backpack"></div>
                    <div class="player-arms">
                        ${foodType ? '<div class="player-held-item"></div>' : ''}
                    </div>
                </div>
                <div class="player-legs">
                    <div class="player-leg left"></div>
                    <div class="player-leg right"></div>
                </div>
            `;
            
            // Start position (safely spawn them around the Plaza)
            const startX = 950 + Math.random() * 100;
            const startY = 1300 + Math.random() * 100;
            
            const npcWrapper = document.createElement('div');
            npcWrapper.style.position = 'absolute';
            npcWrapper.style.zIndex = '8';
            npcWrapper.style.left = startX + 'px';
            npcWrapper.style.top = startY + 'px';
            npcWrapper.appendChild(npc);
            
            map.appendChild(npcWrapper);
            
            this.npcs.push({
                element: npcWrapper,
                sprite: npc,
                x: startX,
                y: startY,
                targetX: startX,
                targetY: startY,
                speed: 1 + Math.random() * 1.5,
                state: 'idle',
                timer: 0
            });
        }
    },
    
    update: function() {
        const playerObj = (typeof Player !== 'undefined') ? Player : window.Player;

        this.npcs.forEach(npc => {
            if (playerObj) {
                const distToPlayer = Math.abs(playerObj.x - npc.x) + Math.abs(playerObj.y - npc.y);
                if (distToPlayer > 1200) return; // Skip far offscreen NPCs
            }

            if (npc.state === 'idle') {
                npc.timer--;
                if (npc.timer <= 0) {
                    // Pick new target
                    npc.targetX = Math.max(100, Math.min(1900, npc.x + (Math.random() - 0.5) * 400));
                    npc.targetY = Math.max(100, Math.min(1900, npc.y + (Math.random() - 0.5) * 400));
                    npc.state = 'walking';
                }
            } else if (npc.state === 'walking') {
                const dx = npc.targetX - npc.x;
                const dy = npc.targetY - npc.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < 5) {
                    npc.state = 'idle';
                    npc.timer = 60 + Math.random() * 120; // wait 1-3 seconds
                    npc.sprite.style.transform = 'scale(1)'; // reset bob
                } else {
                    const nextX = npc.x + (dx / dist) * npc.speed;
                    const nextY = npc.y + (dy / dist) * npc.speed;
                    
                    if (Campus.isSolid(nextX, nextY)) {
                        npc.state = 'idle';
                        npc.timer = 30; // Wait briefly then pick new direction
                        npc.sprite.style.transform = 'scale(1)';
                    } else {
                        npc.x = nextX;
                        npc.y = nextY;
                        
                        // Simple bob animation
                        if (Math.sin(Date.now() / 150) > 0) {
                            npc.sprite.style.transform = 'translateY(-2px)';
                        } else {
                            npc.sprite.style.transform = 'translateY(0)';
                        }
                    }
                }
                
                npc.element.style.left = npc.x + 'px';
                npc.element.style.top = npc.y + 'px';
            }
        });
    }
};
