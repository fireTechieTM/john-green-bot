const { run_agent, make_map, place_value } = require('./john_green_bot.js')
const { agent_traverse_obstacles, format_agent_traverse_obstacles } = require('./agent_traverse_obstacles.js')


/* format_test_data returns a dictionary that
groups the set variables, independent variables,
dependent variables, and if other is truthy,
the other variables as well */
function format_test_data(data, distance_from_optimal_move_amount = false) {
    let raw_data_dict = {
      'set_variables': {
        'test_num': data['test_num'],
        'optimal_moves_to_completion': data['optimal_moves_to_completion'],
        'max_distance_from_optimal_move_amount': data['max_moves']
      },
      'independent_variable': {
        'universal_map_size': data['universal_map_size']
      },
      'dependent_variable': {
        'degree_of_optimum': data['degree_of_optimum']
      }
    }


    /* If other is truthy then add a other
    section to the raw_data_dict with other
    data points stored inside */
    if (distance_from_optimal_move_amount) {
      raw_data_dict['other'] = {
        'distance_from_optimal_move_amount': data['distance_from_optimal_move_amount']
      }
    }
   
  return raw_data_dict
}




function test_drive(
  test_num = 100,
  //The amount of simulations that will occur


  universal_map_size = 5,
  //The map size for each map


  generation_amount = 1000
  /* The amount of generations of data that the
  agent will collect in each simulation */
 
  ) {


  let total_moves = 0
  /* The total amount of moves through out
  each simulation that the agent took */


  let total_iterations = 0
  // The total amount of simulations that occur


  let percentage_failure = 0
  /* The percentage of the simulations that the
  agent failed in */
 
  let map = make_map(universal_map_size)
  //Asign map its value


  place_value(map, 1, [universal_map_size - 1, universal_map_size - 1])
  /* Place the only reward to be in the furthest
  corner from the agent */


  //test_num amount of times
  for (let i = 0; i < test_num; i++) {
    let RUN_AGENT = run_agent(
      universal_map_size = universal_map_size,
      map = map,
      starting_coords = [0, 0],
      generation_amount = generation_amount,
      max_tries = 100_000,
      start_coords = [0, 0],
      max_agent_turns = universal_map_size ** 2,
      represent_all_spaces_on_mapped_agent_path = false
    )


    total_moves += RUN_AGENT['moves_to_finish']
    /* Increase total_moves by the moves_to_finish
    value from the returned dictionary from RUN_AGENT */


    /* If the agent succeeded in finding the
    reward then increment the percentage_failure
    variable */
    if (!RUN_AGENT['agent_success']) {
      percentage_failure += 1
    }


    total_iterations++
    // Increment the total_iterations variable
  }




  let optimal_moves_to_completion = universal_map_size - 1
  /* The minimum amount of moves that must occur
  for the agent to reach the reward and end
  the simulation */


  let average_moves_to_completion = total_moves / total_iterations
  /* The average amount of moves that the
  agent took before being stopped */


  let distance_from_optimal_move_amount = Math.round(1000 * (average_moves_to_completion - (universal_map_size - 1))) / 1000
  percentage_failure = (percentage_failure / test_num) * 100


  let percentage_success = 100 - percentage_failure
  /* The percentage of the simulations that the
  agent succeeded in */


  let max_moves = ((universal_map_size ** 2) - universal_map_size) + 1
  /* The maximum amount of moves that the agent
  could take in a simulation before being stopped */


  let degree_of_optimum = Math.round((1 - (distance_from_optimal_move_amount / max_moves)) * 10_000) / 10_000
  /* The amount from the optimal amount of moves
  to complete the simulation to the maximum amount
  of moves that the agent could take in a simulation
  before being stopped */


 
  //Return all the data collected from the test
  return {
    'test_num': test_num,
    'optimal_moves_to_completion': optimal_moves_to_completion,
    'max_moves': max_moves,
    'generation_amount': generation_amount,
    'universal_map_size': universal_map_size,
    'distance_from_optimal_move_amount': distance_from_optimal_move_amount,
    'average_moves_to_completion': average_moves_to_completion,
    'percentage_success': percentage_success,
    'percentage_failure': percentage_failure,
    'degree_of_optimum': degree_of_optimum
  }
 
  return test_data
}


module.exports = { test_drive, format_test_data }
