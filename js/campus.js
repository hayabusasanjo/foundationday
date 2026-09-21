const Campus = {
    buildings: [
        { id: "ICS", name: "ICS", fullName: "", x: 860, y: 300, w: 280, h: 210 },
        { id: "ITE", name: "ITE", fullName: "", x: 1300, y: 300, w: 240, h: 180 },
        { id: "IBE", name: "IBE", fullName: "", x: 150, y: 300, w: 310, h: 230 },
        { id: "ADMIN", name: "ADMINISTRATION", fullName: "", x: 550, y: 700, w: 320, h: 180 },
        { id: "CENTER", name: "STUDENT CENTER", fullName: "", x: 150, y: 700, w: 280, h: 160 },
        { id: "LIBRARY", name: "LIBRARY", fullName: "", x: 1150, y: 700, w: 260, h: 200 },
        { id: "CANTEEN", name: "CANTEEN", fullName: "", x: 1450, y: 1200, w: 220, h: 140 }
    ],

    init: function() {
        this.map = document.getElementById('map');
        this.map.innerHTML = '';

        this.addGrass();
        this.buildPaths();
        this.buildPlaza(1000, 1350);
        this.buildCourt(150, 1200);
        this.buildGate(800, 1800);
        this.buildBuildings();
        this.buildTrees();
    },

    addGrass: function() {
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 15 : 50;
        for (let i = 0; i < count; i++) {
            const grass = document.createElement('div');
            grass.style.position = 'absolute';
            grass.style.left = Math.random() * 1960 + 'px';
            grass.style.top = Math.random() * 1960 + 'px';
            grass.style.zIndex = 1;
            grass.innerHTML = `<svg viewBox="0 0 20 20" width="16" height="16"><path d="M 5 20 Q 10 10 15 20" stroke="#7cb342" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M 10 20 Q 10 5 10 20" stroke="#7cb342" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
            this.map.appendChild(grass);
        }
    },

    buildPaths: function() {
        const paths = [
            // Main Vertical Spine (Gate up to ICS)
            { x: 950, y: 510, w: 100, h: 1290 },
            
            // Horizontal Road 1 (Academic: IBE - ICS - ITE)
            { x: 300, y: 510, w: 1300, h: 100 },
            
            // Horizontal Road 2 (Services: Center - Admin - Library)
            { x: 300, y: 880, w: 1300, h: 100 },
            
            // Horizontal Road 3 (Life: Court - Plaza - Canteen)
            { x: 300, y: 1300, w: 1300, h: 100 },
            
            // Small Branches
            { x: 1480, y: 480, w: 80, h: 30 }, // ITE door
            { x: 1520, y: 1340, w: 80, h: 60 } // Canteen door
        ];
        
        paths.forEach(p => {
            const div = document.createElement('div');
            div.className = 'path-segment';
            div.style.left = p.x + 'px';
            div.style.top = p.y + 'px';
            div.style.width = p.w + 'px';
            div.style.height = p.h + 'px';
            this.map.appendChild(div);
        });
        
        this.paths = paths; // Save for collision
    },

    buildPlaza: function(x, y) {
        const plaza = document.createElement('div');
        plaza.className = 'plaza-center';
        plaza.style.left = (x - 100) + 'px';
        plaza.style.top = (y - 100) + 'px';
        plaza.innerHTML = `<div class="plaza-monument"></div>`;
        this.map.appendChild(plaza);
        
        // Add benches around plaza
        this.addDecor('bench', x - 130, y - 20);
        this.addDecor('bench', x + 70, y - 20);
        this.addDecor('flower-bed', x - 40, y - 130);
        this.addDecor('flower-bed', x - 40, y + 90);
    },

    buildCourt: function(x, y) {
        const court = document.createElement('div');
        court.className = 'basketball-court';
        court.style.left = x + 'px';
        court.style.top = y + 'px';
        court.innerHTML = `<div class="court-lines"><div class="court-center"></div><div class="court-half"></div></div>`;
        this.map.appendChild(court);
    },

    buildGate: function(x, y) {
        const gate = document.createElement('div');
        gate.className = 'main-gate';
        gate.style.left = x + 'px';
        gate.style.top = y + 'px';
        gate.innerHTML = `
            <div class="gate-pillar"></div>
            <div class="gate-arch">
                <h2>COLEGIO DE MONTALBAN</h2>
                <h3>🎉 FOUNDATION DAY 2026 🎉</h3>
            </div>
            <div class="gate-pillar"></div>
        `;
        this.map.appendChild(gate);
    },

    buildBuildings: function() {
        this.buildings.forEach(b => {
            this.createBuilding(b.id, b.name, '', b.x, b.y, b.w, b.h, true);
        });
    },

    createBuilding: function(id, name, subtitle, x, y, w, h, isInteractive) {
        const bDiv = document.createElement('div');
        bDiv.className = 'building';
        bDiv.id = 'bldg-' + id;
        bDiv.style.left = x + 'px';
        bDiv.style.top = y + 'px';
        
        let roofIcon = '';
        if (id === 'ICS') roofIcon = `<svg class="roof-icon" viewBox="0 0 40 40"><rect x="5" y="10" width="30" height="20" rx="2" fill="#2c3e50"/><rect x="8" y="13" width="24" height="14" fill="#81ecec"/><rect x="15" y="30" width="10" height="5" fill="#2c3e50"/></svg>`;
        else if (id === 'ITE') roofIcon = `<svg class="roof-icon" viewBox="0 0 40 40"><circle cx="20" cy="22" r="12" fill="#e74c3c" stroke="#c0392b" stroke-width="2"/><path d="M 20 10 Q 25 5 28 10" stroke="#27ae60" stroke-width="3" fill="none"/></svg>`;
        else if (id === 'IBE') roofIcon = `<svg class="roof-icon" viewBox="0 0 40 40"><rect x="6" y="15" width="28" height="18" rx="2" fill="#f39c12" stroke="#d35400" stroke-width="2"/><rect x="15" y="10" width="10" height="5" fill="none" stroke="#d35400" stroke-width="3"/></svg>`;

        let subtitleHtml = subtitle ? `<span class="coming-soon">${subtitle}</span>` : '';

        bDiv.innerHTML = `
            ${roofIcon}
            <div class="roof">
                <div class="roof-top"></div>
                <div class="roof-front"></div>
            </div>
            <div class="facade">
                <div class="glass-panels"></div>
                <div class="concrete-pillars"></div>
            </div>
            <div class="sign">
                <h3>${name}</h3>
                ${subtitleHtml}
            </div>
            <div class="door-frame">
                <div class="awning"></div>
                <div class="door-glass"></div>
                <div class="door-glass"></div>
            </div>
            <div class="steps-3d">
                <div class="step"></div>
                <div class="step"></div>
                <div class="step"></div>
            </div>
            ${isInteractive ? `<div class="entrance-zone" id="zone-${id}"></div>` : ''}
        `;
        this.map.appendChild(bDiv);
    },

    buildSigns: function() {
        const signs = [
            { x: 920, y: 1300, text: "PLAZA<br>⬆" },
            { x: 1060, y: 880, text: "ADMIN ⬆<br>LIBRARY ➡" },
            { x: 900, y: 880, text: "STUDENT<br>CENTER ⬅" },
            { x: 1060, y: 510, text: "ACADEMIC<br>ZONES ⬆" }
        ];
        
        signs.forEach(s => {
            const div = document.createElement('div');
            div.className = 'waypoint-sign';
            div.style.left = s.x + 'px';
            div.style.top = s.y + 'px';
            div.innerHTML = `<div class="waypoint-post"></div><div class="waypoint-board"><span>${s.text}</span></div>`;
            this.map.appendChild(div);
        });
    },

    addDecor: function(type, x, y) {
        const decor = document.createElement('div');
        decor.className = 'decor';
        decor.style.left = x + 'px';
        decor.style.top = y + 'px';
        if (type === 'bench') {
            decor.innerHTML = `<svg viewBox="0 0 60 30" width="60" height="30"><rect x="5" y="10" width="50" height="15" fill="#e67e22" rx="3" stroke="#d35400" stroke-width="2"/><rect x="10" y="25" width="6" height="5" fill="#2c3e50" /><rect x="44" y="25" width="6" height="5" fill="#2c3e50" /></svg>`;
        } else if (type === 'flower-bed') {
            decor.innerHTML = `<svg viewBox="0 0 80 40" width="80" height="40"><rect x="0" y="10" width="80" height="25" fill="#8d6e63" rx="5" stroke="#5d4037" stroke-width="2"/><circle cx="15" cy="15" r="10" fill="#e74c3c" /><circle cx="40" cy="12" r="12" fill="#f1c40f" /><circle cx="65" cy="15" r="10" fill="#e74c3c" /><circle cx="28" cy="18" r="8" fill="#3498db" /><circle cx="52" cy="18" r="8" fill="#3498db" /></svg>`;
        }
        this.map.appendChild(decor);
    },

    buildTrees: function() {
        const treeTypes = [
            `<svg viewBox="0 0 60 80" width="60" height="80"><rect x="26" y="60" width="8" height="20" fill="#5d4037" stroke="#3e2723" stroke-width="2"/><path d="M 30 10 L 55 45 L 45 45 L 60 70 L 0 70 L 15 45 L 5 45 Z" fill="#2ecc71" stroke="#27ae60" stroke-width="2" stroke-linejoin="round"/><path d="M 30 10 L 55 45 L 45 45 L 60 70 L 30 70 Z" fill="rgba(0,0,0,0.15)"/></svg>`,
            `<svg viewBox="0 0 70 80" width="70" height="80"><rect x="31" y="60" width="8" height="20" fill="#6d4c41" stroke="#4e342e" stroke-width="2"/><circle cx="35" cy="30" r="25" fill="#8bc34a" /><circle cx="20" cy="40" r="18" fill="#8bc34a" /><circle cx="50" cy="40" r="18" fill="#8bc34a" /><circle cx="35" cy="45" r="20" fill="#8bc34a" /><circle cx="28" cy="22" r="15" fill="#9ccc65" /></svg>`,
            `<svg viewBox="0 0 50 90" width="50" height="90"><rect x="21" y="70" width="8" height="20" fill="#4e342e" stroke="#3e2723" stroke-width="2"/><ellipse cx="25" cy="35" rx="20" ry="40" fill="#4caf50" stroke="#388e3c" stroke-width="2"/><path d="M 25 0 A 20 40 0 0 1 45 35 A 20 40 0 0 1 25 75 Z" fill="rgba(0,0,0,0.15)"/></svg>`,
            `<svg viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="18" fill="#689f38"/><circle cx="12" cy="12" r="4" fill="#ff4081"/><circle cx="28" cy="16" r="4" fill="#ff4081"/><circle cx="20" cy="28" r="4" fill="#ff4081"/></svg>`
        ];

        this.trees = [];

        const isOverlap = (tx, ty) => {
            const margin = 20; // Keep trees well away from edges
            
            // Check buildings
            for(let b of this.buildings) {
                if (tx + 70 > b.x - margin && tx < b.x + b.w + margin && ty + 80 > b.y - margin && ty < b.y + b.h + margin) return true;
            }
            // Check paths
            for(let p of this.paths) {
                if (tx + 70 > p.x - margin && tx < p.x + p.w + margin && ty + 80 > p.y - margin && ty < p.y + p.h + margin) return true;
            }
            // Check Gate
            if (tx > 750 && tx < 1250 && ty > 1700) return true;
            // Check Court
            if (tx + 70 > 130 && tx < 470 && ty + 80 > 1180 && ty < 1640) return true;
            // Check Plaza
            if (tx + 70 > 880 && tx < 1120 && ty + 80 > 1230 && ty < 1470) return true;
            
            return false;
        };

        const tryPlaceTree = (tx, ty, type) => {
            if (!isOverlap(tx, ty)) {
                const tree = document.createElement('div');
                tree.className = 'tree';
                tree.style.left = tx + 'px';
                tree.style.top = ty + 'px';
                tree.innerHTML = treeTypes[type];
                this.map.appendChild(tree);
                // Save trunk collision box
                this.trees.push({ x: tx + 10, y: ty + 40, w: 40, h: 40 });
                return true;
            }
            return false;
        };

        // Plant fewer trees on mobile for performance
        const isMobile = window.innerWidth < 768;
        const maxTrees = isMobile ? 15 : 40;
        let planted = 0;
        let attempts = 0;
        while(planted < maxTrees && attempts < 1000) {
            let tx = 50 + Math.random() * 1800;
            let ty = 50 + Math.random() * 1800;
            let type = Math.floor(Math.random() * 4);
            
            // Ensure trees are spaced out from each other!
            let tooClose = false;
            for(let t of this.trees) {
                const dx = t.x - tx;
                const dy = t.y - ty;
                if (Math.sqrt(dx*dx + dy*dy) < 150) tooClose = true; // MUST BE 150px APART
            }
            
            if (!tooClose) {
                if (tryPlaceTree(tx, ty, type)) {
                    planted++;
                }
            }
            attempts++;
        }
    },
    
    // Check collision against buildings and trees
    isSolid: function(px, py) {
        // px, py is the center-bottom of the player (feet)
        // Player hitbox: w=30, h=20 centered at feet
        const pw = 30;
        const ph = 20;
        const pLeft = px - pw/2;
        const pRight = px + pw/2;
        const pTop = py - ph;
        const pBottom = py;

        // Buildings
        for(let b of this.buildings) {
            if (pRight > b.x && pLeft < b.x + b.w && pBottom > b.y && pTop < b.y + b.h) {
                return true;
            }
        }
        
        return false;
    }
};
