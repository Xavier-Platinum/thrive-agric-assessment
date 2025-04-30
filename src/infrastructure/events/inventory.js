const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('stock_in', data => {
  console.log('📥 Stock In:', data.name, data.quantity);
});

eventEmitter.on('stock_out', data => {
  console.log('📤 Stock Out:', data.name, data.quantity);
});

module.exports = eventEmitter;
