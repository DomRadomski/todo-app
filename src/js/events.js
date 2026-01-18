// events.js
export const events = (function () {
  const topics = {};

  function subscribe(topicName, callback) {
    // If this topic does not exist yet, create it
    if (!topics[topicName]) {
      topics[topicName] = [];
    }

    // Add this callback to the list
    topics[topicName].push(callback);

    // Return an "unsubscribe" function
    return function unsubscribe() {
      topics[topicName] = topics[topicName].filter(
        (cb) => cb !== callback
      );
    };
  }

  function publish(topicName, data) {
    // If nobody is listening, do nothing
    if (!topics[topicName]) return;

    // Call every callback with the data
    topics[topicName].forEach((callback) => {
      callback(data);
    });
  }

  return {
    subscribe,
    publish,
  };
})();

export default events;
