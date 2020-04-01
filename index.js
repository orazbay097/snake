
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const menu = document.getElementsByClassName("menu")[0]

// Mutable state
let state;

// Position helpers
const x = c => Math.round(c * canvas.width / state.cols)
const y = r => Math.round(r * (canvas.height - 80) / state.rows)

// Game loop draw
const draw = () => {
  // clear
  ctx.fillStyle = '#232323'
  ctx.fillRect(0, y(2), canvas.width, canvas.height - y(2))

  // top
  ctx.fillStyle = 'rgb(0,0,255)'
  ctx.fillRect(0, 0, canvas.width, y(2))

  // bottom
  ctx.fillStyle = 'rgb(0,0,255)'
  ctx.fillRect(0, canvas.height - y(2), canvas.width, y(2))

  //point
  ctx.fillStyle = 'rgb(255,255,255)'
  ctx.font = '25px Serif';
  ctx.fillText(`Points: ${state.snake.length - 1}`, x(1), 30);

  // draw snake
  ctx.fillStyle = 'rgb(0,200,50)'
  state.snake.map(p => ctx.fillRect(x(p.x), y(p.y) + y(2), x(1), y(1)))

  // draw apples
  ctx.fillStyle = 'rgb(255,50,0)'
  ctx.fillRect(x(state.apple.x), y(state.apple.y) + y(2), x(1), y(1))


}

const showMenu = () => {
  menu.classList.remove("menu_hidden");
}
const hideMenu = () => {
  menu.classList.add("menu_hidden");
}

const onFinish = () => {
  showMenu();
};

const start = () => {
  state = initialState();
  hideMenu();
  draw();
  window.requestAnimationFrame(step(0))
}

// Game loop update
const step = t1 => t2 => {
  if (state.isFinish) {
    onFinish();
  } else if (t2 - t1 > 50) {
    state = next(state)
    draw()
    window.requestAnimationFrame(step(t2))
  } else {
    window.requestAnimationFrame(step(t1))
  }
}

// Key events
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'h': case 'ArrowUp': state = enqueue(state, NORTH); break
    case 'a': case 'j': case 'ArrowLeft': state = enqueue(state, WEST); break
    case 's': case 'k': case 'ArrowDown': state = enqueue(state, SOUTH); break
    case 'd': case 'l': case 'ArrowRight': state = enqueue(state, EAST); break
  }
})

start();