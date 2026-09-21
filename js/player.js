const Player = {
    x: 1000,
    y: 1800,
    speed: 6,
    element: null,
    keys: { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false },
    dpad: { up: false, left: false, down: false, right: false },
    
    init: function() {
        this.element = document.getElementById('player');
        this.updatePosition();
        this.updateVisuals();
        
        window.addEventListener('keydown', (e) => {
            if(this.keys.hasOwnProperty(e.key)) { 
                this.keys[e.key] = true; 
                if (e.key.startsWith('Arrow')) e.preventDefault();
            }
        });
        window.addEventListener('keyup', (e) => {
            if(this.keys.hasOwnProperty(e.key)) { this.keys[e.key] = false; }
        });

        // Mobile dpad
        const bindBtn = (id, dir) => {
            const btn = document.getElementById(id);
            btn.addEventListener('touchstart', (e) => { e.preventDefault(); this.dpad[dir] = true; });
            btn.addEventListener('touchend', (e) => { e.preventDefault(); this.dpad[dir] = false; });
            btn.addEventListener('mousedown', (e) => { this.dpad[dir] = true; });
            btn.addEventListener('mouseup', (e) => { this.dpad[dir] = false; });
            btn.addEventListener('mouseleave', (e) => { this.dpad[dir] = false; });
        };
        bindBtn('btn-up', 'up');
        bindBtn('btn-left', 'left');
        bindBtn('btn-down', 'down');
        bindBtn('btn-right', 'right');
    },

    update: function() {
        if (!Game.isPlaying) return;

        let dx = 0;
        let dy = 0;

        if(this.keys.w || this.keys.ArrowUp || this.dpad.up) dy -= 1;
        if(this.keys.s || this.keys.ArrowDown || this.dpad.down) dy += 1;
        if(this.keys.a || this.keys.ArrowLeft || this.dpad.left) dx -= 1;
        if(this.keys.d || this.keys.ArrowRight || this.dpad.right) dx += 1;

        if (dx !== 0 && dy !== 0) {
            const length = Math.sqrt(dx*dx + dy*dy);
            dx /= length;
            dy /= length;
        }

        if (dx !== 0 || dy !== 0) {
            let nextX = this.x + dx * this.speed;
            let nextY = this.y + dy * this.speed;
            
            // Bounds check
            nextX = Math.max(20, Math.min(1980, nextX));
            nextY = Math.max(20, Math.min(1980, nextY));

            // Collision check
            if (!Campus.isSolid(nextX, this.y)) {
                this.x = nextX;
            }
            if (!Campus.isSolid(this.x, nextY)) {
                this.y = nextY;
            }

            this.updatePosition();
            this.element.classList.add('walking');
        } else {
            this.element.classList.remove('walking');
        }

        // Camera follow
        const world = document.getElementById('world');
        const cx = window.innerWidth / 2 - this.x;
        const cy = window.innerHeight / 2 - this.y;
        world.style.transform = `translate(${cx}px, ${cy}px)`;
    },

    updatePosition: function() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    },
    
    updateVisuals: function() {
        const pSprite = document.querySelector('#player .player-sprite');
        pSprite.classList.remove('holding-milktea', 'holding-burger', 'holding-fries');
        if (window.playerData && window.playerData.heldItem) {
            pSprite.classList.add(`holding-${window.playerData.heldItem}`);
        }
    }
};
