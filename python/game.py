
"""ZERO DAY game logic.

Python controls movement, physics, hazards, collectibles,
security keys, portal access, enemies, moving platforms,
level progression, and final victory.
"""

import json


def create_level(level, score=0, integrity=100, keys=0):
    """Create the game state for the selected level."""

    state = {
        "title": "ZERO DAY",
        "phase": "ready",
        "message": "Sector 01: Firewall Breach",

        "player": {
            "x": 100,
            "y": 440,
            "radius": 22,
            "color": "#42edff",
            "velocity_x": 0,
            "velocity_y": 0,
            "speed": 5,
            "jump_strength": 13,
            "gravity": 0.6,
            "grounded": True
        },

        "floor": {
            "x": 0,
            "y": 462,
            "width": 960,
            "height": 78
        },

        "portal": {
            "x": 850,
            "y": 382,
            "width": 45,
            "height": 80,
            "locked": True
        },

        "platforms": [],
        "enemies": [],
        "hazards": [],
        "fragments": [],

        "security_key": {
            "x": 810,
            "y": 340,
            "radius": 18,
            "collected": False
        },

        "level": level,
        "score": score,
        "integrity": integrity,
        "keys": keys,
        "won": False,
        "lost": False
    }

    # ==========================================
    # LEVEL 1: FIREWALL BREACH
    # ==========================================

    if level == 1:

        state["message"] = (
            "SECTOR 01 // Recover the first security key"
        )

        state["hazards"] = [
            {
                "x": 260,
                "y": 402,
                "width": 45,
                "height": 60
            },
            {
                "x": 480,
                "y": 392,
                "width": 50,
                "height": 70
            },
            {
                "x": 700,
                "y": 402,
                "width": 45,
                "height": 60
            }
        ]

        state["fragments"] = [
            {
                "x": 180, "y": 420,
                "radius": 10, "collected": False
            },
            {
                "x": 280, "y": 340,
                "radius": 10, "collected": False
            },
            {
                "x": 390, "y": 420,
                "radius": 10, "collected": False
            },
            {
                "x": 505, "y": 330,
                "radius": 10, "collected": False
            },
            {
                "x": 620, "y": 420,
                "radius": 10, "collected": False
            },
            {
                "x": 725, "y": 340,
                "radius": 10, "collected": False
            },
            {
                "x": 800, "y": 420,
                "radius": 10, "collected": False
            }
        ]

    # ==========================================
    # LEVEL 2: THE DARK WEB
    # ==========================================

    elif level == 2:

        state["message"] = (
            "SECTOR 02 // Evade malware and recover key 02"
        )

        # Elevated platforms
        state["platforms"] = [
            {
                "x": 180,
                "y": 365,
                "width": 140,
                "height": 18
            },
            {
                "x": 370,
                "y": 285,
                "width": 140,
                "height": 18
            },
            {
                "x": 560,
                "y": 220,
                "width": 140,
                "height": 18
            },
            {
                "x": 750,
                "y": 250,
                "width": 130,
                "height": 18
            }
        ]

        # Moving malware bots
        state["enemies"] = [
            {
                "x": 230,
                "y": 424,
                "width": 42,
                "height": 38,
                "speed": 2,
                "direction": 1,
                "min_x": 190,
                "max_x": 360
            },
            {
                "x": 480,
                "y": 424,
                "width": 42,
                "height": 38,
                "speed": 2.5,
                "direction": -1,
                "min_x": 420,
                "max_x": 620
            },
            {
                "x": 720,
                "y": 424,
                "width": 42,
                "height": 38,
                "speed": 3,
                "direction": 1,
                "min_x": 660,
                "max_x": 800
            }
        ]

        # Data fragments
        state["fragments"] = [
            {
                "x": 150, "y": 420,
                "radius": 10, "collected": False
            },
            {
                "x": 240, "y": 325,
                "radius": 10, "collected": False
            },
            {
                "x": 310, "y": 325,
                "radius": 10, "collected": False
            },
            {
                "x": 440, "y": 245,
                "radius": 10, "collected": False
            },
            {
                "x": 630, "y": 180,
                "radius": 10, "collected": False
            },
            {
                "x": 810, "y": 210,
                "radius": 10, "collected": False
            },
            {
                "x": 820, "y": 420,
                "radius": 10, "collected": False
            }
        ]

        # Second security key
        state["security_key"] = {
            "x": 850,
            "y": 210,
            "radius": 18,
            "collected": False
        }

    # ==========================================
    # LEVEL 3: THE ZERO DAY
    # ==========================================

    elif level == 3:

        state["message"] = (
            "SECTOR 03 // Infiltrate NULL's mainframe"
        )

        # Final sector platforms
        state["platforms"] = [
            {
                "x": 160,
                "y": 365,
                "width": 140,
                "height": 18
            },
            {
                "x": 340,
                "y": 285,
                "width": 130,
                "height": 18,

                "moving": True,
                "speed": 1.2,
                "direction": 1,
                "min_x": 320,
                "max_x": 410
            },
            {
                "x": 550,
                "y": 220,
                "width": 140,
                "height": 18
            },
            {
                "x": 750,
                "y": 260,
                "width": 130,
                "height": 18
            }
        ]

        # Laser traps
        state["hazards"] = [
            {
                "x": 310,
                "y": 410,
                "width": 22,
                "height": 52,
                "laser": True
            },
            {
                "x": 510,
                "y": 390,
                "width": 22,
                "height": 72,
                "laser": True
            },
            {
                "x": 700,
                "y": 405,
                "width": 22,
                "height": 57,
                "laser": True
            }
        ]

        # Advanced malware bots
        state["enemies"] = [
            {
                "x": 220,
                "y": 424,
                "width": 42,
                "height": 38,
                "speed": 3,
                "direction": 1,
                "min_x": 190,
                "max_x": 265
            },
            {
                "x": 390,
                "y": 424,
                "width": 42,
                "height": 38,
                "speed": 3.5,
                "direction": 1,
                "min_x": 365,
                "max_x": 460
            },
            {
                "x": 590,
                "y": 424,
                "width": 42,
                "height": 38,
                "speed": 4,
                "direction": -1,
                "min_x": 560,
                "max_x": 650
            }
        ]

        # Final sector data fragments
        state["fragments"] = [
            {
                "x": 145, "y": 420,
                "radius": 10, "collected": False
            },
            {
                "x": 230, "y": 325,
                "radius": 10, "collected": False
            },
            {
                "x": 390, "y": 245,
                "radius": 10, "collected": False
            },
            {
                "x": 470, "y": 245,
                "radius": 10, "collected": False
            },
            {
                "x": 620, "y": 180,
                "radius": 10, "collected": False
            },
            {
                "x": 790, "y": 220,
                "radius": 10, "collected": False
            },
            {
                "x": 810, "y": 420,
                "radius": 10, "collected": False
            }
        ]

        # Third and final security key
        state["security_key"] = {
            "x": 850,
            "y": 220,
            "radius": 18,
            "collected": False
        }

        # NULL's shutdown terminal
        state["portal"] = {
            "x": 875,
            "y": 382,
            "width": 55,
            "height": 80,
            "locked": True
        }

    return state


# ==========================================
# GAME START AND LEVEL PROGRESSION
# ==========================================

def boot():
    """Start a new game from Level 1."""

    return json.dumps(create_level(1))


def next_level(state_json):
    """Advance to the next sector and preserve progress."""

    state = json.loads(state_json)

    if state["won"] and state["level"] < 3:

        new_state = create_level(
            state["level"] + 1,
            score=state["score"],
            integrity=state["integrity"],
            keys=state["keys"]
        )

        return json.dumps(new_state)

    return json.dumps(state)


# ==========================================
# COLLISION DETECTION
# ==========================================

def check_collision(player, hazard):
    """Check whether Byte touches a rectangular object."""

    closest_x = max(
        hazard["x"],
        min(
            player["x"],
            hazard["x"] + hazard["width"]
        )
    )

    closest_y = max(
        hazard["y"],
        min(
            player["y"],
            hazard["y"] + hazard["height"]
        )
    )

    distance_x = player["x"] - closest_x
    distance_y = player["y"] - closest_y

    return (
        distance_x ** 2 + distance_y ** 2
        < player["radius"] ** 2
    )


def check_collectible(player, item):
    """Check whether Byte touches a circular collectible."""

    distance_x = player["x"] - item["x"]
    distance_y = player["y"] - item["y"]

    combined_radius = (
        player["radius"] + item["radius"]
    )

    return (
        distance_x ** 2 + distance_y ** 2
        < combined_radius ** 2
    )


# ==========================================
# ENEMY MOVEMENT
# ==========================================

def move_enemies(state):
    """Move malware bots between patrol boundaries."""

    for enemy in state["enemies"]:

        enemy["x"] += (
            enemy["speed"] * enemy["direction"]
        )

        if enemy["x"] >= enemy["max_x"]:

            enemy["x"] = enemy["max_x"]
            enemy["direction"] = -1

        elif enemy["x"] <= enemy["min_x"]:

            enemy["x"] = enemy["min_x"]
            enemy["direction"] = 1


# ==========================================
# MOVING PLATFORMS
# ==========================================

def move_platforms(state):
    """Move platforms and carry Byte when standing on them."""

    player = state["player"]

    for platform in state["platforms"]:

        if not platform.get("moving", False):
            continue

        old_x = platform["x"]

        # Check whether Byte is standing on this platform
        standing_on_platform = (
            player["grounded"]
            and abs(
                player["y"] + player["radius"]
                - platform["y"]
            ) < 1
            and player["x"] + player["radius"]
                > platform["x"]
            and player["x"] - player["radius"]
                < platform["x"] + platform["width"]
        )

        # Move the platform
        platform["x"] += (
            platform["speed"] * platform["direction"]
        )

        # Reverse direction at patrol boundaries
        if platform["x"] >= platform["max_x"]:

            platform["x"] = platform["max_x"]
            platform["direction"] = -1

        elif platform["x"] <= platform["min_x"]:

            platform["x"] = platform["min_x"]
            platform["direction"] = 1

        # Carry Byte with the platform
        if standing_on_platform:

            movement = platform["x"] - old_x

            player["x"] += movement


# ==========================================
# DAMAGE AND GAME OVER
# ==========================================

def take_damage(state, message):
    """Reduce integrity and return Byte to the start."""

    player = state["player"]

    state["integrity"] = max(
        0, state["integrity"] - 25
    )

    player["x"] = 100
    player["y"] = 440

    player["velocity_x"] = 0
    player["velocity_y"] = 0

    player["grounded"] = True

    state["message"] = message

    if state["integrity"] == 0:

        state["lost"] = True
        state["phase"] = "game_over"

        state["message"] = "SYSTEM FAILURE"

    return json.dumps(state)


# ==========================================
# MAIN GAME UPDATE
# ==========================================

def update_player(state_json, left, right, jump=False):
    """Update movement, physics, collisions, and objectives."""

    state = json.loads(state_json)

    player = state["player"]
    floor = state["floor"]

    # Stop gameplay after winning or losing
    if state["lost"] or state["won"]:
        return json.dumps(state)

    # Move malware bots
    move_enemies(state)

    # Move platforms
    move_platforms(state)

    # ======================================
    # HORIZONTAL MOVEMENT
    # ======================================

    player["velocity_x"] = 0

    if left:
        player["velocity_x"] = -player["speed"]

    if right:
        player["velocity_x"] = player["speed"]

    if left and right:
        player["velocity_x"] = 0

    player["x"] += player["velocity_x"]

    # Keep Byte inside the screen
    player["x"] = max(
        player["radius"],
        min(
            960 - player["radius"],
            player["x"]
        )
    )

    # ======================================
    # JUMPING AND GRAVITY
    # ======================================

    if jump and player["grounded"]:

        player["velocity_y"] = (
            -player["jump_strength"]
        )

        player["grounded"] = False

    # Record position before applying gravity
    previous_y = player["y"]

    previous_bottom = (
        previous_y + player["radius"]
    )

    # Apply gravity
    player["velocity_y"] += player["gravity"]

    player["y"] += player["velocity_y"]

    player["grounded"] = False

    # ======================================
    # PLATFORM COLLISIONS
    # ======================================

    if player["velocity_y"] >= 0:

        for platform in state["platforms"]:

            player_bottom = (
                player["y"] + player["radius"]
            )

            platform_top = platform["y"]

            horizontal_overlap = (
                player["x"] + player["radius"]
                > platform["x"]

                and

                player["x"] - player["radius"]
                < platform["x"] + platform["width"]
            )

            if (
                horizontal_overlap
                and previous_bottom <= platform_top
                and player_bottom >= platform_top
            ):

                player["y"] = (
                    platform_top - player["radius"]
                )

                player["velocity_y"] = 0

                player["grounded"] = True

                break

    # ======================================
    # FLOOR COLLISION
    # ======================================

    if player["y"] + player["radius"] >= floor["y"]:

        player["y"] = (
            floor["y"] - player["radius"]
        )

        player["velocity_y"] = 0

        player["grounded"] = True

    # ======================================
    # FIREWALL AND LASER COLLISIONS
    # ======================================

    for hazard in state["hazards"]:

        if check_collision(player, hazard):

            if hazard.get("laser", False):

                return take_damage(
                    state,
                    "LASER COLLISION // Integrity reduced"
                )

            return take_damage(
                state,
                "FIREWALL COLLISION // Integrity reduced"
            )

    # ======================================
    # MALWARE ENEMY COLLISIONS
    # ======================================

    for enemy in state["enemies"]:

        if check_collision(player, enemy):

            return take_damage(
                state,
                "MALWARE ATTACK // Integrity reduced"
            )

    # ======================================
    # DATA FRAGMENT COLLECTION
    # ======================================

    for fragment in state["fragments"]:

        if not fragment["collected"]:

            if check_collectible(player, fragment):

                fragment["collected"] = True

                state["score"] += 100

                state["message"] = (
                    "DATA RECOVERED // +100 POINTS"
                )

    # ======================================
    # SECURITY KEY COLLECTION
    # ======================================

    security_key = state["security_key"]

    if not security_key["collected"]:

        if check_collectible(player, security_key):

            security_key["collected"] = True

            state["keys"] += 1

            state["portal"]["locked"] = False

            if state["level"] == 3:

                state["message"] = (
                    "FINAL KEY RECOVERED // "
                    "SHUTDOWN TERMINAL UNLOCKED"
                )

            else:

                state["message"] = (
                    "SECURITY KEY RECOVERED // "
                    "EXIT UNLOCKED"
                )

    # ======================================
    # EXIT PORTAL AND SHUTDOWN TERMINAL
    # ======================================

    portal = state["portal"]

    if check_collision(player, portal):

        if portal["locked"]:

            state["message"] = (
                "ACCESS DENIED // Recover the security key"
            )

        else:

            state["won"] = True

            state["phase"] = "level_complete"

            # Level 1 completion
            if state["level"] == 1:

                state["message"] = (
                    "SECTOR 01 COMPLETE // Firewall breached"
                )

            # Level 2 completion
            elif state["level"] == 2:

                state["message"] = (
                    "SECTOR 02 COMPLETE // Dark Web infiltrated"
                )

            # Final victory
            elif state["level"] == 3:

                state["phase"] = "mission_complete"

                state["message"] = (
                    "MISSION COMPLETE // "
                    "NULL SHUT DOWN // CITY NETWORK RESTORED"
                )

    return json.dumps(state)
