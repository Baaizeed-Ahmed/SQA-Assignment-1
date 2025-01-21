const { Op } = require('sequelize'); 

function buildSearchQuery(search) {
  if (!search) {
    return {}; 
  }

  const lowerCaseSearch = search.toLowerCase(); 

  return {
    [Op.or]: [
      { title: { [Op.like]: `%${lowerCaseSearch}%` } }, 
      { content: { [Op.like]: `%${lowerCaseSearch}%` } }, 
    ],
  };
}

function buildSortOrder(sortBy) {
  let order = [['createdAt', 'DESC']]; // Default: Sort by newest first

  if (sortBy === 'oldest') {
    order = [['createdAt', 'ASC']];
  } else if (sortBy === 'alphabetical') {
    order = [['title', 'ASC']];
  }

  return order;
}

module.exports = {
  buildSearchQuery,
  buildSortOrder,
};