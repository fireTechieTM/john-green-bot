const { run_agent, make_map, place_value, format_agent_data } = require('./john_green_bot.js')
const { test_drive, format_test_data } = require('./testing.js')
const { find_agent_success, format_agent_success } = require('./find_agent_success.js')
const { agent_traverse_obstacles, format_agent_traverse_obstacles } = require('./agent_traverse_obstacles.js')


let start_coords = [0, 0]
let universal_map_size = 12
let map = make_map(universal_map_size)
let bottom_right = [universal_map_size - 1, universal_map_size - 1]
place_value(map, 1, bottom_right)


//
//
//


// let TEST_DRIVE = test_drive(
//   test_num = 100,
//   universal_map_size = 5,
//   generation_amount = 100
// )
// // console.log(TEST_DRIVE)
// // console.log(format_test_data(TEST_DRIVE, other = true))


// let RUN_AGENT = run_agent(
//   universal_map_size = 5,
//   map = map,
//   starting_coords = [0, 0],
//   generation_amount = 1000,
//   max_tries = 100_000,
//   start_coords = [0, 0],
//   max_agent_turns = universal_map_size ** 2,
//   represent_all_spaces_on_mapped_agent_path = true,
//   leap = false
// )
// // console.log(RUN_AGENT)
// // format_agent_data(RUN_AGENT)


let FIND_AGENT_SUCCESS = find_agent_success(
  highest_amount_of_moves = 10,
  max_searches = 100,
  universal_map_size = universal_map_size,
  map = map,      
  starting_coords = [0, 0],
  generation_amount = 1000,
  max_tries = 100_000,
  start_coords = [0, 0],
  represent_all_spaces_on_mapped_agent_path = false,
  leap = false
)
// console.log(FIND_AGENT_SUCCESS['agent_data'])
// format_agent_success(FIND_AGENT_SUCCESS)


let AGENT_TRAVERSE_OBSTACLES = agent_traverse_obstacles(
  agent = FIND_AGENT_SUCCESS,
  start_coords = start_coords,
  obstacles = [
   
    [10, 10],
    [11, 10],
    [10, 11]


  ],
  obstacle_representitive = 'NO🛑PE'
)
// console.log(AGENT_TRAVERSE_OBSTACLES)
format_agent_traverse_obstacles(AGENT_TRAVERSE_OBSTACLES)
