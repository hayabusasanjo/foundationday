const Joystick = {
    zone: null,
    base: null,
    knob: null,
    touchId: null,
    maxRadius: 38,
    active: false,
    initialized: false,
    x: 0,
    y: 0,

    init: function() {
        this.zone = document.getElementById('joystick-zone');
        this.base = document.getElementById('joystick-base');
        this.knob = document.getElementById('joystick-knob');
        if (!this.zone || !this.knob || this.initialized) return;
        this.initialized = true;

        const setPlayerMovement = (active, x, y) => {
            const p = (typeof Player !== 'undefined') ? Player : (window.Player || null);
            if (p && p.joystick) {
                p.joystick.active = active;
                p.joystick.x = x;
                p.joystick.y = y;
            }
        };

        const handleStart = (clientX, clientY, identifier) => {
            this.touchId = identifier;
            this.active = true;
            this.handleMove(clientX, clientY, setPlayerMovement);
        };

        // Touch events (works on all mobile webviews and mobile browsers)
        this.zone.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.changedTouches && e.changedTouches.length > 0) {
                const t = e.changedTouches[0];
                handleStart(t.clientX, t.clientY, t.identifier);
            }
        }, { passive: false });

        window.addEventListener('touchmove', (e) => {
            if (!this.active) return;
            // Find our active touch
            for (let i = 0; i < e.touches.length; i++) {
                const t = e.touches[i];
                if (t.identifier === this.touchId || this.touchId === null) {
                    e.preventDefault();
                    this.handleMove(t.clientX, t.clientY, setPlayerMovement);
                    return;
                }
            }
        }, { passive: false });

        const handleEnd = (identifier) => {
            if (this.touchId === identifier || identifier === null || identifier === undefined) {
                this.touchId = null;
                this.active = false;
                this.x = 0;
                this.y = 0;
                if (this.knob) {
                    this.knob.style.setProperty('transform', 'translate3d(0px, 0px, 0)', 'important');
                }
                setPlayerMovement(false, 0, 0);
            }
        };

        window.addEventListener('touchend', (e) => {
            if (!this.active) return;
            for (let i = 0; i < e.changedTouches.length; i++) {
                if (e.changedTouches[i].identifier === this.touchId) {
                    handleEnd(this.touchId);
                    return;
                }
            }
            // If all touches lifted, ensure reset
            if (e.touches.length === 0) {
                handleEnd(this.touchId);
            }
        });

        window.addEventListener('touchcancel', () => {
            handleEnd(this.touchId);
        });

        // Mouse drag fallback (for testing on desktop)
        let isMouseDown = false;
        this.zone.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            this.active = true;
            this.handleMove(e.clientX, e.clientY, setPlayerMovement);
        });

        window.addEventListener('mousemove', (e) => {
            if (isMouseDown) {
                this.handleMove(e.clientX, e.clientY, setPlayerMovement);
            }
        });

        window.addEventListener('mouseup', () => {
            if (isMouseDown) {
                isMouseDown = false;
                handleEnd(null);
            }
        });
    },

    handleMove: function(clientX, clientY, callback) {
        if (!this.base || !this.knob) return;
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

        this.knob.style.setProperty('transform', `translate3d(${dx}px, ${dy}px, 0)`, 'important');

        // Deadzone of 4px
        if (distance > 4) {
            this.x = dx / this.maxRadius;
            this.y = dy / this.maxRadius;
            if (callback) {
                callback(true, this.x, this.y);
            }
        } else {
            this.x = 0;
            this.y = 0;
            if (callback) {
                callback(false, 0, 0);
            }
        }
    }
};

window.Joystick = Joystick;
