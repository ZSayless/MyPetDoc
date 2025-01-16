/* eslint-disable no-restricted-globals */
onmessage = function(e) {
  const { items, searchTerm } = e.data;
  const results = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  postMessage(results);
};