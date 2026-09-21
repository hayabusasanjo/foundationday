const Joystick = {
    zone: null,
    base: null,
    knob: null,
    touchId: null,
    maxRadius: 36,
    active: false,
    x: 0,
    y: 0,

    init: function() {
        this.zone = document.getElementById('joystick-zone');
        this.base = document.getElementById('joystick-base');
        this.knob = document.getElementById('joystick-knob');
        if (!this.zone || !this.knob) return;

        const handleStart = (clientX, clientY, identifier) => {
            this.touchId = identifier;
            this.active = true;
            this.handleMove(clientX, clientY);
        };

        // Touch handlers (supports multi-touch)
        this.zone.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.touchId === null && e.changedTouches.length > 0) {
                const t = e.changedTouches[0];
                handleStart(t.clientX, t.clientY, t.identifier);
            }
        }, { passive: false });

        window.addEventListener('touchmove', (e) => {
            if (!this.active) return;
            for (let i = 0; i < e.changedTouches.length; i++) {
                const t = e.changedTouches[i];
                if (t.identifier === this.touchId) {
                    e.preventDefault();
                    this.handleMove(t.clientX, t.clientY);
                    break;
                }
            }
        }, { passive: false });

        const handleEnd = (identifier) => {
            if (this.touchId === identifier) {
                this.touchId = null;
                this.active = false;
                this.x = 0;
                this.y = 0;
                this.knob.style.transform = 'translate3d(0px, 0px, 0)';
                if (window.Player && Player.joystick) {
                    Player.joystick.active = false;
                    Player.joystick.x = 0;
                    Player.joystick.y = 0;
                }
            }
        };

        window.addEventListener('touchend', (e) => {
            for (let i = 0; i < e.changedTouches.length; i++) {
                handleEnd(e.changedTouches[i].identifier);
            }
        });

        window.addEventListener('touchcancel', (e) => {
            for (let i = 0; i < e.changedTouches.length; i++) {
                handleEnd(e.changedTouches[i].identifier);
            }
        });

        // Mouse drag support for testing on desktop
        let isMouseDown = false;
        this.zone.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            this.active = true;
            this.handleMove(e.clientX, e.clientY);
        });

        window.addEventListener('mousemove', (e) => {
            if (isMouseDown) {
                this.handleMove(e.clientX, e.clientY);
            }
        });

        window.addEventListener('mouseup', () => {
            if (isMouseDown) {
                isMouseDown = false;
                this.active = false;
                this.x = 0;
                this.y = 0;
                this.knob.style.transform = 'translate3d(0px, 0px, 0)';
                if (window.Player && Player.joystick) {
                    Player.joystick.active = false;
                    Player.joystick.x = 0;
                    Player.joystick.y = 0;
                }
            }
        });
    },

    handleMove: function(clientX, clientY) {
        if (!this.base) return;
        const rect = this.base.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let dx = clientX - centerX;
        let dy = clientY - centerY;
        const distance = Math.hypot(dx, dy);

        if (distance > this.maxRadius) {
            dx = (dx / distance) * this.maxRadius;
            dy = (dy / distance) * this.maxRadius;
        }

        this.knob.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;

        // Deadzone of 5px to prevent drifting
        if (distance > 5) {
            this.x = dx / this.maxRadius;
            this.y = dy / this.maxRadius;
            if (window.Player && Player.joystick) {
                Player.joystick.active = true;
                Player.joystick.x = this.x;
                Player.joystick.y = this.y;
            }
        } else {
            this.x = 0;
            this.y = 0;
            if (window.Player && Player.joystick) {
                Player.joystick.active = false;
                Player.joystick.x = 0;
                Player.joystick.y = 0;
            }
        }
    }
};
