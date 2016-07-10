module.exports = function(fsm) {

  fsm.on('lemmons', (data) => {
    console.log('an event occurred!', data);
  });
}