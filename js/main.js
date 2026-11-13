
// ZERO DAY — Final Browser Rendering
// Python handles gameplay. JavaScript handles graphics,
// keyboard input, the title screen, and Pyodide communication.

const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

const statusMessage = document.getElementById("status-message");
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");

const PYODIDE_INDEX =
  "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/";

canvas.width = 960;
canvas.height = 540;

let gameStarted = false;
let systemReady = false;

const keys = {
  left: false,
  right: false,
  jump: false,
  restart: false,
  next: false
};

// ==========================================
// KEYBOARD CONTROLS
// ==========================================

document.addEventListener("keydown", (event) => {

  const key = event.key.toLowerCase();

  if (event.key === "Enter" && !gameStarted) {
    event.preventDefault();

    if (systemReady && !event.repeat) {
      beginMission();
    }

    return;
  }

  if (!gameStarted) {
    return;
  }

  if (event.key === "ArrowLeft" || key === "a") {
    keys.left = true;
    event.preventDefault();
  }

  if (event.key === "ArrowRight" || key === "d") {
    keys.right = true;
    event.preventDefault();
  }

  if (event.code === "Space") {
    if (!event.repeat) {
      keys.jump = true;
    }
    event.preventDefault();
  }

  if (key === "r" && !event.repeat) {
    keys.restart = true;
    event.preventDefault();
  }

  if (event.key === "Enter" && !event.repeat) {
    keys.next = true;
    event.preventDefault();
  }
});

document.addEventListener("keyup", (event) => {

  const key = event.key.toLowerCase();

  if (event.key === "ArrowLeft" || key === "a") {
    keys.left = false;
  }

  if (event.key === "ArrowRight" || key === "d") {
    keys.right = false;
  }
});

window.addEventListener("blur", resetKeys);

startButton.addEventListener("click", beginMission);

function resetKeys() {
  keys.left = false;
  keys.right = false;
  keys.jump = false;
  keys.restart = false;
  keys.next = false;
}

function setStatus(text) {
  statusMessage.textContent = text;
}

function beginMission() {

  if (!systemReady || gameStarted) {
    return;
  }

  gameStarted = true;

  startScreen.classList.add("hidden");

  resetKeys();

  startButton.blur();

  setStatus(
    "MISSION STARTED // Recover all three security keys"
  );
}

// ==========================================
// LEVEL COLORS
// ==========================================

function getTheme(state) {

  if (state.level === 3) {
    return {
      background: "#18090e",
      grid: "#401923",
      floor: "#381426",
      edge: "#ff5577",
      circuit: "#96364e"
    };
  }

  if (state.level === 2) {
    return {
      background: "#0b0718",
      grid: "#261b3d",
      floor: "#24163c",
      edge: "#b38aff",
      circuit: "#64429b"
    };
  }

  return {
    background: "#071018",
    grid: "#102c35",
    floor: "#123d32",
    edge: "#3dffb0",
    circuit: "#238b69"
  };
}

// ==========================================
// BACKGROUND
// ==========================================

function drawBackground(state) {

  const theme = getTheme(state);

  context.fillStyle = theme.background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = theme.grid;
  context.lineWidth = 1;

  for (let x = 0; x < canvas.width; x += 40) {

    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }

  for (let y = 0; y < canvas.height; y += 40) {

    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }
}

// ==========================================
// NULL — FINAL SECTOR VISUAL
// ==========================================

function drawNull(state) {

  if (state.level !== 3) {
    return;
  }

  context.save();

  const x = 480;
  const y = 220;

  context.globalAlpha = 0.23;

  context.shadowColor = "#ff3355";
  context.shadowBlur = 30;

  context.strokeStyle = "#ff3355";
  context.lineWidth = 3;

  // Outer mainframe ring

  context.beginPath();
  context.arc(x, y, 92, 0, Math.PI * 2);
  context.stroke();

  context.beginPath();
  context.arc(x, y, 105, 0, Math.PI * 2);
  context.stroke();

  // AI face

  context.fillStyle = "#651c32";

  context.beginPath();
  context.moveTo(x - 55, y - 45);
  context.lineTo(x - 35, y - 65);
  context.lineTo(x + 35, y - 65);
  context.lineTo(x + 55, y - 45);
  context.lineTo(x + 55, y + 35);
  context.lineTo(x + 25, y + 65);
  context.lineTo(x - 25, y + 65);
  context.lineTo(x - 55, y + 35);
  context.closePath();

  context.fill();
  context.stroke();

  // Glowing eyes

  context.globalAlpha = 0.45;
  context.strokeStyle = "#ff5577";
  context.lineWidth = 9;

  context.beginPath();
  context.moveTo(x - 38, y - 18);
  context.lineTo(x - 12, y - 7);
  context.moveTo(x + 38, y - 18);
  context.lineTo(x + 12, y - 7);
  context.stroke();

  // Mouth

  context.lineWidth = 5;

  context.beginPath();
  context.moveTo(x - 25, y + 30);
  context.lineTo(x + 25, y + 30);
  context.stroke();

  context.shadowBlur = 0;
  context.globalAlpha = 0.35;

  context.fillStyle = "#ff5577";
  context.font = "bold 17px monospace";
  context.textAlign = "center";

  context.fillText(
    "N U L L",
    x,
    y + 125
  );

  context.restore();
}

// ==========================================
// FLOOR
// ==========================================

function drawFloor(state) {

  const floor = state.floor;
  const theme = getTheme(state);

  context.save();

  context.fillStyle = theme.floor;

  context.fillRect(
    floor.x, floor.y,
    floor.width, floor.height
  );

  context.shadowColor = theme.edge;
  context.shadowBlur = 15;
  context.fillStyle = theme.edge;

  context.fillRect(
    floor.x, floor.y,
    floor.width, 4
  );

  context.shadowBlur = 0;
  context.strokeStyle = theme.circuit;
  context.lineWidth = 2;

  for (let x = 10; x < floor.width; x += 50) {

    context.beginPath();

    context.moveTo(x, floor.y + 5);
    context.lineTo(x, floor.y + 25);
    context.lineTo(x + 20, floor.y + 25);
    context.lineTo(x + 20, floor.y + 50);

    context.stroke();
  }

  context.restore();
}

// ==========================================
// PLATFORMS
// ==========================================

function drawPlatforms(state) {

  for (const platform of state.platforms) {

    context.save();

    const color = platform.moving
      ? "#42edff"
      : "#b38aff";

    context.shadowColor = color;
    context.shadowBlur = 15;

    context.fillStyle = platform.moving
      ? "#123e4a"
      : "#352054";

    context.fillRect(
      platform.x,
      platform.y,
      platform.width,
      platform.height
    );

    context.strokeStyle = color;
    context.lineWidth = 2;

    context.strokeRect(
      platform.x,
      platform.y,
      platform.width,
      platform.height
    );

    context.fillStyle = color;

    context.fillRect(
      platform.x,
      platform.y,
      platform.width,
      3
    );

    // Moving platform indicator

    if (platform.moving) {

      context.shadowBlur = 0;
      context.font = "10px monospace";
      context.textAlign = "center";

      context.fillText(
        "< MOVING >",
        platform.x + platform.width / 2,
        platform.y + 13
      );
    }

    context.restore();
  }
}

// ==========================================
// FIREWALLS AND LASERS
// ==========================================

function drawHazards(state) {

  for (const hazard of state.hazards) {

    context.save();

    context.shadowColor = "#ff3355";
    context.shadowBlur = 18;

    if (hazard.laser) {

      context.fillStyle = "#ff3355";

      context.fillRect(
        hazard.x,
        hazard.y,
        hazard.width,
        hazard.height
      );

      context.fillStyle = "#fff0f5";

      context.fillRect(
        hazard.x + hazard.width / 2 - 2,
        hazard.y,
        4,
        hazard.height
      );

      context.fillStyle = "#ff5577";

      context.fillRect(
        hazard.x - 4,
        hazard.y,
        hazard.width + 8,
        5
      );

      context.restore();
      continue;
    }

    context.fillStyle = "#651c32";

    context.fillRect(
      hazard.x,
      hazard.y,
      hazard.width,
      hazard.height
    );

    context.strokeStyle = "#ff3355";
    context.lineWidth = 3;

    context.strokeRect(
      hazard.x,
      hazard.y,
      hazard.width,
      hazard.height
    );

    context.shadowBlur = 0;

    context.beginPath();

    context.moveTo(
      hazard.x + 8,
      hazard.y + 8
    );

    context.lineTo(
      hazard.x + hazard.width - 8,
      hazard.y + hazard.height - 8
    );

    context.moveTo(
      hazard.x + hazard.width - 8,
      hazard.y + 8
    );

    context.lineTo(
      hazard.x + 8,
      hazard.y + hazard.height - 8
    );

    context.stroke();

    context.restore();
  }
}

// ==========================================
// MALWARE BOTS
// ==========================================

function drawEnemies(state) {

  for (const enemy of state.enemies) {

    context.save();

    const x = enemy.x;
    const y = enemy.y;
    const w = enemy.width;
    const h = enemy.height;

    context.shadowColor = "#ff3355";
    context.shadowBlur = 18;

    context.fillStyle = "#651c32";
    context.fillRect(x, y, w, h);

    context.strokeStyle = "#ff3355";
    context.lineWidth = 3;
    context.strokeRect(x, y, w, h);

    // Eyes

    context.fillStyle = "#ff5577";
    context.fillRect(x + 7, y + 9, 8, 7);
    context.fillRect(x + w - 15, y + 9, 8, 7);

    // Mouth

    context.fillStyle = "#170710";
    context.fillRect(x + 8, y + 23, w - 16, 5);

    // Antenna

    context.strokeStyle = "#ff3355";
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(x + w / 2, y);
    context.lineTo(x + w / 2, y - 8);
    context.stroke();

    context.fillStyle = "#ff5577";

    context.beginPath();
    context.arc(
      x + w / 2,
      y - 9,
      3,
      0,
      Math.PI * 2
    );
    context.fill();

    context.shadowBlur = 0;
    context.font = "10px monospace";
    context.textAlign = "center";

    context.fillText(
      state.level === 3 ? "MALWARE+" : "MALWARE",
      x + w / 2,
      y - 17
    );

    context.restore();
  }
}

// ==========================================
// DATA FRAGMENTS
// ==========================================

function drawFragments(state) {

  for (const fragment of state.fragments) {

    if (fragment.collected) {
      continue;
    }

    context.save();

    const x = fragment.x;
    const y = fragment.y;
    const r = fragment.radius;

    context.shadowColor = "#ffe66d";
    context.shadowBlur = 18;

    context.fillStyle = "#ffe66d";
    context.strokeStyle = "#fff5bc";
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(x, y - r);
    context.lineTo(x + r, y);
    context.lineTo(x, y + r);
    context.lineTo(x - r, y);
    context.closePath();

    context.fill();
    context.stroke();

    context.shadowBlur = 0;
    context.fillStyle = "#ffffff";

    context.beginPath();
    context.moveTo(x, y - r + 4);
    context.lineTo(x + 3, y);
    context.lineTo(x, y + 3);
    context.lineTo(x - 3, y);
    context.closePath();
    context.fill();

    context.restore();
  }
}

// ==========================================
// SECURITY KEYS
// ==========================================

function drawSecurityKey(state) {

  const key = state.security_key;

  if (key.collected) {
    return;
  }

  context.save();

  const x = key.x;
  const y = key.y;

  context.shadowColor = "#3dffb0";
  context.shadowBlur = 20;
  context.strokeStyle = "#3dffb0";
  context.lineWidth = 5;
  context.lineCap = "round";

  context.beginPath();
  context.arc(x - 8, y, 9, 0, Math.PI * 2);
  context.stroke();

  context.beginPath();

  context.moveTo(x + 1, y);
  context.lineTo(x + 23, y);
  context.lineTo(x + 23, y + 10);

  context.moveTo(x + 13, y);
  context.lineTo(x + 13, y + 7);

  context.stroke();

  context.shadowBlur = 0;
  context.fillStyle = "#3dffb0";
  context.font = "12px monospace";
  context.textAlign = "center";

  context.fillText(
    "SECURITY KEY 0" + state.level,
    x,
    y - 28
  );

  context.restore();
}

// ==========================================
// SHUTDOWN TERMINAL
// ==========================================

function drawTerminal(state) {

  const portal = state.portal;

  const x = portal.x;
  const y = portal.y;
  const w = portal.width;
  const h = portal.height;

  const centerX = x + w / 2;

  const color = portal.locked
    ? "#ff5577"
    : "#3dffb0";

  context.save();

  context.shadowColor = color;
  context.shadowBlur = 20;

  // Terminal body

  context.fillStyle = "#101826";
  context.fillRect(x, y, w, h);

  context.strokeStyle = color;
  context.lineWidth = 3;
  context.strokeRect(x, y, w, h);

  // Terminal screen

  context.fillStyle = portal.locked
    ? "#381426"
    : "#124c39";

  context.fillRect(
    x + 7,
    y + 9,
    w - 14,
    34
  );

  context.strokeStyle = color;
  context.lineWidth = 1;

  context.strokeRect(
    x + 7,
    y + 9,
    w - 14,
    34
  );

  // Command prompt

  context.fillStyle = color;
  context.font = "bold 15px monospace";
  context.textAlign = "center";

  context.fillText(
    ">_",
    centerX,
    y + 31
  );

  // Terminal keyboard

  context.shadowBlur = 0;

  context.fillStyle = "#233548";

  context.fillRect(
    x + 7,
    y + 51,
    w - 14,
    15
  );

  context.fillStyle = color;

  for (let i = 0; i < 5; i++) {

    context.fillRect(
      x + 10 + i * 7,
      y + 56,
      4,
      4
    );
  }

  // Separate labels to prevent overlap

  context.font = "11px monospace";
  context.textAlign = "center";

  context.fillText(
    "SHUTDOWN",
    centerX,
    y - 29
  );

  context.fillText(
    portal.locked ? "LOCKED" : "READY",
    centerX,
    y - 13
  );

  context.restore();
}

// ==========================================
// EXIT PORTALS
// ==========================================

function drawPortal(state) {

  if (state.level === 3) {
    drawTerminal(state);
    return;
  }

  const portal = state.portal;

  context.save();

  const color = portal.locked
    ? "#b38aff"
    : "#3dffb0";

  context.shadowColor = color;
  context.shadowBlur = 20;

  context.fillStyle = portal.locked
    ? "#381c68"
    : "#124c39";

  context.strokeStyle = color;

  context.fillRect(
    portal.x,
    portal.y,
    portal.width,
    portal.height
  );

  context.lineWidth = 3;

  context.strokeRect(
    portal.x,
    portal.y,
    portal.width,
    portal.height
  );

  context.shadowBlur = 0;
  context.textAlign = "center";
  context.font = "13px monospace";

  const centerX = portal.x + portal.width / 2;

  if (portal.locked) {

    context.fillStyle = "#ff5577";

    context.fillText(
      "LOCKED",
      centerX,
      portal.y - 14
    );

    context.strokeStyle = "#e0caff";
    context.fillStyle = "#e0caff";

    context.beginPath();

    context.arc(
      centerX,
      portal.y + 32,
      8,
      Math.PI,
      Math.PI * 2
    );

    context.stroke();

    context.fillRect(
      centerX - 11,
      portal.y + 32,
      22,
      18
    );

    context.fillStyle = "#381c68";

    context.fillRect(
      centerX - 2,
      portal.y + 38,
      4,
      7
    );

  } else {

    context.fillStyle = "#3dffb0";

    context.fillText(
      "UNLOCKED",
      centerX,
      portal.y - 14
    );

    context.strokeStyle = "#3dffb0";
    context.lineWidth = 4;

    context.beginPath();

    context.moveTo(
      centerX - 12,
      portal.y + 40
    );

    context.lineTo(
      centerX + 12,
      portal.y + 40
    );

    context.lineTo(
      centerX + 3,
      portal.y + 31
    );

    context.moveTo(
      centerX + 12,
      portal.y + 40
    );

    context.lineTo(
      centerX + 3,
      portal.y + 49
    );

    context.stroke();
  }

  context.restore();
}

// ==========================================
// BYTE — PLAYER
// ==========================================

function drawPlayer(state) {

  const player = state.player;

  context.save();

  context.shadowColor = player.color;
  context.shadowBlur = 20;
  context.fillStyle = player.color;

  context.beginPath();
  context.moveTo(player.x, player.y);

  context.arc(
    player.x,
    player.y,
    player.radius,
    Math.PI / 6,
    Math.PI * 11 / 6
  );

  context.closePath();
  context.fill();

  context.shadowBlur = 0;

  context.fillStyle = "#071018";

  context.beginPath();

  context.arc(
    player.x + 3,
    player.y - 11,
    4,
    0,
    Math.PI * 2
  );

  context.fill();

  context.fillStyle = "#42edff";
  context.font = "14px monospace";

  context.fillText(
    "BYTE",
    player.x - 18,
    player.y - 35
  );

  context.restore();
}

// ==========================================
// DASHBOARD
// ==========================================

function drawDashboard(state) {

  const theme = getTheme(state);

  const titles = {
    1: "SECTOR 01 // FIREWALL BREACH",
    2: "SECTOR 02 // THE DARK WEB",
    3: "SECTOR 03 // THE ZERO DAY"
  };

  context.save();

  context.fillStyle = theme.edge;
  context.font = "24px monospace";

  context.fillText(
    titles[state.level],
    30,
    45
  );

  context.fillStyle = "#d7e7f5";
  context.font = "16px monospace";

  context.fillText(
    "SCORE: " + state.score,
    30,
    85
  );

  context.fillText(
    "INTEGRITY: " + state.integrity + "%",
    200,
    85
  );

  context.fillText(
    "KEYS: " + state.keys + "/3",
    450,
    85
  );

  const collectedCount = state.fragments.filter(
    fragment => fragment.collected
  ).length;

  context.fillStyle = "#ffe66d";

  context.fillText(
    "DATA: " + collectedCount + "/" + state.fragments.length,
    650,
    85
  );

  // Integrity bar

  context.fillStyle = "#253444";
  context.fillRect(200, 94, 150, 5);

  context.fillStyle =
    state.integrity <= 25
      ? "#ff5577"
      : state.integrity <= 50
        ? "#ffe66d"
        : "#3dffb0";

  context.fillRect(
    200,
    94,
    150 * state.integrity / 100,
    5
  );

  context.font = "14px monospace";
  context.fillStyle = "#9ab5c9";

  let objective;

  if (state.portal.locked) {

    if (state.level === 3) {

      objective =
        "OBJECTIVE: Recover key 03 and shut down NULL.";

    } else if (state.level === 2) {

      objective =
        "OBJECTIVE: Evade malware and recover security key 02.";

    } else {

      objective =
        "OBJECTIVE: Recover the security key to unlock the exit.";
    }

  } else {

    context.fillStyle = "#3dffb0";

    objective = state.level === 3
      ? "OBJECTIVE: Key recovered. Reach the shutdown terminal."
      : "OBJECTIVE: Security key recovered. Enter the exit.";
  }

  context.fillText(objective, 30, 120);

  context.font = "12px monospace";
  context.fillStyle = "#9ab5c9";

  context.fillText(
    state.message,
    30,
    145
  );

  if (state.level === 3) {

    context.fillStyle = "#ff5577";
    context.font = "13px monospace";
    context.textAlign = "right";

    context.fillText(
      "NULL // MAINFRAME",
      930,
      45
    );
  }

  context.restore();
}

// ==========================================
// END SCREENS
// ==========================================

function drawEndScreen(state) {

  if (!state.won && !state.lost) {
    return;
  }

  context.save();

  context.fillStyle = "rgba(3, 9, 15, 0.94)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;

  context.textAlign = "center";

  // FINAL VICTORY

  if (state.won && state.level === 3) {

    context.fillStyle = "#3dffb0";
    context.font = "14px monospace";

    context.fillText(
      "// FINAL TRANSMISSION //",
      centerX,
      75
    );

    context.shadowColor = "#3dffb0";
    context.shadowBlur = 20;
    context.font = "bold 44px monospace";

    context.fillText(
      "MISSION COMPLETE",
      centerX,
      135
    );

    context.shadowBlur = 0;
    context.font = "bold 24px monospace";

    context.fillText(
      "NULL SHUT DOWN",
      centerX,
      180
    );

    context.fillStyle = "#d7e7f5";
    context.font = "17px monospace";

    context.fillText(
      "CITY NETWORK RESTORED",
      centerX,
      220
    );

    context.strokeStyle = "#245343";
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(200, 245);
    context.lineTo(760, 245);
    context.stroke();

    context.fillStyle = "#ffe66d";
    context.font = "bold 24px monospace";

    context.fillText(
      "FINAL SCORE: " + state.score,
      centerX,
      290
    );

    context.fillStyle = "#3dffb0";
    context.font = "18px monospace";

    context.fillText(
      "SECURITY KEYS: " + state.keys + "/3",
      centerX,
      330
    );

    context.fillText(
      "SECTORS CLEARED: 3/3",
      centerX,
      360
    );

    context.fillText(
      "SYSTEM INTEGRITY: " + state.integrity + "%",
      centerX,
      390
    );

    context.fillStyle = "#9ab5c9";
    context.font = "15px monospace";

    context.fillText(
      "BYTE HAS SAVED THE NETWORK.",
      centerX,
      435
    );

    context.fillStyle = "#d7e7f5";

    context.fillText(
      "PRESS R TO PLAY AGAIN",
      centerX,
      480
    );

    context.restore();
    return;
  }

  // LEVEL COMPLETION

  if (state.won) {

    context.shadowColor = "#3dffb0";
    context.shadowBlur = 18;
    context.fillStyle = "#3dffb0";
    context.font = "bold 38px monospace";

    context.fillText(
      "SECTOR 0" + state.level + " COMPLETE",
      centerX,
      150
    );

    context.shadowBlur = 0;
    context.font = "20px monospace";
    context.fillStyle = "#d7e7f5";

    context.fillText(
      state.level === 1
        ? "FIREWALL BREACHED"
        : "DARK WEB INFILTRATED",
      centerX,
      200
    );

    context.fillStyle = "#3dffb0";

    context.fillText(
      "SECURITY KEY 0" + state.level + " RECOVERED",
      centerX,
      240
    );

    context.fillStyle = "#ffe66d";

    context.fillText(
      "TOTAL SCORE: " + state.score,
      centerX,
      290
    );

    context.fillText(
      state.level === 1
        ? "NEXT SECTOR: THE DARK WEB"
        : "NEXT SECTOR: THE ZERO DAY",
      centerX,
      345
    );

    context.fillStyle = "#d7e7f5";
    context.font = "17px monospace";

    context.fillText(
      "PRESS ENTER TO CONTINUE",
      centerX,
      395
    );

  } else {

    // GAME OVER

    context.shadowColor = "#ff3355";
    context.shadowBlur = 18;
    context.fillStyle = "#ff3355";
    context.font = "bold 42px monospace";

    context.fillText(
      "SYSTEM FAILURE",
      centerX,
      160
    );

    context.shadowBlur = 0;
    context.fillStyle = "#d7e7f5";
    context.font = "20px monospace";

    context.fillText(
      "NULL HAS CORRUPTED BYTE",
      centerX,
      210
    );

    context.fillText(
      "SYSTEM INTEGRITY: 0%",
      centerX,
      250
    );

    context.fillStyle = "#ffe66d";

    context.fillText(
      "FINAL SCORE: " + state.score,
      centerX,
      300
    );
  }

  context.fillStyle = "#d7e7f5";
  context.font = "17px monospace";

  context.fillText(
    "PRESS R TO RESTART GAME",
    centerX,
    440
  );

  context.restore();
}

// ==========================================
// DRAW GAME
// ==========================================

function drawGame(state) {

  context.clearRect(
    0, 0,
    canvas.width, canvas.height
  );

  drawBackground(state);
  drawNull(state);
  drawFloor(state);
  drawPlatforms(state);
  drawPortal(state);
  drawHazards(state);
  drawEnemies(state);
  drawFragments(state);
  drawSecurityKey(state);
  drawPlayer(state);
  drawDashboard(state);
  drawEndScreen(state);
}

// ==========================================
// GAME LOOP
// ==========================================

function gameLoop(pyodide, initialState) {

  let state = initialState;

  const updatePlayer =
    pyodide.globals.get("update_player");

  const nextLevel =
    pyodide.globals.get("next_level");

  let previousTime = 0;
  let accumulator = 0;

  const step = 1000 / 60;

  function frame(time) {

    if (!previousTime) {
      previousTime = time;
    }

    accumulator += Math.min(
      time - previousTime,
      100
    );

    previousTime = time;

    // Pause gameplay until the mission begins

    if (!gameStarted) {

      accumulator = 0;

      requestAnimationFrame(frame);
      return;
    }

    while (accumulator >= step) {

      if (keys.restart) {

        state = JSON.parse(
          pyodide.runPython("boot()")
        );

        resetKeys();
      }

      if (keys.next) {

        state = JSON.parse(
          nextLevel(JSON.stringify(state))
        );

        resetKeys();
      }

      state = JSON.parse(

        updatePlayer(
          JSON.stringify(state),
          keys.left,
          keys.right,
          keys.jump
        )
      );

      keys.jump = false;

      accumulator -= step;
    }

    drawGame(state);

    if (state.lost) {

      setStatus(
        "SYSTEM FAILURE // Press R to restart"
      );

    } else if (state.won && state.level === 3) {

      setStatus(
        "MISSION COMPLETE // NULL defeated. City network restored."
      );

    } else if (state.won) {

      setStatus(
        "SECTOR 0" + state.level +
        " COMPLETE // Press Enter to continue"
      );

    } else {

      setStatus(
        "SYSTEM ONLINE // A/D or Arrows to move | SPACE to jump | R to restart"
      );
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

// ==========================================
// INITIALIZE PYODIDE
// ==========================================

async function start() {

  setStatus("Loading Python through Pyodide...");

  if (typeof loadPyodide !== "function") {

    setStatus(
      "Pyodide did not load. Check your internet connection."
    );

    startButton.textContent = "SYSTEM OFFLINE";

    return;
  }

  try {

    const pyodide = await loadPyodide({
      indexURL: PYODIDE_INDEX
    });

    const response = await fetch(
      "python/game.py",
      { cache: "no-store" }
    );

    if (!response.ok) {

      throw new Error(
        "Could not read python/game.py"
      );
    }

    pyodide.runPython(
      await response.text()
    );

    const state = JSON.parse(
      pyodide.runPython("boot()")
    );

    drawGame(state);

    systemReady = true;

    startButton.disabled = false;

    startButton.textContent = "START MISSION";

    setStatus(
      "SYSTEM READY // Press Enter or click Start Mission"
    );

    gameLoop(pyodide, state);

  } catch (error) {

    console.error(error);

    startButton.textContent = "SYSTEM ERROR";

    setStatus(
      "Game could not start: " + error.message
    );
  }
}

start();
