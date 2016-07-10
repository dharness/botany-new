module.exports = {
  hello: {
    _onEnter: function() {
        this.emit('say', { text: "Hello from the hello state" });
    },
    input: function(input) {
      this.emit('say', { text: input });
    }
  }
};
