const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('stock_in', data => {
  console.log('📥 Stock In:', JSON.stringify(data));
  //REVIEW - Implement Warehouse update for records(Stock in)
});

eventEmitter.on('stock_out', data => {
  console.log('📤 Stock Out:', JSON.stringify(data));
  //REVIEW - Implement Warehouse update for records(Stock out)
});

module.exports = eventEmitter;
