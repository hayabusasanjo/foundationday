const Facilities = {
    init: function() {
        // Canteen Buy Buttons
        document.querySelectorAll('.btn-buy-food').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const foodType = e.target.dataset.food;
                const price = parseInt(e.target.dataset.price);
                
                if (window.playerData.coins >= price) {
                    window.playerData.coins -= price;
                    
                    // Apply effects
                    if (foodType === 'burger') Player.speed += 2;
                    if (foodType === 'milktea') Player.speed += 1;
                    
                    window.playerData.heldItem = foodType;
                    
                    Progression.updateHUD();
                    GameStorage.save(window.playerData);
                    Player.updateVisuals(); // Update held item graphic
                    
                    alert(`Yum! You bought ${foodType}.`);
                    this.closeAll();
                } else {
                    alert(`Not enough coins! You need ${price} coins.`);
                }
            });
        });

        // Universal Close Buttons
        document.querySelectorAll('.btn-facility-close').forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.activeFacility === 'LIBRARY') {
                    window.playerData.libraryUsed = true;
                    GameStorage.save(window.playerData);
                }
                this.closeAll();
            });
        });
        
        // Library Tabs
        document.querySelectorAll('.lib-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.lib-tab').forEach(t => t.classList.add('outline'));
                e.target.classList.remove('outline');
                this.loadStudyGuide(e.target.dataset.target);
            });
        });
    },

    openCanteen: function() {
        this.activeFacility = 'CANTEEN';
        Game.isPlaying = false;
        document.getElementById('interaction-prompt').classList.add('hidden');
        document.getElementById('canteen-screen').style.display = 'flex';
    },

    openLibrary: function() {
        if (window.playerData.libraryUsed) {
            alert("Librarian: You already used your one-time study session! Get out and take the quiz!");
            Player.y += 40;
            Interaction.activeBuilding = null;
            return;
        }
        
        this.activeFacility = 'LIBRARY';
        Game.isPlaying = false;
        document.getElementById('interaction-prompt').classList.add('hidden');
        document.getElementById('library-screen').style.display = 'flex';
        // Auto-load ICS
        document.querySelector('.lib-tab[data-target="ICS"]').click();
    },
    
    openAdmin: function() {
        this.activeFacility = 'ADMIN';
        Game.isPlaying = false;
        document.getElementById('interaction-prompt').classList.add('hidden');
        document.getElementById('admin-screen').style.display = 'flex';
        
        // Populate Master Record Table
        const tbody = document.getElementById('admin-global-list');
        tbody.innerHTML = '';
        
        let hasRecords = false;
        ['ICS', 'ITE', 'IBE'].forEach(dept => {
            const records = Leaderboard.scores[dept] || [];
            records.forEach(r => {
                hasRecords = true;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="padding:8px; border-bottom:1px solid #bdc3c7; font-weight:bold;">${r.name}</td>
                    <td style="padding:8px; border-bottom:1px solid #bdc3c7; text-transform:capitalize;">${r.gender}</td>
                    <td style="padding:8px; border-bottom:1px solid #bdc3c7;">${dept}</td>
                    <td style="padding:8px; border-bottom:1px solid #bdc3c7; color:#27ae60; font-weight:bold;">${r.score}0%</td>
                `;
                tbody.appendChild(tr);
            });
        });
        
        if (!hasRecords) {
            tbody.innerHTML = '<tr><td colspan="4" style="padding:20px; text-align:center; color:#7f8c8d;">No students have taken any quizzes yet!</td></tr>';
        }
    },
    
    openCenter: function() {
        this.activeFacility = 'CENTER';
        Game.isPlaying = false;
        document.getElementById('interaction-prompt').classList.add('hidden');
        document.getElementById('center-screen').style.display = 'flex';
    },

    closeAll: function() {
        this.activeFacility = null;
        document.getElementById('canteen-screen').style.display = 'none';
        document.getElementById('library-screen').style.display = 'none';
        document.getElementById('admin-screen').style.display = 'none';
        document.getElementById('center-screen').style.display = 'none';
        Player.y += 40; // Step back from door
        Interaction.activeBuilding = null;
        Game.isPlaying = true;
    },
    
    loadStudyGuide: function(dept) {
        const container = document.getElementById('library-content');
        container.innerHTML = `<h3 style="color:#2c3e50; margin-bottom:10px;">${dept} Reviewer</h3>`;
        
        const deptLevels = questionDatabase[dept];
        if (!deptLevels) {
            container.innerHTML += "<p>No questions found.</p>";
            return;
        }
        
        // Flatten all questions from all levels
        let qList = [];
        for (let level in deptLevels) {
            qList = qList.concat(deptLevels[level]);
        }
        
        qList.forEach((q, i) => {
            container.innerHTML += `
                <div style="background:white; padding:10px; border-radius:5px; margin-bottom:10px; border-left:4px solid #3498db;">
                    <p style="font-weight:bold; font-size:0.9rem; color:#34495e;">Q${i+1}: ${q.question}</p>
                    <p style="color:#27ae60; font-weight:bold; font-size:0.85rem; margin-top:5px;">✓ ${q.answer}</p>
                </div>
            `;
        });
    }
};
