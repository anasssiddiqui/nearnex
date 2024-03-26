const findOneForAwait = async (model, condition, attributes) => {
  const data = await model.findOne({
    where: condition,
    attributes: attributes,
    raw: true, // For plain objects instead of Sequelize instances
  });
  return data;
};

const findManyForAwait = async (model, condition, attributes) => {
  const data = await model.findAll({
    where: condition,
    attributes: attributes,
    raw: true,
  });
  return data;
};

const findOneAndUpdateForAwait = async (model, condition, fields) => {
  await model.update(fields, {
    where: condition,
  });
  return;
};

const findOneForAwaitWithSort = async (model, condition, attributes, sort) => {
  const data = await model.findOne({
    where: condition,
    attributes: attributes,
    order: [sort],
    raw: true,
  });
  return data;
};

const createForAwait = async (data) => {
  await data.save()
  return;
};

const findOneForAwaitWithInclude = async (model, condition, attributes, include) => {
  const data = await model.findOne({
    where: condition,
    attributes: attributes,
    include: include,
    raw: true,
  });
  return data;
};

const findManyForAwaitWithInclude = async (model, condition, attributes, include) => {
  const data = await model.findAll({
    where: condition,
    attributes: attributes,
    include: include,
    raw: true,
  });
  return data;
};

const getAggrgateDataForAwait = async (model, aggregate) => {
  const data = await model.findAll({
    attributes: aggregate,
    raw: true,
  });
  return data;
};

const findManyForAwaitWithSortInclude = async (model, condition, attributes, sort, include) => {
  const data = await model.findAll({
    where: condition,
    attributes: attributes,
    include: include,
    order: [sort],
    raw: true,
  });
  return data;
};

const findManyForAwaitWithSortSkipLimitInclude = async (model, condition, attributes, sort, skip, limit, include) => {
  const data = await model.findAll({
    where: condition,
    attributes: attributes,
    include: include,
    order: [sort],
    offset: skip,
    limit: limit,
    raw: true,
  });
  return data;
};

const findManyForAwaitWithSortSkipAndLimit = async (model, condition, attributes, sort, skip, limit) => {
  const data = await model.findAll({
    where: condition,
    attributes: attributes,
    order: [sort],
    offset: skip,
    limit: limit,
    raw: true,
  });
  return data;
};

const countingForAwait = async (model, condition) => {
  const count = await model.count({
    where: condition,
  });
  return count;
};

module.exports = {
  findOneForAwait,
  findManyForAwait,
  findOneAndUpdateForAwait,
  findOneForAwaitWithSort,
  createForAwait,
  findOneForAwaitWithInclude,
  findManyForAwaitWithInclude,
  getAggrgateDataForAwait,
  findManyForAwaitWithSortInclude,
  countingForAwait,
  findManyForAwaitWithSortSkipLimitInclude,
  findManyForAwaitWithSortSkipAndLimit,
};
