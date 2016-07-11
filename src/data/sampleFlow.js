var flow1 = [
  {
    text: "Peas!"
  }, 
  {
    text: "Peas! Peas! Peas!"
  },
  {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "What do you want to do next?",
        buttons: [{
          type: "postback",
          title: "Carrots?",
          payload: "lemmons4"
        }]
      }
    }
  }
];

var flow2 = [
  {
    text: "Carrots!"
  }, 
  {
    text: "Carrots! Carrots! Carrots!"
  },
  {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "What do you want to do next?",
        buttons: [{
          type: "postback",
          title: "Back to peas?",
          payload: "lemmons1"
        }]
      }
    }
  }
];

module.exports = [ flow1, flow2 ];