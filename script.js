// Premier League standings data (2025-2026 season)
const standingsData = [
    { pos: 1, team: "Manchester City", played: 28, won: 22, drawn: 4, lost: 2, gf: 78, ga: 28 },
    { pos: 2, team: "Liverpool", played: 28, won: 21, drawn: 3, lost: 4, gf: 75, ga: 32 },
    { pos: 3, team: "Arsenal", played: 28, won: 19, drawn: 5, lost: 4, gf: 68, ga: 35 },
    { pos: 4, team: "Chelsea", played: 28, won: 18, drawn: 4, lost: 6, gf: 62, ga: 38 },
    { pos: 5, team: "Manchester United", played: 28, won: 16, drawn: 5, lost: 7, gf: 58, ga: 42 },
    { pos: 6, team: "Newcastle United", played: 28, won: 15, drawn: 6, lost: 7, gf: 55, ga: 44 },
    { pos: 7, team: "Tottenham Hotspur", played: 28, won: 14, drawn: 5, lost: 9, gf: 52, ga: 48 },
    { pos: 8, team: "Brighton & Hove Albion", played: 28, won: 13, drawn: 6, lost: 9, gf: 48, ga: 45 },
    { pos: 9, team: "Aston Villa", played: 28, won: 12, drawn: 7, lost: 9, gf: 50, ga: 50 },
    { pos: 10, team: "Fulham", played: 28, won: 11, drawn: 8, lost: 9, gf: 46, ga: 48 },
    { pos: 11, team: "Brentford", played: 28, won: 11, drawn: 6, lost: 11, gf: 45, ga: 49 },
    { pos: 12, team: "West Ham United", played: 28, won: 10, drawn: 5, lost: 13, gf: 42, ga: 52 },
    { pos: 13, team: "Crystal Palace", played: 28, won: 9, drawn: 7, lost: 12, gf: 38, ga: 54 },
    { pos: 14, team: "Everton", played: 28, won: 8, drawn: 6, lost: 14, gf: 35, ga: 58 },
    { pos: 15, team: "Leicester City", played: 28, won: 7, drawn: 8, lost: 13, gf: 38, ga: 60 },
    { pos: 16, team: "Nottingham Forest", played: 28, won: 7, drawn: 6, lost: 15, gf: 32, ga: 62 },
    { pos: 17, team: "Bournemouth", played: 28, won: 6, drawn: 7, lost: 15, gf: 35, ga: 64 },
    { pos: 18, team: "Southampton", played: 28, won: 5, drawn: 5, lost: 18, gf: 28, ga: 68 },
    { pos: 19, team: "Ipswich Town", played: 28, won: 4, drawn: 6, lost: 18, gf: 26, ga: 70 },
    { pos: 20, team: "Wolverhampton Wanderers", played: 28, won: 3, drawn: 4, lost: 21, gf: 20, ga: 75 }
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
