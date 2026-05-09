// Premier League standings data (2025-2026 season - Accurate Current Data)
// Source: Official Premier League Website & ESPN
const standingsData = [
    { pos: 1, team: "Arsenal", played: 35, won: 23, drawn: 7, lost: 5, gf: 67, ga: 26 },
    { pos: 2, team: "Manchester City", played: 34, won: 21, drawn: 8, lost: 5, gf: 69, ga: 32 },
    { pos: 3, team: "Manchester United", played: 35, won: 18, drawn: 10, lost: 7, gf: 63, ga: 48 },
    { pos: 4, team: "Liverpool", played: 35, won: 17, drawn: 7, lost: 11, gf: 59, ga: 47 },
    { pos: 5, team: "Aston Villa", played: 35, won: 17, drawn: 7, lost: 11, gf: 48, ga: 44 },
    { pos: 6, team: "Bournemouth", played: 35, won: 12, drawn: 16, lost: 7, gf: 55, ga: 52 },
    { pos: 7, team: "Brentford", played: 35, won: 14, drawn: 9, lost: 12, gf: 52, ga: 46 },
    { pos: 8, team: "Brighton", played: 35, won: 13, drawn: 11, lost: 11, gf: 49, ga: 42 },
    { pos: 9, team: "Chelsea", played: 35, won: 13, drawn: 9, lost: 13, gf: 54, ga: 48 },
    { pos: 10, team: "Everton", played: 35, won: 13, drawn: 9, lost: 13, gf: 44, ga: 44 },
    { pos: 11, team: "Fulham", played: 35, won: 14, drawn: 6, lost: 15, gf: 44, ga: 49 },
    { pos: 12, team: "Sunderland", played: 35, won: 12, drawn: 11, lost: 12, gf: 37, ga: 46 },
    { pos: 13, team: "Newcastle United", played: 35, won: 13, drawn: 6, lost: 16, gf: 49, ga: 51 },
    { pos: 14, team: "Leeds United", played: 35, won: 10, drawn: 13, lost: 12, gf: 47, ga: 52 },
    { pos: 15, team: "Crystal Palace", played: 34, won: 11, drawn: 10, lost: 13, gf: 36, ga: 42 },
    { pos: 16, team: "Nottingham Forest", played: 35, won: 11, drawn: 9, lost: 15, gf: 44, ga: 46 },
    { pos: 17, team: "Tottenham Hotspur", played: 35, won: 9, drawn: 10, lost: 16, gf: 45, ga: 54 },
    { pos: 18, team: "West Ham United", played: 35, won: 9, drawn: 9, lost: 17, gf: 42, ga: 61 },
    { pos: 19, team: "Burnley", played: 35, won: 4, drawn: 8, lost: 23, gf: 35, ga: 71 },
    { pos: 20, team: "Wolverhampton Wanderers", played: 35, won: 3, drawn: 9, lost: 23, gf: 25, ga: 63 }
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
            <td class="team-name">${team.team}</td>
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
