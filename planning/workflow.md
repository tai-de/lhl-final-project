# WORKFLOW

### Init project files			TARGET: Monday, Feb 6

* [x] Create repo/boilerplate
* [x] Create basic Map
* [x] Add map to game
* [x] Refactor layer
* [x] Add simple player image
* [x] Add platform collider layer

### Create player				TARGET: Monday, Feb 6

* [x] Player movements
* [x] Player class
  * [x] Pre-update
  * [x] Update
* [x] Animations
  * [x] Running
  * [x] Idle
  * [x] Switching anim
  * [x] Jumping
  * [ ] Double jump (Stretch? Enabled via item pickup?)
* [x] Play jump anim
* [x] Player colliders
* [x] Map offset
* [x] Setup camera
* [x] Player zones
* [x] Player spawn point
* [x] Level end zone
* [x] End zone overlap

### Enemies				TARGET: Tuesday, Feb 7
* [x] Create enemy
  * [x] Enemy body size
  * [x] Player body size
  * [x] Create multiple enemies
  * [x] Enemy super class
  * [x] Enemies group
  * [x] Animations

### Raycasting				TARGET: Tuesday, Feb 7
* [x] Drawing a line
* [x] Check for tile hits
* [x] Add raycast to enemies
* [x] Detect platform in raycast		  ***< REACHED: EOD Monday, Feb 6***
* [x] Turning with the enemy
* [x] Fixing direction
* [x] Setting patrol distance
* [ ] Adjust raycast steepness		  **! Did not implement steepness to raycast**

### Player damage			TARGET: Tuesday, Feb 7
* [x] Detect player taking hit
* [x] Bounce off movement
* [x] setTimeout
* [x] Timed Events
* [x] Delay call / debugging
* [x] Animation

### Health bar				TARGET: Wednesday, Feb 8
* [x] Building the health bar container
* [x] Display health bar container
* [x] Correct positioning
* [x] Adding the health bar
  * [x] Add background
  * [x] Add foreground
* [x] Decrease health based on damage taken
* [x] Adjust code as necessary (scaling)

### Projectiles				TARGET: Wednesday, Feb 8
* [x] Create projectile
* [x] Destroy projectile
* [x] Projectiles grouping
* [x] Fixing direction of projectile
* [x] Fixing positioning of projectile & reset
* [x] Adding cooldown
* [x] Player animations
* [x] Projectile & enemy collision

### Collide effects			TARGET: Wednesday, Feb 8
* [x] Delivering hit on collision
* [x] Sprite effects
  * [x] Removing effect
  * [x] Place effect on update (binds to target)
* [x] Effect Manager
* [x] Fix positioning
* [x] Enemy animations
* [x] Remove defeated enemies
* [x] Cleanup enemy instance after removal

### Sword/melee weapon		TARGET: Thursday, Feb 9
* [x] Create the weapon
* [x] Animation
* [x] Hide animation on finish
* [x] Update the hit position
* [x] Delivering hit on collision
* [x] Attack speed (/cooldown)		 ***< REACHED: EOD Tuesday, Feb 7***

### Second enemy			TARGET: Thursday, Feb 9
* [x] Add second enemy
* [x] Fix enemy body
* [x] Let enemy shoot projectiles
* [x] Direction of enemy
* [x] Animations
* [x] Player getting hit by enemy projectiles
* [x] Delivering hit on collision
* [ ] STRETCH: Player ducking

### Collectables and traps		TARGET: Thursday, Feb 9
* [x] Add Collectables to map
* [x] Add Collectables class
* [x] Add overlap listener
* [x] Animations
  * [x] Collectable animation
  * [x] Collectable position (bounce effect)
* [x] Collectables group
* [x] Get info from Tiled layer properties
* [x] Keep track of score
  * [x] Create scoreboard item
  * [x] Add collectable sprite beside score
  * [x] Updating the scoreboard
* [x] STRETCH: Add traps
* [x] STRETCH: Deal damage with traps

### Ending game				TARGET: Thursday, Feb 9
* [x] Create Event Emitter class
  * [x] Restarting level
  * [x] Restart when health = 0
* [x] Restart when player falls off map (if we have open pits / no base floor)
* [x] Add background images		 ***< REACHED: EOD Wednesday, Feb 8***
  * [x] STRETCH: Parallax effect

### Additional levels/stuff		TARGET: Friday, Feb 10 through weekend/Monday
* [x] Create second map
* [x] Load multiple levels
* [x] Switching between levels
* [x] Menu scene
* [x] Levels scene
* [x] Back button

### ADDITIONAL STRETCH
* [x] Credits
* [x] Music
* [x] Sound effects
* [x] More enemies
* [x] Get different tilesets
* [x] More collectables >> ability to change the gem colour per level
* [x] Make index.html look nicer
  * [x] Simple logo / navbar (even if its non functional)
  * [x] About us / Credits
  * [x] Gamepedia
     - player attack info, damage per attack, cooldowns, etc
     - put the enemy sprites with their name, little bio, damage amounts?
     - description about diamonds & traps (+ anything else we’ve added)
