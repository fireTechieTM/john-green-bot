//Functions
//coord_change changes coordinates values
function coord_change(arr, a, b) {
  return [arr[0] + a, arr[1] + b]
}


/* check_if_move_valid checks a coordinates
value and checks each coordinate is either
smaller than zero or bigger than the boards
length and returns true or false if the
coordinates violate any of those conditions */
function check_if_move_valid(coord_set, board_size) {
  if (coord_set[0] < 0 || coord_set[0] > board_size - 1) {
    return false
  }
  if (coord_set[1] < 0 || coord_set[1] > board_size - 1) {
    return false
  }
  return true
}


/* copy_map goes through each row of an original
and then each of that rows values and adds it to
the copy array to turn the copy array into an
exact duplicate of the original */
function copy_map(original, copy) {
  for (let i = 0; i < original.length; i++) {
    copy.push([])
    for (let j = 0; j < original.length; j++) {
      copy[i].push(original[i][j])
    }
  }
}


/* round_map copies each value from the original
going row by row, value in row and adds those
values rounded to the copy to make an exact
duplicate except each value is rounded */
function round_map(copy, original) {
  let row = []
  for (let i = 0; i < original.length; i++) {
    row = []
    for (let j = 0; j < original.length; j++) {
      row.push(Math.round(original[i][j]))
    }
    copy.push(row)
  }
}


/* make_map makes a map with its perimiters
being size that's values consist only of zeros */
function make_map(size) {
  let map = []
  for (let i = 0; i < size; i++) {
    let row = []
    for (let j = 0; j < size; j++) {
      row.push(0)
    }
    map.push(row)
  }
  return map
}


/* add_back_reward loops through reward_data and
asigns the reward values in it to the coords they
were located at on map */
function add_back_reward(map, reward_data) {
  for (i in reward_data) {
    map[reward_data[i][0]][reward_data[i][1]] = i
  }
}




/* place_value makes reward the value located
at coords on map */
function place_value(map, value, coords) {
  map[coords[0]][coords[1]] = value
}


/* In map_agent_path if
represent_all_spaces_on_mapped_agent_path
is true then the 0's in the map will be
turned into dots, and if it equals false,
the 0's in the map will turned into space.
map_agent_path then goes through
the agent_path array of coordinate pairs and
asigns the values of agent_path to a
value on map. */
function map_agent_path(map, agent_path, represent_all_spaces_on_mapped_agent_path) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      if (map[i][j] == 0) {
        if (represent_all_spaces_on_mapped_agent_path) {
          map[i][j] = '·'
        } else {
          let current_spot_size = map[i][j].length
          map[i][j] = ' '
        }
      }
    }
  }


  for (let i = 0; i < agent_path.length; i++) {
    map[agent_path[i][0]][agent_path[i][1]] = i
  }
}


/* special_stringify_map logs each array row in
map as one string. It is used to stringify maps
that are not in the agent_data format. */
function special_stringify_map(map) {
  let spacing_options = ['       ', '      ', '     ', '    ', '   ', '  ', ' ']
  for (let i = 0; i < map.length; i++) {
    let row = ''
    for (let j = 0; j < map.length; j++) {
      let spacing = spacing_options[(map[i][j]).toString().length]
      row += map[i][j] + spacing
    }
    console.log(`${row}\n`)
  }
}


/* format_agent_data describes what each
part of agent_data means and displays the
data from agent_data below its descriptions */
function format_agent_data(agent_data) {
  console.log('Whether the agent succeeded in \nfinding the highest reward or not:')
  console.log(agent_data['agent_success'])


  console.log('\nAll values and coordinates of \nrewards found in map:')
  console.log(agent_data['reward_data'])


  console.log('\nThe value and coordinates of the \nhighest reward found in map:')
  console.log(agent_data['highest_reward'])


  console.log('\nThe coordinates traveled by the agent \nusing the data from rounded_map_reward_data:')
  console.log(agent_data['agent_path'])


  console.log('\nThe values attributed to the \nplaces on the map by the algorithm:')
  let rounded_map_reward_data = []
  round_map(rounded_map_reward_data, agent_data['map_reward_data'])
  special_stringify_map(rounded_map_reward_data)


  console.log('\nThe path taken by the agent to reach \nthe highest reward visually mapped out:')
  special_stringify_map(agent_data['mapped_agent_path'])


  console.log('\nThe number of coordinates traveled \nby the agent using the data from rounded_map_reward_data:')
  if (agent_data['agent_success']) {
    console.log(agent_data['moves_to_finish'])
  } else {
    console.log('The agent did find the highest reward')
  }
}




// run_agent function call code:
// universal_map_size = 5,
// map = map,
// starting_coords = [0, 0],
// generation_amount = 1000,
// max_tries = 100_000,
// start_coords = [0, 0],
// max_agent_turns = universal_map_size ** 2,
// represent_all_spaces_on_mapped_agent_path = true,
// leap = false




/* run_agent runs the agent in its entirety,
(data collecting and data using phases) */
function run_agent(
  universal_map_size = 5,
  //The perimeter for each map
 
  map = null,
  //The environment that the agent explores


  starting_coords = [0, 0],
  /* The coordinates that the agent
  starts from while collecting data */


  generation_amount = 1000,
  /* The amount of times the agent collects
  data in the collecting data phase */


  max_tries = 100_000,
  /* The maximum amount random movements
  the agent can make while collecting
  data before being shut down.
  (Bigger the board, higher this value) */


  start_coords = [0, 0],
  /* The coords that the agent
  starts from while using data */


  max_agent_turns = universal_map_size * universal_map_size,
  /* The maximum amount of turns that
  the agent can make while using data
  before being automatically shut down */


  represent_all_spaces_on_mapped_agent_path = true,
  /* Whether the zeroes in mapped_agent_path
  should be represented (with dots) or
  not at all */


  leap = false
  /* Whether the agent will have the option to
  jump to random spots on the board */
  ) {
 
  let map_reward_data = []
  /* map_reward_data is the storage array for
  the values that the algorithm creates that
  the agent will use to find the reward */
   
  let reward_values = []
  //The storage array for all rewards in map
  let reward_coord_check = []
  /* The storage array for all coordinates
  of rewards in map to be used to make sure
  that there is not a reward that is on the
  coordinates that the agent starts on */


  /* Loops through each value in in map and
  adds the coordinates of all rewards found
  to reward_coord_check and adds all the reward
  values to reward_values */
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      if (map[i][j] !== 0) {
        reward_coord_check.push([i, j])
        reward_values.push(map[i][j])
      }
    }
  }


  /* Loops through each coord pair in
  reward_coord_check and checks if the
  coordinates equal the starting_coordinates.
  If it does, then it throws an Error */
  for (let i = 0; i < reward_coord_check.length; i++) {
    if (reward_coord_check[i].toString() === starting_coords.toString()) {
      throw Error('Reward value placed at starting coords on map')
    }
  }


  copy_map(map, map_reward_data)
  /* copy_map gives map_reward_data the
  same dimensions as map */
  let reward_data = {}
  /* reward_data is the storage dict for
  all reward values and their coordinates
  found in the collecting data phase. */


  /* Steps 1 and 2: Collect Data over Many Generations,
  then Evaluate the data after each generation */
  /* This loop is where the agent collects data
  for a certain amount of generations dictated
  by the generation_amount variable */


  let highest_value = 0
  /* This will be the value of the highest
  reward found on the map in map_reward_data */


  for (let generation = 0; generation < generation_amount; generation++) {
    let i = 0
    //i is a necessary counter variable
    let iteration_data = []
    /* iteration_data is the storage array
    for all coordinates the agent randomly
    travels to in each generation. Is temporary,
    so it is wiped clean after each generation */
    let current_coords = [starting_coords[0], starting_coords[1]]
    /* current_coords is the definition of
    where the agent starts on the map in the
    collecting data phase. current_coords is
    changed to be whatever spot on the map that
    the agent is currently on, and then reset to
    the value of starting_coords when the agent
    finishes collecting data for that round */
    iteration_data.push(current_coords)
    //Adds the starting coords to the iteration_data
    let reward = 0
    /* Is the value that will be whatever reward
    the agent finds in the collecting data phase
    and will be reset after the agent finishes
    collecting data for that round */


    //Step 1: Collect Data


    /* While both there is no reward value and
    i < max_tries which means that if either
    one becomes untrue, the loop stops. So if a
    reward is found or there have been more
    iterations than max_tries, the loop stops */
    while (!reward && i < max_tries) {
      let next_move = Math.floor(Math.random()*8)
      /* A random number from 0 to 3 to dictate
      what direction the agent travels in next */
   
      if (next_move == 0) { //UP
        next_move = coord_change(current_coords, -1, 0)
        /* Test variable for what the next
        coordinates that the agent travels to would be */
        if (check_if_move_valid(next_move, map[0].length)) {
          /* if next_move is valid, then current_coords
          equals next_move, and iteration_data adds
          current_coords (as next_move) to its list of
          coordinates the agent has traveled to in this
          round of collecting data. */
          current_coords = next_move
          iteration_data.push(next_move)
        } else { continue }
        /* Otherwise dont change current_coords or add
        it to iteration_data, and simply skip this round
        of collecting data */
      } else if (next_move == 1) { //DOWN
        next_move = coord_change(current_coords, 1, 0)
        /* Test variable for what the next
        coordinates that the agent travels to would be */
        if (check_if_move_valid(next_move, map[0].length)) {
          /* if next_move is valid, then current_coords
          equals next_move, and iteration_data adds
          current_coords (as next_move) to its list of
          coordinates the agent has traveled to in this
          round of collecting data. */
          current_coords = next_move
          iteration_data.push(next_move)
        } else { continue }
        /* Otherwise dont change current_coords or add
        it to iteration_data, and simply skip this round
        of collecting data */
      } else if (next_move == 2) { //RIGHT
        next_move = coord_change(current_coords, 0, 1)
        /* Test variable for what the next
        coordinates that the agent travels to would be */
        if (check_if_move_valid(next_move, map[0].length)) {
          /* if next_move is valid, then current_coords
          equals next_move, and iteration_data adds
          current_coords (as next_move) to its list of
          coordinates the agent has traveled to in this
          round of collecting data. */
          current_coords = next_move
          iteration_data.push(next_move)
        } else { continue }
        /* Otherwise dont change current_coords or add
        it to iteration_data, and simply skip this round
        of collecting data */
      } else if (next_move == 3) { //LEFT
        next_move = coord_change(current_coords, 0, -1)
        /* Test variable for what the next
        coordinates that the agent travels to would be */
        if (check_if_move_valid(next_move, map[0].length)) {
          /* if next_move is valid, then current_coords
          equals next_move, and iteration_data adds
          current_coords (as next_move) to its list of
          coordinates the agent has traveled to in this
          round of collecting data. */
          current_coords = next_move
          iteration_data.push(next_move)
        } else { continue }
        /* Otherwise dont change current_coords or add
        it to iteration_data, and simply skip this round
        of collecting data */
    }


      reward = map[current_coords[0]][current_coords[1]]
      /* Asign reward to equal the location of the
      current_coords on map. (So zero unless there
      is a reward at current_reward) */
      if (reward != 0) {
        /* Check if reward does not equal zero and
        if that is so, asign to reward_data the key
        being reward, and the value being the
        current_coordinates that the reward was
        found to be located in */
        reward_data[reward] = [current_coords[0], current_coords[1]]
      }
      i++ //Increment i
    }
 
    //Step 2: Evaluate Data    
    highest_value = 0


    let reward_coord = [current_coords[0], current_coords[1]]
    /* Asign reward_coord to be current_coords to
    make the code easier to understand because
    current_coords are the location of the reward */


    for (let coord_pair of iteration_data) {
      /* For each coordinate pair in the collected
      iteration_data of all the coordinates traveled
      by the agent in this generation */
      if (map_reward_data[reward_coord[0]][reward_coord[1]] != map_reward_data[coord_pair[0]][coord_pair[1]]) {
        /* If the value located at the reward_coord
        on map_reward_data is not equal to the value
        located at the current coords of the
        iteration_data on map_reward_data. (honestly,
        I dont know why this works or why I ever
        implemented it, but if I take it out the reward
        value on map_reward_data becomes Infinity, so
        leave it in) */
        let dif_1 = coord_pair[0] - reward_coord[0]
        /* The space between the coord_pair's first
        coordinate and the reward_coords first coordinate */
        let dif_2 = coord_pair[1] - reward_coord[1]
        /* The space between the coord_pair's second
        coordinate and the reward_coords second coordinate */
        let prev_val = map_reward_data[coord_pair[0]][coord_pair[1]]
        /* The value located at the coord_pair's coords
        on map_reward_data */
        let total_dif = 1 / (Math.abs(dif_1) + Math.abs(dif_2))
        /* The two differences added together as their
         absolute values (to make sure that the difference
         between the coord_pair's coords and the
         reward_coord's coords are not affected by adding
         positives and negatives and whatnot). The two
         differences are then divided by one to equal a
         lower value the farther the coord_pair is away from
         the reward_coord. 1/8 away = 0.125, 1/2 away = 0.5 */
        let total_reward = reward * total_dif
        /* The total_dif is then multiplied by the reward
        which results in the total_reward being lower the
        lower the negative value and the higher the higher
        the positive value */
        map_reward_data[coord_pair[0]][coord_pair[1]] = prev_val + total_reward
        /* Add the total_reward to the previous_value and
        asign that total to map_reward_data so that the
        algorithm compoundingly affects places the agent
        has traveled to on the map */


        if ((prev_val + total_reward) > highest_value) {
          /* If the value plus the total_reward is higher
          than the current highest value make
          highest_value equal prev_val plus total_reward */
          highest_value = prev_val + total_reward
        }
      }
    }
      highest_value *= 2
      map_reward_data[reward_coord[0]][reward_coord[1]] = highest_value
      /* After the agent has collected data over a
      series of generations asign the reward_coord's
      location on map_reward_data to be highest_value
      times 2 so that when the agent goes through the
      using data phase it is always drawn torwards
      the highest value, which will be the
      highest_value's value */
  }


  /* Step 3: Find Reward as Efficiently As
  Possible Using Collected Data */


  //The agent needs these variables to function:
 
  //The goal is to reach the HIGHEST REWARD
  let current_coords = [start_coords[0], start_coords[1]]
  /* The coords that will be the agent's
  current location in the using data phase */
  let j = 0 //Necessary counting variable
  let highest_reward = []
  /* The storage array for the value and
  coordinates of the highest reward from
  reward_data/the highest reward found on
  the map in the collecting data phase */


  let agent_path = []
  /* The storage array for all the
  coordinates that the agent travels
  to in the using data phase */
  /* agent_path might have alot of
  oscillating of values because the
  Agent was drawn torward a value that
  was'nt the highest reward and was never
  drawn to the highest value so it got stuck */
  agent_path.push(current_coords)
  //Add currcoords to agent_path


  for (key in reward_data) { highest_reward.push(key) }
  /* Add each reward value in
  reward_data to highest_reward */
  highest_reward.sort(function(a, b){return b - a})
  //Sort the highest_reward array
  highest_reward = [highest_reward[0], reward_data[highest_reward[0]]]
  /* Equate highest_reward to [the highest
  value in highest reward, the coordinates on
  the map of the highest value in
  highest reward] */


  while (j < max_agent_turns) {
    /* While j is less than max_agent_turns,
    run the code of this loop */


    let possible_movements = [
      /* The storage array for all coordinates
      that the agent could possibly go to calculated
      with the coord_change function */
      //Up, Down, Left, Right
      coord_change(current_coords, -1, 0),
      coord_change(current_coords, 1, 0),
      coord_change(current_coords, 0, -1),
      coord_change(current_coords, 0, 1),


      // Up-Left, Up-Right, Down-Left, Down-Right
      coord_change(current_coords, -1, -1),
      coord_change(current_coords, -1, 1),
      coord_change(current_coords, 1, -1),
      coord_change(current_coords, 1, 1)
    ]


    /* If leap is truthy, give the agent the
    option to teleport to a random spot on
    the map every turn */
    if (leap) {
      possible_movements.push([Math.round(Math.random() * map.length), Math.round(Math.random() * map.length)])
    }


    let valid_movements = []
    /* The storage array for all coordinates in
    possible_movements excluding those who would
    be out of bounds and therefore invalid */
    let moves_to_consider = {}
    /* The storage dict structured like so:
    {value located on map_reward_data at
    valid_movement[i]: value located on
    map_reward_data at valid_movement[i]'s
    coordinates} */
    let current_enticements = []
    /* The storage array of all keys in
    moves_to_consider (values of valid
    places to move to on map_reward_data) */
    let highest_enticement = 0
    //The highest value in current_enticements


    /* Check through each possible move in
    possible_movements and check if the move
    is valid using the check_if_move_valid
    function. If the move is valid, add it
    to the valid_movements array */
    for (let i = 0; i < possible_movements.length; i++) {
      if (check_if_move_valid(possible_movements[i], map[0].length)) {
        valid_movements.push(possible_movements[i]);
      }
    }


    /* Go through each coord in valid_coords
    and asign the value located on map_reward_data
    at that coord as the key and the coord as
    the value in moves_to_consider */
    for (let i = 0; i < valid_movements.length; i++) {
      let valid_coords = valid_movements[i]
      moves_to_consider[map_reward_data[valid_coords[0]][valid_coords[1]]] = [valid_coords[0], valid_coords[1]]


      /* Add the value located on map_reward_data
      at the coord to current_enticements */
      current_enticements.push(map_reward_data[valid_movements[i][0]][valid_movements[i][1]])
    }




    highest_enticement = current_enticements.sort(function(a, b){return b - a})[0]
    /* Equate highest_enticement to be the
    highest value in current_enticements */
    current_coords = moves_to_consider[highest_enticement]
    /* Equate current_coords to the coordinates
    located in at the key of highest_enticement
    in moves_to_consider */
    agent_path.push(current_coords)
    //Add current_coords to agent_path


    if (current_coords.toString() === highest_reward[1].toString()) { break }
    /* If current_coords is equal to highest
    reward then break */
    j++
    /* Increment j positively if the if
    statement did not occur */
  }
 
  let success = agent_path[agent_path.length - 1]
  /* Wheather the agent succeeded in
  finding the highest reward */
  let mapped_agent_path = make_map(universal_map_size)
  /* Make mapped_agent_path to be an empty map
  with the dimensions of map */
  add_back_reward(mapped_agent_path, reward_data)


  map_agent_path(mapped_agent_path, agent_path, represent_all_spaces_on_mapped_agent_path)
  /* Map the agents path from the agent_path
  array onto mapped_agent_path with the
  map_agent_path function */
  //Takes the list of rewards and the highest_reward and checks if the reward it is currently checking is the one it is checking is the one it succeeded because of.  


  if (success.toString() === highest_reward[1].toString()) {
    /* If the final coordinates that the agent
    traveled to in the using data phase are
    equivalent to the coordinates of the highest
    reward, add true to the end of agent_path,
    otherwise add false */
    agent_path.push(true)
  } else {
    agent_path.push(false)
  }
 
  let moves_to_finish = agent_path.length - 2
  /* The amount of moves that the agent took
  to get from the start_coords to the
  highest_reward's coords */
  let agent_success = agent_path[agent_path.length - 1]
  /* Whether the agent succeeded in finding
  the highest reward or not in the using
  data phase */
 
  let DATA_STORING_VARIABLES = {
    'reward_data': reward_data,
    /* A dict with the keys being the
    rewards found on the map in the
    collecting data phase and the values
    being their coordinates */
    'highest_reward': highest_reward,
    /* Array formatted like: [highest-reward-in-reward-data, [the-highest-rewards-coords-in-map]] */
    'map_reward_data': map_reward_data,
    /* map_reward_data but each
    value is rounded */
    'agent_path': agent_path,
    /* Array of coords the agent traveled
    in the using data stage. Has true
    or false at the last index to show
    if the agent reached the highest reward */
    'moves_to_finish': moves_to_finish,
    /* Amount of moves agent took to
    reach the highest reward */  
    'mapped_agent_path': mapped_agent_path,
    /* The map but with the agent_path
    coords mapped onto it */
    'agent_success': agent_success
    /* Wheather the agent succeeded in
    finding the highest reward */
  }


  return DATA_STORING_VARIABLES
}


module.exports = { run_agent, make_map, place_value, format_agent_data, coord_change, map_agent_path }
//Main Capabilities Coded Up from Wednesday - Monday
//11/15/2023 - 11/20/2023
//Other Capabilities (exporting/importing) Coded Up Tuesday
//11/21/2023
//Notes about the Workings of the Code (comments) Added in Wednesday
//11/22/2023


//Project Complete Wednesday-Wednesday 11/15/2023 - 11/22/2023
