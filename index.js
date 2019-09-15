const sa = require('./simulated-annealing')

let initialctx, finalctx

window.onload = function () {
  const initialCanvas = document.getElementById('initial')
  if (initialCanvas.getContext) {
    initialctx = initialCanvas.getContext('2d');
  }

  const finalCanvas = document.getElementById('final')
  if (finalCanvas.getContext) {
    finalctx = finalCanvas.getContext('2d');
  }

  ////////////////////////////////////////////////////////////////////////////////
  /// test traveling salesman

  const WIDTH = 1200
  const HEIGHT = 800

  let initialRandomPath = []
  for (let x = 0; x < 20; x++) {
    const x = Math.ceil(Math.random() * WIDTH)
    const y = Math.ceil(Math.random() * HEIGHT)
    initialRandomPath.push({x, y})
  }

  let best = initialRandomPath
  let neighbor = initialRandomPath
  let bestCost = sa.calculateTravelCost(best)
  console.log('initial cost: ', bestCost)
  let neighborCost = 0

  draw(best, initialctx)

  for (let temperature = 1; temperature > 0; temperature -= 0.001) {
    for (let i = 0; i < 500; i++) {
      neighbor = sa.randomize(best, temperature)
      bestCost = sa.calculateTravelCost(best)
      neighborCost = sa.calculateTravelCost(neighbor)
      if (neighborCost < bestCost) {
        best = [...neighbor]
      }
    }
  }

  draw(best, finalctx)

  console.log('final best cost: ', bestCost)
}

function draw (path, ctx) {
  // Path2D circle
  let circle = new Path2D()

  for (let i = 0; i < path.length; i++) {
    circle.moveTo(path[i].x, path[i].y)
    circle.arc(path[i].x, path[i].y, 5, 0, 2 * Math.PI) // x, y, r, start angle, end angle
    ctx.fill(circle)

    // Connecting Line
    ctx.beginPath()
    ctx.moveTo(path[i].x, path[i].y)
    if (i === path.length - 1) {
      ctx.lineTo(path[0].x, path[0].y)
    } else {
      ctx.lineTo(path[i+1].x, path[i+1].y)
    }
    ctx.closePath()
    ctx.stroke()
  }
}
