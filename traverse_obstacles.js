const { make_map, place_value, coord_change, map_agent_path, format_agent_data } = require('./john_green_bot.js')


/* place_values places a value at
each coordinate pair in coords on map. */
function place_values(coords, map, value) {
  for (let i = 0; i < coords.length; i++) {
    map[coords[i][0]][coords[i][1]] = value
  }
}


/* format_agent_traverse_obstacles
formats the data from the agent_traverse_obstacles
function into a more readable format */
function format_agent_traverse_obstacles(agent_data) {
  console.log('The coordinates of the obstacles the \nagent was required to avoid:')
  console.log(agent_data['obstacles'])
  console.log('')
  format_agent_data(agent_data)
}




function agent_traverse_obstacles(
  agent = null,
  start_coords = [0, 0],
  obstacles = [2, 2],
  obstacle_representitive = 'X'
) {


  /* Each obstacle in obstacles is checked
  to see whether it is equal to the current
  iteration of start_coords. If it is, the
  agent would start on an obstacle which makes
  no sense so an error is thrown */
  for (let i = 0; i < obstacles.length; i++) {
    if (start_coords.toString() === obstacles[i].toString()) {
      throw Error('The obstacle cannot be placed on the starting coordinates')
    }
    agent['agent_data']['map_reward_data'][obstacles[i][0]][obstacles[i][1]] = 0
  }


  let agent_path = []
  /* The path the agent took from the
  starting point to reward through the map */
  let current_coords = [0, 0]
  /* The coordinates the agent is currently
  on in its path to reach the reward
  through the map */
  agent_path.push(current_coords)
  //Add the current_coords to the agent_path
  let agent_success = false
  /* Whether the agent succeeded in finding
  the reward */
  let moves_to_finish = undefined
  /* The amount of moves the agent took to
  reach the reward */
  let universal_map_size = agent['agent_data']['map_reward_data'].length
  /* Find the universal_map_size by finding
  the length of the map_reward_data value
  returned from the agent */
  let i = 0
  /* The value that will be incremented in
  the while loop */




  while (i < universal_map_size ** 2) {
    i++ //Increment i each iteration of the loop
    let possible_movements = [
      /* The storage array for all coordinates
      that the agent could possibly go to, calculated
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


    let valid_movements = []
    /* The movements the agent could take that are
    not outside of the board or an obstacle */


    /* Check through all values in possible_movements
    to see which can be added to valid_movements */
    for (let i = 0; i < possible_movements.length; i++) {
      if (possible_movements[i][0] >= universal_map_size || possible_movements[i][0] < 0) {
        continue
      } else if (possible_movements[i][1] >= universal_map_size || possible_movements[i][1] < 0) {
        continue
      } else {
        valid_movements.push(possible_movements[i])
      }
    }


    let sorted_possible_moves = []
    /* It is the sorted array of the values
    on the places the agent could go to next */
    let next_move = undefined
    //The next move the agent takes
    let possible_moves_dict = {}
    /* The dictionary that holds the values
    the agent could go to next and the
    coordinates they are located at with
    this format: value: coordinates */


   
    for (let i = 0; i < valid_movements.length; i++) {
      let first_coord = valid_movements[i][0]
      let second_coord = valid_movements[i][1]
      let value = agent['agent_data']['map_reward_data'][first_coord][second_coord]
      possible_moves_dict[value] = valid_movements[i]
      if (value !== 0) {
        sorted_possible_moves.push(value)
      }
    }


    //Sort sorted_possible_moves
    sorted_possible_moves = sorted_possible_moves.sort(function(a, b){return b - a})
    next_move = sorted_possible_moves[0]
    /* next_move is the highest value
    in sorted_possible_moves */
    current_coords = possible_moves_dict[next_move]
    agent_path.push(current_coords)
    let map = make_map(universal_map_size)
    place_value(map, agent['agent_data']['highest_reward'][0], [agent['agent_data']['highest_reward'][1][0], agent['agent_data']['highest_reward'][1][1]])  
    moves_to_finish = agent_path.length - 1


    if (current_coords.toString() === agent['agent_data']['highest_reward'][1].toString()) {
      agent_success = true
      break
     }


    if (!agent_success) {
      moves_to_finish = 'The agent failed in finding the reward'
    }
  }




  /* If the max amount of iterations has been
  complete and the agent has not found the
  highest reward then the agent failed */
  if (i === universal_map_size ** 2) {
    agent_success = false
  }




  let map = make_map(universal_map_size)
  map_agent_path(
    map = map,
    agent_path = agent_path, represent_all_spaces_on_mapped_agent_path = true
  )


  place_values(obstacles, map, obstacle_representitive)


  //Return the values the agent came up with
  return {
    'obstacles': obstacles,
    'reward_data': agent['agent_data']['reward_data'],
    'highest_reward': agent['agent_data']['highest_reward'],
    'map_reward_data': agent['agent_data']['map_reward_data'],
    'agent_path': agent_path,
    'moves_to_finish': moves_to_finish,      
    'mapped_agent_path': map,
    'agent_success': agent_success
  }
}


module.exports = { agent_traverse_obstacles, format_agent_traverse_obstacles }
