const shuffle = require('shuffle-array')

// assuming a temperature of 0 to 1
function randomize (ordering, temperature) {
  const iterations = Math.round(ordering.length * temperature)
  let temp = [...ordering]
  for (let x = 0; x < iterations; x++) {
    temp = randomizeOne(temp)
  }
  return temp
}

function randomizeOne (ordering) {
  const idx1 = Math.floor(Math.random() * ordering.length)
  let idx2 = Math.floor(Math.random() * ordering.length)

  // break any possible matches
  for (let x = 0; x < 100; x++) {
    if (idx1 !== idx2) {
      break
    } else {
      idx2 = Math.floor(Math.random() * ordering.length)
    }
  }

  const newOrdering = ordering.map((o, idx) => {
    if (idx === idx1) {
      return ordering[idx2]
    } else if (idx === idx2) {
      return ordering[idx1]
    } else {
      return o
    }
  })

  return newOrdering
}

function calculateTravelCost (path) {
  let totalTime = 0
  for (let x = 0; x < path.length; x++) {
    if (x === path.length - 1) {
      totalTime += distance(path[x], path[0])
    } else {
      totalTime += distance(path[x], path[x+1])
    }
  }
  return totalTime
}

function distance (p1, p2) {
  const dist = Math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2)
  return dist
}

module.exports = {
  randomize,
  calculateTravelCost
}
