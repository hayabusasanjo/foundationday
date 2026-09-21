const Interaction = {
    activeBuilding: null,
    
    init: function() {
        window.addEventListener('keydown', (e) => {
            if ((e.key === 'e' || e.key === 'E') && this.activeBuilding && Game.isPlaying) {
                this.enterBuilding();
            }
        });

        const interactBtn = document.getElementById('btn-interact');
        const triggerInteract = (e) => {
            if (e) e.preventDefault();
            if (this.activeBuilding && Game.isPlaying) {
                this.enterBuilding();
            }
        };

        if (interactBtn) {
            interactBtn.addEventListener('click', triggerInteract);
            interactBtn.addEventListener('touchstart', triggerInteract, { passive: false });
        }
    },

    update: function() {
        if (!Game.isPlaying) return;

        let found = null;
        Campus.buildings.forEach(b => {
            const zx = b.x + (b.w || 200)/2;
            const zy = b.y + (b.h || 150) + 20;

            const dx = Player.x - zx;
            const dy = Player.y - zy;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < 80) { // proximity radius
                found = b;
            }
        });

        if (found !== this.activeBuilding) {
            this.activeBuilding = found;
            const prompt = document.getElementById('interaction-prompt');
            const interactBtn = document.getElementById('btn-interact');
            if (found) {
                prompt.innerHTML = `Enter ${found.id} <br><kbd>E</kbd>`;
                prompt.classList.remove('hidden');
                if (interactBtn) interactBtn.classList.add('ready');
            } else {
                prompt.classList.add('hidden');
                if (interactBtn) interactBtn.classList.remove('ready');
            }
        }
    },

    enterBuilding: function() {
        if (!this.activeBuilding) return;
        
        const id = this.activeBuilding.id;
        if (id === 'CANTEEN') {
            Facilities.openCanteen();
        } else if (id === 'LIBRARY') {
            Facilities.openLibrary();
        } else if (id === 'ADMIN') {
            Facilities.openAdmin();
        } else if (id === 'CENTER') {
            Facilities.openCenter();
        } else {
            Game.enterBuilding(this.activeBuilding);
        }
    }
};
