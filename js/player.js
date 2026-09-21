const Player = {
    x: 1000,
    y: 1800,
    speed: 6,
    element: null,
    keys: { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false },
    joystick: { active: false, x: 0, y: 0 },
    
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

        // Initialize Virtual Joystick for mobile
        if (window.Joystick) {
            Joystick.init();
        }
    },

    update: function() {
        if (!Game.isPlaying) return;

        let dx = 0;
        let dy = 0;

        // Check virtual joystick first (360-degree analog)
        if (this.joystick && this.joystick.active) {
            dx = this.joystick.x;
            dy = this.joystick.y;
        } else {
            // Keyboard inputs
            if(this.keys.w || this.keys.ArrowUp) dy -= 1;
            if(this.keys.s || this.keys.ArrowDown) dy += 1;
            if(this.keys.a || this.keys.ArrowLeft) dx -= 1;
            if(this.keys.d || this.keys.ArrowRight) dx += 1;

            if (dx !== 0 && dy !== 0) {
                const length = Math.sqrt(dx*dx + dy*dy);
                dx /= length;
                dy /= length;
            }
        }

        if (dx !== 0 || dy !== 0) {
            let nextX = this.x + dx * this.speed;
            let nextY = this.y + dy * this.speed;
            
            // Bounds check
            nextX = Math.max(20, Math.min(1980, nextX));
            nextY = Math.max(20, Math.min(1980, nextY));

            // Collision check with wall-sliding
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

        // Camera follow - use Math.round and translate3d for smooth 60fps GPU acceleration
        const world = document.getElementById('world');
        const cx = Math.round(window.innerWidth / 2 - this.x);
        const cy = Math.round(window.innerHeight / 2 - this.y);
        world.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
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
