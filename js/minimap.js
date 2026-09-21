const Minimap = {
    init: function() {
        this.container = document.getElementById('minimap-container');
        this.playerDot = document.getElementById('minimap-player');
        this.mapWidth = 2000;
        this.mapHeight = 2000;
        this.miniWidth = 150;
        this.miniHeight = 150;

        // Create dots for major buildings
        const dots = [
            { x: 850, y: 450, color: '#3498db', w: 10, h: 8 }, // ICS
            { x: 300, y: 600, color: '#f39c12', w: 12, h: 8 }, // IBE
            { x: 1400, y: 600, color: '#e74c3c', w: 9, h: 7 }, // ITE
            { x: 1350, y: 950, color: '#8e44ad', w: 10, h: 8 }, // Library
            { x: 840, y: 660, color: '#34495e', w: 12, h: 7 }, // Admin
            { x: 350, y: 950, color: '#16a085', w: 10, h: 7 }, // Center
            { x: 1450, y: 1300, color: '#d35400', w: 8, h: 6 }, // Canteen
            { x: 150, y: 1250, color: '#e67e22', w: 12, h: 16 } // Court
        ];

        dots.forEach(d => {
            const dot = document.createElement('div');
            dot.className = 'minimap-dot';
            dot.style.background = d.color;
            dot.style.width = d.w + 'px';
            dot.style.height = d.h + 'px';
            
            // Map coordinates to percentage ratio so it scales to any minimap size
            dot.style.left = ((d.x / this.mapWidth) * 100) + '%';
            dot.style.top = ((d.y / this.mapHeight) * 100) + '%';
            
            this.container.appendChild(dot);
        });
    },

    update: function() {
        if (!Player || !this.playerDot) return;
        
        const px = (Player.x / this.mapWidth) * 100;
        const py = (Player.y / this.mapHeight) * 100;
        
        this.playerDot.style.left = px + '%';
        this.playerDot.style.top = py + '%';
    }
};
