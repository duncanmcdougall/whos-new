function Stopwatch () {
  this.reset()
}

Stopwatch.prototype.start = function () {
  if (this.pausedAt != null) {
    this.paused += Date.now() - this.pausedAt
    this.pausedAt = null
  }
}

Stopwatch.prototype.pause = function () {
  if (!this.pausedAt) this.pausedAt = Date.now()
}

Stopwatch.prototype.reset = function () {
  var now = Date.now()
  this.startedAt = now
  this.pausedAt = now
  this.paused = 0
}

Stopwatch.prototype.ticks = function () {
  var now = this.pausedAt || Date.now()
  return (now - this.startedAt) - this.paused
}

Stopwatch.prototype.formatted = function () {
  return new Date(this.ticks()).getTime() / 1000;
}