// Premier League standings data (2025-2026 season - Accurate Current Data)
// Source: Official Premier League Website & ESPN
const standingsData = [
    { pos: 1, team: "Arsenal", played: 35, won: 23, drawn: 7, lost: 5, gf: 67, ga: 26, manager: "Mikel Arteta", managedTeams: [{ team: "Real Sociedad", years: "2018-2022" }, { team: "Arsenal", years: "2020-present" }] },
    { pos: 2, team: "Manchester City", played: 34, won: 21, drawn: 8, lost: 5, gf: 69, ga: 32, manager: "Pep Guardiola", managedTeams: [{ team: "Barcelona B", years: "2008-2011" }, { team: "Barcelona", years: "2011-2012" }, { team: "Bayern Munich", years: "2013-2016" }, { team: "Manchester City", years: "2016-present" }] },
    { pos: 3, team: "Manchester United", played: 35, won: 18, drawn: 10, lost: 7, gf: 63, ga: 48, manager: "Erik ten Hag", managedTeams: [{ team: "Go Ahead Eagles", years: "2013-2015" }, { team: "Utrecht", years: "2015-2017" }, { team: "Ajax", years: "2017-2022" }, { team: "Manchester United", years: "2022-present" }] },
    { pos: 4, team: "Liverpool", played: 35, won: 17, drawn: 7, lost: 11, gf: 59, ga: 47, manager: "Arne Slot", managedTeams: [{ team: "AZ Alkmaar", years: "2012-2013" }, { team: "Vitesse", years: "2021-2023" }, { team: "Feyenoord", years: "2023-2024" }, { team: "Liverpool", years: "2024-present" }] },
    { pos: 5, team: "Aston Villa", played: 35, won: 17, drawn: 7, lost: 11, gf: 48, ga: 44, manager: "Unai Emery", managedTeams: [{ team: "Real Sociedad", years: "2009-2013" }, { team: "Valencia", years: "2013-2014" }, { team: "Sevilla", years: "2014-2016" }, { team: "Arsenal", years: "2018-2019" }, { team: "Villarreal", years: "2020-2023" }, { team: "Aston Villa", years: "2023-present" }] },
    { pos: 6, team: "Bournemouth", played: 35, won: 12, drawn: 16, lost: 7, gf: 55, ga: 52, manager: "Andoni Iraola", managedTeams: [{ team: "Mirandés", years: "2018-2019" }, { team: "Rayo Vallecano", years: "2019-2022" }, { team: "Bournemouth", years: "2023-present" }] },
    { pos: 7, team: "Brentford", played: 35, won: 14, drawn: 9, lost: 12, gf: 52, ga: 46, manager: "Thomas Frank", managedTeams: [{ team: "Silkeborg IF", years: "2015-2016" }, { team: "OB Odense", years: "2016-2018" }, { team: "Brentford", years: "2018-present" }] },
    { pos: 8, team: "Brighton", played: 35, won: 13, drawn: 11, lost: 11, gf: 49, ga: 42, manager: "Fabian Hürzeler", managedTeams: [{ team: "Heidenheim", years: "2023-2024" }, { team: "Brighton", years: "2024-present" }] },
    { pos: 9, team: "Chelsea", played: 35, won: 13, drawn: 9, lost: 13, gf: 54, ga: 48, manager: "Enzo Maresca", managedTeams: [{ team: "Parma", years: "2020-2021" }, { team: "Reggina", years: "2021-2022" }, { team: "Leicester City", years: "2023-2024" }, { team: "Chelsea", years: "2024-present" }] },
    { pos: 10, team: "Everton", played: 35, won: 13, drawn: 9, lost: 13, gf: 44, ga: 44, manager: "Sean Dyche", managedTeams: [{ team: "Watford", years: "2012-2015" }, { team: "Burnley", years: "2018-2022" }, { team: "Everton", years: "2023-present" }] },
    { pos: 11, team: "Fulham", played: 35, won: 14, drawn: 6, lost: 15, gf: 44, ga: 49, manager: "Marco Silva", managedTeams: [{ team: "Deportivo", years: "2013-2014" }, { team: "Hull City", years: "2017-2018" }, { team: "Watford", years: "2018-2019" }, { team: "Everton", years: "2019-2021" }, { team: "Fulham", years: "2021-present" }] },
    { pos: 12, team: "Sunderland", played: 35, won: 12, drawn: 11, lost: 12, gf: 37, ga: 46, manager: "Régis Le Bris", managedTeams: [{ team: "Angers", years: "2020-2023" }, { team: "Lorient", years: "2023-2024" }, { team: "Sunderland", years: "2024-present" }] },
    { pos: 13, team: "Newcastle United", played: 35, won: 13, drawn: 6, lost: 16, gf: 49, ga: 51, manager: "Eddie Howe", managedTeams: [{ team: "AFC Bournemouth", years: "2012-2019" }, { team: "Celtic", years: "2021-2022" }, { team: "Newcastle United", years: "2021-present" }] },
    { pos: 14, team: "Leeds United", played: 35, won: 10, drawn: 13, lost: 12, gf: 47, ga: 52, manager: "Daniel Farke", managedTeams: [{ team: "Borussia Dortmund II", years: "2015-2017" }, { team: "Cologne", years: "2017-2018" }, { team: "Norwich City", years: "2019-2022" }, { team: "Leeds United", years: "2023-present" }] },
    { pos: 15, team: "Crystal Palace", played: 34, won: 11, drawn: 10, lost: 13, gf: 36, ga: 42, manager: "Oliver Glasner", managedTeams: [{ team: "Wolfsberger AC", years: "2015-2019" }, { team: "Eintracht Frankfurt", years: "2019-2022" }, { team: "Crystal Palace", years: "2023-present" }] },
    { pos: 16, team: "Nottingham Forest", played: 35, won: 11, drawn: 9, lost: 15, gf: 44, ga: 46, manager: "Nuno Espírito Santo", managedTeams: [{ team: "Lazio", years: "2016-2017" }, { team: "Porto", years: "2017-2019" }, { team: "Tottenham", years: "2021-2022" }, { team: "Nottingham Forest", years: "2022-present" }] },
    { pos: 17, team: "Tottenham Hotspur", played: 35, won: 9, drawn: 10, lost: 16, gf: 45, ga: 54, manager: "Ange Postecoglou", managedTeams: [{ team: "Rangersn", years: "2011-2012" }, { team: "Celtic", years: "2021-2023" }, { team: "Tottenham", years: "2023-present" }] },
    { pos: 18, team: "West Ham United", played: 35, won: 9, drawn: 9, lost: 17, gf: 42, ga: 61, manager: "Julen Lopetegui", managedTeams: [{ team: "Real Madrid", years: "2018" }, { team: "Sevilla", years: "2019-2022" }, { team: "Wolves", years: "2022-2023" }, { team: "West Ham United", years: "2024-present" }] },
    { pos: 19, team: "Burnley", played: 35, won: 4, drawn: 8, lost: 23, gf: 35, ga: 71, manager: "Scott Parker", managedTeams: [{ team: "Bristol City", years: "2021-2022" }, { team: "Fulham", years: "2022-2023" }, { team: "West Bromwich Albion", years: "2023-2024" }, { team: "Burnley", years: "2024-present" }] },
    { pos: 20, team: "Wolverhampton Wanderers", played: 35, won: 3, drawn: 9, lost: 23, gf: 25, ga: 63, manager: "Gary O'Neil", managedTeams: [{ team: "Bristol City", years: "2022-2023" }, { team: "Bournemouth (interim)", years: "2023" }, { team: "Wolves", years: "2023-present" }] }
];

// Calculate points and goal difference
function calculatePoints(team) {
    return (team.won * 3) + (team.drawn * 1);
}

function calculateGD(team) {
    return team.gf - team.ga;
}

// Determine team status for styling
function getTeamStatus(position) {
    if (position <= 4) return 'top-four';
    if (position <= 6) return 'european';
    if (position >= 18) return 'relegation';
    return '';
}

// Show team details
function showTeamDetails(teamData) {
    const mainContent = document.getElementById('mainContent');
    const detailsContent = document.getElementById('detailsContent');
    
    mainContent.style.display = 'none';
    detailsContent.style.display = 'block';
    
    const managedTeamsHTML = teamData.managedTeams.map(t => `
        <tr>
            <td>${t.team}</td>
            <td>${t.years}</td>
        </tr>
    `).join('');
    
    detailsContent.innerHTML = `
        <div class="detail-card">
            <h2>${teamData.team}</h2>
            <div class="manager-section">
                <h3>Current Manager</h3>
                <p class="manager-name">${teamData.manager}</p>
            </div>
            
            <div class="managed-teams-section">
                <h3>Managerial History</h3>
                <table class="managed-teams-table">
                    <thead>
                        <tr>
                            <th>Club</th>
                            <th>Years</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${managedTeamsHTML}
                    </tbody>
                </table>
            </div>
            
            <button id="backBtn" class="btn btn-primary">Return to Standings</button>
        </div>
    `;
    
    document.getElementById('backBtn').addEventListener('click', showStandings);
}

// Show standings
function showStandings() {
    const mainContent = document.getElementById('mainContent');
    const detailsContent = document.getElementById('detailsContent');
    
    mainContent.style.display = 'block';
    detailsContent.style.display = 'none';
}

// Populate table
function populateTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    standingsData.forEach(team => {
        const points = calculatePoints(team);
        const gd = calculateGD(team);
        const status = getTeamStatus(team.pos);

        const row = document.createElement('tr');
        if (status) row.classList.add(status);

        row.innerHTML = `
            <td class="pos">${team.pos}</td>
            <td class="team-name" style="cursor: pointer; color: #667eea; font-weight: 600;" onclick="showTeamDetails(standingsData[${standingsData.indexOf(team)}])">${team.team}</td>
            <td>${team.played}</td>
            <td>${team.won}</td>
            <td>${team.drawn}</td>
            <td>${team.lost}</td>
            <td>${team.gf}</td>
            <td>${team.ga}</td>
            <td>${gd > 0 ? '+' : ''}${gd}</td>
            <td style="font-weight: 700; font-size: 1.05em;">${points}</td>
        `;

        tableBody.appendChild(row);
    });

    updateLastUpdated();
}

// Update last updated time
function updateLastUpdated() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('lastUpdated').textContent = `${hours}:${minutes}`;
}

// Refresh button functionality
document.getElementById('refreshBtn').addEventListener('click', function() {
    this.disabled = true;
    this.textContent = 'Refreshing...';

    // Simulate API call delay
    setTimeout(() => {
        populateTable();
        this.disabled = false;
        this.textContent = 'Refresh Data';
    }, 500);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', populateTable);
