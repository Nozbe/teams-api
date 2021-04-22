const _evaluateIfDefined = (param, eval) =>
  typeof param === "undefined" ? undefined : eval;

const _filterOutUndefined = (target, source) => {
  Object.keys(source).map((key, index) => {
    if (source[key] !== undefined) {
      target[key] = source[key];
    }
  });

  return target;
};

const mapTaskParams = ({ taskName, isPriority, completed }) =>
  _filterOutUndefined(
    {},
    {
      name: _evaluateIfDefined(taskName, taskName),
      priority_position: _evaluateIfDefined(isPriority, isPriority ? 1 : null),
      ended_at: _evaluateIfDefined(completed, completed ? Date.now() : null),
    }
  );

module.exports = {
  mapTaskParams,
};
