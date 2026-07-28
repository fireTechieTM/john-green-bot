const { run_agent, format_agent_data } = require('./john_green_bot.js')




// find_agent_success function call code:
// highest_amount_of_moves = 10,
// max_searches = 100,
// universal_map_size = universal_map_size,
// map = map,      
// starting_coords = [0, 0],
// generation_amount = 1_000,
// max_tries = 100_000,
// start_coords = [0, 0],
// represent_all_spaces_on_mapped_agent_path = true,
// leap = false




function find_agent_success(
  highest_amount_of_moves = null,
  /* The limit of how many moves the AI
  could have took for the iteration to be
  considered a success */


  max_searches = 100,
  /* The maximum amount of times the AI
  will be run to find a success */


  universal_map_size = 5,
  //The perimeter for each map
 
  map = null,
  //The enviremont that the agent explores


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


  represent_all_spaces_on_mapped_agent_path = true,
  /* Whether the zeroes in mapped_agent_path
  should be represented (with dots) or
  not at all */


  leap = false
  /* Whether the agent will have the option to
  jump to random spots on the board */
  ) {


  /* Run the run_agent function until either
  the agent succeeds, or the amount of
  iterations run reaches max_searches */
  for (let i = 0; i < max_searches; i++) {
    let RUN_AGENT = run_agent(
      universal_map_size = universal_map_size,
      map = map,
      starting_coords = starting_coords,
      generation_amount = generation_amount,
      max_tries = max_tries,
      start_coords = start_coords,
      max_agent_turns = universal_map_size ** 2,
      represent_all_spaces_on_mapped_agent_path = represent_all_spaces_on_mapped_agent_path,
      leap = leap
    )


   
    if (RUN_AGENT['agent_success']) {
      return {
        'iteration_of_success': i + 1,
        'agent_data': RUN_AGENT
      }
    }
  }


  //Otherwise return `No agent success found`
  return `No agent success found`
}


/* format_agent_success takes the dictionary
returned from the find_agent_success function
and prints the amount of iterations that
were performed to find a success and
the data from the successful iteration as
well */
function format_agent_success(agent_success) {
  let iteration_of_success = agent_success['iteration_of_success']
  let agent_data = agent_success['agent_data']


  console.log(`Iteration of Success: ${iteration_of_success}\n`)
  format_agent_data(agent_data)
}


module.exports = { find_agent_success, format_agent_success }
